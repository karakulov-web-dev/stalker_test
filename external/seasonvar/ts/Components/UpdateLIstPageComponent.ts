import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import UpdateListComponent from "./UpdateListComponent";
import BottomButtonComponent from "./BottomButtonComponent";
import InfoComponent from "./InfoComponent"

export default class UpdateLIstPageComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [UpdateListComponent, InfoComponent];
  
    new HeaderComponent('Обновления').render(
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
        text: "Все сериалы",
        visible: true
      },
      green: {
        text: "Инфо",
        visible: true
      },
      yellow: {
        text: "История",
        visible: true
      },
      blue: {
        text: "Избранное",
        visible: true
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
