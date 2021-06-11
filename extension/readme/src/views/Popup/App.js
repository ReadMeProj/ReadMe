import React from "react";
import "./App.css";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import config from "../../network/config"
import logo from "../../../public/icons/icon_128.png";
import LoginButton from "./login_state";


function App() {
  return (
    <div className="App">
      <a href={`${config[host]}:${config[port]}`} target="_blank">
        <img width={48} height={48} src={logo} /></a>
        <div>
          <LoginButton />
        </div>
    </div>
  );
}

export default App;
