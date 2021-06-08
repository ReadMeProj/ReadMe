import React, { Component } from "react";
import { login } from "../network/lib/apiUserFunctions";
import { Link } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", userToken: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let user = this.state.userName;
    let pass = this.state.password;
    const response = await login(user, pass);
    if (response.data.error == null) {
      this.setState({ userToken: response.data });
      // Store the response in localStorage
      window.localStorage.setItem("Token", response.data.Data.token);
      window.localStorage.setItem("Username", this.state.userName);
      window.localStorage.setItem("UserId", response.data.Data.id);
      window.location.href = "/";
    } else if (response.data.error === 401) {
      alert("Password doesn't match");
    } else {
      alert("User doesn't exist, sign up through the ReadMe extension!");
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Login</h2>
        <div className="loginField">
          <label className="form-label">UserName: </label>
          <input
            type="text"
            name="userName"
            onChange={this.handleChange}
            autoFocus
          />
        </div>
        <div className="loginField">
          <label className="form-label">Password: </label>
          <input type="password" name="password" onChange={this.handleChange} />
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className="btn btn-info"
            onSubmit={this.handleSubmit}
          />
          <Link
            className="btn btn-info"
            to={"signUp"}
            style={{ marginLeft: 40 }}
          >
            Sign Up</Link>
        </div>
      </form>
    );
  }
}

export default LoginPage;
