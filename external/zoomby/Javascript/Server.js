var Server =
{
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    
    XHRObj : null,
    url : "http://www.zoomby.ru/api/json/menu",
    Play_url : "",
    query_result : null,
    parse_result : null, 
    chan_pages : 0,
    selected_category : 0,
    selected_genre : 0,
    epizode_url : null,
    epizode_page : 1,
	step : [],
	undex : 0,
	step_selected_element : [],
	step_selected_page_menu : [],
  step_selected_category : 0,
  step_selected_genre : 0,
  step_selected_page : 0,
  step_save_picture : null,
  page_catalog : 1,
  search : 0,
  trimmed : ""
}

function getXmlHttp() {
  if (typeof XMLHttpRequest === 'undefined') {
    XMLHttpRequest = function() {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {}
      try { return new ActiveXObject("Microsoft.XMLHTTP"); }
        catch(e) {}
      throw new Error("This browser does not support XMLHttpRequest.");
    };
  }
  return new XMLHttpRequest();
}

Server.Request_menu = function()
 {
    $.getJSON("http://www.zoomby.ru/api/json/menu", {source: "samsung"}, function(json){
    //RGraph.pr(json.menu);
    //console.log(json.menu[0].name);
    Server.query_result = json.menu;
    //console.log(Server.query_result[1].name);
    data = Server.query_result;
   Server.parse_result = Server.query_result;
//console.log("K-vo obektov="+Server.parse_result.length);
  if ((data.length % 10)>0)
  {
  Server.chan_pages = Math.floor(data.length/10) + 1;
  }
   else
  {
  Server.chan_pages = Math.floor(data.length/10);
  }
//  console.log("Server.chan_pages="+Server.chan_pages);
  Main.new_layer="MENU";
  Main.updatePage();
  Main.Start();
  });

  
 }
Server.Request_catalog = function ()
{
  if (Server.search == 0)
  {
  $.getJSON("http://www.zoomby.ru/api/json/catalog",
  {
    category: Server.selected_category,
    genre: Server.selected_genre,
    page: Server.page_catalog,
    limit: 10,
    source: "samsung"
  },
  function(json){
  Server.query_result = json;
 // console.log(json);
  Server.parse_result = Server.query_result;
//  console.log(Server.query_result.total); 
  Main.new_layer="CATALOG";
  Main.updatePage_catalog();
  document.getElementById("loading").style.display = "none";
  });
  }
  else
  {
   if (Server.trimmed != "")
   {
    $.getJSON("http://www.zoomby.ru/api/json/catalog",
  {
    q: Server.trimmed,
    limit: 10,
    page: Server.page_catalog,
    source: "samsung"
  },
  function(json){
  Server.query_result = json;
 // console.log(json);
  Server.parse_result = Server.query_result;
//  console.log(Server.query_result.total);
  if (Server.query_result.total !=  0)
  {
  Main.new_layer="CATALOG";
  Main.updatePage_catalog();
  document.getElementById("loading").style.display = "none";
  }
  else
  {
  // console.log("nichego ne naideno");
   document.getElementById("not_found").style.display = "block";
   document.getElementById("loading").style.display = "none";
   document.getElementById("top").style.display = "none";
   document.getElementById("navi").style.display = "none";
   Main.new_layer="NOT FOUND";
   Main.layer="NOT FOUND";
  }
  }); 
  }
  else
  {
        document.getElementById("yt_search_bg").style.display = "none";
        document.getElementById("channelList").style.display = "block";
        document.getElementById("info").style.display = "block";
        document.getElementById("widget_time").style.display = "block";
        document.getElementById("loading").style.display = "none";
        Main.new_layer="MENU";
        Main.layer="MENU";
        Server.search = 0;
  }
  }
}

