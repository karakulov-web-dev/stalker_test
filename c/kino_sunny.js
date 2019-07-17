(function() {
  function getVideoInfo(id, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      "http://212.77.128.203/apps/youtube/links.php?id=" + id,
      true
    );
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(JSON.parse(xhr.responseText));
        }
      }
    };
  }

  function kino_sunny_constructor() {
    this.layer_name = "kino_sunny";
    this.dom_obj = this.create_block("layer_bg2");
    this.logo_dom_obj = create_block_element("main_menu_logo", this.dom_obj);
    this.logo_dom_obj.style.background =
      "url(" + stb.user.portal_logo_url + ") no-repeat";

    document.body.appendChild(this.dom_obj);

    this.superclass = BaseLayer.prototype;

    this.host_url = "http://kuzbass-stb.m-sk.ru";
    this.trailer_url = "http://212.77.128.233/trailers/";
    this.today;
    this.today_save;
    this.shedule;
    this.kino_active;
    this.today_pozition;
    this.current_layer;
    this.today_layer = 1;
    this.schedule_layer = 2;
    this.plan_layer = 3;
    this.future_layer = 4;
    this.detail_visible = 0;

    this.init = function() {
      _debug("kino_sunny.init");

      var container = create_block_element("kino_sunny", this.dom_obj);
      var pp =
        '<div id="pages_sunny"><div id="header_sunny">СЕГОДНЯ В КИНО: 5 ФИЛЬМОВ</div><div id="today_sunny"><div id="left_sunny"></div><div id="kino0_sunny"><div id="kino_data0_sunny"></div><div id="kino_img0_sunny"></div><div id="genre0_sunny"></div><div id="name0_sunny"></div></div><div id="kino1_sunny"><div id="kino_data1_sunny"></div><div id="kino_img1_sunny"></div><div id="genre1_sunny"></div><div id="name1_sunny"></div></div><div id="kino2_sunny"><div id="kino_data2_sunny"></div><div id="kino_img2_sunny"></div><div id="genre2_sunny"></div><div id="name2_sunny"></div></div><div id="right_sunny"></div><div id="key_info_today_sunny"></div></div><div id="schedule_sunny" style="display:none;"><div id="info_blok_sunny"></div><div id="scrol_sunny"><div id="scrol_now_sunny"></div></div></div></div><div id="menu_sunny"><div></div><div id="img_red_sunny"></div><div id="red_sunny"> СЕГОДНЯ В КИНО</div><div id="img_green_sunny"></div><div id="green_sunny"> РАСПИСАНИЕ / ЦЕНЫ</div><div id="img_yelow_sunny"></div><div id="yelow_sunny"> ПЛАН ЗАЛА</div><div id="img_blue_sunny"></div><div id="blue_sunny"> СКОРО В КИНО</div></div><div id="ad_sunny" style="display:none;"><div id="ad_ad_sunny"></div></div><div id="ad1_sunny" style="display:none;"><div id="ad_ad1_sunny"></div></div><div id="detail_sunny" style="display:none;"></div><div id="loading_sunny">Загрузка...</div>';
      container.innerHTML = pp;
    };

    this.show = function() {
      _debug("kino_sunny.show");
      this.superclass.show.call(this);
      ////       this.load_today(kino_sunny.host_url+"/page121_test.php");
      ////       this.today_active_kino(0);
      ////       kino_sunny.current_layer=kino_sunny.today_layer;
      src =
        "/" +
        stb.portal_path +
        "/c/template/" +
        loader.template +
        "/i" +
        resolution_prefix +
        "/mb_scroll.png";
      document.getElementById("scrol_now_sunny").innerHTML =
        '<img src="' + src + '">';
      document.getElementById("detail_sunny").style.display = "none";
      kino_sunny.detail_visible = 0;
      //  kino_sunny.reclame_load();
      //  kino_sunny.reclame_load1();
    };

    this.hide = function() {
      _debug("kino_sunny.hide");
      this.superclass.hide.call(this);
      //window.clearInterval(this.reload_timer);
    };

    this.today_update = function(pozition) {
      _debug("kino_sunny.today_update");
      if (pozition == null) pozition = 0;
      if (kino_sunny.today.length > 0) {
        document.getElementById("kino0_sunny").style.display = "block";
        if (resolution_prefix == "_720") {
          //console.log('big_logo[0]= '+kino_sunny.today[pozition].big_logo.substr(40, kino_sunny.today[pozition].big_logo.length));
          img_url = kino_sunny.today[pozition].big_logo;
          document.getElementById("kino_img0_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            img_url +
            '">';
        } else {
          document.getElementById("kino_img0_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            kino_sunny.today[pozition].logo +
            '">';
        }
        document.getElementById("name0_sunny").innerHTML =
          kino_sunny.today[pozition].name;
        document.getElementById("genre0_sunny").innerHTML =
          kino_sunny.today[pozition].genre;
        document.getElementById("kino_data0_sunny").innerHTML =
          kino_sunny.today[pozition].date;
      } else {
        document.getElementById("kino0_sunny").style.display = "none";
      }

      if (kino_sunny.today.length > 1) {
        document.getElementById("kino1_sunny").style.display = "block";
        if (resolution_prefix == "_720") {
          img_url1 = kino_sunny.today[pozition + 1].big_logo;
          document.getElementById("kino_img1_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            img_url1 +
            '">';
        } else {
          document.getElementById("kino_img1_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            kino_sunny.today[pozition + 1].logo +
            '">';
        }
        document.getElementById("name1_sunny").innerHTML =
          kino_sunny.today[pozition + 1].name;
        document.getElementById("genre1_sunny").innerHTML =
          kino_sunny.today[pozition + 1].genre;
        document.getElementById("kino_data1_sunny").innerHTML =
          kino_sunny.today[pozition + 1].date;
      } else {
        document.getElementById("kino1_sunny").style.display = "none";
      }

      if (kino_sunny.today.length > 2) {
        document.getElementById("kino2_sunny").style.display = "block";
        if (resolution_prefix == "_720") {
          img_url2 = kino_sunny.today[pozition + 2].big_logo;
          document.getElementById("kino_img2_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            img_url2 +
            '">';
        } else {
          document.getElementById("kino_img2_sunny").innerHTML =
            '<img src="' +
            "http://212.77.128.203:8006/proxy?url=" +
            kino_sunny.today[pozition + 2].logo +
            '">';
        }
        document.getElementById("name2_sunny").innerHTML =
          kino_sunny.today[pozition + 2].name;
        document.getElementById("genre2_sunny").innerHTML =
          kino_sunny.today[pozition + 2].genre;
        document.getElementById("kino_data2_sunny").innerHTML =
          kino_sunny.today[pozition + 2].date;
      } else {
        document.getElementById("kino2_sunny").style.display = "none";
      }
    };

    this.shedule_update = function(pozition) {
      _debug("kino_sunny.shedule_update");
      var html_tekst = "";
      for (var i = 0; i < kino_sunny.shedule.length; i++) {
        html_tekst =
          html_tekst +
          '<span class="shedule_date"><b>' +
          kino_sunny.shedule[i].date +
          "</b></span><br><br>";
        //    html_tekst='<span style="text-transform:uppercase;">'+html_tekst+kino_sunny.shedule[i].date+'</span><br><br>';
        for (var j = 0; j < kino_sunny.shedule[i].big_hall.length; j++) {
          html_tekst = html_tekst + kino_sunny.shedule[i].big_hall[j] + "<br>";
        }
        html_tekst = html_tekst + "<br>";
      }
      document.getElementById("info_blok_sunny").innerHTML = html_tekst;
    };

    this.load_today = function(url) {
      _debug("kino_sunny.load_today");
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // kino_sunny.today = JSON.parse(xmlhttp.responseText);
          kino_sunny.today_save = JSON.parse(xmlhttp.responseText);
          // console.log('this.today= '+this.today[0].name);
          //console.log( 'this.name='+this);
          //kino_sunny.today_update(0);
          //kino_sunny.kino_active=0;
          //console.log("kino_sunny.today.length="+kino_sunny.today.length);
          kino_sunny.current_layer = kino_sunny.today_layer;
          kino_sunny.choice_of_menus("red");
          document.getElementById("loading_sunny").style.display = "none";
          document.getElementById("pages_sunny").style.display = "block";
          kino_sunny.load_shedule(
            "http://212.77.128.203:8006/proxy?url=http://xn--42-mlcqimbe0a8d2b.xn--p1ai/sunnyRikt/sessionSchedule.php"
          );
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.load_shedule = function(url) {
      _debug("kino_sunny.load_shedule");
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          kino_sunny.shedule = JSON.parse(xmlhttp.responseText);
          // console.log('this.today= '+this.today[0].name);
          //console.log( 'this.name='+this);
          //kino_sunny.today_update(0);
          //kino_sunny.kino_active=0;
          kino_sunny.load_soon(
            "http://212.77.128.203:8006/proxy?url=http://xn--42-mlcqimbe0a8d2b.xn--p1ai/sunnyRikt/soon.php"
          );
          //console.log("kino_sunny.shedule.length="+kino_sunny.shedule.length);
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.load_soon = function(url) {
      _debug("kino_sunny.load_soon");
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          kino_sunny.soon = JSON.parse(xmlhttp.responseText);
          // console.log('this.today= '+this.today[0].name);
          //console.log( 'this.name='+this);
          //kino_sunny.today_update(0);
          //kino_sunny.kino_active=0;
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    };

    this.today_active_kino = function(pozition) {
      _debug("kino_sunny.today_active_kino");
      if (pozition == 0) {
        //document.getElementById('kino0_sunny').style.backgroundColor="rgba(0, 170, 238, 0.3)";
        if (loader.template == "default")
          document.getElementById("kino0_sunny").style.backgroundColor =
            "rgb(34, 101, 145)";
        if (loader.template == "digital")
          document.getElementById("kino0_sunny").style.backgroundColor =
            "rgb(128, 128, 128)";
        if (loader.template == "cappuccino")
          document.getElementById("kino0_sunny").style.backgroundColor =
            "rgb(175, 70, 0)";
        if (loader.template == "emerald")
          document.getElementById("kino0_sunny").style.backgroundColor =
            "rgb(0, 107, 10)";
        if (loader.template == "ocean_blue")
          document.getElementById("kino0_sunny").style.backgroundColor =
            "rgb(0, 140, 205)";
        document.getElementById("kino0_sunny").style.zIndex = "1";
        document.getElementById("kino1_sunny").style.backgroundColor = "";
        document.getElementById("kino1_sunny").style.zIndex = "0";
        document.getElementById("kino2_sunny").style.backgroundColor = "";
        document.getElementById("kino2_sunny").style.zIndex = "0";
        if (stb.RDir("gmode") == 720) {
          document.getElementById("name0_sunny").style.width = "152px";
          document.getElementById("name1_sunny").style.width = "135px";
          document.getElementById("name2_sunny").style.width = "135px";
          document.getElementById("name0_sunny").style.left = "2px";
          document.getElementById("name1_sunny").style.left = "14px";
          document.getElementById("name2_sunny").style.left = "14px";
        }
      }
      if (pozition == 1) {
        document.getElementById("kino0_sunny").style.backgroundColor = "";
        document.getElementById("kino0_sunny").style.zIndex = "0";
        //document.getElementById('kino1_sunny').style.backgroundColor="rgba(0, 170, 238, 0.6)";
        if (loader.template == "default")
          document.getElementById("kino1_sunny").style.backgroundColor =
            "rgb(34, 101, 145)";
        if (loader.template == "digital")
          document.getElementById("kino1_sunny").style.backgroundColor =
            "rgb(128, 128, 128)";
        if (loader.template == "cappuccino")
          document.getElementById("kino1_sunny").style.backgroundColor =
            "rgb(175, 70, 0)";
        if (loader.template == "emerald")
          document.getElementById("kino1_sunny").style.backgroundColor =
            "rgb(0, 107, 10)";
        if (loader.template == "ocean_blue")
          document.getElementById("kino1_sunny").style.backgroundColor =
            "rgb(0, 140, 205)";
        document.getElementById("kino1_sunny").style.zIndex = "1";
        document.getElementById("kino2_sunny").style.backgroundColor = "";
        document.getElementById("kino2_sunny").style.zIndex = "0";
        if (stb.RDir("gmode") == 720) {
          document.getElementById("name0_sunny").style.width = "135px";
          document.getElementById("name1_sunny").style.width = "152px";
          document.getElementById("name2_sunny").style.width = "135px";
          document.getElementById("name0_sunny").style.left = "14px";
          document.getElementById("name1_sunny").style.left = "2px";
          document.getElementById("name2_sunny").style.left = "14px";
        }
      }
      if (pozition == 2) {
        document.getElementById("kino0_sunny").style.backgroundColor = "";
        document.getElementById("kino0_sunny").style.zIndex = "0";
        document.getElementById("kino1_sunny").style.backgroundColor = "";
        document.getElementById("kino1_sunny").style.zIndex = "0";
        if (loader.template == "default")
          document.getElementById("kino2_sunny").style.backgroundColor =
            "rgb(34, 101, 145)";
        if (loader.template == "digital")
          document.getElementById("kino2_sunny").style.backgroundColor =
            "rgb(128, 128, 128)";
        if (loader.template == "cappuccino")
          document.getElementById("kino2_sunny").style.backgroundColor =
            "rgb(175, 70, 0)";
        if (loader.template == "emerald")
          document.getElementById("kino2_sunny").style.backgroundColor =
            "rgb(0, 107, 10)";
        if (loader.template == "ocean_blue")
          document.getElementById("kino2_sunny").style.backgroundColor =
            "rgb(0, 140, 205)";
        document.getElementById("kino2_sunny").style.zIndex = "1";
        if (stb.RDir("gmode") == 720) {
          document.getElementById("name0_sunny").style.width = "135px";
          document.getElementById("name1_sunny").style.width = "135px";
          document.getElementById("name2_sunny").style.width = "152px";
          document.getElementById("name0_sunny").style.left = "14px";
          document.getElementById("name1_sunny").style.left = "14px";
          document.getElementById("name2_sunny").style.left = "2px";
        }
      }
    };

    this.choice_of_menus = function(color) {
      _debug("kino_sunny.choice_of_menus");
      document.getElementById("menu_sunny").style.display = "block";
      document.getElementById("pages_sunny").style.display = "block";
      document.getElementById("detail_sunny").style.display = "none";
      document.getElementById("key_info_today_sunny").style.display = "block";
      document.getElementById("detail_sunny").style.top = "20px";
      if (resolution_prefix == "_720")
        document.getElementById("detail_sunny").style.left = "0px";
      //document.getElementById('ad_sunny').style.display = 'block';
      kino_sunny.reclame_load();
      switch (color) {
        case "red":
          //console.log('this.choice_of_menus("red")');
          kino_sunny.today = kino_sunny.today_save;
          console.log("----------------**************** choice_of_menus 1");
          kino_sunny.kino_active = 0;
          kino_sunny.today_pozition = 0;
          kino_sunny.today_active_kino(0);
          kino_sunny.today_update(0);
          kino_sunny.current_layer = kino_sunny.today_layer;
          document.getElementById("today_sunny").style.display = "block";
          document.getElementById("schedule_sunny").style.display = "none";
          if (kino_sunny.today.length > 4) {
            okonchnie = " ФИЛЬМОВ";
          } else if (
            kino_sunny.today.length < 5 &&
            kino_sunny.today.length > 1
          ) {
            okonchnie = " ФИЛЬМА";
          } else {
            okonchnie = " ФИЛЬМ";
          }
          document.getElementById("header_sunny").innerHTML =
            "СЕГОДНЯ В КИНО:  " + kino_sunny.today.length + okonchnie;
          if (kino_sunny.today_pozition < kino_sunny.today.length - 3) {
            document.getElementById("right_sunny").style.display = "block";
          }
          document.getElementById("left_sunny").style.display = "none";
          document.getElementById("red_sunny").style.color = "white";
          document.getElementById("green_sunny").style.color = "gray";
          document.getElementById("yelow_sunny").style.color = "gray";
          document.getElementById("blue_sunny").style.color = "gray";
          document.getElementById("detail_sunny").style.display = "none";
          document.getElementById("key_info_today_sunny").innerHTML =
            "OK - трейлер &nbsp;&nbsp;&nbsp;&nbsp; INFO - о фильме";
          kino_sunny.detail_visible = 0;
          break;
        case "green":
          //console.log('this.choice_of_menus("green")');
          document.getElementById("today_sunny").style.display = "none";
          document.getElementById("schedule_sunny").style.display = "block";
          document.getElementById("info_blok_sunny").style.display = "block";
          document.getElementById("header_sunny").innerHTML =
            "РАСПИСАНИЕ СЕАНСОВ - ЦЕНЫ";
          document.getElementById("red_sunny").style.color = "gray";
          document.getElementById("green_sunny").style.color = "white";
          document.getElementById("yelow_sunny").style.color = "gray";
          document.getElementById("blue_sunny").style.color = "gray";
          kino_sunny.current_layer = kino_sunny.schedule_layer;
          document.getElementById("info_blok_sunny").scrollTop = 0;
          kino_sunny.shedule_update();
          document.getElementById("scrol_now_sunny").style.top = "7px";
          document.getElementById("detail_sunny").style.display = "none";
          kino_sunny.detail_visible = 0;
          break;
        case "yellow":
          //console.log('this.choice_of_menus("yellow")');
          document.getElementById("key_info_today_sunny").innerHTML =
            "OK - увеличить";
          kino_sunny.current_layer = kino_sunny.plan_layer;
          document.getElementById("kino0_sunny").style.display = "block";
          document.getElementById("kino_img0_sunny").innerHTML =
            '<img src="http://xn--42-mlcqimbe0a8d2b.xn--p1ai/images/kino/Схема зала.JPG">';
          if (resolution_prefix == "")
            document.getElementById("name0_sunny").innerHTML = "Зал (125 мест)";
          else
            document.getElementById("name0_sunny").innerHTML =
              "&nbsp;&nbsp;&nbsp;Зал (125 мест)";
          document.getElementById("genre0_sunny").innerHTML = "";
          document.getElementById("kino_data0_sunny").innerHTML = "";
          document.getElementById("kino1_sunny").style.display = "none";
          document.getElementById("kino_img1_sunny").innerHTML =
            '<img src="' +
            kino_sunny.host_url +
            "/img/mini_small_hall" +
            resolution_prefix +
            '.gif">';
          if (resolution_prefix == "")
            document.getElementById("name1_sunny").innerHTML =
              "МАЛЫЙ ЗАЙ ЗАЛ (68 МЕСТ)";
          else
            document.getElementById("name1_sunny").innerHTML =
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;МАЛЫЙ ЗАЛ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(68 МЕСТ)";
          document.getElementById("genre1_sunny").innerHTML = "";
          document.getElementById("kino_data1_sunny").innerHTML = "";
          document.getElementById("kino2_sunny").style.display = "none";
          document.getElementById("header_sunny").innerHTML = "ПЛАН ЗАЛА";
          document.getElementById("today_sunny").style.display = "block";
          document.getElementById("schedule_sunny").style.display = "none";
          document.getElementById("right_sunny").style.display = "none";
          kino_sunny.kino_active = 0;
          kino_sunny.today_active_kino(0);
          document.getElementById("left_sunny").style.display = "none";
          document.getElementById("red_sunny").style.color = "gray";
          document.getElementById("green_sunny").style.color = "gray";
          document.getElementById("yelow_sunny").style.color = "white";
          document.getElementById("blue_sunny").style.color = "gray";
          document.getElementById("detail_sunny").style.display = "none";
          kino_sunny.detail_visible = 0;
          break;
        case "blue":
          //console.log('this.choice_of_menus("blue")');
          kino_sunny.today = kino_sunny.soon;
          kino_sunny.kino_active = 0;
          kino_sunny.today_pozition = 0;
          kino_sunny.today_active_kino(0);
          kino_sunny.today_update(0);
          kino_sunny.current_layer = kino_sunny.today_layer;
          document.getElementById("key_info_today_sunny").innerHTML =
            "OK - трейлер &nbsp;&nbsp;&nbsp;&nbsp; INFO - о фильме";
          document.getElementById("today_sunny").style.display = "block";
          document.getElementById("schedule_sunny").style.display = "none";
          document.getElementById("header_sunny").innerHTML = "СКОРО В КИНО";
          if (kino_sunny.today_pozition < kino_sunny.today.length - 3) {
            document.getElementById("right_sunny").style.display = "block";
          }
          document.getElementById("left_sunny").style.display = "none";
          document.getElementById("red_sunny").style.color = "gray";
          document.getElementById("green_sunny").style.color = "gray";
          document.getElementById("yelow_sunny").style.color = "gray";
          document.getElementById("blue_sunny").style.color = "white";
          document.getElementById("detail_sunny").style.display = "none";
          kino_sunny.detail_visible = 0;
          break;
      }
    };
    this.reclame_load = function() {
      _debug("kino_sunny.reclame_load");

      var xmlhttp_r = new XMLHttpRequest();
      //if (stb.RDir('gmode')==720)
      if (resolution_prefix == "_720") {
        //var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php';
        var url_r = "http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php";
      } else {
        //var url_r = 'http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php';
        var url_r = "http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php";
      }

      xmlhttp_r.onreadystatechange = function() {
        if (xmlhttp_r.readyState == 4 && xmlhttp_r.status == 200) {
          if (xmlhttp_r.responseText.indexOf("img") > -1) {
            document.getElementById("ad_ad_sunny").innerHTML =
              xmlhttp_r.responseText;
            document.getElementById("ad_sunny").style.display = "block";
          } else {
            document.getElementById("ad_sunny").style.display = "none";
          }
        }
      };
      xmlhttp_r.open("GET", url_r, true);
      xmlhttp_r.send();

      // }
    };

    this.reclame_load1 = function() {
      //   if (module.reklama_gismeteo)
      //{

      var xmlhttp_r = new XMLHttpRequest();
      if (stb.RDir("gmode") == 720) {
        var url_r = "http://xn--d1abdw2b.net/include/kliktv_kuzbass_inc.php";
      } else {
        var url_r = "http://xn--d1abdw2b.net/include/kliktv_kuzbasshd_inc.php";
      }

      xmlhttp_r.onreadystatechange = function() {
        if (xmlhttp_r.readyState == 4 && xmlhttp_r.status == 200) {
          document.getElementById("ad_ad1_sunny").innerHTML =
            xmlhttp_r.responseText;
          document.getElementById("ad_sunny").style.top = "20px";
          document.getElementById("ad1_sunny").style.top = "260px";
          document.getElementById("ad1_sunny").style.display = "block";
        }
      };
      xmlhttp_r.open("GET", url_r, true);
      xmlhttp_r.send();

      // }
    };

    this.key_press = function(button) {
      ////////////////////////////////////////////////////////////
      if (kino_sunny.current_layer == kino_sunny.today_layer) {
        switch (button) {
          case "left":
            // console.log('press left');
            if (kino_sunny.detail_visible == 0) {
              if (
                kino_sunny.today_pozition != 0 &&
                kino_sunny.kino_active == 0
              ) {
                kino_sunny.today_pozition = kino_sunny.today_pozition - 1;
                kino_sunny.today_update(kino_sunny.today_pozition);
              }
              if (kino_sunny.kino_active != 0)
                kino_sunny.kino_active = kino_sunny.kino_active - 1;
              kino_sunny.today_active_kino(kino_sunny.kino_active);
              if (
                kino_sunny.kino_active == 2 &&
                kino_sunny.today_pozition == kino_sunny.today.length - 3
              ) {
                document.getElementById("right_sunny").style.display = "none";
              } else {
                if (kino_sunny.today_pozition < kino_sunny.today.length - 3) {
                  document.getElementById("right_sunny").style.display =
                    "block";
                } else {
                  document.getElementById("right_sunny").style.display = "none";
                }
              }
              if (kino_sunny.today_pozition > 0) {
                document.getElementById("left_sunny").style.display = "block";
              } else {
                document.getElementById("left_sunny").style.display = "none";
              }
            }
            break;
          /////////////////////////////////////////////////////////////
          case "right":
            //console.log('press right');
            if (kino_sunny.detail_visible == 0) {
              if (
                kino_sunny.kino_active != 2 &&
                kino_sunny.kino_active <= kino_sunny.today.length - 1
              ) {
                kino_sunny.kino_active = kino_sunny.kino_active + 1;
              } else {
                if (kino_sunny.today_pozition == null) {
                  kino_sunny.today_pozition = 0;
                }
                if (kino_sunny.kino_active < kino_sunny.today.length - 1) {
                  if (kino_sunny.today_pozition != kino_sunny.today.length - 3)
                    kino_sunny.today_pozition = kino_sunny.today_pozition + 1;
                  //console.log("kino_sunny.today_pozition="+kino_sunny.today_pozition);
                }

                kino_sunny.today_update(kino_sunny.today_pozition);
              }
              kino_sunny.today_active_kino(kino_sunny.kino_active);
              if (
                kino_sunny.kino_active == 2 &&
                kino_sunny.today_pozition == kino_sunny.today.length - 3
              ) {
                document.getElementById("right_sunny").style.display = "none";
              } else {
                if (kino_sunny.today_pozition < kino_sunny.today.length - 3) {
                  document.getElementById("right_sunny").style.display =
                    "block";
                } else {
                  document.getElementById("right_sunny").style.display = "none";
                }
              }
              if (kino_sunny.today_pozition > 0) {
                document.getElementById("left_sunny").style.display = "block";
              } else {
                document.getElementById("left_sunny").style.display = "none";
              }
            }
            break;
          case "ok":
            //console.log('press ok');

            var url =
              "http://212.77.128.203/kinoteatr/public/video/" +
              kino_sunny.today[
                kino_sunny.kino_active + kino_sunny.today_pozition
              ].youtube;

            if (kino_sunny.detail_visible == 0) {
              var item = {
                name: get_word(
                  kino_sunny.today[
                    kino_sunny.kino_active + kino_sunny.today_pozition
                  ].name + " - Трейлер"
                ),
                cmd: "ffmpeg " + url
              };
              stb.set_cur_place("demo");

              //main_menu.hide();
              module.kino_sunny.hide();
              stb.player.prev_layer = this;
              stb.player.play(item);
            } else {
              document.getElementById("detail_sunny").style.display = "none";
              kino_sunny.detail_visible = 0;
              document.getElementById("detail_sunny").style.top = "20px";
              document.getElementById("pages_sunny").style.display = "block";
              document.getElementById("ad_sunny").style.display = "block";
            }

            break;
          case "info":
            //console.log('press info');
            if (kino_sunny.detail_visible == 0) {
              document.getElementById("detail_sunny").innerHTML =
                "<p><span class='detail_class'><i><font color='yellow'>Название:</i></font> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].name +
                "</b></span></p><p><span class='detail_class'><i><font color='yellow'>Жанр:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].genre +
                "</b></span></p><p><span class='detail_class'><i><font color='yellow'>Страна:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].country +
                "</b></span></p><p><span class='detail_class'><i><font color='yellow'>Режиссер:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].director +
                "</b></span></p><div class='detail_class' id='detail_starring'><i><font color='yellow'>В главных ролях:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].starring +
                "</b></div><p><span class='detail_class'><i><font color='yellow'>Возрастное ограничение:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].age_limit +
                "</b></span></p><div class='detail_class' id='detail_description'><i><font color='yellow'>О фильме:</font></i> <b>" +
                kino_sunny.today[
                  kino_sunny.kino_active + kino_sunny.today_pozition
                ].description +
                "</b></div><br><p class='detail_class' align='center'>OK / INFO - выбор фильма</p>";
              document.getElementById("detail_sunny").style.top = "75px";
              document.getElementById("pages_sunny").style.display = "none";
              document.getElementById("ad_sunny").style.display = "none";
              document.getElementById("detail_sunny").style.display = "block";
              kino_sunny.detail_visible = 1;
            } else {
              document.getElementById("detail_sunny").style.display = "none";
              kino_sunny.detail_visible = 0;
              document.getElementById("detail_sunny").style.top = "20px";
              document.getElementById("pages_sunny").style.display = "block";
              document.getElementById("ad_sunny").style.display = "block";
            }
            break;
        }
      }
      if (kino_sunny.current_layer == kino_sunny.schedule_layer) {
        switch (button) {
          case "down":
            document.getElementById("info_blok_sunny").scrollTop =
              document.getElementById("info_blok_sunny").scrollTop + 60;
            if (resolution_prefix == "")
              document.getElementById("scrol_now_sunny").style.top =
                7 +
                Math.floor(
                  ((100 *
                    document.getElementById("info_blok_sunny").scrollTop) /
                    (document.getElementById("info_blok_sunny").scrollHeight -
                      400)) *
                    3.96
                ) +
                "px";
            else
              document.getElementById("scrol_now_sunny").style.top =
                7 +
                Math.floor(
                  ((100 *
                    document.getElementById("info_blok_sunny").scrollTop) /
                    (document.getElementById("info_blok_sunny").scrollHeight -
                      525)) *
                    4.57
                ) +
                "px";
            break;
          case "up":
            document.getElementById("info_blok_sunny").scrollTop =
              document.getElementById("info_blok_sunny").scrollTop - 60;
            if (resolution_prefix == "")
              document.getElementById("scrol_now_sunny").style.top =
                7 +
                Math.floor(
                  ((100 *
                    document.getElementById("info_blok_sunny").scrollTop) /
                    (document.getElementById("info_blok_sunny").scrollHeight -
                      400)) *
                    3.96
                ) +
                "px";
            else
              document.getElementById("scrol_now_sunny").style.top =
                7 +
                Math.floor(
                  ((100 *
                    document.getElementById("info_blok_sunny").scrollTop) /
                    (document.getElementById("info_blok_sunny").scrollHeight -
                      525)) *
                    4.57
                ) +
                "px";
            break;
        }
      }
      if (kino_sunny.current_layer == kino_sunny.plan_layer) {
        switch (button) {
          case "right":
            break;
          case "left":
            if (kino_sunny.detail_visible == 0) {
              kino_sunny.kino_active = 0;
              kino_sunny.today_active_kino(0);
            }
            break;
          case "ok":
          case "back":
            if (kino_sunny.detail_visible == 0) {
              if (kino_sunny.kino_active == 0) {
                if (resolution_prefix == "_720") {
                  //document.getElementById('detail_sunny').style.left = '208px';
                  //document.getElementById('detail_sunny').style.left = '208px';
                  document.getElementById("detail_sunny").innerHTML =
                    '<img src="http://xn--42-mlcqimbe0a8d2b.xn--p1ai/images/kino/Схема зала.JPG"><br><span style="color: white; font-size: 25px; margin-left: 300px;">OK / BACK - выбор зала</span>';
                } else {
                  document.getElementById("detail_sunny").innerHTML =
                    '<img src="http://xn--42-mlcqimbe0a8d2b.xn--p1ai/images/kino/Схема зала.JPG"><span style="color: white;"><p align="center">OK / BACK - выбор зала</p></span>';
                }
              }
              if (kino_sunny.kino_active == 1)
                if (resolution_prefix == "_720") {
                  document.getElementById("detail_sunny").innerHTML =
                    '<img src="' +
                    kino_sunny.host_url +
                    "/img/small_hall" +
                    resolution_prefix +
                    '.gif"><br><span style="color: white; font-size: 25px; margin-left: 300px;">OK / BACK - выбор зала</span>';
                } else {
                  document.getElementById("detail_sunny").innerHTML =
                    '<img src="' +
                    kino_sunny.host_url +
                    "/img/small_hall" +
                    resolution_prefix +
                    '.gif"><span style="color: white;"><p align="center">OK / BACK - выбор зала</p></span>';
                }
              document.getElementById("detail_sunny").style.display = "block";
              document.getElementById("detail_sunny").style.top = "0px";
              kino_sunny.detail_visible = 1;
              document.getElementById("key_info_today_sunny").style.display =
                "none";
            } else {
              document.getElementById("detail_sunny").innerHTML = "";
              document.getElementById("detail_sunny").style.display = "none";
              kino_sunny.detail_visible = 0;
              document.getElementById("key_info_today_sunny").style.display =
                "block";
            }
            break;
        }
      }
      if (kino_sunny.current_layer == kino_sunny.future_layer) {
      }
      if (kino_sunny.current_layer < 5) {
        if (button == "red") kino_sunny.choice_of_menus("red");
        if (button == "green") kino_sunny.choice_of_menus("green");
        if (button == "yellow") kino_sunny.choice_of_menus("yellow");
        if (button == "blue") kino_sunny.choice_of_menus("blue");
      }
    };

    this.bind = function() {
      (function() {
        this.hide();
        //    this.tab_click(0);
        main_menu.show();
      }
        .bind(key.EXIT, this)
        .bind(key.MENU, this));
      this.key_press.bind(key.LEFT, this, "left");
      this.key_press.bind(key.RIGHT, this, "right");
      this.key_press.bind(key.OK, this, "ok");
      this.key_press.bind(key.RED, this, "red");
      this.key_press.bind(key.GREEN, this, "green");
      this.key_press.bind(key.YELLOW, this, "yellow");
      this.key_press.bind(key.BLUE, this, "blue");
      this.key_press.bind(key.DOWN, this, "down");
      this.key_press.bind(key.UP, this, "up");
      this.key_press.bind(key.BACK, this, "back");
      this.key_press.bind(key.INFO, this, "info");
    };
  }

  kino_sunny_constructor.prototype = new BaseLayer();
  var kino_sunny = new kino_sunny_constructor();
  kino_sunny.init();
  kino_sunny.bind();
  kino_sunny.init_header_path("Кинотеатр солнечный");
  kino_sunny.hide();
  module.kino_sunny = kino_sunny;

  if (!module.my_city_sub) {
    module.my_city_sub = [];
  }

  module.my_city_sub.push({
    title: 'Кинотеатр "солнечный"',
    cmd: function() {
      main_menu.hide();
      //module.kino_sunny.show();
      //document.getElementById('loading_sunny').innerHTML = "Загрузка...";
      document.getElementById("ad_sunny").style.display = "none";
      document.getElementById("ad1_sunny").style.display = "none";
      document.getElementById("menu_sunny").style.display = "none";
      document.getElementById("loading_sunny").style.display = "block";
      kino_sunny.load_today(
        "http://212.77.128.203:8006/proxy?url=http://xn--42-mlcqimbe0a8d2b.xn--p1ai/sunnyRikt/today.php"
      );
      kino_sunny.today_active_kino(0);
      kino_sunny.today_pozition = 0;
      document.getElementById("pages_sunny").style.display = "none";
      //kino_sunny.current_layer=kino_sunny.today_layer;
      kino_sunny.current_layer = 10; //любое число не соответствующее слоям
      kino_sunny.show();
    }
  });
})();

loader.next();
