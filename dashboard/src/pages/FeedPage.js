import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import {
  getArticles,
  getByTag,
  getArticlesByDateInterval,
} from "../network/lib/apiArticleFunctions";
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

  calcThreshold(articles) {
    if (articles == null || articles.length == 0) return 0;

    var upAvg,
      downAvg,
      upSum = 0,
      downSum = 0;

    articles.forEach((element) => {
      upSum += element.fakevotes.up;
      downSum += element.fakevotes.down;
    });
    upAvg = upSum / articles.length;
    downAvg = downSum / articles.length;
    return this.calcRelaibility(upAvg, downAvg, null);
  }

  calcRelaibility(upVotes, downVotes, threshold) {
    var ratio = 0;
    if (upVotes > 0 && downVotes > 0) {
      ratio = upVotes / downVotes;
    } else if (upVotes > 0 && downVotes === 0) {
      ratio = upVotes / 0.9;
    } else if (upVotes == 0 && downVotes > 0) {
      ratio = -1 * (downVotes / 0.9);
    }
    // Check threshold for both directions.
    if (threshold) {
      if (ratio > 0) {
        return ratio >= threshold ? ratio : 0;
      } else {
        return ratio * -1 >= threshold ? ratio : 0;
      }
    } else {
      return ratio;
    }
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
        var threshold = this.calcThreshold(articles);
        if (this.state.showFirst === "real") {
          articlesToMap = articles
            .sort(
              (a, b) =>
                this.calcRelaibility(
                  b.fakevotes.up,
                  b.fakevotes.down,
                  threshold
                ) -
                this.calcRelaibility(
                  a.fakevotes.up,
                  a.fakevotes.down,
                  threshold
                )
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
                this.calcRelaibility(
                  a.fakevotes.up,
                  a.fakevotes.down,
                  threshold
                ) -
                this.calcRelaibility(
                  b.fakevotes.up,
                  b.fakevotes.down,
                  threshold
                )
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
