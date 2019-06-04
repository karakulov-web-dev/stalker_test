/**
 * Redirection to Lines game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'Tetris',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/tetris/tetris.htm';
        }
    });

    loader.next();
})();
