import ListController from "./ListController";
import RouteManager from "../RouteManager";
import { getSeasons, get_Serials, getSeason, pushFavorites } from "../HTTP";
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
  protected infiniteScroll() {
    let length = this.model.serialList.list.get().length;
    let scrolPosition = this.model.serialList.scrolPosition.get();
    let dif = length - scrolPosition;
    if (dif < 20) {
      this.addContent();
    }
  }
  protected addContent() {
    if (this.execution) {
      return;
    }
    this.execution = true
    let length = this.model.serialList.list.get().length;
    let currentList = this.model.serialList.list.get();
    get_Serials({ offset: length }).then(data => {
      currentList = currentList.concat(data);
      this.model.serialList.list.set(currentList);
      this.execution = false
    });
  }
  public addFav() {
    let model = this.model;
    let messageText = model.message.text;
    let messageVisible = model.message.visible;
    this.defineActiveItem();
    pushFavorites(this.activeItem.id);
    messageText.set(`Сериал ${this.activeItem.name} добавлен в избранное`)
    messageVisible.set(true)
    hideMessage(messageText,messageVisible);
  }
  private execution:boolean
  protected activeItem;
}

let timeout;
function hideMessage(messageText,messageVisible) {
  let self:any = hideMessage
  if (self.execution) {
    clearTimeout(timeout)
  }
  self.execution = true
  timeout = setTimeout(function () {
    messageText.set(``)
    messageVisible.set(false)
    self.execution = false;
  },
  3000
  )
}