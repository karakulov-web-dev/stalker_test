declare var stb: any;

export default class ParentControl {
  constructor() {
    ParentControl;
    if (ParentControl.cache) {
      return ParentControl.cache;
    }
    ParentControl.cache = this;
  }
  private static cache: any = false;
  public init() {
    this.getEnv();
    this.getPassword();
  }
  public getEnv() {
    try {
      this.mac = stb.RDir("MACAddress");
      this.parentControl = stb.RDir("getenv parent_control_apps");
    } catch (e) {
      //this.mac = "00:1a:79:1a:87:fa";
      // this.parentControl = true;
      console.log(e);
    }
  }
  public getPassword() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `http://212.77.128.205/stalker_portal/custom/get_pass.php?mac=${
        this.mac
      }`,
      true
    );
    xhr.send();
    xhr.onreadystatechange = _ => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          this.password = data.password;
          this.ready();
        }
      }
    };
  }
  public isParentControlOn() {
    if (typeof this.parentControl === "undefined") {
      return false;
    } else if (this.parentControl === "false") {
      return false;
    }
    if (this.parentControl) {
      return true;
    } else {
      return false;
    }
  }
  public openParentControlWindow() {
    this.parentControlWindow = new ParentControlWindow();
    this.parentControlWindow.OnSubmit = password => {
      if (this.checkPassword(password)) {
        this.parentControlWindow.close();
      } else {
        this.parentControlWindow.invalid();
      }
    };
  }
  private checkPassword(password) {
    return password === this.password;
  }
  private ready() {
    this.onReady();
  }
  public onReady;
  private parentControlWindow;
  private mac;
  private parentControl;
  private password;
}

class ParentControlWindow {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    this.wrap = document.createElement("div");
    this.window = document.createElement("div");
    this.header = document.createElement("div");
    this.content = document.createElement("div");
    this.h1 = document.createElement("h1");
    this.input = document.createElement("input");
    this.okButton = document.createElement("input");
    this.exitButton = document.createElement("input");
    this.invalidElem = document.createElement("p");
    this.input.type = "password";
    this.okButton.type = "button";
    this.exitButton.type = "button";

    this.body.appendChild(this.wrap);
    this.wrap.appendChild(this.window);
    this.window.appendChild(this.header);
    this.window.appendChild(this.content);
    this.content.appendChild(this.h1);
    this.content.appendChild(this.input);
    this.content.appendChild(this.okButton);
    this.content.appendChild(this.exitButton);
    this.content.appendChild(this.invalidElem);

    this.header.innerHTML = "РОДИТЕЛЬСКИЙ КОНТРОЛЬ";
    this.h1.innerHTML = "Для доступа к приложению необходимо ввести пароль:";
    this.okButton.value = "OK";
    this.exitButton.value = "Выход";

    this.addElemsClassName();
    this.initInput();
  }
  public close() {
    document.onkeydown = this.oldInputHandler;
    this.wrap.style.display = "none";
    this.body.removeChild(this.wrap);
  }
  public invalid() {
    this.invalidElem.innerHTML = "Неправильный пароль!";
  }
  private addElemsClassName() {
    this.wrap.className = "ParentControlWindow_wrap";
    this.window.className = "ParentControlWindow_window";
    this.header.className = "ParentControlWindow_header";
    this.content.className = "ParentControlWindow_content";
    this.h1.className = "ParentControlWindow_h1";
    this.input.className = "ParentControlWindow_input";
    this.invalidElem.className = "ParentControlWindow_invalidElem";
    this.okButton.className = "ParentControlWindow_okButton";
    this.exitButton.className = "ParentControlWindow_exitButton";
  }
  private initInput() {
    let inputController = new InputController(
      this.input,
      this.okButton,
      this.exitButton,
      this.submit.bind(this)
    );
    this.oldInputHandler = document.onkeydown;
    document.onkeydown = event => {
      inputController.press(event.keyCode);
    };
  }
  private submit(value) {
    this.OnSubmit(value);
  }
  public OnSubmit;
  private okButton;
  private exitButton;
  private wrap;
  private body;
  private window;
  private header;
  private content;
  private h1;
  private input;
  private oldInputHandler;
  private invalidElem;
}

class InputController {
  constructor(inputElem, okElem, exitElem, submitF) {
    this.inputElem = inputElem;
    this.okElem = okElem;
    this.exitElem = exitElem;
    this.submitF = submitF;
    this.inputElem.focus();
  }
  public press(code: number) {
    if (code === 13) {
      this.enter();
    } else if (code === 40) {
      this.downFocus();
    } else if (code === 38) {
      this.upFocus();
    } else if (code === 39) {
      this.rightFocus();
    } else if (code === 37) {
      this.leftFocus();
    } else if (code === 27) {
      this.exit();
    } else if (code === 8) {
      this.back();
    }
  }
  private exit() {
    var win: any = window;
    try {
      stb.SetVideoState(1);
    } catch (e) {
      console.log(e);
    }
    var back_location = decodeURIComponent(
      win.location.search.match(/\?referrer\=.*/)
    );
    back_location = back_location.replace(/\?referrer\=/, "");
    win.location = back_location;
  }
  private back() {
    if (this.inputElem !== document.activeElement) {
      this.exit();
    }
  }
  private downFocus() {
    if (this.inputElem === document.activeElement) {
      this.okElem.focus();
    } else if (this.exitElem === document.activeElement) {
    } else if (this.okElem === document.activeElement) {
      this.exitElem.focus();
    }
  }
  private upFocus() {
    if (this.inputElem === document.activeElement) {
    } else if (this.exitElem === document.activeElement) {
      this.okElem.focus();
    } else if (this.okElem === document.activeElement) {
      this.inputElem.focus();
    }
  }
  private rightFocus() {
    if (this.inputElem === document.activeElement) {
    } else if (this.exitElem === document.activeElement) {
    } else if (this.okElem === document.activeElement) {
      this.exitElem.focus();
    }
  }
  private leftFocus() {
    if (this.inputElem === document.activeElement) {
    } else if (this.exitElem === document.activeElement) {
      this.okElem.focus();
    } else if (this.okElem === document.activeElement) {
      this.inputElem.focus();
    }
  }
  private enter() {
    if (this.inputElem === document.activeElement) {
      this.submitF(this.inputElem.value);
    } else if (this.exitElem === document.activeElement) {
      this.exit();
    } else if (this.okElem === document.activeElement) {
      this.submitF(this.inputElem.value);
    }
  }
  private submitF: Function;
  private inputElem: HTMLInputElement;
  private okElem: HTMLInputElement;
  private exitElem: HTMLInputElement;
}
