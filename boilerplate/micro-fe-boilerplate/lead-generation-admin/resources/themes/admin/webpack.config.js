const path = require("path");
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const { mode } = argv;
  const config = require(`./config/webpack.${mode}.js`);

  return {
    ...config,
    target: "web",
    entry: path.resolve(__dirname, "./src/main.js"),
    resolve: {
      extensions: [".ts", ".js", ".vue", ".json", ".jsx"],
      alias: {
        vue: "vue/dist/vue.runtime.esm.js",
        "@": path.resolve(__dirname, "./src")
      }
    },
    module: {
      rules: [
        { test: /\.vue$/, loader: "vue-loader" },
        {
          test: /\.ts$/,
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] }
        },
        {
          // test: /\.css|.sass|.scss$/,
          test: /\.(css|s[ac]ss)$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            "css-loader",
            "sass-loader",
            "postcss-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext]"
          }
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new ModuleFederationPlugin({
        name: "leadGenerationAdmin",
        remotes: {
          "newLeadGenerationAdmin": process.env.REMOTE_NEW_LEAD_GENERATION_ADMIN,
          "newLeadGenerationStoreRedux": process.env.REMOTE_NEW_LEAD_GENERATION_STORE_REDUX,
        },
        filename: "remoteEntry.js",
        shared: {
          vue: {
            eager: true,
            singleton: true,
            // strictVersion: true,
            requiredVersion: deps.vue
          },
          "vue-router": {
            eager: true,
            singleton: true,
            // strictVersion: true,
            requiredVersion: deps["vue-router"]
          },
          vuex: {
            eager: true,
            singleton: true,
            // strictVersion: true,
            requiredVersion: deps.vuex
          },
        },
        exposes: {}
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        chunks: ["main"],
        templateParameters: {
          BASE_URL: process.env.VUE_APP_BASE_URL
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public/img", to: "img" }
        ]
      }),
      new Dotenv(),
    ],
  }
};
