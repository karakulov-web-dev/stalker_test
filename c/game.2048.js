/**
 * Redirection to 2048 game.
 */
(function(){

	 if (!module.games_sub){
       	 module.games_sub = [];
	    }

	 module.games_sub.push({
        "title" : '2048',
        "cmd"   : function(){
            stb.setFrontPanel('.');
            window.location = '/' + stb.portal_path + '/external/2048/index.html';
        }
    });

    loader.next();
})();
