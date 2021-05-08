'use strict';
var {getArticleById } = require('./shared/network/apiHelper'); 
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    console.log(`I'm from background , got this from contentScript: ${JSON.stringify(request.payload.ogMetaData)}`);
    console.log(request.payload.ogMetaData);
    getArticleById(articleId).then(response => {
      console.log(`From Background - i got this Data about the article from MongoDB ${response}`);
    });
    // Send a response message
    sendResponse({
      message,
    });
  }
});
