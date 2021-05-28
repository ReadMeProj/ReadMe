import { React, Component } from "react";
import { Link } from "react-router-dom";
import {
  getArticleById,
  addFav,
  removeFav,
} from "../network/lib/apiArticleFunctions";
import VoteButtons from "./VoteButtons";
class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
      userData: [],
      favoritesData: [],
      articleId: props.articleId,
      isOnFavPage: props.isOnFavPage ? props.isOnFavPage : false,
    };
  }

  async componentDidMount() {
    if (this.state.articleId) {
      await getArticleById(this.state.articleId).then((response) => {
        if (response.data["Error"] == null)
          this.setState({ articleData: response.data["Data"] });
      });
    } else {
      console.log("Missing articleId!");
    }
  }

  toggleFav(date) {
    if (this.state.isOnFavPage) removeFav(this.state.articleId);
    else addFav(this.state.articleId, date);
  }

  render() {
    const { articleData: article } = this.state;

    if (article == null) {
      return <div></div>;
    }

    var title = article.name;
    var author = article.author;
    var image =
      article.image !== ""
        ? article.image
        : "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
    var url = article.url;
    var votes = [0, 0];

    if (article.fakevotes)
      votes = [article.fakevotes.up, article.fakevotes.down];

    return (
      <div className="container-fluid" style={{ marginLeft: "7%" }}>
        <div className="articleBox" style={{ width: "800px", height: "auto" }}>
          <a href={url} className="cardLink" target="_blank" rel="noreferrer">
            <div className="media">
              <div className="media-body">
                <b>{title}</b>
                <div>
                  <small style={{ color: "gray" }}>Author: {author}</small>
                </div>
              </div>
              <img
                width={150}
                height={100}
                className="align-self-center mr-3"
                src={image}
                alt="From Article"
              />
            </div>
          </a>
          <div className="row">
            <div className="col-2">
              <VoteButtons id={this.state.articleId} type="article" />
            </div>
            <div className="col-3">
              <button
                className="btn btn-info"
                onClick={() => this.toggleFav(Date.now())}
              >
                {this.state.isOnFavPage ? "Remove" : "Add to Favorites"}
              </button>
            </div>
            <div className="col-3" style={{ marginLeft: "30px" }}>
              <Link
                className="btn btn-info"
                to={"moreInfo?articleId=" + this.state.articleId}
              >
                View Discussion
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
