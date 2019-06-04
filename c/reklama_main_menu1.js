/**
 * Current weather widget.
 * Displayed in the main menu.
 */

(function(){
    
    var reklama_main_menu = {
        
        dom_obj : {},
        
        init : function(){
            
            this.dom_obj = create_block_element('reklama_main_menu_block', main_menu.dom_obj);
            this.start_load();
        },
        
        set : function(reklama){
            _debug('reklama_main_menu.set', reklama);
            this.current = reklama_main_menu;
            
            if (main_menu){
                this.render();
            }
        },
        
  render : function(){
 
   _debug('reklama_main_menu.render');

	if (this.dom_obj.isHidden()){
          this.dom_obj.show();}  
   var self = this;   
    var xmlhttp = new XMLHttpRequest();
      var url = 'http://10.20.0.105/reclame/?mac='+stb.RDir("MACAddress")+'&place=1';

      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//        var res = JSON.parse(xmlhttp.responseText);     
        var img_url="http://10.20.0.105/reclame/"+stb.RDir('gmode')+"/"+xmlhttp.responseText;       
	alert("img_url= "+img_url);
       var cur = '<div class="reclame_img"><img src="'+img_url+'"></div>';
       self.dom_obj.innerHTML = cur;    

       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send(); 

//	var pic="http://10.20.0.105/reclame/reclama_1280.png"; 

       
   
 },

   load : function(){
            _debug('reklama_main_menu.load');

      if (main_menu){
                this.render();
            }

        },

        start_load : function(){
            _debug('reklama_main_menu.start_load');

            this.load();

            var self = this;

            window.clearInterval(this.load_interval);
            this.load_interval = window.setInterval(function(){self.load()}, 5*60*1000);
        }
    };
    
    reklama_main_menu.init();
    
    module.reklama_main_menu = reklama_main_menu;
    
    loader.next();
    
})();
