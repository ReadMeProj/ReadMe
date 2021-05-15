import React, { Component } from "react";
import {useState} from 'react'
import ArticleCard from "./article_card";

class Insights extends Component {
  constructor(props) {
    super(props);
    const [article, setArticle] = useState(0);

    this.state = {
      article: [],
    };
  }

  componentDidMount() {
    setArticle(chrome.storage.sync.get(currentArticle))
  }

  render() {
    if (this.props == null) return;

    return (
      <div>
        <ArticleCard
          title={article.name}
          content={`Written by ${article.author}`}
          url={article.url}
          id={article.id}
          isLiked={isArticleLiked(article.id, "someUserID")} //TODO- move to the articleCard and make it a class with state.
        />
      </div>
    );
  }
}

export default Insights;
