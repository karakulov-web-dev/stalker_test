import BaseComponent from "./BaseComponent";

export default class InfoComponent extends BaseComponent {
    constructor () {
        super()
        this.route = this.model.getInstance('App').getValue('route')
        this.route.subscribe(this)
        let model:any = this.model;
    }
    protected create() {
        let div = document.createElement('div')
        let route = this.route.get()
        if (this.route.get().split('/')[2] !== 'infoManager') {
            return div
        }
        div.className = 'app_home_infoManager'
        div.appendChild(this.createWin())
        return div
    }
    protected createWin() {
        let model:any = this.model

        let route = model.App.route.get();
        let activeSerial;
        if (route === "/UpdateLIstPage/infoManager") {
            activeSerial = model.updateList.display.get()()[model.updateList.focusPosition.get()]
        } else if (route === "/serialList/infoManager") {
            activeSerial = model.serialList.display.get()()[model.serialList.focusPosition.get()]
        }

        let genreModify = activeSerial.genreString.split(',').join(', ')

        let div = document.createElement('div');
        let header = document.createElement('div')
        let body = document.createElement('div')
        let box1 = document.createElement("div")
        let box2 = document.createElement("div")
        let infoBox = document.createElement('div')
        let name = document.createElement('div');
        let country = document.createElement('div')
        let year = document.createElement('div')
        let genre = document.createElement('div')
        let kinopoisk = document.createElement('div')
        let imdb = document.createElement('div')
        let img = document.createElement('img')
        let description = document.createElement('div')

        div.className = 'app_home_infoManager_window'
        header.className = 'app_home_infoManager_window_header'
        body.className = 'app_home_infoManager_window_body'
        box1.className = 'app_home_infoManager_window_body_box1'
        infoBox.className = "app_home_infoManager_window_body_box1_infoBox"
        img.className = "app_home_infoManager_window_body_box1_img"
        img.src = activeSerial.poster;
        description.className = 'app_home_infoManager_window_body_box2_description'
        header.innerHTML = 'Инфо'
        name.innerHTML = `<span>Название:</span> ${activeSerial.name}`
        country.innerHTML = `<span>Страна:</span> ${activeSerial.countryString}`
        year.innerHTML = `<span>Год:</span> ${activeSerial.year}`
        genre.innerHTML = `<span>Жанры:</span> ${genreModify}`
        kinopoisk.innerHTML = `<span>Рейтинг кинопоиск:</span> ${activeSerial.kinopoisk}`
        imdb.innerHTML = `<span>Рейтинг imdb:</span> ${activeSerial.imdb}`
        description.innerHTML = activeSerial.description

        div.appendChild(header)
        div.appendChild(body)
        body.appendChild(box1)
        body.appendChild(box2)
        box1.appendChild(infoBox)
        box1.appendChild(img)
        infoBox.appendChild(name)
        infoBox.appendChild(country)
        infoBox.appendChild(year)
        infoBox.appendChild(genre)
        infoBox.appendChild(kinopoisk)
        infoBox.appendChild(imdb)
        box2.appendChild(description)
        return div
    }

    private route
}