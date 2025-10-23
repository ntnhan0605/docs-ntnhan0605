require('dotenv').config();
// const { merge } = require("webpack-merge");
// const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: process.env.PUBLIC_URL || "/",
    filename: '[name].[contenthash].js',
    clean: true
  },
  plugins: [new Dotenv({ path: "./.env.staging" })],
};
