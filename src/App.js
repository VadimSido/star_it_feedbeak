import React, {useState} from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route
 } from "react-router-dom";
import Header from "./components/Header";
import QRcodePoint from "./components/QRcodePoint";

function App() {

  const [textFeedbeak, setTextFeedbeak] = useState('');
  const onChangeFeedbeak = (e) => {
      setTextFeedbeak(e.target.value);
  }
    
  return (
    <Router className="App">
      <Header />
      <Route path="/info/:idBusiness/:idPoint">
        <QRcodePoint 
          textFeedbeak={textFeedbeak}
          onChangeFeedbeak={onChangeFeedbeak}
          setTextFeedbeak={setTextFeedbeak}
        />
      </Route>
    </Router>
  );
}

export default App;
