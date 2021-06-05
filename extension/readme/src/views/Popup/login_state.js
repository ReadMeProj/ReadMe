import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./login";
import Insights from "../Insights/insights";
import Report from "../Report/report";
import AfterReport from "../Report/after_report"
import Request from "../Request/request";
import AfterRequest from "../Request/after_request"
import { isAuth } from '../../chromeHelper'
import Register from "../Register/register";


class LoginButton extends Component {
  constructor() {
    super();

    this.state = {
      isLogged: false,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    isAuth.get((result) => {
      this.setState({ isLogged: result });
    });
  }

  componentDidUpdate() {
    isAuth.get((result) => {
      this.setState({ isLogged: result });
    });
  }

  login() {
    console.log("login pushed");
    this.setState({ isLogged: true });
    <Route path="/login" component={Login} />;
  }

  logout() {
    this.setState({ isLogged: false });
    isAuth.set(false, () => { console.log("User logged out") });
  }

  render() {
    if (this.state.isLogged === true) {
      return (
        <div >
          <div >
            <button className="btn-two cyan mini" onClick={this.logout}>Logout</button>
            <Router>
              <Link to="/insights">
                <button className="btn-two cyan mini" type="button">Insights</button>
              </Link>
              <Link to="/report">
                <button className="btn-two cyan mini" type="button">Report</button>
              </Link>
              <Link to="/request">
                <button className="btn-two cyan mini" type="button">Request Review</button>
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
                <Route path="/after_report">
                  <AfterReport />
                </Route>
                <Route path="/after_request">
                  <AfterRequest />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>

      );
    } else {
      return (

        <div >
          <div >
            <Router>
            <Link to="/register">
                <button className="btn-two cyan mini" type="button">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn-two cyan mini" type="button">Login</button>
              </Link>
              <Link to="/insights">
                <button className="btn-two cyan mini" type="button">Insights</button>
              </Link>
              <Switch>
              <Route path="/register">
                  <Register />
                </Route>
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
        </div>

      );
    }
  }
}

export default LoginButton;
