'use strict';
var {getArticle, getArticles, newArticle } = require('../../../shared/network/lib/article'); 
const { login, logout } = require('../../../shared/network/lib/login');
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages


login({
  "id": ""
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    const message = `Hi contentScript , got it this is an article`;
    const ogMetaData = request.payload.ogMetaData;
    const articleId = encodeURIComponent(ogMetaData.og.url);
    console.log(articleId);
    
    
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
