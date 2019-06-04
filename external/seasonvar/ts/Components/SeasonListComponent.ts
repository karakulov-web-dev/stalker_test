import ChannelListComponent from "./ListComponent";

export default class SeasonListComponent extends ChannelListComponent {
  constructor(instanceName?:string) {
    if (typeof instanceName === 'undefined') {
      instanceName = "seasonList"
    }
    super(instanceName, {
      elemClassName: "app_ChannelListComponent",
      wrapClassName: "app_ChannelListComponent_wrap_elem",
      cardClassName: "app_ChannelListComponent_card",
      wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
      imgClassName: "app_ChannelListComponent_card_img",
      h1ClassName: "app_ChannelListComponent_card_h1"
    });
  }
  protected createItem(item) {
    let title
    let imgSrc

      title = this.createTitle(item)
      imgSrc = item.poster
 
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

    if (title.length > 50) {
      title = title.split("");
      title.length = title.length = 90;
      title = title.join("");
      title = title + "...";
    }

    h1.innerHTML = title;

    if (imgSrc !== 'posterPrevView') {
      img.src = imgSrc;
    } else {
      h1.innerHTML = 'Идет Загрузка'
    }

    return wrap;
  }
  protected createTitle (item) {
    return item.name + " (" +  item.season_number + " сезон)";
  }
}

