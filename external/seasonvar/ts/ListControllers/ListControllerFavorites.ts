import ListController from "./ListController";
import RouteManager from "../RouteManager";
import { getSeasons,  getSeason, clearFavorites, deleteFavorites } from "../HTTP";
import createPrevViewData from "../createPrevViewData";

export default class ListControllerSerials extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openSerial();
  }
  protected defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  protected openSerial() {
    if (this.activeItem.seasons_number > 1) {
      this.openSeasonList();
    } else {
      this.openSeriesList();
    }
  }
  protected openSeriesList() {
    this.model.seriesList.title.set(this.activeItem.name);
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list");
    this.model.seriesList.scrolPosition.set(0);
    this.model.seriesList.focusPosition.set(0);
    let seasonsIdList = JSON.parse(this.activeItem.seasonListIdJson);
    let seasonId = seasonsIdList[0];
    list.set(createPrevViewData());
    getSeason(seasonId).then(data => {
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
  private openSeasonList() {
    new RouteManager().set("/seasonList");
    let list: any = this.model.getInstance("seasonList").getValue("list");
    this.model.seasonList.scrolPosition.set(0);
    this.model.seasonList.focusPosition.set(0);
    list.set(createPrevViewData());
    getSeasons(JSON.parse(this.activeItem.seasonListIdJson)).then(data => {
      list.set(data);
    });
  }
  public clearFavorites () {
    this.model.favoritesList.list.set([])
    clearFavorites()
  }
  public deleteFavorites() {
    this.defineActiveItem()
    deleteFavorites(this.activeItem.serialId)
    var list = this.model.favoritesList.list.get()
    let activeItem;
    list.forEach(item => {
      if (item.serialId === this.activeItem.serialId) {
        activeItem = item;
      }
    })
    let index = list.indexOf(activeItem)
    list.splice(index,1)
    this.model.favoritesList.list.set(list)
  }
  protected activeItem;
}
