'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const { parseFromDocument } = require('parse-open-graph');

const result = parseFromDocument();
console.log(result);
if (result && result.og) {
  const ogType = result.og.type;
  if (ogType && ogType === "article") {
    chrome.runtime.sendMessage(
      {
        type: 'ARTICLE',
        payload: {
          message: 'Hi this is from contentscript saying this is',
          ogMetaData: result
        },
      },
      response => {
        console.log(response)
      }
    );
  }
}


// Listen for message

