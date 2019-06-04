import ListController from "./ListController";
import RouteManager from "../RouteManager";
import { getSeason } from "../HTTP";
import createPrevViewData from "../createPrevViewData";


export default class ListControllerSeasons extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openSeason();
  }
  private defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  private openSeason() {
    this.openSeriesList();
  }
  private openSeriesList() {
    this.model.seriesList.title.set(
      `${this.activeItem.name} (${this.activeItem.season_number} сезон)`
    );
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list");
    this.model.seriesList.scrolPosition.set(0);
    this.model.seriesList.focusPosition.set(0);
    let seasonId = this.activeItem.idSeasonvar;
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
  private activeItem;
}
