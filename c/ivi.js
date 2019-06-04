(function() {
  //console.log(stb.RDir('getenv ivipass'));

  //if (stb.RDir('getenv ivipass') != '') {
  //if (stb.GetDeviceModel() == 'MAG254')
  if (!module.videoportal_sub) {
    module.videoportal_sub = [];
  }
  module.videoportal_sub.push({
    title: "IVI.RU",
    cmd: function() {
      window.location =
        "/" + stb.portal_path + "/external/apps_control/index.html?resurs=ivi";
    }
  });
  loader.next();
  //}
  /*else {
        if (stb.GetDeviceModel() == 'MAG254')
            if (!module.videoportal_sub){module.videoportal_sub = [];}
            module.videoportal_sub.push({
                "title" : 'IVI.RU',
                "cmd"   : function(){
                   window.location = '/' + stb.portal_path + '/external/ivi/index.html?referrer='+encodeURIComponent(window.location);
                      
                }
            });
            loader.next();
    }*/
})();
