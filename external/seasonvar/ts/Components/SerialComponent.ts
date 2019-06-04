import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import SerialListComponent from "./SerialListComponent";
import BottomButtonComponent from "./BottomButtonComponent";
import GenreSelectComponent from "./GenreSelectComponent"
import InfoComponent from "./InfoComponent"
import SearchComponent from "./SearchComponent"
import MessageComponent from "./MessageComponent"

export default class SerialComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [SerialListComponent, GenreSelectComponent, InfoComponent, SearchComponent, MessageComponent];
  
    let title:any = ''
    let model:any = this.model
    let listGenre = model.genreManager.list_default.get().filter(
      item => {
        if (item.active) {
          return true
        }
      }
    ).map(item => item.name)
    let query = model.searchManager.query.get()
    
    if (listGenre.length !== 0) {
      title = `Жанры: ${listGenre.join(', ')}`
    }
    if (query) {
      title = `Поиск по запросу: ${query}`
    }

    if (title.length > 55) {
      title = title.split('')
      title.length = 52;
      title = title.join('')
      title = title + '...'
    }

    new HeaderComponent(title).render(
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
        text: "Жанры",
        visible: true
      },
      green: {
        text: "Инфо",
        visible: true
      },
      yellow: {
        text: "Поиск",
        visible: true
      },
      blue: {
        text: "В избранное",
        visible: true
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
