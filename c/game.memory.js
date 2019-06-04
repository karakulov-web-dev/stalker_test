/**
 * Redirection to Memory game.
 */
(function(){

    if (!module.games_sub){
        module.games_sub = [];
    }

    module.games_sub.push({
        "title" : 'MEMORY',
        "cmd"   : function(){
            window.location = '/' + stb.portal_path + '/external/memory/index.html' + '?referrer='+encodeURIComponent(document.location.href);
        }
    });

    loader.next();
})();
