/*! mag-app-twitch: v1.0.10 (webpack: v1.15.0) */
!(function(e) {
  function t(n) {
    if (i[n]) return i[n].exports;
    var a = (i[n] = { exports: {}, id: n, loaded: !1 });
    return e[n].call(a.exports, a, a.exports, t), (a.loaded = !0), a.exports;
  }
  var i = {};
  return (t.m = e), (t.c = i), (t.p = ""), t(0);
})([
  function(e, t, i) {
    "use strict";
    var n,
      a,
      s = i(5),
      o = i(4),
      r = i(1),
      c = i(2),
      l = i(10);
    s.addListeners({
      load: function() {
        o.init([i(20), i(31), i(12), i(21), i(11)]);
      },
      done: function() {
        var e = document.createElement("iframe");
        (e.src = "about:blank"),
          (e.style.display = "none"),
          (a = i(19)),
          (n = i(20)),
          (c.environment = JSON.parse(
            gSTB.GetEnv('{"varList":["hdmi_event_delay"]}')
          ).result),
          l.authorize(function() {
            n.route();
          }),
          document.body.appendChild(e),
          (window.XMLHttpRequest = e.contentWindow.XMLHttpRequest);
      },
      keydown: function(e) {
        switch (e.code) {
          case r.volumeDown:
          case r.volumeUp:
          case r.mute:
            a.changeVolume(e.code);
            break;
          case 2085:
            gSTB.GetStandByStatus()
              ? gSTB.StandBy(!1)
              : (gSTB.StandBy(!0), o.navigate("pageMenu"), location.reload());
            break;
          case r.exit:
            window.parent === window
              ? o.navigate("pageService")
              : window.parent.postMessage("hide", "*");
        }
      }
    });
  },
  function(e, t, i) {
    "use strict";
    e.exports = {
      back: 8,
      del: 46,
      channelPrev: 1009,
      channelNext: 9,
      ok: 13,
      exit: 27,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
      pageUp: 33,
      pageDown: 34,
      end: 35,
      home: 36,
      volumeUp: 107,
      volumeDown: 109,
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      refresh: 116,
      frame: 117,
      phone: 119,
      set: 120,
      tv: 121,
      menu: 122,
      web: 123,
      mic: 2032,
      rewind: 2066,
      forward: 2070,
      app: 2076,
      usbMounted: 2080,
      usbUnmounted: 2081,
      playPause: 2082,
      stop: 2083,
      power: 2085,
      record: 2087,
      info: 2089,
      mute: 2192,
      clock: 2032,
      audio: 2071,
      keyboard: 2076
    };
  },
  function(e, t) {
    "use strict";
    e.exports = {
      api: { appId: "43ewlx0mwkffhid1khxuxuvgx21guj5" },
      backend: {
        url: {
          authorization: "http://api.freemultiplex.com/v1/session",
          profile: "http://api.freemultiplex.com/v1/profile",
          searchHistory: "http://api.freemultiplex.com/v1/history/search",
          playbackHistory: "http://api.freemultiplex.com/v1/history/playback",
          favorite: "http://api.freemultiplex.com/v1/favorites/media"
        }
      },
      movieList: {},
      dataProviderType: {
        TYPE_SERVICE: 1,
        TYPE_SEARCH: 2,
        TYPE_HISTORY: 3,
        TYPE_FAVORITE: 4
      },
      playNext: !0,
      bufferSize: 5,
      appRating: null,
      ads: !1,
      adsTimeout: 36e5,
      proxyServer: "",
      volume: 100,
      singleMode: { active: !0, name: "", hd: !0 }
    };
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      var t,
        i = this;
      if (
        ((e = e || {}),
        (this.visible = !0),
        (this.focusable = !0),
        (this.$node = null),
        (this.$body = null),
        (this.parent = null),
        (this.children = []),
        (this.propagate = !!e.propagate),
        a.call(this, e.data),
        (this.$node = e.$node || document.createElement("div")),
        (this.$body = e.$body || this.$node),
        (this.$node.className += " component " + (e.className || "")),
        (this.id = e.id || this.$node.id || "cid" + o++),
        e.parent && e.parent.add(this),
        e.visible === !1 && this.hide(),
        e.focusable === !1 && (this.focusable = !1),
        this.defaultEvents)
      ) {
        e.events = e.events || {};
        for (t in this.defaultEvents)
          e.events[t] = e.events[t] || this.defaultEvents[t];
      }
      e.events && this.addListeners(e.events),
        e.children && this.add.apply(this, e.children),
        this.$node.addEventListener("click", function(e) {
          0 === e.button &&
            (i.focus(), i.events.click && i.emit("click", { event: e })),
            e.stopPropagation();
        });
    }
    var a = i(8),
      s = i(4),
      o = 0;
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.defaultEvents = null),
      (n.prototype.add = function(e) {
        var t;
        for (t = 0; t < arguments.length; t++)
          (e = arguments[t]),
            this.children.push(e),
            (e.parent = this),
            e.$node &&
              null === e.$node.parentNode &&
              this.$body.appendChild(e.$node),
            this.events.add && this.emit("add", { item: e });
      }),
      (n.prototype.remove = function() {
        this.parent &&
          (s.current.activeComponent === this &&
            (this.blur(), this.parent.focus()),
          this.parent.children.splice(this.parent.children.indexOf(this), 1)),
          this.children.forEach(function(e) {
            e.remove();
          }),
          this.removeAllListeners(),
          this.$node.parentNode.removeChild(this.$node),
          this.events.remove && this.emit("remove");
      }),
      (n.prototype.focus = function(e) {
        var t = s.current,
          i = t.activeComponent;
        return (
          !(!this.focusable || this === i) &&
          (i && i.blur(),
          (t.activeComponent = i = this),
          i.$node.classList.add("focus"),
          i.events.focus && i.emit("focus", e),
          !0)
        );
      }),
      (n.prototype.blur = function() {
        var e = s.current,
          t = e.activeComponent;
        return (
          this.$node.classList.remove("focus"),
          this === t &&
            ((e.activeComponent = null),
            this.events.blur && this.emit("blur"),
            !0)
        );
      }),
      (n.prototype.show = function(e) {
        return (
          !!this.visible ||
          (this.$node.classList.remove("hidden"),
          (this.visible = !0),
          this.events.show && this.emit("show", e),
          !0)
        );
      }),
      (n.prototype.hide = function() {
        return (
          !this.visible ||
          (this.$node.classList.add("hidden"),
          (this.visible = !1),
          this.events.hide && this.emit("hide"),
          !0)
        );
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a = i(8);
    (n = new a()),
      (n.current = null),
      (n.history = []),
      (n.pages = []),
      (n.ids = {}),
      (n.init = function(e) {
        var t, i, n;
        if (e) {
          for (this.pages = [], this.pages = e, t = 0, i = e.length; t < i; t++)
            (n = e[t]), (this.ids[n.id] = n), n.active && (this.current = n);
          return this.events.init && this.emit("init", { pages: e }), !0;
        }
        return !1;
      }),
      (n.parse = function(e) {
        var t = { name: "", data: [] };
        return (
          (t.data = e.split("/").map(decodeURIComponent)),
          (t.name = t.data.shift().slice(1)),
          t
        );
      }),
      (n.stringify = function(e, t) {
        return (
          (t = Array.isArray(t) ? t : []),
          (e = encodeURIComponent(e)),
          (t = t.map(encodeURIComponent)),
          t.unshift(e),
          t.join("/")
        );
      }),
      (n.show = function(e, t) {
        return (
          !(!e || e.active) &&
          (e.$node.classList.add("active"),
          (e.active = !0),
          (this.current = e),
          e.events.show && e.emit("show", { page: e, data: t }),
          !0)
        );
      }),
      (n.hide = function(e) {
        return (
          !(!e || !e.active) &&
          (e.$node.classList.remove("active"),
          (e.active = !1),
          (this.current = null),
          e.events.hide && e.emit("hide", { page: e }),
          !0)
        );
      }),
      (n.navigate = function(e, t) {
        var i = this.current,
          n = this.ids[e];
        return (
          !(!n || n.active) &&
          ((location.hash = this.stringify(e, t)),
          this.hide(this.current),
          this.show(n, t),
          this.events.navigate && this.emit("navigate", { from: i, to: n }),
          this.history.push(n),
          !0)
        );
      }),
      (n.back = function() {
        var e, t;
        return (
          !!(
            this.history.length > 1 &&
            ((e = this.history.pop()),
            (t = this.history[this.history.length - 1]),
            t && !t.active)
          ) &&
          ((location.hash = t.id),
          this.hide(this.current),
          this.show(t),
          this.events.navigate && this.emit("navigate", { from: e, to: t }),
          !0)
        );
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a,
      s = i(34),
      o = i(4),
      r = i(1),
      c = {};
    i(37),
      window.parent &&
        window.parent.gSTB &&
        ((window.dvbManager = window.parent.dvbManager),
        (window.epgManager = window.parent.epgManager),
        (window.gSTB = window.parent.gSTB),
        (window.pvrManager = window.parent.pvrManager),
        (window.stbDownloadManager = window.parent.stbDownloadManager),
        (window.stbStorage = window.parent.stbStorage),
        (window.stbUpdate = window.parent.stbUpdate),
        (window.stbUPnP = window.parent.stbUPnP),
        (window.stbWebWindow = window.parent.stbWebWindow),
        (window.stbWindowMgr = window.parent.stbWindowMgr),
        (window.timeShift = window.parent.timeShift)),
      (n = new s({
        debug: !1,
        host: !0,
        frame: window !== window.parent,
        screen: null,
        time: { init: +new Date(), load: 0, done: 0 }
      })),
      (n.setScreen = function(e) {
        var t;
        return (
          !!e &&
          ((e.availHeight = e.height - (e.availTop + e.availBottom)),
          (e.availWidth = e.width - (e.availLeft + e.availRight)),
          window.moveTo(0, 0),
          window.resizeTo(e.width, e.height),
          (t = document.querySelector("link[rel=stylesheet]")),
          t && t instanceof HTMLLinkElement && document.head.removeChild(t),
          (t = document.createElement("link")),
          (t.rel = "stylesheet"),
          (t.href = "css/release." + e.height + ".css?" + +new Date()),
          document.head.appendChild(t),
          (this.data.metrics = e),
          !0)
        );
      }),
      (n.EVENT_END_OF_FILE = 1),
      (n.EVENT_GET_MEDIA_INFO = 2),
      (n.EVENT_PLAYBACK_BEGIN = 4),
      (n.EVENT_CONTENT_ERROR = 5),
      (n.EVENT_DUAL_MONO_DETECT = 6),
      (n.EVENT_INFO_GET = 7),
      (n.EVENT_SUBTITLE_LOAD_ERROR = 8),
      (n.EVENT_SUBTITLE_FIND = 9),
      (n.EVENT_HDMI_CONNECT = 32),
      (n.EVENT_HDMI_DISCONNECT = 33),
      (n.EVENT_RECORD_FINISH_SUCCESSFULL = 34),
      (n.EVENT_RECORD_FINISH_ERROR = 35),
      (n.EVENT_DVB_SCANING = 40),
      (n.EVENT_DVB_FOUND = 41),
      (n.EVENT_DVB_CHANELL_EPG_UPDATE = 42),
      (n.EVENT_DVB_ANTENNA_OFF = 43),
      n.setScreen(i(25)[screen.height]);
    for (a in r) "volumeUp" !== a && "volumeDown" !== a && (c[r[a]] = !0);
    n.defaultEvents = {
      load: function(e) {
        (n.data.time.load = e.timeStamp),
          n.events[e.type] && n.emit(e.type, e),
          o.pages.forEach(function(t) {
            t.events[e.type] && t.emit(e.type, e);
          }),
          (n.data.time.done = +new Date()),
          n.events.done && n.emit("done", e);
      },
      unload: function(e) {
        n.events[e.type] && n.emit(e.type, e),
          o.pages.forEach(function(t) {
            t.events[e.type] && t.emit(e.type, e);
          });
      },
      error: function(e) {},
      keydown: function(e) {
        var t,
          i = o.current;
        0 !== e.keyCode &&
          ((e.code = e.keyCode),
          e.shiftKey && (e.code += 1e3),
          e.altKey && (e.code += 2e3),
          (t = i.activeComponent),
          t &&
            t !== i &&
            (t.events[e.type] && t.emit(e.type, e),
            !e.stop &&
              t.propagate &&
              t.parent &&
              t.parent.events[e.type] &&
              t.parent.emit(e.type, e)),
          e.stop ||
            (i.events[e.type] && i.emit(e.type, e),
            e.stop || (n.events[e.type] && n.emit(e.type, e))),
          n.data.host && c[e.code] && e.preventDefault());
      },
      keypress: function(e) {
        var t = o.current;
        t.activeComponent &&
          t.activeComponent !== t &&
          t.activeComponent.events[e.type] &&
          t.activeComponent.emit(e.type, e);
      },
      click: function(e) {},
      contextmenu: function(e) {
        e.preventDefault();
      },
      mousewheel: function(e) {
        var t = o.current;
        t.activeComponent &&
          t.activeComponent !== t &&
          t.activeComponent.events[e.type] &&
          t.activeComponent.emit(e.type, e),
          e.stop || (t.events[e.type] && t.emit(e.type, e));
      }
    };
    for (a in n.defaultEvents) window.addEventListener(a, n.defaultEvents[a]);
    (window.stbEvent = {}),
      (window.stbEvent.onEvent = function(e, t) {
        if (n.events.media) {
          if (t)
            try {
              t = JSON.parse(t);
            } catch (e) {}
          n.emit("media", { code: parseInt(e, 10), info: t });
        }
      }),
      (window.stbEvent.onBroadcastMessage = function(e, t, i) {
        n.events.message &&
          n.emit("message", {
            broadcast: !0,
            windowId: e,
            message: t,
            data: i
          });
      }),
      (window.stbEvent.onMessage = function(e, t, i) {
        n.events.message &&
          n.emit("message", {
            broadcast: !1,
            windowId: e,
            message: t,
            data: i
          });
      }),
      (window.stbEvent.onMount = function(e) {
        n.events["device:mount"] && n.emit("device:mount", { state: e });
      }),
      (window.stbEvent.onMediaAvailable = function() {
        n.events["media:available"] && n.emit("media:available");
      }),
      (window.stbEvent.onNetworkStateChange = function(e) {
        n.events["internet:state"] && n.emit("internet:state", { state: e });
      }),
      (window.stbEvent.onWebBrowserProgress = function(e) {
        n.events["browser:progress"] &&
          n.emit("browser:progress", { progress: e });
      }),
      (window.stbEvent.onWindowActivated = function() {
        n.events["window:focus"] && n.emit("window:focus");
      }),
      window.gSTB && gSTB.SetNativeStringMode && gSTB.SetNativeStringMode(!0),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (this.active = !1),
        (this.activeComponent = null),
        (e.className = "page " + (e.className || "")),
        a.call(this, e),
        (this.active = this.$node.classList.contains("active")),
        null === this.$node.parentNode && document.body.appendChild(this.$node),
        (this.page = this);
    }
    var a = i(3);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    var n = { array: [], current: {} },
      a = i(2),
      s = i(33);
    (n.loadPlugin = function(e, t) {
      if (null === e && a.singleMode.active === !0)
        return (n.current.plugin = s), void t(self.current);
    }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n() {
      this.events = {};
    }
    (n.prototype = {
      addListener: function(e, t) {
        (this.events[e] = this.events[e] || []), this.events[e].push(t);
      },
      once: function(e, t) {
        var i = this;
        (this.events[e] = this.events[e] || []),
          this.events[e].push(function n(a) {
            t(a), i.removeListener(e, n);
          });
      },
      addListeners: function(e) {
        var t;
        if ("object" == typeof e)
          for (t in e) e.hasOwnProperty(t) && this.addListener(t, e[t]);
      },
      removeListener: function(e, t) {
        this.events[e] &&
          ((this.events[e] = this.events[e].filter(function(e) {
            return e !== t;
          })),
          0 === this.events[e].length && (this.events[e] = void 0));
      },
      removeAllListeners: function(e) {
        0 === arguments.length
          ? (this.events = {})
          : e && (this.events[e] = void 0);
      },
      emit: function(e, t) {
        var i,
          n = this.events[e];
        if (n) for (i = 0; i < n.length; i++) n[i].call(this, t);
      }
    }),
      (n.prototype.constructor = n),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (e.focusable = e.focusable || !1),
        (e.className = "panel " + (e.className || "")),
        a.call(this, e);
    }
    var a = i(3);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a = { profile: {}, playback: {}, token: void 0, favorite: { data: [] } },
      s = i(2),
      o = i(22);
    (a.authorize = function(e) {
      var t = gSTB.LoadUserData("twitch.tv.json");
      "" === t
        ? o.ajax(s.backend.url.authorization, {
            onload: function(t) {
              var i 

              try {
                i =JSON.parse(t);
              } catch (e) {
                i = { code: 0 };
                console.log(e);
              }
              200 === i.code
                ? ((a.token = i.data.sid),
                  gSTB.SaveUserData(
                    "twitch.tv.json",
                    JSON.stringify({
                      tokens: { active: a.token, guest: a.token }
                    })
                  ),
                  e(),
                  (a.isAuthorize = !0),
                  a.profile.save({ playNext: !0, buffer: 5 }))
                : ((a.isAuthorize = !1), e());
            },
            onerror: function() {
              e();
            },
            timeout: 6e3
          })
        : ((a.token = JSON.parse(t).tokens.active),
          a.profile.load(function() {
            e(), (a.isAuthorize = !0);
          }));
    }),
      (a.profile.load = function(e) {
        var t;
        (n = i(19)),
          o.ajax(s.backend.url.profile, {
            onload: function(i) {
              var a;

              try {
                t = JSON.parse(i);
              } catch (e) {
                t = { code: 0 };
                console.log(e);
              }

              if ((t, null === i.info)) return void (e && e());
              if (200 === t.code) {
                if (
                  ((s.playNext = t.data.info.playNext),
                  (s.bufferSize = t.data.info.buffer),
                  (s.appRating = t.data.info.appRating),
                  t.data.info.volume)
                ) {
                  s.volume = t.data.info.volume;
                  try {
                    n.setValue(s.volume);
                  } catch (e) {}
                }
                (a = Math.floor(768 * s.bufferSize * 1e3)),
                  gSTB.SetBufferSize(1e3 * s.bufferSize, a);
              }
              e && e(i);
            },
            onerror: function() {
              e && e();
            },
            method: "GET",
            headers: { Authorization: a.token },
            timeout: 6e3
          });
      }),
      (a.profile.save = function(e, t) {
        void 0 === e &&
          (e = {
            playNext: s.playNext,
            buffer: s.bufferSize,
            appRating: s.appRating,
            volume: s.volume
          }),
          o.ajax(s.backend.url.profile, {
            onload: function(e) {
              t && t();
            },
            timeout: 6e3,
            method: "PUT",
            data: e,
            headers: {
              "Content-Type": "application/json",
              Authorization: a.token
            }
          });
      }),
      (a.playback.send = function(e) {
        a.isAuthorize &&
          o.ajax(s.backend.url.playbackHistory, {
            method: "POST",
            timeout: 6e3,
            data: e,
            headers: {
              "Content-Type": "application/json",
              Authorization: a.token
            },
            onload: function(e) {
              200 === JSON.parse(e).code;
            }
          });
      }),
      (a.playback.load = function(e) {
        a.isAuthorize &&
          o.ajax(s.backend.url.playbackHistory, {
            method: "GET",
            headers: { Authorization: a.token },
            timeout: 6e3,
            onload: function(t) {
              var i = JSON.parse(t);
              200 !== i.code || e(i.data);
            },
            onerror: function() {}
          });
      }),
      (a.favorite.send = function(e, t) {
        a.isAuthorize &&
          o.ajax(s.backend.url.favorite, {
            method: "POST",
            data: e,
            timeout: 6e3,
            headers: {
              "Content-Type": "application/json",
              Authorization: a.token
            },
            onload: function(e) {
              200 === JSON.parse(e).code, t();
            },
            onerror: function() {
              t();
            }
          });
      }),
      (a.favorite.load = function(e, t) {
        a.isAuthorize &&
          o.ajax(s.backend.url.favorite + "?info.categoryId=" + e, {
            method: "GET",
            headers: { Authorization: a.token },
            timeout: 6e3,
            onload: function(e) {
              var i = JSON.parse(e);
              200 !== i.code || t(i.data);
            }
          });
      }),
      (a.favorite.checkState = function(e, t) {
        return a.isAuthorize
          ? void o.ajax(s.backend.url.favorite + "?info.id=" + e, {
              method: "GET",
              headers: { Authorization: a.token },
              timeout: 6e3,
              onload: function(e) {
                var i = JSON.parse(e);
                200 !== i.code
                  ? t(null)
                  : 0 !== i.data.length
                  ? t(!0, i.data[0].id)
                  : t(!1);
              },
              onerror: function() {
                t(null);
              }
            })
          : void t(null);
      }),
      (a.favorite.deleteItem = function(e, t) {
        return a.isAuthorize
          ? void o.ajax(s.backend.url.favorite + "/" + e, {
              method: "DELETE",
              headers: { Authorization: a.token },
              timeout: 6e3,
              onload: function(e) {
                var i = JSON.parse(e);
                t(200 === i.code);
              },
              onerror: function() {
                t(!1);
              }
            })
          : void t(!1);
      }),
      (e.exports = a);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a,
      s = "pageSearch",
      o = document.getElementById(s),
      r = i(6),
      c = new r({ $node: o }),
      l = i(4),
      d = i(1),
      h = i(5),
      u = i(18),
      p = i(16),
      m = i(17),
      v = i(14),
      f = i(13),
      g = i(23),
      y = i(9),
      E = new g({
        visible: !1,
        events: {
          show: function() {
            E.okBtn.focus();
          },
          hide: function() {
            a.focus();
          }
        }
      }),
      T = document.getElementById("pageSearchStory"),
      w = document.createElement("span");
    c.addListener("load", function() {
      (T.innerText = "Search history "),
        w.classList.add("searchType"),
        T.appendChild(w),
        (a = new f({
          $node: document.getElementById("pageSearchStoryClear"),
          value: "Clear history"
        })),
        c.add(a),
        a.addListener("keydown", function(e) {
          switch (e.code) {
            case d.up:
              p.input.focus();
              break;
            case d.down:
              n ? n.focus() : m.keys.focus();
          }
        }),
        a.addListener("click", function() {
          E.show();
        }),
        p.input.addListener("keydown", function(e) {
          e.code === d.down && "pageSearch" === l.current.id && a.focus();
        }),
        c.add(E),
        E.add((E.title = new y())),
        (E.title.$body.innerText = "Clear search history ?"),
        E.add(
          (E.okBtn = new f({
            value: "Clear",
            events: {
              keydown: function(e) {
                switch (
                  (f.prototype.defaultEvents.keydown.call(this, e), e.code)
                ) {
                  case d.right:
                    E.cancelBtn.focus();
                    break;
                  case d.back:
                  case d.exit:
                    E.hide(), (e.stop = !0);
                }
              },
              click: function() {
                u.clearStorage(function(e) {
                  e
                    ? c.initSearch(c.lastSearchData, function() {
                        a.focus(), E.hide();
                      })
                    : E.hide();
                });
              }
            }
          }))
        ),
        E.add(
          (E.cancelBtn = new f({
            value: "Cancel",
            events: {
              keydown: function(e) {
                switch (
                  (f.prototype.defaultEvents.keydown.call(this, e), e.code)
                ) {
                  case d.left:
                    E.okBtn.focus();
                    break;
                  case d.back:
                  case d.exit:
                    E.hide(), (e.stop = !0);
                }
              },
              click: function() {
                E.hide();
              }
            }
          }))
        );
    }),
      c.addListener("show", function() {
        c.add(m),
          c.add(p),
          p.show(),
          m.show(),
          m.showBg(0),
          m.keys.focus(),
          m.keys.focusItem(m.keys.map[2][5]),
          m.overflowTop(function() {
            n ? n.focus() : a.focus();
          }),
          m.button.addListener("keydown", function(e) {
            e.code === d.up &&
              ("pageSearch" === l.current.id
                ? n
                  ? (n.focus(), n.focusItem(n.map[4][1]))
                  : a.focus()
                : "pageVideoList" === l.current.id && p.input.focus());
          });
      }),
      c.addListener("keydown", function(e) {
        switch (e.code) {
          case d.back:
            m.hide(), p.hide(), l.navigate("pageService");
            break;
          case d.exit:
            h.data.frame || (m.hide(), p.hide());
        }
      }),
      (c.initSearch = function(e, t) {
        (this.lastSearchData = e),
          (m.searchObj = e),
          u.getData(function(e) {
            var t = e;
            if (null !== t) {
              if (n)
                try {
                  n.remove(), (n = null);
                } catch (e) {}
              (n = new v({
                data: t,
                cycleY: !1,
                render: function(e, t) {
                  var i = document.createElement("span");
                  (i.innerText = t.value), e.appendChild(i);
                }
              })),
                c.add(n),
                n.addListener("overflow", function(e) {
                  switch (e.direction) {
                    case d.up:
                      a.focus();
                      break;
                    case d.down:
                      m.keys.focus();
                  }
                }),
                n.addListener("click:item", function(e) {
                  p.setValue(e.$item.data.value), m.button.focus();
                });
            } else if (n)
              try {
                n.remove(), (n = null);
              } catch (e) {}
          }),
          t();
      }),
      (e.exports = c);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      switch (e.$item.movieObj.type) {
        case b.current.plugin.TYPE_FOLDER:
          (c = e.$item.movieObj.channelImg || c),
            p.initVideoList(
              T.dataProviderType.TYPE_SERVICE,
              { item: e.$item.movieObj },
              function() {}
            );
          break;
        case b.current.plugin.TYPE_MOVIE:
          I.play({
            content: s.$focusItem.movieObj,
            img: s.$focusItem.movieObj.channelImg || c
          });
      }
    }
    var a,
      s,
      o,
      r,
      c,
      l,
      d = "pageVideoList",
      h = document.getElementById(d),
      u = i(6),
      p = new u({ $node: h }),
      m = i(4),
      v = i(1),
      f = i(5),
      g = i(36),
      y = i(9),
      E = i(14),
      T = i(2),
      w = i(30),
      b = i(7),
      S = i(11),
      I = i(21),
      k = document.getElementById("pageVideoListBreadCrumb"),
      _ = [];
    p.addListener("load", function() {
      (a = new y({ $node: document.getElementById("pageVideoListHeader") })),
        (o = new y({
          $node: document.getElementById("pageVideoListContentWrapper")
        })),
        p.add(o),
        o.add(a);
    }),
      (p.initVideoList = function(e, t, i) {
        var c,
          d = [],
          h = [];
        if (
          (2 === t.item.system.type
            ? ((T.movieList.perLine = T.movieList.count.TYPE_GAMES),
              (r = T.movieList.imgSize.TYPE_GAMES),
              a.$node.classList.add("game"),
              a.$node.classList.remove("content"))
            : ((T.movieList.perLine = T.movieList.count.TYPE_CONTENT),
              (r = T.movieList.imgSize.TYPE_CONTENT),
              a.$node.classList.add("content"),
              a.$node.classList.remove("game")),
          _.push(t),
          e === T.dataProviderType.TYPE_SERVICE
            ? ((l = w),
              a.show(),
              breadcrumb[breadcrumb.length - 1] !== t.item.title &&
                window.breadcrumb.push(t.item.title || t.item.author))
            : e === T.dataProviderType.TYPE_SEARCH &&
              ((l = w),
              a.show(),
              breadcrumb[breadcrumb.length - 1] !== t.searchText &&
                window.breadcrumb.push(t.searchText)),
          (k.innerText = window.breadcrumb.join(" | ")),
          l.state ? l.state++ : (l.state = 1),
          s)
        ) {
          try {
            s.remove();
          } catch (e) {}
          l.type === T.dataProviderType.TYPE_SERVICE &&
            window.breadcrumb.splice(1);
        }
        l.getFirst(t, function(e, a) {
          for (d[0] = e.slice(0, T.movieList.perLine), c = 1; c < 3; c++)
            d[c] = e.slice(
              T.movieList.perLine * c,
              T.movieList.perLine * c + T.movieList.perLine
            );
          (s = new E({
            focusable: !0,
            data: d,
            cycleY: !1,
            render: function(e, t) {
              var i = document.createElement("div"),
                n = document.createElement("div"),
                a = document.createElement("div"),
                s = document.createElement("div");
              f.data.metrics.height < 720 &&
                t.value.imgSmall &&
                (t.value.img = t.value.imgSmall),
                e.ready
                  ? (t.value.img &&
                      (t.value.img = t.value.img.replace(
                        "{width}x{height}",
                        r
                      )),
                    (e.img.style.backgroundImage = "url(" + t.value.img + ")"),
                    (e.txt.innerText = t.value.title),
                    t.value.viewers &&
                      (e.txt.innerText += "\nviewers: " + t.value.viewers),
                    (e.movieObj = t.value),
                    t.value.invisible
                      ? (e.classList.add("invisible"), (e.data.disable = !0))
                      : (e.classList.remove("invisible"),
                        (e.data.disable = !1)))
                  : (n.classList.add("cover"),
                    t.value.img &&
                      (t.value.img = t.value.img.replace(
                        "{width}x{height}",
                        r
                      )),
                    (n.style.backgroundImage = "url(" + t.value.img + ")"),
                    (i.className = "movieItem"),
                    (a.className = "movieDescription"),
                    (s.className = "name"),
                    (s.innerText = t.value.title || ""),
                    t.value.viewers &&
                      (s.innerText += "\nviewers: " + t.value.viewers),
                    i.appendChild(n),
                    a.appendChild(s),
                    i.appendChild(a),
                    e.appendChild(i),
                    t.value.invisible && e.classList.add("invisible"),
                    (e.img = n),
                    (e.txt = s),
                    (e.ready = !0),
                    (e.movieObj = t.value));
            },
            events: {
              keydown: function(e) {
                switch (e.code) {
                  case v.right:
                  case v.left:
                    this.move(e.code);
                    break;
                  case v.ok:
                    void 0 !== this.events["click:item"] &&
                      this.emit("click:item", {
                        $item: this.$focusItem,
                        event: e
                      });
                    break;
                  case v.down:
                    p.nextData();
                    break;
                  case v.up:
                    p.prevData();
                }
              },
              "click:item": n
            }
          })),
            2 === t.item.system.type
              ? s.$node.classList.add("game")
              : s.$node.classList.add("content"),
            o.add(s),
            (p.videoList = s),
            a &&
              a.length > 0 &&
              (a.forEach(function(e) {
                e.value.img &&
                  h.push(e.value.img.replace("{width}x{height}", r));
              }),
              g.add(h)),
            i(),
            s.focus(),
            s.map[1][2] &&
            !s.map[1][2].data.disable &&
            5 === T.movieList.perLine
              ? s.focusItem(s.map[1][2])
              : s.focusItem(s.map[1][0]);
        });
      }),
      (p.nextData = function() {
        var e,
          t,
          i = l.getNext(),
          n = [];
        if (null !== i.data) {
          for (
            s.data[0] = s.data[1],
              s.data[1] = s.data[2],
              s.data[2] = i.data,
              i.data = s.data,
              e = 0;
            e < 3;
            e++
          )
            for (t = 0; t < T.movieList.perLine; t++)
              s.renderItem(s.map[e][t], s.data[e][t]);
          s.$focusItem.data.disable && s.focusItem(s.map[1][0]), a.hide();
        }
        return (
          i.next &&
            (i.next.forEach(function(e) {
              e.value.img && n.push(e.value.img.replace("{width}x{height}", r));
            }),
            g.add(n)),
          i.data
        );
      }),
      (p.prevData = function() {
        var e,
          t,
          i = l.getPrev();
        if (null !== i.data) {
          for (
            s.data[2] = s.data[1],
              s.data[1] = s.data[0],
              s.data[0] = i.data,
              i.data = s.data,
              e = 0;
            e < 3;
            e++
          )
            for (t = 0; t < T.movieList.perLine; t++)
              s.renderItem(s.map[e][t], s.data[e][t]);
          1 === l.page && l.type !== T.dataProviderType.TYPE_SEARCH && a.show();
        }
        return i.data;
      }),
      p.addListener("show", function(e) {
        1 === l.page ? a.show() : a.hide(),
          l.type === T.dataProviderType.TYPE_SEARCH,
          e.data &&
            void 0 !== e.data.position &&
            s.focusItem(s.map[1][e.data.position]);
      }),
      p.addListener("hide", function() {
        a.hide();
      }),
      p.addListener("keydown", function(e) {
        switch (e.code) {
          case v.back:
            _.length > 1
              ? (breadcrumb.pop(),
                _.pop(),
                p.initVideoList(
                  _[_.length - 1].searchText
                    ? T.dataProviderType.TYPE_SEARCH
                    : T.dataProviderType.TYPE_SERVICE,
                  _.pop(),
                  function() {}
                ))
              : ((_ = []),
                l.type === T.dataProviderType.TYPE_SEARCH
                  ? (m.navigate("pageSearch"),
                    S.initSearch(S.lastSearchData, function() {
                      m.navigate("pageSearch");
                    }))
                  : l.type === T.dataProviderType.TYPE_SERVICE &&
                    m.navigate("pageService"));
        }
      }),
      (e.exports = p);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (e.className = "button " + (e.className || "")),
        a.call(this, e),
        e.icon &&
          ((this.$icon = this.$body.appendChild(document.createElement("div"))),
          (this.$icon.className = "icon " + e.icon)),
        (this.$text = this.$body.appendChild(document.createElement("div"))),
        this.$text.classList.add("text"),
        e.value && (this.$text.innerText = e.value);
    }
    var a = i(3),
      s = i(1);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.clickDuration = 200),
      (n.prototype.defaultEvents = {
        click: function() {
          var e = this;
          this.$node.classList.add("click"),
            setTimeout(function() {
              e.$node.classList.remove("click");
            }, this.clickDuration);
        },
        keydown: function(e) {
          e.code === s.ok &&
            this.events.click &&
            this.emit("click", { event: e });
        }
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (this.map = []),
        (this.$focusItem = null),
        (this.data = []),
        (this.cycleX = !0),
        (this.cycleY = !0),
        (this.focusX = 0),
        (this.focusY = 0),
        (e.className = "grid " + (e.className || "")),
        r.call(this, e),
        this.init(e);
    }
    function a(e) {
      var t, i, n;
      for (t = 0; t < e.length; t++)
        for (i = 0; i < e[t].length; i++)
          (n = e[t][i]),
            "object" != typeof n
              ? (n = e[t][i] = { value: e[t][i], colSpan: 1, rowSpan: 1 })
              : ((n.colSpan = n.colSpan || 1), (n.rowSpan = n.rowSpan || 1));
      return e;
    }
    function s(e, t, i, n, a, s) {
      var o, r;
      for (o = i; o < i + a; o++) {
        for (e.length < o + 1 && e.push([]); void 0 !== e[o][t]; ) t++;
        for (r = t; r < t + n; r++)
          e[o].length < r + 1 && e[o].push(),
            (e[o][r] = s),
            void 0 === s.x && (s.x = r),
            void 0 === s.y && (s.y = o);
      }
    }
    function o(e) {
      var t,
        i,
        n,
        a = [];
      for (t = 0; t < e.length; t++)
        for (i = 0; i < e[t].length; i++)
          (n = e[t][i]),
            s(a, i, t, n.colSpan, n.rowSpan, n.$item),
            delete n.$item;
      return a;
    }
    var r = i(3),
      c = i(1);
    (n.prototype = Object.create(r.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.renderItemDefault = function(e, t) {
        e.innerText = t.value;
      }),
      (n.prototype.renderItem = n.prototype.renderItemDefault),
      (n.prototype.defaultEvents = {
        mousewheel: function(e) {
          e.wheelDeltaY && this.move(e.wheelDeltaY > 0 ? c.up : c.down),
            e.wheelDeltaX && this.move(e.wheelDeltaX > 0 ? c.left : c.right);
        },
        keydown: function(e) {
          switch (e.code) {
            case c.up:
            case c.down:
            case c.right:
            case c.left:
              this.move(e.code);
              break;
            case c.ok:
              this.events["click:item"] &&
                this.emit("click:item", { $item: this.$focusItem, event: e });
          }
        }
      }),
      (n.prototype.init = function(e) {
        var t,
          i,
          n,
          s,
          r,
          c,
          l,
          d = this,
          h = !1,
          u = function(e) {
            this.data.disable !== !0 &&
              (d.focusItem(this),
              d.events["click:item"] &&
                d.emit("click:item", { $item: this, event: e }));
          };
        if (
          (void 0 !== e.cycleX && (this.cycleX = e.cycleX),
          void 0 !== e.cycleY && (this.cycleY = e.cycleY),
          e.data && this.data !== e.data && ((this.data = e.data), (h = !0)),
          e.render &&
            this.renderItem !== e.render &&
            ((this.renderItem = e.render), (h = !0)),
          h)
        ) {
          for (
            this.$table = document.createElement("table"),
              r = document.createElement("tbody"),
              this.data = a(this.data),
              t = 0;
            t < this.data.length;
            t++
          ) {
            for (n = r.insertRow(), i = 0; i < this.data[t].length; i++)
              (s = n.insertCell(-1)),
                (s.className = "item"),
                (l = this.data[t][i]),
                (l.$item = s),
                (s.colSpan = l.colSpan),
                (s.rowSpan = l.rowSpan),
                l.focus && (c = s),
                l.disable && s.classList.add("disable"),
                l.mark && s.classList.add("mark"),
                this.renderItem(s, l),
                (s.data = l),
                s.addEventListener("click", u);
            r.appendChild(n);
          }
          (this.map = o(this.data)),
            (this.$body.innerText = null),
            this.$table.appendChild(r),
            this.$body.appendChild(this.$table),
            c ? this.focusItem(c) : this.focusItem(this.map[0][0]);
        }
      }),
      (n.prototype.move = function(e) {
        for (
          var t = this.focusX, i = this.focusY, n = !0, a = !1, s = !1;
          n;

        ) {
          switch (e) {
            case c.up:
              i > 0
                ? i--
                : this.cycleY
                ? ((i = this.map.length - 1), (s = !0))
                : (a = !0);
              break;
            case c.down:
              i < this.map.length - 1
                ? i++
                : this.cycleY
                ? ((i = 0), (s = !0))
                : (a = !0);
              break;
            case c.right:
              t < this.map[i].length - 1
                ? t++
                : this.cycleX
                ? ((t = 0), (s = !0))
                : (a = !0);
              break;
            case c.left:
              t > 0
                ? t--
                : this.cycleX
                ? ((t = this.map[i].length - 1), (s = !0))
                : (a = !0);
          }
          t === this.focusX && i === this.focusY && (n = !1),
            this.map[i][t] !== this.map[this.focusY][this.focusX] &&
              this.map[i][t].data.disable !== !0 &&
              (n = !1),
            a &&
              ((n = !1),
              this.map[i][t].data.disable === !0 &&
                ((t = this.focusX), (i = this.focusY)));
        }
        s && this.events.cycle && this.emit("cycle", { direction: e }),
          a && this.events.overflow && this.emit("overflow", { direction: e }),
          this.focusItem(this.map[i][t]),
          (this.focusX = t),
          (this.focusY = i);
      }),
      (n.prototype.focusItem = function(e) {
        var t = this.$focusItem;
        return (
          !(!e || t === e || e.data.disable === !0) &&
          (null !== t &&
            (t.classList.remove("focus"),
            this.events["blur:item"] && this.emit("blur:item", { $item: t })),
          (this.focusX = e.x),
          (this.focusY = e.y),
          (this.$focusItem = e),
          e.classList.add("focus"),
          this.events["focus:item"] &&
            this.emit("focus:item", { $prev: t, $curr: e }),
          !0)
        );
      }),
      (n.prototype.markItem = function(e, t) {
        t ? e.classList.add("mark") : e.classList.remove("mark"),
          (e.data.mark = t);
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (e.focusable = e.focusable || !1),
        (e.visible = e.visible || !1),
        (e.className = "widget " + (e.className || "")),
        a.call(this, e);
    }
    var a = i(3);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    var n = "inputWidgetWrapper",
      a = document.getElementById(n),
      s = i(15),
      o = new s({ $node: a, visible: !1, focusable: !0 }),
      r = i(1),
      c = i(38),
      l = new c({ $node: document.getElementById("inputWidget") });
    o.add(l),
      o.$node.classList.remove("invisible"),
      (o.addChar = function(e) {
        l.addChar(e);
      }),
      (o.removeChar = function() {
        l.removeChar();
      }),
      (o.getValue = function() {
        return l.value;
      }),
      (o.setValue = function(e) {
        l.setValue(e),
          setTimeout(function() {
            l.setValue(e);
          }, 0);
      }),
      (o.delChar = function() {
        l.removeChar(l.value.length - 1);
      }),
      (o.input = l),
      l.addListener("keydown", function(e) {
        var t;
        e.code === r.ok && l.value.length > 0
          ? ((t = i(17)), t.button.focus())
          : e.code === r.back && (e.stop = !0);
      }),
      (o.overflowBot = function(e) {
        l.addListener("keydown", function(t) {
          t.code === r.down && e();
        });
      }),
      (e.exports = o);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a = "keyboardWidgetWrapper",
      s = document.getElementById(a),
      o = i(15),
      r = new o({ $node: s, visible: !1, focusable: !0 }),
      c = i(1),
      l = i(5),
      d = i(4),
      h = i(14),
      u = i(13),
      p = i(2),
      m = i(24),
      v = i(16),
      f = i(18),
      g = new h({
        $node: document.getElementById("keyboardWidget"),
        data: m.en,
        cycleY: !1,
        cycleX: !1,
        render: function(e, t) {
          var i,
            n = document.createElement("div");
          n.classList.add("keyboardButton"),
            t.id && (e.id = t.id),
            (n.innerText = t.value),
            e.appendChild(n),
            t.img &&
              ((i = document.createElement("img")),
              (i.src = "./img/" + l.data.metrics.height + "/" + t.img + ".png"),
              n.appendChild(i));
        }
      }),
      y = new u({
        $node: document.getElementById("keyboardWidgetSearchBtn"),
        value: "Search"
      });
    r.$node.classList.remove("invisible"),
      r.add(g),
      r.add(y),
      (r.isUpper = !1),
      (r.lang = "en"),
      g.addListener("overflow", function(e) {
        switch (e.direction) {
          case c.right:
            y.focus();
        }
      }),
      g.addListener("click:item", function(e) {
        if (v.visible)
          if (e.$item.data.id)
            switch (e.$item.data.id) {
              case "keyUp":
                r.upper();
                break;
              case "keyBackspace":
                v.delChar();
                break;
              case "keySpace":
                v.addChar(" ");
                break;
              case "keyLeft":
                v.input.emit("keydown", { code: c.left });
                break;
              case "keyRight":
                v.input.emit("keydown", { code: c.right });
                break;
              case "keyLang":
                r.changeLang();
            }
          else
            r.isUpper
              ? v.addChar(e.$item.data.value.toString().toUpperCase())
              : v.addChar(e.$item.data.value.toString());
      }),
      g.addListener("keydown", function(e) {
        switch (e.code) {
          case 112:
            (e.stop = !0), v.delChar();
            break;
          case 115:
            y.emit("click", {});
            break;
          case 114:
            break;
          case 113:
            v.addChar(" ");
        }
      }),
      y.addListener("keydown", function(e) {
        switch (e.code) {
          case c.left:
            g.focus();
        }
      }),
      (r.setSearchObj = function() {}),
      y.addListener("click", function() {
        (n = i(12)),
          v.visible &&
            v.getValue().length > 0 &&
            n.initVideoList(
              p.dataProviderType.TYPE_SEARCH,
              { item: r.searchObj, searchText: v.getValue() },
              function() {
                r.hide(),
                  v.hide(),
                  y.blur(),
                  d.navigate("pageVideoList"),
                  f.add(v.getValue());
              }
            );
      }),
      (r.upper = function() {
        this.isUpper
          ? ((this.isUpper = !1), this.$node.classList.remove("upperCase"))
          : ((this.isUpper = !0), this.$node.classList.add("upperCase"));
      }),
      (r.overflowTop = function(e) {
        var t = d.current.id;
        g.addListener("overflow", function(i) {
          i.direction === c.up && d.current.id === t && e();
        });
      }),
      (r.changeLang = function() {
        "ru" === r.lang
          ? (g.init({ data: m.en }), (r.lang = "en"))
          : (g.init({ data: m.ru }), (r.lang = "ru")),
          g.focusItem(g.map[2][5]);
      }),
      (r.showBg = function(e) {
        1 === e
          ? r.$node.classList.add("background")
          : 0 === e && r.$node.classList.remove("background");
      }),
      (r.button = y),
      (r.keys = g),
      (e.exports = r);
  },
  function(e, t, i) {
    "use strict";
    var n = {},
      a = [],
      s = i(2),
      o = i(10),
      r = i(22);
    (n.getData = function(e) {
      var t,
        i,
        n = [];
      (a = []),
        o.isAuthorize
          ? r.ajax(s.backend.url.searchHistory, {
              method: "GET",
              headers: { Authorization: o.token },
              timeout: 6e3,
              onload: function(s) {
                var o,
                  r = JSON.parse(s).data;
                if (
                  (r.forEach(function(e) {
                    a.push(e.info);
                  }),
                  a.length > 0)
                ) {
                  for (
                    a.length % 2 !== 0 && a.push({ value: "", disable: !0 }),
                      i = a.length / 2,
                      n[0] = [],
                      n[0].push(a[0]),
                      n[0].push(a[i]),
                      t = 1;
                    t < i;
                    t++
                  )
                    (n[t] = []),
                      n[t].push(a[t]),
                      (o = t + parseFloat(i)),
                      n[t].push(a[o]);
                  e(n);
                } else e(null);
              }
            })
          : e(null);
    }),
      (n.clearStorage = function(e) {
        (a = []),
          r.ajax(s.backend.url.searchHistory, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: o.token
            },
            timeout: 6e3,
            onload: function(t) {
              var i = JSON.parse(t);
              e(200 === i.code);
            },
            onerror: function() {
              e(!1);
            }
          });
      }),
      (n.removeLast = function() {
        a.pop();
      }),
      (n.add = function(e) {
        (a.length && e === a[0].value) ||
          (a.pop(),
          a.unshift({ value: e }),
          e &&
            r.ajax(s.backend.url.searchHistory, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: o.token
              },
              data: { value: e },
              timeout: 6e3,
              onload: function() {}
            }));
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n() {
      d.isMuted &&
        (gSTB.SetMute(0), (d.isMuted = !1), v.classList.remove("muted")),
        m >= y &&
          ((m -= y),
          (v.innerText = m.toString()),
          0 !== m && m - y > 0
            ? (f.innerText = (m - y).toString())
            : (f.innerText = ""),
          (g.innerText = (m + y).toString()),
          gSTB.SetVolume(m));
    }
    function a() {
      d.isMuted &&
        (gSTB.SetMute(0), (d.isMuted = !1), v.classList.remove("muted")),
        m + y <= 100 &&
          ((m += y),
          (v.innerText = m.toString()),
          100 !== m ? (g.innerText = (m + y).toString()) : (g.innerText = ""),
          gSTB.SetVolume(m),
          (f.innerText = (m - y).toString()));
    }
    function s() {
      d.isMuted
        ? (gSTB.SetMute(0), (d.isMuted = !1), v.classList.remove("muted"))
        : (gSTB.SetMute(1), (d.isMuted = !0), v.classList.add("muted"));
    }
    var o,
      r = "volumeWidget",
      c = document.getElementById(r),
      l = i(15),
      d = new l({ $node: c, visible: !1, focusable: !0 }),
      h = i(1),
      u = i(2),
      p = i(10),
      m = u.volume,
      v = document.getElementById("volumeCurrentValue"),
      f = document.getElementById("volumeBotValue"),
      g = document.getElementById("volumeTopValue"),
      y = 10;
    gSTB.SetVolume(m),
      (v.innerText = m.toString()),
      m <= 100 - y && (g.innerText = (m + y).toString()),
      m >= y ? (f.innerText = (m - y).toString()) : (f.innerText = "0"),
      (d.isMuted = Boolean(gSTB.GetMute())),
      d.$node.classList.remove("invisible"),
      (d.changeVolume = function(e) {
        switch (e) {
          case h.volumeDown:
            n();
            break;
          case h.volumeUp:
            a();
            break;
          case h.mute:
            s();
        }
        this.display(2), (u.volume = m), p.profile.save();
      }),
      (d.display = function(e) {
        d.visible && clearTimeout(o),
          void 0 !== e &&
            (o = setTimeout(function() {
              d.hide();
            }, 1e3 * e)),
          this.show();
      }),
      (d.setValue = function(e) {
        e < 0 ||
          e > 100 ||
          ((m = e),
          (v.innerText = m.toString()),
          0 !== m && m - y > 0
            ? (f.innerText = (m - y).toString())
            : (f.innerText = ""),
          100 !== m ? (g.innerText = (m + y).toString()) : (g.innerText = ""));
      }),
      (e.exports = d);
  },
  function(e, t, i) {
    "use strict";
    var n = "pageInit",
      a = i(6),
      s = new a({ $node: document.getElementById(n) }),
      o = i(5),
      r = i(4),
      c = i(2);
    (s.route = function() {
      switch (o.data.metrics.height) {
        case 1080:
          (c.movieList.count = { TYPE_GAMES: 5, TYPE_CONTENT: 5 }),
            (c.movieList.imgSize = {
              TYPE_GAMES: "270x380",
              TYPE_CONTENT: "320x180"
            }),
            (c.player = { imgSize: "90x90" });
          break;
        case 720:
          (c.movieList.count = { TYPE_GAMES: 6, TYPE_CONTENT: 3 }),
            (c.movieList.imgSize = {
              TYPE_GAMES: "136x190",
              TYPE_CONTENT: "320x180"
            }),
            (c.player = { imgSize: "60x60" });
          break;
        case 576:
          (c.movieList.count = { TYPE_GAMES: 5, TYPE_CONTENT: 2 }),
            (c.movieList.imgSize = {
              TYPE_GAMES: "90x120",
              TYPE_CONTENT: "220x120"
            }),
            (c.player = { imgSize: "40x40" });
          break;
        case 480:
          (c.movieList.count = { TYPE_GAMES: 5, TYPE_CONTENT: 2 }),
            (c.movieList.imgSize = {
              TYPE_GAMES: "90x120",
              TYPE_CONTENT: "220x120"
            }),
            (c.player = { imgSize: "40x40" });
      }
      r.navigate("pageService");
    }),
      (e.exports = s);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a,
      s,
      o = "pagePlayer",
      r = document.getElementById(o),
      c = i(6),
      l = new c({ $node: r }),
      d = i(4),
      h = i(1),
      u = (i(5), i(2)),
      p = i(28),
      m = i(35),
      v = i(40),
      f = i(7),
      g = new v({ $node: document.getElementById("playerProgressBar") }),
      y = { current: 0, list: [], currentMedia: {} },
      E = {
        aspects: { fit: "Original", big: "Big", opt: "Optimal", exp: "Zoom" }
      },
      T = document.getElementById("playerHeaderTitle"),
      w = document.getElementById("playerHeaderImg"),
      b = document.getElementById("playerHeaderGame"),
      S = document.getElementById("playerTotalDuration"),
      I = document.getElementById("playerCurrentDuration"),
      k = document.getElementById("playerProgressBar"),
      _ = document.getElementById("playerButtonPlay"),
      x = document.getElementById("playerAspect");
    (l.play = function(e) {
      a.show(),
        (a.attach = !1),
        (s.keyBlock = !0),
        (e = e || {}),
        (n = f.current.plugin),
        g.set(0),
        (T.innerText = e.content.title),
        (b.innerText = e.content.game || ""),
        (w.src = e.img.replace("{width}x{height}", u.player.imgSize) || ""),
        (S.innerText = "00:00"),
        (I.innerText = "00:00"),
        (_.className = "icon-pause2"),
        6 === e.content.system.type
          ? ((s.stream = !0),
            k.classList.add("invisible"),
            I.classList.add("invisible"),
            S.classList.add("invisible"))
          : ((s.stream = !1),
            k.classList.remove("invisible"),
            I.classList.remove("invisible"),
            S.classList.remove("invisible")),
        n.getCursor({ item: e.content }, function(e, t) {
          n.getNext(t, function(e, t) {
            var i;
            return (
              (y.list = t),
              (y.current = 0),
              (i = y.list[0]),
              0 === t.length ? void s.emit("content:error") : void s.play(i.url)
            );
          });
        }),
        d.navigate("pagePlayer");
    }),
      l.addListener("load", function() {
        (s = new m({
          $node: document.getElementById("twitchPlayer"),
          rewindTimeout: 600,
          events: {
            keydown: function(e) {
              if (!s.keyBlock) {
                switch (e.code) {
                  case h.info:
                    return void a.display();
                  case h.ok:
                  case h.playPause:
                    this.playPause();
                    break;
                  case h.stop:
                    this.stop();
                    break;
                  case h.forward:
                  case h.right:
                    s.stream || this.rewind(!0);
                    break;
                  case h.rewind:
                  case h.left:
                    s.stream || this.rewind(!1);
                    break;
                  case h.f4:
                  case 117:
                    this.nextAspect();
                }
                a.display(5);
              }
            }
          }
        })),
          (a = new p({ $node: document.getElementById("playerPanel") })),
          l.add(s),
          s.add(a),
          (x.innerText = "Aspect: Original"),
          s.addListeners({
            duration: function(e) {
              this.rewindHelper.isActive ||
                this.setModeHelper.active ||
                s.stream ||
                (g.set(e.sec), (I.innerText = e.time));
            },
            "get:info": function(e) {
              s.stream ||
                ((S.innerText = e.totalDuration),
                g.init({ value: 0, max: e.totalDurationSec })),
                (s.keyBlock = !1),
                a.display(5);
            },
            rewind: function(e) {
              var t = s.parseTime(e.time),
                i = "";
              g.set(e.time),
                +t.hour && (i += t.hour + ":"),
                (i += t.min + ":" + t.sec),
                (I.innerText = i);
            },
            "aspect:change": function(e) {
              x.innerText = "Aspect: " + E.aspects[e.name];
            },
            "content:end": function() {
              y.current < y.list.length - 1
                ? (y.current++, s.play(y.list[y.current].url))
                : d.back();
            },
            "content:error": function() {
              y.current < y.list.length - 1
                ? (y.current++, s.play(y.list[y.current].url))
                : d.back();
            },
            pause: function(e) {
              e.state
                ? (_.className = "icon-play3")
                : (_.className = "icon-pause2");
            }
          }),
          (w.onload = function() {
            w.classList.remove("invisible");
          }),
          (w.onerror = function() {
            w.classList.add("invisible");
          });
      }),
      l.addListener("show", function() {
        s.focus();
      }),
      l.addListener("keydown", function(e) {
        switch (e.code) {
          case h.back:
            s.stop(), d.navigate("pageVideoList");
            break;
          case h.stop:
            s.stop(), d.navigate("pageVideoList");
            break;
          case h.exit:
            s.stop(), window.parent !== window && d.navigate("pageVideoList");
        }
      }),
      l.addListener("hide", function() {
        w.classList.remove("invisible"),
          a.displayTimeout &&
            (clearTimeout(a.displayTimeout), (a.displayTimeout = !1));
      }),
      (e.exports = l);
  },
  function(e, t, i) {
    "use strict";
    var n = {},
      a = {
        method: "GET",
        async: !0,
        headers: {},
        type: "text",
        data: null,
        timeout: 3e4,
        onload: null,
        onerror: null,
        ontimeout: null
      },
      s = Object.keys(a);
    (n.ajax = function(e, t) {
      var i, n, o;
      if (
        ((t = t || {}),
        e && ("string" == typeof e || e instanceof String) && e.length > 0)
      ) {
        if (t && "object" == typeof t)
          for (i = 0; i < s.length; i++)
            void 0 === t[s[i]] && (t[s[i]] = a[s[i]]);
        if (
          ((o = new XMLHttpRequest()),
          o.open(t.method, e, t.async),
          t.headers && "object" == typeof t.headers)
        )
          for (n = Object.keys(t.headers), i = 0; i < n.length; i++)
            o.setRequestHeader(n[i], t.headers[n[i]]);
        return (
          (o.responseType = t.type),
          (o.timeout = t.timeout),
          t.onload &&
            "function" == typeof t.onload &&
            (o.onload = function() {
              t.onload.call(
                this,
                this.response || this.responseText,
                this.status
              );
            }),
          (o.onerror = t.onerror),
          (o.ontimeout = t.ontimeout),
          o.send(t.data ? JSON.stringify(t.data) : null),
          o
        );
      }
      return !1;
    }),
      (n.encode = function(e) {
        var t,
          i,
          n = [];
        if (e && "object" == typeof e) {
          for (i = Object.keys(e), t = 0; t < i.length; t++)
            n.push(
              encodeURIComponent(i[t]) + "=" + encodeURIComponent(e[i[t]])
            );
          if (n.length > 0) return n.join("&");
        }
        return null;
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        a.call(this, e),
        this.$node === this.$body &&
          ((this.$body = document.createElement("div")),
          (this.$body.className = "body"),
          (this.$wrapper = document.createElement("div")),
          (this.$wrapper.className = "wrapper"),
          this.$wrapper.appendChild(this.$body),
          this.$node.appendChild(
            document.createElement("div").appendChild(this.$wrapper).parentNode
          )),
        this.$node.classList.add("modalBox"),
        this.$node.classList.add("multiplexModalBox");
    }
    var a = i(3);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (e.exports = n);
  },
  function(e, t) {
    "use strict";
    e.exports = {
      en: [
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          { value: "", id: "keyBackspace", img: "key.del", underline: "red" }
        ],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "_", "&"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-", "?"],
        [
          "#",
          { value: "", id: "keyUp", img: "key.up" },
          { value: " ", id: "keySpace", colSpan: 7 },
          { value: "", id: "keyLeft", img: "key.left" },
          { value: "", id: "keyRight", img: "key.right" }
        ]
      ],
      ru: [
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          "@",
          { value: "", id: "keyBackspace", img: "key.del", underline: "red" }
        ],
        ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
        ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "?"],
        ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "-"],
        [
          { value: "Ру", id: "keyLang", underline: "yellow" },
          { value: "", id: "keyUp", img: "key.up" },
          { value: " ", id: "keySpace", colSpan: 7 },
          { value: "", id: "keyLeft", img: "key.left" },
          { value: "", id: "keyRight", img: "key.right" },
          { value: "", disable: !0 }
        ]
      ]
    };
  },
  function(e, t) {
    "use strict";
    e.exports = {
      480: {
        height: 480,
        width: 720,
        availTop: 24,
        availBottom: 24,
        availRight: 32,
        availLeft: 48
      },
      576: {
        height: 576,
        width: 720,
        availTop: 24,
        availBottom: 24,
        availRight: 28,
        availLeft: 54
      },
      720: {
        height: 720,
        width: 1280,
        availTop: 20,
        availBottom: 20,
        availRight: 20,
        availLeft: 20
      },
      1080: {
        height: 1080,
        width: 1920,
        availTop: 15,
        availBottom: 15,
        availRight: 15,
        availLeft: 15
      }
    };
  },
  function(e, t) {
    "use strict";
    e.exports = {
      parse: function(e) {
        var t = {};
        return (
          e.split("&").forEach(function(e) {
            (e = e.split("=")),
              2 === e.length && (t[e[0]] = decodeURIComponent(e[1]));
          }),
          t
        );
      },
      stringify: function(e) {
        var t = [];
        return (
          Object.keys(e).forEach(function(i) {
            t.push(i + "=" + encodeURIComponent(e[i]));
          }),
          t.join("&")
        );
      }
    };
  },
  function(e, t, i) {
    "use strict";
    var n = i(26).parse;
    e.exports = function() {
      var e = n(location.search.substring(1));
      return e.referrer
        ? e.referrer
        : !!document.referrer &&
            (location.href.split("#")[0] !== document.referrer &&
              document.referrer);
    };
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        a.call(this, e),
        (this.displayTimeout = 0),
        (this.attach = !1),
        this.$node.classList.add("playerPanel");
    }
    var a = i(9);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.display = function(e) {
        var t = this;
        if (e) {
          if (this.attach) return;
          (e *= 1e3),
            this.show(),
            this.displayTimeout &&
              (clearTimeout(this.displayTimeout), (this.displayTimeout = 0)),
            (this.displayTimeout = setTimeout(function() {
              t.hide(), (t.displayTimeout = 0);
            }, e));
        } else
          this.displayTimeout
            ? (clearTimeout(this.displayTimeout),
              (this.displayTimeout = 0),
              this.hide())
            : (this.attach ? this.hide() : this.show(),
              (this.attach = !this.attach));
      }),
      (e.exports = n);
  },
  function(e, t) {
    "use strict";
    function i() {
      (this.type = null),
        (this.page = 1),
        (this.cache = { data: [], head: null, tail: null });
    }
    (i.prototype.getFirst = function() {}),
      (i.prototype.getNext = function() {}),
      (i.prototype.getPrev = function() {}),
      (e.exports = i);
  },
  function(e, t, i) {
    "use strict";
    var n,
      a,
      s,
      o,
      r,
      c,
      l = i(29),
      d = new l(),
      h = i(2),
      u = i(7),
      p = 30,
      m = 40;
    (d.getFirst = function(e, t) {
      var i = this,
        l = [];
      for (
        n = h.movieList.perLine,
          i.page = 1,
          i.type = h.dataProviderType.TYPE_SERVICE,
          i.cache.tail = 0,
          i.cache.head = 0,
          i.cache.data = [],
          a = u.current.plugin,
          r = 0,
          i.cache.botEmptyLine = !1,
          c = 0;
        c < n;
        c++
      )
        i.cache.data.push({
          value: { date: "", img: "", title: "", url: "", invisible: !0 },
          disabled: !0
        });
      (i.cache.topEmptyLine = !0),
        e.searchText && (i.type = h.dataProviderType.TYPE_SEARCH),
        a.getCursor(e, function(r, c) {
          (s = c),
            a.getCursor(e, function(e, t) {
              o = t;
            }),
            a.getNext(s, function(e, a) {
              e ||
                (a.forEach(function(e) {
                  i.cache.data.push({ value: e });
                }),
                i.cache.data.length >= 3 * n
                  ? ((l = i.cache.data.slice(0, 3 * n)),
                    (i.cache.head = 3 * n),
                    t(l, i.cache.data.slice(3 * n, 5 * n)),
                    i.cache.checkNext())
                  : i.cache.checkNext(function() {
                      (l = i.cache.data.slice(0, 3 * n)),
                        (i.cache.head = 3 * n),
                        t(l, i.cache.data.slice(3 * n, 5 * n));
                    }));
            });
        });
    }),
      (d.cache.checkNext = function(e) {
        var t = this,
          i = d.state;
        t.botEmptyLine ||
          (t.data.length < t.head + p &&
            a.getNext(s, function(a, s) {
              if (a);
              else if (s.length > 0) {
                if (d.state && i !== d.state) return !1;
                s.forEach(function(e) {
                  t.data.push({ value: e });
                }),
                  t.data.length >= 3 * n && e ? e() : t.checkNext(e);
              } else {
                for (c = 0; c < t.data.length % n; c++)
                  t.data.push({
                    value: {
                      date: "",
                      img: "",
                      title: "",
                      url: "",
                      invisible: !0
                    },
                    disabled: !0
                  }),
                    r++;
                for (c = 0; c < n; c++)
                  t.data.push({
                    value: {
                      date: "",
                      img: "",
                      title: "",
                      url: "",
                      invisible: !0
                    },
                    disabled: !0
                  });
                (r += n), (t.botEmptyLine = !0), e && e();
              }
            }),
          t.tail >= m + 3 * n &&
            a.getNext(o, function(e, i) {
              var a, s;
              if (e);
              else {
                for (
                  s = i.length,
                    t.topEmptyLine && ((s += n), (t.topEmptyLine = !1)),
                    a = 0;
                  a < s;
                  a++
                )
                  t.data.shift();
                (t.head -= s), (t.tail -= s);
              }
            }));
      }),
      (d.cache.checkPrev = function() {
        var e = this;
        e.topEmptyLine ||
          (e.tail < m - 3 * n &&
            a.getPrev(o, function(t, i) {
              if (t);
              else if (i.length > 0) {
                for (c = i.length - 1; c >= 0; c--)
                  e.data.unshift({ value: i[c] });
                (e.head += i.length), (e.tail += i.length);
              } else if (!e.topEmptyLine) {
                for (c = 0; c < n; c++)
                  e.data.unshift({
                    value: {
                      date: "",
                      img: "",
                      title: "",
                      url: "",
                      invisible: !0
                    },
                    disabled: !0
                  });
                (e.head += n), (e.tail += n), (e.topEmptyLine = !0);
              }
            }),
          e.data.length - e.head > p &&
            a.getPrev(s, function(t, i) {
              var n;
              (n = i.length),
                e.botEmptyLine && ((n += r), (e.botEmptyLine = !1)),
                e.data.splice(e.data.length - n, n);
            }));
      }),
      (d.getNext = function() {
        var e = this,
          t = [],
          i = [];
        if (e.cache.head + n <= e.cache.data.length)
          (t = e.cache.data.slice(e.cache.head, e.cache.head + n)),
            (e.cache.head += n),
            (e.cache.tail += n),
            e.cache.head + 3 * n <= e.cache.data.length &&
              (i = e.cache.data.slice(
                e.cache.head + 2 * n,
                e.cache.head + 3 * n
              )),
            this.page++,
            e.cache.checkNext();
        else if (1 === e.page && e.cache.data.length % n !== 0) {
          for (c = 0; c < (e.cache.data.length % n) + n; c++)
            e.cache.data.push({
              value: { date: "", img: "", title: "", url: "", invisible: !0 },
              disabled: !0
            }),
              r++;
          (e.cache.botEmptyLine = !0),
            (t = e.cache.data.slice(e.cache.head, e.cache.head + n)),
            (e.cache.head += n),
            (e.cache.tail += n),
            this.page++,
            e.cache.checkNext();
        } else t = null;
        return { data: t, next: i };
      }),
      (d.getPrev = function() {
        var e = this,
          t = [],
          i = [];
        return (
          e.cache.tail - n >= 0
            ? ((t = e.cache.data.slice(e.cache.tail - n, e.cache.tail)),
              (e.cache.head -= n),
              (e.cache.tail -= n),
              e.cache.tail - 2 * n >= 0 &&
                (i = e.cache.data.slice(
                  e.cache.tail - 2 * n,
                  e.cache.tail - n
                )),
              this.page--,
              e.cache.checkPrev())
            : (t = null),
          { data: t, next: i }
        );
      }),
      (e.exports = d);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      switch (e.$item.data.value.type) {
        case P.TYPE_CATEGORY:
          S.initVideoList(
            w.dataProviderType.TYPE_SERVICE,
            { item: e.$item.data.value },
            function() {
              m.navigate("pageVideoList");
            }
          );
          break;
        case P.TYPE_FOLDER:
          a(e.$item.data.value);
          break;
        case $.TYPE_BACK:
          s();
          break;
        case $.TYPE_SEARCH:
          I.initSearch(e.$item.data.value, function() {
            m.navigate("pageSearch");
          });
      }
    }
    function a(e) {
      L.push(e),
        P.getCursor({ item: e }, function(e, t) {
          P.getNext(t, function(e, t) {
            var i = [];
            0 !== t.length &&
              (i.push(C.back),
              t.forEach(function(e) {
                i.push({ value: e });
              }),
              (c.viewIndex = -1),
              c.init({ data: i, size: i.length }),
              c.$body.children[1]
                ? c.focusItem(c.$body.children[1])
                : c.focusItem(c.$body.children[0]));
          });
        });
    }
    function s() {
      1 === L.length
        ? window.parent.postMessage("hide", "*")
        : 2 === L.length
        ? p.initService(null, function() {
            c.focus();
          })
        : (L.pop(),
          P.getCursor({ item: L[L.length - 1] }, function(e, t) {
            var i = [];
            P.getNext(t, function(e, t) {
              0 !== L.length && i.push(C.back),
                t.forEach(function(e) {
                  i.push({ value: e });
                }),
                (c.viewIndex = -1),
                c.init({ data: i, size: i.length }),
                c.focusItem(c.$body.children[0]);
            });
          }));
    }
    var o,
      r,
      c,
      l,
      d = "pageService",
      h = document.getElementById(d),
      u = i(6),
      p = new u({ $node: h }),
      m = i(4),
      v = i(1),
      f = i(9),
      g = i(39),
      y = i(23),
      E = i(13),
      T = i(5),
      w = i(2),
      b = i(7),
      S = i(12),
      I = i(11),
      k = new y({
        visible: !1,
        events: {
          show: function() {
            k.okBtn.focus();
          },
          hide: function() {
            l.focus();
          }
        }
      }),
      _ = document.getElementById("pageServiceCatImg"),
      x = document.getElementById("pageServiceLogo"),
      P = {},
      L = [],
      $ = { TYPE_BACK: 20, TYPE_SEARCH_LIST: 12, TYPE_SEARCH: 13 },
      C = {
        back: {
          value: { title: "Back", specialClass: "backItem", type: $.TYPE_BACK }
        },
        searchArr: []
      },
      O = [];
    p.addListener("load", function() {
      (o = new f({
        focusable: !1,
        $node: document.getElementById("pageServiceWrapper")
      })),
        p.add(o),
        (r = new f({
          $node: document.getElementById("pageServiceRightPanel")
        })),
        o.add(r),
        p.initService(null, function() {}),
        p.add(k),
        k.add((k.title = new f())),
        (k.title.$body.innerText = "Are you sure you want to exit?"),
        k.add(
          (k.okBtn = new E({
            value: "Exit",
            events: {
              keydown: function(e) {
                switch (
                  (E.prototype.defaultEvents.keydown.call(this, e), e.code)
                ) {
                  case v.right:
                    k.cancelBtn.focus();
                    break;
                  case v.back:
                  case v.exit:
                    k.hide(), (e.stop = !0);
                }
              },
              click: function() {
                window.location.href =
                  i(27)() || "file:///home/web/services.html";
              }
            }
          }))
        ),
        k.add(
          (k.cancelBtn = new E({
            value: "Cancel",
            events: {
              keydown: function(e) {
                switch (
                  (E.prototype.defaultEvents.keydown.call(this, e), e.code)
                ) {
                  case v.left:
                    k.okBtn.focus();
                    break;
                  case v.back:
                  case v.exit:
                    k.hide(), (e.stop = !0);
                }
              },
              click: function() {
                k.hide();
              }
            }
          }))
        );
    }),
      p.addListener("show", function() {
        try {
          c.focus(), c.focusItem(c.$focusItem);
        } catch (e) {}
        window.breadcrumb = [];
      }),
      (p.initService = function(e, t, i) {
        var a = document.getElementById("pageServiceDescription");
        x.classList.add("logo"),
          (O = []),
          (a.innerText =
            "Twitch is the world’s leading video platform and community for gamers, with more than 100 million visitors per month. We connect gamers from around the world by allowing them to broadcast, watch, and chat with each other."),
          b.loadPlugin(e, function() {
            (P = b.current.plugin),
              (P.info = { serviceId: e }),
              (L = [P.root]),
              (window.breadcrumb = []),
              P.getCursor({ item: P.root }, function(e, a) {
                e && i(),
                  P.getNext(a, function(e, i) {
                    i.forEach(function(e) {
                      O.push({ value: e });
                    }),
                      P.root.searchable &&
                        O.unshift({
                          value: {
                            title: "Search",
                            type: $.TYPE_SEARCH,
                            img: "http://wimeo.h.od.ua/data/img/0.png"
                          }
                        }),
                      c && c.remove(),
                      (c = new g({
                        data: O,
                        size: O.length,
                        render: function(e, t) {
                          var i = document.createElement("div"),
                            n = document.createElement("div");
                          (e.innerHTML = ""),
                            (n.className = "text"),
                            (i.className = "wrapper"),
                            (n.innerText = t.value.title),
                            t.value.specialClass
                              ? i.classList.add(t.value.specialClass)
                              : (i.className = "wrapper"),
                            t.value.searchType &&
                              (e.data.value.searchType = t.value.searchType),
                            i.appendChild(n),
                            e.appendChild(i);
                        }
                      })),
                      r.add(c),
                      c.addListeners({
                        "click:item": n,
                        "focus:item": function(e) {
                          (c.$node.style.top =
                            p.$node.offsetHeight / 2 -
                            c.$focusItem.index * c.$focusItem.offsetHeight -
                            c.$focusItem.offsetHeight / 2 +
                            "px"),
                            e.$curr.data.value.img &&
                              (_.src =
                                "img/" +
                                T.data.metrics.height +
                                "/" +
                                e.$curr.data.value.img);
                        }
                      }),
                      (c.$node.style.top =
                        p.$node.offsetHeight / 2 -
                        c.$node.firstChild.offsetHeight / 2 +
                        "px"),
                      c.focus(),
                      c.focusIndex(0),
                      t();
                  });
              });
          });
      }),
      p.addListener("keydown", function(e) {
        switch (e.code) {
          case v.back:
            s();
            break;
          case v.exit:
            window.parent === window &&
              ((e.stop = !0),
              L.length > 1
                ? p.initService(null, function() {
                    c.focus();
                  })
                : ((l = m.current.activeComponent), k.show()));
        }
      }),
      (e.exports = p);
  },
  function(e, t) {
    "use strict";
    e.exports = {
      main: [
        {
          title: "Games",
          type: 2,
          img: "icon.1.png",
          system: { type: 2 },
          url: "https://api.twitch.tv/kraken/games/top?limit=20&offset="
        },
        { title: "Channels", type: 13, img: "icon.2.png", system: { type: 3 } },
        {
          title: "Videos",
          type: 2,
          img: "icon.3.png",
          url: "https://api.twitch.tv/kraken/videos/top",
          system: { type: 9 }
        }
      ]
    };
  },
  function(e, t, i) {
    "use strict";
    function n(e, t, i, n) {
      var a = new XMLHttpRequest();
      return "callback" === n
        ? (i(), !0)
        : ((a.onreadystatechange = function() {
            var e;
            4 === a.readyState &&
              ((e =
                "xml" === n
                  ? a.responseXML
                  : "json" === n
                  ? JSON.parse(a.responseText)
                  : a.responseText),
              i(e, a.status));
          }),
          a.open(e, t, !0),
          "json" === n &&
            (a.setRequestHeader("Accept", "application/json"),
            a.setRequestHeader("Client-ID", o.api.appId)),
          a.send(),
          a);
    }
    var a = {
        TYPE_ROOT: 1,
        TYPE_CATEGORY: 2,
        TYPE_FOLDER: 3,
        TYPE_MOVIE: 4,
        TYPE_FILE: 5
      },
      s = {
        TYPE_ROOT: 1,
        TYPE_GAME_LIST: 2,
        TYPE_CHANNELS_LIST: 3,
        TYPE_VIDEO_LIST: 4,
        TYPE_GAME: 5,
        TYPE_STREAM: 6,
        TYPE_VIDEO: 7,
        TYPE_VIDEO_STREAM: 8,
        TYPE_VIDEOS_TOP: 9
      },
      o = i(2),
      r = i(32);
    (a.root = {
      title: "twitch",
      url: "twitch.tv",
      img: "",
      type: a.TYPE_ROOT,
      system: { type: a.TYPE_ROOT, search: [] },
      searchable: !1
    }),
      (a.getNext = function(e, t) {
        var i, o, c;
        switch ((e.page++, e.system.type)) {
          case s.TYPE_ROOT:
            if (
              ((c = "callback"),
              (i = "http://192.168.1.53:8033/main.json"),
              e.page > 0)
            )
              return void t(!1, []);
            o = function() {
              t(!0, r.main);
            };
            break;
          case s.TYPE_GAME_LIST:
            (c = "json"),
              (i = e.url + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.top.length && e.page > 0
                  ? void t(n, [])
                  : (i.top.forEach(function(e) {
                      o.push({
                        title: e.game.name,
                        img: e.game.box.template,
                        type: a.TYPE_FOLDER,
                        url:
                          "https://api.twitch.tv/kraken/streams?game=" +
                          encodeURIComponent(e.game.name) +
                          "&limit=20&offset=",
                        system: { type: s.TYPE_GAME }
                      });
                    }),
                    void t(n, o));
              });
            break;
          case s.TYPE_GAME:
            (c = "json"),
              (i = e.url + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.streams.length && e.page > 0
                  ? void t(n, [])
                  : (i.streams.forEach(function(e) {
                      o.push({
                        title: e.channel.display_name,
                        img: e.preview.template,
                        type: a.TYPE_MOVIE,
                        url: e.channel.name,
                        game: e.game,
                        viewers: e.viewers,
                        channelImg: e.channel.logo || e.preview.template,
                        system: { type: s.TYPE_STREAM }
                      });
                    }),
                    void t(n, o));
              });
            break;
          case s.TYPE_STREAM:
            (c = "json"),
              (i =
                "https://api.twitch.tv/api/channels/" +
                e.url +
                "/access_token"),
              (o = function(i) {
                var n;
                (i.token = encodeURIComponent(i.token)),
                  (n =
                    "http://usher.twitch.tv/api/channel/hls/" +
                    e.url +
                    ".m3u8?player=twitchweb&token=" +
                    i.token +
                    "&sig=" +
                    i.sig +
                    "&allow_audio_only=true&allow_source=true&type=any&p=9343"),
                  t(!1, [{ url: n, title: "stream" }]);
              });
            break;
          case s.TYPE_CHANNELS_LIST:
            (c = "json"),
              (i = e.url + "&limit=20&offset=" + 20 * e.page),
              (o = function(e) {
                var i = !1,
                  n = [];
                return 0 === e.channels.length
                  ? void t(i, [])
                  : (e.channels.forEach(function(e) {
                      n.push({
                        title: e.display_name,
                        url: e._links.videos,
                        img: e.video_banner
                          ? e.video_banner.replace(
                              "640x360",
                              "{width}x{height}"
                            )
                          : e.logo,
                        type: a.TYPE_FOLDER,
                        channelImg: e.video_banner
                          ? e.video_banner.replace(
                              "640x360",
                              "{width}x{height}"
                            )
                          : e.logo,
                        system: { type: s.TYPE_VIDEO_LIST }
                      });
                    }),
                    void t(i, n));
              });
            break;
          case s.TYPE_VIDEO_LIST:
            (c = "json"),
              (i = e.url + "?limit=20&offset=" + 20 * e.page),
              (o = function(i) {
                var o,
                  r = !1,
                  c = [];
                return 0 === i.videos.length && e.page > 0
                  ? void t(r, [])
                  : (i.videos.forEach(function(e) {
                      "c" === e._id[0]
                        ? c.push({
                            title: e.title,
                            url: "https://api.twitch.tv/api/videos/" + e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO }
                          })
                        : "v" === e._id[0] &&
                          c.push({
                            title: e.title,
                            url: e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO_STREAM }
                          });
                    }),
                    void (0 === e.page
                      ? ((o = e.url
                          .replace("/channels/", "/streams/")
                          .replace("/videos", "")),
                        n(
                          "GET",
                          o,
                          function(e) {
                            null !== e.stream &&
                              c.unshift({
                                title: "Stream: " + e.stream.game,
                                url: e.stream.channel.name,
                                type: a.TYPE_MOVIE,
                                img: e.stream.preview.medium,
                                channelImg: e.stream.channel.logo,
                                system: { type: s.TYPE_STREAM }
                              }),
                              t(r, c);
                          },
                          "json"
                        ))
                      : t(r, c)));
              });
            break;
          case s.TYPE_VIDEO:
            (c = "json"),
              (i = e.url),
              (o = function(e) {
                var i,
                  n,
                  s = !1,
                  o = [];
                if (
                  ((i =
                    e.chunks["480p"] ||
                    e.chunks["360p"] ||
                    e.chunks.live ||
                    e.chunks["240p"] ||
                    !1),
                  i === !1)
                )
                  return void t(!0, []);
                for (n = 0; n < i.length; n++)
                  o.push({
                    title: "part " + n,
                    url: i[n].url,
                    type: a.TYPE_FILE
                  });
                t(s, o);
              });
            break;
          case s.TYPE_VIDEO_STREAM:
            (c = "json"),
              (i =
                "https://api.twitch.tv/api/vods/" +
                e.url.slice(1) +
                "/access_token"),
              (o = function(i) {
                var n =
                  "http://usher.twitch.tv/vod/" +
                  e.url.slice(1) +
                  "?nauthsig=" +
                  i.sig +
                  "&nauth=" +
                  i.token;
                t(!1, [{ url: n, title: "video" }]);
              });
            break;
          case s.TYPE_VIDEOS_TOP:
            (c = "json"),
              (i = e.url + "?limit=20&offset=" + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.videos.length && e.page > 0
                  ? void t(n, [])
                  : (i.videos.forEach(function(e) {
                      "c" === e._id[0]
                        ? o.push({
                            title: e.title,
                            url: "https://api.twitch.tv/api/videos/" + e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            channelImg: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO }
                          })
                        : "v" === e._id[0] &&
                          o.push({
                            title: e.title,
                            url: e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            channelImg: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO_STREAM }
                          });
                    }),
                    void t(n, o));
              });
        }
        o ? n("GET", i, o, c) : t(!1, {});
      }),
      (a.getPrev = function(e, t) {
        var i, o, c;
        if (e.page < 0) return void t(!1, []);
        switch (e.system.type) {
          case s.TYPE_ROOT:
            if (
              ((c = "callback"),
              (i = "http://192.168.1.53:8033/main.json"),
              e.page > 0)
            )
              return void t(!1, []);
            o = function() {
              t(!0, r.main);
            };
            break;
          case s.TYPE_GAME_LIST:
            (c = "json"),
              (i = e.url + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.top.length && e.page > 0
                  ? void t(n, [])
                  : (i.top.forEach(function(e) {
                      o.push({
                        title: e.game.name,
                        img: e.game.box.template,
                        type: a.TYPE_FOLDER,
                        url:
                          "https://api.twitch.tv/kraken/streams?game=" +
                          encodeURIComponent(e.game.name) +
                          "&limit=20&offset=",
                        system: { type: s.TYPE_GAME }
                      });
                    }),
                    void t(n, o));
              });
            break;
          case s.TYPE_GAME:
            (c = "json"),
              (i = e.url + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.streams.length && e.page > 0
                  ? void t(n, [])
                  : (i.streams.forEach(function(e) {
                      o.push({
                        title: e.channel.display_name,
                        img: e.preview.template,
                        type: a.TYPE_MOVIE,
                        url: e.channel.name,
                        game: e.game,
                        viewers: e.viewers,
                        channelImg: e.channel.logo || e.preview.template,
                        system: { type: s.TYPE_STREAM }
                      });
                    }),
                    void t(n, o));
              });
            break;
          case s.TYPE_STREAM:
            (c = "json"),
              (i =
                "https://api.twitch.tv/api/channels/" +
                e.url +
                "/access_token"),
              (o = function(i) {
                var n;
                (i.token = encodeURIComponent(i.token)),
                  (n =
                    "http://usher.twitch.tv/api/channel/hls/" +
                    e.url +
                    ".m3u8?player=twitchweb&token=" +
                    i.token +
                    "&sig=" +
                    i.sig +
                    "&allow_audio_only=true&allow_source=true&type=any&p=9343"),
                  t(!1, [{ url: n, title: "stream" }]);
              });
            break;
          case s.TYPE_CHANNELS_LIST:
            (c = "json"),
              (i = e.url + "&limit=20&offset=" + 20 * e.page),
              (o = function(e) {
                var i = !1,
                  n = [];
                return 0 === e.channels.length
                  ? void t(i, [])
                  : (e.channels.forEach(function(e) {
                      n.push({
                        title: e.display_name,
                        url: e._links.videos,
                        img: e.video_banner
                          ? e.video_banner.replace(
                              "640x360",
                              "{width}x{height}"
                            )
                          : e.logo,
                        type: a.TYPE_FOLDER,
                        channelImg: e.video_banner
                          ? e.video_banner.replace(
                              "640x360",
                              "{width}x{height}"
                            )
                          : e.logo,
                        system: { type: s.TYPE_VIDEO_LIST }
                      });
                    }),
                    void t(i, n));
              });
            break;
          case s.TYPE_VIDEO_LIST:
            (c = "json"),
              (i = e.url + "?limit=20&offset=" + 20 * e.page),
              (o = function(i) {
                var o,
                  r = !1,
                  c = [];
                return 0 === i.videos.length && e.page > 0
                  ? void t(r, [])
                  : (i.videos.forEach(function(e) {
                      "c" === e._id[0]
                        ? c.push({
                            title: e.title,
                            url: "https://api.twitch.tv/api/videos/" + e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO }
                          })
                        : "v" === e._id[0] &&
                          c.push({
                            title: e.title,
                            url: e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO_STREAM }
                          });
                    }),
                    void (0 === e.page
                      ? ((o = e.url
                          .replace("/channels/", "/streams/")
                          .replace("/videos", "")),
                        n(
                          "GET",
                          o,
                          function(e) {
                            null !== e.stream &&
                              c.unshift({
                                title: "Stream: " + e.stream.game,
                                url: e.stream.channel.name,
                                type: a.TYPE_MOVIE,
                                img: e.stream.preview.medium,
                                channelImg: e.stream.channel.logo,
                                system: { type: s.TYPE_STREAM }
                              }),
                              t(r, c);
                          },
                          "json"
                        ))
                      : t(r, c)));
              });
            break;
          case s.TYPE_VIDEO:
            (c = "json"),
              (i = e.url),
              (o = function(e) {
                var i,
                  n,
                  s = !1,
                  o = [];
                if (
                  ((i =
                    e.chunks["480p"] ||
                    e.chunks["360p"] ||
                    e.chunks.live ||
                    e.chunks["240p"] ||
                    !1),
                  i === !1)
                )
                  return void t(!0, []);
                for (n = 0; n < i.length; n++)
                  o.push({
                    title: "part " + n,
                    url: i[n].url,
                    type: a.TYPE_FILE
                  });
                t(s, o);
              });
            break;
          case s.TYPE_VIDEO_STREAM:
            (c = "json"),
              (i =
                "https://api.twitch.tv/api/vods/" +
                e.url.slice(1) +
                "/access_token"),
              (o = function(i) {
                var n =
                  "http://usher.twitch.tv/vod/" +
                  e.url.slice(1) +
                  "?nauthsig=" +
                  i.sig +
                  "&nauth=" +
                  i.token;
                t(!1, [{ url: n, title: "video" }]);
              });
            break;
          case s.TYPE_VIDEOS_TOP:
            (c = "json"),
              (i = e.url + "?limit=20&offset=" + 20 * e.page),
              (o = function(i) {
                var n = !1,
                  o = [];
                return 0 === i.videos.length && e.page > 0
                  ? void t(n, [])
                  : (i.videos.forEach(function(e) {
                      "c" === e._id[0]
                        ? o.push({
                            title: e.title,
                            url: "https://api.twitch.tv/api/videos/" + e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            channelImg: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO }
                          })
                        : "v" === e._id[0] &&
                          o.push({
                            title: e.title,
                            url: e._id,
                            img: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            channelImg: e.preview.replace(
                              "320x240",
                              "{width}x{height}"
                            ),
                            type: a.TYPE_MOVIE,
                            system: { type: s.TYPE_VIDEO_STREAM }
                          });
                    }),
                    void t(n, o));
              });
        }
        e.page--, o ? n("GET", i, o, c) : t(!1, {});
      }),
      (a.getCursor = function(e, t) {
        var i = !1,
          n = e.item.system.type,
          a = e.item.url;
        (e = e || {}),
          e.searchText &&
            n === s.TYPE_CHANNELS_LIST &&
            (a =
              "https://api.twitch.tv/kraken/search/channels?q=" + e.searchText),
          e.sortType && (a = e.sortType.url),
          t(i, { page: -1, url: a, system: { type: n } });
      }),
      (a.getInfo = function(e, t) {
        t(e);
      }),
      (e.exports = a);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      a.call(this), (this.data = e || {});
    }
    var a = i(8);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.idName = "id"),
      (n.prototype.clear = function() {
        var e = this.data;
        return (
          Object.keys(e).length > 0 &&
          ((this.data = {}),
          this.events.clear && this.emit("clear", { data: e }),
          !0)
        );
      }),
      (n.prototype.init = function(e) {
        return (
          !!e &&
          (this.clear(),
          (this.data = e),
          this.events.init && this.emit("init", { data: e }),
          !0)
        );
      }),
      (n.prototype.has = function(e) {
        return this.data.hasOwnProperty(e);
      }),
      (n.prototype.get = function(e) {
        return this.data[e];
      }),
      (n.prototype.set = function(e, t) {
        var i = e in this.data,
          n = { name: e, curr: t };
        return i
          ? ((n.prev = this.data[e]),
            t !== n.prev &&
              ((this.data[e] = t),
              this.events.change && this.emit("change", n),
              !0))
          : ((this.data[e] = t),
            this.events.change && this.emit("change", n),
            !0);
      }),
      (n.prototype.unset = function(e) {
        var t,
          i = e in this.data;
        return (
          !!i &&
          ((t = { name: e, prev: this.data[e] }),
          delete this.data[e],
          this.events.change && this.emit("change", t),
          !0)
        );
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      var t = this;
      (this.isPLaying = !1),
        (this.playUrl = ""),
        (this.isPause = !1),
        (this.totalDuration = ""),
        (this.totalDurationSec = 0),
        (this.currentTime = ""),
        (this.currentSec = 0),
        (this.rewindHelper = {
          isActive: !1,
          startTime: 0,
          time: 0,
          timeout: 0,
          duration: void 0,
          timeoutDuration: !1
        }),
        (this.setModeHelper = {
          active: !1,
          timeout: 0,
          time: 0,
          timeStr: "",
          count: 0,
          length: 0,
          sec: 0,
          timeoutDuration: 0
        }),
        (this.audioPIDs = []),
        (this.currentAudioPID = 0),
        (this.activeAspect = 0),
        (this.subtitlePIDs = []),
        (this.currentSubtitle = null),
        (this.durationInterval = 0),
        (this.allowInputPosition = !0),
        (e = e || {}),
        o.call(this, e),
        this.$node.classList.add("player"),
        this.init(e),
        a.addListener("media", function(e) {
          n.prototype.mediaListener.call(t, e);
        });
    }
    var a = i(5),
      s = i(1),
      o = i(3);
    (n.prototype = Object.create(o.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.ASPECT_TYPE_FIT = 16),
      (n.prototype.ASPECT_TYPE_BIG = 64),
      (n.prototype.ASPECT_TYPE_OPTIMAL = 80),
      (n.prototype.ASPECT_TYPE_ZOOM = 0),
      (n.prototype.aspects = [
        { name: "fit", mode: n.prototype.ASPECT_TYPE_FIT },
        { name: "big", mode: n.prototype.ASPECT_TYPE_BIG },
        { name: "opt", mode: n.prototype.ASPECT_TYPE_OPTIMAL },
        { name: "exp", mode: n.prototype.ASPECT_TYPE_ZOOM }
      ]),
      (n.prototype.STEREO_MODE_OFF = 0),
      (n.prototype.STEREO_MODE_OVER_UNDER = 1),
      (n.prototype.STEREO_MODE_OVER_UNDER_HD = 2),
      (n.prototype.STEREO_MODE_SIDE_BY_SIDE = 3),
      (n.prototype.stereoModes = [
        { mode: n.prototype.STEREO_MODE_OFF, name: "Off" },
        { mode: n.prototype.STEREO_MODE_OVER_UNDER, name: "Over-Under" },
        { mode: n.prototype.STEREO_MODE_OVER_UNDER_HD, name: "Over-Under HD" },
        { mode: n.prototype.STEREO_MODE_SIDE_BY_SIDE, name: "Side-by-side" }
      ]),
      (n.prototype.defaultEvents = {
        keydown: function(e) {
          switch (e.code) {
            case s.ok:
            case s.playPause:
              this.playPause();
              break;
            case s.stop:
              this.stop();
              break;
            case s.forward:
            case s.right:
              this.rewind(!0);
              break;
            case s.rewind:
            case s.left:
              this.rewind(!1);
              break;
            case s.f4:
            case 117:
              this.nextAspect();
              break;
            case s.f1:
              this.nextAudioTrack();
              break;
            case s.f2:
              this.nextSubtitle();
              break;
            case s.f3:
              this.nextViewMode();
              break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
              this.inputPosition(e.code);
          }
        }
      }),
      (n.prototype.mediaListener = function(e) {
        var t,
          i,
          n,
          s,
          o,
          r,
          c = this,
          l = {};
        switch (e.code) {
          case a.EVENT_PLAYBACK_BEGIN:
            (c.isPLaying = !0),
              c.durationInterval &&
                (clearInterval(c.durationInterval), (c.durationInterval = 0)),
              (c.durationInterval = setInterval(function() {
                (c.currentSec = gSTB.GetPosTime()),
                  (i = c.parseTime(c.currentSec)),
                  (c.currentTime =
                    (i.hour > 0 ? i.hour + ":" : "") + i.min + ":" + i.sec),
                  c.emit("duration", {
                    sec: c.currentSec,
                    time: c.currentTime
                  });
              }, 1e3));
            break;
          case a.EVENT_GET_MEDIA_INFO:
            (c.totalDurationSec = gSTB.GetMediaLen()),
              c.totalDurationSec > 3600
                ? (c.setModeHelper.length = 6)
                : (c.setModeHelper.length = 4),
              (t = c.parseTime(gSTB.GetMediaLen())),
              (c.totalDuration =
                (t.hour > 0 ? t.hour + ":" : "") + t.min + ":" + t.sec),
              (l.totalDuration = c.totalDuration),
              (l.totalDurationSec = c.totalDurationSec);
            try {
              (o = gSTB
                .GetAudioPIDs()
                .replace(/pid:/g, '"pid":')
                .replace(/lang:/g, '"lang":')),
                (c.audioPIDs = JSON.parse(o));
            } catch (e) {}
            try {
              (r = gSTB
                .GetSubtitlePIDs()
                .replace(/pid:/g, '"pid":')
                .replace(/lang:/g, '"lang":')),
                (c.subtitlePIDs = JSON.parse(r));
            } catch (e) {}
            (c.currentAudioPID = 0),
              "" !== c.audioPIDs[0].lang[0]
                ? (l.audioPid = c.audioPIDs[0].lang[0])
                : (l.audioPid = void 0),
              (c.currentSubtitle = null),
              (l.subtitles = null),
              (l.stereoMode = {
                type: gSTB.Get3DConversionMode(),
                name: c.stereoModes[gSTB.Get3DConversionMode()].name
              }),
              c.emit("get:info", l);
            break;
          case a.EVENT_CONTENT_ERROR:
            (c.isPLaying = !1), c.emit("content:error");
            break;
          case a.EVENT_END_OF_FILE:
            (c.currentSec = c.totalDurationSec),
              (c.isPLaying = !1),
              c.emit("content:end");
            break;
          case a.EVENT_SUBTITLE_LOAD_ERROR:
            c.subtitlePIDs.pop();
            break;
          case a.EVENT_HDMI_DISCONNECT:
            if (
              ((n = parseInt(
                JSON.parse(gSTB.GetEnv('{"varList":["hdmi_event_delay"]}'))
                  .result.hdmi_event_delay,
                10
              )),
              0 === n)
            )
              return;
            c.hdmiEventTimeout = setTimeout(function() {
              c.isPLaying &&
                stbStorage.setItem(
                  "standByPlayback",
                  JSON.stringify({ url: c.playUrl, position: c.currentSec })
                ),
                gSTB.StandBy(!0),
                (c.hdmiEventTimeout = null);
            }, n);
            break;
          case a.EVENT_HDMI_CONNECT:
            if (
              ((n = parseInt(
                JSON.parse(gSTB.GetEnv('{"varList":["hdmi_event_delay"]}'))
                  .result.hdmi_event_delay,
                10
              )),
              0 === n)
            )
              return;
            if (c.hdmiEventTimeout)
              return (
                clearTimeout(c.hdmiEventTimeout),
                void (c.hdmiEventTimeout = null)
              );
            gSTB.StandBy(!1),
              (s = JSON.parse(stbStorage.getItem("standByPlayback"))),
              n &&
                (c.play(s.url, { position: s.position }),
                stbStorage.removeItem("standByPlayback"));
        }
      }),
      (n.prototype.init = function(e) {
        e.allowInputPosition &&
          (this.allowInputPosition = e.allowInputPosition),
          e.rewindDuration && (this.rewindHelper.duration = e.rewindDuration),
          e.rewindTimeout &&
            (this.rewindHelper.timeoutDuration = e.rewindTimeout),
          e.inputPositionTimeout &&
            (this.setModeHelper.timeoutDuration = e.inputPositionTimeout),
          gSTB.InitPlayer(),
          gSTB.SetAspect(16),
          gSTB.SetVideoControl(0),
          gSTB.SetVideoState(0),
          gSTB.SetMode(0),
          gSTB.SetWinAlphaLevel(0, 255),
          gSTB.SetWinAlphaLevel(1, 255),
          gSTB.SetPIG(1, 0, 0, 0),
          gSTB.Set3DConversionMode(0),
          gSTB.SetTopWin(0);
      }),
      (n.prototype.play = function(e, t) {
        var i, n;
        (this.totalDurationSec = 0),
          (this.currentSec = 0),
          (this.playUrl = e),
          (t = t || {}),
          (i = t.solution ? t.solution : "auto"),
          (n = " position:" + t.position),
          gSTB.Play(i + " " + e + n, t.proxy);
      }),
      (n.prototype.stop = function() {
        gSTB.Stop(),
          clearInterval(this.durationInterval),
          (this.isPLaying = !1),
          (this.isPause = !1);
      }),
      (n.prototype.playPause = function() {
        this.isPause ? gSTB.Continue() : gSTB.Pause(),
          (this.isPause = !this.isPause),
          this.emit("pause", { state: this.isPause });
      }),
      (n.prototype.rewind = function(e, t) {
        var i = this;
        (t = t || this.rewindHelper.duration || 15),
          this.rewindHelper.isActive ||
            ((this.rewindHelper.isActive = !0),
            (this.rewindHelper.startTime = this.currentSec),
            (this.rewindHelper.time = this.currentSec),
            this.emit("rewind:start")),
          e
            ? this.rewindHelper.time + t < this.totalDurationSec
              ? (this.rewindHelper.time += t)
              : (this.rewindHelper.time = this.totalDurationSec)
            : this.rewindHelper.time - t > 0
            ? (this.rewindHelper.time -= t)
            : (this.rewindHelper.time = 0),
          this.rewindHelper.timeout && clearTimeout(this.rewindHelper.timeout),
          this.emit("rewind", {
            time: this.rewindHelper.time,
            shift: this.rewindHelper.time - this.rewindHelper.startTime
          }),
          this.rewindHelper.timeoutDuration
            ? (this.rewindHelper.timeout = setTimeout(function() {
                return (
                  clearInterval(i.durationInterval),
                  (i.durationInterval = 0),
                  (i.rewindHelper.isActive = !1),
                  i.emit("rewind:apply"),
                  (i.currentSec = i.rewindHelper.time),
                  (i.rewindHelper.timeout = 0),
                  i.rewindHelper.time === i.totalDurationSec
                    ? void i.emit("content:end")
                    : void gSTB.SetPosTime(i.rewindHelper.time)
                );
              }, this.rewindHelper.timeoutDuration))
            : (clearInterval(i.durationInterval),
              (i.durationInterval = 0),
              gSTB.SetPosTime(i.rewindHelper.time),
              (i.currentSec = i.rewindHelper.time),
              (i.rewindHelper.isActive = !1),
              i.emit("rewind:apply"));
      }),
      (n.prototype.nextAudioTrack = function() {
        var e = this;
        return (
          !(this.audioPIDs.length <= 1) &&
          (this.currentAudioPID < this.audioPIDs.length - 1
            ? this.currentAudioPID++
            : (this.currentAudioPID = 0),
          gSTB.SetAudioPID(this.audioPIDs[this.currentAudioPID].pid),
          e.emit("audio:track", {
            lang: this.audioPIDs[this.currentAudioPID].lang[0],
            pid: this.audioPIDs[this.currentAudioPID].pid
          }),
          !0)
        );
      }),
      (n.prototype.setAudioTrack = function(e) {
        gSTB.SetAudioPID(this.audioPIDs[e].pid),
          (this.currentAudioPID = e),
          this.emit("audio:track", {
            lang: this.audioPIDs[this.currentAudioPID].lang[0],
            pid: this.audioPIDs[this.currentAudioPID].pid
          });
      }),
      (n.prototype.nextAspect = function() {
        this.activeAspect++,
          this.activeAspect > this.aspects.length - 1 &&
            (this.activeAspect = 0),
          gSTB.SetAspect(this.aspects[this.activeAspect].mode),
          this.emit("aspect:change", {
            type: this.aspects[this.activeAspect].mode,
            name: this.aspects[this.activeAspect].name
          });
      }),
      (n.prototype.setAspect = function(e) {
        (this.activeAspect = e),
          gSTB.SetAspect(this.aspects[this.activeAspect].mode),
          this.emit("aspect:change", {
            type: this.aspects[this.activeAspect].type,
            name: this.aspects[this.activeAspect].name
          });
      }),
      (n.prototype.nextSubtitle = function() {
        return this.subtitlePIDs.length <= 0
          ? (this.emit("subtitles:change", null), !1)
          : (null === this.currentSubtitle
              ? (this.currentSubtitle = 0)
              : this.currentSubtitle < this.subtitlePIDs.length - 1
              ? this.currentSubtitle++
              : (this.currentSubtitle = null),
            null !== this.currentSubtitle
              ? (gSTB.SetSubtitlePID(
                  this.subtitlePIDs[this.currentSubtitle].pid
                ),
                gSTB.SetSubtitles(!0),
                this.emit("subtitles:change", {
                  lang: this.subtitlePIDs[this.currentSubtitle].lang[0],
                  pid: this.subtitlePIDs[this.currentSubtitle].pid
                }))
              : (gSTB.SetSubtitles(!1), this.emit("subtitles:change", null)),
            !0);
      }),
      (n.prototype.setSubtitle = function(e) {
        gSTB.SetSubtitlePID(this.subtitlePIDs[e].pid),
          gSTB.SetSubtitles(!0),
          (this.currentSubtitle = e),
          this.emit("subtitles:change", {
            lang: this.subtitlePIDs[this.currentSubtitle].lang[0],
            pid: this.subtitlePIDs[this.currentSubtitle].pid
          });
      }),
      (n.prototype.hideSubtitles = function() {
        gSTB.SetSubtitles(!1), this.emit("subtitles:change", null);
      }),
      (n.prototype.loadExternalSubtitle = function(e) {
        e &&
          "string" == typeof e &&
          (gSTB.LoadExternalSubtitles(e),
          this.subtitlePIDs.push({ pid: 8192 }),
          this.emit("subtitles:load", null));
      }),
      (n.prototype.nextViewMode = function() {
        var e = gSTB.Get3DConversionMode();
        e < 3 ? e++ : (e = 0),
          this.emit("viewmode:change", {
            type: this.stereoModes[e].mode,
            name: this.stereoModes[e].name
          }),
          gSTB.Set3DConversionMode(e);
      }),
      (n.prototype.setViewMode = function(e) {
        e > 0 &&
          e <= 3 &&
          (gSTB.Set3DConversionMode(e),
          this.emit("viewmode:change", {
            type: this.stereoModes[e].mode,
            name: this.stereoModes[e].name
          }));
      }),
      (n.prototype.inputPosition = function(e) {
        var t,
          i,
          n,
          a,
          s = this,
          o = parseInt(e, 10) - 48,
          r = [],
          c = 0;
        this.allowInputPosition &&
          (this.setModeHelper.active ||
            (6 === this.setModeHelper.length
              ? (this.setModeHelper.time = [0, 0, 0, 0, 0, 0])
              : (this.setModeHelper.time = [0, 0, 0, 0]),
            (this.setModeHelper.count = 0),
            (this.setModeHelper.active = !0),
            6 === this.setModeHelper.length
              ? this.emit("position:input", {
                  time: "00:00:00",
                  start: !0,
                  sec: 0
                })
              : this.emit("position:input", {
                  time: "00:00",
                  start: !0,
                  sec: 0
                })),
          this.setModeHelper.count <= this.setModeHelper.length &&
            (this.setModeHelper.time.shift(),
            this.setModeHelper.time.push(o),
            (r = this.setModeHelper.time.slice(
              0,
              this.setModeHelper.length + 1
            )),
            6 === this.setModeHelper.length
              ? (this.setModeHelper.timeStr =
                  r[0].toString() +
                  r[1].toString() +
                  ":" +
                  r[2].toString() +
                  r[3].toString() +
                  ":" +
                  r[4].toString() +
                  r[5].toString())
              : (this.setModeHelper.timeStr =
                  r[0].toString() +
                  r[1].toString() +
                  ":" +
                  r[2].toString() +
                  r[3].toString()),
            this.setModeHelper.count++,
            6 === this.setModeHelper.length &&
              ((i = r.shift() + r.shift().toString()),
              (c += 3600 * parseInt(i, 10))),
            (n = r.shift() + r.shift().toString()),
            (c += 60 * parseInt(n, 10)),
            (a = r.shift() + r.shift().toString()),
            (c += parseInt(a, 10)),
            c > this.totalDurationSec && (c = this.totalDurationSec),
            (this.setModeHelper.sec = c),
            this.emit("position:input", {
              time: s.setModeHelper.timeStr,
              sec: c
            })),
          clearTimeout(this.setModeHelper.timeout),
          (t = this.setModeHelper.timeoutDuration
            ? this.setModeHelper.timeoutDuration
            : 2e3),
          (this.setModeHelper.timeout = setTimeout(function() {
            (s.setModeHelper.active = !1),
              clearInterval(s.durationInterval),
              (s.durationInterval = 0),
              gSTB.SetPosTime(s.setModeHelper.sec),
              s.emit("position:input", {
                time: s.setModeHelper.timeStr,
                sec: s.setModeHelper.sec,
                end: !0
              });
          }, t)));
      }),
      (n.prototype.setPosition = function(e) {
        gSTB.SetPosTime(e), this.emit("position:set", { sec: e });
      }),
      (n.prototype.parseTime = function(e) {
        var t, i, n;
        return (
          e >= 0
            ? ((t = Math.floor(e / 3600)),
              (i = Math.floor((e - 3600 * t) / 60)),
              (n = e - 3600 * t - 60 * i),
              t < 10 && (t = "0" + t),
              n < 10 && (n = "0" + n),
              i < 10 && (i = "0" + i))
            : ((e = Math.abs(e)),
              (t = Math.floor(e / 3600)),
              (i = Math.floor((e - 3600 * t) / 60)),
              (n = e - 3600 * t - 60 * i),
              t < 10 && (t = "0" + t),
              n < 10 && (n = "0" + n),
              i < 10 && (i = "0" + i),
              (t = "-" + t)),
          { hour: t, min: i, sec: n }
        );
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      "error" === e.type,
        o--,
        r[this.group]--,
        s.events.link && s.emit("link", { url: this.src, group: this.group }),
        0 === r[this.group] &&
          s.events.group &&
          s.emit("group", { name: this.group }),
        0 === o && s.events.done && s.emit("done");
    }
    var a = i(8),
      s = new a(),
      o = 0,
      r = {};
    (s.add = function(e) {
      e.forEach(function(e) {
        var t = new Image(),
          i = e.url || e,
          a = e.group || "";
        o++,
          (r[a] = void 0 === r[a] ? 1 : r[a] + 1),
          (t.src = i),
          (t.group = a),
          (t.onload = t.onerror = t.ontimeout = n);
      });
    }),
      (e.exports = s);
  },
  function(e, t) {
    "use strict";
    if (!("classList" in document.documentElement)) {
      var i = Array.prototype,
        n = i.indexOf,
        a = i.slice,
        s = i.push,
        o = i.splice,
        r = i.join;
      (window.DOMTokenList = function(e) {
        if (((this._element = e), e.className !== this._classCache)) {
          if (((this._classCache = e.className), !this._classCache)) return;
          var t,
            i = this._classCache.replace(/^\s+|\s+$/g, "").split(/\s+/);
          for (t = 0; t < i.length; t++) s.call(this, i[t]);
        }
      }),
        (window.DOMTokenList.prototype = {
          add: function(e) {
            this.contains(e) ||
              (s.call(this, e),
              (this._element.className = a.call(this, 0).join(" ")));
          },
          contains: function(e) {
            return n.call(this, e) !== -1;
          },
          item: function(e) {
            return this[e] || null;
          },
          remove: function(e) {
            var t = n.call(this, e);
            t !== -1 &&
              (o.call(this, t, 1),
              (this._element.className = a.call(this, 0).join(" ")));
          },
          toString: function() {
            return r.call(this, " ");
          },
          toggle: function(e) {
            return (
              this.contains(e) ? this.remove(e) : this.add(e), this.contains(e)
            );
          }
        }),
        Object.defineProperty(Element.prototype, "classList", {
          get: function() {
            return new window.DOMTokenList(this);
          }
        });
    }
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (this.value = ""),
        (this.type = this.TYPE_TEXT),
        (e.className = "input " + (e.className || "")),
        a.call(this, e),
        (this.$line = this.$body.appendChild(document.createElement("div"))),
        (this.$line.className = "line"),
        (this.$caret = this.$line.appendChild(document.createElement("div"))),
        (this.$caret.className = "caret"),
        (this.$placeholder = this.$line.appendChild(
          document.createElement("div")
        )),
        (this.$placeholder.className = "placeholder"),
        (this.$caret.index = 0),
        this.init(e);
    }
    var a = i(3),
      s = i(1);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.TYPE_TEXT = 0),
      (n.prototype.TYPE_PASSWORD = 1),
      (n.prototype.defaultEvents = {
        keypress: function(e) {
          this.addChar(String.fromCharCode(e.keyCode), this.$caret.index);
        },
        keydown: function(e) {
          switch (e.code) {
            case s.del:
              this.removeChar(this.$caret.index);
              break;
            case s.back:
              this.removeChar(this.$caret.index - 1);
              break;
            case s.left:
              this.setCaretPosition(this.$caret.index - 1);
              break;
            case s.right:
              this.setCaretPosition(this.$caret.index + 1);
              break;
            case s.end:
            case s.down:
              this.setCaretPosition(this.value.length);
              break;
            case s.home:
            case s.up:
              this.setCaretPosition(0);
          }
        }
      }),
      (n.prototype.init = function(e) {
        e.type && (this.type = e.type),
          e.value && this.setValue(e.value),
          e.placeholder && (this.$placeholder.innerText = e.placeholder),
          (this.$line.dir = e.direction || "ltr");
      }),
      (n.prototype.addChar = function(e, t) {
        var i = document.createElement("div");
        (t = void 0 === t ? this.$caret.index : t),
          0 === this.value.length && this.$line.removeChild(this.$placeholder),
          (i.className = "char"),
          (this.value =
            this.value.substring(0, t) +
            e +
            this.value.substring(t, this.value.length)),
          ++this.$caret.index,
          this.type === this.TYPE_PASSWORD
            ? (i.innerText = "*")
            : " " === e
            ? (i.innerHTML = "&nbsp;")
            : (i.innerText = e),
          t >= this.value.length
            ? (this.$line.appendChild(i), this.$line.appendChild(this.$caret))
            : (this.$line.insertBefore(this.$caret, this.$line.children[t]),
              this.$line.insertBefore(i, this.$caret)),
          this.events.input && this.emit("input", { value: this.value });
      }),
      (n.prototype.removeChar = function(e) {
        var t = this.value;
        (e = void 0 === e ? this.$caret.index - 1 : e),
          this.value.length > 0 &&
            (this.$caret.index === e && e < this.value.length
              ? this.$line.removeChild(this.$line.children[e + 1])
              : this.$caret.index > e &&
                (--this.$caret.index,
                this.$line.removeChild(this.$line.children[e])),
            (this.value =
              this.value.substring(0, e) +
              this.value.substring(e + 1, this.value.length)),
            this.events.input &&
              t !== this.value &&
              this.emit("input", { value: this.value })),
          0 === this.value.length && this.$line.appendChild(this.$placeholder);
      }),
      (n.prototype.setCaretPosition = function(e) {
        e >= 0 &&
          e <= this.value.length &&
          this.$caret.index !== e &&
          (this.$line.removeChild(this.$caret),
          e === this.value.length
            ? this.$line.appendChild(this.$caret)
            : this.$line.insertBefore(this.$caret, this.$line.children[e]),
          (this.$caret.index = e));
      }),
      (n.prototype.setValue = function(e) {
        var t,
          i,
          n = this.value.length,
          a = e.length,
          s = 0;
        if (e !== this.value) {
          if (a > 0) {
            if (
              (this.$placeholder.parentNode === this.$line &&
                this.$line.removeChild(this.$placeholder),
              this.$line.removeChild(this.$caret),
              a !== n)
            )
              if (((i = a - n), i > 0))
                for (s = 0; s < i; s++)
                  (t = this.$line.appendChild(document.createElement("div"))),
                    (t.className = "char");
              else
                for (s = 0; s > i; s--)
                  this.$line.removeChild(this.$line.lastChild);
            for (s = 0; s < a; s++)
              (t = this.$line.children[s]),
                this.type === this.TYPE_PASSWORD
                  ? (t.innerHTML = "*")
                  : " " === e[s]
                  ? (t.innerHTML = "&nbsp;")
                  : (t.innerText = e[s]);
            (this.value = e),
              (this.$caret.index = a),
              this.$line.appendChild(this.$caret);
          } else
            (this.value = ""),
              (this.$line.innerText = ""),
              this.$line.appendChild(this.$caret),
              this.$line.appendChild(this.$placeholder);
          this.events.input && this.emit("input", { value: this.value });
        }
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (this.$focusItem = null),
        (this.viewIndex = null),
        (this.data = []),
        (this.type = this.TYPE_VERTICAL),
        (this.size = 5),
        (this.cycle = !1),
        (this.scroll = null),
        e.type && (this.type = e.type),
        (e.className = "list " + (e.className || "")),
        this.type === this.TYPE_HORIZONTAL && (e.className += " horizontal"),
        s.call(this, e),
        this.init(e);
    }
    function a(e) {
      var t, i;
      for (t = 0; t < e.length; t++)
        (i = e[t]), "object" != typeof i && (i = e[t] = { value: e[t] });
      return e;
    }
    var s = i(3),
      o = i(1);
    (n.prototype = Object.create(s.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.TYPE_VERTICAL = 1),
      (n.prototype.TYPE_HORIZONTAL = 2),
      (n.prototype.renderItemDefault = function(e, t) {
        e.innerText = t.value;
      }),
      (n.prototype.renderItem = n.prototype.renderItemDefault),
      (n.prototype.defaultEvents = {
        mousewheel: function(e) {
          this.type === this.TYPE_VERTICAL &&
            e.wheelDeltaY &&
            this.move(e.wheelDeltaY > 0 ? o.up : o.down),
            this.type === this.TYPE_HORIZONTAL &&
              e.wheelDeltaX &&
              this.move(e.wheelDeltaX > 0 ? o.left : o.right);
        },
        keydown: function(e) {
          switch (e.code) {
            case o.up:
            case o.down:
            case o.right:
            case o.left:
            case o.pageUp:
            case o.pageDown:
            case o.home:
            case o.end:
              this.move(e.code);
              break;
            case o.ok:
              this.events["click:item"] &&
                this.emit("click:item", { $item: this.$focusItem, event: e });
          }
        }
      }),
      (n.prototype.init = function(e) {
        var t,
          i,
          n = this,
          s = this.$body.children.length,
          o = function(e) {
            this.data &&
              (n.focusItem(this),
              n.events["click:item"] &&
                n.emit("click:item", { $item: this, event: e }));
          };
        if (
          (void 0 !== e.cycle && (this.cycle = e.cycle),
          e.scroll && (this.scroll = e.scroll),
          e.data && (this.data = a(e.data)),
          e.render && (this.renderItem = e.render),
          e.size && (this.size = e.size),
          this.size !== s)
        )
          for (
            s > 0 && (this.$body.innerText = null), i = 0;
            i < this.size;
            i++
          )
            (t = document.createElement("div")),
              (t.index = i),
              (t.className = "item"),
              t.addEventListener("click", o),
              this.$body.appendChild(t);
        void 0 !== e.viewIndex,
          (this.viewIndex = null),
          void 0 !== e.focusIndex
            ? this.focusIndex(e.focusIndex)
            : this.renderView(e.viewIndex || 0);
      }),
      (n.prototype.renderView = function(e) {
        var t, i, n, a, s;
        if (this.viewIndex !== e) {
          for (
            a = this.viewIndex, this.viewIndex = s = e, i = 0;
            i < this.size;
            i++
          )
            (t = this.$body.children[i]),
              (n = this.data[e]),
              n
                ? ((t.data = n),
                  (t.index = e),
                  this.renderItem(t, n),
                  n.mark ? t.classList.add("mark") : t.classList.remove("mark"))
                : ((t.data = t.index = void 0), (t.innerHTML = "&nbsp;")),
              e++;
          return (
            this.events["move:view"] &&
              this.emit("move:view", { prevIndex: a, currIndex: s }),
            this.events["select:item"] &&
              this.emit("select:item", { $item: t }),
            this.scroll && this.scroll.scrollTo(this.viewIndex),
            !0
          );
        }
        return !1;
      }),
      (n.prototype.move = function(e) {
        ((e === o.up && this.type === this.TYPE_VERTICAL) ||
          (e === o.left && this.type === this.TYPE_HORIZONTAL)) &&
          (this.$focusItem && this.$focusItem.index > 0
            ? this.$focusItem === this.$body.firstChild
              ? this.renderView(this.viewIndex - 1)
              : this.focusItem(this.$focusItem.previousSibling)
            : this.cycle
            ? (this.move(o.end),
              this.events.cycle && this.emit("cycle", { direction: e }))
            : this.events.overflow && this.emit("overflow", { direction: e })),
          ((e === o.down && this.type === this.TYPE_VERTICAL) ||
            (e === o.right && this.type === this.TYPE_HORIZONTAL)) &&
            (this.$focusItem && this.$focusItem.index < this.data.length - 1
              ? this.$focusItem === this.$body.lastChild
                ? this.renderView(this.viewIndex + 1)
                : this.focusItem(this.$focusItem.nextSibling)
              : this.cycle
              ? (this.move(o.home),
                this.events.cycle && this.emit("cycle", { direction: e }))
              : this.events.overflow &&
                this.emit("overflow", { direction: e })),
          e === o.pageUp &&
            (this.viewIndex < this.size
              ? this.renderView(0)
              : this.renderView(this.viewIndex - this.size + 1),
            this.focusItem(this.$body.firstChild)),
          e === o.pageDown &&
            (this.data.length > this.size
              ? (this.viewIndex > this.data.length - 2 * this.size
                  ? this.renderView(this.data.length - this.size)
                  : this.renderView(this.viewIndex + this.size - 1),
                this.focusItem(this.$body.lastChild))
              : this.focusItem(this.$body.children[this.data.length - 1])),
          e === o.home &&
            (this.renderView(0), this.focusItem(this.$body.firstChild)),
          e === o.end &&
            (this.data.length > this.size
              ? (this.renderView(this.data.length - this.size),
                this.focusItem(this.$body.lastChild))
              : this.focusItem(this.$body.children[this.data.length - 1]));
      }),
      (n.prototype.focusItem = function(e) {
        var t = this.$focusItem;
        return (
          !(!e || t === e) &&
          (null !== t &&
            (t.classList.remove("focus"),
            this.events["blur:item"] && this.emit("blur:item", { $item: t })),
          (this.$focusItem = e),
          (this.$focusItem.data = this.data[this.$focusItem.index]),
          e.classList.add("focus"),
          this.events["focus:item"] &&
            this.emit("focus:item", { $prev: t, $curr: e }),
          this.events["select:item"] && this.emit("select:item", { $item: e }),
          !0)
        );
      }),
      (n.prototype.focusIndex = function(e) {
        var t = this.viewIndex || 0;
        e >= t + this.size
          ? ((e = e < this.data.length - 1 ? e : this.data.length - 1),
            this.renderView(e - this.size + 1),
            this.focusItem(this.$body.lastChild))
          : e < t
          ? ((e = e > 0 ? e : 0),
            this.renderView(e),
            this.focusItem(this.$body.firstChild))
          : (null === this.viewIndex && this.renderView(0),
            this.focusItem(this.$body.children[e - t]));
      }),
      (n.prototype.markItem = function(e, t) {
        t ? e.classList.add("mark") : e.classList.remove("mark"),
          (e.data.mark = t);
      }),
      (e.exports = n);
  },
  function(e, t, i) {
    "use strict";
    function n(e) {
      (e = e || {}),
        (this.max = 100),
        (this.min = 0),
        (this.value = 0),
        (this.step = 1),
        (e.focusable = e.focusable || !1),
        (e.className = "progressBar " + (e.className || "")),
        a.call(this, e),
        (this.$value = this.$body.appendChild(document.createElement("div"))),
        (this.$value.className = "value"),
        this.init(e);
    }
    var a = i(3);
    (n.prototype = Object.create(a.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.set = function(e) {
        var t = this.value;
        return (
          this.value !== e &&
          e <= this.max &&
          e >= this.min &&
          ((this.value = e),
          (e = Math.abs(this.value - this.min) / this.step),
          100 === e && this.events.done && this.emit("done"),
          (this.$value.style.width = e + "%"),
          this.events.change &&
            this.emit("change", { curr: this.value, prev: t }),
          !0)
        );
      }),
      (n.prototype.init = function(e) {
        void 0 !== e.max && (this.max = e.max),
          void 0 !== e.min && (this.min = e.min),
          void 0 !== e.value && (this.value = e.value),
          (this.step = Math.abs(this.max - this.min) / 100),
          (this.$value.style.width =
            Math.abs(this.min - this.value) / this.step + "%");
      }),
      (e.exports = n);
  }
]);
