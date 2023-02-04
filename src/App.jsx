import React, {useEffect } from "react";
import "./App.css"
import MainScreen from "./Components/MainScreen/MainScreen"
import info from "./Store/info";

info.init()

const App = () => {
  return (
    <div>
      <MainScreen/>
    </div>
  );
}

export default App;
