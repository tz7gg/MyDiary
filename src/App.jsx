import { observer } from "mobx-react-lite";
import "./App.css";
import AddTodoModal from "./Components/AddTodo/addTodoModal";
import MainScreen from "./Components/MainScreen/MainScreen";
import Spinner from "./Components/Spinner/Spinner";
import State from "./Store/State";

State.getInfo();

const App = observer(() => {
  return (
    <div>
      <MainScreen />
      {State.getSpinner() && <Spinner />}
      {State.getAddTodoModal() && <AddTodoModal />}
    </div>
  );
});

export default App;
