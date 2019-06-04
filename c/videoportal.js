/**
 * videoportal modile.
 */

(function(){
	if ((stb.mac == '00:1A:79:1C:B3:73')||(stb.mac == '00:1A:79:1E:FB:BE')||(stb.mac == '00:1A:79:1A:5F:27')){ //отключение раздела видео на приставках плохого абонента
        loader.next();
        return;
        }
    
    var submenu = module.videoportal_sub || [];
    main_menu.add('Видео', submenu, 'mm_ico_video.png', '', {"layer_name" : "videoportal"});
})();

loader.next();
