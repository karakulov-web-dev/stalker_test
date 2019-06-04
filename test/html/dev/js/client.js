var client = {}

client.check_credentials = function() {

	if(localStorage.login == undefined || localStorage.passwd == undefined) {
		return false;
	}
	else {
		return true;
	}
}

client.update_credentials = function () {
	storage.save_login($('#user_login').val());
	storage.save_passwd($('#user_pass').val());
}

client.parse_msg = function(msg_obj, msg_text) {

	if(msg_obj && msg_obj.type == "send_msg") {

		storage.set_key('msg_' + msg_obj.id, msg_obj.msg);

		client.osd_text(msg_obj.msg);

		client.msg_bell();

		// client.parse_msg();

		// if(player.get_state() == 3) {
		// 	player.osd_text_show(msg_obj.msg);
		// }
		// else {
		// 	alert(msg_obj.msg);
		// }
	}
}

client.msg_bell = function() {
	layout.msg_bell(storage.msg_num());
}

client.get_msg = function() {
	Object.keys(localStorage).filter(function(element) {return element.substr(0, 4) == "msg_";}).forEach(function(element) {layout.msg_to_page(localStorage.getItem(element), element);})
}

client.save_value = function (field, value) {
	localStorage.field = value;
	return true;
}

client.init = function() {
	// server.auth();
	// server.ping();
}

// wrappers start

client.ping = function() { // DEPRECATED
	server.ping();
}

client.rec = function(ch_id) {
	server.rec(ch_id);
}

client.media_info_upd = function(ch_id) {  // DEPRECATED
	server.media_info_upd(ch_id);
}

client.media_info_del = function() {  // DEPRECATED
	server.media_info_del();
}

client.fav_add = function(ch_id) {
	server.fav_add(ch_id);
}

client.fav_del = function(ch_id) {
	server.fav_del(ch_id);
}

client.censor = function(ch_id) {
	server.censor(ch_id);
}

client.rec_epg = function(ch_id, epg_id) {
	server.rec_epg(ch_id, epg_id);
}

client.auth = function(force) { // DEPRECATED
	server.auth(force);
}

client.request = function(url) {
	server.request(url);
}

client.request_post = function(url) {
	server.request_post(url);
}

client.request_put = function(url) {
	server.request_put(url);
}

client.request_delete = function(url) {
	server.request_delete(url);
}

client.get_ch_list = function() { // DEPRECATED
	server.get_ch_list();
}

client.request2 = function() { // DEPRECATED
	server.request2(url);
}

client.play_ch = function(ch_id) { // DEPRECATED

	client.epg_layout_periodic_stop();
	client.position_hide();

	layout.epg_set_not_loaded();
	layout.epg_show_today();

	server.play_ch(ch_id);
	client.media_info_upd(ch_id);

	storage.save_ch_id(ch_id);

	storage.set_played_media(ch_id, MEDIA_TV);
	storage.set_playing_media(ch_id, MEDIA_TV);

	storage.init_stopped_media();

	client.epg_layout_periodic_start();
}

client.get_epg = function (ch_id, shift) {
	debug('get_epg ch_id = ' + ch_id + ', shift = ' + shift);
	shift = parseInt(shift);

	if (shift == 0 && storage.get_epg(ch_id, shift)) {
		debug('get epg from storage');
		var obj = parse_response(storage.get_epg(ch_id, shift));
		layout.epg(obj.results, shift);
	}
	else {
		server.get_epg(ch_id, shift);
	}	
}

// client.get_msg = function() { // DEPRECATED
// 	debug('client.get_msg');
// 	server.get_msg();
// }

client.play_epg = function(program_id) {

	server.play_epg(program_id);

	storage.set_played_media(program_id, MEDIA_EPG);
	storage.set_playing_media(program_id, MEDIA_EPG, $('[epg_id=' + program_id + ']').attr('duration'));
	
	storage.init_stopped_media();

	layout.current_epg_name();
	client.position_show();
}

client.get_ch_list = function() {  // DEPRECATED
	server.get_ch_list();
}

client.play = function() {  // DEPRECATED
	debug('client.play');
}

client.stop = function() {  // DEPRECATED

	client.position_hide();
	storage.init_playing_media();
	if(client.auth_check()) client.media_info_del();
	player.stop();
	layout.current_epg_name_clear();
	// client.epg_layout_periodic_stop();
}

