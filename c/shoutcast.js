/**
 * Redirection to Lines game.
 */
(function(){

	    if (!module.games_sub){ module.games_sub = []; }
    module.games_sub.push({
        "title" : 'SHOUTCAST',
        "cmd"   : function(){
	window.location = 'http://shoutcast.infomir.com.ua/1.1.4/?language=ru&referrer='+encodeURIComponent(window.location);
 }
        });
        loader.next();
}) ();

