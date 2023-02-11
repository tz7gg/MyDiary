import { makeAutoObservable } from "mobx";
import API from "../API/API";

class State {
    _title = "";
    _currentDate = new Date();
    _selectedDate = this._currentDate;
    _addToodBtnText = "";
    _spinner = true;
    _addTodoModal = false;
    _todoList = [];

    constructor() {
        makeAutoObservable(this);
    }
    getTitle() {
        return this._title;
    }

    getCurrentDate() {
        return this._currentDate;
    }

    getSelectedDate() {
        return this._selectedDate;
    }

    setSelectedDate(date) {
        this._selectedDate = date;
    }

    getAddToodBtnText() {
        return this._addToodBtnText;
    }

    getSpinner() {
        return this._spinner;
    }

    setSpinner(bool) {
        this._spinner = bool;
    }

    getAddTodoModal() {
        return this._addTodoModal;
    }

    setAddTodoModal(bool) {
        this._addTodoModal = bool;
    }

    getTodos() {
        return this._todoList;
    }

    async getInfo() {
        let data = await API.info();
        if (data.title) {
            this._title = data.title;
            this._addToodBtnText = data.addTodoBtnText;
        } else {
            this._title = data;
        }
        this._spinner = false;
    }
    async fetchTodos(date) {
        let todos = await API.getTodos(date);
        this._todoList = todos;
    }
}

export default new State();