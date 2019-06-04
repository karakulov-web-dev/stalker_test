import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import SeasonListComponent from "./SeasonListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class HomeComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [SeasonListComponent];

    new HeaderComponent(this.model.getInstance('serialList').getValue('display').get()()[this.model.getInstance('serialList').getValue('focusPosition').get()].name).render(
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
        text: "Назад",
        visible: true
      },
      green: {
        text: "Инфо",
        visible: false
      },
      yellow: {
        text: "Поиск",
        visible: false
      },
      blue: {
        text: "Сортировать",
        visible: false
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);

    return elem;
  }
}
