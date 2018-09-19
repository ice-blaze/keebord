const path = require("path");

module.exports = {
	entry: "./imports.js",
	output: {
		filename: "./bundle.js",
		path: path.join(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
					{loader: "sass-loader"},
				],
			},
		],
	},
};
