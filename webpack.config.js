const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  entry: './js/index.js',
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './dist/index.html',
      template: './dist/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};