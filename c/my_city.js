/**
 * my_city module.
 */

(function(){
    
    var submenu = module.my_city_sub || [];
    main_menu.add('Мой город', submenu, 'my_city.png', '', {"layer_name" : "my_city"});
})();

loader.next();
