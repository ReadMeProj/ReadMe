import React from "react";
import { Media, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArticleCard(params) {
  var articleContent = "";
  var articleTitle = "";
  var articleUrl = "";
  var articleID = "";
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
  }

  if (isReview) {
    fakePercent = <b>Sponsored %:</b>;
  } else {
    fakePercent = <b>Fake %:</b>;
  }

  return (
    <Container fluid="md">
      <Container>
        <div className="articleBox" style={{ width: "200px", height: "150px" }}>
          <h6>Should I believe it?</h6>
          <div>
            <p>{fakePercent}</p>
            <Link className="btn btn-info">See more</Link>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default ArticleCard;
