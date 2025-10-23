const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

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
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
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
        name: "newLeadGenerationStoreRST",
        filename: "remoteEntry.js",
        exposes: {
          "./cache": "./src/cache/index.ts",
          "./middlewares": './src/stores/middlewares/index.ts',
          "./withProfileManagementPersist": "./src/stores/ProfileManagement/withProfileManagement.tsx",
          "./profileManagementStore": "./src/stores/ProfileManagement/index.tsx"
        },
        shared: {
          "react": {
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
          "react-sweet-state": {
            eager: true,
            singleton: true,
            requiredVersion: deps["react-sweet-state"],
            // strictVersion: true,
          },
          "localforage": {
            eager: true,
            singleton: true,
            strictVersion: true,
          }
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
    ],
  }
};
