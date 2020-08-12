/*
 ******************************************************************************
 *	webpack.config.js -- webpack configuration file
 *	Anthony Nardomarino
 *	11-Aug-2020
 ******************************************************************************
 */

const path = require("path");
const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

const webpack = require("webpack");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template: "./client/dist/index.html",
	filename: "./index.html",
	favicon:  "./public/noot-small.png"
});

module.exports = {
	entry: ["@babel/polyfill", entryFile],
	output: {
		path: outputDir,
		publicPath: "/",
		filename: "bundle.js",
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
					},
				],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
	},
	plugins: [htmlWebpackPlugin],
	devServer: {
		historyApiFallback: true,
		contentBase: "./client/dist",
		hot: true,
		proxy: {
			"/api": "http://localhost:3000",
			"/socket.io/*": {
				target: "http://localhost:3000",
				ws: true,
			},
		},
	},
};
