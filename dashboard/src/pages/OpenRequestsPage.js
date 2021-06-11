import React, { Component } from "react";
import QuestionCard from "../components/QuestionCard";
import { getOpenRequests } from "../network/lib/apiRequestFunctions";

class OpenRequestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { requestsData: [] };
  }

  async componentDidMount() {
    await getOpenRequests().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ requestsData: response.data["Data"] });
    });
  }

  render() {
    const { requestsData: requests } = this.state;
    return (
      <div>
        <br />
        <h2 className="d-flex justify-content-around">
          Requests waiting for your answer:
        </h2>
        <br />
        <div className="d-flex justify-content-around">
          <dl>
            {requests.slice(0, 20).map((req) => (
              <dd key={req.id}>
                <QuestionCard requestId={req.id} reqPage={true} />
              </dd>
            ))}
          </dl>
        </div>
      </div>
    );
  }
}

export default OpenRequestsPage;
