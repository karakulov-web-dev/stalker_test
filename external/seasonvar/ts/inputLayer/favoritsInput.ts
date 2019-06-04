import RouteManager from "../RouteManager";
import ListControllerFavorites from "../ListControllers/ListControllerFavorites";
import AppModel from "../AppModel";
import MainSettingMenu from "../MainSettingMenu";
var mainSettingMenu;
let model = new AppModel();
let instanceModel = model.getInstance("favoritesList");
let listControllerFavorites = new ListControllerFavorites(instanceModel);
let routeManager = new RouteManager();

export function favoritsList(code) {
  switch (code) {
    case 8:
      routeManager.back();
      break;
    case 27:
      routeManager.home();
      break;
    case 40:
      listControllerFavorites.downFocusPosition();
      break;
    case 38:
      listControllerFavorites.upFocusPosition();
      break;
    case 39:
      listControllerFavorites.rigthFocusPosition();
      break;
    case 37:
      listControllerFavorites.leftFocusPosition();
      break;
    case 13:
      listControllerFavorites.onEnter();
      break;
    case 112:
      listControllerFavorites.deleteFavorites();
      break;
    case 113:
      listControllerFavorites.clearFavorites();
      break;
    case 114:
      // searchManager.openWindow();
      break;
    case 115:
      //  listControllerSerials.addFav();
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
