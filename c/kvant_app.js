(function() {
  function kvant_app_constructor() {
    this.layer_name = "kvant_app";
    this.dom_obj = this.create_block("layer_bg2");
    this.logo_dom_obj = create_block_element("main_menu_logo", this.dom_obj);
    this.logo_dom_obj.style.background =
      "url(" + stb.user.portal_logo_url + ") no-repeat";

    document.body.appendChild(this.dom_obj);

    this.superclass = BaseLayer.prototype;
    this.channels_url = "http://212.77.128.203/apps/city_news/channels.php";
    this.host_url = "http://212.77.128.203/apps/kvant/";
    //this.video_url='http://212.77.128.203/trailers/';
    this.selected_video = 0;
    this.page = 1;
    this.video_content;
    this.channels;
    this.layer;
    this.select__channel = 0;

    this.init = function() {
      _debug("kvant_app.init");

      var container = create_block_element("kvant_app", this.dom_obj);
      var pp =
        '<div id="kvant_pages"><div id="kvant_gl_menu"><div id="kvant_video0"><div id="kvant_video_img0"></div><div id="kvant_name0"><span id="kvant_span_video0"></span><div id="kvant_data0"></div></div><div id="kvant_duration0"></div></div><div id="kvant_video1"><div id="kvant_video_img1"></div><div id="kvant_name1"><span id="kvant_span_video1"></span><div id="kvant_data1"></div></div><div id="kvant_duration1"></div></div><div id="kvant_video2"><div id="kvant_video_img2"></div><div id="kvant_name2"><span id="kvant_span_video2"></span><div id="kvant_data2"></div></div><div id="kvant_duration2"></div></div><div id="kvant_video3"><div id="kvant_video_img3"></div><div id="kvant_name3"><span id="kvant_span_video3"></span><div id="kvant_data3"></div></div><div id="kvant_duration3"></div></div></div><div id="kvant_select_channel"><div id="kvant_select_channel_left_side"><div id="kvant_channel_0"><div id="kvant_channel_0_img"></div><div id="kvant_channel_0_title"></div></div><div id="kvant_channel_1"><div id="kvant_channel_1_img"></div><div id="kvant_channel_1_title"></div></div><div id="kvant_channel_2"><div id="kvant_channel_2_img"></div><div id="kvant_channel_2_title"></div></div><div id="kvant_channel_3"><div id="kvant_channel_3_img"></div><div id="kvant_channel_3_title"></div></div><div id="kvant_channel_4"><div id="kvant_channel_4_img"></div><div id="kvant_channel_4_title"></div></div><div id="kvant_channel_5"><div id="kvant_channel_5_img"></div><div id="kvant_channel_5_title"></div></div></div><div id="kvant_select_channel_right_side"><div id="kvant_select_channel_right_side_title"></div><div id="kvant_select_channel_right_side_preview"><div id="prev_video0"><div id="prev_video0_img0"><img src=""></div><div id="prev_duration0">13:18</div></div><div id="prev_video1"><div id="prev_video0_img1"><img src=""></div><div id="prev_duration1">4:49</div></div><div id="prev_video2"><div id="prev_video0_img2"><img src=""></div><div id="prev_duration2">2:44</div></div></div><div id="kvant_select_channel_update"></div></div></div></div><div id="kvant_loading" style="display:none;">Загрузка...</div><div id="kvant_number_page"></div><div id="kvant_exit_message"><div id="kvant_exit_message_"><div id="kvant_exit_message_title"><img src="/' +
        stb.portal_path +
        '/c/key_for_app/ok.png"' +
        '><span> ВЫХОД&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="/' +
        stb.portal_path +
        '/c/key_for_app/back_sd.png"' +
        '><span> ОТМЕНА </span></div></div></div><div id="kvant_menu"><div id="kvant_menu_key0"><div id="kvant_menu_key0_img"></div><div id="kvant_menu_key0_title"></div></div><div id="kvant_menu_key1"><div id="kvant_menu_key1_img"></div><div id="kvant_menu_key1_title"></div></div><div id="kvant_menu_key2"><div id="kvant_menu_key2_img"></div><div id="kvant_menu_key2_title"></div></div><div id="kvant_menu_key3"><div id="kvant_menu_key3_img"></div><div id="kvant_menu_key3_title"></div></div></div>';
      container.innerHTML = pp;
    };

    this.show = function() {
      _debug("kvant_app.show");
      this.superclass.show.call(this);
    };

    this.hide = function() {
      _debug("kvant_app.hide");
      this.superclass.hide.call(this);
      //window.clearInterval(this.reload_timer);
    };

    this.load_video = function() {
      _debug("kvant_app.load_video");
      kvant_app.layer = 10;
      url = kvant_app.host_url + "scripts/f_e.php?page=" + kvant_app.page;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
          kvant_app.video_content = JSON.parse(xmlhttp.responseText);
          console.log(kvant_app.video_content);
          //  console.log('video0= '+kvant_app.video_content.video[0].id);
          kvant_app.page = kvant_app.video_content.page;
          kvant_app.update_menu();
          kvant_app.layer = 2;
          kvant_app.help_panel_update();
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.load_channels = function() {
      _debug("kvant_app.load_channels");
      //kvant_app.layer=10;
      url = kvant_app.channels_url;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // kino_kuzbass.today = JSON.parse(xmlhttp.responseText);
          kvant_app.channels = JSON.parse(xmlhttp.responseText);
          //     console.log('channel0= '+kvant_app.channels.channels[0].name);
          //      kvant_app.page=kvant_app.video_content.page;
          kvant_app.update_channels();
          kvant_app.layer = 1;
          kvant_app.help_panel_update();
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.update_channels = function() {
      _debug("kvant_app.update_channels");
      for (var i = 0; i < 6; i++) {
        //document.getElementById('kvant_video'+i).style.display = 'none';
        document.getElementById("kvant_channel_" + i + "_img").innerHTML =
          '<img src="' + kvant_app.channels.channels[i].sd_img + '">';
        document.getElementById("kvant_channel_" + i + "_title").innerHTML =
          kvant_app.channels.channels[i].name;
      }
      document.getElementById("kvant_gl_menu").style.display = "none";
      setTimeout(
        "document.getElementById('kvant_loading').style.display = 'none'; document.getElementById('kvant_select_channel').style.display = 'block'; document.getElementById('kvant_menu').style.display = 'block';",
        1500
      );
      kvant_app.select_channel();
    };

    this.select_channel = function() {
      _debug("kvant_app.select_channel");
      //console.log('kvant_app.select__channel='+kvant_app.select__channel);
      for (var i = 0; i < 6; i++) {
        document.getElementById("kvant_channel_" + i).style.backgroundImage =
          'url("")';
      }
      if (resolution_prefix == "_720") {
        document.getElementById("prev_video0_img0").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_hd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id0 +
          '.jpg">';
        document.getElementById("prev_video0_img1").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_hd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id1 +
          '.jpg">';
        document.getElementById("prev_video0_img2").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_hd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id2 +
          '.jpg">';
      } else {
        document.getElementById("prev_video0_img0").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_sd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id0 +
          '.jpg">';
        document.getElementById("prev_video0_img1").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_sd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id1 +
          '.jpg">';
        document.getElementById("prev_video0_img2").innerHTML =
          '<img src="' +
          kvant_app.channels.channels[kvant_app.select__channel].content_url +
          "img_sd/" +
          kvant_app.channels.channels[kvant_app.select__channel].video_id2 +
          '.jpg">';
      }
      if (kvant_app.select__channel == 0) {
        document.getElementById(
          "kvant_select_channel_right_side"
        ).style.WebkitBorderRadius = "5px";
        document.getElementById(
          "kvant_select_channel_right_side"
        ).style.borderTopLeftRadius = "0px";
      } else {
        if (kvant_app.select__channel == 5) {
          document.getElementById(
            "kvant_select_channel_right_side"
          ).style.WebkitBorderRadius = "5px";
          document.getElementById(
            "kvant_select_channel_right_side"
          ).style.borderBottomLeftRadius = "0px";
        } else {
          document.getElementById(
            "kvant_select_channel_right_side"
          ).style.WebkitBorderRadius = "5px";
        }
      }
      //if (kvant_app.select_channel=="") kvant_app.select_channel=0;
      document.getElementById(
        "kvant_channel_" + kvant_app.select__channel
      ).style.backgroundImage =
        'url("http://212.77.128.177/stalker_portal/c/template/default/i/25alfa_20.png")';
      document.getElementById(
        "kvant_select_channel_right_side_title"
      ).innerHTML =
        kvant_app.channels.channels[kvant_app.select__channel].description;
      document.getElementById("kvant_select_channel_update").innerHTML =
        "<span>Раздел обновлен<br>" +
        kvant_app.channels.channels[kvant_app.select__channel].last_update +
        "г.</span>";
    };

    this.update_menu = function() {
      for (var i = 0; i < 4; i++) {
        document.getElementById("kvant_video" + i).style.display = "none";
      }
      _debug("kvant_app.update_menu");
      for (var i = 0; i < kvant_app.video_content.video.length; i++) {
        document.getElementById("kvant_video" + i).style.display = "block";
        if (resolution_prefix == "_720") {
          document.getElementById("kvant_video_img" + i).innerHTML =
            '<img src="' +
            kvant_app.host_url +
            "/img_hd/" +
            kvant_app.video_content.video[i].id +
            '.jpg">';
          document.getElementById("kvant_span_video" + i).innerHTML =
            kvant_app.video_content.video[i].title;
        } else {
          document.getElementById("kvant_video_img" + i).innerHTML =
            '<img src="' +
            kvant_app.host_url +
            "/img_sd/" +
            kvant_app.video_content.video[i].id +
            '.jpg">';
          if (kvant_app.video_content.video[i].title.length > 52) {
            document.getElementById("kvant_span_video" + i).innerHTML =
              kvant_app.video_content.video[i].title.substr(0, 52) + "...";
          } else {
            document.getElementById("kvant_span_video" + i).innerHTML =
              kvant_app.video_content.video[i].title;
          }
        }
        document.getElementById("kvant_data" + i).innerHTML =
          kvant_app.video_content.video[i].upload_date;
        document.getElementById("kvant_duration" + i).innerHTML =
          kvant_app.video_content.video[i].duration;
        //console.log('kvant_duration= '+new Date(kvant_app.video_content.video[i].duration*1000).toUTCString().split(/ /)[2]);
      }
      document.getElementById("kvant_number_page").innerHTML =
        "Стр. " +
        kvant_app.video_content.page +
        " из " +
        kvant_app.video_content.pages;
      kvant_app.update_select();
      document.getElementById("kvant_gl_menu").style.display = "block";
      document.getElementById("kvant_loading").style.display = "none";
      document.getElementById("kvant_select_channel").style.display = "none";
    };

    this.update_select = function() {
      for (var i = 0; i < 4; i++) {
        // document.getElementById('kvant_video'+i).style.backgroundColor="";
        document.getElementById("kvant_video" + i).style.backgroundImage =
          'url("")';
      }
      if (kvant_app.selected_video > kvant_app.video_content.video.length - 1) {
        kvant_app.selected_video = kvant_app.video_content.video.length - 1;
      }
      // document.getElementById('kvant_video'+kvant_app.selected_video).style.backgroundColor="rgb(34, 101, 145)";
      document.getElementById(
        "kvant_video" + kvant_app.selected_video
      ).style.backgroundImage =
        'url("/' +
        stb.portal_path +
        "/c/template/" +
        loader.template +
        '/i/25alfa_20.png")';
    };
    //В администрации обсудили подготовку к областному Дню шахтера
    //С.Кислицин и О.Шахова поздравили междуреченцев с Днем

    this.help_panel_update = function() {
      if (kvant_app.layer == 1) {
        document.getElementById("kvant_menu_key0_img").innerHTML =
          '<img src="/' + stb.portal_path + '/c/key_for_app/exit.png">';
        document.getElementById("kvant_menu_key1_img").innerHTML =
          '<img src="/' + stb.portal_path + '/c/key_for_app/ok.png">';
        document.getElementById("kvant_menu_key2_img").innerHTML = "";
        document.getElementById("kvant_menu_key3_img").innerHTML = "";
        document.getElementById("kvant_menu_key0_title").innerHTML = "Выйти";
        document.getElementById("kvant_menu_key1_title").innerHTML = "Выбор";
        document.getElementById("kvant_menu_key2_title").innerHTML = "";
        document.getElementById("kvant_menu_key3_title").innerHTML = "";
      }

      if (kvant_app.layer == 2) {
        document.getElementById("kvant_menu_key0_img").innerHTML =
          '<img src="/' + stb.portal_path + '/c/key_for_app/back.png">';
        document.getElementById("kvant_menu_key1_img").innerHTML =
          '<img src="/' + stb.portal_path + '/c/key_for_app/ok.png">';
        document.getElementById("kvant_menu_key2_img").innerHTML =
          '<img src="/' + stb.portal_path + '/c/key_for_app/leftright.png">';
        document.getElementById("kvant_menu_key3_img").innerHTML = "";
        document.getElementById("kvant_menu_key0_title").innerHTML =
          "Выбор канала";
        document.getElementById("kvant_menu_key1_title").innerHTML =
          "Воспроизвести";
        document.getElementById("kvant_menu_key2_title").innerHTML =
          "Навигация по страницам";
        document.getElementById("kvant_menu_key3_title").innerHTML = "";
      }
    };

    this.key_press = function(button) {
      if (kvant_app.layer == 10) {
        switch (button) {
          case "ok":
            kvant_app.hide();
            document.getElementById("kvant_exit_message").style.display =
              "none";
            main_menu.show();
            break;
          case "back":
            kvant_app.layer = 1;
            document.getElementById("kvant_exit_message").style.display =
              "none";
            break;
        }
      }
      if (kvant_app.layer == 1) {
        switch (button) {
          case "down":
            kvant_app.select__channel++;
            if (kvant_app.select__channel > 5) kvant_app.select__channel = 0;
            kvant_app.select_channel();
            break;
          case "up":
            kvant_app.select__channel = kvant_app.select__channel - 1;
            if (kvant_app.select__channel < 0) kvant_app.select__channel = 5;
            kvant_app.select_channel();
            break;
          case "ok":
          case "right":
            kvant_app.host_url =
              kvant_app.channels.channels[
                kvant_app.select__channel
              ].content_url;
            kvant_app.load_video();
            kvant_app.update_header_path([
              {
                alias: "tab",
                item:
                  kvant_app.channels.channels[kvant_app.select__channel].name
              }
            ]);
            //[{"alias" : "tab", "item" : word['account_payment']}]
            break;
          case "menu":
          case "exit":
            kvant_app.layer = 10;
            document.getElementById("kvant_exit_message").style.display =
              "block";
            break;
        }
      }
      if (kvant_app.layer == 2) {
        switch (button) {
          case "down":
            kvant_app.selected_video = kvant_app.selected_video + 1;
            if (
              kvant_app.selected_video == kvant_app.video_content.video.length
            ) {
              kvant_app.selected_video = 0;
              kvant_app.page = kvant_app.page + 1;
              kvant_app.load_video();
            } else {
              kvant_app.update_select();
            }
            break;
          case "up":
            kvant_app.selected_video = kvant_app.selected_video - 1;
            if (kvant_app.selected_video < 0) {
              kvant_app.selected_video = 3;
              kvant_app.page = kvant_app.page - 1;
              kvant_app.load_video();
            } else {
              kvant_app.update_select();
            }
            break;
          case "right":
            kvant_app.page = kvant_app.page + 1;
            kvant_app.load_video();
            break;
          case "left":
            kvant_app.page = kvant_app.page - 1;
            kvant_app.load_video();
            break;
          case "ok":
            var item = {
              name: get_word(
                kvant_app.video_content.video[kvant_app.selected_video].title
              ),
              cmd:
                "ffmpeg " +
                this.host_url +
                kvant_app.video_content.video[kvant_app.selected_video].id +
                ".mp4"
              //"cmd"  : "fcc2 "+this.host_url+kvant_app.video_content.video[kvant_app.selected_video].id+".mp4"
            };
            stb.set_cur_place("demo");
            module.kvant_app.hide();
            stb.player.prev_layer = this;
            stb.player.play(item);
            break;
          case "red":
            kvant_app.load_channels();
            break;
          case "exit":
          case "menu":
          case "back":
            kvant_app.layer = 1;
            document.getElementById("kvant_select_channel").style.display =
              "block";
            document.getElementById("kvant_gl_menu").style.display = "none";
            document.getElementById("kvant_number_page").innerHTML = "";
            kvant_app.update_header_path([{ alias: "tab", item: "" }]);
            kvant_app.selected_video = 0;
            kvant_app.selected_video = 0;
            kvant_app.page = 1;
            kvant_app.help_panel_update();
            break;
        }
      }
    };
    this.bind = function() {
      (function() {
        this.hide();
        //    this.tab_click(0);
        main_menu.show();
      });
      // }).bind(key.EXIT, this).bind(key.MENU, this);
      this.key_press.bind(key.MENU, this, "menu");
      this.key_press.bind(key.EXIT, this, "exit");
      this.key_press.bind(key.LEFT, this, "left");
      this.key_press.bind(key.RIGHT, this, "right");
      this.key_press.bind(key.OK, this, "ok");
      this.key_press.bind(key.RED, this, "red");
      //            this.key_press.bind(key.GREEN, this, 'green');
      //            this.key_press.bind(key.YELLOW, this, 'yellow');
      //            this.key_press.bind(key.BLUE, this, 'blue');
      this.key_press.bind(key.DOWN, this, "down");
      this.key_press.bind(key.UP, this, "up");
      this.key_press.bind(key.BACK, this, "back");
      //            this.key_press.bind(key.INFO, this, 'info');
    };
  }

  kvant_app_constructor.prototype = new BaseLayer();
  var kvant_app = new kvant_app_constructor();
  kvant_app.init();
  kvant_app.bind();
  kvant_app.init_header_path("НОВОСТИ ГОРОДА");
  kvant_app.hide();
  module.kvant_app = kvant_app;

  //    if (!module.infoportal_sub){
  //       module.infoportal_sub = [];
  // }

  if (!module.videoportal_sub) {
    module.videoportal_sub = [];
  }

  //    module.infoportal_sub.push({
  module.videoportal_sub.push({
    title: "НОВОСТИ ГОРОДА",
    cmd: function() {
      main_menu.hide();
      document.getElementById("kvant_gl_menu").style.display = "none";
      document.getElementById("kvant_select_channel").style.display = "none";
      document.getElementById("kvant_menu").style.display = "none";
      document.getElementById("kvant_loading").style.display = "block";
      kvant_app.show();
      kvant_app.layer = 10;
      kvant_app.page = 1;
      kvant_app.selected_video = 0;
      kvant_app.select__channel = 0;
      kvant_app.load_channels();
    }
  });
})();

loader.next();
