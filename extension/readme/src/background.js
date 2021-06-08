'use strict';
var { getArticle, getArticleTags, newArticle, sort_by_key } = require('./network/lib/article');
const {articleStorage,tagStorage, isAuth, clearStorage} = require('./chromeHelper');
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

clearStorage();
isAuth.set(false , () =>{})
articleStorage.set("noArticle" , ()=>{});


function articleFromOg(ogData) {
  const article = ogData.article;
  const vr = ogData.vr;
  const og = ogData.og;
  let author;
  if ((vr && vr.author)) {
    author = vr.author;
  }
  let date;
  if (article && (article.publishedTime || article.modified_time || article.published_time)) {
    date = article.publishedTime || article.modified_time || article.published_time;
  }
  let image;
  if(og.image[0] && og.image[0].url){
    image = og.image[0].url;
  }
  let labels = [];
  if(article && article.tag ){
    let tags;
    if(og.site_name === "the Guardian"){
      tags = article.tag[0].split(",");
      labels = tags.map(tag => {return {labelname:tag, score:1}});
    }
  }
  return {
    "id": encodeURIComponent(ogData.og.url),
    "name": og.title,
    "url": og.url,
    "author": author || "Anonymous",
    "date": Date.parse(date) || Date.now(),
    "image": image || "",
    "source": og.site_name,
    "labels": labels || []
  }
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    console.log("Got this from contentScript -");
    console.log(request);
    const ogMetaData = request.payload.ogMetaData;
    const articleUrl = ogMetaData.og.url;
    const currentArticle = articleFromOg(ogMetaData);
    let articleToPop;
    let articleTags;
    getArticle(articleUrl, false).then(res => {
      if (res && res.status === 200 && res.data.Data && res.data.Data.id) {
        console.log("Found article in the DB");
        articleToPop = res.data;
        console.log("Going to store this in chrome storage");
        console.log(articleToPop.Data);
        articleStorage.set(articleToPop.Data, () => {
        });
        getArticleTags(res.data.Data).then(tagresult => {
          if (tagresult && tagresult.status === 200){
            console.log("got tags from db");
            let articleRawTags;
            articleRawTags = sort_by_key(tagresult.data.Data,'score');
            articleTags = articleRawTags.slice(0,8);
            console.log("Going to store these tags in chrome storage");
            console.log(articleTags);
            tagStorage.set(articleTags, () => {
          });
            }
          })
      }
      else {
        newArticle(currentArticle).then((res => {
          console.log("Didn't know this article, added it to db");
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
      tagStorage.get((tags)=>{
        sendResponse({type: "tagsUpdated" , data:tags });
      })
    })
  }
  return true;
});
