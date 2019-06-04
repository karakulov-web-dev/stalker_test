import BaseComponent from "./BaseComponent";

export default class ButtonComponent extends BaseComponent {
  constructor(text: string, color: string, visible: boolean) {
    super();
    this.color = color;
    this.text = text;
    this.visible = visible;
  }
  protected create() {
    var button = document.createElement("div");
    if (!this.visible) {
      button.style.visibility = "hidden";
    }
    button.className =
      "app_BottomButton_button app_BottomButton_button_" + this.color;
    button.innerHTML = this.text;
    return button;
  }
  private color: string;
  private text: string;
  private visible: boolean;
}
