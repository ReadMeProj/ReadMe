import React, { Component } from "react";
import { login, getUser } from "../../network/lib/login";
import { userStorage, isAuth, isPrem } from "../../chromeHelper";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      err: "",
      token: "token",
      isSuccess: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = this.state.userName;
    let pass = this.state.password;
    login({ username: user, password: pass })
      .then((res) => {
        console.log(res);
        this.setState({ token: res.token, err: "", isSuccess: true });
        this.state.token = res.token;
        userStorage.set(
          { userId: res.id, token: res.token, userName: user, password: pass },
          () => {}
        );
        isAuth.set(true, () => {});
        getUser(res.id, false).then((userRes) => {
          if (
            userRes &&
            userRes.status === 200 &&
            userRes.data.Data 
          ) {
            console.log("Found user in the DB");
            console.log(userRes);
            if (userRes.data.Data.credit > 500) {
              isPrem.set(true, () => {});
            } else {
              isPrem.set(false, () => {
                console.log("notprem");
              });
            }
          }
        });
      })
      .catch((err) => {
        this.setState({ err: "Incorrect Username or Password" });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Login</h2>
        {this.state.err && <Alert variant="danger">{this.state.err}</Alert>}
        {this.state.isSuccess && <Redirect to="/" />}
        <div className="loginField">
          <label className="form-label">UserName: </label>
          <input
            type="text"
            name="userName"
            placeholder="Enter Username"
            onChange={this.handleChange}
          />
        </div>
        <div className="loginField">
          <label className="form-label">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={this.handleChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn-two blue mini"
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

export default Login;
