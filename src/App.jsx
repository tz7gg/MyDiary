import "./App.css"
import MainScreen from "./Components/MainScreen/MainScreen"
import State from "./Store/State";

State.getInfo()

const App = () => {
  return (
    <div>
      <MainScreen/>
    </div>
  );
}

export default App;
