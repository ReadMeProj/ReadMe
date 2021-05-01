import React, { Component } from "react";
import UserRequestCard from "../components/UserRequestCard";
class RequestsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    // GET request using fetch with set headers
    const headers = { "Content-Type": "application/json" };
    fetch("https://api.npms.io/v2/search?q=react", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ requests: data.results }));
  }

  render() {
    const { requests: requests } = this.state;

    return (
      <div>
        <dl>
          {requests.map((article) => (
            <dd key={article.package.date}>
              <UserRequestCard
                title={article.package.name}
                id={article.package.date}
                url={article.package.links.npm}
              />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default RequestsPage;
