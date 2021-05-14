import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route
 } from "react-router-dom";
import Header from "./components/Header";
import QRcodePoint from "./components/QRcodePoint";

function App() {

    
  return (
    <Router className="App">
      <Header />
      <Route path="/info/:idBisnesses/:idPoint">
        <QRcodePoint />
      </Route>
    </Router>
  );
}

export default App;
