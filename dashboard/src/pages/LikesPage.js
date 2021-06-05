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
        <dl>
          {articles == null || articles === {} ? (
            <div>You are yet to add any article to your favorites!</div>
          ) : (
            articles.map((fav) => (
              <div
                key={fav.id}
                className="container-fluid"
                style={{
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "#eff0f8",
                  borderRadius: "10px",
                  marginTop: "10px",
                  width: "900px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "times"]}
                  size="2x"
                  color="red"
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
                <br />
                <ArticleCard articleId={fav.articleid} isOnFavPage={true} />
              </div>
            ))
          )}
        </dl>
      </div>
    );
  }
}

export default LikesPage;
