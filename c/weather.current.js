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
 // var url = "http://meteo.rikt.ru/stb_mag_curweather2.php";
	var url = "http://meteo.rikt.ru/stb_mag_curweather2.txt";
  xmlhttp.onreadystatechange = function() {
    
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
 
    var myArr = JSON.parse(xmlhttp.responseText);     
    //console.log(JSON.stringify(myArr));
    var term=myArr[0].term;
    var pic='template/'+loader.template+'/weather_icon_i' + resolution_prefix + '/' + myArr[0].pic + '.png';
    var text=myArr[0].text;
    var pressure=myArr[0].pressure;
    var moisture=myArr[0].moisture;

    if (myArr[0].termtrend !=0 )var termtrendpic='template/'+loader.template+'/weather_icon_i' + resolution_prefix + '/' + myArr[0].termtrend + '.png';
    //var termtrendpic='template/'+loader.template+'/weather_icon_i' + resolution_prefix + '/-1.png';

    if (term>0){
      term='+'+term;
    }
	if (typeof player.prototype.TempOnVideo != 'undefined') {player.prototype.TempOnVideo.update_temp(term)};
	    var str = '&deg;'
    /*if (myArr[0].termtrend==-1) str+='&#8600;';
    else if (myArr[0].termtrend==1) str+='&#x2197;';*/

         var cur = '<div class="curweather_descr">' + term + str + '</div>';
             cur += '<div class="curweather_img"><img src="'+pic+'"></div>';
        if (myArr[0].termtrend !=0 ) {
          cur += '<div class="curweather_termtrend"><img src="'+termtrendpic+'"></div>';
        }

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
            this.load_interval = window.setInterval(function(){self.load()}, 5*60*1000);
        }
    };
    
    curweather.init();
    
    module.curweather = curweather;
    
    loader.next();
    
})();
