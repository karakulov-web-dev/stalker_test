DROP TRIGGER IF EXISTS `bd_sync_upd`//
CREATE TRIGGER `bd_sync_upd` AFTER UPDATE ON `billing_data_dev`
 FOR EACH ROW BEGIN
 
declare in_action varchar(32) default '';
declare in_reason varchar(256) default '';
declare in_c_id mediumint unsigned;
declare iptv_level_old char(2) default '';
declare in_argument varchar(512) default '';

declare tariff_with_shaper varchar(32) default 'Временно отключенный порт%';
declare tariff_disabled varchar(32) default 'Временно отключенный абонент%';
-- declare tariff_disabled varchar(32) default '%отключенный%';

declare tariff_private_net varchar(16) default 'Узел ЗС%';
declare tariff_on_hold varchar(16) default '%Городской%';
declare tariff_stb varchar(16) default 'КЛИК-ТВ%';

declare private_net_old, private_net_new tinyint default -1;
declare in_iptv_status varchar(16);

declare port_status_by_auth_status_old varchar(8) default 'disable';
declare port_status_by_auth_status_new varchar(8) default 'disable';
declare port_status_active varchar(8) default 'enable';

declare auth_status_active tinyint default 3;
declare auth_status_suspend tinyint default 4;

declare c_nexus_auto_return varchar(128);

declare in_time timestamp default current_timestamp;

--

set port_status_by_auth_status_old = (select port_status from bd_auth_status where id = old.auth_status);
set port_status_by_auth_status_new = (select port_status from bd_auth_status where id = new.auth_status);

set in_c_id := get_c_id_by_ip(new.ip);

if old.client_name != new.client_name or old.tariff != new.tariff or old.auth_status != new.auth_status or old.iptv_name != new.iptv_name or old.iptv_ext != new.iptv_ext then 
	
	if @bd_sync_debug = true then -- пишем дебаг
	
		insert into bd_sync_log(`trigger`, ip, c_id, client_name_old, client_name_new, tariff_old, tariff_new, auth_status_old, auth_status_new, iptv_name_old, iptv_name_new, iptv_ext_old, iptv_ext_new) values
			('update', new.ip, in_c_id, old.client_name, new.client_name, old.tariff, new.tariff, old.auth_status, new.auth_status, old.iptv_name, new.iptv_name, old.iptv_ext, new.iptv_ext);
			
	end if;

end if;

-- 1. изменился тариф