client.get_tv_genres = function() {
	
	if (storage.get_genres() === undefined) {
		server.get_tv_genres();
	}
	else {
		var obj = parse_response(storage.get_genres());
		layout.tv_genres(obj.results);
	}
}

client.stop_inactive = function() { // DEPRECATED
	if(player.get_state() == 3) {

		storage.set_stopped_media();
		storage.set_stop_inactive(1);

		debug('stop_inactive ' + storage.get_stop_inactive());
		client.stop();
	}
}

client.resume_stoped = function() {  // DEPRECATED
	debug('resume_stoped ' + storage.get_stop_inactive())
	if(storage.get_stop_inactive() == "1") {
		client.play_ch(storage.get_ch_id());
	}
}

// wrappers stop

client.init_post = function() { // DEPRECATED
	debug('client.init_post');
	if(client.auth_check()) {
		client.ping();
		client.get_ch_list();
		TIMER = setInterval(client.periodic, PERIOD_PING);
		// client.epg_layout_periodic_start();
	}
}

client.periodic2 = function() {  // DEPRECATED
	debug('periodic2 ' +  my_date.now());
}

client.epg_loaded = function () {

	if($('#epg_tabs .active tbody tr').length > 0) {
		return true;
	}
	else {
		return false;
	}
}

client.periodic = function() {  // DEPRECATED

	// var interval = 120000;
	// var interval = 120000;
	// setInterval(client.periodic, interval);

	debug('periodic ' +  my_date.now());

	if(client.auth_check()) {

		client.ping();
		client.get_msg();

		// if(client.epg_loaded()) { // если epg загружена
		// 	layout.epg_recorded();
		// 	layout.epg_scroll_now();
		// 	layout.current_epg_name();
		// }
	}
}

client.cur_epg_upd = function() {
	if(application.cur_media_type == MEDIA_TV) {
		if($('#epg_0 tbody tr.warning').length) {
			application.cur_epg_id = $('#epg_0 tbody tr.warning').attr('epg_id');
			// application.cur_epg_start = $('#epg_0 tbody tr.warning').attr('start');
			// application.cur_epg_duration = $('#epg_0 tbody tr.warning').attr('duration');
			// layout.epg_progress((my_date.now() - parseInt(application.cur_epg_start) ) / parseInt(application.cur_epg_duration) * 100);
		}
	}
}

client.epg_layout = function() {

	if(client.epg_loaded()) { // если epg загружена
		layout.epg_recorded();
		if(!$('#epg_tabs').is(":hover") && application.cur_media_type != MEDIA_EPG) {
			layout.epg_scroll_now();
		}
		client.cur_epg_upd();
	}
}

client.epg_clear = function() {

	if(client.epg_loaded()) { // если epg загружена
		layout.epg_recorded();
		layout.epg_scroll_now();
		layout.current_epg_name();
	}
}


client.epg_progress_layout = function() {
	layout.epg_time();
	layout.epg_progress(application.cur_epg_position);
	if(application.cur_media_type == MEDIA_EPG) {
		layout.player_position();
	}
}


client.fav_switch = function() {
	layout.fav_switch($('#fav_switch.active').length != 1);

	if(player.get_state() == 3) {
		layout.scroll_to_ch(storage.get_ch_id());
	}

	storage.set_key('fav', $('#fav_switch.active').length);
}

client.fav_restore = function() {
	layout.fav_switch(storage.get_key('fav'));
}

// client.epg_layout_periodic_start = function() {  // DEPRECATED
// 	debug('epg_layout_periodic_start');
// 	TIMER_EPG = setInterval(client.epg_layout, PERIOD_EPG);
// }

// client.epg_layout_periodic_stop = function() {  // DEPRECATED
// 	debug('epg_layout_periodic_stop');
// 	clearInterval(TIMER_EPG);
// }

client.auth_check = function() { // DEPRECATED
	if(server.user_id !== null && server.access_token !== null) {
		return true;
	}
	else {
		return false;
	}
}

client.position_show = function() {  // DEPRECATED
	debug('position_show');
	TIMER_TIMELINE = setInterval(layout.position, PERIOD_TIMELINE);
}

client.position_hide = function() {  // DEPRECATED
	debug('position_hide');
	clearInterval(TIMER_TIMELINE);
}

client.osd_text = function (text) {

	if(TIMER_OSD) clearTimeout(TIMER_OSD);

	player.osd_text_show(text);
	setTimeout(player.osd_text_hide, PERIOD_OSD);
}

