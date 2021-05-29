import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchFilterBox from "../components/SearchFilters";
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
    if (!requests || requests == {})
      return (
        <div style={{ marginTop: "50px" }}>
          <h2>..You are yet to ask anything!</h2>
        </div>
      );
    return (
      <div>
        <div>
          <SearchBar />
          <SearchFilterBox />
        </div>
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
