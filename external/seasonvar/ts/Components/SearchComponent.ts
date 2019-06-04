import BaseComponent from "./BaseComponent";

export default class SearchComponent extends BaseComponent {
    constructor () {
        super()
        this.route = this.model.getInstance('App').getValue('route')
        this.route.subscribe(this)
        let model:any = this.model;
    }
    protected create() {
        let div = document.createElement('div')
        let route = this.route.get()
        if (this.route.get().split('/')[2] !== 'searchManager') {
            return div
        }
        div.className = 'app_home_infoManager'
        div.appendChild(this.createWin())
        return div
    }
    protected createWin() {
        let model:any = this.model

        let div = document.createElement('div');
        let header = document.createElement('div')
        let body = document.createElement('div')
        let app_home_searchManager_search = document.createElement('div');
        let input = document.createElement('input')

        div.className = 'app_home_searchManager_window'
        header.className = 'app_home_searchManager_window_header'
        body.className = 'app_home_searchManager_window_body'
        app_home_searchManager_search.className = 'app_home_searchManager_search'
        input.className = 'app_home_searchManager_search_input';

        header.innerHTML = 'Поиск';
        
        div.appendChild(header)
        div.appendChild(body)
        body.appendChild(app_home_searchManager_search)
        app_home_searchManager_search.appendChild(input)

        return div
    }

    private route
}