(function(){
    
  function edds_info_app_constructor(){
        
   this.layer_name = 'edds_info_app';
   this.dom_obj = this.create_block('layer_bg2');
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;   
   this.host_url='http://xn--d1abdw2b.net/include/05_inc.php';
   //this.video_url='http://212.77.128.203/trailers/';
   
              
   this.init = function(){
        _debug('edds_info_app.init');

       var container = create_block_element('edds_info_app', this.dom_obj);
       var pp = '<div id="edds_page"><div id="edds_scroll"><div id="edds_scroll_runner"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll.png"></div><div id="edds_scroll_background"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll_bg.png"></div><div id="edds_scroll_background1"><img src="/'+ stb.portal_path+'/c/template/'+loader.template+'/i/mb_scroll_bg.png"></div></div><div id="edds_text"></div></div><div id="edds_navigate"><div id="edds_navi_ico"></div><div id="edds_navi_text">Выйти</div><div id="edds_navi_ico1"></div><div id="edds_navi_text1">Пролистывание ВВЕРХ / ВНИЗ</div><div id="edds_navi_ico2"></div><div id="edds_navi_text2">Сообщения ЕДДС</div></div>';
          container.innerHTML = pp;

     };
        
    this.show = function(){
         _debug('edds_info.show');
          this.superclass.show.call(this);

        };
        
    this.hide = function(){
        _debug('edds_info.hide');            
         this.superclass.hide.call(this);    
        };

    this.loading = function(){
      _debug('edds_info.loading');
      document.getElementById("edds_scroll_runner").style.top="7px";
       url=this.host_url;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {       
      category = JSON.parse(xmlhttp.responseText);
      //console.log('category= '+category.text);
      document.getElementById("edds_text").innerHTML=category.text;
      if (document.getElementById("edds_text").offsetHeight<=document.getElementById("edds_text").scrollHeight){         
          document.getElementById("edds_scroll").style.display="block";
          document.getElementById("edds_text").style.right="40px";
          document.getElementById("edds_navi_ico1").style.display="block";
          document.getElementById("edds_navi_text1").style.display="block";
      }
      }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
    };

this.key_press = function(button){
  switch (button) {
                  case "down":                  
                           // console.log("key down");
                           // console.log("scrollTop="+document.getElementById("edds_text").scrollTop);
                           // console.log("scrollHeight="+document.getElementById("edds_text").scrollHeight);
                           // console.log("Height="+document.getElementById("edds_text").offsetHeight);
                           if (resolution_prefix=='_720')
                                {
                                  document.getElementById("edds_text").scrollTop=document.getElementById("edds_text").scrollTop+20;                                         
                                  document.getElementById("edds_scroll_runner").style.top=7+Math.floor((document.getElementById("edds_text").scrollTop*460)/(document.getElementById("edds_text").scrollHeight-document.getElementById("edds_text").offsetHeight))+"px";
                                  console.log("top runner="+document.getElementById("edds_scroll_runner").style.top);
                                }
                                else
                                {
                                  document.getElementById("edds_text").scrollTop=document.getElementById("edds_text").scrollTop+20;                                         
                                  document.getElementById("edds_scroll_runner").style.top=7+Math.floor((document.getElementById("edds_text").scrollTop*360)/(document.getElementById("edds_text").scrollHeight-document.getElementById("edds_text").offsetHeight))+"px";
                                }
                  break;
                  case "up":
                            //console.log("key up");
                            if (resolution_prefix=='_720')
                                {
                                  document.getElementById("edds_text").scrollTop=document.getElementById("edds_text").scrollTop-20;
                                  document.getElementById("edds_scroll_runner").style.top=7+Math.floor((document.getElementById("edds_text").scrollTop*460)/(document.getElementById("edds_text").scrollHeight-document.getElementById("edds_text").offsetHeight))+"px";
                                }
                                else
                                {
                                  document.getElementById("edds_text").scrollTop=document.getElementById("edds_text").scrollTop-20;
                                  document.getElementById("edds_scroll_runner").style.top=7+Math.floor((document.getElementById("edds_text").scrollTop*360)/(document.getElementById("edds_text").scrollHeight-document.getElementById("edds_text").offsetHeight))+"px";
                                }
                  break;
		 case "blue":
				this.hide();
				module.msgreader.show_edds();
			break;
                }

};

 this.bind = function(){
            (function(){              
                this.hide();
                document.getElementById("edds_text").innerHTML="";
                document.getElementById("edds_text").style.right="15px";
                document.getElementById("edds_scroll").style.display="none";
                document.getElementById("edds_navi_ico1").style.display="none";
          document.getElementById("edds_navi_text1").style.display="none";
            //    this.tab_click(0);
                main_menu.show();
           //});
            }).bind(key.EXIT, this).bind(key.MENU, this);
            //this.key_press.bind(key.MENU, this, 'menu');
            //this.key_press.bind(key.EXIT, this, 'exit');
            this.key_press.bind(key.LEFT, this, 'left');
            this.key_press.bind(key.RIGHT, this, 'right');
            this.key_press.bind(key.OK, this, 'ok');
            this.key_press.bind(key.RED, this, 'red');
//            this.key_press.bind(key.GREEN, this, 'green');
//            this.key_press.bind(key.YELLOW, this, 'yellow');
            this.key_press.bind(key.BLUE, this, 'blue');
            this.key_press.bind(key.DOWN, this, 'down');
            this.key_press.bind(key.UP, this, 'up');
            this.key_press.bind(key.BACK, this, 'back');
//            this.key_press.bind(key.INFO, this, 'info');
        };
    }
    
    edds_info_app_constructor.prototype = new BaseLayer();
    var edds_info_app = new edds_info_app_constructor();
    edds_info_app.init();
    edds_info_app.bind();
    edds_info_app.init_header_path('Новости ЕДДС');
    edds_info_app.hide();
    module.edds_info_app = edds_info_app;
    
if (!module.my_city_sub){module.my_city_sub = [];}

      module.my_city_sub.push({
        "title" : 'Новости ЕДДС',
        "cmd"   : function(){
            edds_info_app.loading();
            main_menu.hide();            
            edds_info_app.update_header_path([{"alias" : "tab", "item" : ""}]);            
            edds_info_app.show();                                             
     }
    })
    
})();

loader.next();
