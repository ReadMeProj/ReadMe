import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./login";
import Insights from "../Insights/insights";
import Report from "../Report/report";
import Request from "../Request/request";
import {isAuth} from '../../chromeHelper'


class LoginButton extends Component {
  constructor() {
    super();

    this.state = {
      isLogged: false,
    };
    isAuth.get((result) => {
      this.state.isLogged = result;
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    console.log("login pushed");

    <Route path="/login" component={Login} />;
  }

  logout() {
    this.setState({ isLogged: false });
    isAuth.set(false , () => {console.log("User logged out")});
    
    
    chrome.storage.local.set({ auth: false }, function () {
      console.log("User logged out");
    });
  }

  render() {
    if (this.state.isLogged === true) {
      return (
        <div>
          <h3> Welcome Back </h3>
          <button onClick={this.logout}>Logout</button>
          <Router>
            <Link to="/insights">
              <button type="button">Insights</button>
            </Link>
            <Link to="/report">
              <button type="button">Report</button>
            </Link>
            <Link to="/request">
              <button type="button">Request Review</button>
            </Link>
            <Switch>
              <Route path="/insights">
                <Insights />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
              <Route path="/request">
                <Request />
              </Route>
            </Switch>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Router>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
            <Link to="/insights">
              <button type="button">Insights</button>
            </Link>
            <Link to="/report">
              <button type="button">Report</button>
            </Link>
            <Link to="/request">
              <button type="button">Request Review</button>
            </Link>

            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/insights">
                <Insights />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
              <Route path="/request">
                <Request />
              </Route>
            </Switch>
          </Router>
          {/* </Router><button  onClick={this.login}>
        Login
      </button> */}
        </div>
      );
    }
  }
}

export default LoginButton;
