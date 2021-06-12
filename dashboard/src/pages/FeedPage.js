import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import {
  getArticles,
  getByTag,
  getArticlesByDateInterval,
} from "../network/lib/apiArticleFunctions";
import { calcThreshold, calcRelaibility } from "../util/calcFunctions";
import SearchBar from "../components/SearchBar";
import SearchFilter from "../components/SearchFilters";
class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesData: [],
      tagsData: [],
      showFirst: null,
      refreshFeedFunc: (type) => {
        if (type) {
          this.setState({ showFirst: type });
        }
      },
    };
  }

  async componentDidMount() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("q");
    const tag = new URLSearchParams(search).get("tag");
    const fromDate = new URLSearchParams(search).get("from");
    const toDate = new URLSearchParams(search).get("to");
    if (query) {
      await getArticles(query).then((response) =>
        this.setState({ articlesData: response.data["Data"] })
      );
    } else if (tag) {
      await getByTag(tag).then((response) => {
        if (!response.data["Error"]) {
          this.setState({
            tagsData:
              response.data["Data"] != null ? response.data["Data"] : [],
          });
        }
      });
    } else if (fromDate && toDate) {
      await getArticlesByDateInterval(fromDate, toDate).then((response) =>
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
    const { articlesData: articles, tagsData: tags } = this.state;
    // Set up articles.
    var articlesToMap = [];
    if (articles !== null && this.state.tagsData.length === 0) {
      if (this.state.showFirst) {
        var threshold = calcThreshold(articles);
        if (this.state.showFirst === "real") {
          articlesToMap = articles
            .sort(
              (a, b) =>
                calcRelaibility(b.fakevotes.up, b.fakevotes.down, threshold) -
                calcRelaibility(a.fakevotes.up, a.fakevotes.down, threshold)
            )
            .map((article) => (
              <dd key={article.id}>
                <ArticleCard articleId={article.id} />
              </dd>
            ));
        } else {
          articlesToMap = articles
            .sort(
              (a, b) =>
                calcRelaibility(a.fakevotes.up, a.fakevotes.down, threshold) -
                calcRelaibility(b.fakevotes.up, b.fakevotes.down, threshold)
            )
            .map((article) => (
              <dd key={article.id}>
                <ArticleCard articleId={article.id} />
              </dd>
            ));
        }
      } else {
        articlesToMap = articles.map((article) => (
          <dd key={article.id}>
            <ArticleCard articleId={article.id} />
          </dd>
        ));
      }
    } else if (tags) {
      articlesToMap = tags.slice(0, 20).map((article) => (
        <dd key={article.articleid}>
          <ArticleCard articleId={article.articleid} />
        </dd>
      ));
    }
    return (
      <div>
        <div className="d-flex justify-content-around">
          <SearchBar />
        </div>
        <div className="d-flex justify-content-around">
          <SearchFilter
            refreshFeedFunc={this.state.refreshFeedFunc.bind(this)}
          />
        </div>
        <div className="d-flex justify-content-around">
          <dl>{articlesToMap}</dl>
        </div>
      </div>
    );
  }
}

export default FeedPage;
