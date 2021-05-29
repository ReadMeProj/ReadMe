import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import {
  getUserFavorites,
  removeFav,
} from "../network/lib/apiArticleFunctions";
import SearchBar from "../components/SearchBar";
import SearchFilterBox from "../components/SearchFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                <div key={fav.id} className="container-fluid">
                  <FontAwesomeIcon
                    icon={["fas", "times"]}
                    size="2x"
                    color="red"
                    style={{ position: "fixed", marginTop: "5%" }}
                    onClick={async () => {
                      await removeFav(fav.articleid).then((response) => {
                        if (response.data["Error"] == null)
                          getUserFavorites().then((response) =>
                            this.setState({
                              articlesData: response.data["Data"],
                            })
                          );
                      });
                    }}
                    cursor="pointer"
                  />
                  <ArticleCard articleId={fav.articleid} isOnFavPage={true} />
                </div>
              ))}
        </dl>
      </div>
    );
  }
}

export default LikesPage;
