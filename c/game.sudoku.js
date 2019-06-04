/**
 * Redirection to Sudoku game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'SUDOKU',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/sudoku/index.html';
        }
    });

    loader.next();
})();