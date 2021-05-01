import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";

// TODO - have the server filter the results by getting the query in the url in the request.
const filterData = (data, query) => {
  if (!query) {
    return data;
  }

  return data.filter((article) => {
    const postName = article.name.toLowerCase();
    return postName.includes(query);
  });
};

class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  componentDidMount() {
    // GET request using fetch with set headers
    fetch(window.$name)
      .then((response) => response.json())
      .then((response) => response["Data"])
      .then((response) => this.setState({ articlesData: response }));
  }

  render() {
    if (this.props == null) return;
    const { articlesData: articles } = this.state;
    const filteredPosts = filterData(articles, this.props.query);

    return (
      <div>
        <dl>
          {filteredPosts == null ? [] : filteredPosts.map((article) => (
            <dd key={article.id}>
              <ArticleCard
                title={article.name}
                content={`Written by ${article.author}`}
                url={article.url}
              />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default FeedPage;
