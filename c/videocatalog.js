/**
 * Redirection to Lines game.
 */
(function(){

    if (!module.videoportal_sub){module.videoportal_sub = [];}
            module.videoportal_sub.push({
                "title" : 'Видеокаталог',
                "cmd"   : function(){
			stb.SetVolume(100);
                 // window.location = '/' + stb.portal_path + '/external/parent_control/p_control.html?resurs=vcat';
		//var url='/' + stb.portal_path + '/external/videocatalog/index.html'+'?ajax_loader='+ stb.ajax_loader;
		var url='/' + stb.portal_path + '/external/apps_control/index.html'+'?resurs=vcat&ajax_loader='+ stb.ajax_loader;
		url= url+ '&token=' + stb.access_token;
		url= url+ '&timeout=' + stb.user['watchdog_timeout'];
		window.location=url;
		//window.location = '/' + stb.portal_path + '/external/videocatalog/index.html';
                }
            });
            loader.next();
})();
