/**
 * settins tvip module.
 */

(function(){

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

   this.page_main_selected_button = 0;


   this.init = function(){
        _debug('settings_tvip.init');

       var container = create_block_element('settings_tvip', this.dom_obj);
       var pp = '<div id="settings_page" style="display:block;"><div id="settings_page_caption">Настройки</div><hr id="settings_page_line"><div id="settings_page_main" style="display:block;"><div id="settings_page_main_button0"><div id="settings_page_main_button0_ico" img=""></div><div id="settings_page_main_button0_caption">Родительские</div></div><div id="settings_page_main_button1"><div id="settings_page_main_button1_ico" img=""></div><div id="settings_page_main_button1_caption">Портал</div></div><div id="settings_page_main_button2"><div id="settings_page_main_button2_ico" img=""></div><div id="settings_page_main_button2_caption">Протокол вещания</div></div><div id="settings_page_main_button3"><div id="settings_page_main_button3_ico" img=""></div><div id="settings_page_main_button3_caption">Настройки приставки</div></div></div><div id="settings_page_security" style="display:none;"><div id="settings_page_security_pass"><div class="settings_page_menu_caption">Пароль:</div><input type="password_focus" id="settings_page_security_pass_input"></div><div id="settings_page_security_new_pass"><div class="settings_page_menu_caption">Новый пароль:</div><input type="password" id="settings_page_security_new_pass_input"></div><div id="settings_page_security_conf_pass"><div class="settings_page_menu_caption">Подтверждение пароля:</div><input type="password" id="settings_page_security_conf_pass_input"></div><div id="settings_page_security_check_ivi"><div class="settings_page_menu_caption">Пароль на IVI</div><checkbox type="not_check" id="settings_page_security_checking_ivi"></div><div id="settings_page_security_check_catalog"><div class="settings_page_menu_caption">Пароль на Видеокаталог</div><checkbox type="not_check" id="settings_page_security_checking_catalog"></div><div id="settings_page_security_check_youtube"><div class="settings_page_menu_caption">Пароль на Youtube</div><checkbox type="not_check" id="settings_page_security_checking_youtube"></div><div id="settings_page_security_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_security_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div><div id="settings_page_portal" style="display:none;"><div id="settings_page_portal_load"><div class="settings_page_menu_caption">Отобразить после загрузки:</div><input type="portal_focus" id="settings_page_portal_load_input"></div><div id="settings_page_portal_load_ok"><div class="settings_page_menu_caption">Проигрывать каналы только по ОК:</div><checkbox type="check_portal" id="settings_page_portal_load_ok_check"></div><div id="settings_page_portal_tema"><div class="settings_page_menu_caption">Тема:</div><input type="portal" id="settings_page_portal_tema_input"></div><div id="settings_page_portal_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_portal_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div><div id="settings_page_protokol" style="display:none;"><div id="settings_page_protokol_variant"><div class="settings_page_menu_caption">Протокол вещания:</div><input type="protokol_focus" id="settings_page_protokol_variant_input"></div><div id="settings_page_protokol_btn_ok"><div class="settings_page_btn_caption">OK</div></div><div id="settings_page_protokol_btn_cancel"><div class="settings_page_btn_caption">Отмена</div></div></div></div>';
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
            for (var i = 0; i < 4; i++){
            		document.getElementById("settings_page_main_button"+i).style.backgroundColor = "";
            		document.getElementById("settings_page_main_button"+i).style.color = "white";            		
            }
            document.getElementById('settings_page_main_button0').style.backgroundImage = "";
            document.getElementById('settings_page_main_button1').style.backgroundImage = "";
            document.getElementById('settings_page_main_button2').style.backgroundImage = "";
            document.getElementById('settings_page_main_button3').style.backgroundImage = "";
            document.getElementById('settings_page_main_button'+settings_tvip.page_main_selected_button).style.backgroundcolor = "white";
            document.getElementById('settings_page_main_button'+settings_tvip.page_main_selected_button).style.color = "#1B3D73";
            console.log('update_main_menu');
            console.log('page_main_selected_button'+settings_tvip.page_main_selected_button);
        };

    this.key_press = function(button){
    		switch (button) {
   					case "left":
   					break;
   					case "right":
   					break;
   					case "ok":
   					break;
   					case "down":
   							settings_tvip.page_main_selected_button++;
   							settings_tvip.update_main_menu();
   					break;
   					case "up":
   					break;
   					case "back":
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
        };
}

settings_tvip_constructor.prototype = new BaseLayer();
    var settings_tvip = new settings_tvip_constructor();
    settings_tvip.init();
    settings_tvip.bind();    
    console.log('before hide');
    settings_tvip.hide();    
    module.settings_tvip = settings_tvip;
      
    main_menu.add('НАСТРОЙКИ TVIP', [], 'mm_ico_setting.png', function(){
            main_menu.hide();
            module.settings_tvip.show();
        },
        module.settings_tvip);    
})();

loader.next();


