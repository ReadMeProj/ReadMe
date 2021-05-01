import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";

// TODO - have the server filter the results by getting the query in the url in the request.
const filteData = (data, query) => {
  if (!query) {
    return data;
  }

  return data.filter((article) => {
    const postName = article.package.name.toLowerCase();
    return postName.includes(query);
  });
};

class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    // GET request using fetch with set headers
    const headers = { "Content-Type": "application/json" };
    fetch(window.$name, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.results }));
  }

  render() {
    if (this.props == null) return;
    const { articles: articles } = this.state;
    const filteredPosts = filteData(articles, this.props.query);

    return (
      <div>
        <dl>
          {filteredPosts.map((article) => (
            <dd key={article.package.date}>
              <ArticleCard
                title={article.package.name}
                content={article.package.description}
                url={article.package.links.npm}
              />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default FeedPage;
