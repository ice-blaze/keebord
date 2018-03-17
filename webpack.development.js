const path = require('path');

module.exports = {
	entry: ["./javascript/main.js"],
	output: {
		filename: "./bundle.js",
		path: path.join(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: [/\.css$/],
				use: ["style-loader", "css-loader"]
			},
		]
	},
};
