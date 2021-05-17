import React, { Component, useEffect } from "react";
import { useState } from 'react'
import ArticleCard from "./article_card";


const articleStorage = {
  get: cb => {
    chrome.storage.local.get(['currentArticle'], result => {
      cb(result.currentArticle);
    });
  },
  set: (article, cb) => {
    chrome.storage.local.set(
      {
        currentArticle: article,
      },
      () => {
        cb();
      }
    );
  },
};

const Insights = (props) => {
  const [article, setArticle] = useState();

  useEffect(() => {
    articleStorage.get((article) => { console.log(article); setArticle(article) })
  }, [])


  if (article)
    return <div>  <ArticleCard
      title={article.name}
      content={`Written by ${article.author}`}
      url={article.url}
      id={article.id}
      isLiked={true}
      fakeVotes={article.fakevotes}
       //TODO- move to the articleCard and make it a class with state.
    /></div>
  else return <div>loading</div>
}

export default Insights;
