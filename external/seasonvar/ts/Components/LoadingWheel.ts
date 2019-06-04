import BaseComponent from "./BaseComponent";

export default class LoadingWheel extends BaseComponent {
  constructor() {
    super();
    this.instancePlay = this.model.getInstance("Play");
    this.loadingWheel = this.instancePlay.getValue("loadingWheel");
    this.loadingWheel.subscribe(this);
  }
  protected create() {
    var loadingWheelStatus = this.loadingWheel.get();
    var div = document.createElement("div");
    if (!loadingWheelStatus) {
      return div;
    }
    div.className = "app_Play_loadingWheel_img_container";
    var img = document.createElement("img");
    div.appendChild(img);
    img.className = "app_Play_loadingWheel_img";
    img.src = "./img/loading.gif";
    return div;
  }
  private instancePlay;
  private loadingWheel;
}
