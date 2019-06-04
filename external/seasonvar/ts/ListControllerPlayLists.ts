import ListController from "./ListController";
import {getPlaylistItems, HTTPgetVideoDetails} from "./HTTP"
import RouteManager from "./RouteManager"

export default class ListControllerChannelSections extends ListController {
  public goHome() {
    new RouteManager().set("/home");
  }
    public onEnter() {
      this.defineActiveItem();
      this.openItem()
    }
    private defineActiveItem() {
      let focusPosition = this.focusPosition.get();
      let display = this.display.get()();
      this.activeItem = display[focusPosition];
    }
    private openItem () {
        this.openSinglePlaylist()
    }
    private openSinglePlaylist () {
      this.model.video.focusPosition.set(0)
      this.model.video.scrolPosition.set(0)
      let videoList = this.model.getInstance("video").getValue("list");
      let model = this.model
      let nextPageToken = this.model
        .getInstance("video")
        .getValue("nextPageToken");
      let route = this.model.getInstance("App").getValue("route");
      getPlaylistItems(this.activeItem.id).then(data => {
        nextPageToken.set(data.nextPageToken);
        videoList.set(data.items);
        model.video.totalResults.set(data.pageInfo.totalResults);
        let idString = data.items.map(item => {
          return item.contentDetails.videoId
        }).join(",")
        HTTPgetVideoDetails(idString).then(data => {
          videoList.set(data.items);
        })
        new RouteManager().set("/video");     
      })
    }
    private activeItem;
  }
  