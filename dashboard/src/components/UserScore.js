import { React, Component } from "react";
import { getUserById, isLoggedIn } from "../network/lib/apiUserFunctions";

class UserScore extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
  }

  async componentDidMount() {
    await getUserById().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ score: response.data["Data"].credit });
    });
  }

  render() {
    if (!isLoggedIn()) {
      return <div></div>;
    }

    return <div className="score">My Score: {this.state.score}</div>;
  }
}

export default UserScore;
