import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getRecommendations } from "../network/lib/apiArticleFunctions";

class RecommendationsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  async componentDidMount() {
    await getRecommendations()
      .then((response) => response.data.data)
      .then((data) => this.setState({ articlesData: data }));
  }

  render() {
    if (this.props == null) return;
    const { articlesData: articles } = this.state;

    return (
      <div>
        <br />
        <h2>Articles recommended for you!</h2>
        <br />
        <dl>
          {articles == null || articles === {} ? (
            <div>No recommendations found...</div>
          ) : (
            articles.map((article) => (
              <dd key={article}>
                <ArticleCard articleId={article} />
              </dd>
            ))
          )}
        </dl>
      </div>
    );
  }
}

export default RecommendationsPage;
