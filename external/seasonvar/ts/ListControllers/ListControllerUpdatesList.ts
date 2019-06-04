import ListControllerSerials from "./ListControllerSerials";
import {
  getUpdateList,
  getSeason,
  get_Serials,
  getHistory,
  getFavorites
} from "../HTTP";
import RouteManager from "../RouteManager";
import createPrevViewData from "../createPrevViewData";

export default class ListControllerUpdatesList extends ListControllerSerials {
  protected openSerial() {
    this.openSeriesList();
  }
  protected openSeriesList() {
    this.model.seriesList.title.set(this.activeItem.name);
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list");
    this.model.seriesList.scrolPosition.set(0);
    this.model.seriesList.focusPosition.set(0);
    list.set(createPrevViewData());
    getSeason(this.activeItem.idSeasonvar).then(data => {
      data.playlist.forEach(item => {
        item.poster = data.poster;
        item.season_number = data.season_number;
        item.serial = data.name;

        item.seriesName = `${data.name} (${item.name})`;
        item.seasonId = data.idSeasonvar;
      });
      list.set(data.playlist);
    });
  }
  protected addContent() {
    let length = this.model.updateList.list.get().length;
    let currentList = this.model.updateList.list.get();
    getUpdateList(length).then(data => {
      currentList = currentList.concat(data);
      this.model.updateList.list.set(currentList);
    });
  }
  protected infiniteScroll() {
    let length = this.model.updateList.list.get().length;
    let scrolPosition = this.model.updateList.scrolPosition.get();
    let dif = length - scrolPosition;
    if (dif < 20) {
      this.addContent();
    }
  }
  public openSerialList() {
    this.model.searchManager.query.set(false);
    let list = this.model.genreManager.list_default.get();
    let newList = list.map(_ => {
      _.active = false;
      _.focus = false;
      return _;
    });
    this.model.genreManager.list_default.set(newList);
    new RouteManager().set("/serialList");
    this.model.serialList.list.set(createPrevViewData());
    get_Serials({ offset: 0 }).then(data => {
      this.model.serialList.list.set(data);
    });
  }
  public openHistoryList() {
    new RouteManager().set("/historyList");
    this.model.historyList.list.set(createPrevViewData());
    getHistory().then(data => {
      this.model.historyList.list.set(data);
    });
  }
  public openFavoritesList() {
    new RouteManager().set("/favoritesList");
    this.model.favoritesList.list.set(createPrevViewData());
    getFavorites().then(data => {
      this.model.favoritesList.list.set(data);
    });
  }
}
