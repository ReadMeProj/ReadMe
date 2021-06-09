import React, { Component, useEffect } from "react";
import { useState } from 'react'
import ArticleCard from "./article_card";
import { Alert, Spinner } from 'react-bootstrap';
import { articleStorage,tagStorage } from '../../chromeHelper'


const Insights = (props) => {
  const [article, setArticle] = useState();
  const [labels, setLabels] = useState();

  useEffect(() => {
    articleStorage.get((article) => {setArticle(article) })
    tagStorage.get((labels) => {setLabels(labels) })

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
      labels={labels}
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
