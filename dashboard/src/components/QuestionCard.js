import { React, Component } from "react";
import { getRequestById } from "../network/lib/apiRequestFunctions";
import { getUsernameById } from "../network/lib/apiUserFunctions";
import VoteButtons from "./VoteButtons";
import { Link } from "react-router-dom";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
      requestId: props.requestId,
      showTitleOnEach: props.reqPage != null ? props.reqPage : false,
      onFocus: props.onFocus != null ? props.onFocus : false,
      whoAsked: "",
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
    await getUsernameById(this.state.requestData.requestedby).then(
      (response) => {
        this.setState({ whoAsked: response });
      }
    );
  }

  render() {
    const { requestData: request } = this.state;
    if (request == null) return <div></div>;
    var content = request.content;
    var isResolved = request.answerid;
    var articleTitle = request.articlename;
    var articleUrl = request.articleurl;

    return (
      <div className="container-fluid" style={{ marginLeft: "7%" }}>
        <div className="articleBox" style={{ width: "800px", height: "auto" }}>
          <div className="media">
            <div className="media-body">
              <div>
                {this.state.showTitleOnEach ? (
                  <a
                    href={articleUrl}
                    className="cardLink"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h4>{articleTitle}</h4>
                  </a>
                ) : null}
                <small style={{ color: "gray" }}>
                  Asked by: {this.state.whoAsked}
                </small>
                <p>{content}</p>
                <div
                  className="row"
                  style={{ marginRight: "20px", marginLeft: "20px" }}
                >
                  <div className="col">
                    <VoteButtons id={this.state.requestId} type="request" />
                  </div>
                  {this.state.onFocus ? null : (
                    <div className="col">
                      <Link
                        className="btn btn-info"
                        to={"/focusQuestion?requestId=" + this.state.requestId}
                      >
                        View Answers
                      </Link>
                    </div>
                  )}
                  <div className="column">
                    Status:{" "}
                    {isResolved ? (
                      <b style={{ color: "green" }}>Resolved!</b>
                    ) : (
                      "Open"
                    )}
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
