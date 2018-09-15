const path = require("path");

module.exports = {
	entry: "./test/test_base.js",
	output: {
		filename: "./bundle.js",
		path: path.join(__dirname, "build_test"),
	},
};
