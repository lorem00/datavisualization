const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {clientSourcePath} = require('./application.config');
const baseConfig = require('./webpack.config.base');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = Object.assign({}, baseConfig, {
	devtool: 'cheap-module-source-map',
	plugins: baseConfig.plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
        }),
        new FaviconsWebpackPlugin(resolve(clientSourcePath, 'assets/images/favicon.png')),
		new HtmlWebpackPlugin({
			hash: true,
			inject: true,
			template: resolve(clientSourcePath, 'index.html'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		})
	])
});
