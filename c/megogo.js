(function() {
  if (stb.type == "MAG200") {
    loader.next();
    return;
  }

  if (!module.videoportal_sub) {
    module.videoportal_sub = [];
  }
  module.videoportal_sub.push({
    title: "Megogo",
    cmd: function() {
      stb.setFrontPanel(".");
      var params = "";

      params = "?language=ru";
      //&referrer=http://212.77.128.177/';
      //	params = 'language%3Dru%26referrer%3Dhttp%3A%2F%2F212.77.128.205%2F';
      //+encodeURIComponent('http://212.77.128.177');
      //console.log("params = " + params);
      //var url =
      //  "http://212.77.128.177/stalker_portal/external/megogo/index.html";
///
//      var ref =
  //      "/" +
 //       stb.portal_path +
 //       "/external/apps_control/index.html?resurs=" +
 //       url;
//
	url = '/' + stb.portal_path + '/external/apps_control/index.html?resurs=/' + stb.portal_path + '/external/megogo/index.html';
        url= url+ '&ajax_loader=' + stb.ajax_loader;
        url= url+ '&token=' + stb.access_token;
        url= url+ '&timeout=' + stb.user['watchdog_timeout'];
      window.location = url;
    }
  });
  loader.next();
})();
