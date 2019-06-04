/**
 * Redirection to PICASA.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'PICASA',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/picasa/index.html';
        }
    });

    loader.next();
})();