import AppModel from "./AppModel"

export default class RouteManager {
    static cache:RouteManager
    constructor () {
        if (typeof RouteManager.cache !== 'undefined') {
            return RouteManager.cache
        }
        this.model = new AppModel()
        this.route = this.model.getInstance("App").getValue("route")
        RouteManager.cache = this
    }
    public set(route:string) {
       this.historyArr.push(this.route.get())
       this.route.set(route)
    }
    public back() {
        let backLocation = this.historyArr.pop()
        this.route.set(backLocation)
    }
    public home() {
        this.historyArr = []
        this.route.set("/UpdateLIstPage")
        this.model.serialList.focusPosition.set(0)
        this.model.serialList.scrolPosition.set(0)
    }
    private model:any
    private route
    private historyArr: string[] = []
}