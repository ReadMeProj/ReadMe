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
      
        <img width={48} height={48} src={logo} />
        <div>
          <LoginButton />
        </div>
    </div>
  );
}

export default App;
