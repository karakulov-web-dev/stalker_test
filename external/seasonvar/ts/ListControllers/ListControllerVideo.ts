import ListController from "./ListController";
import Play from "../Play";
import { stbObj } from "../interfaceGlobal";
import RouteManager from "../RouteManager";
import { pushHistory } from "../HTTP";

declare var stb: stbObj;

export default class ListControllerVideo extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openVideo();
  }
  public goHome() {
    new RouteManager().set("/serialList");
  }
  protected infiniteScroll() {
    return false;
  }
  private defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  private openVideo() {
    this.model.App.route.set("/play");
    this.model.Play.timeBar.set({ playSec: 0, durationSec: 0 });
    this.model.Play.loadingWheel.set(true);
    var url;
    var display = this.model.seriesList.display.get()();
    var activePosition = this.model.seriesList.focusPosition.get();
    var qualityArr = [{ url: display[activePosition].link }];
    if (typeof qualityArr[0].url === "undefined") {
      throw new Error("qualityArr undefined");
    }
    pushHistory(display[activePosition]);
    Play.playControlInterfaceInit();
    var newQualityArr = [];
    qualityArr.forEach(function(item) {
      newQualityArr.unshift(item);
    });
    var url = newQualityArr[0].url;
    newQualityArr[0].activated = true;
    this.model.Play.settingMenu.qualityList.set(newQualityArr);
    setTimeout(() => {
      this.model.Play.loadingWheel.set(false);
    }, 500);
    try {
      if (!url) {
        throw new Error("url not found");
      } else {
        stb.SetVideoState(1);
        stb.Play(`${url}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
  private activeItem;
}
