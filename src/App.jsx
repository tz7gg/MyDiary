import { observer } from "mobx-react-lite";
import "./App.css"
import MainScreen from "./Components/MainScreen/MainScreen"
import Spinner from "./Components/Spinner/Spinner";
import State from "./Store/State";

State.getInfo()

const App = observer(() => {
  return (
    <div>
      <MainScreen/>
      {State.getSpinner() && <Spinner/>}      
    </div>
  );
})

export default App;
