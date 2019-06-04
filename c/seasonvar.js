(function(){

     if (stb.type == 'MAG200'){
        loader.next();
        return;
        }


    if (!module.videoportal_sub){
        module.videoportal_sub = [];
    }

    module.videoportal_sub.push({
        "title" : 'Seasonvar ТЕСТ',
        "cmd"   : function(){
		//console.log("url= "+'/' + stb.portal_path + "/external/youtube-kids/index.html?referrer="+encodeURIComponent(window.location));
            window.location = '/' + stb.portal_path + '/external/seasonvar/index.html?referrer='+encodeURIComponent(window.location);
	}
    });

    loader.next();
})();
