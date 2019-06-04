declare var stb: any;

interface MenuListInterface {
  name: string;
  list: MenuListItem[];
  getFocusItem(): MenuListItem;
  downFocus(): void;
  upFocus(): void;
}

export default class MainSettingMenu {
  constructor() {
    this.mainList = new MainMenuList();
    this.interface = new MainSettingMenuWindow(this.mainList);
    this.list = this.mainList;
    MainSettingMenu.cache = this;
  }
  private static cache: MainSettingMenu;
  public static getCurrentInstance(): MainSettingMenu {
    return MainSettingMenu.cache;
  }
  public open(): void {
    this.interface.create();
    this.oldInputHandler = document.onkeydown;
    document.onkeydown = event => {
      if (event.keyCode === 13) {
        this.submit();
      }
      if (event.keyCode === 38) {
        this.upFocus();
      }
      if (event.keyCode === 40) {
        this.downFocus();
      }
      if (event.keyCode === 27) {
        this.close();
      }
      if (event.keyCode === 8) {
        this.close();
      }
    };
  }
  public returnOldInput() {
    document.onkeydown = this.oldInputHandler as any;
  }
  public close() {
    this.returnOldInput();
    this.interface.remove();
  }
  public setMunuList(menuList: MenuListInterface): void {
    this.interface.menuList = menuList;
    this.interface.update();
    this.list = menuList;
  }
  private submit(): void {
    let item = this.list.getFocusItem();
    item.action();
  }
  private upFocus(): void {
    this.list.upFocus();
    this.interface.update();
  }
  private downFocus(): void {
    this.list.downFocus();
    this.interface.update();
  }
  private list: MenuListInterface;
  private mainList: MenuListInterface;
  private interface: MainSettingMenuWindow;
  private oldInputHandler: Function;
}

class MainSettingMenuWindow {
  constructor(menuList: MenuListInterface) {
    this.body = document.getElementsByTagName("body")[0];
    this.menuList = menuList;
  }
  public create(): void {
    this.div = document.createElement("div");
    this.window = document.createElement("div");
    this.header = document.createElement("div");
    this.content = document.createElement("div");
    this.body.appendChild(this.div);
    this.div.appendChild(this.window);
    this.window.appendChild(this.header);
    this.window.appendChild(this.content);
    this.addElemsClassName();
    this.update();
  }
  private addElemsClassName() {
    this.div.className = "app_MainSettingMenuList_wrap";
    this.window.className = "app_MainSettingMenuList_window";
    this.header.className = "app_MainSettingMenuList_header";
    this.content.className = "app_MainSettingMenuList_content";
  }
  public update(): void {
    this.header.innerHTML = this.menuList.name;
    this.content.innerHTML = "";
    this.menuList.list.forEach(item => {
      let div = document.createElement("div");
      let p = document.createElement("p");
      div.appendChild(p);
      p.innerHTML = item.name;
      this.content.appendChild(div);
      div.className = "app_MainSettingMenuListItem";
      if (item.focus) {
        div.className = "app_MainSettingMenuListItem active";
      }
    });
  }
  public remove(): void {
    this.body.removeChild(this.div);
  }
  public menuList: MenuListInterface;
  private body;
  private div;
  private window;
  private header;
  private content;
  private h1;
}

class MenuListItem {
  constructor(name, focus, action: Function) {
    this.name = name;
    this.focus = focus;
    this.action = action;
  }
  public name: string;
  public focus: boolean;
  public action: Function;
}

class MenuList implements MenuListInterface {
  constructor(name: string, list: MenuListItem[]) {
    this.name = name;
    this.list = list;
  }
  public getFocusItem(): MenuListItem {
    let focusItem: MenuListItem;
    this.list.forEach(item => {
      if (item.focus) {
        focusItem = item;
      }
    });
    return focusItem;
  }
  public downFocus(): void {
    let focusItem = this.getFocusItem();
    let focusIndex = this.list.indexOf(focusItem);
    let newFocusIndex = focusIndex + 1;
    if (typeof this.list[newFocusIndex] !== "undefined") {
      this.list[focusIndex].focus = false;
      this.list[newFocusIndex].focus = true;
    }
  }
  public upFocus(): void {
    let focusItem = this.getFocusItem();
    let focusIndex = this.list.indexOf(focusItem);
    let newFocusIndex = focusIndex - 1;
    if (typeof this.list[newFocusIndex] !== "undefined") {
      this.list[focusIndex].focus = false;
      this.list[newFocusIndex].focus = true;
    }
  }
  public name: string;
  public list: MenuListItem[];
}

class MainMenuList extends MenuList implements MenuListInterface {
  constructor() {
    let list: MenuListItem[] = [];
    list[0] = new MenuListItem("Родительский контроль", true, _ => {
      let menu = MainSettingMenu.getCurrentInstance();
      let parentControlMenuList = new ParentControlMenuList();
      menu.setMunuList(parentControlMenuList);
    });
    super("Настройки", list);
  }
}

class ParentControlMenuList extends MenuList implements MenuListInterface {
  constructor() {
    let list: MenuListItem[] = [];
    list[0] = new MenuListItem("Включить", true, _ => {
      let menu = MainSettingMenu.getCurrentInstance();
      menu.close();
      setTimeout(function() {
        try {
          stb.RDir("setenv parent_control_apps true");
        } catch (e) {
          console.log(e);
        }
      }, 10);
    });
    list[1] = new MenuListItem("Выключить", false, _ => {
      let menu = MainSettingMenu.getCurrentInstance();
      menu.close();
      setTimeout(function() {
        try {
          stb.RDir("setenv parent_control_apps false");
        } catch (e) {
          console.log(e);
        }
      }, 10);
    });
    super("Родительский контроль", list);
  }
}
