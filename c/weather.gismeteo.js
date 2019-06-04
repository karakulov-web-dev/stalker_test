(function(){
    
  function dayweather_constructor(){
        
   this.layer_name = 'dayweather';   
   this.dom_obj = this.create_block('layer_bg2');   
   this.logo_dom_obj = create_block_element('main_menu_logo', this.dom_obj);
   this.logo_dom_obj.style.background = 'url('+stb.user.portal_logo_url+') no-repeat';
       
   document.body.appendChild(this.dom_obj);

   this.superclass = BaseLayer.prototype;
   
   this.tabActive;
   this.tabs;
   this.tabs_data;
   this.forecast_day_0;
   this.forecast_day_1;
   this.forecast_day_2;
   this.forecast_day_3;
        
   this.init = function(){
        _debug('dayweather.init');

       var container = create_block_element('dayweather', this.dom_obj);
       var pp = '<div id="tabs_gm"><a href="#tabs-4">Сегодня</a><a href="#tabs-5">Завтра</a><a href="#tabs-6">Послезавтра</a></div><div id="tabs_data_gm"><div id="tabs-4"></div><div id="tabs-5"></div><div id="tabs-6"></div></div>';
           pp += '<div id="current_weather"><div id="forecast_day_0"></div><div id="forecast_day_1"></div><div id="forecast_day_2"></div><div id="forecast_day_3"></div></div>';
	 pp += '<div id="gismeteo"></div>';
	 if (module.reklama_gismeteo) pp += '<div id="weather_reclame_block">';
       container.innerHTML = pp;
       
       tabActive = 1;

     };
        
      this.tab_click = function(x){
	if(x > -1 && x < tabs.length && x < tabs_data.length){
		tabs[tabActive].setAttribute('class','');
        tabs_data[tabActive].style.display='none';
		tabActive=x;
		tabs[tabActive].setAttribute('class','active');
        tabs_data[tabActive].style.display='block';
	} return false;
      };
        
        
        this.show = function(){
         _debug('dayweather.show');
         //this.loaddata();
         if (stb.player.on){
            this.dom_obj.style.background = "rgba(128, 128, 128, 0.8)";         
          }
          else
          {
            this.dom_obj.style.backgroundImage = 'url(/' + stb.portal_path+'/c/template/'+loader.template+'/i_720/bg2.png)';
          }
         this.superclass.show.call(this);
         this.load(1);         
         this.tab_click(0);  
        };
        
        this.hide = function(){
            _debug('dayweather.hide');
            this.superclass.hide.call(this);
            //window.clearInterval(this.reload_timer);
        };
       


  this.load = function(day){
    _debug('dayweather.load, day='+day);
	     this.reclame_load();
      tabs = document.getElementById('tabs_gm').getElementsByTagName('A');
      tabs_data = document.getElementById('tabs_data_gm').getElementsByTagName('div');      
      forecast_day_0 = document.getElementById("forecast_day_0");
      forecast_day_1 = document.getElementById("forecast_day_1");
      forecast_day_2 = document.getElementById("forecast_day_2");
      forecast_day_3 = document.getElementById("forecast_day_3");
	
	         
      var xmlhttp = new XMLHttpRequest();
      var url = 'http://meteo.rikt.ru/stalker_stb_mag_weather2.php?day='+day;

      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var res = JSON.parse(xmlhttp.responseText);     
    
       forecast_day_0.innerHTML = '';
       forecast_day_0.className = res[0].data[0].img; 
       forecast_day_0.innerHTML += '<div class="weather_day">'+ res[0].data[0].title +'</div>';
       forecast_day_0.innerHTML += '<div class="weather_deg">'+ res[0].data[0].temperature +'  &deg;</div>';
       forecast_day_0.innerHTML += '<div class="weather_cond">'+ res[0].data[0].description +'</div>';
       
       forecast_day_1.innerHTML = '';
       forecast_day_1.className = res[0].data[1].img; 
       forecast_day_1.innerHTML += '<div class="weather_day">'+ res[0].data[1].title +'</div>';
       forecast_day_1.innerHTML += '<div class="weather_deg">'+ res[0].data[1].temperature +'  &deg;</div>';
       forecast_day_1.innerHTML += '<div class="weather_cond">'+ res[0].data[1].description +'</div>';
       
       forecast_day_2.innerHTML = '';
       forecast_day_2.className = res[0].data[2].img; 
       forecast_day_2.innerHTML += '<div class="weather_day">'+ res[0].data[2].title +'</div>';
       forecast_day_2.innerHTML += '<div class="weather_deg">'+ res[0].data[2].temperature +'  &deg;</div>';
       forecast_day_2.innerHTML += '<div class="weather_cond">'+ res[0].data[2].description +'</div>';
       
       forecast_day_3.innerHTML = '';
       forecast_day_3.className = res[0].data[3].img; 
       forecast_day_3.innerHTML += '<div class="weather_day">'+ res[0].data[3].title +'</div>';
       forecast_day_3.innerHTML += '<div class="weather_deg">'+ res[0].data[3].temperature +'  &deg;</div>';
       forecast_day_3.innerHTML += '<div class="weather_cond">'+ res[0].data[3].description +'</div>';

       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();   
    }; 

  this.reclame_load = function(){
    if (module.reklama_gismeteo)
{
if ((stb.RDir("getenv ad")!=0)||(stb.RDir("getenv ad")==''))
    {
 var xmlhttp_r = new XMLHttpRequest();
//      if (stb.RDir('gmode')==720)
		if (resolution_prefix=='_720')
        {
              var url_r = 'http://xn--d1abdw2b.net/include/kliktv_weatherhd_inc.php';
        }
        else
        {
            var url_r = 'http://xn--d1abdw2b.net/include/kliktv_weather_inc.php';
        }
     
      xmlhttp_r.onreadystatechange = function() {
       if (xmlhttp_r.readyState == 4 && xmlhttp_r.status == 200) {
	 if (xmlhttp_r.responseText.indexOf("img")>-1)
        {
        	document.getElementById('weather_reclame_block').style.display = 'block';
		document.getElementById('weather_reclame_block').innerHTML = xmlhttp_r.responseText;
	}
	else
	{
		document.getElementById('weather_reclame_block').style.display = 'none';
	}
       }
     }
     xmlhttp_r.open("GET", url_r, true);
     xmlhttp_r.send();

}
  }
  };
     
   this.press_kurs_select = function(button){
            _debug('dayweather.load, dir='+button);
      var direction = null;
       switch(button){
           case "right":
              direction = 1;
           break;
           case "left":
              direction = - 1;
           break;
       }
      if (direction != null) {
  	   this.tab_click(tabActive+direction);
          }
      this.load(tabActive+1);
    };
        
  this.bind = function(){
            (function(){
                if (stb.player.on){
                  this.hide();                  
                }
                else
                {
                this.hide();
                this.tab_click(0);
                main_menu.show();
                  }
            }).bind(key.EXIT, this).bind(key.MENU, this);
            this.press_kurs_select.bind(key.LEFT, this, 'left');
            this.press_kurs_select.bind(key.RIGHT, this, 'right');
        };
    }
    
    dayweather_constructor.prototype = new BaseLayer();
    var dayweather = new dayweather_constructor();
    dayweather.init();
    dayweather.bind();
    dayweather.init_header_path(word['dayweather_title']);
    dayweather.hide();
    module.dayweather = dayweather;
    
    if (!module.my_city_sub){
        module.my_city_sub = [];
    }
    
    module.my_city_sub.push({
        "title" : word['dayweather_title'],
        "cmd"   : function(){
            main_menu.hide();
            module.dayweather.show();
        }
    })
    
})();

loader.next();