Server.Request_epizodes = function ()
{
  $.getJSON("http://www.zoomby.ru"+Server.epizode_url,
  {
    limit: 10,
    page: Server.epizode_page,
    source: "samsung"
  },
  function(json){
  Server.query_result = json;
 // console.log(json);
  Server.parse_result = Server.query_result;
 // console.log(Server.query_result.total); 
  Main.new_layer="EPIZODES";
  Main.updatePage_epizodes();
  document.getElementById("loading").style.display = "none";
  });
}

Server.Request_data = function()
 {    
       url= Server.url;

    try {
                var request = getXmlHttp();
        request.open('GET', url, true);
        request.setRequestHeader("Content-Type", "text/xml");
        request.setRequestHeader("charset", "utf-8");
        if (request.overrideMimeType) {
            request.overrideMimeType('text/html');
        }
        request.onreadystatechange = function ()
        {
            if (request.readyState == 4 && request.status == 200) 
                  {
                  //alert ('Функция удачно отработала');
                  Server.query_result = request.responseText;
				  //console.log(Server.query_result);
                   //$('#info').html(Server.query_result);
                   //alert ("Server.query_result.length="+Server.query_result.length);
				   //---------------------------------
				   //Server.step[undex] = Server.query_result;
				   //---------------------------------
				   //--Server.Data_Parse();
                  }
        };
        request.send(null); // send object
     } catch (e) {
        //log("catch (e): \"" + e + "\"");
        alert("Ошибка: "+ e);
        return;
    }
}


Server.Request1 = function()
{
  Server.query_result='[ { "playable" : false, "icons" : [ "http://static.zoomby.ru/static/images/zoomby/xbmc-series.jpg", "", "http://static.zoomby.ru/static/images/zoomby/xbmc-zoomby.jpg" ], "title" : "Сериалы", "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Fcatalog%2Fseries", "folder" : true }, { "playable" : false, "icons" : [ "http://static.zoomby.ru/static/images/zoomby/xbmc-films.jpg", "", "http://static.zoomby.ru/static/images/zoomby/xbmc-zoomby.jpg" ], "title" : "Фильмы", "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Fcatalog%2Ffilms", "folder" : true }, { "playable" : false, "icons" : [ "http://static.zoomby.ru/static/images/zoomby/xbmc-shows.jpg", "", "http://static.zoomby.ru/static/images/zoomby/xbmc-zoomby.jpg" ], "title" : "Телепередачи", "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Fcatalog%2Fshows", "folder" : true }, { "playable" : false, "icons" : [ "http://static.zoomby.ru/static/images/zoomby/xbmc-cartoons.jpg", "", "http://static.zoomby.ru/static/images/zoomby/xbmc-zoomby.jpg" ], "title" : "Мультфильмы", "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Fcatalog%2Fcartoons", "folder" : true } ]';
}

Server.Data_Parse = function()
{
  //var jsontext = Server.query_result;
  //var data = JSON.parse(jsontext);
  //var data = JSON.parse(Server.query_result.replace(/\n/gim, ""));
  //var data = JSON.parse(Server.query_result);
   //alert('data='+data);
   //Server.parse_result = data;
   data = Server.query_result;
   Server.parse_result = Server.query_result;
//console.log("K-vo obektov="+Server.parse_result.length);
  if ((data.length % 10)>0)
  {
	Server.chan_pages = Math.floor(data.length/10) + 1;
	}
	 else
  {
  Server.chan_pages = Math.floor(data.length/10);
  }
 // console.log("Server.chan_pages="+Server.chan_pages);
  Main.updatePage();
	
}

