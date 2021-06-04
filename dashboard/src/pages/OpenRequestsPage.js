import React, { Component } from "react";
import QuestionCard from "../components/QuestionCard";
import SearchBar from "../components/SearchBar";
import SearchFilterBox from "../components/SearchFilters";
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
        <div>
          <SearchBar />
          <SearchFilterBox />
        </div>
        <dl>
          {requests.map((req) => (
            <dd key={req.id}>
              <QuestionCard requestId={req.id} reqPage={true} />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default OpenRequestsPage;
