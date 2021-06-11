import React from "react";
import "./App.css";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../public/icons/icon_128.png";
import LoginButton from "./login_state";
import {config} from '../../network/config.js' 

const homepage =config["host"]+':'+config["dashboard-port"]

function App() {
  return (
    <div className="App">
      <a href={homepage} target="_blank">
        <img width={48} height={48} src={logo} /></a>
        <div>
          <LoginButton />
        </div>
    </div>
  );
}

export default App;
