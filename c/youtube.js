(function(){

     if (stb.type == 'MAG200'){
        loader.next();
        return;
        }


    if (!module.videoportal_sub){
        module.videoportal_sub = [];
    }

    module.videoportal_sub.push({
        "title" : 'YouTube',
        "cmd"   : function(){
			//window.location = '/' + stb.portal_path + '/external/parent_control/p_control.html?resurs=yout';
			//url = '/' + stb.portal_path + '/external/youtube-rikt/index.html?referrer=http://212.77.128.205';
			var url='/' + stb.portal_path + '/external/apps_control/index.html?resurs=yout&ajax_loader='+ stb.ajax_loader;
	                url= url+ '&ajax_loader=' + stb.ajax_loader;
        	        url= url+ '&token=' + stb.access_token;
               		 url= url+ '&timeout=' + stb.user['watchdog_timeout'];
	                //console.log("url= "+url);
       	        window.location = url;
        }
    });

    loader.next();
})();
