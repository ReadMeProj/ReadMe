import React from "react";
import { Media, Container, Row, Col } from "react-bootstrap";
import picture from "../testPicture.jpg";

function ArticleCard(params) {
  var articleContent = "";
  var articleTitle = "";

  if (params != null && params.content != null) {
    articleContent = params.content.slice(0, 115).concat("...");
  } else {
    articleContent = "Content";
  }

  if (params != null && params.title != null) {
    if (params.title.length > 50) {
      articleTitle = params.title.slice(0, 50).concat("...");
    } else {
      articleTitle = params.title;
    }
  } else {
    articleTitle = "Title";
  }

  return (
    <Container fluid="md">
      <Container>
        <Row>
          <Col>
            <a href={params.url} className="cardLink" target="_blank">
              <div
                className="articleBox"
                style={{ width: "600px", height: "150px" }}
              >
                <Media>
                  <Media.Body>
                    <h5>{articleTitle}</h5>
                    <div>
                      <p>{articleContent}</p>
                    </div>
                  </Media.Body>
                  <img
                    width={150}
                    height={100}
                    className="align-self-center mr-3"
                    src={picture}
                    alt="Generic placeholder"
                  />
                </Media>
              </div>
            </a>
          </Col>
          <Col>
            <div
              className="articleBox"
              style={{ width: "300px", height: "150px" }}
            >
              basic stats about the article
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ArticleCard;
