'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ARTICLE') {
    const message = `Hi contentScript , got it this is an article`;
    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    console.log(`I'm from background , got this from contentScript: ${JSON.stringify(request.payload.ogMetaData)}`)
    // Send a response message
    sendResponse({
      message,
    });
    
  }
});
