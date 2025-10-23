require('dotenv').config();
const path = require("path");
const printCompilationMessage = require("../compilation.config.js");
const { PORT, PUBLIC_URL } = process.env;

const port = PORT || 8080;

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: PUBLIC_URL || "/",
    filename: '[name].[contenthash].js',
    clean: true
  },
  devServer: {
    port,
    hot: true,
    compress: true,
    liveReload: false,
    historyApiFallback: true,
    watchFiles: ["./src"],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    static: { directory: "./public", watch: false },
    client: { overlay: false, progress: false },
    onListening: (devServer) => {
      const port = devServer.server.address().port;
      printCompilationMessage("compiling", port);
      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          stats.hasErrors() ? printCompilationMessage("failure", port) : printCompilationMessage("success", port);
        });
      });
    },
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    // poll: 500,
  },
};
