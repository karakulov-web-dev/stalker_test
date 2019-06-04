/**
 * Redirection to Lines game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'Sokoban',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/sokoban/sokoban.html';
        }
    });

    loader.next();
})();