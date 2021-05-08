'use strict';
var {getArticle, getArticles } = require('../../../shared/network/lib/article'); 
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    const message = `Hi contentScript , got it this is an article`;
    const ogMetaData = request.payload.ogMetaData;
    const articleId = ogMetaData.og.url;
    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    getArticle(articleId).then(res =>{
      console.log(res)
    }).catch(err =>{console.log(err)})
    console.log(`I'm from background , got this from contentScript: ${JSON.stringify(request.payload.ogMetaData)}`)
    // Send a response message
    
    sendResponse({
      message,
    });
    
  }
});
