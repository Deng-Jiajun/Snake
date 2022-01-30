# Snake

> TypeScript 小项目 **贪吃蛇**（from https://www.bilibili.com/video/BV1Xy4y1v7S2 ）

## 项目搭建

### 配置基础依赖

1. 复制 `./packagesource` 中的三个配置文件
2. 下载相关依赖 `npm i`
3. 创建 `./src/index.html` 和 `./src/index.ts`
4. `npm rum build`，查看是否编译成功

### 配置 CSS

1. 安装 less 相关插件：`npm i -D less less-loader css-loader style-loader`
2. 添加对 `.less` 文件的 rule
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
5. `npm rum build`，查看是否编译成功
   > 背景变绿，代表编译成功

### 配置 CSS 兼容

1.  安装插件 `npm i -D postcss postcss-loader postcss-preset-env`
2.  在针对 `.less` 文件的 rules 的 `css-loader` 和 `less-loader` 间插入 `post-loader`
    ```JavaScript
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
3.  `index.less` 中添加 `flex`
    ```less
    body {
      background-color: #bfa;
      display: flex;
    }
    ```
4.  `npm rum build`，查看是否编译成功
    > 编译成功后在 `bundle.js` 会出现`-webkit-box;\n display: -ms-flexbox;\n display: flex;` 之类的兼容方案

## 界面设计

1. `index.html`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <title>贪吃蛇</title>
  </head>
  <body>
    <!-- 创建游戏主容器 -->
    <div id="main">
      <!-- 设置游戏舞台 -->
      <div id="stage">
        <!-- 设置蛇 -->
        <div id="snake">
          <!-- snake 内部的 div 表示蛇的各部分    -->
          <div></div>
        </div>

        <!-- 设置食物 -->
        <div id="food">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <!-- 设置积分牌 -->
      <div id="score-panel">
        <div>SCORE:<span id="score">0</span></div>
        <div>LEVEL:<span id="level">1</span></div>
      </div>
    </div>
  </body>
</html>
```

2. `index.less`

```less
// 设置变量
@bg-color: #b7d4a8;

// 清除默认样式
* {
  margin: 0;
  padding: 0;

  // 改变盒子模型的计算方式（width 和 height 直接就是盒子的宽高）
  box-sizing: border-box;
}

body {
  font: bold 20px "Courier";
}

// 设置主窗口样式
#main {
  width: 360px;
  height: 420px;
  background-color: @bg-color;

  // 向下 100px，左右居中
  margin: 100px auto;
  border: 10px solid black;
  border-radius: 40px;

  // 开启弹性盒模型
  display: flex;

  // 设置主轴的对齐方向
  flex-flow: column;

  // 设置辅轴/侧轴的对齐方向
  align-items: center;

  // 设置主轴的对齐方式（空间围绕）
  justify-content: space-around;
}

// 设置舞台样式
#stage {
  width: 304px;
  height: 304px;
  border: 2px solid black;

  // 开启相对定位
  position: relative;

  // 设置蛇的（各部分）样式
  #snake > div {
    width: 10px;
    height: 10px;
    background-color: black;
    border: 1px solid @bg-color;

    // 开启绝对定位
    position: absolute;
  }

  // 设置食物的样式
  #food {
    width: 10px;
    height: 10px;
    position: absolute;
    left: 40px;
    top: 100px;

    // 开启弹性盒
    display: flex;

    // 设置横轴为主轴，自动换行（food 10px，小方块 4px，放不下 3 个，会换行）
    flex-flow: row wrap;

    // 主轴和侧轴的空白空间分配到元素之间
    justify-content: space-between;
    align-content: space-between;
  }
  #food > div {
    width: 4px;
    height: 4px;
    background-color: black;
    border-radius: 1px;
    // 小方块旋转 45 度
    transform: rotate(45deg);
  }
}

// 设置记分牌样式
#score-panel {
  width: 300px;
  display: flex;
  // 设置主轴的对齐方式
  justify-content: space-around;
}
```
