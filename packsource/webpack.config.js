// 引入一个用于拼接路径的包
const path = require("path");

// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");

// 引入 clean 插件
const CleanWebpackPlugin = require("clean-webpack-plugin");

// webpack 中的所有配置信息都应该写在 module.exports 中
module.exports = {
  // 生产模式
  mode: "production",
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    // 清除 output（每次输出前）
    clean: true,
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),

    // 打包后的文件名
    filename: "bundle.js",

    // 要求 webpack 不使用箭头函数
    environment: {
      arrowFunction: false,
    },
  },

  // 指定 webpack 打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // bable 的预配置信息
                  "@babel/preset-env",
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定 core-js 的版本
                    corejs: "3",
                    // 使用 core-js 的方式：usage 表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },
    ],
  },

  // 配置 webpack 插件
  // plugins: [new HTMLWebpackPlugin({title: "Snake"})],
  plugins: [new HTMLWebpackPlugin({ template: "./src/index.html" })],

  resolve: {
    extensions: [".ts", ".js"],
  },
};
