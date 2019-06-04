import BaseComponent from "./BaseComponent";

export default class ControlBar extends BaseComponent {
  constructor() {
    super();
    this.instancePlay = this.model.getInstance("Play");
    this.visibleControlBar = this.instancePlay.getValue("visibleControlBar");
    this.visibleControlBar.subscribe(this);
  }
  protected create() {
    var div = document.createElement("div");
    var visibleControlBar = this.visibleControlBar.get();
    if (!visibleControlBar) {
      return div;
    }
    var box = document.createElement("div");
    div.className = "app_Play_ControlBar";
    box.className = "app_Play_ControlBar_box";

    div.appendChild(box);

    var progress_blank_wrap = document.createElement("div");
    var progress_play_wrap = document.createElement("div");
    var playButton_wrap = document.createElement("div");
    var settingButton_wrap = document.createElement("div");
    var volumeBar_wrap = document.createElement("div");
    var nameCurrentVideo_wrap = document.createElement("div");
    var timeBar_wrap = document.createElement("div");
    var playSettingMenu_wrap = document.createElement("div");
    var timeShiftSizeBar_wrap = document.createElement("div");

    box.appendChild(progress_blank_wrap);
    box.appendChild(progress_play_wrap);
    box.appendChild(playButton_wrap);
    box.appendChild(settingButton_wrap);
    box.appendChild(volumeBar_wrap);
    box.appendChild(nameCurrentVideo_wrap);
    box.appendChild(timeBar_wrap);
    box.appendChild(playSettingMenu_wrap);
    box.appendChild(timeShiftSizeBar_wrap);

    let controlBar_progress_blank = new ControlBar_progress_blank();
    let controlBar_progress_play = new ControlBar_progress_play();
    let controlBar_playButton = new ControlBar_playButton();
    let controlBar_settingButton = new ControlBar_settingButton();
    let controlBar_volumeBar = new ControlBar_volumeBar();
    let controlBar_nameCurrentVideo = new ControlBar_nameCurrentVideo();
    let controlBar_timeBar = new ControlBar_timeBar();
    let controlBar_playSettingMenu = new ControlBar_playSettingMenu();
    let controlBar_timeShiftSizeBar = new ControlBar_timeShiftSizeBar();

    controlBar_progress_blank.render(progress_blank_wrap);
    controlBar_progress_play.render(progress_play_wrap);
    controlBar_playButton.render(playButton_wrap);
    controlBar_settingButton.render(settingButton_wrap);
    controlBar_volumeBar.render(volumeBar_wrap);
    controlBar_nameCurrentVideo.render(nameCurrentVideo_wrap);
    controlBar_timeBar.render(timeBar_wrap);
    controlBar_playSettingMenu.render(playSettingMenu_wrap);
    controlBar_timeShiftSizeBar.render(timeShiftSizeBar_wrap)

    return div;
  }
  private instancePlay;
  private visibleControlBar;
}

class ControlBar_progress_blank extends BaseComponent {
  constructor() {
    super();
  }
  protected create() {
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_box_progress_blank";
    return div;
  }
}

class ControlBar_progress_play extends BaseComponent {
  constructor() {
    super();
    this.instancePlay = this.model.getInstance("Play");
    this.progress = this.instancePlay.getValue("progress");
    this.progress.subscribe(this);
  }
  protected create() {
    var progress = this.progress.get();
    progress = progress.play;
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_box_progress_play";
    div.style.width = progress + "%";
    return div;
  }
  private instancePlay;
  private progress;
}

class ControlBar_playButton extends BaseComponent {
  constructor() {
    super();
    this.Play = this.model.getInstance("Play");
    this.status = this.Play.getValue("status");
    this.status.subscribe(this);
  }
  protected create() {
    var status = this.status.get();
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_playButton";
    if (status === "play") {
      div.style.background =
        "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
    } else if (status === "pause") {
      div.style.background =
        "url(./img/baseline_play_circle_outline_white_18dp.png) no-repeat";
    } else {
      div.style.background =
        "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
    }
    return div;
  }
  private status;
  private Play;
}

class ControlBar_settingButton extends BaseComponent {
  constructor() {
    super();
  }
  protected create() {
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_settingButton";
    return div;
  }
}

