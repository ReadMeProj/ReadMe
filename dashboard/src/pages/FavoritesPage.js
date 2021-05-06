import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";

class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  componentDidMount() {
    // GET request using fetch with set headers
    fetch(window.$name + "/getArticles")
      .then((response) => response.json())
      .then((response) => response["Data"])
      .then((response) => this.setState({ articlesData: response }));
  }

  render() {
    if (this.props == null) return;
    const { articlesData: articles } = this.state;

    return (
      <div>
        <dl>
          {articles == null
            ? []
            : articles.map((article) => (
                <dd key={article.id}>
                  <ArticleCard
                    title={article.name}
                    content={`Written by ${article.author}`}
                    url={article.url}
                    id={article.id}
                  />
                </dd>
              ))}
        </dl>
      </div>
    );
  }
}

export default FavoritesPage;
