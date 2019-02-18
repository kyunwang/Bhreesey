const path = require('path');
const webpackMerge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ThreeWebpackPlugin = require('@wildpeaks/three-webpack-plugin');

const devConfig = require('./webpack.dev');
// const parts = require('./webpack.parts');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const devMode = process.env.NODE_ENV !== 'production';

/*==========================
=== Base config
===========================*/
const baseConfig = webpackMerge([
	{
		mode: process.env.NODE_ENV || 'development',
		entry: path.resolve(__dirname, '../app/scripts'),
		/*==========================
		=== Plugins
		===========================*/
		plugins: [
			new HTMLWebpackPlugin({
				title: 'THREE base',
				template: path.resolve(__dirname, '../app/index.html'),
			}),
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[hash].css',
				chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
			}),
			new ThreeWebpackPlugin(),
		],
	},
]);

/*==========================
=== Development config
===========================*/
const developmentConfig = webpackMerge([
	devConfig.devServer({
		// Customise host/port here
		host: process.env.HOST,
		port: process.env.PORT,
	}),
]);

module.exports = mode => {
	console.log(mode);

	if (mode === 'production') {
		return webpackMerge(baseConfig, productionConfig, { mode });
	}

	return webpackMerge(baseConfig, developmentConfig, { mode });
};
