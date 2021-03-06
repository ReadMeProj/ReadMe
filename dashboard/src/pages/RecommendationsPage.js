import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getRecommendations } from "../network/lib/apiArticleFunctions";

class RecommendationsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
      refreshScoreFunc: props.refreshScoreFunc,
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
        <h2 className="d-flex justify-content-around">
          Articles recommended for you!
        </h2>
        <br />
        <div className="d-flex justify-content-around">
          <dl>
            {articles == null || articles === {} ? (
              <div>No recommendations found...</div>
            ) : (
              articles.map((article) => (
                <dd key={article}>
                  <ArticleCard
                    articleId={article}
                    refreshScoreFunc={this.state.refreshScoreFunc}
                  />
                </dd>
              ))
            )}
          </dl>
        </div>
      </div>
    );
  }
}

export default RecommendationsPage;
