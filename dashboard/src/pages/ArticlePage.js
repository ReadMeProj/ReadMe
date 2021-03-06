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
      correctAnswerId: "",
      isPremium:
        this.props && this.props.isPremium ? this.props.isPremium : false,
      refreshScoreFunc:
        props.refreshScoreFunc != null ? props.refreshScoreFunc : () => {},
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
    ).then(this.handleCloseModal(this));
    await getRequestsForArticle(this.state.articleData.id).then((response) => {
      if (response.data["Error"] == null) {
        this.setState({ requestsData: response.data["Data"] });
      }
    });
    this.state.refreshScoreFunc();
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
            <h2 className="d-flex justify-content-around">{article.name}</h2>
          </a>
          <br />
          <div className="d-flex justify-content-around">
            <button
              disabled={!this.state.isPremium}
              className="btn btn-info"
              onClick={this.handleOpenModal}
              style={{ width: "250px", height: "60px" }}
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
          </div>

          <br />
          {questions == null || questions === {} ? (
            <div className="d-flex justify-content-around">
              <br />
              No question have been requested yet!
            </div>
          ) : (
            <div className="d-flex justify-content-around">
              <dl>
                {questions.slice(0, 20).map((q) => (
                  <dd key={q.id}>
                    <QuestionCard requestId={q.id} />
                  </dd>
                ))}
              </dl>
            </div>
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
