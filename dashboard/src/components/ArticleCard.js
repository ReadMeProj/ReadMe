import { React, Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getUserFavorites,
  getArticleById,
} from "../network/lib/apiArticleFunctions";
import { getUserById } from "../network/lib/apiUserFunctions";
class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
      userData: [],
      favoritesData: [],
      articleId: props.articleId,
      //   liked: false,
      //   votes: [0, 0],
      //   relscore: 0,
      //   userVote: 0,
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

    await getUserById().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ userData: response.data["Data"] });
    });

    await getUserFavorites().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ favoritesData: response.data["Data"] });
    });

    // this.state.relscore = this.state.articleData.relscore;
    // this.state.votes = [
    //   this.state.articleData.fakevotes.up,
    //   this.state.articleData.fakevotes.up,
    // ];
  }

  updateLikeButton() {
    alert("Update like button todo.");
  }

  updateVoteButtons() {
    alert("Update vote buttons todo.");
  }

  getHeartButton(isLiked) {
    return (
      <FontAwesomeIcon
        icon={["fas", "heart"]}
        size="lg"
        color={isLiked ? "red" : "gray"}
        onClick={() => {
          this.updateLikeButton();
        }}
        cursor="pointer"
        style={{ marginLeft: "20%" }}
      />
    );
  }

  getVoteButtons(userVote, votes) {
    var voteUp = "none";
    if (userVote) {
      voteUp = userVote;
    }
    return (
      <div className="row">
        <div className="col-1">
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              icon={["fas", "arrow-alt-circle-up"]}
              size="lg"
              color={voteUp === "up" ? "green" : "gray"}
              onClick={() => {}}
              cursor="pointer"
            />
          </div>
          <div className="row d-flex justify-content-center">
            <small>{votes[0]}</small>
          </div>
        </div>
        <div className="col-1">
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              icon={["fas", "arrow-alt-circle-down"]}
              size="lg"
              color={voteUp === "down" ? "red" : "gray"}
              onClick={() => {}}
              cursor="pointer"
            />
          </div>
          <div className="row d-flex justify-content-center">
            <small>{votes[1]}</small>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      articleData: article,
      //   userData: user,
      //   favoritesData: favorites,
    } = this.state;

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
    var userVote = "none";
    var userLiked = false;

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
            <div className="col-1">{this.getHeartButton(userLiked)}</div>
            <div className="col-1">{this.getVoteButtons(userVote, votes)}</div>
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
