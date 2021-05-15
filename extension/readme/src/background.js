'use strict';
var { getArticle, getArticles, newArticle } = require('../../../shared/network/lib/article');
const { login, logout } = require('../../../shared/network/lib/login');
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages


function articleFromOg(ogData) {
  let author;
  if (ogData.vr && ogData.vr.author) {
    author = ogData.vr.author;
  }
  let date;
  if (ogData.article && (ogData.article.publishedTime || ogData.article.modified_time)) {
    date = ogData.article.publishedTime || ogData.article.modified_time;
  }
  return {
    "id": encodeURIComponent(ogData.og.url),
    "name": ogData.og.title,
    "url": ogData.og.url,
    "author": author || "noAuthor",
    "date": date || "noDate",
    "image": ogData.og.image[0],
    "source": ogData.og.site_name
  }
}

const articleStorage = {
  get: cb => {
    chrome.storage.sync.get(['currentArticle'], result => {
      cb(result.currentArticle);
    });
  },
  set: (article, cb) => {
    chrome.storage.sync.set(
      {
        currentArticle: article,
      },
      () => {
        cb();
      }
    );
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    const message = `Hi contentScript , got it this is an article`;
    const ogMetaData = request.payload.ogMetaData;
    const articleId = encodeURIComponent(ogMetaData.og.url);
    const currentArticle = articleFromOg(ogMetaData);
    console.log(articleId);
    let articleToPop;
    getArticle(articleId, false).then(res => {
      if (res && res.status === 200 && res.data.id) {
        articleToPop = res.data;
        console.log("Going to store this in chrome storage");
        console.log(articleToPop.Data);
        articleStorage.set(articleToPop.Data, () => {
        })
      }
      else {
        newArticle(currentArticle).then((res => {
          if (res.status === 200) {
            articleToPop = res.data;
          }
          console.log("Going to store this in chrome storage");
          console.log(articleToPop.Data);
          articleStorage.set(articleToPop.Data, () => {
          })
        }))
      }
    }).then(()=>{
      articleStorage.get((article)=>{
        sendResponse({type: "articleUpdated" , data:article });
      })
    })
  }
  return true;
});
