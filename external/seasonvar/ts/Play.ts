import AppModel from "./AppModel";
import { stbObj } from "./interfaceGlobal";

let model = new AppModel();
let Play: any = model.getInstance("Play");
let VideoList: any = model.getInstance("seriesList");
let App: any = model.getInstance("App");

var namespace = {
  model: {
    VideoList: VideoList,
    Play: Play,
    App: App
  }
};

declare var _: any;
declare var stb: stbObj;

var _: any = {};
_.playControlInterfaceInit = function() {
  try {
    var durationSec = stb.GetMediaLenEx() / 1000;

    var progress = namespace.model.Play.progress.get();

    progress.play = 0;
    namespace.model.Play.progress.set(progress);

    var timeBar = namespace.model.Play.timeBar.get();
    timeBar.durationSec = durationSec;
    timeBar.playSec = 0;
    namespace.model.Play.timeBar.set(timeBar);
  } catch (e) {
    console.log(e);
  }
  namespace.model.Play.status.set("play");

  var display = namespace.model.VideoList.display.get()();
  var activePosition = namespace.model.VideoList.focusPosition.get();
  var name = display[activePosition].name;
  let item = display[activePosition];
  let season = item.season_number;
  if (+season > 0) {
    season = `${season} сезон`
  } else {
    season = '';
  }
  name = `${item.serial}: ${season} ${item.name}`;

  namespace.model.Play.name.set(name);
  this.showPlayInfo();
  this.progresControllStart();
};
_.progresControllStart = function progresControllStart() {
  if (this.progresControllInterval) {
    clearInterval(this.progresControllInterval);
  }
  this.progresControllInterval = setInterval(function() {
    try {
      var playPosition = stb.GetPosTimeEx();
      var duration = stb.GetMediaLenEx();

      var percent = 100 / duration;
      var percentPosition = percent * playPosition;
      var progress = namespace.model.Play.progress.get();

      if (!(percent && percentPosition)) {
        percentPosition = 0;
      }

      namespace.model.Play.timeBar.get().playSec = playPosition / 1000;
      namespace.model.Play.timeBar.get().durationSec = duration / 1000;
      namespace.model.Play.timeBar.set(namespace.model.Play.timeBar.get());

      if (percentPosition > 99.9) {
        _.exitPlay();
      }

      progress.play = percentPosition;
      progress.duration = duration;
      namespace.model.Play.progress.set(progress);
    } catch (e) {
      console.log(e);
    }
  }, 2000);
};
_.progresControllInterval = undefined;
_.pause = function() {
  namespace.model.Play.status.set("pause");
  namespace.model.Play.visibleControlBar.set(true);
  clearTimeout(_.showPlayInfo.timer);
  try {
    stb.Pause();
  } catch (e) {
    console.log(e);
  }
};
_.continuePlayback = function() {
  try {
    stb.Continue();
    namespace.model.Play.status.set("play");
    this.showPlayInfo();
  } catch (e) {
    console.log(e);
  }
};
_.switchPlayPause = function() {
  try {
    var status = stb.IsPlaying();
    if (status) {
      this.pause();
    } else {
      this.continuePlayback();
    }
  } catch (e) {
    console.log(e);
  }
};
_.showPlayInfo = function showPlayInfo() {
  namespace.model.Play.visibleControlBar.set(true);
  let selfFunction: any = showPlayInfo;
  try {
    if (selfFunction.timer) {
      clearInterval(selfFunction.timer);
    }
  } catch (e) {
    console.log(e);
  }
  selfFunction.timer = setTimeout(function() {
    namespace.model.Play.visibleControlBar.set(false);
  }, 5000);
};
_.exitPlay = function() {
  try {
    clearInterval(this.progresControllInterval);
  } catch (e) {
    console.log(e);
  }
  namespace.model.App.route.set("/seriesList")
  try {
    stb.Stop();
    stb.SetVideoState(0);
  } catch (e) {
    console.log(e);
  }
};
_.volumePlus = function() {
  this.showPlayInfo();
  try {
    var vol = stb.GetVolume();
    vol = vol + 10;
    if (vol > 100) {
      vol = 100
    }
    stb.SetVolume(vol);
    namespace.model.Play.volume.set(stb.GetVolume());
  } catch (e) {
    console.log(e);
  }
};
_.volumeMinus = function() {
  this.showPlayInfo();
  try {
    var vol = stb.GetVolume();
    if (vol <= 10) {
      vol = 0;
    } else {
      vol = vol - 10;
    }
    stb.SetVolume(vol);
    namespace.model.Play.volume.set(stb.GetVolume());
  } catch (e) {
    console.log(e);
  }
};
_.timeShiftControlTimer = false;
_.timeShiftControlActive = false;
_.timeShiftCurrentTime = false;
_.timeShiftBlock = false;
_.timeShiftRight = function() {
  if (this.timeShiftBlock) {
    return;
  }
  clearInterval(this.progresControllInterval);
  var self = this;
  this.showPlayInfo();
  var time;
  if (this.timeShiftControlActive) {
    time = this.timeShiftCurrentTime;
  } else {
    try {
      time = stb.GetPosTimeEx();
    } catch (e) {
      time = 5;
    }
  }
  this.timeShiftControlActive = true;
  this.timeShiftCurrentTime =
    time + namespace.model.Play.timeShiftSize.get().value * 1000;
  var duration = stb.GetMediaLenEx();
  var percent = 100 / duration;
  var percentPosition = percent * this.timeShiftCurrentTime;
  var progress = namespace.model.Play.progress.get();

  var timeBar = namespace.model.Play.timeBar.get();
  timeBar.durationSec = duration / 1000;
  timeBar.playSec = this.timeShiftCurrentTime / 1000;

  if (timeBar.playSec >= timeBar.durationSec) {
    timeBar.playSec = timeBar.durationSec;
  }
  if (timeBar.playSec <= 0) {
    timeBar.playSec = 0;
  }

  if (percentPosition > 100) {
    percentPosition = 100;
  }
  if (percentPosition <= 0) {
    percentPosition = 0;
  }

  namespace.model.Play.timeBar.set(timeBar);

  progress.play = percentPosition;
  namespace.model.Play.progress.set(progress);
  if (this.timeShiftControlTimer) {
    clearTimeout(this.timeShiftControlTimer);
  }

  this.timeShiftControlTimer = setTimeout(function() {
    try {
      var duration = stb.GetMediaLenEx();
      if (
        self.timeShiftCurrentTime >= duration ||
        self.timeShiftCurrentTime <= 0
      ) {
        self.timeShiftCurrentTime = 0;
      }
      stb.SetPosTimeEx(self.timeShiftCurrentTime);

      var percent = 100 / duration;
      var percentPosition = percent * self.timeShiftCurrentTime;

      var progress = namespace.model.Play.progress.get();
      progress.play = percentPosition;
      namespace.model.Play.progress.set(progress);
    } catch (e) {
      console.log(e);
    }
    self.timeShiftBlock = true;
    setTimeout(function() {
      self.timeShiftBlock = false;
      self.progresControllStart();
      self.timeShiftControlActive = false;
    }, 1000);
  }, 1500);
};

