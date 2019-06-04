/**
 * Redirection to Lines game.
 */
(function(){

	if (stb.GetDeviceMacAddress() == '00:1a:79:1a:87:fa' || stb.GetDeviceMacAddress() == '00:1a:79:03:ec:e3' || stb.GetDeviceMacAddress() == '00:1a:79:02:9c:be' || stb.GetDeviceMacAddress() == '00:1a:79:1a:5e:d6' || stb.GetDeviceMacAddress() == '00:1A:79:1E:F7:B0' || stb.GetDeviceMacAddress() == '00:1A:79:02:E7:A0' || stb.GetDeviceMacAddress() == '00:1A:79:1A:5E:D1')
        {

     if (!module.videoportal_sub){module.videoportal_sub = [];}
        module.videoportal_sub.push({
//	    if (!module.games_sub){ module.games_sub = []; }
//    module.games_sub.push({
        "title" : 'MULTIPLEX',
        "cmd"   : function(){
//	window.location = 'http://twitch.magapps.net/apps/?language=ru&referrer='+encodeURIComponent(window.location);
	window.location = 'http://freemultiplex.com/apps/?language=ru&referrer='+encodeURIComponent(window.location);
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

