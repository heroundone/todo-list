const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtracrPlugin = require('Mini-css-extract-plugin');
const MiniCssExtractPlugin = require("Mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new MiniCssExtracrPlugin({filename: '[name].[hash].css'})],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [Mini-Css-MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]   
    }
});