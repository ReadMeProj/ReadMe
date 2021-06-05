import React, { Component } from "react";
import { register } from "../network/lib/apiUserFunctions";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router";



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      userToken: "token",
      isSuccess: false,
      errors: { userName: '', password: '', email: '', firstName: '', lastName: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'firstname':
        errors.firstName =
          value.length < 1
            ? 'First Name can\'t be empty!'
            : '';
        break;
      case 'lastname':
        errors.lastName =
          value.length < 1
            ? 'Last Name can\'t be empty!'
            : '';
        break;
      case 'username':
        errors.userName =
          value.length < 1
            ? 'Username can\'t be empty!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 6
            ? 'Password must be 6 characters long!'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form');
      return;
    }
    let user = this.state.userName;
    let pass = this.state.password;
    let mail = this.state.email;
    let first = this.state.firstname;
    let last = this.state.lastname;
    register({
      username: user,
      password: pass,
      email: mail,
      firstname: first,
      lastname: last,
    })
    const response = await register({
      username: user,
      password: pass,
      email: mail,
      firstname: first,
      lastname: last,
    });
    if (response.data.error == null) {
      this.setState({ token: response.data.Data.token, err: "", isSuccess: true });
      this.state.token = response.data.Data.token;
      // Store the response in localStorage
      window.localStorage.setItem("Token", response.data.Data.token);
      window.localStorage.setItem("Username", this.state.userName);
      window.localStorage.setItem("UserId", response.data.Data.id);
      window.location.href = "/";
    }
    else {
      this.setState({ err: "Registration Failed" });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Sign Up</h2>
        {this.state.err && <Alert variant="danger">{this.state.err}</Alert>}
        {this.state.isSuccess && <Redirect to="/" />}
        <br />

        <div className="loginField">
          <label className="form-label">User Name: </label>
          <input
            type="text"
            name="userName"
            onChange={this.handleChange}
            placeholder="Enter Username"
            autoFocus
          />
          {<span className='error'>{errors.userName}</span>}
        </div>

        <div className="loginField">
          <label className="form-label">Password: </label>
          <input type="password"
            name="password"
            placeholder="Enter Password"
            onChange={this.handleChange} noValidate />
          {errors.password.length > 0 &&
            <span className='error'>{errors.password}</span>}
        </div>


        <div className="loginField">
          <label className="form-label">Email: </label>
          <input type="text"
            name="email"
            placeholder="Enter Your Email"
            onChange={this.handleChange} noValidate />
          {errors.email.length > 0 &&
            <span className='error'>{errors.email}</span>}
        </div>

        <div className="loginField">
          <label className="form-label">First Name: </label>
          <input type="text"
            name="firstName"
            placeholder="Enter Your First Name"
            onChange={this.handleChange} noValidate />
          {<span className='error'>{errors.firstName}</span>}
        </div>

        <div className="loginField">
          <label className="form-label">Surname: </label>
          <input type="text"
            name="lastName"
            placeholder="Enter Your Surname"
            onChange={this.handleChange} noValidate />
          {<span className='error'>{errors.lastName}</span>}
        </div>
        <label className="form-label"></label>
        <input
          type="submit"
          value="Sign Up"
          className="btn btn-info"
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

export default SignUpPage;
