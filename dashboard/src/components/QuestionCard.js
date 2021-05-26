import { React, Component } from "react";
import { getRequestById } from "../network/lib/apiRequestFunctions";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
      requestId: props.requestId,
    };
  }
  async componentDidMount() {
    if (this.state.requestId) {
      await getRequestById(this.state.requestId).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ requestData: response.data["Data"] });
      });
    } else {
      console.log("Missing requestId!");
    }
  }

  render() {
    const { requestData: request } = this.state;
    if (request == null) return <div></div>;

    var whoAsked = request.requestedby;
    var content = request.content;
    var isResolved = request.answerid;
    //var votes = [request.votes.up, request.votes.down];

    return (
      <div className="container-fluid" style={{ marginLeft: "7%" }}>
        <div className="articleBox" style={{ width: "800px", height: "auto" }}>
          <div className="media">
            <div className="media-body">
              <div>
                <small style={{ color: "gray" }}>Asked by: {whoAsked}</small>
                <p>{content}</p>
                <div>{"Status: " + (isResolved ? "Resolved!" : "Open")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
