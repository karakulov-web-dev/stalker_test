import AppModel from "./AppModel";
import {get_Serials} from "./HTTP"
import createPrevViewData from "./createPrevViewData"
let model:any = new AppModel()

export default class GenreManager {
    constructor () {

    }
    openWindow() {
        model.genreManager.list.set( JSON.parse( JSON.stringify( model.genreManager.list_default.get() ) ) )
        model.genreManager.buttonsList.set( JSON.parse( JSON.stringify( model.genreManager.buttonsList_default.get() ) ) )
        model.genreManager.position.set(10)
        model.App.route.set(model.App.route.get() + "/genreManager")
        model.genreManager.focus.set('list')
    }
    changeFocusRight() {
        model.genreManager.focus.set('buttons')
    }
    changeFocusLeft() {
        model.genreManager.focus.set('list')
    }
    changeFocusTop() {
        let focus = model.genreManager.focus.get()
        if (focus === 'list') {
            this.changeFocusTopList()
        } else if (focus === 'buttons'){
            this.changeFocusTopButtons()   
        }
    }
    changeFocusTopList() {
        let position = model.genreManager.position.get()
        if (position > 0) {
            model.genreManager.position.set(position - 1)
        }
    }
    changeFocusBottom() {
        let focus = model.genreManager.focus.get()
        if (focus === 'list') {
            this.changeFocusBottomList()
        } else if (focus === 'buttons'){
            this.changeFocusBottomButtons()
        }
    }
    changeFocusBottomList() {
        let position = model.genreManager.position.get()
        if (position < model.genreManager.list.get().length - 3) {
            model.genreManager.position.set(position + 1)
        }
    }
    submit() {
        let focus = model.genreManager.focus.get()
        if (focus === 'list') {
            this.submitList()
        } else if (focus === 'buttons'){
            this.submitButtons()   
        }
    }
    submitList() {
        let focusItem = model.genreManager.display()[2]
        let list = model.genreManager.list.get()
        list.forEach(item => {
            if (item.name === focusItem.name) {
                item.active = item.active ? false : true
            }
        })
        model.genreManager.list.set(list)
    }
    submitButtons() {
        let list = model.genreManager.buttonsList.get()
        let i = 0;
        let focusIndex;
        list.forEach(item => {
            if (item.focus) {
                focusIndex = i;
            }
            i++
        })
        let active = list[focusIndex];
        this[active.command]()
    }
    changeFocusButtons(diff) {
        let list = model.genreManager.buttonsList.get()
        let i = 0;
        let focusIndex;
        list.forEach(item => {
            if (item.focus) {
                focusIndex = i;
                item.focus = false
            }
            i++
        })
        if (typeof list[focusIndex + diff] !== 'undefined') {
            list[focusIndex + diff].focus = true;
        } else {
            list[focusIndex].focus = true;
        }
        model.genreManager.buttonsList.set(list)
    }
    changeFocusTopButtons() {
        this.changeFocusButtons(-1)
    }
    changeFocusBottomButtons() {
        this.changeFocusButtons(1)
    }
    back() {
        model.App.route.set('/serialList')
    }
    clear() {
       let list = model.genreManager.list.get()
       list.forEach(item => {
           item.active = false;
       })
       model.genreManager.list.set(list)
    }
    enter() {
        model.searchManager.query.set(false)
        model.genreManager.list_default.set( JSON.parse( JSON.stringify( model.genreManager.list.get() ) ) )
        model.serialList.list.set(createPrevViewData())
        get_Serials({offset: 0}).then(data => {
         model.serialList.list.set(data)
        })
        this.back()
    }
}