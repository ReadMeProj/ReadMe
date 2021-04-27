import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">Login:</div>
        <div className="row justify-content-center">
          <button type="submit">Submit new user</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
