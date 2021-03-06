'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PATHS = require('./paths');
const webpack = require('webpack')

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
