import BaseComponent from "./BaseComponent";
import HeaderComponent from "./HeaderComponent";
import BottomButtonComponent from "./BottomButtonComponent";
import ExitReqComp from "./ExitReqComp"

export default class ExitReqPageComp extends BaseComponent {
    protected create () {
        let div = document.createElement("div")
        div.className = "app_ExitReqPageComp";
        
        new HeaderComponent().render(div.appendChild(document.createElement("div")))
        new ExitReqComp().render(div.appendChild(document.createElement("div")))

        let bottomBtnComp = new BottomButtonComponent({
            red: {
              text: "Отмена",
              visible: true
            },
            green: {
              text: "Смотреть",
              visible: false
            },
            yellow: {
              text: "На главную",
              visible: false
            },
            blue: {
              text: "1",
              visible: false
            }
          });
          let btnWrap = document.createElement("div");
          div.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
        return div
    }
}