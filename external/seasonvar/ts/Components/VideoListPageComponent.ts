import BaseComponent from "./BaseComponent";
import HeaderComponent from "./HeaderComponent";
import VideoListComponent from "./VideoListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class VideoListPageComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let model = this.model as any;
   let title = model.channels.display.get()()[model.channels.focusPosition.get()].snippet.title

   new HeaderComponent(title).render(elem.appendChild(document.createElement("div")))
   new VideoListComponent().render(elem.appendChild(document.createElement("div")))

    let bottomBtnComp = new BottomButtonComponent({
      red: {
        text: "Выход",
        visible: true
      },
      green: {
        text: "Смотреть",
        visible: true
      },
      yellow: {
        text: "Назад",
        visible: true
      },
      blue: {
        text: "На главную",
        visible: true
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