_.timeShiftLeft = function() {
  if (this.timeShiftBlock) {
    return;
  }
  clearInterval(this.progresControllInterval);
  var self = this;
  this.showPlayInfo();
  var time;
  if (this.timeShiftControlActive) {
    time = this.timeShiftCurrentTime;
  } else {
    try {
      time = stb.GetPosTimeEx();
    } catch (e) {
      time = 5;
    }
  }
  this.timeShiftControlActive = true;
  this.timeShiftCurrentTime =
  time - namespace.model.Play.timeShiftSize.get().value * 1000;
  var duration = stb.GetMediaLenEx();
  var percent = 100 / duration;
  var percentPosition = percent * this.timeShiftCurrentTime;
  var progress = namespace.model.Play.progress.get();

  var timeBar = namespace.model.Play.timeBar.get();
  timeBar.durationSec = duration / 1000;
  timeBar.playSec = this.timeShiftCurrentTime / 1000;

  if (timeBar.playSec >= timeBar.durationSec) {
    timeBar.playSec = timeBar.durationSec;
  }
  if (timeBar.playSec <= 0) {
    timeBar.playSec = 0;
  }

  if (percentPosition > 100) {
    percentPosition = 100;
  }
  if (percentPosition <= 0) {
    percentPosition = 0;
  }

  namespace.model.Play.timeBar.set(timeBar);

  progress.play = percentPosition;
  namespace.model.Play.progress.set(progress);
  if (this.timeShiftControlTimer) {
    clearTimeout(this.timeShiftControlTimer);
  }

  this.timeShiftControlTimer = setTimeout(function() {
    try {
      var duration = stb.GetMediaLenEx();
      if (
        self.timeShiftCurrentTime >= duration ||
        self.timeShiftCurrentTime <= 0
      ) {
        self.timeShiftCurrentTime = 0;
      }
      stb.SetPosTimeEx(self.timeShiftCurrentTime);

      var percent = 100 / duration;
      var percentPosition = percent * self.timeShiftCurrentTime;

      var progress = namespace.model.Play.progress.get();
      progress.play = percentPosition;
      namespace.model.Play.progress.set(progress);
    } catch (e) {
      console.log(e);
    }
    self.timeShiftBlock = true;
    setTimeout(function() {
      self.timeShiftBlock = false;
      self.progresControllStart();
      self.timeShiftControlActive = false;
    }, 1000);
  }, 1500);
};

