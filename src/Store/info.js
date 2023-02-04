import { makeAutoObservable } from "mobx"

class info {
    _title = ''
    _errorMSG = "Что-то пошло не так"

    constructor() {
        makeAutoObservable(this)
    }
    getTitle() {
        return this._title
    }
    setTitle(text) {
        this._title = text
    }

    getErrorText() {
        return this._errorMSG
    }

    init() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                if (response.ok) {
                    return response.json().then(json => {
                        return this.setTitle(json.title)
                    })
                } else {
                    this.setTitle(this._errorMSG)
                }
            })
    }
}

export default new info()