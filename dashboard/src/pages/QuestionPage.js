import { React, Component } from "react";
import Modal from "react-bootstrap/Modal";
//import AnswerCard from "../components/AnswerCard";
import QuestionCard from "../components/QuestionCard";
import { submitAnswer } from "../network/lib/apiRequestFunctions";
class QuestionPage extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(document.location.search.substring(1));
    let requestID = params.get("requestId"); // Will be null if there is no articleId value in the URL.
    this.state = {
      requestId: requestID,
      //requestId: "099bd379451a03d796eb853330cf7a2a4bfd788a",
      articleId: "a6cbba36-e5c8-4821-bdc4-989dc453cab7",
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
    await submitAnswer(
      this.state.requestId,
      this.state.articleId,
      answerContent
    ).then(this.handleCloseModal(this));
  }
  async componentDidMount() {
    //todo - get answersData by requestid.
  }
  render() {
    const { answersData: answers } = this.state;
    return (
      <div>
        <QuestionCard requestId={this.state.requestId} onFocus={true} />
        <button className="btn btn-info" onClick={this.handleOpenModal}>
          Answer
        </button>
        <div style={{ marginLeft: "200px" }}>
          {answers == null || answers.length == 0 ? (
            "Be the first to post an answer!"
          ) : (
            <dl>
              {answers == null
                ? []
                : answers.map((ans) => (
                    <dd key={ans.id}>
                      {/* <AnswerCard id={ans.id} whoWrote="" content="" /> */}
                      {ans.id}
                    </dd>
                  ))}
            </dl>
          )}
        </div>

        <Modal show={this.state.showModal}>
          <Modal.Header>Post Answer:</Modal.Header>
          <Modal.Body>
            <input
              className="answerAsk"
              type="text"
              name="answerInput"
              onChange={this.handleChange}
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
