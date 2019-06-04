/**
 * reclama main menu widget.
 * Displayed in the main menu.
 */

(function(){
    
    var reklama_gismeteo = {
        
     };
	if ((stb.RDir("getenv ad")!=0)||(stb.RDir("getenv ad")==''))
    {     
    module.reklama_gismeteo = reklama_gismeteo;
    _debug('reklama_gismeteo', reklama_gismeteo);
	}
    loader.next();
    
})();
