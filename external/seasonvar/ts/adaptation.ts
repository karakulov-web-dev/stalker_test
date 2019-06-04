export default function() {
  if (screen.width > 1200) {
    var rules = [
      ".app_ChannelListComponent_wrap_elem { height: 38%; }",
      ".app_ChannelListComponent_card_img  {  height: 70%; }",
      ".app_ChannelListComponent_card_h1   { font-size: 23px; }",
      ".app_Play_ControlBar_timeShiftSizeBar { right: 230px; }",
      ".app_home_genreManager_window  {    width: 400px;} ",
      ".app_home_genreManager_window_list_GenreElemWrap {width: 88%} ",
      ".app_home_genreManager_window_buttonPanel { width: 130px; }",
      ".app_home_infoManager_window_body_box2_description {height: 50%;}",
      ".app_home_infoManager_window { width: 600px; height: 450px;}",
      ".app_home_infoManager_window_body_box1_infoBox {width: 70%;}",
      ".app_home_infoManager_window {font-size: 20px;}",
      ".ParentControlWindow_h1 {  font-size: 18px; }",
      ".ParentControlWindow_invalidElem {  font-size: 17px; }",
      ".ParentControlWindow_window { width: 450px; height: 280px;}",
      ".ParentControlWindow_input {width: 77%;} ",
      ".app_MainSettingMenuList_window { width: 400px; } ",
      ".ParentControlWindow_exitButton { width: 39.9%;}",
      ".ParentControlWindow_okButton { width: 39.9%;}"
    ];
    var cssAll = rules.join("\n");
    var head: any = document.getElementsByTagName("head");
    head = head[0];
    var style: any = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = cssAll;
    } else {
      style.appendChild(document.createTextNode(cssAll));
    }
    head.appendChild(style);
  }
}
