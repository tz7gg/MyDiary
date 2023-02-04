import "./App.css"
import MainScreen from "./Components/MainScreen/MainScreen"
import info from "./Store/info";

const App = () => {
  
  info.init()

  return (
    <div>
      <MainScreen/>
    </div>
  );
}

export default App;
