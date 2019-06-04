import AppModel from "./AppModel";
import ListControllerChannels from "./ListControllerChannels";
import ListControllerVideo from "./ListControllerVideo";
import ListControllerPlayLists from "./ListControllerPlayLists";
import Play from "./Play";
import ExitManager from "./ExitManager";
import RouteManager from "./RouteManager"
import aspectRatioManager from "./aspectRatioManager"

let model = new AppModel();

let instanceModel = model.getInstance("serialList");
let listControllerChannels = new ListControllerChannels(instanceModel);

let instanceModelVideo = model.getInstance("seriesList");
let listControllerVideo = new ListControllerVideo(instanceModelVideo);

let instanceModelPlayListsList = model.getInstance("playListsList");
let listControllerPlayListsList = new ListControllerPlayLists(instanceModelPlayListsList)

let exitManager = new ExitManager()

let routeManager = new RouteManager()

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
    "/home": function(code) {
      switch (code) {
        case 27:
        exitManager.exitReq()
          break;
        case 40:
          listControllerChannels.downFocusPosition();
          break;
        case 38:
          listControllerChannels.upFocusPosition();
          break;
        case 39:
          listControllerChannels.rigthFocusPosition();
          break;
        case 37:
          listControllerChannels.leftFocusPosition();
          break;
        case 13:
          listControllerChannels.onEnter();
          break;
        case 113:
          listControllerChannels.onEnter();
          break;
          case 112: 
          exitManager.exitReq()
          break
      }
    },
    "/channelSection": function(code) {
      switch (code) {
        case 8:
        routeManager.back()
          break;
        case 27:
        routeManager.back()
          break;
        case 40:
        listControllerCS.downFocusPosition();
          break;
        case 38:
        listControllerCS.upFocusPosition();
          break;
        case 39:
        listControllerCS.rigthFocusPosition();
          break;
        case 37:
        listControllerCS.leftFocusPosition();
          break;
        case 13:
        listControllerCS.onEnter();
          break;
        case 113:
        listControllerCS.onEnter();
          break;
          case 112: 
          exitManager.exitReq()
          break
          case 114: 
          routeManager.back()
          break
      }
    },
    "/playListsList": function(code) {
      switch (code) {
        case 27:
        routeManager.home()
          break;
        case 40:
        listControllerPlayListsList.downFocusPosition();
          break;
        case 38:
        listControllerPlayListsList.upFocusPosition();
          break;
        case 39:
        listControllerPlayListsList.rigthFocusPosition();
          break;
        case 37:
        listControllerPlayListsList.leftFocusPosition();
          break;
        case 13:
        listControllerPlayListsList.onEnter();
          break;
        case 113:
        listControllerPlayListsList.onEnter();
          break;
          case 112: 
          exitManager.exitReq()
          break
          case 115: 
          routeManager.home()
          break
          case 114: 
          routeManager.back()
          break
          case 8: 
          routeManager.back()
          break
      }
    },
    "/seriesList": function(code) {
      console.log(code)
      switch (code) {
        case 8:
        routeManager.back()
        break;
        case 27:
          routeManager.home()
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
          case 113:
          listControllerVideo.onEnter();
          break;
          case 114:
          routeManager.back()
          break;
          case 115:
          routeManager.home()
          break;
          case 112: 
          exitManager.exitReq()
          break
      }
    },
    "/play": function(code) {
      switch (code) {
        case 27:
          Play.exitPlay();
          break;
          case 8:
          Play.exitPlay();
          break;
          case 122:
          Play.exitPlay();
          break;
          case 82:
          Play.switchPlayPause();
          break;
          case 89:
          Play.showPlayInfo();
          break;
        case 13:
        Play.showPlayInfo();
          break;
        case 38:
        Play.prevTimeShiftSize()
          break;
        case 40:
        Play.nextTimeShiftSize()
          break;
        case 107:
        Play.volumePlus();
          break;
        case 109:
        Play.volumeMinus();
          break;
        case 37:
        Play.timeShiftLeft();
          break;
        case 39:
        Play.timeShiftRight();
          break;
        case 66:
        Play.timeShiftLeft();
          break;
        case 70:
        Play.timeShiftRight();
          break;
        case 120:
        Play.OpenSettingMenu();
          break;
        case 123:
        Play.OpenSettingMenu();
          break;
        case 117:
          aspectRatioManager.handler();
        break
      }
    },
    "/play/settingMenu": function(code) {
      switch (code) {
        case 13:
        Play.playSettingMenuSubmit();
          break;
        case 38:
        Play.playSettingMenuPrevElem();
          break;
        case 40:
        Play.playSettingMenuNextElem();
          break;
        case 120:
        Play.closeSettingMenu();
          break;
        case 27:
        Play.closeSettingMenu();
          break;
        case 8:
        Play.closeSettingMenu();
          break;
        case 122:
        Play.closeSettingMenu();
          break;
          case 123:
        Play.closeSettingMenu();
          break;
      }
    },
    "/exitReq": function (code) {
      switch (code) {
           case 112:
          exitManager.cancel()
          break;
          case 40:
          exitManager.downFocusPosition();
          break
          case 38:
          exitManager.upFocusPosition();
          break
          case 13:
          exitManager.submit();
          break
      }
    }
  }
};

export default _;
