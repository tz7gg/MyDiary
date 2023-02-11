import { observer } from "mobx-react-lite";
import { useState } from "react";
import API from "../../API/API";
import State from "../../Store/State";
import style from "./modal.module.css";

const AddTodoModal = observer(() => {
  const [textarea, setTextArea] = useState("");
  const [type, setType] = useState("Не выбрано");
  const [error, setError] = useState(false);

  const create = async () => {
    if (textarea) {
      State.setSpinner(true);
      await API.setTodo(State.getCurrentDate(), textarea, type, "inProgress");
      await State.fetchTodos();
      State.setSpinner(false);
      State.setAddTodoModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <div className={style.closeWrap}>
          <img
            className={style.closeBtn}
            onClick={() => {
              State.setAddTodoModal(false);
            }}
            src="/images/svg/close.svg"
            alt=""
          />
        </div>
        <p>
          Введите текст: <span>*</span>
        </p>
        <textarea
          type="text"
          rows={3}
          onChange={(e) => setTextArea(e.target.value)}
        />
        <p>Выберите тип:</p>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="Не выбрано">Не выбрано</option>
          <option value="Встреча">Встреча</option>
          <option value="Дела по дому">Дела по дому</option>
        </select>
        {error && (
          <div className={style.error}>Не все обязательные поля заполнены</div>
        )}
        <div className={style.create} onClick={() => create()}>
          Создать
        </div>
      </div>
    </div>
  );
});

export default AddTodoModal;
