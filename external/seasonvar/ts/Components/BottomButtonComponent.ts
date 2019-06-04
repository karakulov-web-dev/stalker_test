import BaseComponent from "./BaseComponent";

import Button from "./ButtonComponent";

interface buttonConfig {
  text: string;
  visible: boolean;
}

interface buttonsConfig {
  red: buttonConfig;
  green: buttonConfig;
  yellow: buttonConfig;
  blue: buttonConfig;
}

export default class BottomButtonComponent extends BaseComponent {
  constructor(config: buttonsConfig) {
    super();
    this.config = config;
  }
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_BottomButtonComponent";

    var wrap1 = document.createElement("div");
    var wrap2 = document.createElement("div");
    var wrap3 = document.createElement("div");
    var wrap4 = document.createElement("div");

    wrap1.className = "app_BottomButton_wrap_button";
    wrap2.className = "app_BottomButton_wrap_button";
    wrap3.className = "app_BottomButton_wrap_button";
    wrap4.className = "app_BottomButton_wrap_button";

    let Button1 = new Button(
      this.config.red.text,
      "red",
      this.config.red.visible
    );
    let Button2 = new Button(
      this.config.green.text,
      "green",
      this.config.green.visible
    );
    let Button3 = new Button(
      this.config.yellow.text,
      "yellow",
      this.config.yellow.visible
    );
    let Button4 = new Button(
      this.config.blue.text,
      "blue",
      this.config.blue.visible
    );

    Button1.render(wrap1);
    Button2.render(wrap2);
    Button3.render(wrap3);
    Button4.render(wrap4);

    elem.appendChild(wrap1);
    elem.appendChild(wrap2);
    elem.appendChild(wrap3);
    elem.appendChild(wrap4);

    return elem;
  }
  private config;
}
