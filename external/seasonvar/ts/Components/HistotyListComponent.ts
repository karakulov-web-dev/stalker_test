import SeasonListComponent from "./SeasonListComponent";

export default class HistotyListComponent extends SeasonListComponent {
    constructor() {
        super("historyList");
      }
    protected createTitle (item) {
        return `${item.seriesName}`
      }
}