(function () {
  _.nextTimeShiftSize = function () {
    changeTimeShiftSize (1)
    _.showPlayInfo();
  }
  
  _.prevTimeShiftSize = function () {
    changeTimeShiftSize (-1)
    _.showPlayInfo();
  }

  function changeTimeShiftSize (changeValue:number) {
    var size = namespace.model.Play.timeShiftSize.get()
    var i = 0;
    var index = 0;
    timeShiftSizeList.forEach(function (item) {
      if (item.value === size.value) {
        index = i
      }
      i++
    })
    if (typeof timeShiftSizeList[index + changeValue] !== 'undefined') {
      namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index + changeValue])
    } else {
      namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index])
    }
  }

  var timeShiftSizeList = [
    {
      name: "10 мин",
      value: 600,
      command: "changetimeShiftSize"
    },
    {
      name: "05 мин",
      value: 300,
      command: "changetimeShiftSize"
    },
    {
      name: "01 мин",
      value: 60,
      command: "changetimeShiftSize"
    },
    {
      name: "30 сек",
      value: 30,
      command: "changetimeShiftSize"
    },
    {
      name: "20 сек",
      value: 20,
      command: "changetimeShiftSize"
    },
    {
      name: "10 сек",
      value: 10,
      command: "changetimeShiftSize",
    }
  ]
})()

_.OpenSettingMenu = function() {
  namespace.model.App.route.set("/play/settingMenu") 
  namespace.model.Play.settingMenu.visible.set(true);
  namespace.model.Play.visibleControlBar.set(true);
  if (typeof _.showPlayInfo.timer !== "undefined") {
    clearTimeout(_.showPlayInfo.timer);
  }
  var menuList = namespace.model.Play.settingMenu.mainList.get();
  menuList = JSON.parse(JSON.stringify(menuList));
  namespace.model.Play.settingMenu.list.set(menuList);
};

