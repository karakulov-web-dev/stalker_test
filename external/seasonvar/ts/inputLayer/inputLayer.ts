import AppModel from "../AppModel";

import {
  serialList,
  serialListGenreManager,
  serialListInfoManager,
  serialListSearchManager
} from "./serialListInput";

import {
  UpdateLIstPage,
  UpdateLIstPageInfoManager
} from "./updateListPage"

import {
  seasonList
} from "./seasonListInput"

import {
  seriesList
} from "./seriesListInput"

import {
  play,
  playSettingMenu
} from "./playInput"

import {historyList} from "./historyListInput";

import {exitReq} from "./exitReqInput"

import {favoritsList} from "./favoritsInput"
 
let model = new AppModel();

interface inputLayer {
  init(): void;
  inputHandler(code): void;
  handlers: object;
}
var _: inputLayer = {
  init: function init() {
    document.onkeydown = function(event) {
      this.inputHandler(event.keyCode);
    }.bind(this);
  },
  inputHandler: function(code) {
    let route = model.getInstance("App").getValue("route");
    var inputType = route.get();
    if (this.handlers.hasOwnProperty(inputType)) {
      this.handlers[inputType](code);
    }
  },
  handlers: {
    "/serialList": serialList,
    "/serialList/genreManager": serialListGenreManager,
    "/serialList/infoManager": serialListInfoManager,
    "/serialList/searchManager": serialListSearchManager,
    "/UpdateLIstPage": UpdateLIstPage,
    "/UpdateLIstPage/infoManager": UpdateLIstPageInfoManager,
    "/seasonList": seasonList,
    "/seriesList": seriesList,
    "/play": play,
    "/play/settingMenu": playSettingMenu,
    "/exitReq": exitReq,
    "/historyList": historyList,
    "/favoritesList": favoritsList
  }
};

export default _;
