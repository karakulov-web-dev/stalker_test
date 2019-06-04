export default class Model {
  static model: Model;
  constructor(instance?: boolean) {
    if (Model.model && !instance) {
      return Model.model;
    }
  }
  public createInstance(name: string) {
    if (typeof this[name] !== "undefined") {
      throw new Error("Instance " + name + " already exists");
    }
    this[name] = new Model(true);
    return this[name];
  }
  public getInstance(name: string): Model {
    if (typeof this[name] === "undefined") {
      throw new Error("Instance " + name + " undefined");
    }
    return this[name];
  }
  public getValue(key: string): any {
    if (typeof this[key] === "undefined") {
      throw new Error("Value " + key + " undefined");
    }
    return this[key];
  }
  public createValue(key: string, value: any) {
    var self = this;
    this[key] = {
      value: value,
      set: function(value) {
        this.value = value;
        this.sendToSubscribers();
      },
      get: function() {
        return this.value;
      },
      subscribe: function(obj) {
        var subscribeList = this.subscribeList;
        var app = document.getElementById("app");
        subscribeList.forEach(function(item) {
        var status = self.checkMountDOM(item.wrap, app);
        if (status) {
        var index = subscribeList.indexOf(item);
        subscribeList.splice(index, 1);
        }
        });
        subscribeList.push(obj);
      },
      clear: function(obj) {
        var index = this.subscribeList.indexOf(obj);
        if (index !== -1) {
          this.subscribeList.splice(index, 1);
        }
      },
      subscribeList: [],
      sendToSubscribers: function() {
        this.subscribeList.forEach(function(obj) {
          obj.render();
        });
      }
    };
  }
  private checkMountDOM(elem, stopElem) {
    var status;
    this.parentIsNull(elem, stopElem, function(value) {
      status = value;
    });
    return status;
  }
  private parentIsNull(elem, stopElem, cb) {
    if (elem.parentNode === null) {
      cb(true);
      return true;
    }
    if (elem.parentNode === stopElem) {
      cb(false);
      return false;
    }
    this.parentIsNull(elem.parentNode, stopElem, cb);
  }
}
