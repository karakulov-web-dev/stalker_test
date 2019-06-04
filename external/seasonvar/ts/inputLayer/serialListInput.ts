import RouteManager from "../RouteManager";
import ListControllerSerials from "../ListControllers/ListControllerSerials";
import AppModel from "../AppModel";
import SearchManager from "../SearchManager";
import GenreManager from "../GenreManager";
import InfoManager from "../InfoManager";
import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;

let genreManager = new GenreManager();
let infoManager = new InfoManager();
let searchManager = new SearchManager();
let model = new AppModel();
let instanceModel = model.getInstance("serialList");
let listControllerSerials = new ListControllerSerials(instanceModel);
let routeManager = new RouteManager();

export function serialList(code) {
  switch (code) {
    case 8:
      routeManager.back();
      break;
    case 27:
      routeManager.home();
      break;
    case 40:
      listControllerSerials.downFocusPosition();
      break;
    case 38:
      listControllerSerials.upFocusPosition();
      break;
    case 39:
      listControllerSerials.rigthFocusPosition();
      break;
    case 37:
      listControllerSerials.leftFocusPosition();
      break;
    case 13:
      listControllerSerials.onEnter();
      break;
    case 112:
      genreManager.openWindow();
      break;
    case 113:
      infoManager.openWindow();
      break;
    case 114:
      searchManager.openWindow();
      break;
    case 115:
      listControllerSerials.addFav();
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

export function serialListGenreManager(code) {
  switch (code) {
    case 39:
      genreManager.changeFocusRight();
      break;
    case 37:
      genreManager.changeFocusLeft();
      break;
    case 38:
      genreManager.changeFocusTop();
      break;
    case 40:
      genreManager.changeFocusBottom();
      break;
    case 13:
      genreManager.submit();
      break;
    case 8:
      genreManager.back();
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

export function serialListInfoManager(code) {
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

export function serialListSearchManager(code) {
  switch (code) {
    case 13:
      searchManager.submit();
      break;
    case 8:
      searchManager.back();
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
