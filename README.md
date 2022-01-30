# Snake

> TypeScript 小项目 **贪吃蛇**（from https://www.bilibili.com/video/BV1Xy4y1v7S2 ）

## 项目搭建

1. 复制 `./packagesource` 中的三个配置文件
2. 下载相关依赖 `npm i`
3. 创建 `./src/index.html` 和 `./src/index.ts`
4. `npm rum build`，查看是否编译成功

### 配置 CSS

1. 安装 less 相关插件：`npm i -D less less-loader css-loader style-loader`
2. 添加对 less 文件的 rule
   ```JavaScript
      // 对 .less 文件的处理
      {
        test: /\.less$/,
        // less → css → style
        use: ["style-loader", "css-loader", "less-loader"],
      }
   ```
3. 新建 `./src/style/index.less`
   ```less
   body {
     background-color: #bfa;
   }
   ```
4. 在 `index.ts` 中引入
   ```typescript
   import "./style/index.less";
   ```
5. `npm rum build`，查看是否编译成功（背景变绿，编译成功）

### 旧版本 CSS 兼容

1.  安装插件 `npm i -D postcss postcss-loader postcss-preset-env`
2.  在针对 `.less` 文件的 rules 的 `css-loader` 和 `less-loader` 间插入 `post-loader`
    ```javascript
          // 对 .less 文件的处理
      {
        test: /\.less$/,
        // less → css → style
        use: [
          "style-loader",
          "css-loader",
          // 引入 postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ```
3.  index.less 中添加 `flex`
    ```less
    body {
      background-color: #bfa;
      display: flex;
    }
    ```
4.  `npm rum build`，查看是否编译成功
