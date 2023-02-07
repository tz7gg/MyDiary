import { makeAutoObservable } from "mobx"
import API from "../API/API"

class State {
    _title = ''

    constructor() {
        makeAutoObservable(this)
    }
    getTitle() {
        return this._title
    }
    async getInfo() {
        let data = await API.info()
        if (data.title) {
            this._title = data.title
        } else {
            this._title = data
        }
    }
}

export default new State()