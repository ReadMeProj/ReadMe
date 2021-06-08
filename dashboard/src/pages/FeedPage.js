import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../network/lib/apiArticleFunctions";
import SearchBar from "../components/SearchBar";
import SearchFilter from "../components/SearchFilters";
class FeedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  async componentDidMount() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("q");
    if (query) {
      await getArticles(query).then((response) =>
        this.setState({ articlesData: response.data["Data"] })
      );
    } else {
      await getArticles().then((response) =>
        this.setState({ articlesData: response.data["Data"] })
      );
    }
  }

  render() {
    if (this.props == null) return;
    const { articlesData: articles } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-around">
          <SearchBar />
        </div>
        <div className="d-flex justify-content-around">
          <SearchFilter />
        </div>
        <div className="d-flex justify-content-around">
          <dl>
            {articles == null
              ? []
              : articles.map((article) => (
                  <dd key={article.id}>
                    <ArticleCard articleId={article.id} />
                  </dd>
                ))}
          </dl>
        </div>
      </div>
    );
  }
}

export default FeedPage;
