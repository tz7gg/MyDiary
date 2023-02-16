class API {
  _URL = "http://localhost:5000/";
  _infoURL = "info";
  _todoURL = "todo";
  _userURL = "user"
  _errMSG = "что-то пошло не так";
  async info() {
    return await fetch(`${this._URL}${this._infoURL}`, {})
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this._errMSG;
      });
  }
  async setTodo(date, text, type, progress) {
    const data = {
      date: date,
      text: text,
      type: type,
      progress: progress,
    };
    return await fetch(`${this._URL}${this._todoURL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this._errMSG;
      });
  }
  async getTodos(date) {
    return await fetch(`${this._URL}${this._todoURL}?date=${date}`, {})
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this._errMSG;
      });
  }
  async delTodo(id) {
    return await fetch(`${this._URL}${this._todoURL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this._errMSG;
      });
  }
  async createUser(login, password) {
    const data = {
      login: login,
      password: password
    };
    return await fetch(`${this._URL}${this._userURL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this._errMSG;
      });
  }
}

export default new API();
