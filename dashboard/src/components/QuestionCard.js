import { React, Component } from "react";
import {
  getAnswersByRequest,
  getRequestById,
} from "../network/lib/apiRequestFunctions";
import { getUsernameById } from "../network/lib/apiUserFunctions";
import VoteButtons from "./VoteButtons";
import { Link } from "react-router-dom";
import { getArticleById } from "../network/lib/apiArticleFunctions";
import { calcCorrectAnswerId } from "../util/calcFunctions";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
      articleData: [],
      requestId: props.requestId,
      showTitleOnEach: props.reqPage != null ? props.reqPage : false,
      onFocus: props.onFocus != null ? props.onFocus : false,
      whoAsked: "",
      hasAnswer: props && props.hasAnswer ? props.hasAnswer : false,
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
    await getArticleById(this.state.requestData.articleid).then((response) => {
      if (response.data["Error"] == null)
        this.setState({ articleData: response.data["Data"] });
    });
    if (!this.props.hasAnswer)
      await getAnswersByRequest(this.state.requestId).then((response) => {
        if (response.data["Error"] == null)
          this.setState({
            hasAnswer: calcCorrectAnswerId(response.data["Data"]),
          });
      });
  }

  render() {
    const { requestData: request, articleData: article } = this.state;
    if (request == null) return <div></div>;
    var content = request.content;
    var isResolved = this.state.hasAnswer;
    var articleTitle = article.name;
    var articleUrl = article.url;

    return (
      <div className="container-fluid">
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
                    <h4>Article: {articleTitle}</h4>
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
