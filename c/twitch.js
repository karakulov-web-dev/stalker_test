/**
 * Redirection to Lines game.
 */
(function(){

 if (!module.videoportal_sub){module.videoportal_sub = [];}
        module.videoportal_sub.push({
//          if (!module.games_sub){ module.games_sub = []; }
//    module.games_sub.push({
        "title" : 'TWITCH',
        "cmd"   : function(){
//        window.location = 'http://twitch.magapps.net/apps/?referrer=http://212.77.128.177';
//	window.location = 'http://twitch.magapps.net/apps/?language=ru&referrer='+encodeURIComponent(window.location);
//	window.location = '/' + stb.portal_path + '/external/twitch/index.html?referrer='+encodeURIComponent(window.location);
	url='/' + stb.portal_path + '/external/apps_control/index.html?resurs=twitch&language=ru&referrer='+encodeURIComponent(window.location)+'&ajax_loader='+ stb.ajax_loader;
        url= url+ '&ajax_loader=' + stb.ajax_loader;
        url= url+ '&token=' + stb.access_token;
        url= url+ '&timeout=' + stb.user['watchdog_timeout'];
        //console.log("url= "+url);
        window.location = url;
;
        }
        });
        loader.next();
}) ();

