import React from "react";
import { Media, Container, Row, Col , Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GrLike , GrDislike } from "react-icons/gr"
import { isAuth, userStorage } from "../../chromeHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArticleCard(params) {
  console.log(params);
  var articleContent = "";
  var articleTitle = "";
  var articleUrl = "";
  var articleID = "";
  var articleFakeVotes = {};
  var isReview = false; //TODO- read from params.
  var fakePercent;
  var isLiked = false;
  var heart;

  // Set up parameters.
  if (params != null) {
    // Set up title.
    if (params.title != null) {
      articleTitle = params.title.slice(0, 50);
      if (params.content.length > 50) {
        articleTitle.concat("...");
      }
    } else {
      articleTitle = "Title";
    }
    // Set up content.
    if (params.content != null) {
      articleContent = params.content.slice(0, 115);
      if (params.content.length > 115) {
        articleContent.concat("...");
      }
    } else {
      articleContent = "Content.";
    }
    // Set up url.
    if (params.url != null) {
      articleUrl = params.url;
    } else {
      console.log("Article url is null.");
    }
    // Set up article ID.
    if (params.id != null) {
      articleID = params.id;
    } else {
      console.log("Article id is null.");
    }

    if (params.fakeVotes != null) {
      articleFakeVotes = params.fakeVotes;
    }
    else {
      console.log("Article Fake votes is null");
    }
  }

  if (isReview) {
    fakePercent = <b>Sponsored %:{ }</b>;
  } else {
    fakePercent = <b>Fake %: {articleFakeVotes.upvote}</b>;
  }
  var signedIn;
  isAuth.get(isAuth => {
    signedIn = isAuth;
  })

  userStorage.get(user => {
    if (signedIn && user) {
      if (isLiked) {
        heart = (
          <FontAwesomeIcon
            icon={["fas", "heart"]}
            size="lg"
            color="red"
            onClick={() => toggleArticleLike(articleID, user)}
            cursor="pointer"
          />
        );
      } else {
        heart = (
          <FontAwesomeIcon
            icon={["fas", "heart"]}
            size="lg"
            color="grey"
            onClick={() => toggleArticleLike(articleID, user)}
            cursor="pointer"
          />
        );
      }
    }
  })

  return (
    <Container fluid="md">
      <Container>
        <Card bg='light' text='dark' style={{ width: '13rem' }} className="mb-2">
          <Card.Header>Some Meta-data regard the article</Card.Header>
          <Card.Body>
            {articleFakeVotes.upvote} <GrLike/> {articleFakeVotes.downvote} <GrDislike/>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  )
}

export default ArticleCard;