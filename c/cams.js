/**
 * Redirection to Lines game.
 */
(function(){

     if (!module.my_city_sub){module.my_city_sub = [];}
        module.my_city_sub.push({
        "title" : 'Веб камеры',
        "cmd"   : function(){
        //window.location = '/' + stb.portal_path + '/external/cams/index.html?referrer='+encodeURIComponent(window.location);
	var url='/' + stb.portal_path + '/external/cams/index.html?referrer='+encodeURIComponent(window.location)+'&ajax_loader='+ stb.ajax_loader;
        url= url+ '&token=' + stb.access_token;
        url= url+ '&timeout=' + stb.user['watchdog_timeout'];
        window.location=url;
        }
        });
        loader.next();
}) ();

