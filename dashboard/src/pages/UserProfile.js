import React, { Component } from "react";
import { getUserById } from "../network/lib/apiUserFunctions";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
    };
  }
;

  async componentDidMount() {
    await getUserById().then((response) =>
      this.setState({ userData: response.data["Data"] })
    );
  }

  render() {
    if (this.props == null) return;
    const { userData: user } = this.state;

    return (
      <div className="container-fluid" style={{ marginLeft: "50px", marginTop: "50px" }}>
        <div className="userProfile" style={{ width: "800px", height: "800px" }}>
          {
            user == null 
            ? {}
            : 
            <div className="row justify-content-start" style={{ margetLeft: "45px"}}>
            <h2>Hello {user.firstname} {user.lastname}</h2>
            <hr />
            Username: {user.username}
            <br />
            Credit: {user.credit}
            <br />
            Email: {user.email}
            <br />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ProfilePage;