Server.Request2 = function()
{
  Server.query_result='[ { "icons" : [ "http://static.zoomby.ru/static/img/18/ea/18ea52acce591481fcd98c0a84551cbb.jpg", "http://static.zoomby.ru/static/img/18/ea/18ea52acce591481fcd98c0a84551cbb.jpg", "http://static.zoomby.ru/static/img/18/ea/18ea52acce591481fcd98c0a84551cbb.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F34932", "folder" : true, "rating" : 4, "tvshowtitle" : "Кухня", "playable" : false, "plot" : "«Кухня» – это сериал о человеческих отношениях, о том, что кухня большого ресторана – это место, где не только готовится вкусная еда, но и плетутся интриги, завязываются отношения, разгораются страсти. Чтобы ближе познакомиться с закулисной жизнью знаменитого ресторана, смотрите онлайн в хорошем качестве сериал «Кухня» на нашем видео-портале Zoomby.ru.\nМаксим Лавров, выпускник воронежского кулинарного колледжа, приезжает в Москву, чтобы осуществить свою заветную мечту – стать известным шеф-поваром. По его мнению, человек, умеющий вкусно готовить, может управлять миром, ведь без еды человеческая жизнь невозможна. Приехав в столицу, Максим устраивается в один из самых дорогих ресторанов города – «Клод Моне». Арт-директор заведения 27-летняя Виктория Гончарова, настоящая карьеристка, готова пойти на все, чтобы снискать ресторану «Клод Моне» славу лучшего места не только в столице, но и в стране в целом, обеспечить себе еще одну потрясающую победу на профессиональном поприще и потешить свое самолюбие. Шеф-повар ресторана Виктор Баринов – кулинар от Бога. Он широко известен и уважаем среди московской элиты, которая никогда не откажет себе в удовольствии полакомиться изысканным блюдом. Но у знаменитого шеф-повара есть свои недостатки: он обладает невыносимым характером, неравнодушен к азартным играм и любит выпить. \nАктеры, принимавшие участие в съемках сериала: Дмитрий Назаров, Марк Богатырев, Дмитрий Нагиев, Юлия Такшина, Елена Подкаминская, Марина Могилевская, Сергей Лавыгин, Никита Тарасов, Ольга Кузьмина и другие. Режиссер картины – Дмитрий Дьяченко, больше всего известный своими работами «О чем говорят мужчины» и «День радио». \nДля того чтобы создать атмосферу настоящего ресторана, авторы сценария сериала «Кухня» смотрели всевозможные кулинарные программы и сериалы и читали специализированную литературу. А актеры участвовали в мастер-классах от опытных поваров, учились художественно нарезать овощи кубиками и соломкой и овладевали другими кулинарными секретами. Лучше всего получалось у Дмитрия Назарова, но это и не мудрено: он несколько лет был ведущим шоу «Кулинарный поединок» на НТВ.", "type" : "video", "title" : "Кухня", "episode" : 0, "season" : 0, "year" : 2012 }, { "icons" : [ "http://static.zoomby.ru/static/img/d6/30/d6308fd336aecae4459694d5ff3f74f5.jpg", "http://static.zoomby.ru/static/img/d6/30/d6308fd336aecae4459694d5ff3f74f5.jpg", "http://static.zoomby.ru/static/img/d6/30/d6308fd336aecae4459694d5ff3f74f5.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F922", "folder" : true, "rating" : 4, "tvshowtitle" : "Танки грязи не боятся", "playable" : false, "plot" : "Старик-генерал приглашает Внука по семейной традиции отметить День Победы на даче. В конце праздничного застолья генерал поднимает рюмку за родителей Внука, погибших в Афганистане, и надеется, что Внук продолжит семейную традицию и станет офицером-танкистом. Внук, всю жизнь мечтавший стать кинорежиссером, как Данелия, взрывается - он не позволит ездить танком по его судьбе и мечтам. Он признается, что ненавидит эти вонючие машины, созданные для смерти и разрушения. Хлопнув дверью, он прыгает в машину и уезжает. По дороге Внук влезает в драку с подвыпившими мужиками, которые пристают к девчонкам. Исход печальный - мужики откупаются от ментов, а Внуку грозит срок. Подключив свои связи деду удается добиться вполне безобидного исхода ситуации - отдать парня в действующую армию. Внук вынужден согласиться и сам выбирает танковую часть неподалеку от Москвы и своих обидчиков, с которыми не оставляет мысли поквитаться. А военная служба готовит ему немало сюрпризов и неожиданных поворотов в судьбе…", "type" : "video", "title" : "Танки грязи не боятся", "episode" : 0, "season" : 0, "year" : 2009 }, { "icons" : [ "http://static.zoomby.ru/static/img/8f/e8/8fe83ce995adf795b1bbfafd75b20eae.jpg", "http://static.zoomby.ru/static/img/8f/e8/8fe83ce995adf795b1bbfafd75b20eae.jpg", "http://static.zoomby.ru/static/img/8f/e8/8fe83ce995adf795b1bbfafd75b20eae.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F25", "folder" : true, "rating" : 5, "tvshowtitle" : "Агентство НЛС", "playable" : false, "plot" : "В этом сериале есть все – от комедии до триллера. Но если коротко – это авантюрное кино. Главные герои сериала – молодые люди, друзья, решившие заняться собственным делом– открыть частное агентство по решению Нестандартных Личных Ситуаций. Пять настоящих детективов: Михаил - мозговой центр агентства, Андрей - плейбой, любимец женщин, Лариса – леди, всегда корректна, молоденькая секретарша Даша –разрушительница моральных устоев и незаменимый помощник. Иваныч – немолодой человек старой закваски, который сумел наладить прекрасные отношения со своими коллегами, годящимися ему во внуки. Кто может стать их клиентом? Кто угодно, начиная от несчастных влюбленных, заканчивая пожилой дамой, которая запуталась в своих племянниках. Агентство НЛС берется за любое дело, от которого с удовольствием отказался бы любой нормальный следователь. Для того чтобы довести начатое до конца, героям предстоят и переодевания, и вживание в непривычный образ, и внедрение во вражеское окружение. Эта работа только на первый взгляд может показаться забавной – друзей будут не раз подстерегать опасности, порой даже смертельные… Но в любой ситуации героев будет спасать самое беспроигрышное оружие – юмор.", "type" : "video", "title" : "Агентство НЛС", "episode" : 0, "season" : 0, "year" : 2001 }, { "icons" : [ "http://static.zoomby.ru/static/img/d3/70/d370e7e33950ef0b544aa8b72fd63cdf.jpg", "http://static.zoomby.ru/static/img/d3/70/d370e7e33950ef0b544aa8b72fd63cdf.jpg", "http://static.zoomby.ru/static/img/d3/70/d370e7e33950ef0b544aa8b72fd63cdf.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F641", "folder" : true, "rating" : 4, "tvshowtitle" : "Семь жен одного холостяка", "playable" : false, "plot" : "В небольшом провинциальном городе живет немолодой уже, но и не старый, шофер-дальнобойщик Гена. Мужик он веселый, бойкий, хохмач, женолюб, авантюрист, привыкший брать от жизни все, - словом, персонаж «с изюминкой». По роду деятельности колесит он по необъятной нашей Родине, сталкиваясь с различными людьми и попадая то в смешные, то в смертельно опасные ситуации. И есть у нашего героя свой секрет: почти в каждом крупном и мелком городе живет у него жена, более или менее законная. Однажды, когда он отправляется в очередной рейс, одна из «жён» узнаёт о существовании других и решает, собрав остальных женщин, проучить своего «благоверного»...", "type" : "video", "title" : "Семь жен одного холостяка", "episode" : 0, "season" : 0, "year" : 2009 }, { "icons" : [ "http://static.zoomby.ru/static/img/f9/a1/f9a1a21bc634c6cff0be046c52f1e06a.jpg", "http://static.zoomby.ru/static/img/f9/a1/f9a1a21bc634c6cff0be046c52f1e06a.jpg", "http://static.zoomby.ru/static/img/f9/a1/f9a1a21bc634c6cff0be046c52f1e06a.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F26", "folder" : true, "rating" : 4, "tvshowtitle" : "Агентство НЛС-2", "playable" : false, "plot" : "Как и в первом сезоне сериала, команда молодых сотрудников Агентства помогает людям в решении личных проблем. Зачастую, казалось бы, простое «сердечное» дело втягивает их в криминальную историю, и наоборот: дело с жутковатым началом оборачивается фарсом. Теперь у Агентства – новый офис, и не где-нибудь, а на корабле! Работа для «личных» детективов превратится в настоящее захватывающее приключение.", "type" : "video", "title" : "Агентство НЛС-2", "episode" : 0, "season" : 0, "year" : 2009 }, { "icons" : [ "http://static.zoomby.ru/static/img/da/3f/da3f6766bca4f768b08e7f657e2c1994.jpg", "http://static.zoomby.ru/static/img/da/3f/da3f6766bca4f768b08e7f657e2c1994.jpg", "http://static.zoomby.ru/static/img/da/3f/da3f6766bca4f768b08e7f657e2c1994.jpg" ], "uri" : "func=getitems&href=http%3A%2F%2Fapi.zoomby.ru%2Fxbmc%2Ftitle%2F49832", "folder" : true, "rating" : 4, "tvshowtitle" : "Думай как женщина", "playable" : false, "plot" : "Разгадать, чего хочет женщина, хотят многие. Особенно эта загадка интересна мужчинам, и поломать голову над ответом предстоит актеру Марату Башарову, который исполняет главную роль в новом сериале «Думай как женщина».\n\nГерой Марата Башарова — Евгений Новиков — заместитель генерального директора крупной туристической компании «Отдохни Ко», а также гуру и спец по женским сердцам. Он с легкостью меняет подруг и даже не собирается искать «ту единственную». Друзья женятся, а Женя остается все тем же прожигателем жизни и ловеласом — он запросто может выкрасть друга-жениха за день до свадьбы, устроить ему мальчишник на Кипре, провести ночь с прекрасной девушкой, отбив её у спутника…", "type" : "video", "title" : "Думай как женщина", "episode" : 0, "season" : 0, "year" : 2013 } ]';
}

