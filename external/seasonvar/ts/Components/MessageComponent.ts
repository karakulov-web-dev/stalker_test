import BaseComponent from "./BaseComponent";

export default class MessageComponent extends BaseComponent {
  constructor() {
    super();
    let model:any = this.model
    model.message.visible.subscribe(this)
    model.message.text.subscribe(this)
  }
  protected create() {
    let model:any = this.model;
    var div = document.createElement("div");
    if (!model.message.visible.get()) {
        return div
    }
    div.className = "app_messageComponent";
    let text = model.message.text.get()
    div.innerHTML = text
    return div
  }
  private instancePlay;
  private loadingWheel;
}
