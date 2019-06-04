import SeasonListComponent from "./SeasonListComponent";

export default class UpdateListComponent extends SeasonListComponent {
    constructor() {
        super("updateList");
      }
    protected createTitle (item) {
        return `${item.name} (${item.message})`
      }
}