Server.Request_parse_data_for_play_url = function()
 {    
       url=(Server.parse_result[(Main.selected_page*10)+Main.selected_element].uri).substring(15,(Server.parse_result[(Main.selected_page*10)+Main.selected_element].uri).length);
       url=convert(url);
      // console.log("url="+url);
    try {
                var request = getXmlHttp();
        request.open('GET', url, true);
        request.setRequestHeader("Content-Type", "text/xml");
        request.setRequestHeader("charset", "utf-8");
        if (request.overrideMimeType) {
            request.overrideMimeType('text/html');
        }
        request.onreadystatechange = function ()
        {
            if (request.readyState == 4 && request.status == 200) 
                  {
                  //alert ('Функция удачно отработала');
                  
                  var jsontext = request.responseText;
  var data = JSON.parse(jsontext);
  Server.Play_url = data.url;
          //console.log("request.responseText="+request.responseText);
          //console.log("Server.Play_url="+Server.Play_url);
          Main.layer="FILM_INFO";    
           Server.tt1();    
                             }
        };
        request.send(null); // send object
     } catch (e) {
        //log("catch (e): \"" + e + "\"");
        alert("Ошибка: "+ e);
        return;
    }

}

Server.tt1 = function()
 {    
       //console.log("url="+url);
       url=Server.Play_url;
    try {
                var request = getXmlHttp();
        request.open('GET', url, true);
        request.setRequestHeader("Content-Type", "text/xml");
        request.setRequestHeader("charset", "utf-8");
        if (request.overrideMimeType) {
            request.overrideMimeType('text/html');
        }
        request.onreadystatechange = function ()
        {
            if (request.readyState == 4 && request.status == 200) 
                  {
                  //alert ('Функция удачно отработала');
                 // console.log("request.responseText="+request.responseText);
                  }
        };
        request.send(null); // send object
     } catch (e) {
        //log("catch (e): \"" + e + "\"");
        alert("Ошибка: "+ e);
        return;
    }
}

function convert(s) //Функция для замены в урле "%3A" на ":" и "%2F" на "/"
{
    s=((s.replace(/%3A/gim, ":")).replace(/%2F/gim, "/"));

    return s;
}