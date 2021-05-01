import React, { Component } from "react";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-start">
          <h2>{"UserName"}'s profile</h2>
          <hr />
          Score: 9000
          <br />
          Requests:
          <br />
          Total sent to me: 20
          <br />
          I answered: 16
          <br />
          Total sent from me: 12
          <br />
          I got answers for: 10
          <br />
        </div>
      </div>
    );
  }
}

export default LoginPage;
