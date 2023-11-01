import React from "react";
import { TimerBanner } from "./containers";
import { GameBoard } from "./containers";
import "./App.css";

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <TimerBanner />
    </div>
  </div>
);

export default App;
