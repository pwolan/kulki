// const webpack = require("webpack");
// const tslint = require("tslint-loader");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "./dist/main.js",
  },
  // Turn on sourcemaps
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    loaders: [{ test: /\.ts$/, loader: "ts-loader" }],
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint",
      },
    ],
  },
  tslint: {
    emitErrors: true,
    failOnHint: true,
  },
};
