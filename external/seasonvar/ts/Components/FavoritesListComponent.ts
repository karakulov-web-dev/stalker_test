import ListComponent from "./ListComponent";

export default class FavoritesListComponent extends ListComponent {
  constructor() {
    super("favoritesList", {
      elemClassName: "app_ChannelListComponent",
      wrapClassName: "app_ChannelListComponent_wrap_elem",
      cardClassName: "app_ChannelListComponent_card",
      wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
      imgClassName: "app_ChannelListComponent_card_img",
      h1ClassName: "app_ChannelListComponent_card_h1"
    });
  }
}
