import ChannelListComponent from "./ListComponent";

export default class SeriesListComponent extends ChannelListComponent {
  constructor() {
    super("seriesList", {
      elemClassName: "app_ChannelListComponent",
      wrapClassName: "app_ChannelListComponent_wrap_elem",
      cardClassName: "app_ChannelListComponent_card",
      wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
      imgClassName: "app_ChannelListComponent_card_img",
      h1ClassName: "app_ChannelListComponent_card_h1"
    });
  }
  protected createItem(item) {
    let title;
    let imgSrc;

    title = item.name;
    imgSrc = item.poster;

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

    if (typeof item.contentDetails !== "undefined") {
      let duration = document.createElement("div");
      let dr = item.contentDetails.duration;
      var timetring = convertISO8601(dr);

      duration.innerHTML = `${timetring}`;
      duration.className = "app_VideoListComponent_card_duration";
      card.appendChild(duration);
    }

    if (title.length > 50) {
      title = title.split("");
      title.length = title.length = 90;
      title = title.join("");
      title = title + "...";
    }

    let perevod = item.perevod ? item.perevod : "Стандартный";
    h1.innerHTML = title + " (Перевод " + perevod + ")";
    if (imgSrc !== "posterPrevView") {
      img.src = imgSrc;
    }
    return wrap;
  }
}

function convertISO8601(input) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours: any = 0,
    minutes: any = 0,
    seconds: any = 0,
    totalseconds;
  if (reptms.test(input)) {
    var matches = reptms.exec(input);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    hours = hours ? hours + ":" : "";
    minutes = minutes ? minutes + ":" : "00:";
    seconds = seconds + "";
    if (hours) {
      minutes = minutes.length === 2 ? "0" + minutes : minutes;
    }
    if (minutes) {
      seconds = seconds.length === 1 ? "0" + seconds : seconds;
    }
    var timeString = `${hours}${minutes}${seconds}`;
  }
  return timeString;
}
