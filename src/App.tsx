import React from "react";
import "./App.css";
import { BubbleSort } from "./algorithms/bubbleSort";
import Header from "./components/header";
import Visualiser from "./components/visualiser";
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Visualiser />
      </div>
    </React.Fragment>
  );
}

export default App;
