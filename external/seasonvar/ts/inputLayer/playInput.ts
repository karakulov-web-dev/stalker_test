import Play from "../Play";
import aspectRatioManager from "../aspectRatioManager";

export function play(code) {
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
        Play.prevTimeShiftSize();
        break;
      case 40:
        Play.nextTimeShiftSize();
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
        break;
    }
  }

export function playSettingMenu(code) {
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
  }