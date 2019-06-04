import AppModel from "./AppModel";

export default class ListController {
  constructor(instanceModel) {
    this.model = new AppModel();
    this.instanceModel = instanceModel;
    this.focusPosition = this.instanceModel.getValue("focusPosition");
    this.scrolPosition = this.instanceModel.getValue("scrolPosition");
    this.display = this.instanceModel.getValue("display");
    this.list = this.instanceModel.getValue("list");
  }
  public rigthFocusPosition() {     
    var scrolPosition = this.scrolPosition.get();
    var activePosition = this.focusPosition.get();
    if (activePosition < 5) {
      if (typeof this.display.get()()[activePosition + 1] !== 'undefined') {
        this.focusPosition.set(activePosition + 1);
      }
    } else if (activePosition === 5 && activePosition !== this.display.get()().length - 1 )  {
      this.scrolPosition.set(scrolPosition + 6);
      this.focusPosition.set(0);
    }
    if (this.display.get()().length > 5) {
      this.infiniteScroll();
    }
  }
  public leftFocusPosition() {
    var scrolPosition = this.scrolPosition.get();
    var minScrolPosition = 0;
    var activePosition = this.focusPosition.get();
    if (scrolPosition <= 0 && activePosition === 0) {
      return;
    }
    if (activePosition <= minScrolPosition) {
      this.scrolPosition.set(scrolPosition - 6);
      this.focusPosition.set(5);
      return;
    }
    this.focusPosition.set(activePosition - 1);
  };
  public upFocusPosition() {
    var length = this.list.get().length;
    var scrolPosition = this.scrolPosition.get();
    var minScrolPosition = 0;
    var activePosition = this.focusPosition.get();
    if (scrolPosition <= 0 && activePosition < 3) {
      return;
    }
    if (activePosition < 3) {
      var newScrolPosition = scrolPosition - 6;
      if (newScrolPosition < minScrolPosition) {
        this.scrolPosition.set(minScrolPosition);
      } else {
        this.scrolPosition.set(newScrolPosition);
        this.focusPosition.set(activePosition + 3);
      }
      return;
    }
    this.focusPosition.set(activePosition - 3);
  };
  public downFocusPosition() {
    var length = this.list.get().length;
    var scrolPosition = this.scrolPosition.get();
    var maxScrolPosition = length - 1;
    var activePosition = this.focusPosition.get();
    if (length <= scrolPosition + 6 && activePosition >= 3) {
      if (this.display.get()().length > 5) {
        this.infiniteScroll();
      }
      return;
    }
    if (activePosition >= 3) {
      var newScrolPosition = scrolPosition + 6;
      if (newScrolPosition > maxScrolPosition) {
        this.scrolPosition.set(maxScrolPosition);
      } else {
        this.scrolPosition.set(newScrolPosition);
        if (typeof this.display.get()()[activePosition -3] !== 'undefined') {
        this.focusPosition.set(activePosition - 3);
        } else {
          this.focusPosition.set(this.display.get()().length - 1)
        }
      }
      if (this.display.get()().length > 5) {
        this.infiniteScroll();
      }
      return;
    }
    if (typeof this.display.get()()[activePosition + 3] !== 'undefined') {
      this.focusPosition.set(activePosition + 3);
    }
    if (this.display.get()().length > 5) {
      this.infiniteScroll();
    }
  };
  protected infiniteScroll () {
 
  }
  public onEnter() {

  }
  protected instanceModel;
  protected focusPosition;
  protected scrolPosition;
  protected list;
  protected display;
  protected model;
}
