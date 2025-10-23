const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const { mode } = argv;
  const config = require(`./config/webpack.${mode}.js`);

  return {
    ...config,
    target: "web",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "newLeadGenerationAdmin",
        filename: "remoteEntry.js",
        remotes: {
          "leadGenerationAdmin": process.env.REACT_APP_REMOTE_LEAD_GENERATION_ADMIN,
          "newLeadGenerationStoreRedux": process.env.REMOTE_NEW_LEAD_GENERATION_STORE_REDUX,
          "newLeadGenerationStoreZustand": process.env.REMOTE_NEW_LEAD_GENERATION_STORE_ZUSTAND,
          "newLeadGenerationStoreRST": process.env.REMOTE_NEW_LEAD_GENERATION_STORE_RST,
        },
        exposes: {
          "./App": "./src/App.tsx",
          "./Header": "./src/components/header/"
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: deps.react,
            // strictVersion: true,
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
            // strictVersion: true,
          },
          tailwindcss: {
            eager: true,
            singleton: true
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv({ path: `.env.${mode}` }),
    ],
  }
};
