import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getFavoriteArticles, isArticleLiked } from "../apiFunctions";
class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  componentDidMount() {
    getFavoriteArticles(this, "articlesData");
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
                    isLiked={isArticleLiked(article.id, "someUserID")}
                  />
                </dd>
              ))}
        </dl>
      </div>
    );
  }
}

export default FavoritesPage;
