setTimeout(function() {
  module.voting.create();
}, 15000);

try {
  function Voting() {
    var createValue = CreateValue();
    this.state = {
      visible: createValue(true),
      curChId: createValue(undefined),
      mac: createValue(undefined),
      votings: createValue({}),
      currVotingId: createValue(undefined)
    };
    window["stateVoting"] = this.state;
    this.rootElem = document.createElement("div");
    document.body.appendChild(this.rootElem);
    this.viewInit(this.rootElem, this.state);
    var votingActiveStatus;
    try {
      votingActiveStatus = stb.RDir("getenv votingActive");
    } catch (e) {
      votingActiveStatus = true;
      console.log(e);
    }
    if (votingActiveStatus) {
      this.processVotes();
    }
  }

  Voting.prototype.create = function create() {
    setTimeout(function() {
      try {
        stb.RDir("setenv votingActive true");
      } catch (e) {
        console.log(e);
      }
    }, 0);
    this.processVotes();
  };

  Voting.prototype.processVotes = function processVotes() {
    var self = this;
    this.getVotingsList(then);
    function then(data) {
      JSON.stringify(data);
      var actualList = data.filter(function(item) {
        if (item.endTime > Date.now()) {
          return true;
        } else {
          return false;
        }
      });
      if (actualList.length <= 0) {
        try {
          stb.RDir("setenv votingActive  ");
        } catch (e) {
          console.log(e);
        }
      }
      actualList.forEach(function(item) {
        self.processVote(item);
      });
    }
  };

  Voting.prototype.getVotingsList = function getVotingsList(cb) {
    var mac = stb.mac;
    var url = "http://212.77.128.177:8085/getVotingsList?mac=" + mac;
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        cb(JSON.parse(http.responseText));
      }
    };
  };

  Voting.prototype.processVote = function(item) {
    var self = this;
    if (Date.now() >= item.startTime) {
      self.visibleVotingPending(item);
    } else {
      setTimeout(function() {
        self.visibleVotingPending(item);
      }, item.startTime - Date.now());
    }
  };

  Voting.prototype.visibleVotingPending = function(voting) {
    var tvInterfaceNoFs = document.querySelector("#tv");
    var self = this;
    if (
      !(
        tvInterfaceNoFs &&
        tvInterfaceNoFs.style &&
        tvInterfaceNoFs.style.display &&
        tvInterfaceNoFs.style.display === "none" &&
        stb.player &&
        stb.player.on &&
        stb.player.last_tv_id === voting.chId
      )
    ) {
      if (Date.now() > voting.endTime) {
        return;
      }
      setTimeout(function() {
        self.visibleVotingPending(voting);
      }, 5000);
      return;
    }
    this.visibleVoting(voting);
  };

  Voting.prototype.visibleVoting = function(voting) {
    this.state.currVotingId.set(voting.id);
    this.syncVoting(voting);
    this.showElem();
  };

  Voting.prototype.keydown = function(event) {
    switch (event.keyCode) {
      case 8:
        this.hideElem();
        break;
      case 27:
        this.hideElem();
        break;
      case 112:
        this.variant(1);
        break;
      case 113:
        this.variant(2);
        break;
      case 114:
        this.variant(3);
        break;
      case 115:
        this.variant(4);
        break;
    }
  };

  Voting.prototype.variant = function(number) {
    var votings = this.state.votings.get();
    var currVotingId = this.state.currVotingId.get();
    if (!votings[currVotingId]) {
      return false;
    }
    if (votings[currVotingId].selected) {
      return false;
    }
    var self = this;
    var mac = stb.mac;
    var id = currVotingId;
    if (!votings[currVotingId].variantList[number - 1]) {
      return false;
    }
    var variantId = votings[currVotingId].variantList[number - 1].id;
    var url =
      "http://212.77.128.177:8085/vote?mac=" +
      mac +
      "&id=" +
      id +
      "&variantId=" +
      variantId;
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send();
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        self.remoteSyncVoting();
      }
    };
  };

  Voting.prototype.syncVoting = function(voting) {
    var votings = this.state.votings.get();
    var currVotingId = this.state.currVotingId.get();
    if (typeof votings[currVotingId] === "object") {
      for (var key in voting) {
        votings[currVotingId][key] = voting[key];
      }
    } else {
      votings[currVotingId] = voting;
    }
    this.state.votings.set(votings);
  };

  Voting.prototype.remoteSyncVoting = function() {
    var self = this;
    var currVotingId = this.state.currVotingId.get();
    this.getVotingsList(then);
    function then(result) {
      var votingArr = result.filter(function(item) {
        if (item.id === currVotingId) {
          return true;
        } else {
          return false;
        }
      });
      if (typeof votingArr[0] === "undefined") {
        return;
      }
      self.syncVoting(votingArr[0]);
    }
  };

  Voting.prototype.remoteSyncVotingServiceStart = function() {
    var self = this;
    this.___remoteSyncVotingServiceInterval___ = setInterval(function() {
      self.remoteSyncVoting();
    }, 5000);
  };
  Voting.prototype.remoteSyncVotingServiceStop = function() {
    clearInterval(this.___remoteSyncVotingServiceInterval___);
  };

  Voting.prototype.hideElem = function() {
    this.state.visible.set(false);
    document.body.tabIndex = 0;
    document.body.focus();
    this.remoteSyncVotingServiceStop();
  };
  Voting.prototype.showElem = function() {
    var votings = this.state.votings.get();
    var currVotingId = this.state.currVotingId.get();
    var tvInterfaceNoFs = document.querySelector("#tv");
    if (
      tvInterfaceNoFs &&
      tvInterfaceNoFs.style &&
      tvInterfaceNoFs.style.display &&
      tvInterfaceNoFs.style.display === "none" &&
      stb.player &&
      stb.player.on &&
      stb.player.last_tv_id === votings[currVotingId].chId
    ) {
      if (!this.state.visible.get()) {
        this.state.visible.set(true);
      }
    } else {
      this.state.visible.set(false);
    }
    this.remoteSyncVotingServiceStart();
  };

  Voting.prototype.viewInit = function viewInit(rootElem, state) {
    var self = this;
    var baseComponent = BaseComponent();

    function CreateVotingElem() {
      this.create = function create() {
        var div = document.createElement("div");
        this.subscribe(state.visible);
        this.subscribe(state.votings);
        var visible = state.visible.get();
        var voting = state.votings.get()[state.currVotingId.get()];
        if (!visible) {
          return div;
        }
        if (typeof voting === "undefined") {
          return div;
        }
        div.setAttribute("id", "votingElem");
        div.setAttribute("data-id", voting.id);
        div.style.position = "absolute";
        div.style.top = "0px";
        div.style.right = "0px";
        div.style.bottom = "0px";
        div.style.left = "0px";
        div.style.display = "block";

        var container = document.createElement("div");
        container.style.background =
          "url(template/default/i_720/bgPatternGray.png)";
        container.style.width = "700px";
        container.style.margin = "0 auto";
        container.style.marginTop = "175px";
        container.style.padding = "20px";
        container.style.fontFamily = '"Myriad Pro", sans - serif';
        container.style.fontSize = "22px";

        var h1 = document.createElement("h1");
        h1.innerHTML = voting.text;
        h1.style.textAlign = "center";

        var buttonPanel = document.createElement("div");
        var i = 0;
        var bgVariantArr = [
          "url(template/default/i_720/bgPatternRed.png)",
          "url(template/default/i_720/bgPatternGreen.png)",
          "url(template/default/i_720/bgPatternYellow.png)",
          "url(template/default/i_720/bgPatternBlue.png)"
        ];
        voting.variantList.forEach(function(item) {
          var e = document.createElement("div");
          e.style.padding = "12px";

          var buttonName = document.createElement("span");
          var variantName = document.createElement("span");
          var countVote = document.createElement("span");
          var colorLayer = document.createElement("div");

          colorLayer.style.height = "64px";
          colorLayer.style.lineHeight = "64px";

          colorLayer.appendChild(buttonName);
          colorLayer.appendChild(variantName);
          colorLayer.appendChild(countVote);

          colorLayer.style.background = bgVariantArr[i];
          colorLayer.style.padding = "7px";

          if (item.selected) {
            colorLayer.style.fontWeight = "bold";
            colorLayer.style.fontSize = "23px";
          }
          if (item.countString) {
            var countString = document.createElement("span");
            colorLayer.appendChild(countString);
            countString.innerHTML = item.countString;
            countString.style.marginLeft = "50px";
          }

          buttonName.innerHTML = "F" + (i + 1);
          variantName.innerHTML = item.name;

          variantName.style.marginLeft = "100px";

          e.appendChild(colorLayer);
          buttonPanel.appendChild(e);
          i++;
        });

        div.appendChild(container);
        container.appendChild(h1);
        container.appendChild(buttonPanel);

        setTimeout(function() {
          div.focus();
        }, 0);
        div.tabIndex = 0;
        div.onkeydown = function(event) {
          self.keydown(event);
          event.stopPropagation();
        };
        return div;
      };
    }
    CreateVotingElem.prototype = baseComponent;

    var votingElem = new CreateVotingElem();
    votingElem.render(rootElem);
  };

  ///  view utilites

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

  module.voting = new Voting();
  loader.next();
} catch (e) {
  console.log(e);
}
