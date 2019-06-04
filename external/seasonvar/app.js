var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Polyfill/bindSimplePolyfill", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function default_1() {
        // bind - simple polyfill
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (context /* ...args */) {
                var fn = this;
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof fn !== "function") {
                    throw new TypeError("Function.prototype.bind - context must be a valid function");
                }
                return function () {
                    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
                };
            };
        }
    }
    exports["default"] = default_1;
});
define("Model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Model = /** @class */ (function () {
        function Model(instance) {
            if (Model.model && !instance) {
                return Model.model;
            }
        }
        Model.prototype.createInstance = function (name) {
            if (typeof this[name] !== "undefined") {
                throw new Error("Instance " + name + " already exists");
            }
            this[name] = new Model(true);
            return this[name];
        };
        Model.prototype.getInstance = function (name) {
            if (typeof this[name] === "undefined") {
                throw new Error("Instance " + name + " undefined");
            }
            return this[name];
        };
        Model.prototype.getValue = function (key) {
            if (typeof this[key] === "undefined") {
                throw new Error("Value " + key + " undefined");
            }
            return this[key];
        };
        Model.prototype.createValue = function (key, value) {
            var self = this;
            this[key] = {
                value: value,
                set: function (value) {
                    this.value = value;
                    this.sendToSubscribers();
                },
                get: function () {
                    return this.value;
                },
                subscribe: function (obj) {
                    var subscribeList = this.subscribeList;
                    var app = document.getElementById("app");
                    subscribeList.forEach(function (item) {
                        var status = self.checkMountDOM(item.wrap, app);
                        if (status) {
                            var index = subscribeList.indexOf(item);
                            subscribeList.splice(index, 1);
                        }
                    });
                    subscribeList.push(obj);
                },
                clear: function (obj) {
                    var index = this.subscribeList.indexOf(obj);
                    if (index !== -1) {
                        this.subscribeList.splice(index, 1);
                    }
                },
                subscribeList: [],
                sendToSubscribers: function () {
                    this.subscribeList.forEach(function (obj) {
                        obj.render();
                    });
                }
            };
        };
        Model.prototype.checkMountDOM = function (elem, stopElem) {
            var status;
            this.parentIsNull(elem, stopElem, function (value) {
                status = value;
            });
            return status;
        };
        Model.prototype.parentIsNull = function (elem, stopElem, cb) {
            if (elem.parentNode === null) {
                cb(true);
                return true;
            }
            if (elem.parentNode === stopElem) {
                cb(false);
                return false;
            }
            this.parentIsNull(elem.parentNode, stopElem, cb);
        };
        return Model;
    }());
    exports["default"] = Model;
});
define("AppModel", ["require", "exports", "Model"], function (require, exports, Model_1) {
    "use strict";
    exports.__esModule = true;
    var AppModel = /** @class */ (function (_super) {
        __extends(AppModel, _super);
        function AppModel() {
            var _this = _super.call(this) || this;
            if (typeof AppModel.cache !== "undefined") {
                return AppModel.cache;
            }
            var App = _this.createInstance("App");
            App.createValue("route", "/UpdateLIstPage");
            App.createValue("userMac", false);
            var searchManager = _this.createInstance("searchManager");
            searchManager.createValue("query", false);
            var genreManager = _this.createInstance("genreManager");
            genreManager.createValue("focus", "list");
            genreManager.createValue("buttonsList", []);
            genreManager.createValue("buttonsList_default", [
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
            ]);
            genreManager.createValue('position', 5);
            genreManager.display = function () {
                var list = genreManager.getValue('list').get();
                var position = genreManager.getValue('position').get();
                list = JSON.parse(JSON.stringify(list));
                var arr = [];
                var i = 0;
                var ii = 0;
                list.forEach(function (item) {
                    if (i >= position) {
                        if (ii >= 5) {
                            return;
                        }
                        if (ii === 2) {
                            item.focus = true;
                        }
                        arr.push(item);
                        ii++;
                    }
                    i++;
                });
                return arr;
            };
            genreManager.createValue("list", []);
            genreManager.createValue("list_default", [
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
            ]);
            var serialList = _this.createInstance("serialList");
            serialList.createValue("list", []);
            serialList.createValue("focusPosition", 0);
            serialList.createValue("scrolPosition", 0);
            serialList.createValue("display", function () {
                var list = serialList.getValue("list");
                var scrolPosition = serialList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            serialList.createValue("filtersReq", {
                genre: []
            });
            var seasonList = _this.createInstance("seasonList");
            seasonList.createValue("list", []);
            seasonList.createValue("focusPosition", 0);
            seasonList.createValue("scrolPosition", 0);
            seasonList.createValue("display", function () {
                var list = seasonList.getValue("list");
                var scrolPosition = seasonList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var updateList = _this.createInstance("updateList");
            updateList.createValue("list", []);
            updateList.createValue("focusPosition", 0);
            updateList.createValue("scrolPosition", 0);
            updateList.createValue("display", function () {
                var list = updateList.getValue("list");
                var scrolPosition = updateList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var historyList = _this.createInstance("historyList");
            historyList.createValue("list", []);
            historyList.createValue("focusPosition", 0);
            historyList.createValue("scrolPosition", 0);
            historyList.createValue("display", function () {
                var list = historyList.getValue("list");
                var scrolPosition = historyList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var favoritesList = _this.createInstance("favoritesList");
            favoritesList.createValue("list", []);
            favoritesList.createValue("focusPosition", 0);
            favoritesList.createValue("scrolPosition", 0);
            favoritesList.createValue("display", function () {
                var list = favoritesList.getValue("list");
                var scrolPosition = favoritesList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var seriesList = _this.createInstance("seriesList");
            seriesList.createValue("list", []);
            seriesList.createValue("title", 'title');
            seriesList.createValue("focusPosition", 0);
            seriesList.createValue("scrolPosition", 0);
            seriesList.createValue("display", function () {
                var list = seriesList.getValue("list");
                var scrolPosition = seriesList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var messageComponent = _this.createInstance("message");
            messageComponent.createValue("visible", false);
            messageComponent.createValue('text', "");
            var video = _this.createInstance("video");
            video.createValue("list", []);
            video.createValue("focusPosition", 0);
            video.createValue("totalResults", 0);
            video.createValue("scrolPosition", 0);
            video.createValue("nextPageToken", false);
            video.createValue("display", function () {
                var list = video.getValue("list");
                var scrolPosition = video.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var PlayInstance = _this.createInstance("Play");
            PlayInstance.createValue("timeShiftSize", {
                name: "01 мин",
                value: 60,
                command: "changetimeShiftSize"
            });
            PlayInstance.createValue("loadingWheel", false);
            PlayInstance.createValue("progress", { play: 0, duration: 100 });
            PlayInstance.createValue("status", false);
            PlayInstance.createValue("visibleControlBar", false);
            PlayInstance.createValue("volume", 100);
            PlayInstance.createValue("name", "");
            PlayInstance.createValue("timeBar", {
                playSec: 0,
                durationSec: 0
            });
            var settingMenuInstance = PlayInstance.createInstance("settingMenu");
            settingMenuInstance.createValue('visible', false);
            settingMenuInstance.createValue('list', []);
            settingMenuInstance.createValue('mainList', [
                //{ name: "Качество", active: true, command: "openQualityList" },
                { name: "Громкость", active: true, command: "openVolumeList" }
            ]);
            settingMenuInstance.createValue('displayType', 'main');
            settingMenuInstance.createValue('qualityList', []);
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
            ]);
            var ExitMenuInstance = _this.createInstance("ExitMenuInstance");
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
            });
            AppModel.cache = _this;
            return _this;
        }
        return AppModel;
    }(Model_1["default"]));
    exports["default"] = AppModel;
});
define("Components/BaseComponent", ["require", "exports", "AppModel"], function (require, exports, AppModel_1) {
    "use strict";
    exports.__esModule = true;
    var BaseComponent = /** @class */ (function () {
        function BaseComponent() {
            this.wrap = document.createElement("div");
            this.model = new AppModel_1["default"]();
        }
        BaseComponent.prototype.render = function (elem) {
            if (typeof elem !== "undefined") {
                elem.innerHTML = "";
                elem.appendChild(this.wrap);
            }
            var content = this.create();
            this.wrap.innerHTML = "";
            this.wrap.appendChild(content);
        };
        BaseComponent.prototype.create = function () {
            var elem = document.createElement("div");
            return elem;
        };
        return BaseComponent;
    }());
    exports["default"] = BaseComponent;
});
define("Components/HeaderComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_1) {
    "use strict";
    exports.__esModule = true;
    var HeaderComponent = /** @class */ (function (_super) {
        __extends(HeaderComponent, _super);
        function HeaderComponent(breadcrumbs) {
            var _this = _super.call(this) || this;
            _this.breadcrumbs = breadcrumbs;
            return _this;
        }
        HeaderComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HeaderComponent";
            var p = document.createElement("p");
            if (this.breadcrumbs) {
                p.innerHTML = this.breadcrumbs;
                p.className = "app_HeaderComponent_breadcrumbs";
                elem.appendChild(p);
            }
            var img = document.createElement("img");
            img.className = "app_HeaderComponent_img";
            img.src = "./img/top.logo.png";
            elem.appendChild(img);
            return elem;
        };
        return HeaderComponent;
    }(BaseComponent_1["default"]));
    exports["default"] = HeaderComponent;
});
define("Components/ListComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_2) {
    "use strict";
    exports.__esModule = true;
    var ListComponent = /** @class */ (function (_super) {
        __extends(ListComponent, _super);
        function ListComponent(instanceName, classNameConfig) {
            var _this = _super.call(this) || this;
            _this.instance = _this.model.getInstance(instanceName);
            _this.list = _this.instance.getValue("display").get();
            _this.focusPosition = _this.instance.getValue("focusPosition");
            _this.classNameConfig = classNameConfig;
            var subscribeArr = [
                _this.instance.getValue("scrolPosition"),
                _this.instance.getValue("focusPosition"),
                _this.instance.getValue("display"),
                _this.instance.getValue("list")
            ];
            subscribeArr.forEach(function (item) {
                item.subscribe(_this);
            });
            return _this;
        }
        ListComponent.prototype.create = function () {
            var _this = this;
            var elem = document.createElement("div");
            elem.className = this.classNameConfig.elemClassName;
            var list = this.list();
            list = JSON.parse(JSON.stringify(list));
            if (typeof list[this.focusPosition.get()] !== "undefined") {
                list[this.focusPosition.get()].active = true;
            }
            if (list.length === 0) {
                var p = document.createElement('p');
                elem.appendChild(p);
                p.className = "List_component_elem_not_found";
                p.innerHTML = 'Ничего не найдено.';
            }
            list.forEach(function (item) {
                var itemElem = _this.createItem(item);
                if (itemElem) {
                    elem.appendChild(itemElem);
                }
            });
            return elem;
        };
        ListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            if (typeof item.name === 'undefined') {
                title = item[0].name;
            }
            else {
                title = item.name;
            }
            if (typeof item.poster === 'undefined') {
                imgSrc = item[0].poster;
            }
            else {
                imgSrc = item.poster;
            }
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (typeof item.contentDetails !== 'undefined') {
                var duration = document.createElement("div");
                var dr = item.contentDetails.duration;
                var timetring = convertISO8601(dr);
                duration.innerHTML = "" + timetring;
                duration.className = "app_VideoListComponent_card_duration";
                card.appendChild(duration);
            }
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            h1.innerHTML = title;
            if (imgSrc !== 'posterPrevView') {
                img.src = imgSrc;
            }
            return wrap;
        };
        return ListComponent;
    }(BaseComponent_2["default"]));
    exports["default"] = ListComponent;
    function convertISO8601(input) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1])
                hours = Number(matches[1]);
            if (matches[2])
                minutes = Number(matches[2]);
            if (matches[3])
                seconds = Number(matches[3]);
            hours = hours ? hours + ":" : "";
            minutes = minutes ? minutes + ":" : "00:";
            seconds = seconds + "";
            if (hours) {
                minutes = minutes.length === 2 ? "0" + minutes : minutes;
            }
            if (minutes) {
                seconds = seconds.length === 1 ? "0" + seconds : seconds;
            }
            var timeString = "" + hours + minutes + seconds;
        }
        return (timeString);
    }
});
define("Components/SerialListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_1) {
    "use strict";
    exports.__esModule = true;
    var SerialListComponent = /** @class */ (function (_super) {
        __extends(SerialListComponent, _super);
        function SerialListComponent() {
            return _super.call(this, "serialList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        return SerialListComponent;
    }(ListComponent_1["default"]));
    exports["default"] = SerialListComponent;
});
define("Components/ButtonComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_3) {
    "use strict";
    exports.__esModule = true;
    var ButtonComponent = /** @class */ (function (_super) {
        __extends(ButtonComponent, _super);
        function ButtonComponent(text, color, visible) {
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.text = text;
            _this.visible = visible;
            return _this;
        }
        ButtonComponent.prototype.create = function () {
            var button = document.createElement("div");
            if (!this.visible) {
                button.style.visibility = "hidden";
            }
            button.className =
                "app_BottomButton_button app_BottomButton_button_" + this.color;
            button.innerHTML = this.text;
            return button;
        };
        return ButtonComponent;
    }(BaseComponent_3["default"]));
    exports["default"] = ButtonComponent;
});
define("Components/BottomButtonComponent", ["require", "exports", "Components/BaseComponent", "Components/ButtonComponent"], function (require, exports, BaseComponent_4, ButtonComponent_1) {
    "use strict";
    exports.__esModule = true;
    var BottomButtonComponent = /** @class */ (function (_super) {
        __extends(BottomButtonComponent, _super);
        function BottomButtonComponent(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            return _this;
        }
        BottomButtonComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_BottomButtonComponent";
            var wrap1 = document.createElement("div");
            var wrap2 = document.createElement("div");
            var wrap3 = document.createElement("div");
            var wrap4 = document.createElement("div");
            wrap1.className = "app_BottomButton_wrap_button";
            wrap2.className = "app_BottomButton_wrap_button";
            wrap3.className = "app_BottomButton_wrap_button";
            wrap4.className = "app_BottomButton_wrap_button";
            var Button1 = new ButtonComponent_1["default"](this.config.red.text, "red", this.config.red.visible);
            var Button2 = new ButtonComponent_1["default"](this.config.green.text, "green", this.config.green.visible);
            var Button3 = new ButtonComponent_1["default"](this.config.yellow.text, "yellow", this.config.yellow.visible);
            var Button4 = new ButtonComponent_1["default"](this.config.blue.text, "blue", this.config.blue.visible);
            Button1.render(wrap1);
            Button2.render(wrap2);
            Button3.render(wrap3);
            Button4.render(wrap4);
            elem.appendChild(wrap1);
            elem.appendChild(wrap2);
            elem.appendChild(wrap3);
            elem.appendChild(wrap4);
            return elem;
        };
        return BottomButtonComponent;
    }(BaseComponent_4["default"]));
    exports["default"] = BottomButtonComponent;
});
define("Components/GenreSelectComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_5) {
    "use strict";
    exports.__esModule = true;
    var GenreSelectComponent = /** @class */ (function (_super) {
        __extends(GenreSelectComponent, _super);
        function GenreSelectComponent() {
            var _this = _super.call(this) || this;
            _this.route = _this.model.getInstance('App').getValue('route');
            _this.route.subscribe(_this);
            _this.genreList = _this.model.getInstance('genreManager').getValue("list");
            _this.buttonsList = _this.model.getInstance('genreManager').getValue("buttonsList");
            var model = _this.model;
            model.genreManager.focus.subscribe(_this);
            model.genreManager.position.subscribe(_this);
            model.genreManager.list.subscribe(_this);
            model.genreManager.buttonsList.subscribe(_this);
            return _this;
        }
        GenreSelectComponent.prototype.create = function () {
            var div = document.createElement('div');
            var route = this.route.get();
            if (this.route.get().split('/')[2] !== 'genreManager') {
                return div;
            }
            div.className = 'app_home_genreManager';
            div.appendChild(this.createWin());
            return div;
        };
        GenreSelectComponent.prototype.createWin = function () {
            var _this = this;
            var buttonList = this.buttonsList.get();
            var model = this.model;
            var genreList = model.genreManager.display();
            var div = document.createElement('div');
            var header = document.createElement('div');
            var body = document.createElement('div');
            var list = document.createElement('div');
            var buttonPanel = document.createElement('div');
            div.className = 'app_home_genreManager_window';
            header.className = 'app_home_genreManager_window_header';
            body.className = 'app_home_genreManager_window_body';
            list.className = 'app_home_genreManager_window_list';
            buttonPanel.className = 'app_home_genreManager_window_buttonPanel';
            header.innerHTML = 'Жанры';
            buttonList.forEach(function (item) {
                buttonPanel.appendChild(_this.buttons(item));
            });
            genreList.forEach(function (item) {
                list.appendChild(_this.createGenreElem(item));
            });
            div.appendChild(header);
            div.appendChild(body);
            body.appendChild(list);
            body.appendChild(buttonPanel);
            return div;
        };
        GenreSelectComponent.prototype.createGenreElem = function (item) {
            var model = this.model;
            var div = document.createElement('div');
            div.className = 'app_home_genreManager_window_list_GenreElemWrap';
            if (item.blank) {
                return div;
            }
            var p = document.createElement('p');
            var icon = document.createElement('div');
            if (item.focus) {
                if (model.genreManager.focus.get() === 'list') {
                    div.className = div.className + " focus";
                }
            }
            div.appendChild(p);
            div.appendChild(icon);
            icon.className = 'app_home_genreManager_window_list_GenreElemWrap_checkbox_blank';
            if (item.active) {
                icon.className = 'app_home_genreManager_window_list_GenreElemWrap_checkbox_check';
            }
            p.innerHTML = item.name;
            return div;
        };
        GenreSelectComponent.prototype.buttons = function (item) {
            var model = this.model;
            var div = document.createElement('div');
            var p = document.createElement('p');
            div.className = 'app_home_genreManager_window_buttonPanel_button_wrap';
            if (item.focus) {
                if (model.genreManager.focus.get() === 'buttons') {
                    div.className = div.className + " active";
                }
            }
            div.appendChild(p);
            p.innerHTML = item.name;
            return div;
        };
        return GenreSelectComponent;
    }(BaseComponent_5["default"]));
    exports["default"] = GenreSelectComponent;
});
define("Components/InfoComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_6) {
    "use strict";
    exports.__esModule = true;
    var InfoComponent = /** @class */ (function (_super) {
        __extends(InfoComponent, _super);
        function InfoComponent() {
            var _this = _super.call(this) || this;
            _this.route = _this.model.getInstance('App').getValue('route');
            _this.route.subscribe(_this);
            var model = _this.model;
            return _this;
        }
        InfoComponent.prototype.create = function () {
            var div = document.createElement('div');
            var route = this.route.get();
            if (this.route.get().split('/')[2] !== 'infoManager') {
                return div;
            }
            div.className = 'app_home_infoManager';
            div.appendChild(this.createWin());
            return div;
        };
        InfoComponent.prototype.createWin = function () {
            var model = this.model;
            var route = model.App.route.get();
            var activeSerial;
            if (route === "/UpdateLIstPage/infoManager") {
                activeSerial = model.updateList.display.get()()[model.updateList.focusPosition.get()];
            }
            else if (route === "/serialList/infoManager") {
                activeSerial = model.serialList.display.get()()[model.serialList.focusPosition.get()];
            }
            var genreModify = activeSerial.genreString.split(',').join(', ');
            var div = document.createElement('div');
            var header = document.createElement('div');
            var body = document.createElement('div');
            var box1 = document.createElement("div");
            var box2 = document.createElement("div");
            var infoBox = document.createElement('div');
            var name = document.createElement('div');
            var country = document.createElement('div');
            var year = document.createElement('div');
            var genre = document.createElement('div');
            var kinopoisk = document.createElement('div');
            var imdb = document.createElement('div');
            var img = document.createElement('img');
            var description = document.createElement('div');
            div.className = 'app_home_infoManager_window';
            header.className = 'app_home_infoManager_window_header';
            body.className = 'app_home_infoManager_window_body';
            box1.className = 'app_home_infoManager_window_body_box1';
            infoBox.className = "app_home_infoManager_window_body_box1_infoBox";
            img.className = "app_home_infoManager_window_body_box1_img";
            img.src = activeSerial.poster;
            description.className = 'app_home_infoManager_window_body_box2_description';
            header.innerHTML = 'Инфо';
            name.innerHTML = "<span>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:</span> " + activeSerial.name;
            country.innerHTML = "<span>\u0421\u0442\u0440\u0430\u043D\u0430:</span> " + activeSerial.countryString;
            year.innerHTML = "<span>\u0413\u043E\u0434:</span> " + activeSerial.year;
            genre.innerHTML = "<span>\u0416\u0430\u043D\u0440\u044B:</span> " + genreModify;
            kinopoisk.innerHTML = "<span>\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u0438\u043D\u043E\u043F\u043E\u0438\u0441\u043A:</span> " + activeSerial.kinopoisk;
            imdb.innerHTML = "<span>\u0420\u0435\u0439\u0442\u0438\u043D\u0433 imdb:</span> " + activeSerial.imdb;
            description.innerHTML = activeSerial.description;
            div.appendChild(header);
            div.appendChild(body);
            body.appendChild(box1);
            body.appendChild(box2);
            box1.appendChild(infoBox);
            box1.appendChild(img);
            infoBox.appendChild(name);
            infoBox.appendChild(country);
            infoBox.appendChild(year);
            infoBox.appendChild(genre);
            infoBox.appendChild(kinopoisk);
            infoBox.appendChild(imdb);
            box2.appendChild(description);
            return div;
        };
        return InfoComponent;
    }(BaseComponent_6["default"]));
    exports["default"] = InfoComponent;
});
define("Components/SearchComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_7) {
    "use strict";
    exports.__esModule = true;
    var SearchComponent = /** @class */ (function (_super) {
        __extends(SearchComponent, _super);
        function SearchComponent() {
            var _this = _super.call(this) || this;
            _this.route = _this.model.getInstance('App').getValue('route');
            _this.route.subscribe(_this);
            var model = _this.model;
            return _this;
        }
        SearchComponent.prototype.create = function () {
            var div = document.createElement('div');
            var route = this.route.get();
            if (this.route.get().split('/')[2] !== 'searchManager') {
                return div;
            }
            div.className = 'app_home_infoManager';
            div.appendChild(this.createWin());
            return div;
        };
        SearchComponent.prototype.createWin = function () {
            var model = this.model;
            var div = document.createElement('div');
            var header = document.createElement('div');
            var body = document.createElement('div');
            var app_home_searchManager_search = document.createElement('div');
            var input = document.createElement('input');
            div.className = 'app_home_searchManager_window';
            header.className = 'app_home_searchManager_window_header';
            body.className = 'app_home_searchManager_window_body';
            app_home_searchManager_search.className = 'app_home_searchManager_search';
            input.className = 'app_home_searchManager_search_input';
            header.innerHTML = 'Поиск';
            div.appendChild(header);
            div.appendChild(body);
            body.appendChild(app_home_searchManager_search);
            app_home_searchManager_search.appendChild(input);
            return div;
        };
        return SearchComponent;
    }(BaseComponent_7["default"]));
    exports["default"] = SearchComponent;
});
define("Components/MessageComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_8) {
    "use strict";
    exports.__esModule = true;
    var MessageComponent = /** @class */ (function (_super) {
        __extends(MessageComponent, _super);
        function MessageComponent() {
            var _this = _super.call(this) || this;
            var model = _this.model;
            model.message.visible.subscribe(_this);
            model.message.text.subscribe(_this);
            return _this;
        }
        MessageComponent.prototype.create = function () {
            var model = this.model;
            var div = document.createElement("div");
            if (!model.message.visible.get()) {
                return div;
            }
            div.className = "app_messageComponent";
            var text = model.message.text.get();
            div.innerHTML = text;
            return div;
        };
        return MessageComponent;
    }(BaseComponent_8["default"]));
    exports["default"] = MessageComponent;
});
define("Components/SerialComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/SerialListComponent", "Components/BottomButtonComponent", "Components/GenreSelectComponent", "Components/InfoComponent", "Components/SearchComponent", "Components/MessageComponent"], function (require, exports, BaseComponent_9, HeaderComponent_1, SerialListComponent_1, BottomButtonComponent_1, GenreSelectComponent_1, InfoComponent_1, SearchComponent_1, MessageComponent_1) {
    "use strict";
    exports.__esModule = true;
    var SerialComponent = /** @class */ (function (_super) {
        __extends(SerialComponent, _super);
        function SerialComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SerialComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [SerialListComponent_1["default"], GenreSelectComponent_1["default"], InfoComponent_1["default"], SearchComponent_1["default"], MessageComponent_1["default"]];
            var title = '';
            var model = this.model;
            var listGenre = model.genreManager.list_default.get().filter(function (item) {
                if (item.active) {
                    return true;
                }
            }).map(function (item) { return item.name; });
            var query = model.searchManager.query.get();
            if (listGenre.length !== 0) {
                title = "\u0416\u0430\u043D\u0440\u044B: " + listGenre.join(', ');
            }
            if (query) {
                title = "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: " + query;
            }
            if (title.length > 55) {
                title = title.split('');
                title.length = 52;
                title = title.join('');
                title = title + '...';
            }
            new HeaderComponent_1["default"](title).render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_1["default"]({
                red: {
                    text: "Жанры",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: true
                },
                yellow: {
                    text: "Поиск",
                    visible: true
                },
                blue: {
                    text: "В избранное",
                    visible: true
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return SerialComponent;
    }(BaseComponent_9["default"]));
    exports["default"] = SerialComponent;
});
define("Components/SeasonListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_2) {
    "use strict";
    exports.__esModule = true;
    var SeasonListComponent = /** @class */ (function (_super) {
        __extends(SeasonListComponent, _super);
        function SeasonListComponent(instanceName) {
            var _this = this;
            if (typeof instanceName === 'undefined') {
                instanceName = "seasonList";
            }
            _this = _super.call(this, instanceName, {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
            return _this;
        }
        SeasonListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            title = this.createTitle(item);
            imgSrc = item.poster;
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            h1.innerHTML = title;
            if (imgSrc !== 'posterPrevView') {
                img.src = imgSrc;
            }
            else {
                h1.innerHTML = 'Идет Загрузка';
            }
            return wrap;
        };
        SeasonListComponent.prototype.createTitle = function (item) {
            return item.name + " (" + item.season_number + " сезон)";
        };
        return SeasonListComponent;
    }(ListComponent_2["default"]));
    exports["default"] = SeasonListComponent;
});
define("Components/SeasonsComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/SeasonListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_10, HeaderComponent_2, SeasonListComponent_1, BottomButtonComponent_2) {
    "use strict";
    exports.__esModule = true;
    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [SeasonListComponent_1["default"]];
            new HeaderComponent_2["default"](this.model.getInstance('serialList').getValue('display').get()()[this.model.getInstance('serialList').getValue('focusPosition').get()].name).render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_2["default"]({
                red: {
                    text: "Назад",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: false
                },
                yellow: {
                    text: "Поиск",
                    visible: false
                },
                blue: {
                    text: "Сортировать",
                    visible: false
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return HomeComponent;
    }(BaseComponent_10["default"]));
    exports["default"] = HomeComponent;
});
define("Components/SeriesListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_3) {
    "use strict";
    exports.__esModule = true;
    var SeriesListComponent = /** @class */ (function (_super) {
        __extends(SeriesListComponent, _super);
        function SeriesListComponent() {
            return _super.call(this, "seriesList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        SeriesListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            title = item.name;
            imgSrc = item.poster;
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (typeof item.contentDetails !== "undefined") {
                var duration = document.createElement("div");
                var dr = item.contentDetails.duration;
                var timetring = convertISO8601(dr);
                duration.innerHTML = "" + timetring;
                duration.className = "app_VideoListComponent_card_duration";
                card.appendChild(duration);
            }
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            var perevod = item.perevod ? item.perevod : "Стандартный";
            h1.innerHTML = title + " (Перевод " + perevod + ")";
            if (imgSrc !== "posterPrevView") {
                img.src = imgSrc;
            }
            return wrap;
        };
        return SeriesListComponent;
    }(ListComponent_3["default"]));
    exports["default"] = SeriesListComponent;
    function convertISO8601(input) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1])
                hours = Number(matches[1]);
            if (matches[2])
                minutes = Number(matches[2]);
            if (matches[3])
                seconds = Number(matches[3]);
            hours = hours ? hours + ":" : "";
            minutes = minutes ? minutes + ":" : "00:";
            seconds = seconds + "";
            if (hours) {
                minutes = minutes.length === 2 ? "0" + minutes : minutes;
            }
            if (minutes) {
                seconds = seconds.length === 1 ? "0" + seconds : seconds;
            }
            var timeString = "" + hours + minutes + seconds;
        }
        return timeString;
    }
});
define("Components/SeriesComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/SeriesListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_11, HeaderComponent_3, SeriesListComponent_1, BottomButtonComponent_3) {
    "use strict";
    exports.__esModule = true;
    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [SeriesListComponent_1["default"]];
            var model = this.model;
            new HeaderComponent_3["default"](model.seriesList.title.get()).render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_3["default"]({
                red: {
                    text: "Назад",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: false
                },
                yellow: {
                    text: "Поиск",
                    visible: false
                },
                blue: {
                    text: "Сортировать",
                    visible: false
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return HomeComponent;
    }(BaseComponent_11["default"]));
    exports["default"] = HomeComponent;
});
define("Components/LoadingWheel", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_12) {
    "use strict";
    exports.__esModule = true;
    var LoadingWheel = /** @class */ (function (_super) {
        __extends(LoadingWheel, _super);
        function LoadingWheel() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.loadingWheel = _this.instancePlay.getValue("loadingWheel");
            _this.loadingWheel.subscribe(_this);
            return _this;
        }
        LoadingWheel.prototype.create = function () {
            var loadingWheelStatus = this.loadingWheel.get();
            var div = document.createElement("div");
            if (!loadingWheelStatus) {
                return div;
            }
            div.className = "app_Play_loadingWheel_img_container";
            var img = document.createElement("img");
            div.appendChild(img);
            img.className = "app_Play_loadingWheel_img";
            img.src = "./img/loading.gif";
            return div;
        };
        return LoadingWheel;
    }(BaseComponent_12["default"]));
    exports["default"] = LoadingWheel;
});
define("Components/ControlBar", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_13) {
    "use strict";
    exports.__esModule = true;
    var ControlBar = /** @class */ (function (_super) {
        __extends(ControlBar, _super);
        function ControlBar() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.visibleControlBar = _this.instancePlay.getValue("visibleControlBar");
            _this.visibleControlBar.subscribe(_this);
            return _this;
        }
        ControlBar.prototype.create = function () {
            var div = document.createElement("div");
            var visibleControlBar = this.visibleControlBar.get();
            if (!visibleControlBar) {
                return div;
            }
            var box = document.createElement("div");
            div.className = "app_Play_ControlBar";
            box.className = "app_Play_ControlBar_box";
            div.appendChild(box);
            var progress_blank_wrap = document.createElement("div");
            var progress_play_wrap = document.createElement("div");
            var playButton_wrap = document.createElement("div");
            var settingButton_wrap = document.createElement("div");
            var volumeBar_wrap = document.createElement("div");
            var nameCurrentVideo_wrap = document.createElement("div");
            var timeBar_wrap = document.createElement("div");
            var playSettingMenu_wrap = document.createElement("div");
            var timeShiftSizeBar_wrap = document.createElement("div");
            box.appendChild(progress_blank_wrap);
            box.appendChild(progress_play_wrap);
            box.appendChild(playButton_wrap);
            box.appendChild(settingButton_wrap);
            box.appendChild(volumeBar_wrap);
            box.appendChild(nameCurrentVideo_wrap);
            box.appendChild(timeBar_wrap);
            box.appendChild(playSettingMenu_wrap);
            box.appendChild(timeShiftSizeBar_wrap);
            var controlBar_progress_blank = new ControlBar_progress_blank();
            var controlBar_progress_play = new ControlBar_progress_play();
            var controlBar_playButton = new ControlBar_playButton();
            var controlBar_settingButton = new ControlBar_settingButton();
            var controlBar_volumeBar = new ControlBar_volumeBar();
            var controlBar_nameCurrentVideo = new ControlBar_nameCurrentVideo();
            var controlBar_timeBar = new ControlBar_timeBar();
            var controlBar_playSettingMenu = new ControlBar_playSettingMenu();
            var controlBar_timeShiftSizeBar = new ControlBar_timeShiftSizeBar();
            controlBar_progress_blank.render(progress_blank_wrap);
            controlBar_progress_play.render(progress_play_wrap);
            controlBar_playButton.render(playButton_wrap);
            controlBar_settingButton.render(settingButton_wrap);
            controlBar_volumeBar.render(volumeBar_wrap);
            controlBar_nameCurrentVideo.render(nameCurrentVideo_wrap);
            controlBar_timeBar.render(timeBar_wrap);
            controlBar_playSettingMenu.render(playSettingMenu_wrap);
            controlBar_timeShiftSizeBar.render(timeShiftSizeBar_wrap);
            return div;
        };
        return ControlBar;
    }(BaseComponent_13["default"]));
    exports["default"] = ControlBar;
    var ControlBar_progress_blank = /** @class */ (function (_super) {
        __extends(ControlBar_progress_blank, _super);
        function ControlBar_progress_blank() {
            return _super.call(this) || this;
        }
        ControlBar_progress_blank.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_box_progress_blank";
            return div;
        };
        return ControlBar_progress_blank;
    }(BaseComponent_13["default"]));
    var ControlBar_progress_play = /** @class */ (function (_super) {
        __extends(ControlBar_progress_play, _super);
        function ControlBar_progress_play() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.progress = _this.instancePlay.getValue("progress");
            _this.progress.subscribe(_this);
            return _this;
        }
        ControlBar_progress_play.prototype.create = function () {
            var progress = this.progress.get();
            progress = progress.play;
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_box_progress_play";
            div.style.width = progress + "%";
            return div;
        };
        return ControlBar_progress_play;
    }(BaseComponent_13["default"]));
    var ControlBar_playButton = /** @class */ (function (_super) {
        __extends(ControlBar_playButton, _super);
        function ControlBar_playButton() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.status = _this.Play.getValue("status");
            _this.status.subscribe(_this);
            return _this;
        }
        ControlBar_playButton.prototype.create = function () {
            var status = this.status.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_playButton";
            if (status === "play") {
                div.style.background =
                    "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
            }
            else if (status === "pause") {
                div.style.background =
                    "url(./img/baseline_play_circle_outline_white_18dp.png) no-repeat";
            }
            else {
                div.style.background =
                    "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
            }
            return div;
        };
        return ControlBar_playButton;
    }(BaseComponent_13["default"]));
    var ControlBar_settingButton = /** @class */ (function (_super) {
        __extends(ControlBar_settingButton, _super);
        function ControlBar_settingButton() {
            return _super.call(this) || this;
        }
        ControlBar_settingButton.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_settingButton";
            return div;
        };
        return ControlBar_settingButton;
    }(BaseComponent_13["default"]));
    var ControlBar_volumeBar = /** @class */ (function (_super) {
        __extends(ControlBar_volumeBar, _super);
        function ControlBar_volumeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.volume = _this.Play.getValue("volume");
            _this.volume.subscribe(_this);
            return _this;
        }
        ControlBar_volumeBar.prototype.create = function () {
            var volume = this.volume.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_volumeBar";
            var icon = document.createElement("div");
            var line = document.createElement("div");
            var lineBlank = document.createElement("div");
            icon.className = "app_Play_ControlBar_volumeBar_icon";
            if (volume === 0) {
                icon.style.background =
                    "url(./img/baseline_volume_off_white_18dp.png) no-repeat";
            }
            else if (volume < 50) {
                icon.style.background =
                    "url(./img/baseline_volume_down_white_18dp.png) no-repeat";
            }
            else {
                icon.style.background =
                    "url(./img/baseline_volume_up_white_18dp.png) no-repeat";
            }
            div.appendChild(icon);
            lineBlank.className = "app_Play_ControlBar_volumeBar_lineBlank";
            div.appendChild(lineBlank);
            line.className = "app_Play_ControlBar_volumeBar_line";
            line.style.width = volume + "%";
            lineBlank.appendChild(line);
            return div;
        };
        return ControlBar_volumeBar;
    }(BaseComponent_13["default"]));
    var ControlBar_nameCurrentVideo = /** @class */ (function (_super) {
        __extends(ControlBar_nameCurrentVideo, _super);
        function ControlBar_nameCurrentVideo() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.name = _this.Play.getValue("name");
            _this.name.subscribe(_this);
            return _this;
        }
        ControlBar_nameCurrentVideo.prototype.create = function () {
            var name = this.name.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_nameCurrentVideo";
            var p = document.createElement("p");
            p.innerHTML = name;
            div.appendChild(p);
            return div;
        };
        return ControlBar_nameCurrentVideo;
    }(BaseComponent_13["default"]));
    var ControlBar_timeBar = /** @class */ (function (_super) {
        __extends(ControlBar_timeBar, _super);
        function ControlBar_timeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.timeBar = _this.Play.getValue("timeBar");
            _this.timeBar.subscribe(_this);
            return _this;
        }
        ControlBar_timeBar.prototype.create = function () {
            var progress = this.timeBar.get();
            var current = progress.playSec;
            var duration = progress.durationSec;
            var p = document.createElement("p");
            p.className = "app_Play_ControlBar_timeBar";
            p.innerHTML =
                this.secTimeString(current) + "/" + this.secTimeString(duration);
            return p;
        };
        ControlBar_timeBar.prototype.secTimeString = function (secTime) {
            var sec = Math.floor(secTime % 60);
            var min = Math.floor(secTime / 60);
            var h = Math.floor(min / 60);
            min = Math.floor(min % 60);
            var hCopy = h;
            h = String(h);
            sec = String(sec);
            min = String(min);
            if (sec.length === 1) {
                sec = "0" + sec;
            }
            if (min.length === 1) {
                min = "0" + min;
            }
            var timeString = min + ":" + sec;
            if (hCopy >= 1) {
                timeString = h + ":" + timeString;
            }
            return timeString;
        };
        return ControlBar_timeBar;
    }(BaseComponent_13["default"]));
    var ControlBar_playSettingMenu = /** @class */ (function (_super) {
        __extends(ControlBar_playSettingMenu, _super);
        function ControlBar_playSettingMenu() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.settingMenu = _this.Play.getInstance("settingMenu");
            _this.settingMenuVisible = _this.settingMenu.getValue("visible");
            _this.settingMenuList = _this.settingMenu.getValue("list");
            _this.settingMenuList.subscribe(_this);
            _this.settingMenuVisible.subscribe(_this);
            return _this;
        }
        ControlBar_playSettingMenu.prototype.create = function () {
            var _this = this;
            var div = document.createElement("div");
            var visible = this.settingMenuVisible.get();
            if (!visible) {
                return div;
            }
            div.className = "app_Play_ControlBar_playSettingMenu";
            var list = this.settingMenuList.get();
            list.forEach(function (item) {
                var itemElem = _this.createItemList(item);
                div.appendChild(itemElem);
            });
            return div;
        };
        ControlBar_playSettingMenu.prototype.createItemList = function (item) {
            var p = document.createElement("p");
            p.innerHTML = item.name;
            if (item.active) {
                p.className = "app_Play_ControlBar_playSettingMenu_item active";
            }
            else {
                p.className = "app_Play_ControlBar_playSettingMenu_item";
            }
            return p;
        };
        return ControlBar_playSettingMenu;
    }(BaseComponent_13["default"]));
    var ControlBar_timeShiftSizeBar = /** @class */ (function (_super) {
        __extends(ControlBar_timeShiftSizeBar, _super);
        function ControlBar_timeShiftSizeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.timeShiftSize = _this.Play.getValue("timeShiftSize");
            _this.timeShiftSize.subscribe(_this);
            return _this;
        }
        ControlBar_timeShiftSizeBar.prototype.create = function () {
            var timeShiftSize = this.timeShiftSize.get();
            var div = document.createElement("div");
            div.className = 'app_Play_ControlBar_timeShiftSizeBar';
            var p = document.createElement("p");
            div.appendChild(p);
            p.innerHTML = timeShiftSize.name;
            var twotone_arrow_drop_down_white_24dp = document.createElement("span");
            var twotone_arrow_drop_up_white_24dp = document.createElement("span");
            twotone_arrow_drop_down_white_24dp.className = "twotone_arrow_drop_down_white_24dp";
            twotone_arrow_drop_up_white_24dp.className = "twotone_arrow_drop_up_white_24dp";
            div.appendChild(twotone_arrow_drop_down_white_24dp);
            div.appendChild(twotone_arrow_drop_up_white_24dp);
            return div;
        };
        return ControlBar_timeShiftSizeBar;
    }(BaseComponent_13["default"]));
});
define("Components/PlayComponent", ["require", "exports", "Components/BaseComponent", "Components/LoadingWheel", "Components/ControlBar"], function (require, exports, BaseComponent_14, LoadingWheel_1, ControlBar_1) {
    "use strict";
    exports.__esModule = true;
    var PlayComponent = /** @class */ (function (_super) {
        __extends(PlayComponent, _super);
        function PlayComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayComponent.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play";
            var controlBarWrap = document.createElement("div");
            var loadingWheelWrap = document.createElement("div");
            var pauseIndicatorWrap = document.createElement("div");
            div.appendChild(loadingWheelWrap);
            div.appendChild(controlBarWrap);
            div.appendChild(pauseIndicatorWrap);
            var loadingWheel = new LoadingWheel_1["default"]();
            var controlBar = new ControlBar_1["default"]();
            var pauseIndicator = new PauseIndicator();
            loadingWheel.render(loadingWheelWrap);
            controlBar.render(controlBarWrap);
            pauseIndicator.render(pauseIndicatorWrap);
            return div;
        };
        return PlayComponent;
    }(BaseComponent_14["default"]));
    exports["default"] = PlayComponent;
    var PauseIndicator = /** @class */ (function (_super) {
        __extends(PauseIndicator, _super);
        function PauseIndicator() {
            var _this = _super.call(this) || this;
            var model = _this.model;
            model.Play.status.subscribe(_this);
            return _this;
        }
        PauseIndicator.prototype.create = function () {
            var model = this.model;
            var div = document.createElement("div");
            if ((model.Play.status.get()) !== "pause") {
                return div;
            }
            div.className = "app_Play_PauseIndicator";
            return div;
        };
        return PauseIndicator;
    }(BaseComponent_14["default"]));
});
define("Components/ExitReqComp", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_15) {
    "use strict";
    exports.__esModule = true;
    var ExitReqComp = /** @class */ (function (_super) {
        __extends(ExitReqComp, _super);
        function ExitReqComp() {
            var _this = _super.call(this) || this;
            _this.ExitMenuInstance = _this.model.getInstance("ExitMenuInstance");
            _this.ExitConfig = _this.ExitMenuInstance.getValue("config");
            _this.ExitConfig.subscribe(_this);
            return _this;
        }
        ExitReqComp.prototype.create = function () {
            var data = this.ExitConfig.get();
            var div = document.createElement("div");
            div.className = "app_ExitReqComp";
            var h1 = document.createElement("h1");
            var list = document.createElement("div");
            div.appendChild(h1);
            div.appendChild(list);
            h1.className = "app_ExitReqComp_h1";
            h1.innerHTML = data.text;
            data.list.forEach(function (item) {
                list.appendChild((function (item) {
                    var div = document.createElement("div");
                    div.className = "app_ExitReqComp_item";
                    if (item.active) {
                        div.className = "app_ExitReqComp_item active";
                    }
                    var p = document.createElement("p");
                    p.innerHTML = item.name;
                    div.appendChild(p);
                    return div;
                }(item)));
            });
            return div;
        };
        return ExitReqComp;
    }(BaseComponent_15["default"]));
    exports["default"] = ExitReqComp;
});
define("Components/ExitReqPageComp", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/BottomButtonComponent", "Components/ExitReqComp"], function (require, exports, BaseComponent_16, HeaderComponent_4, BottomButtonComponent_4, ExitReqComp_1) {
    "use strict";
    exports.__esModule = true;
    var ExitReqPageComp = /** @class */ (function (_super) {
        __extends(ExitReqPageComp, _super);
        function ExitReqPageComp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExitReqPageComp.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_ExitReqPageComp";
            new HeaderComponent_4["default"]().render(div.appendChild(document.createElement("div")));
            new ExitReqComp_1["default"]().render(div.appendChild(document.createElement("div")));
            var bottomBtnComp = new BottomButtonComponent_4["default"]({
                red: {
                    text: "Отмена",
                    visible: true
                },
                green: {
                    text: "Смотреть",
                    visible: false
                },
                yellow: {
                    text: "На главную",
                    visible: false
                },
                blue: {
                    text: "1",
                    visible: false
                }
            });
            var btnWrap = document.createElement("div");
            div.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return div;
        };
        return ExitReqPageComp;
    }(BaseComponent_16["default"]));
    exports["default"] = ExitReqPageComp;
});
define("Components/UpdateListComponent", ["require", "exports", "Components/SeasonListComponent"], function (require, exports, SeasonListComponent_2) {
    "use strict";
    exports.__esModule = true;
    var UpdateListComponent = /** @class */ (function (_super) {
        __extends(UpdateListComponent, _super);
        function UpdateListComponent() {
            return _super.call(this, "updateList") || this;
        }
        UpdateListComponent.prototype.createTitle = function (item) {
            return item.name + " (" + item.message + ")";
        };
        return UpdateListComponent;
    }(SeasonListComponent_2["default"]));
    exports["default"] = UpdateListComponent;
});
define("Components/UpdateLIstPageComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/UpdateListComponent", "Components/BottomButtonComponent", "Components/InfoComponent"], function (require, exports, BaseComponent_17, HeaderComponent_5, UpdateListComponent_1, BottomButtonComponent_5, InfoComponent_2) {
    "use strict";
    exports.__esModule = true;
    var UpdateLIstPageComponent = /** @class */ (function (_super) {
        __extends(UpdateLIstPageComponent, _super);
        function UpdateLIstPageComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UpdateLIstPageComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [UpdateListComponent_1["default"], InfoComponent_2["default"]];
            new HeaderComponent_5["default"]('Обновления').render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_5["default"]({
                red: {
                    text: "Все сериалы",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: true
                },
                yellow: {
                    text: "История",
                    visible: true
                },
                blue: {
                    text: "Избранное",
                    visible: true
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return UpdateLIstPageComponent;
    }(BaseComponent_17["default"]));
    exports["default"] = UpdateLIstPageComponent;
});
define("Components/HistotyListComponent", ["require", "exports", "Components/SeasonListComponent"], function (require, exports, SeasonListComponent_3) {
    "use strict";
    exports.__esModule = true;
    var HistotyListComponent = /** @class */ (function (_super) {
        __extends(HistotyListComponent, _super);
        function HistotyListComponent() {
            return _super.call(this, "historyList") || this;
        }
        HistotyListComponent.prototype.createTitle = function (item) {
            return "" + item.seriesName;
        };
        return HistotyListComponent;
    }(SeasonListComponent_3["default"]));
    exports["default"] = HistotyListComponent;
});
define("Components/HistoryPageComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/BottomButtonComponent", "Components/HistotyListComponent"], function (require, exports, BaseComponent_18, HeaderComponent_6, BottomButtonComponent_6, HistotyListComponent_1) {
    "use strict";
    exports.__esModule = true;
    var UpdateLIstPageComponent = /** @class */ (function (_super) {
        __extends(UpdateLIstPageComponent, _super);
        function UpdateLIstPageComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UpdateLIstPageComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [HistotyListComponent_1["default"]];
            new HeaderComponent_6["default"]('История просмотров').render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_6["default"]({
                red: {
                    text: "Очистить",
                    visible: true
                },
                green: {
                    text: "Откр. Сериал",
                    visible: false
                },
                yellow: {
                    text: "Откр. Сезон",
                    visible: false
                },
                blue: {
                    text: "Очистить",
                    visible: false
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return UpdateLIstPageComponent;
    }(BaseComponent_18["default"]));
    exports["default"] = UpdateLIstPageComponent;
});
define("Components/FavoritesListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_4) {
    "use strict";
    exports.__esModule = true;
    var FavoritesListComponent = /** @class */ (function (_super) {
        __extends(FavoritesListComponent, _super);
        function FavoritesListComponent() {
            return _super.call(this, "favoritesList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        return FavoritesListComponent;
    }(ListComponent_4["default"]));
    exports["default"] = FavoritesListComponent;
});
define("Components/FavoritesPageComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/FavoritesListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_19, HeaderComponent_7, FavoritesListComponent_1, BottomButtonComponent_7) {
    "use strict";
    exports.__esModule = true;
    var FavoritesPageComponent = /** @class */ (function (_super) {
        __extends(FavoritesPageComponent, _super);
        function FavoritesPageComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FavoritesPageComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [FavoritesListComponent_1["default"]];
            new HeaderComponent_7["default"]('Избранное').render(elem.appendChild(document.createElement("div")));
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_7["default"]({
                red: {
                    text: "Удалить",
                    visible: true
                },
                green: {
                    text: "Удалить все",
                    visible: true
                },
                yellow: {
                    text: "Поиск",
                    visible: false
                },
                blue: {
                    text: "В избранное",
                    visible: false
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return FavoritesPageComponent;
    }(BaseComponent_19["default"]));
    exports["default"] = FavoritesPageComponent;
});
define("Components/PageRouter", ["require", "exports", "Components/BaseComponent", "Components/SerialComponent", "Components/SeasonsComponent", "Components/SeriesComponent", "Components/PlayComponent", "Components/ExitReqPageComp", "Components/UpdateLIstPageComponent", "Components/HistoryPageComponent", "Components/FavoritesPageComponent"], function (require, exports, BaseComponent_20, SerialComponent_1, SeasonsComponent_1, SeriesComponent_1, PlayComponent_1, ExitReqPageComp_1, UpdateLIstPageComponent_1, HistoryPageComponent_1, FavoritesPageComponent_1) {
    "use strict";
    exports.__esModule = true;
    var PageRouter = /** @class */ (function (_super) {
        __extends(PageRouter, _super);
        function PageRouter() {
            var _this = _super.call(this) || this;
            var model = _this.model;
            var self = _this;
            var App = model.getInstance("App");
            var route = App.getValue("route");
            route.subscribe(self);
            return _this;
        }
        PageRouter.prototype.create = function () {
            var elem = document.createElement("div");
            var App = this.model.getInstance("App");
            var route = App.getValue("route");
            route = route.get();
            route = route.split("/");
            route = "/" + route[1];
            var page;
            if (route === "/serialList") {
                page = new SerialComponent_1["default"]();
            }
            else if (route === '/seasonList') {
                page = new SeasonsComponent_1["default"]();
            }
            else if (route === '/seriesList') {
                page = new SeriesComponent_1["default"]();
            }
            else if (route === '/play') {
                page = new PlayComponent_1["default"]();
            }
            else if (route === '/exitReq') {
                page = new ExitReqPageComp_1["default"]();
            }
            else if (route === '/UpdateLIstPage') {
                page = new UpdateLIstPageComponent_1["default"]();
            }
            else if (route === '/historyList') {
                page = new HistoryPageComponent_1["default"]();
            }
            else if (route === '/favoritesList') {
                page = new FavoritesPageComponent_1["default"]();
            }
            page.render(elem);
            return elem;
        };
        return PageRouter;
    }(BaseComponent_20["default"]));
    exports["default"] = PageRouter;
});
define("RouteManager", ["require", "exports", "AppModel"], function (require, exports, AppModel_2) {
    "use strict";
    exports.__esModule = true;
    var RouteManager = /** @class */ (function () {
        function RouteManager() {
            this.historyArr = [];
            if (typeof RouteManager.cache !== 'undefined') {
                return RouteManager.cache;
            }
            this.model = new AppModel_2["default"]();
            this.route = this.model.getInstance("App").getValue("route");
            RouteManager.cache = this;
        }
        RouteManager.prototype.set = function (route) {
            this.historyArr.push(this.route.get());
            this.route.set(route);
        };
        RouteManager.prototype.back = function () {
            var backLocation = this.historyArr.pop();
            this.route.set(backLocation);
        };
        RouteManager.prototype.home = function () {
            this.historyArr = [];
            this.route.set("/UpdateLIstPage");
            this.model.serialList.focusPosition.set(0);
            this.model.serialList.scrolPosition.set(0);
        };
        return RouteManager;
    }());
    exports["default"] = RouteManager;
});
define("ListControllers/ListController", ["require", "exports", "AppModel"], function (require, exports, AppModel_3) {
    "use strict";
    exports.__esModule = true;
    var ListController = /** @class */ (function () {
        function ListController(instanceModel) {
            this.model = new AppModel_3["default"]();
            this.instanceModel = instanceModel;
            this.focusPosition = this.instanceModel.getValue("focusPosition");
            this.scrolPosition = this.instanceModel.getValue("scrolPosition");
            this.display = this.instanceModel.getValue("display");
            this.list = this.instanceModel.getValue("list");
        }
        ListController.prototype.rigthFocusPosition = function () {
            var scrolPosition = this.scrolPosition.get();
            var activePosition = this.focusPosition.get();
            if (activePosition < 5) {
                if (typeof this.display.get()()[activePosition + 1] !== "undefined") {
                    this.focusPosition.set(activePosition + 1);
                }
            }
            else if (activePosition === 5 &&
                activePosition !== this.display.get()().length - 1) {
                this.scrolPosition.set(scrolPosition + 6);
                this.focusPosition.set(0);
            }
            if (this.display.get()().length > 5) {
                this.infiniteScroll();
            }
        };
        ListController.prototype.leftFocusPosition = function () {
            var scrolPosition = this.scrolPosition.get();
            var minScrolPosition = 0;
            var activePosition = this.focusPosition.get();
            if (scrolPosition <= 0 && activePosition === 0) {
                return;
            }
            if (activePosition <= minScrolPosition) {
                this.scrolPosition.set(scrolPosition - 6);
                this.focusPosition.set(5);
                return;
            }
            this.focusPosition.set(activePosition - 1);
        };
        ListController.prototype.upFocusPosition = function () {
            var length = this.list.get().length;
            var scrolPosition = this.scrolPosition.get();
            var minScrolPosition = 0;
            var activePosition = this.focusPosition.get();
            if (scrolPosition <= 0 && activePosition < 3) {
                return;
            }
            if (activePosition < 3) {
                var newScrolPosition = scrolPosition - 6;
                if (newScrolPosition < minScrolPosition) {
                    this.scrolPosition.set(minScrolPosition);
                }
                else {
                    this.scrolPosition.set(newScrolPosition);
                    this.focusPosition.set(activePosition + 3);
                }
                return;
            }
            this.focusPosition.set(activePosition - 3);
        };
        ListController.prototype.downFocusPosition = function () {
            var length = this.list.get().length;
            var scrolPosition = this.scrolPosition.get();
            var maxScrolPosition = length - 1;
            var activePosition = this.focusPosition.get();
            if (length <= scrolPosition + 6 && activePosition >= 3) {
                if (this.display.get()().length > 5) {
                    this.infiniteScroll();
                }
                return;
            }
            if (activePosition >= 3) {
                var newScrolPosition = scrolPosition + 6;
                if (newScrolPosition > maxScrolPosition) {
                    this.scrolPosition.set(maxScrolPosition);
                }
                else {
                    this.scrolPosition.set(newScrolPosition);
                    if (typeof this.display.get()()[activePosition - 3] !== "undefined") {
                        this.focusPosition.set(activePosition - 3);
                    }
                    else {
                        this.focusPosition.set(this.display.get()().length - 1);
                    }
                }
                if (this.display.get()().length > 5) {
                    this.infiniteScroll();
                }
                return;
            }
            if (typeof this.display.get()()[activePosition + 3] !== "undefined") {
                this.focusPosition.set(activePosition + 3);
            }
            if (this.display.get()().length > 5) {
                this.infiniteScroll();
            }
        };
        ListController.prototype.infiniteScroll = function () { };
        ListController.prototype.onEnter = function () { };
        return ListController;
    }());
    exports["default"] = ListController;
});
define("Polyfill/Promise_simple", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function Promise_simple(f) {
        var returnCb = this.returnCb.bind(this);
        f(returnCb);
    }
    exports.Promise_simple = Promise_simple;
    Promise_simple.prototype.then = function (cb) {
        this.cb = cb;
    };
    Promise_simple.prototype.cb = function () { };
    Promise_simple.prototype.returnCb = function (q) {
        var self = this;
        setTimeout(function () {
            self.cb(q);
        }, 0);
    };
});
define("HTTP", ["require", "exports", "Polyfill/Promise_simple", "AppModel"], function (require, exports, Promise_simple_1, AppModel_4) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_4["default"]();
    function get_Serials(config) {
        var gArr = model.genreManager.list_default.get();
        var gArrNew = [];
        gArr.forEach(function (item) {
            if (item.active) {
                if (item.name) {
                    var n = item.name.replace('&', "");
                    gArrNew.push(n);
                }
            }
        });
        if (gArrNew && gArrNew.length > 0) {
            config.genre = gArrNew;
        }
        var searchQuery = model.searchManager.query.get();
        if (searchQuery) {
            config.searchQuery = searchQuery;
        }
        return getSerials(config);
    }
    exports.get_Serials = get_Serials;
    ;
    function getSerials(config) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = config;
            data = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/getSerials.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getSerials = getSerials;
    ;
    function getSeasons(idArr) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            idArr = idArr.map(function (item) { return +item; });
            var data = JSON.stringify({
                "idArr": idArr
            });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/getSeasons.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getSeasons = getSeasons;
    function getSeason(id) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ "id": +id });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/get_Season.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        data.playlist = JSON.parse(data.playlist);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getSeason = getSeason;
    function getUpdateList(offset) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ "offset": offset });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/getUpdateList.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getUpdateList = getUpdateList;
    function pushHistory(item) {
        var time = +new Date();
        item.time = time;
        item.userMac = model.App.userMac.get();
        item.seasonId = Number(item.seasonId);
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify(item);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/pushHistory.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.pushHistory = pushHistory;
    function getHistory() {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ userMac: model.App.userMac.get() });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/getHistory.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getHistory = getHistory;
    function clearHistory() {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ userMac: model.App.userMac.get() });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/clearHistory.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.clearHistory = clearHistory;
    function pushFavorites(serialId) {
        var item = {
            userMac: model.App.userMac.get(),
            serialId: Number(serialId)
        };
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify(item);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/pushFavorites.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.pushFavorites = pushFavorites;
    function getFavorites() {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ userMac: model.App.userMac.get() });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/getFavorites.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.getFavorites = getFavorites;
    function clearFavorites() {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({ userMac: model.App.userMac.get() });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/clearFavorites.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.clearFavorites = clearFavorites;
    function deleteFavorites(serialId) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            var data = JSON.stringify({
                serialId: Number(serialId),
                userMac: model.App.userMac.get()
            });
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://212.77.128.177/karakulov/seasonvar/api/deleteFavorites.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
            };
        });
    }
    exports.deleteFavorites = deleteFavorites;
});
define("createPrevViewData", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function createPrevViewData() {
        var arr = [];
        for (var i = 0; i < 20; i++) {
            arr.push({
                name: "Идет Загрузка",
                poster: "posterPrevView"
            });
        }
        return arr;
    }
    exports["default"] = createPrevViewData;
});
define("ListControllers/ListControllerSerials", ["require", "exports", "ListControllers/ListController", "RouteManager", "HTTP", "createPrevViewData"], function (require, exports, ListController_1, RouteManager_1, HTTP_1, createPrevViewData_1) {
    "use strict";
    exports.__esModule = true;
    var ListControllerSerials = /** @class */ (function (_super) {
        __extends(ListControllerSerials, _super);
        function ListControllerSerials() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerSerials.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openSerial();
        };
        ListControllerSerials.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerSerials.prototype.openSerial = function () {
            if (this.activeItem.seasons_number > 1) {
                this.openSeasonList();
            }
            else {
                this.openSeriesList();
            }
        };
        ListControllerSerials.prototype.openSeriesList = function () {
            this.model.seriesList.title.set(this.activeItem.name);
            new RouteManager_1["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seriesList.scrolPosition.set(0);
            this.model.seriesList.focusPosition.set(0);
            var seasonsIdList = JSON.parse(this.activeItem.seasonListIdJson);
            var seasonId = seasonsIdList[0];
            list.set(createPrevViewData_1["default"]());
            HTTP_1.getSeason(seasonId).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                    item.season_number = data.season_number;
                    item.serial = data.name;
                    item.seriesName = data.name + " (" + item.name + ")";
                    item.seasonId = data.idSeasonvar;
                });
                list.set(data.playlist);
            });
        };
        ListControllerSerials.prototype.openSeasonList = function () {
            new RouteManager_1["default"]().set("/seasonList");
            var list = this.model.getInstance("seasonList").getValue("list");
            this.model.seasonList.scrolPosition.set(0);
            this.model.seasonList.focusPosition.set(0);
            list.set(createPrevViewData_1["default"]());
            HTTP_1.getSeasons(JSON.parse(this.activeItem.seasonListIdJson)).then(function (data) {
                list.set(data);
            });
        };
        ListControllerSerials.prototype.infiniteScroll = function () {
            var length = this.model.serialList.list.get().length;
            var scrolPosition = this.model.serialList.scrolPosition.get();
            var dif = length - scrolPosition;
            if (dif < 20) {
                this.addContent();
            }
        };
        ListControllerSerials.prototype.addContent = function () {
            var _this = this;
            if (this.execution) {
                return;
            }
            this.execution = true;
            var length = this.model.serialList.list.get().length;
            var currentList = this.model.serialList.list.get();
            HTTP_1.get_Serials({ offset: length }).then(function (data) {
                currentList = currentList.concat(data);
                _this.model.serialList.list.set(currentList);
                _this.execution = false;
            });
        };
        ListControllerSerials.prototype.addFav = function () {
            var model = this.model;
            var messageText = model.message.text;
            var messageVisible = model.message.visible;
            this.defineActiveItem();
            HTTP_1.pushFavorites(this.activeItem.id);
            messageText.set("\u0421\u0435\u0440\u0438\u0430\u043B " + this.activeItem.name + " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435");
            messageVisible.set(true);
            hideMessage(messageText, messageVisible);
        };
        return ListControllerSerials;
    }(ListController_1["default"]));
    exports["default"] = ListControllerSerials;
    var timeout;
    function hideMessage(messageText, messageVisible) {
        var self = hideMessage;
        if (self.execution) {
            clearTimeout(timeout);
        }
        self.execution = true;
        timeout = setTimeout(function () {
            messageText.set("");
            messageVisible.set(false);
            self.execution = false;
        }, 3000);
    }
});
define("interfaceGlobal", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("SearchManager", ["require", "exports", "AppModel", "HTTP", "createPrevViewData"], function (require, exports, AppModel_5, HTTP_2, createPrevViewData_2) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_5["default"]();
    var SearchManager = /** @class */ (function () {
        function SearchManager() {
        }
        SearchManager.prototype.openWindow = function () {
            model.App.route.set(model.App.route.get() + "/searchManager");
            var input = document.querySelector(".app_home_searchManager_search_input");
            input.focus();
            try {
                stb.ShowVirtualKeyboard();
            }
            catch (e) {
                console.log(e);
            }
        };
        SearchManager.prototype.back = function () {
            model.App.route.set('/serialList');
            try {
                stb.HideVirtualKeyboard();
            }
            catch (e) {
                console.log(e);
            }
        };
        SearchManager.prototype.submit = function () {
            var list = model.genreManager.list_default.get();
            list.forEach(function (item) {
                item.active = false;
            });
            model.genreManager.list_default.set(list);
            try {
                stb.HideVirtualKeyboard();
            }
            catch (e) {
                console.log(e);
            }
            var elem = document.querySelector(".app_home_searchManager_search_input");
            var query = elem.value;
            model.searchManager.query.set(query);
            model.serialList.list.set(createPrevViewData_2["default"]());
            HTTP_2.get_Serials({ offset: 0 }).then(function (data) {
                model.serialList.list.set(data);
            });
            model.App.route.set('/serialList');
        };
        return SearchManager;
    }());
    exports["default"] = SearchManager;
});
define("GenreManager", ["require", "exports", "AppModel", "HTTP", "createPrevViewData"], function (require, exports, AppModel_6, HTTP_3, createPrevViewData_3) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_6["default"]();
    var GenreManager = /** @class */ (function () {
        function GenreManager() {
        }
        GenreManager.prototype.openWindow = function () {
            model.genreManager.list.set(JSON.parse(JSON.stringify(model.genreManager.list_default.get())));
            model.genreManager.buttonsList.set(JSON.parse(JSON.stringify(model.genreManager.buttonsList_default.get())));
            model.genreManager.position.set(10);
            model.App.route.set(model.App.route.get() + "/genreManager");
            model.genreManager.focus.set('list');
        };
        GenreManager.prototype.changeFocusRight = function () {
            model.genreManager.focus.set('buttons');
        };
        GenreManager.prototype.changeFocusLeft = function () {
            model.genreManager.focus.set('list');
        };
        GenreManager.prototype.changeFocusTop = function () {
            var focus = model.genreManager.focus.get();
            if (focus === 'list') {
                this.changeFocusTopList();
            }
            else if (focus === 'buttons') {
                this.changeFocusTopButtons();
            }
        };
        GenreManager.prototype.changeFocusTopList = function () {
            var position = model.genreManager.position.get();
            if (position > 0) {
                model.genreManager.position.set(position - 1);
            }
        };
        GenreManager.prototype.changeFocusBottom = function () {
            var focus = model.genreManager.focus.get();
            if (focus === 'list') {
                this.changeFocusBottomList();
            }
            else if (focus === 'buttons') {
                this.changeFocusBottomButtons();
            }
        };
        GenreManager.prototype.changeFocusBottomList = function () {
            var position = model.genreManager.position.get();
            if (position < model.genreManager.list.get().length - 3) {
                model.genreManager.position.set(position + 1);
            }
        };
        GenreManager.prototype.submit = function () {
            var focus = model.genreManager.focus.get();
            if (focus === 'list') {
                this.submitList();
            }
            else if (focus === 'buttons') {
                this.submitButtons();
            }
        };
        GenreManager.prototype.submitList = function () {
            var focusItem = model.genreManager.display()[2];
            var list = model.genreManager.list.get();
            list.forEach(function (item) {
                if (item.name === focusItem.name) {
                    item.active = item.active ? false : true;
                }
            });
            model.genreManager.list.set(list);
        };
        GenreManager.prototype.submitButtons = function () {
            var list = model.genreManager.buttonsList.get();
            var i = 0;
            var focusIndex;
            list.forEach(function (item) {
                if (item.focus) {
                    focusIndex = i;
                }
                i++;
            });
            var active = list[focusIndex];
            this[active.command]();
        };
        GenreManager.prototype.changeFocusButtons = function (diff) {
            var list = model.genreManager.buttonsList.get();
            var i = 0;
            var focusIndex;
            list.forEach(function (item) {
                if (item.focus) {
                    focusIndex = i;
                    item.focus = false;
                }
                i++;
            });
            if (typeof list[focusIndex + diff] !== 'undefined') {
                list[focusIndex + diff].focus = true;
            }
            else {
                list[focusIndex].focus = true;
            }
            model.genreManager.buttonsList.set(list);
        };
        GenreManager.prototype.changeFocusTopButtons = function () {
            this.changeFocusButtons(-1);
        };
        GenreManager.prototype.changeFocusBottomButtons = function () {
            this.changeFocusButtons(1);
        };
        GenreManager.prototype.back = function () {
            model.App.route.set('/serialList');
        };
        GenreManager.prototype.clear = function () {
            var list = model.genreManager.list.get();
            list.forEach(function (item) {
                item.active = false;
            });
            model.genreManager.list.set(list);
        };
        GenreManager.prototype.enter = function () {
            model.searchManager.query.set(false);
            model.genreManager.list_default.set(JSON.parse(JSON.stringify(model.genreManager.list.get())));
            model.serialList.list.set(createPrevViewData_3["default"]());
            HTTP_3.get_Serials({ offset: 0 }).then(function (data) {
                model.serialList.list.set(data);
            });
            this.back();
        };
        return GenreManager;
    }());
    exports["default"] = GenreManager;
});
define("InfoManager", ["require", "exports", "AppModel"], function (require, exports, AppModel_7) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_7["default"]();
    var GenreManager = /** @class */ (function () {
        function GenreManager() {
        }
        GenreManager.prototype.openWindow = function () {
            model.App.route.set(model.App.route.get() + "/infoManager");
        };
        GenreManager.prototype.back = function () {
            var route = model.App.route.get();
            if (route === "/UpdateLIstPage/infoManager") {
                model.App.route.set('/UpdateLIstPage');
            }
            else if (route === "/serialList/infoManager") {
                model.App.route.set('/serialList');
            }
        };
        GenreManager.prototype.scrollBottom = function () {
            var scroll = document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop;
            document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop = scroll + 10;
        };
        GenreManager.prototype.scrollTop = function () {
            var scroll = document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop;
            document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop = scroll - 10;
        };
        return GenreManager;
    }());
    exports["default"] = GenreManager;
});
define("MainSettingMenu", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MainSettingMenu = /** @class */ (function () {
        function MainSettingMenu() {
            this.mainList = new MainMenuList();
            this.interface = new MainSettingMenuWindow(this.mainList);
            this.list = this.mainList;
            MainSettingMenu.cache = this;
        }
        MainSettingMenu.getCurrentInstance = function () {
            return MainSettingMenu.cache;
        };
        MainSettingMenu.prototype.open = function () {
            var _this = this;
            this.interface.create();
            this.oldInputHandler = document.onkeydown;
            document.onkeydown = function (event) {
                if (event.keyCode === 13) {
                    _this.submit();
                }
                if (event.keyCode === 38) {
                    _this.upFocus();
                }
                if (event.keyCode === 40) {
                    _this.downFocus();
                }
                if (event.keyCode === 27) {
                    _this.close();
                }
                if (event.keyCode === 8) {
                    _this.close();
                }
            };
        };
        MainSettingMenu.prototype.returnOldInput = function () {
            document.onkeydown = this.oldInputHandler;
        };
        MainSettingMenu.prototype.close = function () {
            this.returnOldInput();
            this.interface.remove();
        };
        MainSettingMenu.prototype.setMunuList = function (menuList) {
            this.interface.menuList = menuList;
            this.interface.update();
            this.list = menuList;
        };
        MainSettingMenu.prototype.submit = function () {
            var item = this.list.getFocusItem();
            item.action();
        };
        MainSettingMenu.prototype.upFocus = function () {
            this.list.upFocus();
            this.interface.update();
        };
        MainSettingMenu.prototype.downFocus = function () {
            this.list.downFocus();
            this.interface.update();
        };
        return MainSettingMenu;
    }());
    exports["default"] = MainSettingMenu;
    var MainSettingMenuWindow = /** @class */ (function () {
        function MainSettingMenuWindow(menuList) {
            this.body = document.getElementsByTagName("body")[0];
            this.menuList = menuList;
        }
        MainSettingMenuWindow.prototype.create = function () {
            this.div = document.createElement("div");
            this.window = document.createElement("div");
            this.header = document.createElement("div");
            this.content = document.createElement("div");
            this.body.appendChild(this.div);
            this.div.appendChild(this.window);
            this.window.appendChild(this.header);
            this.window.appendChild(this.content);
            this.addElemsClassName();
            this.update();
        };
        MainSettingMenuWindow.prototype.addElemsClassName = function () {
            this.div.className = "app_MainSettingMenuList_wrap";
            this.window.className = "app_MainSettingMenuList_window";
            this.header.className = "app_MainSettingMenuList_header";
            this.content.className = "app_MainSettingMenuList_content";
        };
        MainSettingMenuWindow.prototype.update = function () {
            var _this = this;
            this.header.innerHTML = this.menuList.name;
            this.content.innerHTML = "";
            this.menuList.list.forEach(function (item) {
                var div = document.createElement("div");
                var p = document.createElement("p");
                div.appendChild(p);
                p.innerHTML = item.name;
                _this.content.appendChild(div);
                div.className = "app_MainSettingMenuListItem";
                if (item.focus) {
                    div.className = "app_MainSettingMenuListItem active";
                }
            });
        };
        MainSettingMenuWindow.prototype.remove = function () {
            this.body.removeChild(this.div);
        };
        return MainSettingMenuWindow;
    }());
    var MenuListItem = /** @class */ (function () {
        function MenuListItem(name, focus, action) {
            this.name = name;
            this.focus = focus;
            this.action = action;
        }
        return MenuListItem;
    }());
    var MenuList = /** @class */ (function () {
        function MenuList(name, list) {
            this.name = name;
            this.list = list;
        }
        MenuList.prototype.getFocusItem = function () {
            var focusItem;
            this.list.forEach(function (item) {
                if (item.focus) {
                    focusItem = item;
                }
            });
            return focusItem;
        };
        MenuList.prototype.downFocus = function () {
            var focusItem = this.getFocusItem();
            var focusIndex = this.list.indexOf(focusItem);
            var newFocusIndex = focusIndex + 1;
            if (typeof this.list[newFocusIndex] !== "undefined") {
                this.list[focusIndex].focus = false;
                this.list[newFocusIndex].focus = true;
            }
        };
        MenuList.prototype.upFocus = function () {
            var focusItem = this.getFocusItem();
            var focusIndex = this.list.indexOf(focusItem);
            var newFocusIndex = focusIndex - 1;
            if (typeof this.list[newFocusIndex] !== "undefined") {
                this.list[focusIndex].focus = false;
                this.list[newFocusIndex].focus = true;
            }
        };
        return MenuList;
    }());
    var MainMenuList = /** @class */ (function (_super) {
        __extends(MainMenuList, _super);
        function MainMenuList() {
            var _this = this;
            var list = [];
            list[0] = new MenuListItem("Родительский контроль", true, function (_) {
                var menu = MainSettingMenu.getCurrentInstance();
                var parentControlMenuList = new ParentControlMenuList();
                menu.setMunuList(parentControlMenuList);
            });
            _this = _super.call(this, "Настройки", list) || this;
            return _this;
        }
        return MainMenuList;
    }(MenuList));
    var ParentControlMenuList = /** @class */ (function (_super) {
        __extends(ParentControlMenuList, _super);
        function ParentControlMenuList() {
            var _this = this;
            var list = [];
            list[0] = new MenuListItem("Включить", true, function (_) {
                var menu = MainSettingMenu.getCurrentInstance();
                menu.close();
                setTimeout(function () {
                    try {
                        stb.RDir("setenv parent_control_apps true");
                    }
                    catch (e) {
                        console.log(e);
                    }
                }, 10);
            });
            list[1] = new MenuListItem("Выключить", false, function (_) {
                var menu = MainSettingMenu.getCurrentInstance();
                menu.close();
                setTimeout(function () {
                    try {
                        stb.RDir("setenv parent_control_apps false");
                    }
                    catch (e) {
                        console.log(e);
                    }
                }, 10);
            });
            _this = _super.call(this, "Родительский контроль", list) || this;
            return _this;
        }
        return ParentControlMenuList;
    }(MenuList));
});
define("inputLayer/serialListInput", ["require", "exports", "RouteManager", "ListControllers/ListControllerSerials", "AppModel", "SearchManager", "GenreManager", "InfoManager", "MainSettingMenu"], function (require, exports, RouteManager_2, ListControllerSerials_1, AppModel_8, SearchManager_1, GenreManager_1, InfoManager_1, MainSettingMenu_1) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var genreManager = new GenreManager_1["default"]();
    var infoManager = new InfoManager_1["default"]();
    var searchManager = new SearchManager_1["default"]();
    var model = new AppModel_8["default"]();
    var instanceModel = model.getInstance("serialList");
    var listControllerSerials = new ListControllerSerials_1["default"](instanceModel);
    var routeManager = new RouteManager_2["default"]();
    function serialList(code) {
        switch (code) {
            case 8:
                routeManager.back();
                break;
            case 27:
                routeManager.home();
                break;
            case 40:
                listControllerSerials.downFocusPosition();
                break;
            case 38:
                listControllerSerials.upFocusPosition();
                break;
            case 39:
                listControllerSerials.rigthFocusPosition();
                break;
            case 37:
                listControllerSerials.leftFocusPosition();
                break;
            case 13:
                listControllerSerials.onEnter();
                break;
            case 112:
                genreManager.openWindow();
                break;
            case 113:
                infoManager.openWindow();
                break;
            case 114:
                searchManager.openWindow();
                break;
            case 115:
                listControllerSerials.addFav();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.serialList = serialList;
    function serialListGenreManager(code) {
        switch (code) {
            case 39:
                genreManager.changeFocusRight();
                break;
            case 37:
                genreManager.changeFocusLeft();
                break;
            case 38:
                genreManager.changeFocusTop();
                break;
            case 40:
                genreManager.changeFocusBottom();
                break;
            case 13:
                genreManager.submit();
                break;
            case 8:
                genreManager.back();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.serialListGenreManager = serialListGenreManager;
    function serialListInfoManager(code) {
        switch (code) {
            case 8:
                infoManager.back();
                break;
            case 40:
                infoManager.scrollBottom();
                break;
            case 38:
                infoManager.scrollTop();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.serialListInfoManager = serialListInfoManager;
    function serialListSearchManager(code) {
        switch (code) {
            case 13:
                searchManager.submit();
                break;
            case 8:
                searchManager.back();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_1["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.serialListSearchManager = serialListSearchManager;
});
define("ListControllers/ListControllerUpdatesList", ["require", "exports", "ListControllers/ListControllerSerials", "HTTP", "RouteManager", "createPrevViewData"], function (require, exports, ListControllerSerials_2, HTTP_4, RouteManager_3, createPrevViewData_4) {
    "use strict";
    exports.__esModule = true;
    var ListControllerUpdatesList = /** @class */ (function (_super) {
        __extends(ListControllerUpdatesList, _super);
        function ListControllerUpdatesList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerUpdatesList.prototype.openSerial = function () {
            this.openSeriesList();
        };
        ListControllerUpdatesList.prototype.openSeriesList = function () {
            this.model.seriesList.title.set(this.activeItem.name);
            new RouteManager_3["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seriesList.scrolPosition.set(0);
            this.model.seriesList.focusPosition.set(0);
            list.set(createPrevViewData_4["default"]());
            HTTP_4.getSeason(this.activeItem.idSeasonvar).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                    item.season_number = data.season_number;
                    item.serial = data.name;
                    item.seriesName = data.name + " (" + item.name + ")";
                    item.seasonId = data.idSeasonvar;
                });
                list.set(data.playlist);
            });
        };
        ListControllerUpdatesList.prototype.addContent = function () {
            var _this = this;
            var length = this.model.updateList.list.get().length;
            var currentList = this.model.updateList.list.get();
            HTTP_4.getUpdateList(length).then(function (data) {
                currentList = currentList.concat(data);
                _this.model.updateList.list.set(currentList);
            });
        };
        ListControllerUpdatesList.prototype.infiniteScroll = function () {
            var length = this.model.updateList.list.get().length;
            var scrolPosition = this.model.updateList.scrolPosition.get();
            var dif = length - scrolPosition;
            if (dif < 20) {
                this.addContent();
            }
        };
        ListControllerUpdatesList.prototype.openSerialList = function () {
            var _this = this;
            this.model.searchManager.query.set(false);
            var list = this.model.genreManager.list_default.get();
            var newList = list.map(function (_) {
                _.active = false;
                _.focus = false;
                return _;
            });
            this.model.genreManager.list_default.set(newList);
            new RouteManager_3["default"]().set("/serialList");
            this.model.serialList.list.set(createPrevViewData_4["default"]());
            HTTP_4.get_Serials({ offset: 0 }).then(function (data) {
                _this.model.serialList.list.set(data);
            });
        };
        ListControllerUpdatesList.prototype.openHistoryList = function () {
            var _this = this;
            new RouteManager_3["default"]().set("/historyList");
            this.model.historyList.list.set(createPrevViewData_4["default"]());
            HTTP_4.getHistory().then(function (data) {
                _this.model.historyList.list.set(data);
            });
        };
        ListControllerUpdatesList.prototype.openFavoritesList = function () {
            var _this = this;
            new RouteManager_3["default"]().set("/favoritesList");
            this.model.favoritesList.list.set(createPrevViewData_4["default"]());
            HTTP_4.getFavorites().then(function (data) {
                _this.model.favoritesList.list.set(data);
            });
        };
        return ListControllerUpdatesList;
    }(ListControllerSerials_2["default"]));
    exports["default"] = ListControllerUpdatesList;
});
define("ExitManager", ["require", "exports", "AppModel", "RouteManager"], function (require, exports, AppModel_9, RouteManager_4) {
    "use strict";
    exports.__esModule = true;
    var routeManager = new RouteManager_4["default"]();
    var ExitManager = /** @class */ (function () {
        function ExitManager() {
            if (typeof ExitManager.cache !== 'undefined') {
                return ExitManager.cache;
            }
            this.model = new AppModel_9["default"]();
            this.App = this.model.getInstance("App");
            this.route = this.App.getValue("route");
            this.ExitMenuInstance = this.model.getInstance("ExitMenuInstance");
            this.exitReqConfig = this.ExitMenuInstance.getValue("config");
            ExitManager.cache = this;
        }
        ExitManager.prototype.exitReq = function () {
            this.oldRoute = this.route.get();
            this.exitReqConfig.set({
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
            });
            routeManager.set("/exitReq");
        };
        ExitManager.prototype.exit = function () {
            stb.SetVideoState(1);
            var back_location = decodeURIComponent(window.location.search.match(/\?referrer\=.*/));
            back_location = back_location.replace(/\?referrer\=/, '');
            window.location = back_location;
        };
        ExitManager.prototype.cancel = function () {
            routeManager.back();
        };
        ExitManager.prototype.downFocusPosition = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            list[0].active = false;
            list[1].active = true;
            this.exitReqConfig.set(config);
        };
        ExitManager.prototype.upFocusPosition = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            list[0].active = true;
            list[1].active = false;
            this.exitReqConfig.set(config);
        };
        ExitManager.prototype.submit = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            var command;
            list.forEach(function (item) {
                if (item.active) {
                    command = item.command;
                }
            });
            if (command === 'exit') {
                this.exit();
            }
            else if (command === 'cancel') {
                this.cancel();
            }
        };
        return ExitManager;
    }());
    exports["default"] = ExitManager;
});
define("inputLayer/updateListPage", ["require", "exports", "ListControllers/ListControllerUpdatesList", "AppModel", "ExitManager", "InfoManager", "MainSettingMenu"], function (require, exports, ListControllerUpdatesList_1, AppModel_10, ExitManager_1, InfoManager_2, MainSettingMenu_2) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var model = new AppModel_10["default"]();
    var instanceModelUpdatesList = model.getInstance("updateList");
    var listControllerUpdatesList = new ListControllerUpdatesList_1["default"](instanceModelUpdatesList);
    var infoManager = new InfoManager_2["default"]();
    var exitManager = new ExitManager_1["default"]();
    function UpdateLIstPage(code) {
        switch (code) {
            case 27:
                exitManager.exitReq();
                break;
            case 40:
                listControllerUpdatesList.downFocusPosition();
                break;
            case 38:
                listControllerUpdatesList.upFocusPosition();
                break;
            case 39:
                listControllerUpdatesList.rigthFocusPosition();
                break;
            case 37:
                listControllerUpdatesList.leftFocusPosition();
                break;
            case 13:
                listControllerUpdatesList.onEnter();
                break;
            case 112:
                listControllerUpdatesList.openSerialList();
                break;
            case 113:
                infoManager.openWindow();
                break;
            case 114:
                listControllerUpdatesList.openHistoryList();
                break;
            case 115:
                listControllerUpdatesList.openFavoritesList();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_2["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_2["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.UpdateLIstPage = UpdateLIstPage;
    function UpdateLIstPageInfoManager(code) {
        switch (code) {
            case 8:
                infoManager.back();
                break;
            case 40:
                infoManager.scrollBottom();
                break;
            case 38:
                infoManager.scrollTop();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_2["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_2["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.UpdateLIstPageInfoManager = UpdateLIstPageInfoManager;
});
define("ListControllers/ListControllerSeasons", ["require", "exports", "ListControllers/ListController", "RouteManager", "HTTP", "createPrevViewData"], function (require, exports, ListController_2, RouteManager_5, HTTP_5, createPrevViewData_5) {
    "use strict";
    exports.__esModule = true;
    var ListControllerSeasons = /** @class */ (function (_super) {
        __extends(ListControllerSeasons, _super);
        function ListControllerSeasons() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerSeasons.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openSeason();
        };
        ListControllerSeasons.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerSeasons.prototype.openSeason = function () {
            this.openSeriesList();
        };
        ListControllerSeasons.prototype.openSeriesList = function () {
            this.model.seriesList.title.set(this.activeItem.name + " (" + this.activeItem.season_number + " \u0441\u0435\u0437\u043E\u043D)");
            new RouteManager_5["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seriesList.scrolPosition.set(0);
            this.model.seriesList.focusPosition.set(0);
            var seasonId = this.activeItem.idSeasonvar;
            list.set(createPrevViewData_5["default"]());
            HTTP_5.getSeason(seasonId).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                    item.season_number = data.season_number;
                    item.serial = data.name;
                    item.seriesName = data.name + " (" + item.name + ")";
                    item.seasonId = data.idSeasonvar;
                });
                list.set(data.playlist);
            });
        };
        return ListControllerSeasons;
    }(ListController_2["default"]));
    exports["default"] = ListControllerSeasons;
});
define("inputLayer/seasonListInput", ["require", "exports", "AppModel", "RouteManager", "ListControllers/ListControllerSeasons", "MainSettingMenu"], function (require, exports, AppModel_11, RouteManager_6, ListControllerSeasons_1, MainSettingMenu_3) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var model = new AppModel_11["default"]();
    var instanceModelSeasonList = model.getInstance("seasonList");
    var listControllerSeasons = new ListControllerSeasons_1["default"](instanceModelSeasonList);
    var routeManager = new RouteManager_6["default"]();
    function seasonList(code) {
        switch (code) {
            case 112:
                routeManager.back();
                break;
            case 8:
                routeManager.back();
                break;
            case 27:
                routeManager.home();
                break;
            case 40:
                listControllerSeasons.downFocusPosition();
                break;
            case 38:
                listControllerSeasons.upFocusPosition();
                break;
            case 39:
                listControllerSeasons.rigthFocusPosition();
                break;
            case 37:
                listControllerSeasons.leftFocusPosition();
                break;
            case 13:
                listControllerSeasons.onEnter();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_3["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_3["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.seasonList = seasonList;
});
define("Play", ["require", "exports", "AppModel"], function (require, exports, AppModel_12) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_12["default"]();
    var Play = model.getInstance("Play");
    var VideoList = model.getInstance("seriesList");
    var App = model.getInstance("App");
    var namespace = {
        model: {
            VideoList: VideoList,
            Play: Play,
            App: App
        }
    };
    var _ = {};
    _.playControlInterfaceInit = function () {
        try {
            var durationSec = stb.GetMediaLenEx() / 1000;
            var progress = namespace.model.Play.progress.get();
            progress.play = 0;
            namespace.model.Play.progress.set(progress);
            var timeBar = namespace.model.Play.timeBar.get();
            timeBar.durationSec = durationSec;
            timeBar.playSec = 0;
            namespace.model.Play.timeBar.set(timeBar);
        }
        catch (e) {
            console.log(e);
        }
        namespace.model.Play.status.set("play");
        var display = namespace.model.VideoList.display.get()();
        var activePosition = namespace.model.VideoList.focusPosition.get();
        var name = display[activePosition].name;
        var item = display[activePosition];
        var season = item.season_number;
        if (+season > 0) {
            season = season + " \u0441\u0435\u0437\u043E\u043D";
        }
        else {
            season = '';
        }
        name = item.serial + ": " + season + " " + item.name;
        namespace.model.Play.name.set(name);
        this.showPlayInfo();
        this.progresControllStart();
    };
    _.progresControllStart = function progresControllStart() {
        if (this.progresControllInterval) {
            clearInterval(this.progresControllInterval);
        }
        this.progresControllInterval = setInterval(function () {
            try {
                var playPosition = stb.GetPosTimeEx();
                var duration = stb.GetMediaLenEx();
                var percent = 100 / duration;
                var percentPosition = percent * playPosition;
                var progress = namespace.model.Play.progress.get();
                if (!(percent && percentPosition)) {
                    percentPosition = 0;
                }
                namespace.model.Play.timeBar.get().playSec = playPosition / 1000;
                namespace.model.Play.timeBar.get().durationSec = duration / 1000;
                namespace.model.Play.timeBar.set(namespace.model.Play.timeBar.get());
                if (percentPosition > 99.9) {
                    _.exitPlay();
                }
                progress.play = percentPosition;
                progress.duration = duration;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
        }, 2000);
    };
    _.progresControllInterval = undefined;
    _.pause = function () {
        namespace.model.Play.status.set("pause");
        namespace.model.Play.visibleControlBar.set(true);
        clearTimeout(_.showPlayInfo.timer);
        try {
            stb.Pause();
        }
        catch (e) {
            console.log(e);
        }
    };
    _.continuePlayback = function () {
        try {
            stb.Continue();
            namespace.model.Play.status.set("play");
            this.showPlayInfo();
        }
        catch (e) {
            console.log(e);
        }
    };
    _.switchPlayPause = function () {
        try {
            var status = stb.IsPlaying();
            if (status) {
                this.pause();
            }
            else {
                this.continuePlayback();
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    _.showPlayInfo = function showPlayInfo() {
        namespace.model.Play.visibleControlBar.set(true);
        var selfFunction = showPlayInfo;
        try {
            if (selfFunction.timer) {
                clearInterval(selfFunction.timer);
            }
        }
        catch (e) {
            console.log(e);
        }
        selfFunction.timer = setTimeout(function () {
            namespace.model.Play.visibleControlBar.set(false);
        }, 5000);
    };
    _.exitPlay = function () {
        try {
            clearInterval(this.progresControllInterval);
        }
        catch (e) {
            console.log(e);
        }
        namespace.model.App.route.set("/seriesList");
        try {
            stb.Stop();
            stb.SetVideoState(0);
        }
        catch (e) {
            console.log(e);
        }
    };
    _.volumePlus = function () {
        this.showPlayInfo();
        try {
            var vol = stb.GetVolume();
            vol = vol + 10;
            if (vol > 100) {
                vol = 100;
            }
            stb.SetVolume(vol);
            namespace.model.Play.volume.set(stb.GetVolume());
        }
        catch (e) {
            console.log(e);
        }
    };
    _.volumeMinus = function () {
        this.showPlayInfo();
        try {
            var vol = stb.GetVolume();
            if (vol <= 10) {
                vol = 0;
            }
            else {
                vol = vol - 10;
            }
            stb.SetVolume(vol);
            namespace.model.Play.volume.set(stb.GetVolume());
        }
        catch (e) {
            console.log(e);
        }
    };
    _.timeShiftControlTimer = false;
    _.timeShiftControlActive = false;
    _.timeShiftCurrentTime = false;
    _.timeShiftBlock = false;
    _.timeShiftRight = function () {
        if (this.timeShiftBlock) {
            return;
        }
        clearInterval(this.progresControllInterval);
        var self = this;
        this.showPlayInfo();
        var time;
        if (this.timeShiftControlActive) {
            time = this.timeShiftCurrentTime;
        }
        else {
            try {
                time = stb.GetPosTimeEx();
            }
            catch (e) {
                time = 5;
            }
        }
        this.timeShiftControlActive = true;
        this.timeShiftCurrentTime =
            time + namespace.model.Play.timeShiftSize.get().value * 1000;
        var duration = stb.GetMediaLenEx();
        var percent = 100 / duration;
        var percentPosition = percent * this.timeShiftCurrentTime;
        var progress = namespace.model.Play.progress.get();
        var timeBar = namespace.model.Play.timeBar.get();
        timeBar.durationSec = duration / 1000;
        timeBar.playSec = this.timeShiftCurrentTime / 1000;
        if (timeBar.playSec >= timeBar.durationSec) {
            timeBar.playSec = timeBar.durationSec;
        }
        if (timeBar.playSec <= 0) {
            timeBar.playSec = 0;
        }
        if (percentPosition > 100) {
            percentPosition = 100;
        }
        if (percentPosition <= 0) {
            percentPosition = 0;
        }
        namespace.model.Play.timeBar.set(timeBar);
        progress.play = percentPosition;
        namespace.model.Play.progress.set(progress);
        if (this.timeShiftControlTimer) {
            clearTimeout(this.timeShiftControlTimer);
        }
        this.timeShiftControlTimer = setTimeout(function () {
            try {
                var duration = stb.GetMediaLenEx();
                if (self.timeShiftCurrentTime >= duration ||
                    self.timeShiftCurrentTime <= 0) {
                    self.timeShiftCurrentTime = 0;
                }
                stb.SetPosTimeEx(self.timeShiftCurrentTime);
                var percent = 100 / duration;
                var percentPosition = percent * self.timeShiftCurrentTime;
                var progress = namespace.model.Play.progress.get();
                progress.play = percentPosition;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
            self.timeShiftBlock = true;
            setTimeout(function () {
                self.timeShiftBlock = false;
                self.progresControllStart();
                self.timeShiftControlActive = false;
            }, 1000);
        }, 1500);
    };
    _.timeShiftLeft = function () {
        if (this.timeShiftBlock) {
            return;
        }
        clearInterval(this.progresControllInterval);
        var self = this;
        this.showPlayInfo();
        var time;
        if (this.timeShiftControlActive) {
            time = this.timeShiftCurrentTime;
        }
        else {
            try {
                time = stb.GetPosTimeEx();
            }
            catch (e) {
                time = 5;
            }
        }
        this.timeShiftControlActive = true;
        this.timeShiftCurrentTime =
            time - namespace.model.Play.timeShiftSize.get().value * 1000;
        var duration = stb.GetMediaLenEx();
        var percent = 100 / duration;
        var percentPosition = percent * this.timeShiftCurrentTime;
        var progress = namespace.model.Play.progress.get();
        var timeBar = namespace.model.Play.timeBar.get();
        timeBar.durationSec = duration / 1000;
        timeBar.playSec = this.timeShiftCurrentTime / 1000;
        if (timeBar.playSec >= timeBar.durationSec) {
            timeBar.playSec = timeBar.durationSec;
        }
        if (timeBar.playSec <= 0) {
            timeBar.playSec = 0;
        }
        if (percentPosition > 100) {
            percentPosition = 100;
        }
        if (percentPosition <= 0) {
            percentPosition = 0;
        }
        namespace.model.Play.timeBar.set(timeBar);
        progress.play = percentPosition;
        namespace.model.Play.progress.set(progress);
        if (this.timeShiftControlTimer) {
            clearTimeout(this.timeShiftControlTimer);
        }
        this.timeShiftControlTimer = setTimeout(function () {
            try {
                var duration = stb.GetMediaLenEx();
                if (self.timeShiftCurrentTime >= duration ||
                    self.timeShiftCurrentTime <= 0) {
                    self.timeShiftCurrentTime = 0;
                }
                stb.SetPosTimeEx(self.timeShiftCurrentTime);
                var percent = 100 / duration;
                var percentPosition = percent * self.timeShiftCurrentTime;
                var progress = namespace.model.Play.progress.get();
                progress.play = percentPosition;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
            self.timeShiftBlock = true;
            setTimeout(function () {
                self.timeShiftBlock = false;
                self.progresControllStart();
                self.timeShiftControlActive = false;
            }, 1000);
        }, 1500);
    };
    (function () {
        _.nextTimeShiftSize = function () {
            changeTimeShiftSize(1);
            _.showPlayInfo();
        };
        _.prevTimeShiftSize = function () {
            changeTimeShiftSize(-1);
            _.showPlayInfo();
        };
        function changeTimeShiftSize(changeValue) {
            var size = namespace.model.Play.timeShiftSize.get();
            var i = 0;
            var index = 0;
            timeShiftSizeList.forEach(function (item) {
                if (item.value === size.value) {
                    index = i;
                }
                i++;
            });
            if (typeof timeShiftSizeList[index + changeValue] !== 'undefined') {
                namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index + changeValue]);
            }
            else {
                namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index]);
            }
        }
        var timeShiftSizeList = [
            {
                name: "10 мин",
                value: 600,
                command: "changetimeShiftSize"
            },
            {
                name: "05 мин",
                value: 300,
                command: "changetimeShiftSize"
            },
            {
                name: "01 мин",
                value: 60,
                command: "changetimeShiftSize"
            },
            {
                name: "30 сек",
                value: 30,
                command: "changetimeShiftSize"
            },
            {
                name: "20 сек",
                value: 20,
                command: "changetimeShiftSize"
            },
            {
                name: "10 сек",
                value: 10,
                command: "changetimeShiftSize"
            }
        ];
    })();
    _.OpenSettingMenu = function () {
        namespace.model.App.route.set("/play/settingMenu");
        namespace.model.Play.settingMenu.visible.set(true);
        namespace.model.Play.visibleControlBar.set(true);
        if (typeof _.showPlayInfo.timer !== "undefined") {
            clearTimeout(_.showPlayInfo.timer);
        }
        var menuList = namespace.model.Play.settingMenu.mainList.get();
        menuList = JSON.parse(JSON.stringify(menuList));
        namespace.model.Play.settingMenu.list.set(menuList);
    };
    _.playSettingMenuNextElem = function () {
        changePlaySettingMenuElemPosition("+");
    };
    _.playSettingMenuPrevElem = function () {
        changePlaySettingMenuElemPosition("-");
    };
    function changePlaySettingMenuElemPosition(string) {
        var list = namespace.model.Play.settingMenu.list.get();
        var activeIndex;
        var i = 0;
        list.forEach(function (item) {
            if (item.active) {
                item.active = false;
                activeIndex = i;
            }
            i++;
        });
        var newIndex;
        if (string === "-") {
            newIndex = activeIndex - 1;
        }
        else {
            newIndex = activeIndex + 1;
        }
        if (typeof list[newIndex] === "undefined") {
            newIndex = activeIndex;
        }
        list[newIndex].active = true;
        namespace.model.Play.settingMenu.list.set(list);
    }
    _.playSettingMenuSubmit = function () {
        var list = namespace.model.Play.settingMenu.list.get();
        var activeItem;
        list.forEach(function (item) {
            if (item.active) {
                activeItem = item;
            }
        });
        var key = activeItem.command;
        if (typeof this.SettingMenuCommands[key] === "undefined") {
            return;
        }
        this.SettingMenuCommands[key](activeItem);
    };
    _.closeSettingMenu = function () {
        namespace.model.App.route.set("/play");
        var qualityList = namespace.model.Play.settingMenu.qualityList.get();
        qualityList.forEach(function (item) {
            item.active = false;
        });
        namespace.model.Play.settingMenu.visible.set(false);
        _.showPlayInfo();
        var menuList = namespace.model.Play.settingMenu.mainList.get();
        menuList = JSON.parse(JSON.stringify(menuList));
        namespace.model.Play.settingMenu.list.set(menuList);
    };
    _.SettingMenuCommands = {
        changetimeShiftSize: function (item) {
            var newItemActivated = item;
            _.showPlayInfo();
            namespace.model.Play.settingMenu.visible.set(false);
            var speedList = namespace.model.Play.settingMenu.timeShiftSizeList.get();
            speedList.forEach(function (item) {
                item.active = false;
                item.activated = false;
                if (item.name === newItemActivated.name) {
                    item.activated = true;
                }
            });
            namespace.model.Play.timeShiftSize.set(item);
            _.closeSettingMenu();
        },
        openQualityList: function () {
            var qualityList = namespace.model.Play.settingMenu.qualityList.get();
            qualityList = JSON.parse(JSON.stringify(qualityList));
            qualityList.forEach(function (item) {
                if (item.format_id === "22") {
                    item.name = "720p";
                }
                else if (item.format_id === "43") {
                    item.name = "480p";
                }
                else if (item.format_id === "18") {
                    item.name = "360p";
                }
                else if (item.format_id === "36") {
                    item.name = "240p";
                }
                else if (item.format_id === "17") {
                    item.name = "144p";
                }
                else {
                    item.name = "Качество не определено";
                }
            });
            qualityList.forEach(function (item) {
                item.command = "changeQuality";
            });
            qualityList.forEach(function (item) {
                if (item.activated) {
                    item.active = true;
                }
            });
            namespace.model.Play.settingMenu.list.set(qualityList);
            namespace.model.Play.settingMenu.qualityList.set(qualityList);
        },
        openVolumeList: function () {
            var volumeList = namespace.model.Play.settingMenu.volumeList.get();
            namespace.model.Play.settingMenu.list.set(volumeList);
        },
        changeVolume: function (item) {
            var vol = +(item.name.split("%")[0]);
            try {
                stb.SetVolume(vol);
                namespace.model.Play.volume.set(stb.GetVolume());
            }
            catch (e) {
                console.log(e);
            }
            namespace.model.App.route.set("/play");
            _.showPlayInfo();
            namespace.model.Play.settingMenu.visible.set(false);
        },
        changeQuality: function (item) {
            try {
                var position = stb.GetPosTimeEx();
                stb.Play("" + item.url);
                stb.SetPosTimeEx(position);
            }
            catch (e) {
                console.log(e);
            }
            _.showPlayInfo();
            namespace.model.Play.settingMenu.visible.set(false);
            var qualityList = namespace.model.Play.settingMenu.qualityList.get();
            qualityList.forEach(function (item) {
                item.active = false;
                item.activated = false;
            });
            item.activated = true;
            _.closeSettingMenu();
        }
    };
    exports["default"] = _;
});
define("ListControllers/ListControllerVideo", ["require", "exports", "ListControllers/ListController", "Play", "RouteManager", "HTTP"], function (require, exports, ListController_3, Play_1, RouteManager_7, HTTP_6) {
    "use strict";
    exports.__esModule = true;
    var ListControllerVideo = /** @class */ (function (_super) {
        __extends(ListControllerVideo, _super);
        function ListControllerVideo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerVideo.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openVideo();
        };
        ListControllerVideo.prototype.goHome = function () {
            new RouteManager_7["default"]().set("/serialList");
        };
        ListControllerVideo.prototype.infiniteScroll = function () {
            return false;
        };
        ListControllerVideo.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerVideo.prototype.openVideo = function () {
            var _this = this;
            this.model.App.route.set("/play");
            this.model.Play.timeBar.set({ playSec: 0, durationSec: 0 });
            this.model.Play.loadingWheel.set(true);
            var url;
            var display = this.model.seriesList.display.get()();
            var activePosition = this.model.seriesList.focusPosition.get();
            var qualityArr = [{ url: display[activePosition].link }];
            if (typeof qualityArr[0].url === "undefined") {
                throw new Error("qualityArr undefined");
            }
            HTTP_6.pushHistory(display[activePosition]);
            Play_1["default"].playControlInterfaceInit();
            var newQualityArr = [];
            qualityArr.forEach(function (item) {
                newQualityArr.unshift(item);
            });
            var url = newQualityArr[0].url;
            newQualityArr[0].activated = true;
            this.model.Play.settingMenu.qualityList.set(newQualityArr);
            setTimeout(function () {
                _this.model.Play.loadingWheel.set(false);
            }, 500);
            try {
                if (!url) {
                    throw new Error("url not found");
                }
                else {
                    stb.SetVideoState(1);
                    stb.Play("" + url);
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        return ListControllerVideo;
    }(ListController_3["default"]));
    exports["default"] = ListControllerVideo;
});
define("inputLayer/seriesListInput", ["require", "exports", "AppModel", "ListControllers/ListControllerVideo", "RouteManager", "MainSettingMenu"], function (require, exports, AppModel_13, ListControllerVideo_1, RouteManager_8, MainSettingMenu_4) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var model = new AppModel_13["default"]();
    var routeManager = new RouteManager_8["default"]();
    var instanceModelVideo = model.getInstance("seriesList");
    var listControllerVideo = new ListControllerVideo_1["default"](instanceModelVideo);
    function seriesList(code) {
        switch (code) {
            case 112:
                routeManager.back();
                break;
            case 8:
                routeManager.back();
                break;
            case 27:
                routeManager.home();
                break;
            case 40:
                listControllerVideo.downFocusPosition();
                break;
            case 38:
                listControllerVideo.upFocusPosition();
                break;
            case 39:
                listControllerVideo.rigthFocusPosition();
                break;
            case 37:
                listControllerVideo.leftFocusPosition();
                break;
            case 13:
                listControllerVideo.onEnter();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_4["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_4["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.seriesList = seriesList;
});
define("aspectRatioManager", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var _ = {};
    _.elem = undefined;
    _.aspect_array = [
        { text: "ВМЕСТИТЬ", mode: 0x10 },
        { text: "УВЕЛИЧЕННЫЙ", mode: 0x40 },
        { text: "ОПТИМАЛЬНЫЙ", mode: 0x50 },
        { text: "РАСТЯНУТЬ", mode: 0x00 },
        { text: "КОМБИНИРОВАННЫЙ", mode: 0x30 }
    ];
    _.mode = undefined;
    _.init = function () {
        this.mode = this.getAspect();
        var index = this.mode;
        var item = this.aspect_array[index];
        var value = item.mode;
        this.setAspect(value);
        this.setText(item.text);
    };
    _.handler = function () {
        var status = this.statusActive();
        if (status) {
            this.nextAspect();
        }
        this.activate();
    };
    _.next_ = function () {
        this.mode = this.mode + 1;
        if (this.mode > 4) {
            this.mode = 0;
        }
        return this.mode;
    };
    _.nextAspect = function () {
        var index = this.next_();
        var item = this.aspect_array[index];
        var value = item.mode;
        this.setAspect(value);
        this.setText(item.text);
        this.activate();
    };
    _.mount = function (id) {
        this.elem = document.getElementById(id);
    };
    _.setText = function (text) {
        if (!this.elem) {
            return false;
        }
        this.elem.innerHTML = text;
    };
    _.visible = function (mode) {
        if (mode) {
            this.elem.style.display = "block";
        }
        else {
            this.elem.style.display = "none";
        }
    };
    _.statusActive = function statusActive(value) {
        var selfFunc = statusActive;
        if (typeof value === "undefined") {
            if (selfFunc.statusActive) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (value === true) {
            selfFunc.statusActive = true;
        }
        else {
            selfFunc.statusActive = false;
        }
    };
    _.activate = function activate() {
        var selfFunc = activate;
        var self = this;
        this.statusActive(true);
        this.visible(true);
        if (selfFunc.timeout) {
            try {
                clearTimeout(selfFunc.timeout);
            }
            catch (e) {
                console.log(e);
            }
        }
        selfFunc.timeout = setTimeout(function () {
            self.statusActive(false);
            self.visible(false);
            self.saveAspect(self.mode);
        }, 3000);
    };
    _.getAspect = function () {
        var value;
        try {
            value = stb.RDir("getenv aspect", value);
        }
        catch (e) {
            console.log(e);
        }
        if (value) {
            value = +value;
            return value;
        }
        else {
            return 3;
        }
    };
    _.setAspect = function (value) {
        setTimeout(function () {
            try {
                stb.SetAspect(value);
            }
            catch (e) {
                console.log(e);
            }
        }, 0);
    };
    _.saveAspect = function (index) {
        setTimeout(function () {
            try {
                stb.RDir("setenv aspect " + index);
            }
            catch (e) {
                console.log(e);
            }
        }, 1000);
    };
    exports["default"] = _;
});
define("inputLayer/playInput", ["require", "exports", "Play", "aspectRatioManager"], function (require, exports, Play_2, aspectRatioManager_1) {
    "use strict";
    exports.__esModule = true;
    function play(code) {
        switch (code) {
            case 27:
                Play_2["default"].exitPlay();
                break;
            case 8:
                Play_2["default"].exitPlay();
                break;
            case 122:
                Play_2["default"].exitPlay();
                break;
            case 82:
                Play_2["default"].switchPlayPause();
                break;
            case 89:
                Play_2["default"].showPlayInfo();
                break;
            case 13:
                Play_2["default"].showPlayInfo();
                break;
            case 38:
                Play_2["default"].prevTimeShiftSize();
                break;
            case 40:
                Play_2["default"].nextTimeShiftSize();
                break;
            case 107:
                Play_2["default"].volumePlus();
                break;
            case 109:
                Play_2["default"].volumeMinus();
                break;
            case 37:
                Play_2["default"].timeShiftLeft();
                break;
            case 39:
                Play_2["default"].timeShiftRight();
                break;
            case 66:
                Play_2["default"].timeShiftLeft();
                break;
            case 70:
                Play_2["default"].timeShiftRight();
                break;
            case 120:
                Play_2["default"].OpenSettingMenu();
                break;
            case 123:
                Play_2["default"].OpenSettingMenu();
                break;
            case 117:
                aspectRatioManager_1["default"].handler();
                break;
        }
    }
    exports.play = play;
    function playSettingMenu(code) {
        switch (code) {
            case 13:
                Play_2["default"].playSettingMenuSubmit();
                break;
            case 38:
                Play_2["default"].playSettingMenuPrevElem();
                break;
            case 40:
                Play_2["default"].playSettingMenuNextElem();
                break;
            case 120:
                Play_2["default"].closeSettingMenu();
                break;
            case 27:
                Play_2["default"].closeSettingMenu();
                break;
            case 8:
                Play_2["default"].closeSettingMenu();
                break;
            case 122:
                Play_2["default"].closeSettingMenu();
                break;
            case 123:
                Play_2["default"].closeSettingMenu();
                break;
        }
    }
    exports.playSettingMenu = playSettingMenu;
});
define("ListControllers/ListControllerHistory", ["require", "exports", "ListControllers/ListController", "RouteManager", "createPrevViewData", "HTTP"], function (require, exports, ListController_4, RouteManager_9, createPrevViewData_6, HTTP_7) {
    "use strict";
    exports.__esModule = true;
    var ListControllerHistory = /** @class */ (function (_super) {
        __extends(ListControllerHistory, _super);
        function ListControllerHistory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerHistory.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openSeriesList();
        };
        ListControllerHistory.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerHistory.prototype.openSeriesList = function () {
            this.model.seriesList.title.set(this.activeItem.name + " (" + this.activeItem.season_number + " \u0441\u0435\u0437\u043E\u043D)");
            new RouteManager_9["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seriesList.scrolPosition.set(0);
            this.model.seriesList.focusPosition.set(0);
            var seasonId = this.activeItem.idSeasonvar;
            list.set(createPrevViewData_6["default"]());
            HTTP_7.getSeason(seasonId).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                    item.season_number = data.season_number;
                    item.serial = data.name;
                    item.seriesName = data.name + " (" + item.name + ")";
                    item.seasonId = data.idSeasonvar;
                });
                list.set(data.playlist);
            });
        };
        ListControllerHistory.prototype.clear = function () {
            this.model.historyList.list.set([]);
            HTTP_7.clearHistory();
        };
        return ListControllerHistory;
    }(ListController_4["default"]));
    exports["default"] = ListControllerHistory;
});
define("inputLayer/historyListInput", ["require", "exports", "RouteManager", "AppModel", "ListControllers/ListControllerHistory", "MainSettingMenu"], function (require, exports, RouteManager_10, AppModel_14, ListControllerHistory_1, MainSettingMenu_5) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var routeManager = new RouteManager_10["default"]();
    var model = new AppModel_14["default"]();
    var instanceModelHistory = model.getInstance("historyList");
    var listControllerHistory = new ListControllerHistory_1["default"](instanceModelHistory);
    function historyList(code) {
        switch (code) {
            case 8:
                routeManager.back();
                break;
            case 27:
                routeManager.home();
                break;
            case 40:
                listControllerHistory.downFocusPosition();
                break;
            case 38:
                listControllerHistory.upFocusPosition();
                break;
            case 39:
                listControllerHistory.rigthFocusPosition();
                break;
            case 37:
                listControllerHistory.leftFocusPosition();
                break;
            case 13:
                listControllerHistory.onEnter();
                break;
            case 112:
                listControllerHistory.clear();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_5["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_5["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.historyList = historyList;
});
define("inputLayer/exitReqInput", ["require", "exports", "ExitManager", "MainSettingMenu"], function (require, exports, ExitManager_2, MainSettingMenu_6) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var exitManager = new ExitManager_2["default"]();
    function exitReq(code) {
        switch (code) {
            case 112:
                exitManager.cancel();
                break;
            case 40:
                exitManager.downFocusPosition();
                break;
            case 38:
                exitManager.upFocusPosition();
                break;
            case 13:
                exitManager.submit();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_6["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_6["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.exitReq = exitReq;
});
define("ListControllers/ListControllerFavorites", ["require", "exports", "ListControllers/ListController", "RouteManager", "HTTP", "createPrevViewData"], function (require, exports, ListController_5, RouteManager_11, HTTP_8, createPrevViewData_7) {
    "use strict";
    exports.__esModule = true;
    var ListControllerSerials = /** @class */ (function (_super) {
        __extends(ListControllerSerials, _super);
        function ListControllerSerials() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerSerials.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openSerial();
        };
        ListControllerSerials.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerSerials.prototype.openSerial = function () {
            if (this.activeItem.seasons_number > 1) {
                this.openSeasonList();
            }
            else {
                this.openSeriesList();
            }
        };
        ListControllerSerials.prototype.openSeriesList = function () {
            this.model.seriesList.title.set(this.activeItem.name);
            new RouteManager_11["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seriesList.scrolPosition.set(0);
            this.model.seriesList.focusPosition.set(0);
            var seasonsIdList = JSON.parse(this.activeItem.seasonListIdJson);
            var seasonId = seasonsIdList[0];
            list.set(createPrevViewData_7["default"]());
            HTTP_8.getSeason(seasonId).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                    item.season_number = data.season_number;
                    item.serial = data.name;
                    item.seriesName = data.name + " (" + item.name + ")";
                    item.seasonId = data.idSeasonvar;
                });
                list.set(data.playlist);
            });
        };
        ListControllerSerials.prototype.openSeasonList = function () {
            new RouteManager_11["default"]().set("/seasonList");
            var list = this.model.getInstance("seasonList").getValue("list");
            this.model.seasonList.scrolPosition.set(0);
            this.model.seasonList.focusPosition.set(0);
            list.set(createPrevViewData_7["default"]());
            HTTP_8.getSeasons(JSON.parse(this.activeItem.seasonListIdJson)).then(function (data) {
                list.set(data);
            });
        };
        ListControllerSerials.prototype.clearFavorites = function () {
            this.model.favoritesList.list.set([]);
            HTTP_8.clearFavorites();
        };
        ListControllerSerials.prototype.deleteFavorites = function () {
            var _this = this;
            this.defineActiveItem();
            HTTP_8.deleteFavorites(this.activeItem.serialId);
            var list = this.model.favoritesList.list.get();
            var activeItem;
            list.forEach(function (item) {
                if (item.serialId === _this.activeItem.serialId) {
                    activeItem = item;
                }
            });
            var index = list.indexOf(activeItem);
            list.splice(index, 1);
            this.model.favoritesList.list.set(list);
        };
        return ListControllerSerials;
    }(ListController_5["default"]));
    exports["default"] = ListControllerSerials;
});
define("inputLayer/favoritsInput", ["require", "exports", "RouteManager", "ListControllers/ListControllerFavorites", "AppModel", "MainSettingMenu"], function (require, exports, RouteManager_12, ListControllerFavorites_1, AppModel_15, MainSettingMenu_7) {
    "use strict";
    exports.__esModule = true;
    var mainSettingMenu;
    var model = new AppModel_15["default"]();
    var instanceModel = model.getInstance("favoritesList");
    var listControllerFavorites = new ListControllerFavorites_1["default"](instanceModel);
    var routeManager = new RouteManager_12["default"]();
    function favoritsList(code) {
        switch (code) {
            case 8:
                routeManager.back();
                break;
            case 27:
                routeManager.home();
                break;
            case 40:
                listControllerFavorites.downFocusPosition();
                break;
            case 38:
                listControllerFavorites.upFocusPosition();
                break;
            case 39:
                listControllerFavorites.rigthFocusPosition();
                break;
            case 37:
                listControllerFavorites.leftFocusPosition();
                break;
            case 13:
                listControllerFavorites.onEnter();
                break;
            case 112:
                listControllerFavorites.deleteFavorites();
                break;
            case 113:
                listControllerFavorites.clearFavorites();
                break;
            case 114:
                // searchManager.openWindow();
                break;
            case 115:
                //  listControllerSerials.addFav();
                break;
            case 120:
                mainSettingMenu = new MainSettingMenu_7["default"]();
                mainSettingMenu.open();
                break;
            case 123:
                mainSettingMenu = new MainSettingMenu_7["default"]();
                mainSettingMenu.open();
                break;
        }
    }
    exports.favoritsList = favoritsList;
});
define("inputLayer/inputLayer", ["require", "exports", "AppModel", "inputLayer/serialListInput", "inputLayer/updateListPage", "inputLayer/seasonListInput", "inputLayer/seriesListInput", "inputLayer/playInput", "inputLayer/historyListInput", "inputLayer/exitReqInput", "inputLayer/favoritsInput"], function (require, exports, AppModel_16, serialListInput_1, updateListPage_1, seasonListInput_1, seriesListInput_1, playInput_1, historyListInput_1, exitReqInput_1, favoritsInput_1) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_16["default"]();
    var _ = {
        init: function init() {
            document.onkeydown = function (event) {
                this.inputHandler(event.keyCode);
            }.bind(this);
        },
        inputHandler: function (code) {
            var route = model.getInstance("App").getValue("route");
            var inputType = route.get();
            if (this.handlers.hasOwnProperty(inputType)) {
                this.handlers[inputType](code);
            }
        },
        handlers: {
            "/serialList": serialListInput_1.serialList,
            "/serialList/genreManager": serialListInput_1.serialListGenreManager,
            "/serialList/infoManager": serialListInput_1.serialListInfoManager,
            "/serialList/searchManager": serialListInput_1.serialListSearchManager,
            "/UpdateLIstPage": updateListPage_1.UpdateLIstPage,
            "/UpdateLIstPage/infoManager": updateListPage_1.UpdateLIstPageInfoManager,
            "/seasonList": seasonListInput_1.seasonList,
            "/seriesList": seriesListInput_1.seriesList,
            "/play": playInput_1.play,
            "/play/settingMenu": playInput_1.playSettingMenu,
            "/exitReq": exitReqInput_1.exitReq,
            "/historyList": historyListInput_1.historyList,
            "/favoritesList": favoritsInput_1.favoritsList
        }
    };
    exports["default"] = _;
});
define("adaptation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function default_2() {
        if (screen.width > 1200) {
            var rules = [
                ".app_ChannelListComponent_wrap_elem { height: 38%; }",
                ".app_ChannelListComponent_card_img  {  height: 70%; }",
                ".app_ChannelListComponent_card_h1   { font-size: 23px; }",
                ".app_Play_ControlBar_timeShiftSizeBar { right: 230px; }",
                ".app_home_genreManager_window  {    width: 400px;} ",
                ".app_home_genreManager_window_list_GenreElemWrap {width: 88%} ",
                ".app_home_genreManager_window_buttonPanel { width: 130px; }",
                ".app_home_infoManager_window_body_box2_description {height: 50%;}",
                ".app_home_infoManager_window { width: 600px; height: 450px;}",
                ".app_home_infoManager_window_body_box1_infoBox {width: 70%;}",
                ".app_home_infoManager_window {font-size: 20px;}",
                ".ParentControlWindow_h1 {  font-size: 18px; }",
                ".ParentControlWindow_invalidElem {  font-size: 17px; }",
                ".ParentControlWindow_window { width: 450px; height: 280px;}",
                ".ParentControlWindow_input {width: 77%;} ",
                ".app_MainSettingMenuList_window { width: 400px; } ",
                ".ParentControlWindow_exitButton { width: 39.9%;}",
                ".ParentControlWindow_okButton { width: 39.9%;}"
            ];
            var cssAll = rules.join("\n");
            var head = document.getElementsByTagName("head");
            head = head[0];
            var style = document.createElement("style");
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = cssAll;
            }
            else {
                style.appendChild(document.createTextNode(cssAll));
            }
            head.appendChild(style);
        }
    }
    exports["default"] = default_2;
});
define("ParentControl", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ParentControl = /** @class */ (function () {
        function ParentControl() {
            ParentControl;
            if (ParentControl.cache) {
                return ParentControl.cache;
            }
            ParentControl.cache = this;
        }
        ParentControl.prototype.init = function () {
            this.getEnv();
            this.getPassword();
        };
        ParentControl.prototype.getEnv = function () {
            try {
                this.mac = stb.RDir("MACAddress");
                this.parentControl = stb.RDir("getenv parent_control_apps");
            }
            catch (e) {
                //this.mac = "00:1a:79:1a:87:fa";
                // this.parentControl = true;
                console.log(e);
            }
        };
        ParentControl.prototype.getPassword = function () {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("get", "http://212.77.128.205/stalker_portal/custom/get_pass.php?mac=" + this.mac, true);
            xhr.send();
            xhr.onreadystatechange = function (_) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        _this.password = data.password;
                        _this.ready();
                    }
                }
            };
        };
        ParentControl.prototype.isParentControlOn = function () {
            if (typeof this.parentControl === "undefined") {
                return false;
            }
            else if (this.parentControl === "false") {
                return false;
            }
            if (this.parentControl) {
                return true;
            }
            else {
                return false;
            }
        };
        ParentControl.prototype.openParentControlWindow = function () {
            var _this = this;
            this.parentControlWindow = new ParentControlWindow();
            this.parentControlWindow.OnSubmit = function (password) {
                if (_this.checkPassword(password)) {
                    _this.parentControlWindow.close();
                }
                else {
                    _this.parentControlWindow.invalid();
                }
            };
        };
        ParentControl.prototype.checkPassword = function (password) {
            return password === this.password;
        };
        ParentControl.prototype.ready = function () {
            this.onReady();
        };
        ParentControl.cache = false;
        return ParentControl;
    }());
    exports["default"] = ParentControl;
    var ParentControlWindow = /** @class */ (function () {
        function ParentControlWindow() {
            this.body = document.getElementsByTagName("body")[0];
            this.wrap = document.createElement("div");
            this.window = document.createElement("div");
            this.header = document.createElement("div");
            this.content = document.createElement("div");
            this.h1 = document.createElement("h1");
            this.input = document.createElement("input");
            this.okButton = document.createElement("input");
            this.exitButton = document.createElement("input");
            this.invalidElem = document.createElement("p");
            this.input.type = "password";
            this.okButton.type = "button";
            this.exitButton.type = "button";
            this.body.appendChild(this.wrap);
            this.wrap.appendChild(this.window);
            this.window.appendChild(this.header);
            this.window.appendChild(this.content);
            this.content.appendChild(this.h1);
            this.content.appendChild(this.input);
            this.content.appendChild(this.okButton);
            this.content.appendChild(this.exitButton);
            this.content.appendChild(this.invalidElem);
            this.header.innerHTML = "РОДИТЕЛЬСКИЙ КОНТРОЛЬ";
            this.h1.innerHTML = "Для доступа к приложению необходимо ввести пароль:";
            this.okButton.value = "OK";
            this.exitButton.value = "Выход";
            this.addElemsClassName();
            this.initInput();
        }
        ParentControlWindow.prototype.close = function () {
            document.onkeydown = this.oldInputHandler;
            this.wrap.style.display = "none";
            this.body.removeChild(this.wrap);
        };
        ParentControlWindow.prototype.invalid = function () {
            this.invalidElem.innerHTML = "Неправильный пароль!";
        };
        ParentControlWindow.prototype.addElemsClassName = function () {
            this.wrap.className = "ParentControlWindow_wrap";
            this.window.className = "ParentControlWindow_window";
            this.header.className = "ParentControlWindow_header";
            this.content.className = "ParentControlWindow_content";
            this.h1.className = "ParentControlWindow_h1";
            this.input.className = "ParentControlWindow_input";
            this.invalidElem.className = "ParentControlWindow_invalidElem";
            this.okButton.className = "ParentControlWindow_okButton";
            this.exitButton.className = "ParentControlWindow_exitButton";
        };
        ParentControlWindow.prototype.initInput = function () {
            var inputController = new InputController(this.input, this.okButton, this.exitButton, this.submit.bind(this));
            this.oldInputHandler = document.onkeydown;
            document.onkeydown = function (event) {
                inputController.press(event.keyCode);
            };
        };
        ParentControlWindow.prototype.submit = function (value) {
            this.OnSubmit(value);
        };
        return ParentControlWindow;
    }());
    var InputController = /** @class */ (function () {
        function InputController(inputElem, okElem, exitElem, submitF) {
            this.inputElem = inputElem;
            this.okElem = okElem;
            this.exitElem = exitElem;
            this.submitF = submitF;
            this.inputElem.focus();
        }
        InputController.prototype.press = function (code) {
            if (code === 13) {
                this.enter();
            }
            else if (code === 40) {
                this.downFocus();
            }
            else if (code === 38) {
                this.upFocus();
            }
            else if (code === 39) {
                this.rightFocus();
            }
            else if (code === 37) {
                this.leftFocus();
            }
            else if (code === 27) {
                this.exit();
            }
            else if (code === 8) {
                this.back();
            }
        };
        InputController.prototype.exit = function () {
            var win = window;
            try {
                stb.SetVideoState(1);
            }
            catch (e) {
                console.log(e);
            }
            var back_location = decodeURIComponent(win.location.search.match(/\?referrer\=.*/));
            back_location = back_location.replace(/\?referrer\=/, "");
            win.location = back_location;
        };
        InputController.prototype.back = function () {
            if (this.inputElem !== document.activeElement) {
                this.exit();
            }
        };
        InputController.prototype.downFocus = function () {
            if (this.inputElem === document.activeElement) {
                this.okElem.focus();
            }
            else if (this.exitElem === document.activeElement) {
            }
            else if (this.okElem === document.activeElement) {
                this.exitElem.focus();
            }
        };
        InputController.prototype.upFocus = function () {
            if (this.inputElem === document.activeElement) {
            }
            else if (this.exitElem === document.activeElement) {
                this.okElem.focus();
            }
            else if (this.okElem === document.activeElement) {
                this.inputElem.focus();
            }
        };
        InputController.prototype.rightFocus = function () {
            if (this.inputElem === document.activeElement) {
            }
            else if (this.exitElem === document.activeElement) {
            }
            else if (this.okElem === document.activeElement) {
                this.exitElem.focus();
            }
        };
        InputController.prototype.leftFocus = function () {
            if (this.inputElem === document.activeElement) {
            }
            else if (this.exitElem === document.activeElement) {
                this.okElem.focus();
            }
            else if (this.okElem === document.activeElement) {
                this.inputElem.focus();
            }
        };
        InputController.prototype.enter = function () {
            if (this.inputElem === document.activeElement) {
                this.submitF(this.inputElem.value);
            }
            else if (this.exitElem === document.activeElement) {
                this.exit();
            }
            else if (this.okElem === document.activeElement) {
                this.submitF(this.inputElem.value);
            }
        };
        return InputController;
    }());
});
define("app", ["require", "exports", "Polyfill/bindSimplePolyfill", "AppModel", "Components/PageRouter", "inputLayer/inputLayer", "adaptation", "HTTP", "aspectRatioManager", "createPrevViewData", "ParentControl"], function (require, exports, bindSimplePolyfill_1, AppModel_17, PageRouter_1, inputLayer_1, adaptation_1, HTTP_9, aspectRatioManager_2, createPrevViewData_8, ParentControl_1) {
    "use strict";
    exports.__esModule = true;
    var App = /** @class */ (function () {
        function App() {
        }
        App.main = function (appContainerSelector) {
            bindSimplePolyfill_1["default"]();
            adaptation_1["default"]();
            var mac;
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                stb = gSTB;
                stb.InitPlayer();
                stb.SetVideoControl(1);
                stb.SetVideoState(1);
                stb.SetTopWin(0);
                stb.SetVolume(100);
                var stbEvent = {
                    onEvent: function (data) { },
                    event: 0
                };
                mac = stb.RDir("MACAddress");
            }
            catch (e) {
                console.log(e);
            }
            if (typeof mac === "undefined") {
                mac = "testMac";
            }
            var parentControl = new ParentControl_1["default"]();
            parentControl.init();
            parentControl.onReady = function () {
                if (!parentControl.isParentControlOn()) {
                    return false;
                }
                parentControl.openParentControlWindow();
            };
            aspectRatioManager_2["default"].mount("aspect");
            aspectRatioManager_2["default"].init();
            var appContainer = document.getElementById(appContainerSelector);
            var pageRouterWrap = document.createElement("div");
            appContainer.appendChild(pageRouterWrap);
            var model = new AppModel_17["default"]();
            window.model = model;
            model.App.userMac.set(mac);
            model.updateList.list.set(createPrevViewData_8["default"]());
            HTTP_9.getUpdateList({ offset: 0 }).then(function (data) {
                model.updateList.list.set(data);
            });
            inputLayer_1["default"].init();
            var pageRouter = new PageRouter_1["default"]();
            pageRouter.render(appContainer);
        };
        return App;
    }());
    App.main("app");
});
