import React from "react";
import "./App.css";
import { BubbleSort } from "./algorithms/bubbleSort";
function App() {
  const arr = [10, 89, 900, 43, 3, 9, 7];
  let sorted = new BubbleSort(arr);
  sorted.bubbleSort();
  console.log("Sorted: ", arr);
  return <div className="App">Everything works!!!</div>;
}

export default App;
