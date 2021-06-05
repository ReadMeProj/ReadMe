import React from "react";
import "./App.css";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import logo from "../../../public/icons/icon_128.png";
import LoginButton from "./login_state";
import Insights from "../Insights/insights";
import Report from "../Report/report";

function App() {
  return (
    <div className="App">
      <a href="http://localhost:8080" target="_blank">
        <img width={48} height={48} src={logo} /></a>
        <div>
          <LoginButton />
        </div>
    </div>
  );
}

export default App;
