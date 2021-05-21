import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticleById } from "../network/lib/apiArticleFunctions";

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleData: null,
      title: "Title",
      summery: "summery",
      url: "",
      upvotes: 0,
      downvotes: 0,
      topic: "none",
    };
  }
  async componentDidMount() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let articleID = params.get("articleId"); // Will be null if there is no articleId value in the URL.
    if (articleID) {
      await getArticleById(articleID).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ articleData: response.data["Data"] });
      });
    }
  }
  render() {
    return <ArticleCard />;
  }
}

export default ArticlePage;