_.playSettingMenuNextElem = function() {
  changePlaySettingMenuElemPosition("+");
};
_.playSettingMenuPrevElem = function() {
  changePlaySettingMenuElemPosition("-");
};
function changePlaySettingMenuElemPosition(string) {
  var list = namespace.model.Play.settingMenu.list.get();
  var activeIndex;
  var i = 0;
  list.forEach(function(item) {
    if (item.active) {
      item.active = false;
      activeIndex = i;
    }
    i++;
  });
  var newIndex;
  if (string === "-") {
    newIndex = activeIndex - 1;
  } else {
    newIndex = activeIndex + 1;
  }
  if (typeof list[newIndex] === "undefined") {
    newIndex = activeIndex;
  }
  list[newIndex].active = true;
  namespace.model.Play.settingMenu.list.set(list);
}
_.playSettingMenuSubmit = function() {
  var list = namespace.model.Play.settingMenu.list.get();
  var activeItem;
  list.forEach(function(item) {
    if (item.active) {
      activeItem = item;
    }
  });
  var key = activeItem.command;
  if (typeof this.SettingMenuCommands[key] === "undefined") {
    return;
  }
  this.SettingMenuCommands[key](activeItem);
};
_.closeSettingMenu = function() {
  namespace.model.App.route.set("/play")
  var qualityList = namespace.model.Play.settingMenu.qualityList.get();
  qualityList.forEach(function(item) {
    item.active = false;
  });
  namespace.model.Play.settingMenu.visible.set(false);
  _.showPlayInfo();
  var menuList = namespace.model.Play.settingMenu.mainList.get();
  menuList = JSON.parse(JSON.stringify(menuList));
  namespace.model.Play.settingMenu.list.set(menuList);
};

_.SettingMenuCommands = {
  changetimeShiftSize: function(item) {
    var newItemActivated = item;
    _.showPlayInfo();
    namespace.model.Play.settingMenu.visible.set(false);
    var speedList = namespace.model.Play.settingMenu.timeShiftSizeList.get();
    speedList.forEach(function(item) {
      item.active = false;
      item.activated = false;
      if (item.name === newItemActivated.name) {
        item.activated = true;
      }
    });
    namespace.model.Play.timeShiftSize.set(item)
    _.closeSettingMenu() 
  },
  openQualityList: function() {
    var qualityList = namespace.model.Play.settingMenu.qualityList.get();
    qualityList = JSON.parse(JSON.stringify(qualityList));
    qualityList.forEach(function(item) {
      if (item.format_id === "22") {
        item.name = "720p";
      } else if (item.format_id === "43") {
        item.name = "480p";
      } else if (item.format_id === "18") {
        item.name = "360p";
      } else if (item.format_id === "36") {
        item.name = "240p";
      } else if (item.format_id === "17") {
        item.name = "144p";
      } else {
        item.name = "Качество не определено";
      }
    });

    qualityList.forEach(function(item) {
      item.command = "changeQuality";
    });
    qualityList.forEach(function(item) {
      if (item.activated) {
        item.active = true;
      }
    });
    namespace.model.Play.settingMenu.list.set(qualityList);
    namespace.model.Play.settingMenu.qualityList.set(qualityList);
  },
  openVolumeList: function () {
    var volumeList = namespace.model.Play.settingMenu.volumeList.get();
    namespace.model.Play.settingMenu.list.set(volumeList);
  },
  changeVolume: function (item) {
    var vol = +(item.name.split("%")[0])
    try {
      stb.SetVolume(vol);
      namespace.model.Play.volume.set(stb.GetVolume());
    } catch (e) {
      console.log(e)
    }
    namespace.model.App.route.set("/play")
    _.showPlayInfo();
    namespace.model.Play.settingMenu.visible.set(false);
  },
  changeQuality: function(item) {
    try {
      var position = stb.GetPosTimeEx();
      stb.Play(`${item.url}`);
      stb.SetPosTimeEx(position);
    } catch (e) {
      console.log(e);
    }

    _.showPlayInfo();
    namespace.model.Play.settingMenu.visible.set(false);
    var qualityList = namespace.model.Play.settingMenu.qualityList.get();
    qualityList.forEach(function(item) {
      item.active = false;
      item.activated = false;
    });
    item.activated = true;
    _.closeSettingMenu() 
  }
};

export default _;
