/**
 * Redirection to Lines game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'Minesweeper',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/mine/index.htm';
        }
    });

    loader.next();
})();