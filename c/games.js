/**
 * games module.
 */

(function(){
    
    var submenu = module.games_sub || [];
 
    main_menu.add('Развлечения', submenu, 'mm_ico_apps.png', '', {"layer_name" : "games"});
})();

loader.next();
