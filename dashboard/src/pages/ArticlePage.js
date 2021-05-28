import "../App.css";
import React, { Component } from "react";
import { getArticleById } from "../network/lib/apiArticleFunctions";
import { getRequestsForArticle } from "../network/lib/apiRequestFunctions";
import QuestionCard from "../components/QuestionCard";

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleData: [],
      requestsData: [],
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
      await getRequestsForArticle(articleID).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ requestsData: response.data["Data"] });
      });
    } else {
      console.log("Missing articleId in url params!");
    }
  }
  render() {
    const { articleData: article, requestsData: questions } = this.state;
    if (article == null || questions == null) return <div></div>;

    return (
      <div>
        <h2>{article.name}</h2>
        <br />
        <dl>
          {questions.map((q) => (
            <dd key={q.id}>
              <QuestionCard requestId={q.id} />
            </dd>
          ))}
        </dl>
      </div>
    );
  }
}

export default ArticlePage;
