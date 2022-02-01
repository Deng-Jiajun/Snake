// 引入要控制的类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";



// 用于控制整个游戏的所有类
class GameControl {
    // 定义三个对象属性
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;

    // 按键的方向（即蛇的移动方向）
    direction: string = "";

    // 存活标识
    isLive = true;



    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.snake = new Snake();

        this.init();
    }

    // 游戏初始化
    init() {
        // 绑定(按键）事件

        // !这个 this 是 document，不是 GameControl
        // document.addEventListener("keydown", this.keydownHandler);

        // bind 将该函数的 「this」 始终绑定为当前类的 this
        document.addEventListener("keydown", this.keydownHandler.bind(this));

        this.run();
    }

    /**
     * ArrowUp
     * ArrowLeft
     * ArrowRight
     * ArrowDown
     */
    // 按键响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log("this is", this);
        console.log(event.key);

        if (event.key === "ArrowUp"
            || event.key === "ArrowDown"
            || event.key === "ArrowLeft"
            || event.key === "ArrowRight") {
            if (this.direction && (
                this.direction === "ArrowUp" && event.key === "ArrowDown"
                || this.direction === "ArrowDown" && event.key === "ArrowUp"
                || this.direction === "ArrowLeft" && event.key === "ArrowRight"
                || this.direction === "ArrowRight" && event.key === "ArrowLeft")) {
                return;
            }
            else {
                this.direction = event.key;
            }
        }
    }

    // console.log("this.direction:", this.direction);


    // 控制蛇移动的方法
    run() {
        console.log("run...");
        /**
         * 根据方向（this.direction）来使蛇的位置改变
         * 「↑」 top↓
         * 「↓」 top↑
         * 「←」 left↓
         * 「→」 left↑
         */

        // 获取蛇（头）目前的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据键入的移动方向，修改 X 或 Y 的值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;

            case "ArrowDown":
            case "Down":
                Y += 10;
                break;

            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;

            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);




        // 修改蛇的坐标
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + "GAME OVER");

            this.isLive = false;
        }



        // 开启一个定时调用（需要绑定 this）(递归调用)
        // 移动速度与等级挂钩
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 检查蛇是否吃到食物(参数为蛇(头)的坐标）
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物改变位置
            this.food.change();

            // 分数牌 SCORE 增加（等级满足特定条件将跟随改变）
            this.scorePanel.addScore();

            // 蛇变长一节
            this.snake.addBody();
        }
    }
}

export default GameControl;
