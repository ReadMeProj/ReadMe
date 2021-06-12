import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Badge } from "react-bootstrap";
import { GrLike, GrDislike } from "react-icons/gr"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { isAuth, userStorage } from "../../chromeHelper";
import { toggleUserLike } from "../../network/lib/user"
import { config } from "../../network/config";


function ArticleCard(params) {
  var articleContent = "";
  var articleTitle = "";
  var articleUrl = "";
  var articleLabels = "";
  var articleID = "";
  var articleFakeVotes = {};
  const [isLiked, setIsLike] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);


  useEffect(() => {
    if (isLiked) {
      // setIsLike(false);
    }
    isAuth.get((res) => { setIsSignedIn(res) })
  })

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
    // Set up article ID.
    if (params.id != null) {
      articleID = params.id;
    } else {
      articleID = "";
    }

    if (params.fakeVotes != null) {
      articleFakeVotes = params.fakeVotes;
    }
    else {
      articleFakeVotes = {}
    }

    if (params.labels != null) {
      articleLabels = params.labels;
    }
    else {
      articleLabels = [];
    }
  }


  const onSeeMore = () => {
    var redirectURL;
    userStorage.get(userCredentials => {
      if (userCredentials) {
        redirectURL = `${config["host"]}:8080/?articleId=${articleID}`;
      }
      else {
        redirectURL = `${config["host"]}:8080`;
      }
      window.open(`${redirectURL}`);
    });
  }

  const toggleLike = () => {
    userStorage.get(userCredentials => {
      if (userCredentials) {
        let tokenAndUserNameJson = {
          'Token': userCredentials.token,
          'UserName': userCredentials.userName
        };
        toggleUserLike(userCredentials.userId, articleID, isLiked, tokenAndUserNameJson).then(
          res => {
            setIsLike(!isLiked);
          }
        );
      }
    })
  }

  function renderLabels() {
    var displayLabels = articleLabels;
    var listItems = displayLabels.map(labelJ =>
       <span key={labelJ.label} className="tag">{labelJ.label}</span>)
    return (
      <div className="articleLabels">
        
        <ul className="labels">
        {listItems}
        </ul>
      </div>)
  }


  return (
    <Container fluid="md">
      <Row>
        <Container className="articleCard">
          <Card bg='light' text='dark' style={{ width: '13rem' }} className="mb-2">
            {/* <Card.Header>Some Meta-data regard the article</Card.Header> */}
            <Card.Body>
              {articleFakeVotes.up} <GrLike /> {articleFakeVotes.down} <GrDislike />
              
            </Card.Body>
            <Card.Text>
            {renderLabels()}
              {/* <Button variant='link' size='sm' onClick={onSeeMore} >See more</Button> */}
            </Card.Text>
            <Card.Text>
            <div className="likeHeart">
                {isSignedIn &&
                  (isLiked ?
                    <AiFillHeart onClick={toggleLike} />
                    : <AiOutlineHeart onClick={toggleLike} />
                  )}
                <span className="likeText">Save to Favorites</span>
              </div>
            </Card.Text>
          </Card>
        </Container>
      </Row>
    </Container>
  )
}

export default ArticleCard;