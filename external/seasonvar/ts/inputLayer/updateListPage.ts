import ListControllerUpdatesList from "../ListControllers/ListControllerUpdatesList";
import AppModel from "../AppModel";
import ExitManager from "../ExitManager";
import InfoManager from "../InfoManager";

import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;

let model = new AppModel();
let instanceModelUpdatesList = model.getInstance("updateList");
let listControllerUpdatesList = new ListControllerUpdatesList(
  instanceModelUpdatesList
);
let infoManager = new InfoManager();

let exitManager = new ExitManager();

export function UpdateLIstPage(code) {
  switch (code) {
    case 27:
      exitManager.exitReq();
      break;
    case 40:
      listControllerUpdatesList.downFocusPosition();
      break;
    case 38:
      listControllerUpdatesList.upFocusPosition();
      break;
    case 39:
      listControllerUpdatesList.rigthFocusPosition();
      break;
    case 37:
      listControllerUpdatesList.leftFocusPosition();
      break;
    case 13:
      listControllerUpdatesList.onEnter();
      break;
    case 112:
      listControllerUpdatesList.openSerialList();
      break;
    case 113:
      infoManager.openWindow();
      break;
    case 114:
      listControllerUpdatesList.openHistoryList();
      break;
    case 115:
      listControllerUpdatesList.openFavoritesList();
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
export function UpdateLIstPageInfoManager(code) {
  switch (code) {
    case 8:
      infoManager.back();
      break;
    case 40:
      infoManager.scrollBottom();
      break;
    case 38:
      infoManager.scrollTop();
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
