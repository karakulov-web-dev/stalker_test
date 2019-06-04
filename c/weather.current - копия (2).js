/**
 * Current weather widget.
 * Displayed in the main menu.
 */

(function(){
    
    var curweather = {
        
        dom_obj : {},
        
        init : function(){
            
            this.dom_obj = create_block_element('curweather_block', main_menu.dom_obj);
            this.start_load();
        },
        
        set : function(weather){
            _debug('curweather.set', weather);
            this.current = weather;
            
            if (main_menu){
                this.render();
            }
        },
        
  render : function(){
 
   _debug('curweather.render');

   if (this.dom_obj.isHidden()){
          this.dom_obj.show();
     }

   var self = this;

  var xmlhttp = new XMLHttpRequest();
  var url = "http://meteo.rikt.ru/stb_mag_curweather2.php";

  xmlhttp.onreadystatechange = function() {
    
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
 
    var myArr = JSON.parse(xmlhttp.responseText);     

    var term=myArr[0].term;
    var pic='template/'+loader.template+'/weather_icon_i' + resolution_prefix + '/' + myArr[0].pic + '.png';
    var text=myArr[0].text;
    var pressure=myArr[0].pressure;
    var moisture=myArr[0].moisture;

    if (term>0){
          term='+'+term;
         }

         var cur = '<div class="curweather_descr">' + term +'&deg;</div>'; 
             cur += '<div class="curweather_img"><img src="'+pic+'"></div>';

        self.dom_obj.innerHTML = cur;
        
      }
    }
   xmlhttp.open("GET", url, true);
   xmlhttp.send();
 },

   load : function(){
            _debug('curweather.load');

      if (main_menu){
                this.render();
            }

        },

        start_load : function(){
            _debug('curweather.start_load');

            this.load();

            var self = this;

            window.clearInterval(this.load_interval);
            this.load_interval = window.setInterval(function(){self.load()}, 10*60*1000);
        }
    };
    
    curweather.init();
    
    module.curweather = curweather;
    
    loader.next();
    
})();
