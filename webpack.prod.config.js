const { merge } = require('webpack-merge');
const dev = require('./webpack.dev.config');

module.exports = merge(dev, {
    mode: "production"
});