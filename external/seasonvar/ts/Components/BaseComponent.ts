import AppModel from "../AppModel";

type elem = {
  innerHTML: string;
  appendChild(elem: any): () => void;
};

export default class BaseComponent {
  constructor() {
    this.wrap = document.createElement("div");
    this.model = new AppModel();
  }
  public render(elem?: any) {
    if (typeof elem !== "undefined") {
      elem.innerHTML = "";
      elem.appendChild(this.wrap);
    }
    let content = this.create();
    this.wrap.innerHTML = "";
    this.wrap.appendChild(content);
  }
  protected create(): elem {
    let elem = document.createElement("div");
    return elem;
  }
  protected wrap: elem;
  protected model: AppModel;
}
