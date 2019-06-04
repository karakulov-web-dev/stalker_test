window.onload = init;               // Initialization for event onLoad
window.onkeydown = keyProcessing;   // Intercept events keydown and sent in into function keyProcessing (key-Processing.js)

var debug = false;
var emulate = false;
var main_lang ="ru";
var stb = new Object();
var win = {
    "width":720,
    "height":576
};

try {
    emulate = false;
    stb = gSTB; // if emulate - set a cap for main class management of device
}
catch(e){
    emulate = true;
    stb = egSTB;
}

function init() {
     win = {"width":screen.width, "height":screen.height};
/*
    win = { "width":720, "height":576 };
    win = { "width":1280, "height":720 };
    win = { "width":1920, "height":1280 };
*/
    var graphicres_mode = "720";
    switch(win.height) {
        case 720:
            graphicres_mode = "1280";
        break;
        case 1080:
            graphicres_mode = "1920";
        break;
        case 480:
        case 576:
            graphicres_mode = "720";
        break;
    }
    
    window.moveTo(0, 0);
    try {
        stb = gSTB;
        window.resizeTo(win.width, win.height);
        stb.EnableAppButton(false);
    }
    catch(e){}

    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", 'css/screen' + win.height + '.css?v=' + random(1000));    
    document.getElementsByTagName("head")[0].appendChild(fileref);

   loadScript('js/langs/videocatalog_ru.js', 'load_vars()');
   
   //$('head').append('<link rel="stylesheet" type="text/css" href="css/ribbon720.css?v='+ random(1000) +'>');

   var vc_start_value = getEnvironmentValue('vc_start_value');
   
   if (vc_start_value!='')
     { 
        current.volume = 'vol_'+vc_start_value;
        stb.SetVolume(vc_start_value);
     } else {
        stb.SetVolume(95);
     }

/*Для отключения рекламы*/
//clearTimeout(timer_videocatalog);
//setTimeout('document.getElementById("loader").style.display="none";',0);
/*------------------------------------*/

  if ((stb.RDir("getenv ad")!=0)||(stb.RDir("getenv ad")==''))
    {   
      var xmlhttp = new XMLHttpRequest();
       if (graphicres_mode==720)
        {
              var url = 'http://xn--d1abdw2b.net/include/kliktv_loading_inc.php';
        }
        else
        {
             var url = 'http://xn--d1abdw2b.net/include/kliktv_loadinghd_inc.php';
        }
      xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {        
        if (xmlhttp.responseText.indexOf("img")>-1)
         {
          clearTimeout(timer_videocatalog);
          document.getElementById('loader').innerHTML=xmlhttp.responseText+'<div id="loader1"><img align="middle" src="img/loading_6.gif"> &nbsp;&nbsp;Загрузка</div>';
          setTimeout('document.getElementById("loader").style.display="none";',5000);
        }
       }
     }
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
  }
}

function load_vars() {
    try {
        fillPage();
    } catch(e) {
        loadScript('js/langs/videocatalog_ru.js', 'load_vars()');
     }
}

/**
 * `getData` is request function for receive description movements from YoTube API
 *
 * @function
 * @name getData
 * @param {function(opt_feedUrl, callbackFunctionName):*}
 * @example
 * getData('http://gdata.youtube.com/feeds/api/standardfeeds/top_rated?v=2&alt=jsonc&start-index=1&max-results=10', 'callback');
 * @return void
 */
//getData_h используем для актуального обновления папки (например истории) без кеширования
function getData_h(opt_feedUrl, callbackFunctionName) {
    loading.show();
    if(!opt_feedUrl) {return;}
    opt_feedUrl += '&rnd=' + random(1000) + '&callback=' + callbackFunctionName;
    var apiRequestNode = document.createElement('script');
    apiRequestNode.src = opt_feedUrl;
    //apiRequestNode.id = 'google-jsonc-request_history';
    apiRequestNode.id = 'google-jsonc-request';
    apiRequestNode.type = 'text/javascript';
    document.documentElement.firstChild.appendChild(apiRequestNode);
}

function getData(opt_feedUrl, callbackFunctionName) {
    loading.show();
    if(!opt_feedUrl) {return;}
    opt_feedUrl += '&callback=' + callbackFunctionName;
    var apiRequestNode = document.createElement('script');
    apiRequestNode.src = opt_feedUrl;
    apiRequestNode.id = 'google-jsonc-request';
    apiRequestNode.type = 'text/javascript';
    document.documentElement.firstChild.appendChild(apiRequestNode); 
}

function remove(id) {
    var elem = byID(id);
    return elem.parentNode.removeChild(elem);
}

