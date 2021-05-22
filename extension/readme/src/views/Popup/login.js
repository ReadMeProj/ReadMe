import React, { Component } from "react";
import {login} from "../../network/lib/login";
import {userStorage , isAuth} from '../../chromeHelper'
import {Alert} from 'react-bootstrap'
import { Redirect } from "react-router";

//import { login } from "../apiFunctions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", err: '', token: "token" , isSuccess: false};

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
      console.log(res);
      this.setState({token: res.token , err: '', isSuccess:true})
      this.state.token = res.token;
      userStorage.set({userId: res.id , token:res.token , userName: user, password: pass}, ()=> {});
      isAuth.set(true, ()=>{});
    }).catch((err) =>{
      this.setState({err: 'Incorrect Username or Password'})
    })

    //Call api to login with post msg.
    //login(user, pass, this.state.err, this.state.token);
    //alert("The userName submitted: " + this.state.userName);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Login</h2>
        <br></br>
        {this.state.err &&
        <Alert variant='danger'>{this.state.err}</Alert>}
        {this.state.isSuccess &&
        <Redirect to='/'/>}
        <label className="form-label">UserName: </label>
        <input type="text" name="userName" onChange={this.handleChange} />
        <br />
        <br />
        <label className="form-label">Password: </label>
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
