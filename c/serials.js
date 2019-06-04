(function(){

     if (stb.type == 'MAG200'){
        loader.next();
        return;
        }


    if (!module.videoportal_sub){
        module.videoportal_sub = [];
    }

    module.videoportal_sub.push({
        "title" : 'Сериалы',
        "cmd"   : function(){
		//console.log("url= "+'/' + stb.portal_path + "/external/youtube-kids/index.html?referrer="+encodeURIComponent(window.location));
            //window.location = '/' + stb.portal_path + '/external/seasonvar/index.html?referrer='+encodeURIComponent(window.location);
		//url = '/' + stb.portal_path + '/external/serials/index.html?referrer=http://212.77.128.205';
		//url = 'http://212.77.128.203/apps/serials/seasonvar/index.html?referrer=http://212.77.128.205';
		url = '/' + stb.portal_path + '/external/apps_control/index.html?resurs=/' + stb.portal_path + '/external/serials/index.html';
		url= url+ '&ajax_loader=' + stb.ajax_loader;
	        url= url+ '&token=' + stb.access_token;
        	url= url+ '&timeout=' + stb.user['watchdog_timeout'];
                //console.log("url= "+url);
        	window.location = url;
	}
    });

    loader.next();
})();
