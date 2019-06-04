/**
 * Redirection to Lines game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'LINES',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/lines/index.html';
        }
    });

    loader.next();
})();