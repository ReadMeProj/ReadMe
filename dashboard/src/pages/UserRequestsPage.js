import React, { Component } from "react";
import { getRequestsForUser } from "../network/lib/apiRequestFunctions";
import QuestionCard from "../components/QuestionCard";
class RequestsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestsData: [],
    };
  }

  async componentDidMount() {
    await getRequestsForUser().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ requestsData: response.data["Data"] });
    });
  }

  render() {
    const { requestsData: requests } = this.state;
    if (!requests || requests === {})
      return (
        <div style={{ marginTop: "50px" }}>
          <h2>..You are yet to ask anything!</h2>
        </div>
      );
    return (
      <div>
        <br />
        <h2>Your Requests</h2>
        <br />
        <dl>
          {requests.map((article) => (
            <dd key={article.id}>
              <QuestionCard requestId={article.id} reqPage={true} />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default RequestsPage;
