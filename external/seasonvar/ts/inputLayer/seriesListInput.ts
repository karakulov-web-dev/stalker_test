import AppModel from "../AppModel";
import ListControllerVideo from "../ListControllers/ListControllerVideo";
import RouteManager from "../RouteManager";
import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;

let model = new AppModel();
let routeManager = new RouteManager();
let instanceModelVideo = model.getInstance("seriesList");
let listControllerVideo = new ListControllerVideo(instanceModelVideo);

export function seriesList(code) {
  switch (code) {
    case 112:
      routeManager.back();
      break;
    case 8:
      routeManager.back();
      break;
    case 27:
      routeManager.home();
      break;
    case 40:
      listControllerVideo.downFocusPosition();
      break;
    case 38:
      listControllerVideo.upFocusPosition();
      break;
    case 39:
      listControllerVideo.rigthFocusPosition();
      break;
    case 37:
      listControllerVideo.leftFocusPosition();
      break;
    case 13:
      listControllerVideo.onEnter();
      break;
    case 120:
      mainSettingMenu = new MainSettingMenu();
      mainSettingMenu.open();
      break;
    case 123:
      mainSettingMenu = new MainSettingMenu();
      mainSettingMenu.open();
      break;
  }
}
