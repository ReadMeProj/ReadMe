import "../App.css";
import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";
import {
  getUserFavorites,
  removeFav,
} from "../network/lib/apiArticleFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class LikesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesData: [],
      refreshScoreFunc: props.refreshScoreFunc,
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
        <br />
        <h2>Favorites</h2>
        <br />
        {articles == null || articles === {} ? (
          <div>You are yet to add any article to your favorites!</div>
        ) : (
          <div style={{ marginLeft: "7%" }}>
            {articles.slice(0, 20).map((fav) => (
              <div key={fav.articleid} className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={["fas", "times"]}
                  size="2x"
                  color="red"
                  onClick={async () => {
                    await removeFav(fav.articleid);
                    await getUserFavorites().then((response) =>
                      this.setState({
                        articlesData: response.data["Data"],
                      })
                    );
                  }}
                  cursor="pointer"
                />
                <ArticleCard
                  articleId={fav.articleid}
                  isOnFavPage={true}
                  refreshScoreFunc={this.state.refreshScoreFunc}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default LikesPage;
