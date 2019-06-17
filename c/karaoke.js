/**
 * Karaoke module.
 */
(function() {
  /* KARAOKE */
  function karaoke_constructor() {
    this.layer_name = "karaoke";

    this.row_blocks = ["name"];

    this.load_params = {
      type: "karaoke",
      action: "get_ordered_list"
    };

    this.connectorDevice = new ConnectorDevice();

    this.superclass = ListLayer.prototype;

    this.menu = {};

    this.sort_menu = {};

    this.search_box = {};

    this.previewNotFoundUrl =
      "http://212.77.128.177/stalker_portal/misc/karaokePreview/previewNotFound.png";

    this.load_abc = function() {
      _debug("karaoke.load_abc");

      stb.load(
        {
          type: "karaoke",
          action: "get_abc"
        },
        function(result) {
          _debug("callback abc");

          this.sidebar.fill_items("abc", result);
        },
        this
      );
    };

    this._show = function() {
      _debug("karaoke._show");
      this.set_short_container();
      this.setInfo(
        "Идет загрузка...",
        "Идет загрузка...",
        "Идет загрузка...",
        this.previewNotFoundUrl
      );

      try {
        this.sort_menu.action();

        this.superclass.show.call(this);

        this.load_abc();
      } catch (e) {
        _debug(e);
      }
    };

    this.init_short_info = function() {
      this.info_box = create_block_element("", this.main_container);

      this.short_info_box = create_block_element("tv_timetable", this.info_box);

      if (!stb.IsEmulator) {
        this.short_info_box.addClass("epg_mask");
        this.short_info_box.style.fontSize = "30px";
      }

      this.preview_box = create_block_element("tv_prev_window", this.info_box);
      this.preview_box.style.background = "none";
      this.preview_msg = document.createElement("div");
      this.preview_msg.style.position = "absolute";
      this.preview_msg.style.background =
        "url(" + this.previewNotFoundUrl + ") no-repeat";
      this.preview_msg.style.width = "98%";
      this.preview_msg.style.minHeight = "97%";
      this.preview_msg.style.height = "31%";
      this.preview_msg.style.maxHeight = "97%";
      this.preview_msg.style.backgroundSize = "cover";
      this.preview_msg.style.backgroundpPosition = "center";
      this.preview_box.appendChild(this.preview_msg);
      this.clock_box = create_block_element("tv_clock", this.info_box);
      this.short_info_box.innerHTML = "";
    };

    this.setInfo = function(name, singer, countView, imgSrc) {
      countView = parseInt(countView);
      name = name ? name : "Идет загрузка...";
      singer = singer ? singer : "Нет данных";
      countView = countView ? -countView : "Нет данных";
      imgSrc = imgSrc ? imgSrc : this.previewNotFoundUrl;
      this.short_info_box.innerHTML =
        "Название: " +
        name +
        "<br>" +
        "Исполнитель: " +
        singer +
        "<br>" +
        "Число Просмотров: " +
        countView +
        "<br>";

      this.preview_msg.style.background = "url(" + imgSrc + ") no-repeat";
      this.preview_msg.style.backgroundSize = "cover";
      this.preview_msg.style.backgroundpPosition = "center";
    };

    this.fill_list = function(data) {
      this.superclass.fill_list.call(this, data);
      var item = this.data_items[this.cur_row];
      this.setInfo(item.name, item.singer, item.countView, item.karaokePreview);
    };

    this.hide = function(do_not_reset) {
      _debug("karaoke.hide");

      if (!do_not_reset) {
        this.search_box && this.search_box.reset && this.search_box.reset();
      }

      this.search_box.on && this.search_box.hide && this.search_box.hide();
      this.sort_menu.on && this.sort_menu.hide && this.sort_menu.hide();
      this.menu.on && this.menu.hide && this.menu.hide();

      this.superclass.hide.call(this, do_not_reset);
    };

    this.init_menu = function(map, options) {
      this.menu = new bottom_menu(this, options);
      this.menu.init(map);
      this.menu.need_reset_load_data = false;
      this.menu.bind();
    };

    this.menu_switcher = function() {
      var self = this;
      if (this.menu && this.menu.on) {
        this.menu.hide();
      } else {
        if (this.connectorDevice.status) {
          this.menu.items[3].dom_obj.innerText = "Откл. устройство";
          this.menu.items[3].label = "Откл. устройство";
          this.menu.items[3].cmd = function() {
            self.connectorDevice.disconnect();
          };
        } else {
          this.menu.items[3].dom_obj.innerText = "Подкл. устройство";
          this.menu.items[3].label = "Подкл. устройство";
          this.menu.items[3].cmd = function() {
            self.connectorDevice.connect();
          };
        }
        setTimeout(function() {
          self.menu.show();
        }, 50);
      }
    };

    this.init_sort_menu = function(map, options) {
      this.sort_menu = new bottom_menu(this, options);
      this.sort_menu.init(map);
      this.sort_menu.bind();
    };

    this.sort_menu_switcher = function() {
      if (this.sort_menu && this.sort_menu.on) {
        this.sort_menu.hide();
      } else {
        this.sort_menu.show();
      }
    };

    this.init_search_box = function(options) {
      this.search_box = new search_box(this, options);
      this.search_box.init();
      this.search_box.bind();
    };

    this.search_box_switcher = function() {
      if (this.search_box && this.search_box.on) {
        this.search_box.hide();
      } else {
        this.search_box.show();
      }
    };

    this.bind = function() {
      var self = this;
      this.superclass.bind.apply(this);

      (function() {
        if (single_module.indexOf(this.layer_name) != -1) {
          if (window.self !== window.top) {
            stb.player.stop();
            // minimize
            this.hide();
            parent.postMessage("hide", "*");
          } else if (typeof stbWebWindow != "undefined" && windowId !== 1) {
            stb.player.stop();
            // minimize
            this.hide();
            stbWindowMgr.windowHide(windowId);
          } else if (window.referrer) {
            stb.player.stop();
            window.location = window.referrer;
          }
          return;
        }

        this.hide();
        main_menu.show();
      }
        .bind(key.MENU, this)
        .bind(key.EXIT, this)
        .bind(key.LEFT, this));

      this.play.bind(key.OK, this);

      function shift_row(dir) {
        self.superclass.shift_row.call(self, dir);
        var item = self.data_items[self.cur_row];
        self.setInfo(
          item.name,
          item.singer,
          item.countView,
          item.karaokePreview
        );
      }
      (function() {
        shift_row(+1);
      }.bind(key.DOWN, this));
      (function() {
        shift_row(-1);
      }.bind(key.UP, this));
    };

    this.play = function() {
      _debug("karaoke.play");

      var self = this;
      _debug("cmd", this.data_items[this.cur_row].cmd);
      _debug("indexOf", this.data_items[this.cur_row].cmd.indexOf("://"));

      var id = this.data_items[this.cur_row].id;
      countView(id);

      if (this.data_items[this.cur_row].cmd.indexOf("://") < 0) {
        stb.player.on_create_link = function(result) {
          _debug("karaoke.on_create_link", result);

          if (result.error == "limit") {
            stb.notice.show(word["player_limit_notice"]);
          } else if (result.error == "nothing_to_play") {
            stb.notice.show(word["player_file_missing"]);
          } else if (result.error == "link_fault") {
            stb.notice.show(word["player_server_error"]);
          } else {
            self.hide(true);

            stb.player.prev_layer = self;
            stb.player.need_show_info = 1;
            stb.player.play_now(result.cmd);
          }
        };
      } else {
        this.hide(true);

        stb.player.prev_layer = self;
        stb.player.need_show_info = 1;
      }

      if (self.connectorDevice.status) {
        self.connectorDevice.play();
      }
      stb.player.play(this.data_items[this.cur_row]);
    };
  }

  karaoke_constructor.prototype = new ListLayer();

  var karaoke = new karaoke_constructor();

  karaoke.bind();
  karaoke.init();
  karaoke.init_short_info();

  if (single_module.indexOf("karaoke") == -1) {
    karaoke.init_left_ear(word["ears_back"]);
  }

  karaoke.init_color_buttons([
    { label: "", cmd: function() {} },
    { label: word["karaoke_sort"], cmd: karaoke.sort_menu_switcher },
    { label: word["karaoke_search"], cmd: karaoke.search_box_switcher },
    { label: word["karaoke_sampling"], cmd: karaoke.sidebar_switcher }
  ]);

  karaoke.init_sidebar();

  karaoke.sidebar.init_items("abc", {
    header: word["karaoke_by_letter"],
    width: 26,
    align: "center"
  });

  karaoke.sidebar.bind();

  karaoke.init_menu(
    [
      {
        label: "Караоке Главная",
        cmd: function() {}
      },
      {
        label: "Мои записи",
        cmd: function() {}
      },
      {
        label: "Записи Пользователей",
        cmd: function() {}
      },
      {
        label: "Подкл. устройство",
        cmd: function() {}
      }
    ],
    {
      offset_x: 17,
      color: "red"
    }
  );

  karaoke.init_sort_menu(
    [
      {
        label: word["karaoke_by_performer"],
        cmd: function() {
          this.parent.load_params.sortby = "singer";
        }
      },
      {
        label: word["karaoke_by_title"],
        cmd: function() {
          this.parent.load_params.sortby = "name";
        }
      },
      {
        label: "По просмотрам",
        cmd: function() {
          this.parent.load_params.sortby = "countView";
        }
      }
    ],
    {
      offset_x: 217,
      color: "green"
    }
  );

  karaoke.init_search_box({
    offset_x: 323,
    color: "yellow",
    languages: get_word("search_box_languages")
  });

  karaoke.init_header_path(word["karaoke_title"]);

  karaoke.sidebar.dependency = [karaoke.sort_menu, karaoke.search_box];
  karaoke.sort_menu.dependency = [karaoke.sidebar, karaoke.search_box];
  karaoke.search_box.dependency = [karaoke.sidebar, karaoke.sort_menu];

  karaoke.hide();

  module.karaoke = karaoke;

  /* END KARAOKE */

  /* Integrate karaoke in main menu */

  main_menu.add(
    get_word("karaoke_title"),
    [],
    "mm_ico_karaoke.png",
    function() {
      main_menu.hide();
      module.karaoke._show();
    },
    module.karaoke
  );
})();

