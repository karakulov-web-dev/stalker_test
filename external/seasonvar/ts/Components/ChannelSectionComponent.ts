import ListComponent from "./ListComponent";

export default class ChannelSection extends ListComponent {
  constructor() {
    super("channelSections", {
      elemClassName: "app_VideoListComponent",
      wrapClassName: "app_VideoListComponent_wrap_elem",
      cardClassName: "app_VideoListComponent_card",
      wrapActiveClassName: "app_VideoListComponent_wrap_elem active",
      imgClassName: "app_VideoListComponent_card_img",
      h1ClassName: "app_VideoListComponent_card_h1"
    });
  }
  protected createItem(item) {
    let type = item.snippet.type;
    let title, imgSrc;

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

    if (type === "multiplePlaylists") {
        title = item.snippet.title
    } else if (type === "singlePlaylist") {
        title = item.firstPlayList.snippet.title
    } else if (type === "allVideos") {
      title = item.snippet.title
      h1.style.textAlign = "center"
      h1.style.fontSize = "20px"
    }
    imgSrc = item.firstPlayList.snippet.thumbnails.medium.url

    if (title.length > 50) {
      title = title.split("");
      title.length = title.length = 90;
      title = title.join("");
      title = title + "...";
    }

    h1.innerHTML = title;
    img.src = imgSrc;

    return wrap;
  }
}
