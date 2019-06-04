import BaseComponent from "./BaseComponent";

type classNameConfig = {
  elemClassName: string;
  wrapClassName: string;
  cardClassName: string;
  wrapActiveClassName: string;
  imgClassName: string;
  h1ClassName: string;
};

export default class ListComponent extends BaseComponent {
  constructor(instanceName: string, classNameConfig: classNameConfig) {
    super();
    this.instance = this.model.getInstance(instanceName);
    this.list = this.instance.getValue("display").get();
    this.focusPosition = this.instance.getValue("focusPosition");

    this.classNameConfig = classNameConfig;
    let subscribeArr = [
      this.instance.getValue("scrolPosition"),
      this.instance.getValue("focusPosition"),
      this.instance.getValue("display"),
      this.instance.getValue("list")
    ];
    subscribeArr.forEach(item => {
      item.subscribe(this);
    });
  }
  protected create() {
    let elem = document.createElement("div");
    elem.className = this.classNameConfig.elemClassName;
    let list = this.list();

    list = JSON.parse(JSON.stringify(list));
    if (typeof list[this.focusPosition.get()] !== "undefined") {
      list[this.focusPosition.get()].active = true;
    }
    if (list.length === 0) {
      let p = document.createElement('p')
      elem.appendChild(p)
      p.className = "List_component_elem_not_found"
      p.innerHTML = 'Ничего не найдено.'
    }
    list.forEach(item => {
      let itemElem = this.createItem(item);
      if (itemElem) {
        elem.appendChild(itemElem);
      }
    });
    return elem;
  }
  protected createItem(item) {
    let title
    let imgSrc
    if (
      typeof item.name === 'undefined'
    ) {
      title = item[0].name;
    } else {
      title = item.name;
    }
    
    if (
      typeof item.poster === 'undefined'
    ) {
      imgSrc = item[0].poster
    } else {
      imgSrc = item.poster
    }
    

    let wrap = document.createElement("div");
    let card = document.createElement("div");
    let img = document.createElement("img");
    let h1 = document.createElement("h1");

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
      let duration = document.createElement("div")
      let dr = item.contentDetails.duration
      var timetring = convertISO8601(dr)
 
      duration.innerHTML = `${timetring}`
      duration.className = "app_VideoListComponent_card_duration"
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
  }
  protected instance;
  protected list;
  protected focusPosition;
  protected classNameConfig: classNameConfig;
}


function convertISO8601(input) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours:any = 0, minutes:any = 0, seconds:any = 0, totalseconds;
  if (reptms.test(input)) {
      var matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      hours = hours ? hours+":" : ""
      minutes = minutes ? minutes+":" : "00:"
      seconds = seconds + ""
      if (hours) {
        minutes = minutes.length === 2 ? "0" + minutes : minutes
      }
      if (minutes) {
        seconds = seconds.length === 1 ? "0" + seconds : seconds
      }
      var timeString = `${hours}${minutes}${seconds}`
  }
  return (timeString);
}
