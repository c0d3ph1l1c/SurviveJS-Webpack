const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const parts = require("./webpack.parts");

const commonConfig = merge([
    {
        entry: {
            main: './src/index.js',
            style: glob.sync("./src/**/*.css"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo",
            }),
        ],
    },
]);

const productionConfig = merge([
    parts.extractCSS({
        use: "css-loader",
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
]);

module.exports = mode => {
    if(mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};