import ListComponent from "./ListComponent";

export default class VideoListComponent extends ListComponent {
  constructor() {
    super("video", {
      elemClassName: "app_VideoListComponent",
      wrapClassName: "app_VideoListComponent_wrap_elem",
      cardClassName: "app_VideoListComponent_card",
      wrapActiveClassName: "app_VideoListComponent_wrap_elem active",
      imgClassName: "app_VideoListComponent_card_img",
      h1ClassName: "app_VideoListComponent_card_h1"
    });
  }
}
