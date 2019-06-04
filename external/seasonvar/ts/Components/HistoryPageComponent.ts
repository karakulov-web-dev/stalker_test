import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import BottomButtonComponent from "./BottomButtonComponent";
import HistotyListComponent from "./HistotyListComponent"

export default class UpdateLIstPageComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [HistotyListComponent];
  
    new HeaderComponent('История просмотров').render(
      elem.appendChild(document.createElement("div"))
    );

    compList.forEach(Comp => {
      let wrap = document.createElement("div");
      let comp = new Comp();
      elem.appendChild(wrap);
      comp.render(wrap);
    });

    let bottomBtnComp = new BottomButtonComponent({
      red: {
        text: "Очистить",
        visible: true
      },
      green: {
        text: "Откр. Сериал",
        visible: false
      },
      yellow: {
        text: "Откр. Сезон",
        visible: false
      },
      blue: {
        text: "Очистить",
        visible: false
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
