import ListController from "./ListController";
import {getPlaylistItems, HTTPgetVideoDetails, getPlaylistsForIdList, HTTPgetVideo} from "./HTTP"
import RouteManager from "./RouteManager"

export default class ListControllerChannelSections extends ListController {
  public goHome() {
    new RouteManager().set("/home");
  }
    public onEnter() {
      this.defineActiveItem();
      this.defineTypeActiveItem()
      this.openItem()
    }
    private defineActiveItem() {
      let focusPosition = this.focusPosition.get();
      let display = this.display.get()();
      this.activeItem = display[focusPosition];
    }
    private defineTypeActiveItem() {
      this.typeActiveItem = this.activeItem.snippet.type
    }
    private openItem () {
      if (this.typeActiveItem === "singlePlaylist") {
        this.openSinglePlaylist()
      } else if (this.typeActiveItem === "multiplePlaylists") {
        this.openMultiplePlaylists()
      } else if (this.typeActiveItem === "allVideos") {
        this.openVideoList()
      }
    }
    private openVideoList() {
      this.model.video.focusPosition.set(0)
      this.model.video.scrolPosition.set(0)
      let videoList = this.model.getInstance("video").getValue("list");
      let model = this.model
      let nextPageToken = this.model
        .getInstance("video")
        .getValue("nextPageToken");
      let route = this.model.getInstance("App").getValue("route");
      HTTPgetVideo(this.activeItem.id).then(function(data) {
        videoList.set(data.items);
        nextPageToken.set(data.nextPageToken);
        model.video.totalResults.set(data.pageInfo.totalResults);
        new RouteManager().set("/video");
      });
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
      getPlaylistItems(this.activeItem.contentDetails.playlists[0]).then(data => {
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
    private openMultiplePlaylists() {
      this.model.playListsList.focusPosition.set(0)
      this.model.playListsList.scrolPosition.set(0)
      let list: any = this.model.getInstance("playListsList").getValue("list")
      new RouteManager().set("/playListsList");
      let idString = this.activeItem.contentDetails.playlists.map(item => item)

      if (idString.length > 40) {
        idString.length = 50
      }
      idString = idString.join(",")

      getPlaylistsForIdList(idString).then(data => {
        list.set(data.items)
      })
    }
    private typeActiveItem:string
    private activeItem;
  }
  