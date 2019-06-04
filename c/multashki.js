/**
 * Redirection to Lines game.
 */
(function() {
  if (!module.videoportal_sub) {
    module.videoportal_sub = [];
  }
  module.videoportal_sub.push({
    title: "Мультяшки",
    cmd: function() {
      //window.location = '/' + stb.portal_path + '/external/mults/index.html?referrer='+encodeURIComponent(window.location);
      url =
        "/" +
        stb.portal_path +
        "/external/apps_control/index.html?resurs=mults&referrer=http://212.77.128.205";
      url = url + "&ajax_loader=" + stb.ajax_loader;
      url = url + "&token=" + stb.access_token;
      url = url + "&timeout=" + stb.user["watchdog_timeout"];
      //console.log("url= "+url);
      window.location = url;
    }
  });
  loader.next();
})();
