import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles, isArticleLiked } from "../apiFunctions";
class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  componentDidMount() {
    getArticles(this, "articlesData");
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
                    isLiked={isArticleLiked(article.id, "someUserID")} //TODO- move to the articleCard and make it a class with state.
                  />
                </dd>
              ))}
        </dl>
      </div>
    );
  }
}

export default FeedPage;
