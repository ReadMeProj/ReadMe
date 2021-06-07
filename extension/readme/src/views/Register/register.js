import React, { Component } from "react";
import { register } from "../../network/lib/register";
import { userStorage, isAuth } from "../../chromeHelper";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router";

//import { login } from "../apiFunctions";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      err: "",
      token: "token",
      isSuccess: false,
      errors:{username:'',password:'',email:'',firstname:'',lastname:''}
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
        errors.firstname = 
          value.length < 1
            ? 'First Name can\'t be empty!'
            : '';
        break;
        case 'lastname': 
        errors.lastname = 
          value.length < 1
            ? 'Last Name can\'t be empty!'
            : '';
        break;
        case 'username': 
        errors.username = 
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

    this.setState({errors, [name]: value});
  }
  

  handleSubmit(event) {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
        console.info('Valid Form')
      }else{
        console.error('Invalid Form');
        return;///how
      }
    let user = this.state.username;
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
      .then((res) => {
        console.log(res);
        this.setState({ token: res.token, err: "", isSuccess: true });
        this.state.token = res.token;
        userStorage.set(
          { userId: res.id, token: res.token, userName: user, password: pass },
          () => {}
        );
        isAuth.set(true, () => {});
      })
      .catch((err) => {
        this.setState({ err: "Registration Failed" });
      });
  }
  render() {
    const {errors} = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="loginBox">
        <h2>Register</h2>
        {this.state.err && <Alert variant="danger">{this.state.err}</Alert>}
        {this.state.isSuccess && <Redirect to="/" />}
        <div className="loginField">
          <label className="form-label">UserName: </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={this.handleChange} noValidate
          />
          {<span className='error'>{errors.username}</span>}
        </div>
        <div className="loginField">
          <label className="form-label">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={this.handleChange} noValidate />
            {errors.password.length > 0 && 
              <span className='error'>{errors.password}</span>}
        </div>
        <div className="loginField">
          <label className="form-label">Email: </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            onChange={this.handleChange} noValidate />
            {errors.email.length > 0 && 
              <span className='error'>{errors.email}</span>}
        </div>
        <div className="loginField">
          <label className="form-label">First Name: </label>
          <input
            type="text"
            name="firstname"
            placeholder="Enter your First name"
            onChange={this.handleChange} noValidate
            />
            {<span className='error'>{errors.firstname}</span>}
        </div>
        <div className="loginField">
          <label className="form-label">Surname: </label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your Surname"
            onChange={this.handleChange} noValidate
            />
            {<span className='error'>{errors.lastname}</span>}
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn-two blue mini"
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

export default Register;