function loadScript(src, callback) {
    //log(src);
    var apiRequestNode = document.createElement('script');
    apiRequestNode.src = src;
    apiRequestNode.type = 'text/javascript';
    document.documentElement.firstChild.appendChild(apiRequestNode);
    //log('- - - - - -script "' + src + '" loaded');
    setTimeout(function(){eval(callback);}, 300)
}
function fillPage() {
    var tmp_items = new Object();
    var items_req = new Object();
    switch(win.width) {
        case 1280:
        case 1920:
            tmp_items = {
                "atLine":6,
                "atPage":12
            };
            items_req = 12;
        break;
        case 720:
            tmp_items = {
                "atLine":4,
                "atPage":8
            };
            items_req = 8;
        break;
    }

    byID('quality').innerHTML = lang.f_sort_mode['add'];
    byID('f_mode').innerHTML = lang.f_mode;
    byID('mode').className = 'single';
    byID('f_m_modes').innerHTML = lang.f_mode;
    byID('f_m_quality').innerHTML = lang.f_quality_2;
    byID('f_m_q_low').innerHTML = lang.quality.asc;    
    byID('f_m_q_high').innerHTML = lang.quality.desc;
    byID('f_m_sort').innerHTML = lang.f_sort;
    byID('f_m_volume').innerHTML = lang.f_volume;
    byID('f_m_skins').innerHTML = lang.f_skins;
    byID('f_m_s_name').innerHTML = lang.f_sort_mode.name;    
    byID('f_m_s_year').innerHTML = lang.f_sort_mode.year;
    byID('f_m_s_agelimit').innerHTML = lang.f_sort_mode.agelimit;
    byID('f_m_s_add').innerHTML = lang.f_sort_mode.add;
    byID('f_m_s_RatingKP').innerHTML = lang.f_sort_mode.RatingKP;
    byID('f_m_s_RatingIMDB').innerHTML = lang.f_sort_mode.RatingIMDB;
    byID('f_m_s_sub_on').innerHTML = lang.sub.on;
    byID('f_m_s_sub_off').innerHTML = lang.sub.off;
    byID('f_m_s_skin_0').innerHTML = lang.skins.skin_0;
    byID('f_m_s_skin_1').innerHTML = lang.skins.skin_1;
    byID('f_search').innerHTML = lang.f_search;
    byID('f_category').innerHTML = lang.f_category;
    byID('f_quality').innerHTML = lang.f_quality;
    byID('f_m_sub').innerHTML = lang.f_subtitles;
    byID('cats_all').innerHTML = lang.cats.all;
    byID('loading2').innerHTML = lang.loading;

    var img_fit, img_big, img_opt, img_exp;

    aspects[0].img = 'img/player/v_btn_ru.png';
    aspects[1].img = 'img/player/v_btn_ru.png';
    aspects[2].img = 'img/player/v_btn_ru.png';
    aspects[3].img = 'img/player/v_btn_ru.png';

    items = tmp_items;
    request.itemsPerRequest = items_req;
    current.lang = main_lang;
    current.mode.debug = debug;
    current.mode.emulate = emulate;

    byID('shell').style.display='block';

    current.layer = 0;
    request.startIndex = 1;
    stb.InitPlayer();
    stb.SetTopWin(0);
    stb.SetAspect(0x10);
    current.obj = 0;
    current.page = 1;
    workWithItems.shift = current.obj;
    current.cat.url = current.feed = categorias[10].url;
    getData(current.feed + '&start-index=' + request.startIndex.toString() + '&max-results=' + request.itemsPerRequest.toString() + '&order-by=' + current.sortMode+ '&sort-order=' + current.priority,
            'rebuildCurrentGlobalObj');
}
/**
 * `rebuildCurrentGlobalObj` is function for rebuild current.globalObj.
 * add current requests to exist data in object
 * used like callback function from YouTube API
 * @function
 * @name rebuildCurrentGlobalObj
 * @param {function(dataYouTubeJSONObject):*}
 * @example
 * rebuildCurrentGlobalObj(dataYouTubeJSONObject);
 * @return void
 */
function rebuildCurrentGlobalObj(list) {

    Deferred.next(function(){

        var tmp = empty(current.globalObj) ? new Array(0) : current.globalObj;
        var tmp_list = new Array();
        var counter = 0;
        var counter_load = 0;
        var counter_wait = 0;
         
        if(undefined != list.data.search_res) {
           search_res=list.data.search_res;
           if (search_res==0) {byID('search_query_line').innerHTML =lang.f_search_res_nothing;}
        }
        
        for(var i=0; i < list.data.items.length + tmp.length; i++) {
            if(i < tmp.length) {
                tmp_list[i] = tmp[i];
            } else {
                counter_wait++;
                tmp_list[i] = {
                    "id":list.data.items[i - tmp.length].id,
                    "extension":list.data.items[i - tmp.length].extension,
                    "server_groups":list.data.items[i - tmp.length].server_groups,
                    "id_folder":list.data.items[i - tmp.length].id_folder,
                    "img":list.data.items[i - tmp.length].thumbnail.hqDefault, 
                    "title":list.data.items[i - tmp.length].title,
                    "category":list.data.items[i - tmp.length].category,
                    "server":list.data.items[i - tmp.length].server,
                    "catalog":list.data.items[i - tmp.length].catalog,
                    "last_view_item":list.data.items[i - tmp.length].last_view_item
                };
                images[counter++] = new Image();
                images[counter - 1].src = tmp_list[i].img;
                images[counter - 1].onload = function(){counter_load++;}
            }
        }

        while(counter_load==counter_wait) { 
            setTimeout(function(){}, 500);
        }

        current.globalObj = tmp_list; // set value of current.globalObj

        request.startIndex = list.data.startIndex;  // set current startIndex
        request.totalItems = list.data.totalItems;  // set current totalItems

        //log("drawBoxes | response from youtube: \"start-index:" + list.data.startIndex + "; items-per-page:" + list.data.itemsPerPage + "; " + list.data.items.length.toString() + " of " + list.data.totalItems + "\"");
    });
   
    Deferred.next(function() {
        workWithItems.drawBoxes();  //draw boxes in current layer
    });
    Deferred.next(function() {
        loading.hide();             // hide loading layer and enable management from keyboard
    });
}