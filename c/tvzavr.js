/**
 * Redirection to Lines game.
 */
(function(){
		if (stb.RDir('gmode')=='720')
        {
        loader.next();
        return;
        }
     

	if (!module.videoportal_sub){module.videoportal_sub = [];}
        module.videoportal_sub.push({
        "title" : 'TVZAVR',
        "cmd"   : function(){
        var params = '';

        if (stb.user['web_proxy_host']){
            params += '?proxy=http://';
            if (stb.user['web_proxy_user']){
                params += stb.user['web_proxy_user']+':'+stb.user['web_proxy_pass']+'@';
            }
            params += stb.user['web_proxy_host']+':' +stb.user['web_proxy_port'];
        }

        stb.setFrontPanel('.');

        if (!params){
            params += '?';
        }else{
            params += '&';
        }

        params += 'referrer='+encodeURIComponent(window.location);

        var url = 'http://services.tvzavr.ru/mag/' + params;

        _debug('url', url);
        window.location = url;
        }
        });
        loader.next();
}) ();
