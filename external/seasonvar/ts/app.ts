import bindPolifil from "./Polyfill/bindSimplePolyfill";
import AppModel from "./AppModel";
import PageRouter from "./Components/PageRouter";
import inputLayer from "./inputLayer/inputLayer";
import { stbObj } from "./interfaceGlobal";
import adaptation from "./adaptation";
import { getUpdateList } from "./HTTP";
import aspectRatioManager from "./aspectRatioManager";
import createPrevViewData from "./createPrevViewData";
import ParentControl from "./ParentControl";

declare var gSTB: stbObj;
declare var stb: stbObj;
declare var netscape: any;
declare var window: any;

class App {
  static main(appContainerSelector: string) {
    bindPolifil();
    adaptation();
    var mac;
    try {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

      stb = gSTB;
      stb.InitPlayer();
      stb.SetVideoControl(1);
      stb.SetVideoState(1);
      stb.SetTopWin(0);
      stb.SetVolume(100);
      var stbEvent = {
        onEvent: function(data) {},
        event: 0
      };
      mac = stb.RDir("MACAddress");
    } catch (e) {
      console.log(e);
    }
    if (typeof mac === "undefined") {
      mac = "testMac";
    }

    var parentControl = new ParentControl();
    parentControl.init();
    parentControl.onReady = function() {
      if (!parentControl.isParentControlOn()) {
        return false;
      }
      parentControl.openParentControlWindow();
    };

    aspectRatioManager.mount("aspect");
    aspectRatioManager.init();

    let appContainer = document.getElementById(appContainerSelector);
    let pageRouterWrap = document.createElement("div");
    appContainer.appendChild(pageRouterWrap);

    let model: any = new AppModel();
    window.model = model;

    model.App.userMac.set(mac);

    model.updateList.list.set(createPrevViewData());
    getUpdateList({ offset: 0 }).then(data => {
      model.updateList.list.set(data);
    });

    inputLayer.init();

    let pageRouter = new PageRouter();
    pageRouter.render(appContainer);
  }
}

App.main("app");
