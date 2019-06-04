import BaseComponent from "./BaseComponent";

export default class GenreSelectComponent extends BaseComponent {
    constructor () {
        super()
        this.route = this.model.getInstance('App').getValue('route')
        this.route.subscribe(this)
        this.genreList = this.model.getInstance('genreManager').getValue("list")
        this.buttonsList = this.model.getInstance('genreManager').getValue("buttonsList")
        let model:any = this.model;
        model.genreManager.focus.subscribe(this);
        model.genreManager.position.subscribe(this)
        model.genreManager.list.subscribe(this);
        model.genreManager.buttonsList.subscribe(this)
    }
    protected create() {
        let div = document.createElement('div')
        let route = this.route.get()
        if (this.route.get().split('/')[2] !== 'genreManager') {
            return div
        }
        div.className = 'app_home_genreManager'
        div.appendChild(this.createWin())
        return div
    }
    private createWin() {
        let buttonList = this.buttonsList.get()
        let model:any = this.model
        let genreList = model.genreManager.display()
        let div = document.createElement('div');
        let header = document.createElement('div')
        let body = document.createElement('div')
        let list = document.createElement('div')
        let buttonPanel = document.createElement('div')

        div.className = 'app_home_genreManager_window'
        header.className = 'app_home_genreManager_window_header'
        body.className = 'app_home_genreManager_window_body'
        list.className = 'app_home_genreManager_window_list'
        buttonPanel.className = 'app_home_genreManager_window_buttonPanel'

        header.innerHTML = 'Жанры'

        buttonList.forEach(item => {
            buttonPanel.appendChild(
                this.buttons(item)
            )
        })
        
        genreList.forEach(item => {
            list.appendChild(
                this.createGenreElem(item)
            )
        })
        
        div.appendChild(header)
        div.appendChild(body)
        body.appendChild(list)
        body.appendChild(buttonPanel)
        return div
    }
    private createGenreElem(item) {
        let model:any = this.model;
        let div = document.createElement('div')
        div.className = 'app_home_genreManager_window_list_GenreElemWrap';
        if (item.blank) {
            return div
        }
        let p = document.createElement('p')
        let icon = document.createElement('div')
        if (item.focus) {
            if (model.genreManager.focus.get() === 'list') {
                div.className = `${div.className} focus`
            }
        }
        div.appendChild(p)
        div.appendChild(icon)
        icon.className = 'app_home_genreManager_window_list_GenreElemWrap_checkbox_blank'
        if (item.active) {
            icon.className = 'app_home_genreManager_window_list_GenreElemWrap_checkbox_check'
        }
        p.innerHTML = item.name;
        return div
    }
    private buttons(item) {
        let model:any = this.model;
        let div = document.createElement('div')
        let p = document.createElement('p')
        div.className = 'app_home_genreManager_window_buttonPanel_button_wrap'
        if (item.focus) {
            if (model.genreManager.focus.get() === 'buttons') {
                div.className = `${div.className} active`
            }
        }
        div.appendChild(p)
        p.innerHTML = item.name;
        return div
    }
    private route
    private genreList
    private buttonsList
}