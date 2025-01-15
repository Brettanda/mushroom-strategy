// noinspection JSUnusedGlobalSymbols

import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: "./src/bretts-strategy.ts",
  mode: "production",
  output: {
    filename: "bretts-strategy.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

export default config;
