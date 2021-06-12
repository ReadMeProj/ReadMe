import "../App.css";
import React, { Component } from "react";
import { getArticleById } from "../network/lib/apiArticleFunctions";
import {
  getRequestsForArticle,
  submitQuestion,
} from "../network/lib/apiRequestFunctions";
import QuestionCard from "../components/QuestionCard";
import Modal from "react-bootstrap/Modal";
import PowerUserIcon from "../assets/PowerUser.png";

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleData: [],
      requestsData: [],
      showModal: false,
      questionInput: "",
      isPremium:
        this.props && this.props.isPremium ? this.props.isPremium : false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  async handleSubmit(event) {
    event.preventDefault();
    let questionContent = this.state.questionInput;
    await submitQuestion(
      this.state.articleData.id,
      questionContent,
      this.state.articleData.name,
      this.state.articleData.url
    );
    await getRequestsForArticle(this.state.articleData.id)
      .then((response) => {
        if (response.data["Error"] == null) {
          this.setState({ requestsData: response.data["Data"] });
        }
      })
      .then(this.handleCloseModal(this));
  }

  async componentDidMount() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let articleID = params.get("articleId"); // Will be null if there is no articleId value in the URL.
    if (articleID) {
      await getArticleById(articleID).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ articleData: response.data["Data"] });
      });
      await getRequestsForArticle(articleID).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ requestsData: response.data["Data"] });
      });
    } else {
      console.log("Missing articleId in url params!");
    }
  }
  render() {
    const { articleData: article, requestsData: questions } = this.state;
    if (article == null) return <div></div>;

    return (
      <div>
        <div>
          <br />
          <a
            href={article.url}
            className="cardLink"
            target="_blank"
            rel="noreferrer"
          >
            <h2>{article.name}</h2>
          </a>
          <br />
          <button
            disabled={!this.state.isPremium}
            className="btn btn-info"
            onClick={this.handleOpenModal}
            style={{ marginLeft: "10%", width: "250px", height: "60px" }}
          >
            Request a question{" "}
            <img
              width={50}
              height={50}
              src={PowerUserIcon}
              alt="logo"
              style={{ alignSelf: "left" }}
            />
          </button>
          <br />
          {questions == null || questions === {} ? (
            <div style={{ marginLeft: "7%" }}>
              <br />
              No question have been requested yet!
            </div>
          ) : (
            <dl>
              {questions.map((q) => (
                <dd key={q.id}>
                  <QuestionCard requestId={q.id} />
                </dd>
              ))}
            </dl>
          )}
        </div>
        <Modal show={this.state.showModal} size="lg">
          <Modal.Header>Request a Question:</Modal.Header>
          <Modal.Body>
            <textarea
              name="questionInput"
              onChange={this.handleChange}
              rows={10}
              cols={70}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-info" onClick={this.handleCloseModal}>
              Close
            </button>
            <button className="btn btn-info" onClick={this.handleSubmit}>
              Request
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ArticlePage;
