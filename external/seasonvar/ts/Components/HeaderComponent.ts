import BaseComponent from "./BaseComponent";

export default class HeaderComponent extends BaseComponent {
  constructor (breadcrumbs?:string) {
    super()
    this.breadcrumbs = breadcrumbs
  }
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HeaderComponent";

    let p = document.createElement("p")
    if (this.breadcrumbs) {
      p.innerHTML = this.breadcrumbs
      p.className = "app_HeaderComponent_breadcrumbs"
      elem.appendChild(p)
    }

    let img = document.createElement("img");
    img.className = "app_HeaderComponent_img";
    img.src = "./img/top.logo.png";

    elem.appendChild(img);

    return elem;
  }
  private breadcrumbs
}
