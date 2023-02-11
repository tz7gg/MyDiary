import { observer } from "mobx-react-lite";
import API from "../../API/API";
import formatedDate from "../../common/formatedDate";
import State from "../../Store/State";
import style from "./style.module.css";

State.fetchTodos(formatedDate(State.getSelectedDate()));

const TodoList = observer(() => {
  let todos = State.getTodos();

  async function deleteTodo(id) {
    State.setSpinner(true);
    formatedDate(formatedDate(State.getSelectedDate()));
    await API.delTodo(id);
    await State.fetchTodos(formatedDate(State.getSelectedDate()));
    State.setSpinner(false);
  }

  todos = todos.map((t) => (
    <div className={style.todoItem} key={t.id}>
      <div className={style.todoItemType}>{t.type}</div>
      <div className={style.todoItemText}>{t.text}</div>
      <div className={style.todoItemDel} onClick={() => deleteTodo(t.id)}>
        <img src="/images/svg/close.svg" alt="" />
      </div>
    </div>
  ));

  return <div className={style.wrap}>{todos}</div>;
});

export default TodoList;
