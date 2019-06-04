import BaseComponent from "./BaseComponent";

export default class ExitReqComp extends BaseComponent {
    constructor () {
        super()
        this.ExitMenuInstance = this.model.getInstance("ExitMenuInstance")
        this.ExitConfig = this.ExitMenuInstance.getValue("config")
        this.ExitConfig.subscribe(this)
    }
    protected create () {
        let data = this.ExitConfig.get()
        let div = document.createElement("div")
        div.className = "app_ExitReqComp";

        let h1 = document.createElement("h1")
        let list = document.createElement("div")

        div.appendChild(h1)
        div.appendChild(list)

        h1.className = "app_ExitReqComp_h1"
        h1.innerHTML = data.text

        data.list.forEach(item => {
            list.appendChild(
                (function (item):Node {
                    let div = document.createElement("div")
                    div.className = "app_ExitReqComp_item"
                    if (item.active) {
                        div.className = "app_ExitReqComp_item active" 
                    }
                    let p = document.createElement("p")
                    p.innerHTML = item.name
                    div.appendChild(p)
                    return div
                }(item)) 
            )
        })
        return div
    }
    private ExitMenuInstance
    private ExitConfig
}