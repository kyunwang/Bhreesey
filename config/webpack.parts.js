const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.loadCss = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
});
