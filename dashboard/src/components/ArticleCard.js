import React from "react";
import { Media, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArticleCard(params) {
  var articleContent = "";
  var articleTitle = "";
  var articleUrl = "";
  var isReview = false;
  var fakePercent;

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
      articleUrl = "";
    }
  }

  if (isReview) {
    fakePercent = <b>Spondored %:</b>;
  } else {
    fakePercent = <b>Fake %:</b>;
  }
  return (
    <Container fluid="md">
      <Container>
        <Row>
          <Col>
            <a
              href={articleUrl}
              className="cardLink"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="articleBox"
                style={{ width: "550px", height: "150px" }}
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
              </div>
            </a>
          </Col>
          <Col>
            <div
              className="articleBox"
              style={{ width: "350px", height: "150px" }}
            >
              <h6>Should I believe it?</h6>
              <div>
                <p>{fakePercent}</p>
                <Link className="btn btn-info">See more</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ArticleCard;