if old.tariff != new.tariff then 

	set in_reason := concat('Тариф сменился c ', if(old.tariff = '', '-', old.tariff), ' на ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 
	
	if new.tariff like tariff_disabled or new.tariff = '' then
	
		set in_action := 'disable';

	else
	
		if (old.tariff like tariff_disabled or old.tariff = '') and new.tariff != '' and port_status_by_auth_status_new = port_status_active then

			set in_action := 'enable';
			
		end if;
	
	end if;
	
	-- insert into debug_tmp values (concat(in_reason, ' ', in_action, ' ', in_c_id));
	
end if;

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- 2. изменился тариф (новая обработка)

if old.tariff != new.tariff and old.tariff != '' and new.tariff != '' then 

	set in_reason := concat('Тариф сменился c ', if(old.tariff = '', '-', old.tariff), ' на ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 
	
	-- if new.tariff like tariff_with_shaper and old.tariff not like tariff_with_shaper then
	if exists (select * from bd_shaper_tariffs where new.tariff like name and old.tariff not like name) then
	
		set in_action := 'shaper_on';
		set in_argument := '1M';

	else
	
		-- if old.tariff like tariff_with_shaper and new.tariff not like tariff_with_shaper and port_status_by_auth_status_new = port_status_active then
		if exists (select * from bd_shaper_tariffs where old.tariff like name and new.tariff not like name) and port_status_by_auth_status_new = port_status_active then

			set in_action := 'shaper_off';
			
		end if;
	
	end if;
	
	-- insert into debug_tmp values (concat(in_reason, ' ', in_action, ' ', in_c_id));
	
end if;

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';
set in_argument := '';

-- 3. сменился статус 
-- проверка "or (old.auth_status != new.auth_status and new.auth_status = 3)" нужна для безболезненного перехода между "мягкой" и "жёсткой" схемой отключения

if (port_status_by_auth_status_old != port_status_by_auth_status_new or (old.auth_status != new.auth_status and new.auth_status = auth_status_active)) then

	set in_reason := concat('Статус ОА сменился c ', auth_status_name(old.auth_status), ' на ', auth_status_name(new.auth_status), ' при тарифе ', new.tariff); 

	if port_status_by_auth_status_new = port_status_active and new.tariff not like tariff_disabled and new.tariff != '' then -- ... при активном тарифе
	-- if port_status_by_auth_status_new = port_status_active and new.tariff != '' then -- ... при активном тарифе (новая обработка)
		
		set in_action := 'enable';
	
	else

		if port_status_by_auth_status_new != port_status_active then
			
			set in_action := 'disable';
		
		end if;
		
	end if;

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- 4. действия для приставок при изменении статуса ОА

-- возможно, стоит убрать лишние проверки, они уже есть в процедуре stb_onoff

-- if new.auth_status != old.auth_status and new.tariff not like tariff_disabled and new.tariff != '' then
if new.auth_status != old.auth_status or new.tariff != old.tariff then

	-- set in_reason := concat('Статус ОА сменился c ', auth_status_name(old.auth_status), ' на ', auth_status_name(new.auth_status), ' при тарифе ', new.tariff); 

	call stb_onoff(new.ip);

end if;

-- выполняем действие 

if in_action != '' then

	-- call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
	set in_action := '';
	
end if;

-- 5. ограничения по тарифу Городской (01.08.2013)

if new.tariff like tariff_on_hold and old.tariff != new.tariff then 

	set in_action := 'private_net_restriction';
	
	set in_argument := 10;

	set in_reason := concat('Тариф сменился c ', if(old.tariff = '', '-', old.tariff), ' на ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 

end if;

if old.tariff like tariff_on_hold and new.tariff not like tariff_on_hold then 

	set in_action := 'private_net_restriction';
	
	set in_argument := 0;

	set in_reason := concat('Тариф сменился c ', if(old.tariff = '', '-', old.tariff), ' на ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- 6. органичения по тарифу для ЗС

if new.tariff like tariff_private_net and old.tariff != new.tariff then 
	
	set private_net_old := substring_index(old.tariff, " ", -2) + 0;
	
	set private_net_new := substring_index(new.tariff, " ", -2) + 0;
	
	if private_net_old = 100 then -- ограничение "100" = нет ограничения
	
		set private_net_old := 0;
		
	end if;
	
	if private_net_new = 100 then -- ограничение "100" = нет ограничения
	
		set private_net_new := 0;
	
	end if;
	
	if private_net_old != private_net_new then
	
		set in_action := 'private_net_restriction';
	
		set in_argument := private_net_new;
	
		set in_reason := concat('Ограничение тарифа ЗС сменилось с ', private_net_old, ' на ', in_argument); 

	end if;

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- 7. изменения в услуге iptv

-- if old.iptv_name != new.iptv_name and locate('level', new.iptv_name) > 0 then
if old.iptv_name != new.iptv_name or ((old.tariff like tariff_with_shaper or new.tariff like tariff_with_shaper) and new.tariff != old.tariff) or ((old.auth_status = auth_status_suspend or new.auth_status = auth_status_suspend) and old.auth_status != new.auth_status) then

	set in_iptv_status := (select iptv_status from connections_dev where id = in_c_id);
	
	if in_iptv_status = 'ENABLED_AUTO' then

		if new.tariff like tariff_with_shaper or new.auth_status = auth_status_suspend then
	
			set in_reason := concat('Тариф ', new.tariff, ' при статусе ОА ', auth_status_name(new.auth_status)); 
			set in_argument := '-1';
			set in_action := 'iptv_range';

		else

			set in_argument := mid(new.iptv_name, 13, 1);
		
			if old.iptv_name = '' then
			
				set iptv_level_old := '-1';
				
			else
			
				set iptv_level_old := mid(old.iptv_name, 13, 1);
			
			end if;
			
			if in_argument = '' then
			
				set in_argument := '-1';
			
			end if;
			
			if in_argument != iptv_level_old then -- если сменилась именно циферка, а на просто название доп услуги 
			
				set in_reason := concat('Уровень IPTV сменился c ', iptv_level_old, ' на ', in_argument);
				set in_action := 'iptv_range';
			
			end if;

			if old.tariff like tariff_with_shaper then -- если тариф сменился с шейпируемого
			
				set in_reason := concat('Тариф сменился c ', if(old.tariff = '', '-', old.tariff), ' на ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 
				set in_action := 'iptv_range';
			
			end if;

			if old.auth_status = auth_status_suspend then -- если статус ОА сменился с приостановленного
			
				set in_reason := concat('Статус ОА сменился c ', auth_status_name(old.auth_status), ' на ', auth_status_name(new.auth_status), ' при тарифе ', new.tariff); 
				set in_action := 'iptv_range';
			
			end if;

		end if;

	end if;

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

set in_action := '';

-- 8. изменения в дополнительных пакетах iptv

if old.iptv_ext != new.iptv_ext and new.iptv_ext != '' then
	
	set in_argument := new.iptv_ext;
	
	set in_reason := concat('Дополнительный пакет каналов сменился с &quot;', old.iptv_ext, '&quot; на &quot;', in_argument, '&quot;');
	
	set in_action := 'stb_pocket';

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

END
//

DROP TRIGGER IF EXISTS `bd_sync_ins`//
CREATE TRIGGER `bd_sync_ins` AFTER INSERT ON `billing_data_dev`
 FOR EACH ROW BEGIN

declare in_action varchar(32) default '';
declare in_reason varchar(256) default '';
declare in_c_id mediumint unsigned;
declare in_argument char(2) default '';

declare tariff_disabled varchar(32) default 'Временно отключенный абонент%';
declare tariff_with_shaper varchar(32) default 'Временно отключенный порт%';
declare tariff_private_net varchar(16) default 'Узел ЗС%';
declare tariff_on_hold varchar(16) default 'Городской%';

declare private_net_new tinyint default -1;

declare in_iptv_status varchar(16);

declare port_status_by_auth_status_new varchar(8) default 'disable';
declare port_status_active varchar(8) default 'enable';

declare c_nexus_auto_return varchar(128);

declare auth_status_active tinyint default 3;
declare auth_status_suspend tinyint default 4;

declare in_time timestamp default current_timestamp;

--

set port_status_by_auth_status_new = (select port_status from bd_auth_status where id = new.auth_status);

set in_c_id := get_c_id_by_ip(new.ip);

-- пишем дебаг

if @bd_sync_debug = true then

	insert into bd_sync_log(`trigger`, ip, c_id, client_name_new, tariff_new, auth_status_new, iptv_name_new, iptv_ext_new) values
		('insert', new.ip, in_c_id, new.client_name, new.tariff, new.auth_status, new.iptv_name, new.iptv_ext);

end if;

-- обновляем связку родитель - дитя

set c_nexus_auto_return := c_nexus_auto(new.ip);

-- тариф/статус ОА

if new.tariff not like tariff_disabled and new.tariff != '' and port_status_by_auth_status_new = port_status_active then 

	set in_reason := concat('Тариф ', new.tariff, ' при статусе ОА ', auth_status_name(new.auth_status)); 

	set in_action := 'enable';

else

	set in_reason := concat('Тариф ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 

	set in_action := 'disable';
	
end if;

-- выполняем действие 

if in_reason is null then
		
	set in_reason := concat(new.ip, ' неизвестная причина');

end if;

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

set in_action := '';

-- тариф/статус ОА (новая обработка)

if new.tariff != '' and port_status_by_auth_status_new = port_status_active then

	-- if new.tariff like tariff_with_shaper then 
	if exists (select * from bd_shaper_tariffs where new.tariff like name) then
	
		set in_reason := concat('Тариф ', if(new.tariff = '', '-', new.tariff), ' при статусе ОА ', auth_status_name(new.auth_status)); 

		set in_action := 'shaper_on';
		set in_argument := '1M';

	else

		set in_reason := concat('Тариф ', new.tariff, ' при статусе ОА ', auth_status_name(new.auth_status)); 

		set in_action := 'shaper_off';
		
	end if;

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

set in_action := '';
set in_argument := '';

-- органичения по тарифу Городской (01.08.2013)

if new.tariff like tariff_on_hold then 
	
	set private_net_new := 10;
	
	set in_action := 'private_net_restriction';

	set in_argument := private_net_new;

	set in_reason := concat('Тариф ', tariff_on_hold ,' для ОА ', new.ip, ' имеет ограничение ', in_argument); 

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- органичения по тарифу для ЗС

if new.tariff like tariff_private_net then 
	
	set private_net_new := substring_index(new.tariff, " ", -2) + 0;
	
	if private_net_new = 100 then -- ограничение "100" = нет ограничения
	
		set private_net_new := 0;
	
	end if;
	
	set in_action := 'private_net_restriction';

	set in_argument := private_net_new;

	set in_reason := concat('Тариф ЗС для ОА ', new.ip, ' имеет ограничение ', in_argument); 

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- iptv

if new.iptv_name != '' then

	set in_iptv_status := (select iptv_status from connections_dev where id = in_c_id);
	
	if in_iptv_status = 'ENABLED_AUTO' then
	
		if new.tariff like tariff_with_shaper or new.auth_status like auth_status_suspend then

			set in_reason := concat('Тариф ', new.tariff, ' при статусе ОА ', auth_status_name(new.auth_status)); 
			set in_argument := '-1';
			set in_action := 'iptv_range';

		else

			set in_argument := mid(new.iptv_name, 13, 1);

			if in_argument = '' then
			
				set in_argument := '-1';
			
			end if;

			set in_reason := concat('Уровень IPTV ', in_argument);
			
			set in_action := 'iptv_range';

		end if;
	
	end if;

end if;

if in_reason is null then
		
	set in_reason := concat(new.ip, ' неизвестная причина');

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

-- изменения в дополнительных пакетах iptv

set in_action := '';

if new.iptv_ext != '' then
	
	set in_argument := new.iptv_ext;
	
	set in_reason := concat('Дополнительный пакет каналов сменился на &quot;', in_argument, '&quot;');
	
	set in_action := 'stb_pocket';

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

-- действия для приставок при изменении статуса ОА

call stb_onoff(new.ip);

END
//

DROP TRIGGER IF EXISTS `bd_sync_del`//
CREATE TRIGGER `bd_sync_del` AFTER DELETE ON `billing_data_dev`
 FOR EACH ROW BEGIN
 
declare in_action varchar(32) default '';
declare in_reason varchar(256) default '';
declare in_c_id mediumint unsigned;
declare in_argument, iptv_level_old char(2) default '';
declare auth_status_active tinyint default 3;
declare tariff_private_net varchar(16) default 'Узел ЗС%';
declare tariff_on_hold varchar(16) default 'Городской%';
declare in_iptv_status varchar(16);

declare c_nexus_auto_return varchar(128);

declare in_time timestamp default current_timestamp;

--

set in_c_id := get_c_id_by_ip(old.ip);

-- пишем дебаг

if @bd_sync_debug = true then

	insert into bd_sync_log(`trigger`, ip, c_id, client_name_old, tariff_old, auth_status_old, iptv_name_old, iptv_ext_old) values
		('delete', old.ip, in_c_id, old.client_name, old.tariff, old.auth_status, old.iptv_name, old.iptv_ext);

end if;

-- обновляем связку родитель - дитя

set c_nexus_auto_return := c_nexus_auto(old.ip);

--

set in_reason := concat('Объект авторизации ', old.ip, ' удалён из биллинга'); 
set in_action := 'disable';

-- выполняем действие 

call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

set in_action := '';

-- органичения по тарифу Городской (01.08.2013)

if old.tariff like tariff_on_hold then 
	
	set in_action := 'private_net_restriction';

	set in_argument := '0';

	set in_reason := concat('ОА (', old.ip ,') с тарифом ', old.tariff, ' удалён из биллинга'); 

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- органичения по тарифу для ЗС

if old.tariff like tariff_private_net then 
	
	set in_action := 'private_net_restriction';

	set in_argument := '0';

	set in_reason := concat('ОА (', old.ip ,') для ЗС удалён из биллинга'); 

end if;

-- выполняем действие 

if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);
	
end if;

set in_action := '';

-- изменения в услуге iptv
-- set in_iptv_status := (select iptv_status from connections_dev where id = in_c_id);
-- set iptv_level_old := (select iptv_range from connections_dev where id = in_c_id);
select iptv_status, iptv_range into in_iptv_status, iptv_level_old from connections_dev where id = in_c_id;

if in_iptv_status = 'ENABLED_AUTO' and iptv_level_old != '-1' then

	set in_action := 'iptv_range';
	set in_argument := '-1';

end if;

-- выполняем действие 
if in_action != '' then

	call sch_action_add(in_c_id, in_action, in_argument, in_reason, in_time);

end if;

END
//

