(function(){

    if (stb.type == 'MAG200'){
	loader.next();
	return;
	}

  if (!module.games_sub){module.games_sub = [];}
 	module.games_sub.push({
	"title" : 'VK-MUSIC',
	"cmd"   : function(){

	stb.setFrontPanel('.');
	window.location = '/' + stb.portal_path + '/external/vk.music-master/index.html';
        }
        });
        loader.next();
}) ();
