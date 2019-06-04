import RouteManager from "../RouteManager";
import AppModel from "../AppModel";
import ListControllerHistory from "../ListControllers/ListControllerHistory";
import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;

let routeManager = new RouteManager();
let model = new AppModel();
let instanceModelHistory = model.getInstance("historyList");
let listControllerHistory = new ListControllerHistory(instanceModelHistory);

export function historyList(code) {
  switch (code) {
    case 8:
      routeManager.back();
      break;
    case 27:
      routeManager.home();
      break;
    case 40:
      listControllerHistory.downFocusPosition();
      break;
    case 38:
      listControllerHistory.upFocusPosition();
      break;
    case 39:
      listControllerHistory.rigthFocusPosition();
      break;
    case 37:
      listControllerHistory.leftFocusPosition();
      break;
    case 13:
      listControllerHistory.onEnter();
      break;
    case 112:
      listControllerHistory.clear();
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
