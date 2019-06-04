/**
 * Redirection to Lines game.
 */
(function(){

     if (!module.videoportal_sub){module.videoportal_sub = [];}
        module.videoportal_sub.push({
        "title" : 'Zoomby',
        "cmd"   : function(){
        window.location = '/' + stb.portal_path + '/external/zoomby/index.html?referrer='+encodeURIComponent(window.location);
        }
        });
        loader.next();
}) ();

