import { React, Component } from "react";
import Modal from "react-bootstrap/Modal";
import AnswerCard from "../components/AnswerCard";
import QuestionCard from "../components/QuestionCard";
import {
  getAnswersByRequest,
  submitAnswer,
} from "../network/lib/apiRequestFunctions";
class QuestionPage extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(document.location.search.substring(1));
    let requestID = params.get("requestId"); // Will be null if there is no articleId value in the URL.
    this.state = {
      requestId: requestID,
      answersData: [],
      showModal: false,
      answerInput: "",
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
    let answerContent = this.state.answerInput;
    await submitAnswer(this.state.requestId, answerContent)
      .then(this.handleCloseModal(this))
      .then(
        getAnswersByRequest(this.state.requestId).then((response) => {
          if (response.data["Error"] == null)
            this.setState({ answersData: response.data["Data"] });
        })
      );
  }
  async componentDidMount() {
    await getAnswersByRequest(this.state.requestId).then((response) => {
      if (response.data["Error"] == null)
        this.setState({ answersData: response.data["Data"] });
    });
  }
  render() {
    const { answersData: answers } = this.state;
    return (
      <div>
        <br />
        <QuestionCard
          requestId={this.state.requestId}
          onFocus={true}
          reqPage={true}
        />
        <button
          className="btn btn-info"
          onClick={this.handleOpenModal}
          style={{ marginLeft: "10%", width: "200px" }}
        >
          Add Your Answer
        </button>
        <br />
        <br />
        <div style={{ marginLeft: "100px" }}>
          <h4 style={{ marginLeft: "7%" }}>Answers:</h4>
          {answers == null || answers.length === 0 ? (
            "Be the first to post an answer!"
          ) : (
            <dl>
              {answers == null
                ? []
                : answers.map((ans) => (
                    <dd key={ans.id}>
                      <AnswerCard answerId={ans.id} />
                    </dd>
                  ))}
            </dl>
          )}
        </div>

        <Modal show={this.state.showModal} size="lg">
          <Modal.Header>Post Answer:</Modal.Header>
          <Modal.Body>
            <textarea
              name="answerInput"
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
              Post
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default QuestionPage;
