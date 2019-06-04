(function() {
  function msgreader_constructor() {
    this.layer_name = "msgreader";
    this.dom_obj = this.create_block("msgreader_bg");
    addStyle(this.dom_obj, {
      position: "absolute",
      left: "0px",
      top: "0px",
      width: screen.width + "px",
      height: screen.height + "px"
    });
    this.logo_dom_obj = create_block_element("main_menu_logo", this.dom_obj);
    this.logo_dom_obj.style.background =
      "url(" + stb.user.portal_logo_url + ") no-repeat";

    document.body.appendChild(this.dom_obj);

    this.superclass = BaseLayer.prototype;

    this.init = function() {
      _debug("msgreader.init");
      var container = create_block_element("msgreader", this.dom_obj);
      this.infoContainer = createElement("div", "info_container", {
        display: "block",
        marginTop: "110px"
      });
      container.appendChild(this.infoContainer);
    };

    this.show = function() {
      _debug("msgreader.show");
      this.superclass.show.call(this);
      this.header_path.innerText = "Сообщения";
      this.load();
    };

    this.show_edds = function() {
      this.superclass.show.call(this);
      this.company = "edds";
      this.header_path.innerText = "Сообщения ЕДДС";
      this.load("http://212.77.128.205/ext/get_msg_triton.php?company=edds");
    };

    this.hide = function() {
      _debug("msgreader.hide");
      this.superclass.hide.call(this);
      this.infoContainer.innerHTML = "";
      if (typeof this.company !== "undefined" && this.company === "edds") {
        module.edds_info_app.show();
      }
      this.company = undefined;
    };

    this.load = function(url) {
      _debug("msgreader.load");

      if (typeof url === "undefined") {
        url = "http://212.77.128.205/ext/get_msg_triton.php";
      }
      var self = this;

      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var res = JSON.parse(xmlhttp.responseText);
          self.infoContainer.innerHTML = "";
          var msgList = [
            createMsg(res.msg_4),
            createMsg(res.msg_3),
            createMsg(res.msg_2),
            createMsg(res.msg_1),
            createMsg(res.msg_0)
          ];
          if (loader.template === "default" && screen.width > 1000) {
          } else {
            msgList.length = 4;
          }
          appendChilds(self.infoContainer, msgList);
          msgList[0].focus();
          msgList[0].style.fontWeight = "bold";
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.bind = function() {
      (function() {
        this.hide();
        main_menu.show();
      }
        .bind(key.EXIT, this)
        .bind(key.MENU, this));
    };
  }

  msgreader_constructor.prototype = new BaseLayer();
  var msgreader = new msgreader_constructor();
  msgreader.init();
  msgreader.bind();
  msgreader.init_header_path("Сообщения");
  msgreader.hide();
  module.msgreader = msgreader;

  if (!module.infoportal_sub) {
    module.infoportal_sub = [];
  }

  module.infoportal_sub.push({
    title: "Сообщения",
    cmd: function() {
      main_menu.hide();
      module.msgreader.show();
    }
  });

  function createMsg(text) {
    var fontSize = "23px";
    if (loader.template === "default") {
      fontSize = "23px";
    }
    var paddingBottom = "15px";
    var marginTop = "-30px";
    if (screen.width < 1000) {
      fontSize = "15px";
      paddingBottom = "10px";
      marginTop = "-35px";
    }

    var table = createElement("table", "", {
      marginTop: marginTop
    });

    var trList = [createElement("tr"), createElement("tr")];

    appendChilds(trList[0], [
      createElement("td", "mb_info_lt_head"),
      createElement("td", "mb_info_top_head"),
      createElement("td", "mb_info_rt_head")
    ]);
    appendChilds(trList[1], [
      createElement("td", "mb_info_lb"),
      createElement(
        "td",
        "mb_info_main",
        {
          paddingBottom: paddingBottom
        },
        [
          createElement("div", "ico_info", {
            position: "relative",
            bottom: "15px"
          }),
          createElement(
            "span",
            "msg_reader_msg",
            {
              position: "relative",
              bottom: "10px",
              fontSize: fontSize
            },
            undefined,
            text
          )
        ]
      ),
      createElement("td", "mb_info_rb")
    ]);

    appendChilds(table, trList);
    return table;
  }

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
      target.appendChild(item);
    });
    return target;
  }
})();

loader.next();
