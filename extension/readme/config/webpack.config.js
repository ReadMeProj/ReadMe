'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PATHS = require('./paths');
const webpack = require('webpack')

var apiHost;
var setupAPI = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      apiHost = "'https://127.0.0.1'";
      break;
    case 'production':
      apiHost = "'http://20.71.92.74'";
      break;
    default:
      apiHost = "'http://127.0.0.1'";
      break;
  }
}

setupAPI();
// Merge webpack configuration files
const config = merge(common, {
  entry: {
    popup: [PATHS.src + '/popup.js',PATHS.src + '/views/Popup/App.js',
            PATHS.src + '/views/Popup/login_state.js',PATHS.src + '/views/Popup/login.js'],
    contentScript: PATHS.src + '/contentScript.js',
    background: PATHS.src + '/background.js',
  }
});


module.exports = config;
