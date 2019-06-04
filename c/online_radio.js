/**
 * Redirection to Lines game.
 */
(function(){

		if (stb.GetDeviceMacAddress() == '00:1a:79:1a:87:fa' || stb.GetDeviceMacAddress() == '00:1a:79:03:ec:e3')
        {

//     if (!module.videoportal_sub){module.videoportal_sub = [];}
  //      module.videoportal_sub.push({
	    if (!module.games_sub){ module.games_sub = []; }
    module.games_sub.push({
        "title" : 'ОНЛАЙН-РАДИО',
        "cmd"   : function(){
//	window.location = 'http://twitch.magapps.net/apps/?language=ru&referrer='+encodeURIComponent(window.location);
	window.location = 'http://portal.freetv-tv.com/stalker_portal/c/index.html?single_module=radio&language=ru&referrer='+encodeURIComponent(window.location);
        }
        });
        loader.next();
	}
	else
	{	
	loader.next();
        return;
        }

}) ();

