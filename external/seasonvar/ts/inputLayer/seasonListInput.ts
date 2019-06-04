import AppModel from "../AppModel";
import RouteManager from "../RouteManager";
import ListControllerSeasons from "../ListControllers/ListControllerSeasons";
import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;

let model = new AppModel();
let instanceModelSeasonList = model.getInstance("seasonList");
let listControllerSeasons = new ListControllerSeasons(instanceModelSeasonList);
let routeManager = new RouteManager();

export function seasonList(code) {
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
      listControllerSeasons.downFocusPosition();
      break;
    case 38:
      listControllerSeasons.upFocusPosition();
      break;
    case 39:
      listControllerSeasons.rigthFocusPosition();
      break;
    case 37:
      listControllerSeasons.leftFocusPosition();
      break;
    case 13:
      listControllerSeasons.onEnter();
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
