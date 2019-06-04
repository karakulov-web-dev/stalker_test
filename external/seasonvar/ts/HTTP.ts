import { Promise_simple, Promise } from "./Polyfill/Promise_simple";
import AppModel from "./AppModel";

let model:any = new AppModel();

export function get_Serials (config:any):Promise {
  let gArr = model.genreManager.list_default.get()
  let gArrNew = []
 gArr.forEach(item => {
    if (item.active) {
      if (item.name) {
        let n = item.name.replace('&',"")
        gArrNew.push(n)
      }
    }
  })

  if (gArrNew && gArrNew.length > 0) {
    config.genre = gArrNew
  }

  let searchQuery = model.searchManager.query.get()
  if (searchQuery) {
      config.searchQuery = searchQuery
  }

  return getSerials(config)
};


export function getSerials (config:any):Promise {
  return new Promise_simple(function(resolve) {
    let data = config;
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getSerials.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
};

export function getSeasons(idArr):Promise {
  return new Promise_simple(function(resolve) {
    idArr = idArr.map(item => +item)
    var data = JSON.stringify({
      "idArr": idArr
    });
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getSeasons.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function getSeason(id):Promise {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({"id": +id});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/get_Season.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          data.playlist = JSON.parse(data.playlist)
          resolve(data);
        }
      }
    };
  });
}

export function getUpdateList(offset) {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({"offset": offset});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getUpdateList.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}


export function pushHistory(item) {
  let time = +new Date();
  item.time = time;
  item.userMac = model.App.userMac.get();
  item.seasonId = Number(item.seasonId);
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify(item);
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/pushHistory.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function getHistory() {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({userMac: model.App.userMac.get()});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getHistory.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function clearHistory() {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({userMac: model.App.userMac.get()});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/clearHistory.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function pushFavorites(serialId:number) {
  let item = {
    userMac: model.App.userMac.get(),
    serialId: Number(serialId)
  }
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify(item);
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/pushFavorites.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function getFavorites() {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({userMac: model.App.userMac.get()});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getFavorites.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function clearFavorites() {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({userMac: model.App.userMac.get()});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/clearFavorites.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function deleteFavorites(serialId) {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({
      serialId: Number(serialId),
      userMac: model.App.userMac.get()
    });
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/deleteFavorites.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

