class API {
	_URL = 'http://localhost:5000/'
	_infoURL = 'info'
    _todoURL = 'todo'
	_errMSG = 'что-то пошло не так'
	async info() {
      	return await fetch(`${this._URL}${this._infoURL}`, {
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
                return json

            })
            .catch(() => {
                return this._errMSG
            });
		}

        async setTodo(date, text, type) {
            const data = {
                date: date,
                text: text,
                type: type
            }
            return await fetch(`${this._URL}${this._todoURL}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    data
                })
            })
            .then(response => response.json())
            .then(json => {
                return json
            })
            .catch(() => {
                return this._errMSG
            });
        }
}

export default new API()