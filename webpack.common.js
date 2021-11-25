const path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [ {
            test: /\.html$/,
            use: ["html-loader"]
        }
        ]
    },
    plugins: [new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/template.html"
})]
};