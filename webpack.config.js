const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let exclude = [path.resolve(__dirname, "dist")];

module.exports = {
    entry: './js/index.js',
    mode: "development",
    devtool: "source-map",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        hot: true,

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
		rules: [
			{ test: /\.ts$/, loader: "awesome-typescript-loader", exclude },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude }
		]
	},
};