function countView(id, cb) {
  var url = "http://212.77.128.177/karakulov/karaoke/viewCount.php";
  var xhr = new XMLHttpRequest();
  var data = {
    karaoke_item_id: Number(id)
  };
  data = JSON.stringify(data);
  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (cb) {
          cb(data);
        }
      }
    }
  };
}

function ConnectorDevice() {
  this.status = false;
  this.monitoringInterval = undefined;
  this.log = [];
}
ConnectorDevice.prototype.connect = function() {
  var self = this;
  self.status = true;
  this.getMediaDeviceLink(stb.mac, then);
  function then(link) {
    if (!link) {
      return;
    }

    if (self.m) {
      self.img._item.src =
        "http://chart.apis.google.com/chart?choe=UTF-8&chld=H&cht=qr&chs=200x200&chl=" +
        link;
      self.p._item.innerHTML =
        "Откройте страницу: " +
        link +
        " в браузере и разрешите доступ к устройству ";
      self.m.show();
      return;
    }
    self.img = new ModalFormItem();
    self.img._item = document.createElement("img");
    self.img._item.src =
      "http://chart.apis.google.com/chart?choe=UTF-8&chld=H&cht=qr&chs=200x200&chl=" +
      link;
    self.img._item.style.display = "block";
    self.img._item.style.margin = "0 auto";
    self.img._item.style.padding = "25px 10px";

    self.p = new ModalFormItem();
    self.p._item = document.createElement("p");
    self.p._item.innerHTML =
      "Откройте страницу: " +
      link +
      " в браузере и разрешите доступ к устройству ";
    self.p._item.style.margin = "0 auto";
    self.p._item.style.padding = "25px 10px";

    self.m = new ModalForm({
      title: "Подключение устройства",
      parent: karaoke
    });
    self.m.enableOnExitClose();
    self.m.addItem(self.img);
    self.m.addItem(self.p);
    self.m.show();
  }
};
ConnectorDevice.prototype.getMediaDeviceLink = function(mac, cb) {
  var url = "http://212.77.128.177/karakulov/karaoke/mediaDeviceLink.php";
  var xhr = new XMLHttpRequest();
  var data = {
    mac: mac
  };
  data = JSON.stringify(data);
  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (cb) {
          cb(data.link);
        }
      }
    }
  };
};
ConnectorDevice.prototype.play = function() {
  this.log.push({
    type: "play",
    time: Date.now(),
    contentId: module.karaoke.data_items[module.karaoke.cur_row].id
  });
  this.monitoringStart();
};
ConnectorDevice.prototype.monitoringStart = function() {
  var self = this;
  stb.player.on_stop = function() {
    self.stop();
  };
};
ConnectorDevice.prototype.stop = function() {
  this.monitoringStop();
  this.log.push({
    type: "stop",
    time: Date.now()
  });
  this.sendPlayLog(then);
  function then() {
    alert("Запись будет доступна в разделе Мои записи");
  }
};
ConnectorDevice.prototype.monitoringStop = function() {
  clearInterval(this.monitoringInterval);
};
ConnectorDevice.prototype.monitoring = function() {};
ConnectorDevice.prototype.sendPlayLog = function(cb) {
  var log = JSON.parse(JSON.stringify(this.log));
  var url = "http://212.77.128.177/karakulov/karaoke/sendPlayLog.php";
  var xhr = new XMLHttpRequest();
  var data = {
    log: log,
    mac: stb.mac
  };
  data = JSON.stringify(data);
  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (cb) {
          cb();
        }
      }
    }
  };
};
ConnectorDevice.prototype.disconnect = function() {
  this.status = false;
};

loader.next();
