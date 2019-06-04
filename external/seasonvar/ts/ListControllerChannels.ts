import ListController from "./ListController";
import RouteManager from "./RouteManager"
import {getSeason} from "./HTTP"

new RouteManager().set

export default class ListControllerChannels extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openSerial();
  }
  private defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  private openVideoList() {
    this.model.channelSections.scrolPosition.set(0)
    this.model.channelSections.focusPosition.set(0)
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
  private openSerial() {
    if (this.activeItem.length > 1) {
      this.openSeasonList()
    } else {
      this.openSeriesList()
    }
  }
  private openSeriesList() {
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list")
    this.model.seasonList.scrolPosition.set(0)
    this.model.seasonList.focusPosition.set(0)
    
    console.log(this.activeItem)
    getSeason(this.activeItem[0].id).then(data => {
      data.playlist.forEach(item => {
        item.poster = data.poster
      })
      list.set(data.playlist)
    })
    
  }
  private openSeasonList() {
    new RouteManager().set("/seasonList");
    let list: any = this.model.getInstance("seasonList").getValue("list")
    this.model.seasonList.scrolPosition.set(0)
    this.model.seasonList.focusPosition.set(0)
    list.set(this.activeItem)
  }
  private openChannelSections() {
    let list: any = this.model.getInstance("channelSections").getValue("list")
    new RouteManager().set("/channelSection");
    this.model.channelSections.scrolPosition.set(0)
    this.model.channelSections.focusPosition.set(0)

    let allVideos = {
      id:  this.activeItem.id,
      snippet: {
        title: "Все видео",
        type: "allVideos"
      },
      firstPlayList: {
        snippet: {
          thumbnails: {
            medium: {
              url: "./img/allVideos.png"
            }
          }
        }
      }
    }

    getChannelSections(this.activeItem.id).then(data => {
       let itemsArr = 
        data.items.filter(item => {
          if (typeof item.contentDetails !== 'undefined') {
            if (typeof item.contentDetails.playlists !== 'undefined') {
              if (typeof item.contentDetails.playlists[0] !== 'undefined') {
                return item.firstPlayList = item.contentDetails.playlists[0]
              }
            }
          }
        })

        let stringPlayListId = itemsArr.map(item => {
          return item.firstPlayList
        }).join(",")

        getPlaylistsForIdList(stringPlayListId).then(data => {
          let i = 0;
          itemsArr.forEach(item => {
            item.firstPlayList = data.items[i]
            i++;
          })
          itemsArr.unshift(allVideos)
          list.set(itemsArr)
        })

    })
  }
  private activeItem;
}
