import { React, Component } from "react";
import {
  getAnswerById,
  getRequestById,
} from "../network/lib/apiRequestFunctions";
import { getUsernameById } from "../network/lib/apiUserFunctions";
import VoteButtons from "./VoteButtons";

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerData: [],
      answerId: props.answerId,
      isCorrect: false,
      whoAnswered: "",
      correctAnswerId: props.correctAnswerId,
    };
  }
  async componentDidMount() {
    if (this.state.answerId) {
      await getAnswerById(this.state.answerId).then((response) => {
        if (response.data["Error"] == null) {
          this.setState({
            answerData: response.data["Data"],
          });
        } else {
          console.log("Error getting answer data by id.");
        }
      });
    }
    await getUsernameById(this.state.answerData.userid).then((response) => {
      this.setState({ whoAnswered: response });
    });
  }
  render() {
    const { answerData: answer } = this.state;
    if (answer == null) return <div></div>;

    var content = answer.content;

    return (
      <div className="container-fluid" style={{ marginLeft: "7%" }}>
        <div
          className="articleBox"
          style={{
            width: "800px",
            height: "auto",
            backgroundColor:
              this.state.correctAnswerId === answer.id ? "#E3FFDE" : "white",
          }}
        >
          <div className="media">
            <div className="media-body">
              <small style={{ color: "gray" }}>
                Posted by: {this.state.whoAnswered}
              </small>
              <p>{content}</p>
              <div
                className="row"
                style={{ marginRight: "20px", marginLeft: "20px" }}
              >
                <div className="col">
                  <VoteButtons id={this.state.answerId} type="answer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerCard;
