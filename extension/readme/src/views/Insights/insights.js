import React, { Component, useEffect } from "react";
import { useState } from 'react'
import ArticleCard from "./article_card";
import { Alert, Spinner } from 'react-bootstrap';
import { articleStorage } from '../../chromeHelper'


const Insights = (props) => {
  const [article, setArticle] = useState();

  useEffect(() => {
    articleStorage.get((article) => {setArticle(article) })
  }, [])


  if (article)
    return(
  <div> {article === "noArticle" ?
    <Alert variant='info'> No Article </Alert> :
    <ArticleCard
      title={article.name}
      content={`Written by ${article.author}`}
      url={article.url}
      id={article.id}
      isLiked={true}
      fakeVotes={article.fakevotes}
    //TODO- move to the articleCard and make it a class with state.
    />}
  </div>
    )
  else return <div>
  <Spinner animation="border" role="status">
    <span className="sr-only"></span>
  </Spinner>
</div>
}

export default Insights;
