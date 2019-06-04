var pages={"back":"../../c/index.html"},
    standby = false,
    id_f=0;
    folder=0,
    curr_page_folder=1;
    item_shift_folder=0;
    search_res=0;
    current = {
        "mode": {
            "debug":false,                   // create a _log and insert into #debug div
            "emulate":false,                // set "true" if you wanna test version in browser
            "show_all_keydowns":false
        },
        "lang":"ru",                       // system language
        "priority":"desc",                // current sort priority
        "layer":0,                          // current layer (used in keyPressProcessing(key) (common.js) for navigate)
        "globalObj":new Object(),           //
        "page":1,                           // current "page" (current list of youtube moves)
        "obj":0,                            // current object in layer 0 (youtube moves list)
        "feed":"",                  //
        "buttonsStatus":true,
        "catItems":7,
        "cat": {
            "trying":1,
            "id":1,
            "url": ""
        },
        "playMode":"single",
        "sortMode":"add",
        "loading":true
    },
    items = {
        "atLine": 4,                        // number items at line (youtube moves view)
        "atPage": 8                         // number items at layer in one time
    },
    layers = {
        "BASE":0,
        "PLAYER":1,
        "SEARCH":2,
        "CATEGORY":3,
        "SETTINGS":4,
        "CAPTION":5
    },
    request = {
        "itemsPerRequest":8,               // number request moves from yputube at one time
        "startIndex":1,                     //
        "totalItems":0                      //
    },

    data = new Object(),                    // object data (response from youtube)
    
    video = {
        "searchUrl": 'http://video.rikt.ru/video3/stb/stb_mag200_search_full_2.php'  // video.rikt.ru search    
    },

    google = {
        "ratingsFeedUrl": 'http://gdata.youtube.com/feeds/api/standardfeeds/RU/',      // google feed of ratings
        "searchFeedUrl": 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&safesearch=strict&orderby=relevance',  // google feed for search // &lr=ru
        "videolike_pre": 'http://gdata.youtube.com/feeds/api/videos/',
        "videolike_post": '/related?v=2&alt=jsonc&safesearch=strict&orderby=relevance'        
    },
    
    prioritets = {
        "low":   [36,18,34,35,22,37,5],     // youtube formats
        "high":  [37,22,18,36,35,34,5]
    },
    
    sorting = {
        "asc": 1,     // sort order
        "desc":0
    },
    
    images = new Array(),
    stbEvent = {
        onEvent:player.playerEvent,
        event: 0
    },
    obj = new Object(),
    aspects = [
        {
            "name":"fit",
            "img":null,
            "mode":0x10
        },
        {
            "name":"big",
            "img":null,
            "mode":0x40
        },
        {
            "name":"opt",
            "img":null,
            "mode":0x50
        },
        {
            "name":"exp",
            "img":null,
            "mode":0x00
        }
    ],
    aspect_current = 0,
    playModes = [{"name":"single"},{"name":"repeat"},{"name":"list"},{"name":"random"}],
    keys = {
        "POWER" : 2085,
        "MUTE"  : 2192,
        "MIC"   : 2032,
        "NUM1"  : 49,
        "NUM2"  : 50,
        "NUM3"  : 51,
        "NUM4"  : 52,
        "NUM5"  : 53,
        "NUM6"  : 54,
        "NUM7"  : 55,
        "NUM8"  : 56,
        "NUM9"  : 57,
        "NUM0"  : 48,
        "MENU"  : 122,
        "BACK"  : 8,
        "CHANNEL_PREV"  : 1009,
        "CHANNEL_NEXT"  : 9,
        "EXIT"  : 27,
        "REFRESH"  : 116,
        "UP"    : 38,
        "DOWN"  : 40,
        "LEFT"  : 37,
        "RIGHT" : 39,
        "OK"    : 13,
        "PAGE_NEXT" : 34,
        "PAGE_PREV" : 33,
        "VOL_UP"    : 107,
        "VOL_DOWN"  : 109,
        "RED"    : 112,
        "GREEN"  : 113,
        "YELLOW" : 114,
        "BLUE"   : 115,
        "SERVICES"  : 120,
        "TV"    : 121,
        "PHONE" : 119,
        "WEB"   : 123,
        "REW"   : 2066,
        "FFWD"  : 2070,
        "PLAY"  : 2082,
        "PAUSE" : 2082,
        "CONTINUE" : 2082,
        "STOP"  : 2083,
        "REC"   : 2087,
        "INFO"  : 2089,
        "FRAME" : 117,
        "NULL"  : 2076,
        "USB_UNMOUNTED" : 2081,
        "USB_MOUNTED"   : 2080
    };
  /*  
var categorias=[
    {"name":"most_viewed","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?v=2&alt=jsonc&time=today"},
    {"name":"most_popular","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=jsonc&time=today"},
    {"name":"top_favorites","url":"http://gdata.youtube.com/feeds/api/standardfeeds/top_favorites?v=2&alt=jsonc&time=today"},
    {"name":"top_rated","url":"http://gdata.youtube.com/feeds/api/standardfeeds/top_rated?v=2&alt=jsonc&time=today"},
    {"name":"most_discussed","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_discussed?v=2&alt=jsonc&time=today"},
    {"name":"autos","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Autos?v=2&alt=jsonc&time=today"},
    {"name":"animals","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Animals?v=2&alt=jsonc&time=today"},
    {"name":"film","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Film?v=2&alt=jsonc&time=today"},
    {"name":"entertainment","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Entertainment?v=2&alt=jsonc&time=today"},
    {"name":"gaming","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Games?v=2&alt=jsonc&time=today"},
    {"name":"people","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_People?v=2&alt=jsonc&time=today"},
    {"name":"music","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Music?v=2&alt=jsonc&time=today"},
    {"name":"technology","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Tech?v=2&alt=jsonc&time=today"},
    {"name":"news","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_News?v=2&alt=jsonc&time=today"},
    {"name":"education","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Education?v=2&alt=jsonc&time=today"},
    {"name":"howto","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Howto?v=2&alt=jsonc&time=today"},
    {"name":"activism","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Nonprofit?v=2&alt=jsonc&time=today"},
    {"name":"travel","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Travel?v=2&alt=jsonc&time=today"},
    {"name":"sports","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Sports?v=2&alt=jsonc&time=today"},
    {"name":"comedy","url":"http://gdata.youtube.com/feeds/api/standardfeeds/most_popular_Comedy?v=2&alt=jsonc&time=today"}
];
*/

var categorias=[
                {"name":"most_recent","url":"http://video.rikt.ru/video3/stb/stb_mag200_full_2.php?type=new"},         
                {"name":"drama","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=11"},
                {"name":"boevik","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=13"},
                {"name":"history","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=16"},
                {"name":"comedy","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=9"},
                {"name":"3D","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=78"},
                {"name":"russia","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=31"},                
                {"name":"prikl","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=28"},
                {"name":"multfilm","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=8"},
                {"name":"mezhdunet","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=79"},
                {"name":"kids","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=29"},
                {"name":"sport","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=30"},
                {"name":"serials","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=76"},
                {"name":"triller","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=15"},
                {"name":"horror","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=2"},
                {"name":"fantastika","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=1"},
                {"name":"fantasy","url":"http://video.rikt.ru/video3/stb/stb_mag200_category_full_2.php?genre=25"}
];
