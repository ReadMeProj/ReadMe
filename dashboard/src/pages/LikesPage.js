import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import { getUserFavorites } from "../network/lib/apiArticleFunctions";
import SearchBar from "../components/SearchBar";
import SearchFilterBox from "../components/SearchFilters";
class LikesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
    };
  }

  async componentDidMount() {
    await getUserFavorites().then((response) =>
      this.setState({ articlesData: response.data["Data"] })
    );
  }

  render() {
    if (this.props == null) return;
    const { articlesData: articles } = this.state;

    return (
      <div>
        <div>
          <SearchBar />
          <SearchFilterBox />
        </div>
        <dl>
          {articles == null
            ? []
            : articles.map((fav) => (
                <dd key={fav.id}>
                  <ArticleCard articleId={fav.articleid} isOnFavPage={true} />
                </dd>
              ))}
        </dl>
      </div>
    );
  }
}

export default LikesPage;
