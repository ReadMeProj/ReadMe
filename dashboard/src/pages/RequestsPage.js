import React, { Component } from "react";
import RequestCard from "../components/RequestCard";
class RequestsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestsData: [],
    };
  }

  componentDidMount() {
    // GET request using fetch with set headers
    const reqheaders = { "Content-Type": "application/json" };
    fetch("https://api.npms.io/v2/search?q=react", {
      headers: reqheaders,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ requestsData: data.results }));
  }

  render() {
    const { requestsData: requests } = this.state;

    return (
      <div>
        <dl>
          {requests.map((article) => (
            <dd key={article.package.date}>
              <RequestCard
                title={article.package.name}
                url={article.package.links.npm}
                id={article.package.date}
              />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default RequestsPage;
