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

    init() {
        fetch('http://localhost:5000/info', {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
                // method: "POST",
                // body: JSON.stringify({
                //     "addd": "adadada"
                // })
            })
            .then(response => response.json())
            .then(json => {
                this._title = json.title
            })
            .catch((e) => {
                this._title = this._errorMSG
            });
    }
}

export default new info()