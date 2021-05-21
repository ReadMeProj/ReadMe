import React from "react";
import { Media, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArticleCard(params) {
  var articleContent = "Conetnt";
  var articleTitle = "Title";
  var articleUrl = "URL";
  var articleID = "ID";
  var isReview = false; //TODO- read from params.
  var fakePercent;
  var isLiked = false;
  var heart;

  // TODO- take img url from params.
  var imageUrl =
    "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";

  // Set up parameters.
  if (params != null) {
    // Set up title.
    if (params.title != null) {
      articleTitle = params.title.slice(0, 50);
      if (params.content.length > 50) {
        articleTitle.concat("...");
      }
    }
    // Set up content.
    if (params.content != null) {
      articleContent = params.content.slice(0, 115);
      if (params.content.length > 115) {
        articleContent.concat("...");
      }
    }
    // Set up url.
    if (params.url != null) {
      articleUrl = params.url;
    }
    // Set up article ID.
    if (params.id != null) {
      articleID = params.id;
    }
    // Set up article ID.
    if (params.isLiked != null) {
      isLiked = params.isliked;
    }

    if (params.image != null) {
      imageUrl = params.image;
    }
  }

  if (isReview) {
    fakePercent = <b>Spondored %:</b>;
  } else {
    fakePercent = <b>Fake %:</b>;
  }

  if (isLiked) {
    heart = (
      <FontAwesomeIcon
        icon={["fas", "heart"]}
        size="lg"
        color="red"
        onClick={() => {}}
        cursor="pointer"
      />
    );
  } else {
    heart = (
      <FontAwesomeIcon
        icon={["fas", "heart"]}
        size="lg"
        color="grey"
        onClick={() => {}}
        cursor="pointer"
      />
    );
  }

  return (
    <Container fluid="md">
      <Container>
        <Row>
          <Col>
            <div
              className="articleBox"
              style={{ width: "550px", height: "auto" }}
            >
              <a
                href={articleUrl}
                className="cardLink"
                target="_blank"
                rel="noreferrer"
              >
                <Media>
                  <Media.Body>
                    <b>{articleTitle}</b>
                    <div>
                      <small style={{ color: "gray" }}>
                        Author: {params.content}
                      </small>
                      <p>{articleContent}</p>
                    </div>
                  </Media.Body>
                  <img
                    width={150}
                    height={100}
                    className="align-self-center mr-3"
                    src={imageUrl}
                    alt="Generic placeholder"
                  />
                </Media>
              </a>
              {heart}
            </div>
          </Col>
          <Col>
            <div
              className="articleBox"
              style={{ width: "350px", height: "150px" }}
            >
              <h6>Should I believe it?</h6>
              <div>
                <p>{fakePercent}</p>
                <Link
                  className="btn btn-info"
                  to={"moreInfo?articleId=" + articleID}
                >
                  See more
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ArticleCard;
