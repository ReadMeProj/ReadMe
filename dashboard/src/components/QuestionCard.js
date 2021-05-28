import { React, Component } from "react";
import { getRequestById } from "../network/lib/apiRequestFunctions";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    var id = request.id;
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
                <div
                  className="row"
                  style={{ marginRight: "20px", marginLeft: "20px" }}
                >
                  <div className="col">
                    <VoteButtons id={id} type="request" />
                  </div>
                  <div className="col">
                    <Link className="btn btn-info" to={""}>
                      Answer
                    </Link>
                  </div>
                  <div className="column">
                    {"Status: " + (isResolved ? "Resolved!" : "Open")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
