/**
 * settins tvip module.
 */

(function(){

if (stb.mac.substring(0,8)!="10:27:BE")
        {
                loader.next();
                return;
        }
        
function settings_tvip_constructor(){
        
   this.layer_name = 'settings_tvip';   
   this.dom_obj = this.create_block('');   
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;

   this.selected_page = -1;
   this.page_main = 0;
   this.page_security = 1;
   this.page_portal = 2;
   this.page_protokol = 3;
   this.stb_settings = 4;

   this.page_main_selected_button = 0;
   this.stream_type = 0;
   this.selected_element_on_page = 0;
   this.themes = [[0, "Cappuccino", "cappuccino"],
                  [1, "Default", "default"],
                  [2, "Digital", "digital"],
                  [3, "Emerald", "emerald"],
                  [4, "Ocean blue", "ocean_blue"]];
   this.screensaver = [[0, "Выключено", 0],
                       [1, "10 мин", 10],
                       [2, "20 мин", 20],
                       [3, "30 мин", 30]];
   this.screensaver_index = 0;
   this._load_ok_check = false;
   this._after_load = "";
   this._theme = "";
   this.themes_index = 0;
   this.pass = "";
   this.new_pass = "";
   this.new_pass_confirm = "";
   this.parent_password = "";
   this.ad = 0;

   this.init = function(){
        _debug('settings_tvip.init');

       var container = create_block_element('settings_tvip', this.dom_obj);
       var pp = '<div id="settings_page" style="display:block;"><div id="settings_page_caption">Настройки</div><hr id="settings_page_line"><div id="settings_page_main" style="display:block;"><div id="settings_page_main_button0"><div id="settings_page_main_button0_ico" img=""></div><div id="settings_page_main_button0_caption">Родительские</div></div><div id="settings_page_main_button1"><div id="settings_page_main_button1_ico" img=""></div><div id="settings_page_main_button1_caption">Портал</div></div><div id="settings_page_main_button2"><div id="settings_page_main_button2_ico" img=""></div><div id="settings_page_main_button2_caption">Протокол вещания</div></div><div id="settings_page_main_button3"><div id="settings_page_main_button3_ico" img=""></div><div id="settings_page_main_button3_caption">Настройки приставки</div></div></div><div id="settings_page_security" style="display:none;"><div id="settings_page_security_pass"><div class="settings_page_menu_caption">Пароль:</div><input type="password_focus" id="settings_page_security_pass_input"><div id="settings_tvip_security_cursor0" class="settings_tvip_cursor">|</div></div><div id="settings_page_security_new_pass"><div class="settings_page_menu_caption">Новый пароль:</div><input type="password" id="settings_page_security_new_pass_input"><div id="settings_tvip_security_cursor1" class="settings_tvip_cursor">|</div></div><div id="settings_page_security_conf_pass"><div class="settings_page_menu_caption">Подтверждение пароля:</div><input type="password" id="settings_page_security_conf_pass_input"><div id="settings_tvip_security_cursor2" class="settings_tvip_cursor">|</div></div><div id="settings_page_security_check_ivi"><div class="settings_page_menu_caption">Пароль на IVI</div><checkbox type="not_check" id="settings_page_security_checking_ivi"></div><div id="settings_page_security_check_catalog"><div class="settings_page_menu_caption">Пароль на Видеокаталог</div><checkbox type="not_check" id="settings_page_security_checking_catalog"></div><div id="settings_page_security_check_youtube"><div class="settings_page_menu_caption">Пароль на Youtube</div><checkbox type="not_check" id="settings_page_security_checking_youtube"></div><div id="settings_page_security_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_security_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div><div id="settings_page_portal" style="display:none;"><div id="settings_page_portal_load"><div class="settings_page_menu_caption">Отобразить после загрузки:</div><input type="portal_focus" id="settings_page_portal_load_input"></div><div id="settings_page_portal_load_ok"><div class="settings_page_menu_caption">Проигрывать каналы только по ОК:</div><checkbox type="check_portal" id="settings_page_portal_load_ok_check"></div><div id="settings_page_portal_tema"><div class="settings_page_menu_caption">Тема:</div><input type="portal" id="settings_page_portal_tema_input"></div><div id="settings_page_portal_screensaver"><div class="settings_page_menu_caption">Хранитель экрана:</div><input type="portal" id="settings_page_portal_screensaver_input"></div><div id="settings_page_portal_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_portal_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div><div id="settings_page_protokol" style="display:none;"><div id="settings_page_protokol_variant"><div class="settings_page_menu_caption">Протокол вещания:</div><input type="protokol_focus" id="settings_page_protokol_variant_input"></div><div id="settings_page_protokol_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_protokol_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div></div>';
          container.innerHTML = pp;

     };
        
    this.show = function(){
         _debug('settings_tvip.show');
          this.superclass.show.call(this);                    
        };
        
    this.hide = function(){
            _debug('settings_tvip.hide');            
            this.superclass.hide.call(this);                        
        };

    this.update_main_menu = function(){
            _debug('update_main_menu');
            if (settings_tvip.page_main_selected_button==4) { settings_tvip.page_main_selected_button=0 };
            if (settings_tvip.page_main_selected_button==-1) { settings_tvip.page_main_selected_button=3 };
            for (var i = 0; i < 4; i++){            		
            		switch (i) {
   							case 0:
   								img="ico_lock";
   							break;
   							case 1:
   								img="ico_lang";
   							break;
   							case 2:
   								img="ico_wifi";
   							break;
   							case 3:
   								img="ico_advset";
   							break;
   						}
            		if (i==settings_tvip.page_main_selected_button)
            		{
            				document.getElementById('settings_page_main_button'+i+'_ico').style.backgroundImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/"+img+"_act.png)";            				
            				document.getElementById('settings_page_main_button'+i).style.backgroundColor = "white";
            				document.getElementById('settings_page_main_button'+i+"_caption").style.color = "#1B3D73";
            				            		}
            		else
            		{
            				document.getElementById('settings_page_main_button'+i+'_ico').style.backgroundImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/"+img+".png)";
            				document.getElementById('settings_page_main_button'+i).style.backgroundColor = "#1B3D73";
            				document.getElementById('settings_page_main_button'+i+"_caption").style.color = "white";
            		}
            }                        
        };

    this.show_main_menu = function(){
    											document.getElementById('settings_page_caption').innerHTML ="Настройки";
    											document.getElementById('settings_page_main').style.display = 'block';
   												document.getElementById('settings_page_security').style.display = 'none';
   												document.getElementById('settings_page_portal').style.display = 'none';
   												document.getElementById('settings_page_protokol').style.display = 'none';
   												this.selected_page=this.page_main;   												
    	};

    this.selected_protokol = function(key){    							 
    								if (this.selected_element_on_page==0) {
    								if (document.getElementById('settings_page_protokol_variant_input').value == "Вариант2 (HLS)")
   											{
   												document.getElementById('settings_page_protokol_variant_input').value = "Вариант1 (TS)";
   											}
   											else
   											{
   												document.getElementById('settings_page_protokol_variant_input').value = "Вариант2 (HLS)";
   											}   							
   									}
   									else
   									{
   											if (key=="right") this.selected_element_on_page++;
   											if (key=="left") this.selected_element_on_page--;
   											this.update_page_protokol();
   									}			
    	};

    this.update_page_protokol = function(){
    								if (this.selected_element_on_page==-1) this.selected_element_on_page=0;
    								if (this.selected_element_on_page==3) this.selected_element_on_page=2;
    							switch (this.selected_element_on_page) {
    								case 0:
    										document.getElementById('settings_page_protokol_variant_input').setAttribute('type','protokol_focus');
   												document.getElementById('settings_page_protokol_variant_input').style.display = 'block';
   												document.getElementById('settings_page_protokol_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   												document.getElementById('settings_page_protokol_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    								break;
    								case 1:
    										document.getElementById('settings_page_protokol_variant_input').setAttribute('type','protokol');
   												document.getElementById('settings_page_protokol_variant_input').style.display = 'block';
   												document.getElementById('settings_page_protokol_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_act.png) 0 0 0 0";
   												document.getElementById('settings_page_protokol_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    								break;
    								case 2:
    										document.getElementById('settings_page_protokol_variant_input').setAttribute('type','protokol');
   												document.getElementById('settings_page_protokol_variant_input').style.display = 'block';
   												document.getElementById('settings_page_protokol_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_.png) 0 0 0 0";
   												document.getElementById('settings_page_protokol_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l_act.png) 0 0 0 0";
    								break;
   										}
    };

    this.update_page_portal = function(){
    								if (this.selected_element_on_page==-1) this.selected_element_on_page=0;
    								if (this.selected_element_on_page==6) this.selected_element_on_page=5;
    							switch (this.selected_element_on_page) {
    										case 0:
    											document.getElementById('settings_page_portal_load_input').setAttribute('type','portal_focus');
    											//document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    											if (this._load_ok_check==true)
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal');
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    														}
    											document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal');
   												document.getElementById('settings_page_portal_load_input').style.display = 'block';
   												document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
   												document.getElementById('settings_page_portal_tema_input').style.display = 'block';
                          document.getElementById('settings_page_portal_screensaver_input').setAttribute('type','portal');
                          document.getElementById('settings_page_portal_screensaver_input').style.display = 'block';
   												document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   												document.getElementById('settings_page_portal_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";

    										break;
    										case 1:
    											document.getElementById('settings_page_portal_load_input').setAttribute('type','portal');
    											if (this._load_ok_check==true)
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal_focus');
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal_focus');
    														}
    											document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal');
   												document.getElementById('settings_page_portal_load_input').style.display = 'block';
   												document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
   												document.getElementById('settings_page_portal_tema_input').style.display = 'block';
   												document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   												document.getElementById('settings_page_portal_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    										break;
    										case 2:
    											document.getElementById('settings_page_portal_load_input').setAttribute('type','portal');
    											//document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    											if (this._load_ok_check==true)
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal');
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    														}
    											document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal_focus');
   												document.getElementById('settings_page_portal_load_input').style.display = 'block';
   												document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
   												document.getElementById('settings_page_portal_tema_input').style.display = 'block';
                          document.getElementById('settings_page_portal_screensaver_input').setAttribute('type','portal');
                          document.getElementById('settings_page_portal_screensaver_input').style.display = 'block';
   												document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   												document.getElementById('settings_page_portal_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    										break;
                        case 3:
                              document.getElementById('settings_page_portal_screensaver_input').setAttribute('type','portal_focus');
                              document.getElementById('settings_page_portal_screensaver_input').style.display = 'block';
                              document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal');
                              document.getElementById('settings_page_portal_tema_input').style.display = 'block';
                              document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
                        break;
    										case 4:
    											document.getElementById('settings_page_portal_load_input').setAttribute('type','portal');
    											//document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    											if (this._load_ok_check==true)
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal');
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    														}
    											document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal');
   												document.getElementById('settings_page_portal_load_input').style.display = 'block';
   												document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
   												document.getElementById('settings_page_portal_tema_input').style.display = 'block';
                          document.getElementById('settings_page_portal_screensaver_input').setAttribute('type','portal');
                          document.getElementById('settings_page_portal_screensaver_input').style.display = 'block';
   												document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_act.png) 0 0 0 0";
   												document.getElementById('settings_page_portal_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    										break;
    										case 5:
    											document.getElementById('settings_page_portal_load_input').setAttribute('type','portal');
    											//document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    											if (this._load_ok_check==true)
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal');
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal');
    														}
    											document.getElementById('settings_page_portal_tema_input').setAttribute('type','portal');
   												document.getElementById('settings_page_portal_load_input').style.display = 'block';
   												document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
   												document.getElementById('settings_page_portal_tema_input').style.display = 'block';
   												document.getElementById('settings_page_portal_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   												document.getElementById('settings_page_portal_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l_act.png) 0 0 0 0";
    										break;    										
    							}
    };

    this.selected_on_page_portal = function(key){
    					switch (this.selected_element_on_page) {
    										case 0:
    												if ((key=="left")||(key=="right"))
    												{
    												if (document.getElementById('settings_page_portal_load_input').value=="Главное меню") {
   																	document.getElementById('settings_page_portal_load_input').value = "Последний ТВ канал";
   															}
   															else
   															{
   																	document.getElementById('settings_page_portal_load_input').value = "Главное меню";
   															}
   													}   													
    										break;
    										case 1:
    												if (key=="ok")
    												{
    														if (document.getElementById('settings_page_portal_load_ok_check').getAttribute('type')=="check_portal_focus")
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','checked_portal_focus');
    															this._load_ok_check=true;
    														}
    														else
    														{
    															document.getElementById('settings_page_portal_load_ok_check').setAttribute('type','check_portal_focus');
    															this._load_ok_check=false;
    														}
    														document.getElementById('settings_page_portal_load_ok_check').style.display = 'block';
    														console.log('attribute ='+document.getElementById('settings_page_portal_load_ok_check').getAttribute('type'));
    												}
    										break;
    										case 2:    												
    												if (key=="right")
    												{
    												this.themes_index++;
    												if (this.themes_index>4) this.themes_index=0;
    												document.getElementById('settings_page_portal_tema_input').value=this.themes[this.themes_index][1];
    												console.log("themes_index="+this.themes_index);
    												}
    												if (key=="left")
    												{
    												this.themes_index--;
    												if (this.themes_index<0) this.themes_index=4;
    												document.getElementById('settings_page_portal_tema_input').value=this.themes[this.themes_index][1];
    												console.log("themes_index="+this.themes_index);
    												}
    										break;
                        case 3:
                            if (key=="right")
                            {
                              this.screensaver_index++;
                              if (this.screensaver_index>3) this.screensaver_index=0;
                              document.getElementById('settings_page_portal_screensaver_input').value=this.screensaver[this.screensaver_index][1];
                            }
                            if (key=="left")
                            {
                              this.screensaver_index--;
                              if (this.screensaver_index<0) this.screensaver_index=3;
                              document.getElementById('settings_page_portal_screensaver_input').value=this.screensaver[this.screensaver_index][1];
                            }
                        break;
    										case 4:
    												if (key=="ok")
    												{
    													if (document.getElementById('settings_page_portal_load_input').value == "Главное меню")
    													{    													
    													n1='"show_after_loading":"main_menu"';
    													stb.profile.show_after_loading="main_menu";   														
    													}
    													else
    													{    													
    													n1='"show_after_loading":"last_channel"';
    													stb.profile.show_after_loading="last_channel";
    													}
    													if (this._load_ok_check==true)
    													{    														
    														n2='"play_in_preview_by_ok":true';
    														stb.profile.play_in_preview_only_by_ok=true;
    													}
    													else
    													{
    														n2='"play_in_preview_by_ok":false';
    														stb.profile.play_in_preview_only_by_ok=false;
    													}
    													
    													n3='"theme":"'+this.themes[this.themes_index][2]+'"';
    													n='{'+n1+','+n2+','+n3+',"screensaver_delay":"'+this.screensaver[this.screensaver_index][2]+'","type":"settings"}';
    													n_='{'+n1+','+n2+','+n3+',"type":"stb","action":"set_portal_prefs"}';    													
    													// load_set_tvip(
                	// 											JSON.parse(n_),
                	// 											function (result) {                    												
                 //    												stbEvent.onPortalEvent(n);
                   												 
                 //   												 if (loader.template==settings_tvip.themes[settings_tvip.themes_index][2])
                 //   												{
                 //   												 settings_tvip.show_main_menu();
                 //   												}
                 //   												else
                 //   												{
                 //   													stb.ExecAction('reboot');                   													
                 //   												}

                	// 										});
                              load_set_tvip(JSON.parse(n_), function (result) {
                                            if (!result) {
                                                alert('Saving error');
                                            }
                                            else
                                            {
                                                load_set_tvip({"type": "stb", "action": "set_screensaver_delay", "screensaver_delay": settings_tvip.screensaver[settings_tvip.screensaver_index][2]}, function (result) {
                                                  if (!result) {
                                                                  alert('Saving error');
                                                              }
                                                              else
                                                              {                                                                
                                                                 if (loader.template==settings_tvip.themes[settings_tvip.themes_index][2])
                                                                      {
                                                                          stbEvent.onPortalEvent(n);
                                                                          settings_tvip.show_main_menu();
                                                                      }
                                                                        else
                                                                      {
                                                                          stb.ExecAction('reboot');                                             
                                                                      }
                                                              }
                                                });
                                            }                                          
                                           

                                      });
    												}
    										break;
    										case 5:
    												if (key=="ok")
    												{
    													this.show_main_menu();
    												}
    										break;		
    									}
    };

    function load_set_tvip(params, callback){
   JsHttpRequest.query(       
       'GET '+stb.ajax_loader,

       params,

       function(result, errors){
        // errors - содержит ошибки сервера и debug сообщения
        gSTB.Debug(errors);

           callback(result);
       },

       true,       
       {"Authorization" : "Bearer "+stb.access_token}
   		);
	};

	this.update_page_security = function(){
			if (this.selected_element_on_page==-1) this.selected_element_on_page=0;
    								if (this.selected_element_on_page==8) this.selected_element_on_page=7;
    								switch (this.selected_element_on_page) {
    										case 0:
    												document.getElementById('settings_page_security_pass_input').setAttribute('type','password_focus');
    												document.getElementById('settings_page_security_new_pass_input').setAttribute('type','password');
    												document.getElementById('settings_tvip_security_cursor0').style.display = 'block'; 
    												document.getElementById('settings_tvip_security_cursor1').style.display = 'none';
    												document.getElementById('settings_tvip_security_cursor2').style.display = 'none'; 												
    										break;
    										case 1:
   													document.getElementById('settings_page_security_pass_input').setAttribute('type','password');
    												document.getElementById('settings_page_security_new_pass_input').setAttribute('type','password_focus');
    												document.getElementById('settings_page_security_conf_pass_input').setAttribute('type','password');    												
    												document.getElementById('settings_tvip_security_cursor0').style.display = 'none'; 
    												document.getElementById('settings_tvip_security_cursor1').style.display = 'block';
    												document.getElementById('settings_tvip_security_cursor2').style.display = 'none';
    										break;
    										case 2:    												
    												document.getElementById('settings_page_security_new_pass_input').setAttribute('type','password');
    												document.getElementById('settings_page_security_conf_pass_input').setAttribute('type','password_focus');
    												if ((document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check_focus"))
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','check');
    													}
    													else
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','not_check');
    													}
   													document.getElementById('settings_page_security_checking_ivi').style.display = 'block';
   													document.getElementById('settings_tvip_security_cursor0').style.display = 'none'; 
    												document.getElementById('settings_tvip_security_cursor1').style.display = 'none';
    												document.getElementById('settings_tvip_security_cursor2').style.display = 'block';   													
    										break;
    										case 3:    												
    												document.getElementById('settings_page_security_conf_pass_input').setAttribute('type','password');
    												if (document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check")
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','check_focus');
    													}
    													else
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','not_check_focus');
    													}
   													document.getElementById('settings_page_security_checking_ivi').style.display = 'block';
   													if ((document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check_focus"))
    													{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_catalog').style.display = 'block'; 
   													document.getElementById('settings_tvip_security_cursor0').style.display = 'none'; 
    												document.getElementById('settings_tvip_security_cursor1').style.display = 'none';
    												document.getElementById('settings_tvip_security_cursor2').style.display = 'none'; 													
    										break;
    										case 4:    												
    												if ((document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check_focus"))
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','check');
    													}
    													else
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','not_check');
    													}
   													document.getElementById('settings_page_security_checking_ivi').style.display = 'block';
   													if (document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check")
    													{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','check_focus');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','not_check_focus');
   														}
   													document.getElementById('settings_page_security_checking_catalog').style.display = 'block';   													
   													if ((document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check_focus"))
    													{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_youtube').style.display = 'block';   													
    										break;
    										case 5:    												
   													if ((document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check_focus"))
    													{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_catalog').style.display = 'block';   													
   													if (document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check")
    													{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','check_focus');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','not_check_focus');
   														}
   													document.getElementById('settings_page_security_checking_youtube').style.display = 'block';
   													document.getElementById('settings_page_security_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";   													
    										break;
    										case 6:    												 													
   													if ((document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check")||(document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check_focus"))
    													{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_youtube').style.display = 'block';
   													document.getElementById('settings_page_security_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_act.png) 0 0 0 0";
   													document.getElementById('settings_page_security_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
    										break;
    										case 7:    												
   													document.getElementById('settings_page_security_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   													document.getElementById('settings_page_security_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l_act.png) 0 0 0 0";
    										break;
    								}
	};

	this.selected_on_page_security = function(key){
    					switch (this.selected_element_on_page) {
    										case 3:
    												if (key=="ok")
    												{
    														if (document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="not_check_focus")
    														{
    															document.getElementById('settings_page_security_checking_ivi').setAttribute('type','check_focus');    															
    														}
    														else
    														{
    															document.getElementById('settings_page_security_checking_ivi').setAttribute('type','not_check_focus');    															
    														}
    														document.getElementById('settings_page_security_checking_ivi').style.display = 'block';	
    												}	
    										break;
    										case 4:
    												if (key=="ok")
    												{
    														if (document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="not_check_focus")
    														{
    															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','check_focus');    															
    														}
    														else
    														{
    															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','not_check_focus');    															
    														}
    														document.getElementById('settings_page_security_checking_catalog').style.display = 'block';	
    												}	
    										break;
    										case 5:
    												if (key=="ok")
    												{
    														if (document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="not_check_focus")
    														{
    															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','check_focus');    															
    														}
    														else
    														{
    															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','not_check_focus');    															
    														}
    														document.getElementById('settings_page_security_checking_youtube').style.display = 'block';
    												}
    										break;
    										case 6:
    												if (key=="ok")
    										       {
    										       		//console.log('stb.user.parent_password='+stb.user.parent_password);
                                  console.log('pass ='+this.pass);
                                      console.log('new_pass ='+this.new_pass);
                                      console.log('new_pass_confirm ='+this.new_pass_confirm);
                                      console.log('stb.user.parent_password='+stb.user.parent_password);
                                      console.log('this.parent_password='+this.parent_password);
    										       		if (this.pass==this.parent_password)
    										       			{                                                                    
    										       			if (this.new_pass.length>0)
                                          {
                                        if (this.new_pass==this.new_pass_confirm)
    										       				{
    										       						load_set_tvip(
                																		{"type":"stb","action":"set_parent_password","parent_password" : settings_tvip.pass,"pass":settings_tvip.new_pass, "repeat_pass":settings_tvip.new_pass_confirm},
                																			function (result) {   
                																							if(!result)
                																							{
                																								//Ошибка сохранения
                																								console('Server error');
                																								document.getElementById('settings_page_caption').innerHTML ="Родительские. <span class='message'>Ошибка сервера.</span>";
                																								setTimeout('document.getElementById("settings_page_caption").innerHTML ="Родительские";',7000);
                																							}
                																							else
                																							{                												
                    																							stbEvent.onPortalEvent('{"type":"settings","parent_password":"'+settings_tvip.new_pass+'"}');
                                                                  settings_tvip.parent_password = settings_tvip.new_pass;
                                                                  if (document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check")
                                                                       {
                                                                          stb.RDir('setenv ivipass 1');
                                                                       }
                                                                        else
                                                                      {
                                                                        stb.RDir('setenv ivipass');
                                                                      }

                                                                if (document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check")
                                                                      {
                                                                        stb.RDir('setenv vcatpass 1');
                                                                      }
                                                                        else
                                                                      {
                                                                        stb.RDir('setenv vcatpass');
                                                                      }
                                
                                                                if (document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check")
                                                                      {
                                                                        stb.RDir('setenv youtpass 1');
                                                                      }
                                                                        else
                                                                      {
                                                                        stb.RDir('setenv youtpass');
                                                                      }
                    																							     settings_tvip.show_main_menu();
                    																						}
                																						}
            																		);
    										       				}
    										       				else
    										       				{
    										       								console.log('Ne vernyi parol');
    										       								document.getElementById('settings_page_caption').innerHTML ="Родительские. <span class='message'>Новый пароль и подверждение не совпадают.</span>";
    										       								setTimeout('document.getElementById("settings_page_caption").innerHTML ="Родительские";',7000);
    										       				}
                                    }
                                    else
                                    {
    										       			if (document.getElementById('settings_page_security_checking_ivi').getAttribute('type')=="check")
    										       			{
    										       				stb.RDir('setenv ivipass 1');
    										       			}
    										       			else
    										       			{
    										       				stb.RDir('setenv ivipass');
    										       			}

    										       			if (document.getElementById('settings_page_security_checking_catalog').getAttribute('type')=="check")
    														{
    															stb.RDir('setenv vcatpass 1');
    														}
    														else
    														{
    															stb.RDir('setenv vcatpass');
    														}
    														
    														if (document.getElementById('settings_page_security_checking_youtube').getAttribute('type')=="check")
    														{
    															stb.RDir('setenv youtpass 1');
    														}
    														else
    														{
    															stb.RDir('setenv youtpass');
    														}
                                settings_tvip.show_main_menu();
                              }
    										       }
    										       else
    										       {
    										       		if (this.pass.length==0)
    										       		{
    										       			document.getElementById('settings_page_caption').innerHTML ="Родительские. <span class='message'> Введите пароль.</span>";
    										       			setTimeout('document.getElementById("settings_page_caption").innerHTML ="Родительские";',7000);
    										       		}
    										       		else
    										       		{
    										       			if (this.pass.length>0)
    										       		{
    										       			document.getElementById('settings_page_caption').innerHTML ="Родительские. <span class='message'> Неверный пароль.</span>";
    										       			setTimeout('document.getElementById("settings_page_caption").innerHTML ="Родительские";',7000);	
    										       		}
    										       		}
    										       }
    										   }
    										break;
    										case 7:
    										       if (key=="ok")
    										       {
    										       			this.show_main_menu();
    										       }

    										break;
    						}
    }

    this.dialing_pass= function(num){
    						if (this.selected_page==this.page_security)
   							{
   								if (this.selected_element_on_page==0)
   								{
   									if (this.pass.length<8)
   										{
   											this.pass = this.pass+num;
   											document.getElementById('settings_page_security_pass_input').value = document.getElementById('settings_page_security_pass_input').value + "*";
   											document.getElementById('settings_tvip_security_cursor0').style.left=document.getElementById('settings_tvip_security_cursor0').offsetLeft +20+"px";   									   									
   										}
   								}
   								if (this.selected_element_on_page==1)
   								{   
   									if (this.new_pass.length<8)
   										{
		   									this.new_pass = this.new_pass+num;
   											document.getElementById('settings_page_security_new_pass_input').value = document.getElementById('settings_page_security_new_pass_input').value + "*";
   											document.getElementById('settings_tvip_security_cursor1').style.left=document.getElementById('settings_tvip_security_cursor1').offsetLeft +20+"px";   									
   										}
   								}
   								if (this.selected_element_on_page==2)
   								{
   									if (this.new_pass_confirm.length<8)
   										{
   											this.new_pass_confirm = this.new_pass_confirm +num;
   											document.getElementById('settings_page_security_conf_pass_input').value = document.getElementById('settings_page_security_conf_pass_input').value + "*";
   											document.getElementById('settings_tvip_security_cursor2').style.left=document.getElementById('settings_tvip_security_cursor2').offsetLeft +20+"px";   									
   										}
   								}
   							}
    }

    this.ad_switch = function(){
    								if (this.ad!=2) 
    									{
    										this.ad++;
    									}
    									else
    									{
    										this.ad=0;
    										if (stb.RDir('getenv ad')=="0")
    										{
    											stb.RDir('setenv ad 1');
    											document.getElementById('settings_page_caption').innerHTML ="Настройки. <span class='message'> Реклама включена. Перезагрузка...</span>";
    										    setTimeout('document.getElementById("settings_page_caption").innerHTML ="Настройки"; stb.ExecAction("reboot");',7000);	
    										}
    										else
    										{
    											stb.RDir('setenv ad 0');
    											document.getElementById('settings_page_caption').innerHTML ="Настройки. <span class='message'> Реклама отключена. Перезагрузка...</span>";
    										    setTimeout('document.getElementById("settings_page_caption").innerHTML ="Настройки"; stb.ExecAction("reboot");',7000);
    										}
    									}

    							}

    this.key_press = function(button){
    		switch (button) {
   					case "left":
   								switch (this.selected_page) {
   									case this.page_security:
   										this.selected_element_on_page--;
   										settings_tvip.update_page_security();
   									break;
   									case this.page_portal:
   										if ((this.selected_element_on_page==0)||(this.selected_element_on_page==2)||(this.selected_element_on_page==3))
   										{
   											this.selected_on_page_portal("left");
   										}
   										else
   										{
   											this.selected_element_on_page--;
   											settings_tvip.update_page_portal();
   										}
   									break;
   									case this.page_protokol:
   											this.selected_protokol("left");
   									break;
   								}
   					break;
   					case "right":
   								switch (this.selected_page) {
   									case this.page_security:
   										this.selected_element_on_page++;
   										settings_tvip.update_page_security();
   									break;
   									case this.page_portal:
   									if ((this.selected_element_on_page==0)||(this.selected_element_on_page==2)||(this.selected_element_on_page==3))
   										{
   										this.selected_on_page_portal("right");
   										}
   										else
   										{
   											this.selected_element_on_page++;
   											settings_tvip.update_page_portal();
   										}
   									break;
   									case this.page_protokol:
   											this.selected_protokol("right");
   									break;
   								}
   					break;
   					case "ok":
   								switch (this.selected_page) {
   											case this.page_main:
   												if (settings_tvip.page_main_selected_button == 0) //Родительские
   													{
   														document.getElementById('settings_page_main').style.display = 'none';
   														this.selected_element_on_page=0;
   														///////////////////////////////////
   														document.getElementById('settings_page_security_pass_input').value = "";
   														document.getElementById('settings_page_security_new_pass_input').value = "";
   														document.getElementById('settings_page_security_conf_pass_input').value = "";
   														document.getElementById('settings_tvip_security_cursor0').style.left= "508px";
   														document.getElementById('settings_tvip_security_cursor1').style.left= "508px";
   														document.getElementById('settings_tvip_security_cursor2').style.left= "508px";
   														this.pass = "";
   														this.new_pass = "";
   														this.new_pass_confirm = "";
   														document.getElementById('settings_page_security_pass_input').setAttribute('type','password_focus');
    													document.getElementById('settings_page_security_new_pass_input').setAttribute('type','password');
    													document.getElementById('settings_page_security_conf_pass_input').setAttribute('type','password');
   														document.getElementById('settings_page_security_btn_ok').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn.png) 0 0 0 0";
   														document.getElementById('settings_page_security_btn_cancel').style.WebkitBorderImage = "url(/" + stb.portal_path+"/c/template/"+loader.template+"/settings_tvip_img/btn_l.png) 0 0 0 0";
   														if (stb.RDir('getenv ivipass')==1)
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','check');
    													}
    													else
    													{
    														document.getElementById('settings_page_security_checking_ivi').setAttribute('type','not_check');
    													}
   													document.getElementById('settings_page_security_checking_ivi').style.display = 'block';
   													if (stb.RDir('getenv vcatpass')==1)
    													{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_catalog').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_catalog').style.display = 'block';   													
   													if (stb.RDir('getenv youtpass')==1)
    													{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','check');
   														}
   														else
   														{
   															document.getElementById('settings_page_security_checking_youtube').setAttribute('type','not_check');
   														}
   													document.getElementById('settings_page_security_checking_youtube').style.display = 'block';
   														///////////////////////////////////
   														this.update_page_security();
   														document.getElementById('settings_page_security').style.display = 'block';
   														this.selected_page=this.page_security;
   														document.getElementById('settings_page_caption').innerHTML ="Родительские";
   													}
   												if (settings_tvip.page_main_selected_button == 1) //Портал
   													{
   														this._after_load = stb.profile.show_after_loading;
   														this._load_ok_check = stb.profile.play_in_preview_only_by_ok;
   														this._theme = loader.template;
   														console.log('stb.profile.user_theme'+stb.profile.user_theme);
   														document.getElementById('settings_page_main').style.display = 'none';
   														document.getElementById('settings_page_portal').style.display = 'block';
   														this.selected_page=this.page_portal;
   														this.selected_element_on_page=0;
   														this.update_page_portal();
   														document.getElementById('settings_page_caption').innerHTML ="Портал";
   														if (this._after_load =="main_menu") {
   																	document.getElementById('settings_page_portal_load_input').value = "Главное меню";
   															}
   															else
   															{
   																	document.getElementById('settings_page_portal_load_input').value = "Последний ТВ канал";
   															}
   														for (var i = 0; i < 4; i++){
   															if (loader.template==this.themes[i][2])
   															{
   																document.getElementById('settings_page_portal_tema_input').value=this.themes[i][1];
   																this.themes_index=i;
   															}
   														}
                              for (var i = 0; i < 3; i++){
                                if (stb.profile.screensaver_delay==this.screensaver[i][2])
                                {
                                  document.getElementById('settings_page_portal_screensaver_input').value=this.screensaver[i][1];
                                  this.screensaver_index=i;
                                }
                              }
   														console.log(' parent.prof.show_after_loading = '+ stb.profile.show_after_loading);
        												console.log('parent.prof.play_in_preview_by_ok = '+ stb.profile.play_in_preview_only_by_ok);
        												console.log('parent.prof.user_theme = '+ loader.template);
                                console.log('parent.prof.screensaver_delay = '+ stb.profile.screensaver_delay);
   													}
   												if (settings_tvip.page_main_selected_button == 2) //Протокол вещания
   													{
   														document.getElementById('settings_page_main').style.display = 'none';
   														document.getElementById('settings_page_protokol').style.display = 'block';
   														this.selected_page=this.page_protokol;
   														this.stream_type=stb.RDir('getenv stream_type');
   														console.log('stream_type='+this.stream_type);
   														console.log('portal1='+stb.RDir('getenv portal1'));
   														if ((this.stream_type=="2")||(this.stream_type==""))
   														{
   															document.getElementById('settings_page_protokol_variant_input').value = "Вариант2 (HLS)";
   															console.log('HLS');
   														}
   														else
   														{
   															console.log('TS');
   															document.getElementById('settings_page_protokol_variant_input').value = "Вариант1 (TS)";
   														}
   														this.selected_element_on_page=0;
   														this.update_page_protokol();
   														document.getElementById('settings_page_caption').innerHTML ="Протокол вещания";
   													}
   												if (settings_tvip.page_main_selected_button == 3) //Настройки приставки
   													{
   														stb.StartLocalCfg();
   													}
   												break;
   											case this.page_security:
   												this.selected_on_page_security("ok");
   												//stb.RDir('setenv ivipass 1');
   												//this.show_main_menu();
   												break;
   											case this.page_portal:
   												this.selected_on_page_portal("ok");
   												break;
   											case this.page_protokol:
   													if (this.selected_element_on_page==1) {
   														if (document.getElementById('settings_page_protokol_variant_input').value == "Вариант1 (TS)" ) st_type = 1;
   														if (document.getElementById('settings_page_protokol_variant_input').value == "Вариант2 (HLS)" ) st_type = 2;
   														if (this.stream_type!=st_type) 
   														{
   															stb.RDir('setenv stream_type '+st_type);
															stb.Stop();
        													//stb.LoadURL('http://'+encodeURIComponent(window.location.host));
        													//window.location.reload(stb.RDir('getenv portal1'));
        													stb.ExecAction('reboot');
   														}
   														else
   														{
   															this.show_main_menu();
   														}
   													}
   													if (this.selected_element_on_page==2) {
   															this.show_main_menu();
   													}
   												break;
   											}
   					break;   					
   					case "down":
   								switch (this.selected_page) {
   											case this.page_main:
   												settings_tvip.page_main_selected_button++;
   												settings_tvip.update_main_menu();
   												break;
   											case this.page_security:
   												this.selected_element_on_page++;
   												settings_tvip.update_page_security();
   												break;
   											case this.page_portal:
   												this.selected_element_on_page++;
   												settings_tvip.update_page_portal();
   												break;
   											case this.page_protokol:
   												this.selected_element_on_page++;
   												this.update_page_protokol();
   												break;
   											}
   					break;
   					case "up":
   								switch (this.selected_page) {
   											case this.page_main:
   												settings_tvip.page_main_selected_button--;
   												settings_tvip.update_main_menu();
   												break;
   											case this.page_security:
   												this.selected_element_on_page--;
   												settings_tvip.update_page_security();
   												break;
   											case this.page_portal:
   												this.selected_element_on_page--;
   												settings_tvip.update_page_portal();
   												break;
   											case this.page_protokol:
   												this.selected_element_on_page--;
   												this.update_page_protokol();
   												break;
   											}
   					break;
   					case "back":
   								switch (this.selected_page) {
   											case this.page_main:
   												main_menu.show();
   												this.hide();                								
   												break;
   											case this.page_security:
   												if (this.selected_element_on_page==0)
   														{
   															if (this.pass.length>0)
   															{
   																this.pass=this.pass.substring(0,this.pass.length-1);
   																document.getElementById('settings_page_security_pass_input').value = document.getElementById('settings_page_security_pass_input').value.substring(0,document.getElementById('settings_page_security_pass_input').value.length-1);
   																document.getElementById('settings_tvip_security_cursor0').style.left=document.getElementById('settings_tvip_security_cursor0').offsetLeft -20+"px";
   																console.log('pass='+this.pass);
   															}
   														}
   												if (this.selected_element_on_page==1)
   														{
   															if (this.new_pass.length>0)
   															{
   																this.new_pass=this.new_pass.substring(0,this.new_pass.length-1);
   																document.getElementById('settings_page_security_new_pass_input').value = document.getElementById('settings_page_security_new_pass_input').value.substring(0,document.getElementById('settings_page_security_new_pass_input').value.length-1);
   																document.getElementById('settings_tvip_security_cursor1').style.left=document.getElementById('settings_tvip_security_cursor1').offsetLeft -20+"px";
   																console.log('new_pass='+this.new_pass);
   															}
   														}
   												if (this.selected_element_on_page==2)
   														{
   															if (this.new_pass_confirm.length>0)
   															{
   																this.new_pass_confirm=this.new_pass_confirm.substring(0,this.new_pass_confirm.length-1);
   																document.getElementById('settings_page_security_conf_pass_input').value = document.getElementById('settings_page_security_conf_pass_input').value.substring(0,document.getElementById('settings_page_security_conf_pass_input').value.length-1);
   																document.getElementById('settings_tvip_security_cursor2').style.left=document.getElementById('settings_tvip_security_cursor2').offsetLeft -20+"px";
   																console.log('new_pass_confirm='+this.new_pass_confirm);
   															}
   														}
   												break;
   											case this.page_portal:
   											case this.page_protokol:   												
   												this.show_main_menu();
   												console.log('back');
   												break;
   											}
   					break;
   					case "0":
   							this.dialing_pass("0");
   					break;
   					case "1":
   							this.dialing_pass("1");
   					break;
   					case "2":
   							this.dialing_pass("2");
   					break;
   					case "3":
   							this.dialing_pass("3");
   					break;
   					case "4":
   							this.dialing_pass("4");
   					break;
   					case "5":
   							this.dialing_pass("5");
   					break;
   					case "6":
   							this.dialing_pass("6");
   					break;
   					case "7":
   							this.dialing_pass("7");
   					break;
   					case "8":
   							this.dialing_pass("8");
   					break;
   					case "9":
   							this.dialing_pass("9");
   					break;
   					case "yellow":
   							this.ad_switch();
   					break;
   					}   
    	};
    
        this.bind = function(){
             (function(){
                this.hide();
                main_menu.show();
            }).bind(key.EXIT, this).bind(key.MENU, this);
             this.key_press.bind(key.LEFT, this, 'left');
            this.key_press.bind(key.RIGHT, this, 'right');
            this.key_press.bind(key.OK, this, 'ok');            
            this.key_press.bind(key.DOWN, this, 'down');
            this.key_press.bind(key.UP, this, 'up');
            this.key_press.bind(key.BACK, this, 'back');
            this.key_press.bind(key.NUM0, this, '0');
            this.key_press.bind(key.NUM1, this, '1');            
            this.key_press.bind(key.NUM2, this, '2');
            this.key_press.bind(key.NUM3, this, '3');
            this.key_press.bind(key.NUM4, this, '4');
            this.key_press.bind(key.NUM5, this, '5');
            this.key_press.bind(key.NUM6, this, '6');
            this.key_press.bind(key.NUM7, this, '7');
            this.key_press.bind(key.NUM8, this, '8');
            this.key_press.bind(key.NUM9, this, '9');
            this.key_press.bind(key.YELLOW, this, 'yellow'); 
        };
}

settings_tvip_constructor.prototype = new BaseLayer();
    var settings_tvip = new settings_tvip_constructor();
    settings_tvip.init();
    settings_tvip.bind();    
    console.log('before hide');
    settings_tvip.hide();    
    module.settings_tvip = settings_tvip;
      
    main_menu.add('НАСТРОЙКИ', [], 'mm_ico_setting.png', function(){
            main_menu.hide();
            settings_tvip.selected_page=0;
            settings_tvip.page_main_selected_button = 0;
            this.ad=0;
            settings_tvip.update_main_menu();
            settings_tvip.show_main_menu();
            module.settings_tvip.show();
            settings_tvip.parent_password = stb.user.parent_password;
        },
        module.settings_tvip);    
})();

loader.next();
