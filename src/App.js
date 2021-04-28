import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route
 } from "react-router-dom";
import Header from "./Header";
import QRcodePoint from "./QRcodePoint";

function App() {

    
  return (
    <Router className="App">
      <Header />
      <Route path="/QR-code/:idBisnesses/:idPoint">
        <QRcodePoint />
      </Route>
    </Router>
  );
}

export default App;
