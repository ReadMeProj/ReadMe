import React, { Component } from "react";
import {login} from "../../network/lib/login";
import {userStorage , isAuth} from '../../chromeHelper'
//import { login } from "../apiFunctions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", err: null, token: "token" , loginErrorMessage: ""};

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
    login({username:user, password: pass}).then((res) =>{
      this.state.loginErrorMessage
      console.log(res);
      this.state.token = res.token;
      userStorage.set({userId: res.id , token:res.token , userName: user, password: pass}, null);
      isAuth.set(true, null);
    }).catch((err) =>{
      this.state.loginErrorMessage = "Username or Password are not valid";
    })

    //Call api to login with post msg.
    //login(user, pass, this.state.err, this.state.token);
    //alert("The userName submitted: " + this.state.userName);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Login</h2>
        <br>{this.message}</br>
        <label className="form-label">UserName: </label>
        <input type="text" name="userName" onChange={this.handleChange} />
        <br />
        <br />
        <label className="form-label">password: </label>
        <input type="password" name="password" onChange={this.handleChange} />
        <br />
        <br />
        <input
          type="submit"
          value="Login"
          className="btn btn-info"
          onSubmit={this.handleSubmit}
        />
        <h1>{this.state.token}</h1>
      </form>
    );
  }
}

export default Login;
