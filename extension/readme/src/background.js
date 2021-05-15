'use strict';
var {getArticle, getArticles, newArticle } = require('../../../shared/network/lib/article'); 
const { login, logout } = require('../../../shared/network/lib/login');
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages


function articleFromOg(ogData){
  let author;
  if(ogData.vr && ogData.vr.author){
    author = ogData.vr.author;
  }
  let date;
  if(ogData.article && (ogData.article.publishedTime || ogData.article.lastModified)){
    date = ogData.article.publishedTime || ogData.article.lastModified;
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


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    const message = `Hi contentScript , got it this is an article`;
    const ogMetaData = request.payload.ogMetaData;
    const articleId = encodeURIComponent(ogMetaData.og.url);
    const currentArticle = articleFromOg(ogMetaData);
    console.log(articleId);
    let articleToPop;
    getArticle(articleId, false).then(res => {
      if(res && res.status === 200 && res.data.id){
        articleToPop = res.data;
      }
      else{
        newArticle(currentArticle).then((res=> {
          if(res.status === 200){
            articleToPop = res.data;
          }
        })) 
      }
    }).catch(err=>{
    }).finally(() =>{
      chrome.storage.sync.set({articleToPop:articleToPop})
      
    })
    
    // Log message coming from the `request` parameter
    console.log(request.payload.message);
  //   login({
  //     "id": "123456abc123456",
  //     "password": "ILikeTurtles123"
  // }).then(res =>{
  //     console.log(res);
  //     if(res.data){
  //       var token = res.data.Data;
  //       console.log(token);
  //       logout({"token": token , "userId": "123456abc123456"}).then(res => {
  //         console.log(res)
  //       }).catch((err => {console.log(err)}));
  //     }
  //   }).catch(err =>{console.log(err)})
  
    console.log(`I'm from background , got this from contentScript: ${JSON.stringify(request.payload.ogMetaData)}`)
    // Send a response message
    
    sendResponse({
      message,
    });

    
    
  }
});
