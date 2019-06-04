/**
 * Current weather widget.
 * Displayed in the main menu.
 */

(function(){
    
    var reklama_main_menu = {
        
        dom_obj : {},

        timer : null,
        
        init : function(){
            
            this.dom_obj = create_block_element('reklama_main_menu_block', main_menu.dom_obj);
            _debug('reklama_main_menu.init');          
        },        
                
  render : function(){
 
   _debug('reklama_main_menu.render');

	if (this.dom_obj.isHidden()){
          this.dom_obj.show();}  
   var self = this;   

    var xmlhttp = new XMLHttpRequest();
 //     if (stb.RDir('gmode')==720)
		if (resolution_prefix=='_720')
        {
              var url = 'http://xn--d1abdw2b.net/include/kliktv_mainhd_inc.php';
        }
        else
        {
            var url = 'http://xn--d1abdw2b.net/include/kliktv_main_inc.php';
        }

      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	if (xmlhttp.responseText.indexOf("img")>-1)
        {        
       self.dom_obj.innerHTML = '<div id="kartinka">'+xmlhttp.responseText+'</div>';
       }
	else
	{
	self.dom_obj.style.display = 'none';
	}
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();        

 },

 timer_render : function(){
 
   _debug('reklama_main_menu.timer_render');
   clearTimeout(module.reklama_main_menu.timer);
   module.reklama_main_menu.timer=setTimeout("module.reklama_main_menu.render()",900);

 },
     
    };
    
    if ((stb.RDir("getenv ad")!=0)||(stb.RDir("getenv ad")==''))
    {
	    reklama_main_menu.init();
    if ((stb.RDir('vmode')=='576i')&&(stb.RDir('gmode')!=720))
                  {
                      if (stb.RDir('gmode')!='tvsystem_res')
			{
			stb.RDir('setenv graphicres 720');
			if (stb.RDir('Model')!='MAG322')
                      	{
				setTimeout("stb.ExecAction('reboot')",2000);
			}
			}
                      
                  }
    module.reklama_main_menu = reklama_main_menu;
        
  }
    loader.next();
    
})();
