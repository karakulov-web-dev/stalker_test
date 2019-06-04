import BaseComponent from "./BaseComponent";
import LoadingWheel from "./LoadingWheel";
import ControlBar from "./ControlBar";

export default class PlayComponent extends BaseComponent {
  protected create() {
    var div = document.createElement("div");
    div.className = "app_Play";
    var controlBarWrap = document.createElement("div");
    var loadingWheelWrap = document.createElement("div");
    var pauseIndicatorWrap = document.createElement("div");

    div.appendChild(loadingWheelWrap);
    div.appendChild(controlBarWrap);
    div.appendChild(pauseIndicatorWrap);

    var loadingWheel = new LoadingWheel();
    var controlBar = new ControlBar();
    var pauseIndicator = new PauseIndicator();

    loadingWheel.render(loadingWheelWrap);
    controlBar.render(controlBarWrap);
    pauseIndicator.render(pauseIndicatorWrap)
    return div;
  }
}

class PauseIndicator extends BaseComponent {
  constructor () {
    super()
    let model = this.model as any
    model.Play.status.subscribe(this)
  }
  protected create() {
    let model = this.model as any
    var div = document.createElement("div")
    if ((model.Play.status.get()) !== "pause") {
      return div
    }
    div.className = "app_Play_PauseIndicator"
    return div;
  }
}