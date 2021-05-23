const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: "./public/assets/js/index.js",
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "production",
  entry: {
    app: "./public/assets/js/index.js",
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: "Budget Tracker App",
      short_name: "Budget Tracker",
      description:
        "A progressive web application for tracking and managing your budget.",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      start_url: "/",
      publicPath: ".",
      icons: [
        {
          src: path.resolve("public/assets/images/icons/icon-512x512.png"),
          sizes: [192, 512],
          ios: true,
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
};

module.exports = config;
