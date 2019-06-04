(function(){

     if (!module.videoportal_sub){module.videoportal_sub = [];}
        module.videoportal_sub.push({
	"title" : 'Magic Cast',
        "cmd"   : function(){
//	window.location = 'http://magiccast.magapps.net/magcore-core-portal/2.7.6/index.html?referrer='+encodeURIComponent(window.location);
	window.location = 'http://magiccast.magapps.net?referrer='+encodeURIComponent(window.location);
}
        });
        loader.next();
}) ();


