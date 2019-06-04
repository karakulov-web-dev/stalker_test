import Model from "./Model";

export default class AppModel extends Model {
  constructor() {
    super();
    if (typeof AppModel.cache !== "undefined") {
      return AppModel.cache;
    }

    let App = this.createInstance("App");
    App.createValue("route", "/UpdateLIstPage");
    App.createValue("userMac", false);

    let searchManager = this.createInstance("searchManager");
    searchManager.createValue("query",false)

    let genreManager = this.createInstance("genreManager");
    genreManager.createValue("focus","list")
    genreManager.createValue("buttonsList",[])
    genreManager.createValue("buttonsList_default",[
      {
        name: "Применить",
        focus: true,
        command: "enter"
      },
      {
        name: "Очистить",
        command: "clear"
      },
      {
        name: "Назад",
        command: "back"
      }
    ])


    genreManager.createValue('position',5)
    genreManager.display = function () {
      let list = genreManager.getValue('list').get()
      let position = genreManager.getValue('position').get()
      list = JSON.parse( JSON.stringify(list) )
      let arr = []
      let i = 0;
      let ii = 0;
      list.forEach((
        item
      )=> {
        if (i >= position) {
          if (ii >=5) {
            return
          }
          if (ii === 2) {
            item.focus = true
          }
          arr.push(item)
          ii++;
        }
        i++
      })
      return arr
    }
    genreManager.createValue("list",[])
    genreManager.createValue("list_default",[
      {
        name: "",
        focus: false,
        active: false,
        blank: true
      },
      {
        name: "",
        focus: false,
        active: false,
        blank: true
      },
      {
        name: "Discovery&BBC",
        focus: false,
        active: false
      },
      {
        name: "анимационные",
        focus: false,
        active: false
      },
      {
        name: "аниме",
        focus: false,
        active: false
      },
      {
        name: "боевики",
        focus: false,
        active: false
      },
      {
        name: "детективы",
        focus: false,
        active: false
      },
      {
        name: "документальные",
        focus: false,
        active: false
      },
      {
        name: "драмы",
        focus: false,
        active: false
      },
      {
        name: "исторические",
        focus: false,
        active: false
      },
      {
        name: "комедия",
        focus: false,
        active: false
      },
      {
        name: "криминальные",
        focus: false,
        active: false
      },
      {
        name: "мелодрамы",
        focus: false,
        active: false
      },
      {
        name: "мистические",
        focus: false,
        active: false
      },
      {
        name: "отечественные",
        focus: false,
        active: false
      },
      {
        name: "приключения",
        focus: false,
        active: false
      },
      {
        name: "реалити-шоу",
        focus: false,
        active: false
      },
      {
        name: "семейные",
        focus: false,
        active: false
      },
      {
        name: "театр",
        focus: false,
        active: false
      },
      {
        name: "триллеры",
        focus: false,
        active: false
      },
      {
        name: "ужасы",
        focus: false,
        active: false
      },
      {
        name: "фантастические",
        focus: false,
        active: false
      },
      {
        name: "фэнтези",
        focus: false,
        active: false
      },
    ])

    let serialList = this.createInstance("serialList");
    serialList.createValue("list", []);
          serialList.createValue("focusPosition", 0);
          serialList.createValue("scrolPosition", 0);
          serialList.createValue("display", function() {
      let list = serialList.getValue("list");
      let scrolPosition = serialList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });
    serialList.createValue("filtersReq", {
      genre: []
    })
      

    let seasonList = this.createInstance("seasonList");
    seasonList.createValue("list", []);
    seasonList.createValue("focusPosition", 0);
    seasonList.createValue("scrolPosition", 0);
    seasonList.createValue("display", function() {
      let list = seasonList.getValue("list");
      let scrolPosition = seasonList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let updateList= this.createInstance("updateList");
    updateList.createValue("list", []);
    updateList.createValue("focusPosition", 0);
    updateList.createValue("scrolPosition", 0);
    updateList.createValue("display", function() {
      let list = updateList.getValue("list");
      let scrolPosition = updateList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let historyList = this.createInstance("historyList");
    historyList.createValue("list", []);
    historyList.createValue("focusPosition", 0);
    historyList.createValue("scrolPosition", 0);
    historyList.createValue("display", function() {
      let list = historyList.getValue("list");
      let scrolPosition = historyList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let favoritesList = this.createInstance("favoritesList");
    favoritesList.createValue("list", []);
    favoritesList.createValue("focusPosition", 0);
    favoritesList.createValue("scrolPosition", 0);
    favoritesList.createValue("display", function() {
      let list = favoritesList.getValue("list");
      let scrolPosition = favoritesList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let seriesList = this.createInstance("seriesList");
    seriesList.createValue("list", []);
    seriesList.createValue("title", 'title');
    seriesList.createValue("focusPosition", 0);
    seriesList.createValue("scrolPosition", 0);
    seriesList.createValue("display", function() {
      let list = seriesList.getValue("list");
      let scrolPosition = seriesList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let messageComponent = this.createInstance("message");
    messageComponent.createValue("visible", false);
    messageComponent.createValue('text',"")


    let video = this.createInstance("video");
    video.createValue("list", []);
    video.createValue("focusPosition", 0);
    video.createValue("totalResults", 0);
    video.createValue("scrolPosition", 0);
    video.createValue("nextPageToken", false);
    video.createValue("display", function() {
      let list = video.getValue("list");
      let scrolPosition = video.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let PlayInstance = this.createInstance("Play");
    PlayInstance.createValue("timeShiftSize", {
      name: "01 мин",
      value: 60,
      command: "changetimeShiftSize"
    })
    PlayInstance.createValue("loadingWheel", false)
    PlayInstance.createValue("progress", {play:0 , duration: 100})
    PlayInstance.createValue("status", false)
    PlayInstance.createValue("visibleControlBar", false)
    PlayInstance.createValue("volume", 100)
    PlayInstance.createValue("name", "")
    PlayInstance.createValue("timeBar", {
      playSec: 0,
      durationSec: 0
    })

    let settingMenuInstance = PlayInstance.createInstance("settingMenu")
    settingMenuInstance.createValue('visible', false)
    settingMenuInstance.createValue('list', [])
    settingMenuInstance.createValue('mainList', [
      //{ name: "Качество", active: true, command: "openQualityList" },
      { name: "Громкость",active: true,  command: "openVolumeList" }
    ])
    settingMenuInstance.createValue('displayType', 'main')
    settingMenuInstance.createValue('qualityList', [])
    settingMenuInstance.createValue('volumeList', [
      {
        name: "100%",
        active: true,
        command: "changeVolume"
      },
      {
        name: "80%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "60%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "50%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "30%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "20%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "0%",
        active: false,
        command: "changeVolume"
      }
  ])




    let ExitMenuInstance = this.createInstance("ExitMenuInstance");
    ExitMenuInstance.createValue("config", {
      text: "Вы дейстивтельно хотите выйти?",
      list: [
        {
          name: "Да",
          command: "exit",
          active: true
        },
        {
          name: "Отмена",
          command: "cancel",
          active: false
        }
      ]
    })

    AppModel.cache = this;
  }
  static cache: AppModel;
}
