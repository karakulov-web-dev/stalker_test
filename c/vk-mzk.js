try {
  /**
   * Internet_connection_check - Класс для проверки интернет соединения
   *
   * Использование:
   * var internet_connection_check = new Internet_connection_check();
   *
   * internet_connection_check.check();
   * internet_connection_check.successfully = function () {
   *   console.log('интернет есть')
   * };
   * internet_connection_check.fail = function () {
   *   console.log('интернета нет')
   * };
   *
   */
  function Internet_connection_check() {
    this.check = function() {
      var self = this;
      setTimeout(function() {
        self.checkInternet();
      }, 1);
    };

    this.checkInternet = function() {
      var self = this;
      setTimeout(function() {
        self._failed();
      }, 7000);
      var url = "http://stb-check-internet.rikt.ru/check_internet/test.txt";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
      xmlhttp.onreadystatechange = function() {
        self.internetStatus = xmlhttp.status;
        if (xmlhttp.readyState === 4) {
          self.internetStatus = xmlhttp.status;
          if (self.internetStatus == 200) {
            self.successfully();
            self._clear();
          } else {
            self.fail();
            self._clear();
          }
        }
      };
    };
    this.successfully = function successfully() {};
    this.fail = function fail() {};
    this.internetStatus = 0;
    this._clear = function _clear() {
      clearTimeout(this._timeout);
      this.successfully = function() {};
      this.fail = function() {};
      this.internetStatus = 0;
    };
    this._failed = function() {
      this.fail();
      this._clear();
    };
    this._timeout = undefined;
  }
  var internet_connection_check = new Internet_connection_check();

  /**
   * Метод repeat() конструирует и возвращает новую строку, содержащую указанное количество соединённых вместе копий строки, на которой он был вызван.
   * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
   */

  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      "use strict";
      if (this == null) {
        throw new TypeError("can't convert " + this + " to object");
      }
      var str = "" + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError("repeat count must be non-negative");
      }
      if (count == Infinity) {
        throw new RangeError("repeat count must be less than infinity");
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return "";
      }
      // Обеспечение того, что count является 31-битным целым числом, позволяет нам значительно
      // соптимизировать главную часть функции. Впрочем, большинство современных (на август
      // 2014 года) браузеров не обрабатывают строки, длиннее 1 << 28 символов, так что:
      if (str.length * count >= 1 << 28) {
        throw new RangeError(
          "repeat count must not overflow maximum string size"
        );
      }
      var rpt = "";
      for (var i = 0; i < count; i++) {
        rpt += str;
      }
      return rpt;
    };
  }

  /**
   * Полифил для метода заполнения для строк padStart()
   * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   */
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
      padString = String(padString || " ");
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }

  (function() {
    /// main
    var mzk_constructor = getMzk_constructor();
    var mzk = new mzk_constructor();
    mzk.init();
    mzk.bind();
    mzk.init_header_path("Типичный Междуреченск");
    mzk.hide();
    module.mzk = mzk;
    if (!module.my_city_sub) {
      module.my_city_sub = [];
    }
    module.my_city_sub.push({
      title: "[TM] 18+",
      cmd: function() {
        main_menu.hide();
        module.mzk.show(false);
      }
    });

    /// AllHttp
    var HTTP = HttpReqModule();

    /// model
    var createValue = CreateValue();
    var state = {
      route: createValue("/loading"),
      bottomButton: createValue([
        "Читать",
        "Открыть",
        "Комментарии",
        "Озвучить"
      ]),
      wall: {
        postList: createValue([]),
        focusIndex: createValue(0),
        attachmentsFocus: createValue(0),
        scrollTop: createValue(0),
        attachmentsScroll: createValue(0)
      },
      commentsList: {
        list: createValue([]),
        focusIndex: createValue(0),
        attachmentsFocus: createValue(0),
        scrollTop: createValue(0),
        users: createValue({})
      },
      textView: {
        text: createValue(""),
        scrollTop: createValue(0)
      },
      imgView: {
        img: createValue([]),
        currentIndexView: createValue(0),
        overlayVisible: createValue(true),
        timerHideOverlay: createValue(undefined)
      }
    };
    window["state"] = state;

    /// controller
    function TextViewController(targetSelector) {
      this.targetSelector = targetSelector;
    }
    TextViewController.prototype.keydown = function(event) {
      switch (event.keyCode) {
        case 8:
          this.back(event);
          break;
        case 27:
          this.back(event);
          break;
        case 112:
          this.back(event);
          break;
        case 83:
          stb.Stop();
          break;
        case 115:
          new PostController().speech();
          break;
        case 109:
          new PostController().volumePlus();
          break;
        case 107:
          new PostController().volumeMinus();
          break;
        case 38:
          this.scrollTop();
          break;
        case 40:
          this.scrollBottom();
          break;
      }
    };
    TextViewController.prototype.back = function(event) {
      state.bottomButton.set(["Читать", "Открыть", "Комментарии", "Озвучить"]);
      state.route.set("/postList");
      module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
        /\/.*/,
        "/ "
      );
      event.stopPropagation();
    };
    TextViewController.prototype.scrollBottom = function() {
      var elem = document.querySelector(this.targetSelector);
      elem.scrollTop = elem.scrollTop + 10;
      state.textView.scrollTop.set(elem.scrollTop);
    };
    TextViewController.prototype.scrollTop = function() {
      var elem = document.querySelector(this.targetSelector);
      elem.scrollTop = elem.scrollTop - 10;
      state.textView.scrollTop.set(elem.scrollTop);
    };

    function ErrorInternetPageController() {}
    ErrorInternetPageController.prototype.keydown = function(event) {
      switch (event.keyCode) {
        case 8:
          mzk.hide();
          main_menu.show();
          break;
        case 112:
          mzk.hide();
          main_menu.show();
          break;
      }
    };

    function ImgViewController() {}
    ImgViewController.prototype.keydown = function(event) {
      switch (event.keyCode) {
        case 8:
          this.back(event);
          break;
        case 27:
          this.back(event);
          break;
        case 112:
          this.back(event);
          break;
        case 39:
          this.next();
          break;
        case 37:
          this.previus();
          break;
      }
    };
    ImgViewController.prototype.back = function(event) {
      state.bottomButton.set(["Читать", "Открыть", "Комментарии", "Озвучить"]);
      state.route.set("/postList");
      module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
        /\/.*/,
        "/ "
      );
      event.stopPropagation();
    };
    ImgViewController.prototype.hideOverlay = function hideOverlay() {
      state.imgView.overlayVisible.set(true);
      clearTimeout(state.imgView.timerHideOverlay.get());
      var timerHideOverlay = setTimeout(function() {
        state.imgView.overlayVisible.set(false);
      }, 2000);
      state.imgView.timerHideOverlay.set(timerHideOverlay);
    };
    ImgViewController.prototype.next = function() {
      this.hideOverlay();
      var index = state.imgView.currentIndexView.get();
      var list = state.imgView.img.get();
      if (typeof list[index + 1] !== "undefined") {
        state.imgView.currentIndexView.set(index + 1);
      } else {
        this.nextAttachPhoto();
      }
    };
    ImgViewController.prototype.previus = function() {
      this.hideOverlay();
      var index = state.imgView.currentIndexView.get();
      var list = state.imgView.img.get();
      if (typeof list[index - 1] !== "undefined") {
        state.imgView.currentIndexView.set(index - 1);
      } else {
        this.previusAttachPhoto();
      }
    };
    ImgViewController.prototype.nextAttachPhoto = function() {
      this.hideOverlay();
      var focusIndex = state.wall.focusIndex.get();
      var listItem = state.wall.postList.get();
      var attachmentFocus = state.wall.attachmentsFocus.get();
      var activeItem = listItem[focusIndex];
      if (typeof activeItem.attachments[attachmentFocus + 1] !== "undefined") {
        if (activeItem.attachments[attachmentFocus + 1].type === "photo") {
          state.wall.attachmentsFocus.set(attachmentFocus + 1);
          var controller = new PostController(null);
          controller.openImgView([
            activeItem.attachments[attachmentFocus + 1].photo.photo_604
          ]);
        }
      }
    };
    ImgViewController.prototype.previusAttachPhoto = function() {
      this.hideOverlay();
      var focusIndex = state.wall.focusIndex.get();
      var listItem = state.wall.postList.get();
      var attachmentFocus = state.wall.attachmentsFocus.get();
      var activeItem = listItem[focusIndex];
      if (typeof activeItem.attachments[attachmentFocus - 1] !== "undefined") {
        if (activeItem.attachments[attachmentFocus - 1].type === "photo") {
          state.wall.attachmentsFocus.set(attachmentFocus - 1);
          var controller = new PostController(null);
          controller.openImgView([
            activeItem.attachments[attachmentFocus - 1].photo.photo_604
          ]);
        }
      }
    };

    function CommentsListController(targetSelector) {
      this.targetSelector = targetSelector;
    }
    CommentsListController.prototype.keydown = function(event) {
      switch (event.keyCode) {
        case 8:
          this.back(event);
          break;
        case 27:
          this.back(event);
          break;
        case 112:
          this.back(event);
          break;
        case 38:
          this.scrollTop();
          break;
        case 40:
          this.scrollBottom();
          break;
      }
    };
    CommentsListController.prototype.scrollBottom = function() {
      var self = this;
      var elem = document.querySelector(this.targetSelector);
      elem.scrollTop = elem.scrollTop + 10;
      state.commentsList.scrollTop.set(elem.scrollTop);
      setTimeout(function() {
        self.debounceHideInvisibleContent();
      }, 0);
    };
    CommentsListController.prototype.scrollTop = function() {
      var self = this;
      var elem = document.querySelector(this.targetSelector);
      elem.scrollTop = elem.scrollTop - 10;
      state.commentsList.scrollTop.set(elem.scrollTop);
      setTimeout(function() {
        self.debounceHideInvisibleContent();
      }, 0);
    };

    CommentsListController.prototype.debounceHideInvisibleContent = function debounceHideInvisibleContent() {
      var self = this;
      var dn = Date.now();
      var lastCallTime =
        typeof debounceHideInvisibleContent.lastCallTime !== "undefined"
          ? debounceHideInvisibleContent.lastCallTime
          : 0;
      if (lastCallTime + 100 < dn) {
        debounceHideInvisibleContent.lastCallTime = dn;
        self.hideInvisibleContent();
      }
    };

    CommentsListController.prototype.hideInvisibleContent = function hideInvisibleContent() {
      var self = this;

      var wrap = document.querySelector(".vk_mzk_CommentsList");
      [].slice
        .call(
          document.querySelectorAll(
            ".vk_mzk_CommentsList > div > div > .vk_mzk_comment"
          )
        )
        .forEach(function(elem) {
          if (typeof elem._innerHTML === "undefined") {
            elem._innerHTML = elem.innerHTML;
          }
          if (self.isCommentElemInVisibleZone(wrap, elem)) {
            elem.innerHTML !== elem._innerHTML
              ? (elem.innerHTML = elem._innerHTML)
              : elem.innerHTML;
          } else {
            elem.innerHTML !== "" ? (elem.innerHTML = "") : "";
          }
        });
    };

    CommentsListController.prototype.isCommentElemInVisibleZone = function(
      wrap,
      elem
    ) {
      var status = true;
      if (
        elem.offsetTop > wrap.scrollTop + 5000 ||
        elem.offsetTop < wrap.scrollTop - 5000
      ) {
        status = false;
      }
      return status;
    };
    CommentsListController.prototype.back = function(event) {
      state.bottomButton.set(["Читать", "Открыть", "Комментарии", "Озвучить"]);
      state.route.set("/postList");
      module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
        /\/.*/,
        "/ "
      );
      event.stopPropagation();
    };

    function PostController(postList) {
      this.postList = postList;
    }
    PostController.prototype.keydown = function(event) {
      switch (event.keyCode) {
        case 119:
          location = location;
          break;
        case 40:
          this.next();
          break;
        case 38:
          this.prev();
          break;
        case 39:
          this.attachmentNextFocus();
          break;
        case 37:
          this.attachmentPrevFocus();
          break;
        case 112:
          this.openTextView();
          break;
        case 13:
          this.openAttach();
          break;
        case 113:
          this.openAttach();
          break;
        case 114:
          try {
            this.openComments();
          } catch (e) {
            console.log(e);
          }
          break;
        case 115:
          try {
            this.speech();
          } catch (e) {
            console.log(e);
          }
          break;
        case 83:
          stb.Stop();
          break;
        case 109:
          this.volumeMinus();
          break;
        case 107:
          this.volumePlus();
          break;
      }
    };

    PostController.prototype.openComments = function() {
      state.commentsList.list.set(undefined);
      state.route.set("/commentsList");
      module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
        /\/.*/,
        "/ Комментарии"
      );
      state.bottomButton.set(["Назад", "", "", ""]);
      state.commentsList.attachmentsFocus.set(0);
      state.commentsList.focusIndex.set(0);
      state.commentsList.scrollTop.set(0);
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      HTTP.wallGetComments(list[index].owner_id, list[index].id, then);
      function then(result) {
        state.commentsList.users.set(result.response.users);
        state.commentsList.list.set(result.response.items);
        setTimeout(function() {
          new CommentsListController().debounceHideInvisibleContent();
        }, 100);
      }
    };

    PostController.prototype.openTextView = function() {
      state.route.set("/textView");
      module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
        /\/.*/,
        "/ Запись"
      );
      state.bottomButton.set(["Назад", "", "", "Озвучить"]);
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      state.textView.text.set(list[index].text);
    };

    PostController.prototype.openAttach = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      if (typeof list[index].attachments === "undefined") {
        return false;
      }
      if (
        typeof list[index].attachments[state.wall.attachmentsFocus.get()] ===
        "undefined"
      ) {
        return false;
      }
      var focusAttach =
        list[index].attachments[state.wall.attachmentsFocus.get()];

      switch (focusAttach.type) {
        case "photo":
          this.openImgView([focusAttach.photo.photo_604]);
          break;
        case "video":
          this.openVideo(focusAttach);
          break;
        case "doc":
          this.openDoc(focusAttach);
          break;
        case "album":
          this.openAlbum(focusAttach);
          break;
      }
    };

    PostController.prototype.openAlbum = function(focusAttach) {
      var self = this;
      HTTP.photosGet(focusAttach.album.owner_id, focusAttach.album.id, then);
      function then(result) {
        var imgArr = result.response.items.map(function(item) {
          return item.sizes[item.sizes.length - 1].url;
        });
        self.openImgView(imgArr);
      }
    };

    PostController.prototype.openDoc = function(focusAttach) {
      if (focusAttach.doc.type === 3) {
        this.openGif(focusAttach.doc);
      }
    };

    PostController.prototype.openGif = function(gif) {
      var self = this;
      self.play(gif.preview.video.src, "gif");
    };

    PostController.prototype.speech = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      var focusItem = list[index];
      if (!focusItem.text) {
        return false;
      }
      HTTP.speechGet(focusItem.text, then);
      function then(result) {
        stb.Play(result.url);
      }
    };

    PostController.prototype.openVideo = function(focusAttach) {
      state.route.set("/loading");
      var self = this;
      HTTP.videoGet(focusAttach.video.owner_id, focusAttach.video.id, function(
        result
      ) {
        self.play(result.url, focusAttach.video.title);
      });
    };

    PostController.prototype.play = function(url, title) {
      var item = {
        name: title,
        cmd: url
      };
      stb.set_cur_place("demo");
      module.mzk.hide();
      stb.player.prev_layer = module.mzk;
      stb.player.play(item);
    };

    PostController.prototype.volumePlus = function() {
      try {
        var vol = stb.GetVolume();
        vol = vol + 10;
        if (vol > 100) {
          vol = 100;
        }
        stb.SetVolume(vol);
      } catch (e) {
        console.log(e);
      }
    };
    PostController.prototype.volumeMinus = function() {
      try {
        var vol = stb.GetVolume();
        if (vol <= 10) {
          vol = 0;
        } else {
          vol = vol - 10;
        }
        stb.SetVolume(vol);
      } catch (e) {
        console.log(e);
      }
    };

    PostController.prototype.openImgView = function(imgSrcArr) {
      var imgController = new ImgViewController();
      imgController.hideOverlay();
      state.bottomButton.set(["Назад", "", "", ""]);
      state.imgView.img.set(imgSrcArr);
      state.imgView.currentIndexView.set(0);
      state.route.set("/imgView");
    };

    PostController.prototype.next = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      if (typeof list[index + 1] === "undefined") {
        return;
      }
      state.wall.attachmentsFocus.value = 0;
      state.wall.focusIndex.set(index + 1);
      state.wall.scrollTop.set((100 / list.length) * index + 1);
    };
    PostController.prototype.prev = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      if (typeof list[index - 1] === "undefined") {
        return;
      }
      state.wall.attachmentsFocus.value = 0;
      state.wall.focusIndex.set(index - 1);
      state.wall.scrollTop.set((100 / list.length) * index - 1);
    };

    PostController.prototype.attachmentNextFocus = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      if (typeof list[index] === "undefined") {
        return;
      }
      var attachmentsFocus = state.wall.attachmentsFocus.get();
      if (
        typeof list[index].attachments[attachmentsFocus + 1] === "undefined"
      ) {
        return;
      }
      state.wall.attachmentsFocus.set(attachmentsFocus + 1);
      var elem = document.querySelector(".vk_mzk_post_" + list[index].id);
      document.querySelector(".vk_mzk_PostList").scrollTop = elem.offsetTop;
      state.wall.scrollTop.set(elem.offsetTop);
      attachmentScrollNarmilize(list[index].id);
    };

    PostController.prototype.attachmentPrevFocus = function() {
      var index = state.wall.focusIndex.get();
      var list = state.wall.postList.get();
      if (typeof list[index] === "undefined") {
        return;
      }
      var attachmentsFocus = state.wall.attachmentsFocus.get();
      if (
        typeof list[index].attachments[attachmentsFocus - 1] === "undefined"
      ) {
        return;
      }
      state.wall.attachmentsFocus.set(attachmentsFocus - 1);
      var elem = document.querySelector(".vk_mzk_post_" + list[index].id);
      document.querySelector(".vk_mzk_PostList").scrollTop = elem.offsetTop;
      state.wall.scrollTop.set(elem.offsetTop);
      attachmentScrollNarmilize(list[index].id);
    };

    function attachmentScrollNarmilize(itemId) {
      var wrap = document.querySelector(".post_attachments_id_" + itemId);
      var item = document.querySelector(".post_attachments_focusItem");
      wrap.scrollLeft = item.offsetLeft;
    }

    PostController.prototype.attachmentFocus = function() {
      state.wall.attachmentsFocus.set(0);
    };

    /// view
    var baseComponent = BaseComponent();

    var bottomButton = function(b1, b2, b3, b4) {
      var fontSize = "22px";
      if (screen.width < 1000) {
        fontSize = "16px";
      }
      function btn_s() {
        if (screen.width < 1000) {
          return {
            position: "relative",
            left: "-5px"
          };
        }
        return {};
      }
      function S() {
        return {
          fontSize: fontSize,
          margin: "3px 0 0 36px"
        };
      }
      return createElement("div", "color_button_bar", undefined, [
        createElement("table", undefined, undefined, [
          createElement("tr", undefined, undefined, [
            createElement("td", undefined, undefined, [
              createElement("div", "btn_red", btn_s(), [
                createElement("span", undefined, S(), undefined, b1)
              ])
            ]),
            createElement("td", undefined, undefined, [
              createElement("div", "separator"),
              createElement("div", "btn_green", btn_s(), [
                createElement("span", undefined, S(), undefined, b2)
              ])
            ]),
            createElement("td", undefined, undefined, [
              createElement("div", "separator"),
              createElement("div", "btn_yellow", btn_s(), [
                createElement("span", undefined, S(), undefined, b3)
              ])
            ]),
            createElement("td", undefined, undefined, [
              createElement("div", "separator"),
              createElement("div", "btn_blue", btn_s(), [
                createElement("span", undefined, S(), undefined, b4)
              ])
            ])
          ])
        ])
      ]);
    };

    var MzkMainContainer = function() {
      this.create = function create() {
        this.subscribe(state.route);
        this.subscribe(state.bottomButton);
        var bottomButtons = state.bottomButton.get();
        var div = document.createElement("div");
        switch (state.route.get()) {
          case "/postList":
            (function() {
              var postListWrap = createElement("div");
              var verticalScrollWrap = createElement("div");
              div.appendChild(postListWrap);
              div.appendChild(verticalScrollWrap);
              var postList = new PostList();
              try {
                var verticalScroll = new VerticalScrollSimple(
                  state.wall.scrollTop
                );
                postList.render(postListWrap);
                verticalScroll.render(verticalScrollWrap);
              } catch (e) {
                console.log(e);
              }
            })();
            break;
          case "/textView":
            (function() {
              var textViewWrap = document.createElement("div");
              var verticalScrollWrap = createElement("div");
              div.appendChild(textViewWrap);
              div.appendChild(verticalScrollWrap);
              var textView = new TextView();
              var verticalScroll = new VerticalScroll(
                state.textView.scrollTop,
                ".vk-mz-TextView"
              );
              textView.render(textViewWrap);
              verticalScroll.render(verticalScrollWrap);
            })();
            break;
          case "/imgView":
            (function() {
              var imgViewWrap = document.createElement("div");
              div.appendChild(imgViewWrap);
              var imgView = new ImgView();
              imgView.render(imgViewWrap);
            })();
            break;
          case "/commentsList":
            (function() {
              var commentsListWrap = document.createElement("div");
              var verticalScrollWrap = createElement("div");
              div.appendChild(commentsListWrap);
              div.appendChild(verticalScrollWrap);
              var commentsList = new CommentsList();
              var verticalScroll = new VerticalScroll(
                state.commentsList.scrollTop,
                ".vk_mzk_CommentsList"
              );
              commentsList.render(commentsListWrap);
              verticalScroll.render(verticalScrollWrap);
            })();
            break;
          case "/loading":
            (function() {
              var imgLoadingWhell = createElement("img", undefined, {
                position: "absolute",
                top: "40%",
                left: "47%",
                width: "6%"
              });
              imgLoadingWhell.src = "template/default/i_720/loading.gif";
              var blankWrap = createElement(
                "div",
                undefined,
                {
                  background: "black",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  right: "0px",
                  bottom: "0px",
                  zIndex: "2"
                },
                [imgLoadingWhell]
              );
              div.appendChild(blankWrap);
            })();
            break;
          case "/errorInternet":
            (function() {
              var errorInternetWrap = createElement("div");
              new ErrorInternet().render(errorInternetWrap);
              div.appendChild(errorInternetWrap);

              errorInternetWrap.tabIndex = 0;
              setTimeout(function() {
                errorInternetWrap.focus();
              }, 0);
              var errorInternetPageController = new ErrorInternetPageController();
              div.onkeydown = function(event) {
                errorInternetPageController.keydown(event);
              };
            })();
            break;
        }
        var bottomButtonWrap = createElement("div", undefined, undefined, [
          bottomButton(
            bottomButtons[0],
            bottomButtons[1],
            bottomButtons[2],
            bottomButtons[3]
          )
        ]);
        div.appendChild(bottomButtonWrap);
        return div;
      };
    };
    MzkMainContainer.prototype = baseComponent;

    var ErrorInternet = function() {
      this.create = function() {
        var div = createElement("div", undefined, {
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          zIndex: "101"
        });
        var html =
          '<div class="cut_off" style="display: block; ">' +
          '<div class="cut_off_text">' +
          "Для работы приложения необходимо интернет соединение." +
          "<br>" +
          "Для подключения обратитесь к оператору" +
          "<br>" +
          "по тел. 65-000." +
          "</div>" +
          '<div class="blocking_buttons"><div class="blocking_account_reboot"><div class="color_btn red"></div>' +
          " Назад" +
          "</div></div></div>";
        div.innerHTML = html;
        return div;
      };
    };
    ErrorInternet.prototype = baseComponent;

    var ImgView = function() {
      this.create = function create() {
        this.subscribe(state.imgView.img);
        this.subscribe(state.imgView.currentIndexView);
        this.subscribe(state.imgView.overlayVisible);
        var overlayVisible = state.imgView.overlayVisible.get();
        var img = createElement("img", undefined, {
          height: "720px",
          margin: "0 auto",
          display: "block"
        });
        img.src = state.imgView.img.get()[state.imgView.currentIndexView.get()];
        var arrowRigth = createElement("img", undefined, {
          position: "absolute",
          top: "45%",
          right: "25px"
        });
        arrowRigth.src =
          "template/default/i_720/icons8-chevron-right-filled-80.png";
        var arrowLeft = createElement("img", undefined, {
          position: "absolute",
          top: "45%",
          left: "25px"
        });
        arrowLeft.src = "template/default/i_720/icons8-chevron-left-80.png";
        var imgList = state.imgView.img.get();
        var currentInd = state.imgView.currentIndexView.get();
        var attachments = state.wall.postList.get()[state.wall.focusIndex.get()]
          .attachments;
        var attachmentFocus = state.wall.attachmentsFocus.get();
        var nextFotoStatus = true;
        var previusPhotoStatus = true;
        if (
          typeof imgList[currentInd + 1] === "undefined" &&
          typeof attachments[attachmentFocus + 1] === "undefined"
        ) {
          nextFotoStatus = false;
        }
        if (
          typeof imgList[currentInd - 1] === "undefined" &&
          typeof attachments[attachmentFocus - 1] === "undefined"
        ) {
          previusPhotoStatus = false;
        }
        var listElems = [img];
        if (nextFotoStatus && overlayVisible) {
          listElems.push(arrowRigth);
        }
        if (previusPhotoStatus && overlayVisible) {
          listElems.push(arrowLeft);
        }
        var div = createElement(
          "div",
          "vk-mz-TextView",
          {
            margin: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            position: "absolute",
            left: "0px",
            padding: "0px",
            background: "black",
            zIndex: "1"
          },
          listElems
        );
        div.tabIndex = 0;
        setTimeout(function() {
          div.focus();
        }, 0);
        var imgViewController = new ImgViewController();
        div.onkeydown = function(event) {
          imgViewController.keydown(event);
        };
        return div;
      };
    };
    ImgView.prototype = baseComponent;

    var TextView = function() {
      this.create = function create() {
        this.subscribe(state.textView.text);
        var classNameDiv = "vk-mz-TextView";
        var textView = state.textView.text.get();
        var fontSize = "38px";
        var height = "440px";
        var heightWrap = "440px";
        if (screen.width < 1000) {
          fontSize = "18px";
          height = "350px";
          heightWrap = "300px";
        }
        var div = createElement(
          "div",
          classNameDiv,
          {
            height: height,
            position: "relative",
            minHeight: "130px",
            fontSize: fontSize,
            color: "rgb(255, 255, 255)",
            overflowY: "scroll",
            paddingRight: "50px",
            left: "50px",
            marginRight: "-100px",
            paddingRight: "100px"
          },
          undefined,
          replaceEmojis(textView)
        );
        var wrap = createElement(
          "div",
          undefined,
          {
            top: "80px",
            height: heightWrap,
            position: "relative",
            minHeight: "130px",
            background: "url(template/default/i_720/25alfa_20.png)",
            fontSize: fontSize,
            color: "rgb(255, 255, 255)",
            left: "20px",
            border: "2px solid",
            margin: "25px 70px 25px 30px",
            padding: "50px 50px 50px 0px"
          },
          [div]
        );
        div.tabIndex = 0;
        setTimeout(function() {
          div.focus();
        }, 0);
        var textViewController = new TextViewController("." + classNameDiv);
        div.onkeydown = function(event) {
          textViewController.keydown(event);
        };
        return wrap;
      };
    };
    TextView.prototype = baseComponent;

    var CommentsList = function() {
      this.create = function create() {
        this.subscribe(state.commentsList.list);
        this.subscribe(state.commentsList.focusIndex);
        this.subscribe(state.commentsList.attachmentsFocus);

        var list = state.commentsList.list.get();

        var emptyText;

        if (typeof list === "undefined") {
          emptyText = "Идет загрузка";
          list = [];
        } else {
          emptyText = "Нет комментариев";
        }

        list = list.map(function(item) {
          var wrap = createElement("div");
          var comment = new CommentsList_comment(item);
          comment.render(wrap);
          return wrap;
        });

        if (list.length === 0) {
          list = [
            createElement(
              "p",
              undefined,
              {
                fontSize: "25px",
                color: "#fff",
                position: "relative",
                top: "50px",
                left: "50px"
              },
              undefined,
              emptyText
            )
          ];
        }

        var height;
        var left;

        if (screen.width >= 1000 && stb.mac.substring(0, 8) == "10:27:BE") {
          left = "40px";
          height = "560px";
        } else if (screen.width >= 1000) {
          left = "20px";
          height = "560px";
        } else if (
          screen.width < 1000 &&
          stb.mac.substring(0, 8) == "10:27:BE"
        ) {
          height = "460px";
          left = "25px";
        } else if (screen.width < 1000) {
          height = "460px";
          left = "25px";
        }
        var style = {
          overflowY: "scroll",
          overflowX: "hidden",
          margin: "20px",
          top: "70px",
          height: height,
          position: "relative",
          left: left
        };
        var ul = createElement("ul", "vk_mzk_CommentsList", style, list);
        ul.tabIndex = 0;
        setTimeout(function() {
          ul.focus();
          window.scrollTo(0, 0);
          ul.scrollTop = state.commentsList.scrollTop.get();
        }, 0);
        var commentsListController = new CommentsListController(
          "." + "vk_mzk_CommentsList"
        );
        ul.onkeydown = function(event) {
          commentsListController.keydown(event);
        };
        return ul;
      };
    };
    CommentsList.prototype = baseComponent;

    var CommentsList_comment = function CommentsList_comment(item, style) {
      if (!style) {
        style = {};
      }
      this.create = function create() {
        var childsList = [
          post_date(item),
          CommentsList_comment_User_name(item),
          CommentsList_comment_User_photo(item),
          createElement(
            "div",
            undefined,
            { marginLeft: "220px" },
            undefined,
            replaceEmojis(item.text || "")
          ),
          CommentsList_comment_thread(item)
        ];
        var fontSize = "22px";
        var left = "10px";
        var padding = "10px";
        var marginRight = "20px";
        if (screen.width < 1000) {
          fontSize = "18px";
          left = "-30px";
          padding = "20px";
          marginRight = "0px";
        }

        var elem = createElement(
          "div",
          "vk_mzk_comment vk_mzk_post_" + item.id,
          {
            padding: padding,
            margin: "20px",
            marginRight: marginRight,
            minHeight: "260px",
            background: "url(template/default/i_720/25alfa_20.png)",
            fontSize: fontSize,
            color: "#fff",
            position: "relative",
            left: left
          },
          childsList,
          undefined
        );
        addStyle(elem, style);
        return elem;
      };
    };
    CommentsList_comment.prototype = baseComponent;

    var CommentsList_comment_User_name = function User_name(item) {
      var user = state.commentsList.users.get()[item.from_id];
      if (typeof user === "undefined") {
        return createElement("div");
      }
      var fullName = user.first_name + " " + user.last_name;
      return createElement("div", undefined, undefined, undefined, fullName);
    };

    var CommentsList_comment_User_photo = function User_name(item) {
      var user = state.commentsList.users.get()[item.from_id];
      if (typeof user === "undefined") {
        return createElement("div");
      }
      var imgWidth = "200px";
      if (screen.width < 1000) {
        imgWidth = "150px";
      }
      var img = createElement("img", undefined, {
        position: "absolute",
        width: imgWidth
      });
      if (!user.photo_200) {
        return createElement("div");
      }
      img.src = user.photo_200;
      return img;
    };

    var CommentsList_comment_thread = function CommentsList_comment_thread(
      item
    ) {
      if (!item.thread) {
        item.thread = {
          items: []
        };
      }
      try {
        var listElem = item.thread.items.map(function(item) {
          var wrap = createElement("div");
          var s = {};
          if (screen.width < 1000) {
            s = {
              left: "-90px",
              width: "110%"
            };
          }
          var comment = new CommentsList_comment(item, s);
          comment.render(wrap);
          return wrap;
        });
      } catch (e) {
        console.log(e);
      }
      var marginLeft = "185px";
      if (screen.width < 1000) {
        marginLeft = "250px";
      }
      return createElement(
        "div",
        undefined,
        {
          marginLeft: marginLeft
        },
        listElem
      );
    };

    var PostList = function() {
      this.create = function create() {
        this.subscribe(state.wall.postList);
        this.subscribe(state.wall.focusIndex);
        this.subscribe(state.wall.attachmentsFocus);
        var i = 0;
        var list = state.wall.postList.get().map(function(item) {
          if (state.wall.focusIndex.get() === i) {
            item = JSON.parse(JSON.stringify(item));
            item.focus = true;
            if (
              typeof item.attachments !== "undefined" &&
              typeof item.attachments[state.wall.attachmentsFocus.get()] !==
                "undefined"
            ) {
              item.attachments[state.wall.attachmentsFocus.get()].focus = true;
            }
          }
          var wrap = document.createElement("div");
          if (i > state.wall.focusIndex.get() + 1) {
            i++;
            return wrap;
          }
          if (i < state.wall.focusIndex.get()) {
            i++;
            return wrap;
          }
          var post = new Post(item);
          post.render(wrap);
          i++;
          return wrap;
        });

        var left;
        var height;

        if (screen.width >= 1000 && stb.mac.substring(0, 8) == "10:27:BE") {
          left = "20px";
          height = "560px";
        } else if (screen.width >= 1000) {
          left = "0px";
          height = "560px";
        } else if (
          screen.width < 1000 &&
          stb.mac.substring(0, 8) == "10:27:BE"
        ) {
          height = "460px";
          left = "10px";
        } else if (screen.width < 1000) {
          height = "460px";
          left = "10px";
        }
        var style = {
          overflowY: "hidden",
          margin: "0px",
          top: "70px",
          height: height,
          position: "relative",
          left: left,
          paddingRight: "20px",
          paddingLeft: "10px",
          marginTop: "20px"
        };
        var ul = createElement("ul", "vk_mzk_PostList", style, list);
        ul.tabIndex = 0;
        setTimeout(function() {
          ul.focus();
          window.scrollTo(0, 0);
          ul.scrollTop = state.wall.scrollTop.get();
        }, 0);
        var postController = new PostController(ul);
        ul.onkeydown = function(event) {
          postController.keydown(event);
        };
        return ul;
      };
    };
    PostList.prototype = baseComponent;

    function VerticalScroll(scrollTopState, scrollableElemSelector) {
      this.scrollTopState = scrollTopState;
      this.scrollableElemSelector = scrollableElemSelector;
      this.create = function create() {
        this.subscribe(this.scrollTopState);
        var h = "550px";
        if (screen.width < 1000) {
          h = "415px";
        }
        this.h = h;
        return createElement("div", "mb_scroll", this.getStyle(), [
          createElement(
            "div",
            "mb_scroll_t",
            {
              height: h,
              background:
                "url(template/" +
                loader.template +
                "/i_720/mb_scroll_bg_long.png)"
            },
            [
              createElement("div", "mb_scroll_c", {
                top: this.getScrolPosition() + "px"
              })
            ]
          ),
          createElement("div", "mb_scroll_b")
        ]);
      };
      this.getStyle = function() {
        var right;
        if (screen.width >= 1000 && stb.mac.substring(0, 8) == "10:27:BE") {
          right = "0px";
        } else if (screen.width >= 1000) {
          right = "20px";
        } else if (
          screen.width < 1000 &&
          stb.mac.substring(0, 8) == "10:27:BE"
        ) {
          right = "17px";
        } else if (screen.width < 1000) {
          right = "17px";
        }

        return {
          position: "absolute",
          right: right,
          top: "85px"
        };
      };
      this.getScrolPosition = function() {
        var elem = document.querySelector(this.scrollableElemSelector);
        if (!elem) {
          return 0;
        }
        var scroll = this.scrollTopState.get();
        var fullHeightElem = elem.scrollHeight - elem.offsetHeight;
        var scrolPositionPercent = (100 / fullHeightElem) * scroll;

        var k = 10;
        var m = 25;
        if (screen.width < 1000) {
          k = 10;
          m = 10;
        }
        var onePercent = parseInt(this.h) / 100;
        var result = scrolPositionPercent * onePercent;
        if (result >= parseInt(this.h) - m) {
          result = parseInt(this.h) - m;
        }
        if (result <= k) {
          result = k;
        }
        return result;
      };
    }
    VerticalScroll.prototype = baseComponent;

    function VerticalScrollSimple(scrollTopState) {
      this.scrollTopState = scrollTopState;
      this.create = function create() {
        this.subscribe(this.scrollTopState);
        var h = "550px";
        if (screen.width < 1000) {
          h = "415px";
        }
        this.h = h;
        return createElement("div", "mb_scroll", this.getStyle(), [
          createElement(
            "div",
            "mb_scroll_t",
            {
              height: h,
              background:
                "url(template/" +
                loader.template +
                "/i_720/mb_scroll_bg_long.png)"
            },
            [
              createElement("div", "mb_scroll_c", {
                top: this.getScrolPosition() + "px"
              })
            ]
          ),
          createElement("div", "mb_scroll_b")
        ]);
      };
      this.getStyle = function() {
        var right;
        if (screen.width >= 1000 && stb.mac.substring(0, 8) == "10:27:BE") {
          right = "0px";
        } else if (screen.width >= 1000) {
          right = "20px";
        } else if (
          screen.width < 1000 &&
          stb.mac.substring(0, 8) == "10:27:BE"
        ) {
          right = "17px";
        } else if (screen.width < 1000) {
          right = "17px";
        }

        return {
          position: "absolute",
          right: right,
          top: "85px"
        };
      };
      this.getScrolPosition = function() {
        return (parseInt(this.h) / 100) * this.scrollTopState.get();
      };
    }
    VerticalScrollSimple.prototype = baseComponent;

    function HorizontalScroll(scrollState, scrollableElemSelector) {
      this.scrollState = scrollState;
      this.scrollableElemSelector = scrollableElemSelector;
      this.create = function create() {
        this.subscribe(this.scrollState);
        var self = this;
        setTimeout(function() {
          self.setScrolPosition();
        }, 1);
        return createElement(
          "div",
          "mb_scroll mb_scroll_focus",
          this.getStyle(),
          [
            createElement(
              "div",
              "mb_scroll_t",
              {
                height: "25px",
                background:
                  "url(template/" +
                  loader.template +
                  "/i_720/mb_scroll_bg_long_h.png) no-repeat",
                width: "100%"
              },
              [
                createElement("div", "mb_scroll_c mb_scroll_c_focus", {
                  top: 6 + "px",
                  background:
                    "url(template/" +
                    loader.template +
                    "/i_720/mb_scroll_h.png) no-repeat",
                  right: 3 + "px",
                  width: "0px",
                  zIndex: "100"
                })
              ]
            ),
            createElement("div", "mb_scroll_b", {
              background:
                "url(template/" +
                loader.template +
                "/i_720/mb_scroll_bg_long_h_end.png) no-repeat",
              right: "-50px",
              top: "0px",
              height: "25px",
              width: "50px",
              position: "absolute"
            })
          ]
        );
      };
      this.getStyle = function() {
        width = "95%";
        if (loader.template === "default") {
          width = "97%";
        }
        return {
          float: "none",
          width: width,
          position: "relative"
        };
      };
      this.setScrolPosition = function() {
        var container = document.querySelector(".mb_scroll_focus");
        var target = document.querySelector(".mb_scroll_c_focus");
        var elem = document.querySelector(this.scrollableElemSelector);
        if (!elem) {
          return 0;
        }
        var scroll = elem.scrollLeft;
        var fullWidthElem = elem.scrollWidth - elem.offsetWidth;
        var scrolPositionPercent = (100 / fullWidthElem) * scroll;
        var onePercent = container.offsetWidth / 100;
        target.style.right = -(scrolPositionPercent * onePercent - 8) + "px";
        target.style.width = "30px";
        if (elem.offsetWidth === elem.scrollWidth) {
          container.style.display = "none";
        }
      };
    }
    HorizontalScroll.prototype = baseComponent;

    var Post = function Post(item) {
      this.create = function create() {
        var opacity;
        var color;
        if (item.focus) {
          opacity = "1";
          color = "#fff";
          background = "url(template/default/i_720/vk_mzk_bg_active_post.png)";
        } else {
          opacity = "0.5";
          color = "#CCCCCC";
          background = "url(template/default/i_720/25alfa_20.png)";
        }
        var post_attachments_wrap = document.createElement("div");
        var postAttachments = new post_attachments();
        postAttachments.item = item;
        postAttachments.render(post_attachments_wrap);
        var childsList = [
          post_date(item),
          post_text(item),
          post_attachments_wrap
        ];
        var fontSize = "22px";
        if (screen.width < 1000) {
          fontSize = "18px";
        }
        var elem = createElement(
          "div",
          "vk_mzk_post_" + item.id,
          {
            padding: "10px",
            margin: "20px",
            minHeight: "130px",
            background: background,
            fontSize: fontSize,
            color: color,
            position: "relative",
            left: "10px",
            opacity: opacity
          },
          childsList,
          undefined
        );
        return elem;
      };
    };
    Post.prototype = baseComponent;

    var post_attachments = function() {
      this.create = function create() {
        var item = this.item;
        if (!item.attachments) {
          item.attachments = [];
        }
        var elems = item.attachments.map(function(i) {
          return attachmentToElem(i);
        });
        var div = createElement(
          "div",
          "post_attachments_id_" + item.id,
          {
            overflowY: "hidden",
            whiteSpace: "nowrap",
            paddingBottom: "30px",
            top: "30px",
            position: "relative"
          },
          elems
        );
        var attachments = createElement(
          "div",
          undefined,
          {
            overflow: "hidden"
          },
          [div]
        );
        var componentList = [attachments];
        if (item.focus && item.attachments.length > 4) {
          var horizontalScroll = new HorizontalScroll(
            state.wall.attachmentsScroll,
            ".post_attachments_id_" + item.id
          );
          var hSWrap = createElement("div");
          horizontalScroll.render(hSWrap);
          componentList.push(hSWrap);
        }
        return createElement("div", undefined, undefined, componentList);
      };
    };
    post_attachments.prototype = baseComponent;

    var post_date = function(item) {
      const MONTH_ARR = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
      ];
      var date = new Date(item.date * 1000);
      var day = date.getDate();
      var month = MONTH_ARR[date.getMonth()];
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var dateString =
        day + " " + month + " " + year + " в " + hours + ":" + minutes;
      return createElement("div", undefined, undefined, undefined, dateString);
    };

    var post_text = function(item) {
      var text = item.text;
      text = text.split("");
      var maxTextSize = 450;
      if (screen.width < 1000) {
        maxTextSize = 300;
      }
      if (text.length > maxTextSize) {
        text.length = maxTextSize;
        text.push(".");
        text.push(".");
        text.push(".");
      }
      text = text.join("");
      return createElement(
        "div",
        "",
        undefined,
        [
          createElement(
            "div",
            "",
            { padding: "15px", marginLeft: "10px" },
            undefined,
            replaceEmojis(text)
          )
        ],
        undefined
      );
    };

    function attachmentToElem(item) {
      if (item.type === "photo") {
        return post_photo(item);
      } else if (item.type === "video") {
        return post_video(item);
      } else if (item.type === "album") {
        return post_album(item);
      } else if (item.type === "link") {
        return post_link(item);
      } else if (item.type === "doc") {
        return post_doc(item);
      }
    }

    function post_doc(item) {
      if (item.doc.type === 3) {
        return post_gif(item);
      }
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border,
          maxWidth: maxWidth,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxHeight: "250px"
        },
        undefined,
        "вложение: документ"
      );
    }

    function post_gif(item) {
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      var img = createElement("img", undefined, {
        maxWidth: maxWidth,
        maxHeight: "250px"
      });
      var sizes = item.doc.preview.photo.sizes;
      img.src = sizes[sizes.length - 1].src;
      var s = createElement(
        "div",
        undefined,
        {
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "url(template/default/i_720/25alfa_20.png)",
          padding: "3px 5px"
        },
        undefined,
        "gif"
      );
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border,
          maxWidth: maxWidth,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap"
        },
        [createElement("div", undefined, { position: "relative" }, [img, s])]
      );
    }

    function post_link(item) {
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      var title = createElement(
        "div",
        undefined,
        undefined,
        undefined,
        item.link.title
      );
      var url = createElement(
        "div",
        undefined,
        undefined,
        undefined,
        item.link.url
      );
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border,
          maxWidth: maxWidth,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxHeight: "250px"
        },
        [title, url]
      );
    }

    function post_album(item) {
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      var img = createElement("img", undefined, {
        maxWidth: maxWidth,
        maxHeight: "250px"
      });
      var duration = createElement(
        "div",
        undefined,
        {
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "url(template/default/i_720/25alfa_20.png)",
          padding: "3px 5px"
        },
        undefined,
        "альбом"
      );
      var title = createElement("div", undefined, {}, [
        createElement(
          "p",
          undefined,
          { whiteSpace: "pre-wrap" },
          undefined,
          item.album.title
        )
      ]);
      img.src = item.album.thumb.photo_604;
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border,
          position: "relative",
          maxWidth: maxWidth,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxHeight: "250px"
        },
        [
          createElement("div", undefined, { position: "relative" }, [
            img,
            duration
          ]),
          title
        ]
      );
    }

    function post_photo(item) {
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      var img = createElement("img", undefined, {
        maxWidth: maxWidth,
        maxHeight: "250px"
      });
      img.src = item.photo.photo_604;
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border
        },
        [img]
      );
    }

    function post_video(item) {
      var border;
      var className;
      if (item.focus) {
        border = "2px solid";
        className = "post_attachments_focusItem";
      } else {
        border = "none";
        className = "";
      }
      maxWidth = "300px";
      if (screen.width < 1000) {
        maxWidth = "200px";
      }
      var img = createElement("img", undefined, {
        maxWidth: maxWidth,
        maxHeight: "250px"
      });
      var duration = createElement(
        "div",
        undefined,
        {
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "url(template/default/i_720/25alfa_20.png)",
          padding: "3px 5px"
        },
        undefined,
        secTimeString(item.video.duration)
      );
      var title = createElement("div", undefined, {}, [
        createElement(
          "p",
          undefined,
          { whiteSpace: "pre-wrap", maxWidth: "300px" },
          undefined,
          item.video.title
        )
      ]);
      img.src = item.video.photo_800;
      return createElement(
        "div",
        className,
        {
          marginRight: "0%",
          display: "inline-block",
          padding: "0.5%",
          verticalAlign: "top",
          border: border,
          position: "relative",
          maxWidth: maxWidth,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxHeight: "250px"
        },
        [
          createElement("div", undefined, { position: "relative" }, [
            img,
            duration
          ]),
          title
        ]
      );
    }

    function secTimeString(secTime) {
      var sec = Math.floor(secTime % 60);
      var min = Math.floor(secTime / 60);
      var h = Math.floor(min / 60);
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

    /// model utilites
    function CreateValue() {
      return function(value) {
        return {
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
              var status = checkMountDOM(item.elem, app);
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
      };
      function checkMountDOM(elem, stopElem) {
        var status;
        parentIsNull(elem, stopElem, function(value) {
          status = value;
        });
        return status;
      }
      function parentIsNull(elem, stopElem, cb) {
        if (elem.parentNode === null) {
          cb(true);
          return true;
        }
        if (elem.parentNode === stopElem) {
          cb(false);
          return false;
        }
        parentIsNull(elem.parentNode, stopElem, cb);
      }
    }

    ///  view utilites
    function createElement(name, className, style, childs, html) {
      var elem = document.createElement(name);
      if (typeof className !== "undefined") {
        elem.className = className;
      }
      if (typeof style !== "undefined") {
        for (var key in style) {
          if (Object.prototype.hasOwnProperty.call(style, key)) {
            elem.style[key] = style[key];
          }
        }
      }
      if (typeof childs !== "undefined") {
        appendChilds(elem, childs);
      }
      if (typeof html !== "undefined") {
        elem.innerHTML = html;
      }
      return elem;
    }

    function addStyle(elem, style) {
      if (typeof style !== "undefined") {
        for (var key in style) {
          if (Object.prototype.hasOwnProperty.call(style, key)) {
            elem.style[key] = style[key];
          }
        }
      }
    }

    function appendChilds(target, childs) {
      childs.forEach(function(item) {
        if (item) {
          target.appendChild(item);
        }
      });
      return target;
    }

    function replaceEmojis(string) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      function emojiReplacer(char) {
        var img = createElement("img");
        img.src =
          "http://vk.com/images/emoji/" +
          utf8StringToUtf16String(char) +
          ".png";
        return (
          '<img src="http://vk.com/images/emoji/' +
          utf8StringToUtf16String(char) +
          '.png" />'
        );
      }
      return string.replace(regex, emojiReplacer);
    }

    function specialSpeechTextProccessing(string) {
      return string
        .replace(/#/g, " хештег ")
        .replace(/_/g, " ")
        .replace(/(https|http):\/\/.*($|\s)/g, "")
        .replace(/\[(id|club).*]/g, function(s) {
          return s.replace(/\[|\]|\||(id\d*)|(club\d*)/g, "");
        });
    }

    function dec2hex(dec, padding) {
      return parseInt(dec, 10)
        .toString(16)
        .padStart(padding, "0");
    }

    function utf8StringToUtf16String(str) {
      var utf16 = [];
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        utf16.push(dec2hex(str.charCodeAt(i), 4));
      }
      return utf16.join("").toUpperCase();
    }

    function BaseComponent() {
      Component = function() {};
      Component.prototype.render = function render(elem) {
        if (!this.elem) {
          if (typeof elem === "undefined") throw new Error("param undefined");
          this.elem = elem;
        }
        if (!this.wrap) {
          this.wrap = document.createElement("div");
          this.elem.appendChild(this.wrap);
        }
        this.wrap.innerHTML = "";
        this.clearSubscriptions();
        var comp = this.create();
        this.wrap.appendChild(comp);
      };
      Component.prototype.subscribe = function subscribe(valueObj) {
        var self = this;
        valueObj.subscribe(self);
        if (!this.subscribeList) {
          this.subscribeList = [];
        }
        this.subscribeList.push(valueObj);
      };
      Component.prototype.clearSubscriptions = function clearSubscriptions() {
        var self = this;
        if (!this.subscribeList) {
          return false;
        }
        this.subscribeList.forEach(function(valueObj) {
          valueObj.clear(self);
        });
        this.subscribeList = [];
      };
      component = new Component();
      return component;
    }

    /// HTTP req
    function HttpReqModule() {
      var Http = {};
      Http.wallGet = function wallGet(cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(
          "get",
          "http://212.77.128.203:8080/mzk_love_api/get_wall",
          true
        );
        xhr.send();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              cb(data);
            }
          }
        };
      };

      Http.wallGetComments = function wallGetComments(owner_id, post_id, cb) {
        post_id = parseInt(post_id);
        var xhr = new XMLHttpRequest();
        xhr.open(
          "get",
          "http://212.77.128.203:8080/mzk_love_api/wall_get_comments?owner_id=" +
            owner_id +
            "&" +
            "post_id=" +
            post_id,
          true
        );
        xhr.send();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              cb(data);
            }
          }
        };
      };

      Http.videoGet = function videoGet(owner_id, id, cb) {
        var url =
          "http://212.77.128.203:8080/apps/vk/get_links.php?url=https://vk.com/mzk_love?z=video" +
          owner_id +
          "_" +
          id;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              cb(data);
            }
          }
        };
      };

      Http.photosGet = function photosGet(owner_id, id, cb) {
        var url =
          "http://212.77.128.203:8080/mzk_love_api/get_photos?owner_id=" +
          owner_id +
          "&album_id=" +
          id;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              cb(data);
            }
          }
        };
      };

      Http.speechGet = function speechGet(text, cb) {
        var url = "http://212.77.128.203:8081/getSpeech";
        var xhr = new XMLHttpRequest();
        var data = {};
        data.text = specialSpeechTextProccessing(text);
        data = JSON.stringify(data);
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              cb(data);
            }
          }
        };
      };
      return Http;
    }
    ///

    ///
    function getMzk_constructor() {
      function mzk_constructor() {
        this.superclass = BaseLayer.prototype;
        this.layer_name = "msgreader";
        this.dom_obj = this.create_block("msgreader_bg");
        addStyle(this.dom_obj, {
          position: "absolute",
          left: "0px",
          top: "0px",
          width: screen.width + "px",
          height: screen.height + "px"
        });
        this.logo_dom_obj = create_block_element(
          "main_menu_logo",
          this.dom_obj
        );
        this.logo_dom_obj.style.background =
          "url(" + stb.user.portal_logo_url + ") no-repeat";
        document.body.appendChild(this.dom_obj);
        var vkLogo = createElement("img", undefined, {
          width: "58px",
          position: "absolute",
          right: "60px",
          top: "26px",
          zIndex: "100"
        });
        vkLogo.src = "template/default/i_720/VK_Blue_Logo_transparent.png";
        this.dom_obj.appendChild(vkLogo);
        this.init = function() {
          var container = create_block_element("msgreader", this.dom_obj);
          this.infoContainer = createElement("div", "", {});
          container.appendChild(this.infoContainer);
        };
        this.show = function(doNotClean) {
          this.superclass.show.call(this);
          module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
            /\/.*/,
            "/ "
          );
          state.route.set("/loading");
          internet_connection_check.check();
          internet_connection_check.successfully = function() {
            state.route.set("/postList");
          };
          internet_connection_check.fail = function() {
            state.route.set("/errorInternet");
          };
          module.mzk.header_path.innerText = module.mzk.header_path.innerText.replace(
            /\/.*/,
            "/ "
          );
          state.bottomButton.set([
            "Читать",
            "Открыть",
            "Комментарии",
            "Озвучить"
          ]);
          if (!doNotClean) {
            state.wall.postList.set([]);
            state.wall.focusIndex.set(0);
            state.wall.attachmentsFocus.set(0);
            state.wall.scrollTop.set(0);
            state.textView.text.set("");
          }
          var mzkMainContainer = new MzkMainContainer();
          mzkMainContainer.render(this.infoContainer);
          this.load();
        };
        this.key_press = function(button) {};
        this.hide = function() {
          this.superclass.hide.call(this);
          this.infoContainer.innerHTML = "";
          try {
            stb.Stop();
          } catch (e) {
            console.log(e);
          }
        };
        this.bind = function() {
          (function() {
            this.hide();
            main_menu.show();
          }
            .bind(key.EXIT, this)
            .bind(key.MENU, this));
        };
        this.load = function() {
          HTTP.wallGet(cb);
          function cb(result) {
            var i = 0;
            var items = result.result.response.items.map(function(item) {
              if (typeof item.copy_history !== "undefined") {
                item = item.copy_history[0];
                item.id = item.id + "_postfix_" + i;
              }
              i++;
              return item;
            });
            state.wall.postList.set(items);
          }
        };
      }
      mzk_constructor.prototype = new BaseLayer();
      return mzk_constructor;
    }
  })();
  loader.next();
} catch (e) {
  console.log(e);
}