class ControlBar_volumeBar extends BaseComponent {
  constructor() {
    super();
    this.Play = this.model.getInstance("Play");
    this.volume = this.Play.getValue("volume");
    this.volume.subscribe(this);
  }
  protected create() {
    var volume = this.volume.get();
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_volumeBar";
    var icon = document.createElement("div");
    var line = document.createElement("div");
    var lineBlank = document.createElement("div");
    icon.className = "app_Play_ControlBar_volumeBar_icon";
    if (volume === 0) {
      icon.style.background =
        "url(./img/baseline_volume_off_white_18dp.png) no-repeat";
    } else if (volume < 50) {
      icon.style.background =
        "url(./img/baseline_volume_down_white_18dp.png) no-repeat";
    } else {
      icon.style.background =
        "url(./img/baseline_volume_up_white_18dp.png) no-repeat";
    }
    div.appendChild(icon);
    lineBlank.className = "app_Play_ControlBar_volumeBar_lineBlank";
    div.appendChild(lineBlank);
    line.className = "app_Play_ControlBar_volumeBar_line";
    line.style.width = volume + "%";
    lineBlank.appendChild(line);
    return div;
  }
  private volume;
  private Play;
}

class ControlBar_nameCurrentVideo extends BaseComponent {
  constructor() {
    super();
    this.Play = this.model.getInstance("Play");
    this.name = this.Play.getValue("name");
    this.name.subscribe(this);
  }
  protected create() {
    var name = this.name.get();
    var div = document.createElement("div");
    div.className = "app_Play_ControlBar_nameCurrentVideo";
    var p = document.createElement("p");
    p.innerHTML = name;
    div.appendChild(p);
    return div;
  }
  private name;
  private Play;
}

class ControlBar_timeBar extends BaseComponent {
  constructor() {
    super();
    this.Play = this.model.getInstance("Play");
    this.timeBar = this.Play.getValue("timeBar");
    this.timeBar.subscribe(this);
  }
  protected create() {
    var progress = this.timeBar.get();
    var current = progress.playSec;
    var duration = progress.durationSec;
    var p = document.createElement("p");
    p.className = "app_Play_ControlBar_timeBar";
    p.innerHTML =
      this.secTimeString(current) + "/" + this.secTimeString(duration);
    return p;
  }
  private timeBar;
  private Play;
  private secTimeString(secTime) {
    var sec: any = Math.floor(secTime % 60);
    var min: any = Math.floor(secTime / 60);
    var h: any = Math.floor(min / 60);
    min = Math.floor(min % 60);
    var hCopy = h;
    h = String(h);
    sec = String(sec);
    min = String(min);
    if (sec.length === 1) {
      sec = "0" + sec;
    }
    if (min.length === 1) {
      min = "0" + min;
    }
    var timeString = min + ":" + sec;
    if (hCopy >= 1) {
      timeString = h + ":" + timeString;
    }
    return timeString;
  }
}

class ControlBar_playSettingMenu extends BaseComponent {
  constructor() {
    super();
    this.Play = this.model.getInstance("Play");
    this.settingMenu = this.Play.getInstance("settingMenu");
    this.settingMenuVisible = this.settingMenu.getValue("visible");
    this.settingMenuList = this.settingMenu.getValue("list");
    this.settingMenuList.subscribe(this);
    this.settingMenuVisible.subscribe(this);
  }
  protected create() {
    var div = document.createElement("div");
    var visible = this.settingMenuVisible.get();
    if (!visible) {
      return div;
    }
    div.className = "app_Play_ControlBar_playSettingMenu";
    var list = this.settingMenuList.get();
    list.forEach(item => {
      var itemElem = this.createItemList(item);
      div.appendChild(itemElem);
    });
    return div;
  }
  private createItemList(item) {
    var p = document.createElement("p");
    p.innerHTML = item.name;
    if (item.active) {
      p.className = "app_Play_ControlBar_playSettingMenu_item active";
    } else {
      p.className = "app_Play_ControlBar_playSettingMenu_item";
    }
    return p;
  }
  private settingMenu;
  private settingMenuVisible;
  private settingMenuList;
  private Play;
}

class ControlBar_timeShiftSizeBar extends BaseComponent {
  constructor () {
    super()
    this.Play = this.model.getInstance("Play");
    this.timeShiftSize = this.Play.getValue("timeShiftSize")
    this.timeShiftSize.subscribe(this)
  }
  protected create() {
    var timeShiftSize = this.timeShiftSize.get()
    var div = document.createElement("div");
    div.className = 'app_Play_ControlBar_timeShiftSizeBar'
    var p = document.createElement("p")
    div.appendChild(p)
    p.innerHTML = timeShiftSize.name
    var twotone_arrow_drop_down_white_24dp = document.createElement("span")
    var twotone_arrow_drop_up_white_24dp = document.createElement("span")
    twotone_arrow_drop_down_white_24dp.className = "twotone_arrow_drop_down_white_24dp"
    twotone_arrow_drop_up_white_24dp.className = "twotone_arrow_drop_up_white_24dp"
    div.appendChild(twotone_arrow_drop_down_white_24dp)
    div.appendChild(twotone_arrow_drop_up_white_24dp)
    return div;
  }
  private timeShiftSize;
  private Play;
}
