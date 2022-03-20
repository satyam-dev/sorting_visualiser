import React from "react";
import "./App.css";
import Visualiser from "./components/visualiser";
function App() {
  return (
    <React.Fragment>
      <a href="upi://pay?pa=satyam.saluja@ybl&pn=Satyam&tn=Message&cu=INR&am=1">PAY NOW</a>
      <Visualiser />
    </React.Fragment>
  );
}

export default App;
