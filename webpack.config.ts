import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration, DefinePlugin, ProvidePlugin } from "webpack";
import "webpack-dev-server";

const webpackConfig: Configuration = {
  devServer: {
    compress: true,
    port: 9000,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  performance: {
    maxAssetSize: 512 * 1024 * 2,
    maxEntrypointSize: 512 * 1024 * 2,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
    new ProvidePlugin({
      process: "process/browser",
    }),
    new DefinePlugin({
      "process.env.WS_ENDPOINT": JSON.stringify(
        process.env.NODE_ENV === "production" ? "wss://tic-tac-toe.oneslaught.online:9017" : "ws://localhost:9017",
      ),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default webpackConfig;
