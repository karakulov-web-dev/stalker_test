(function(){

    if (stb.type == 'MAG200'){
	loader.next();
	return;
	}

    if (!module.videoportal_sub){module.videoportal_sub = [];}
	module.videoportal_sub.push({
	"title" : 'VK-VIDEO',
	"cmd"   : function(){

	stb.setFrontPanel('.');
	window.location = '/' + stb.portal_path + '/external/vk.video-master/index.html';
        }
        });
        loader.next();
}) ();
