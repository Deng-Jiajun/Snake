class Snake {

    // 表示蛇的容器
    element: HTMLElement;

    // 表示蛇头的元素
    head: HTMLElement;

    // 表示蛇的身体（包括蛇头）是一个 HTMLElement 的集合
    bodies: HTMLCollectionOf<HTMLElement>;

    constructor() {

        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div")!;
        this.bodies = this.element.getElementsByTagName("div");
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇的坐标（蛇头坐标）
    set X(value: number) {
        // 若新值和旧值相同，直接返回，不做修改
        if (this.X === value)
            return;

        if (value < 0 || value > 290)
            throw new Error("蛇撞墙了!");

        // 上次向左，现在不能向右；上次向右，现在不能向左（前提：不只一节）
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 水平掉头
            // return;
        }
        else {
            this.moveBody();
            // 身体改完才改头
            this.head.style.left = value + "px";

            // 改完之后判断身体和头有没有相撞
            this.checkHeadBody();
        }

    }
    set Y(value: number) {
        // 若新值和旧值相同不做修改
        if (this.X === value)
            return;

        if (value < 0 || value > 290)
            throw new Error("蛇撞墙了!");

        // 上次向上，现在不能向下；上次向下，现在不能向上（前提：不只一节）
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // return;
            // 垂直掉头
        }
        else {
            this.moveBody();
            this.head.style.top = value + "px";

            // 改完之后判断身体和头有没有相撞
            this.checkHeadBody();
        }
    }

    // 蛇变长的方法
    addBody() {
        // 向 element 添加 div（在结束的标签之前）
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // 蛇身体移动的方法
    moveBody() {
        // 从后往前改 4→3，3→2，2→1，1→

        // 遍历整个 bodies
        for (let i = this.bodies.length - 1; i != 0; i--) {

            // 当前这一节
            let current = this.bodies[i] as HTMLElement;
            // 前一节
            let before = this.bodies[i - 1] as HTMLElement;
            // 获取前一节的位置
            let X = before.offsetLeft;
            let Y = before.offsetTop;

            // 设置为当前这一节的位置
            current.style.left = X + "px";
            current.style.top = Y + "px";

        }
    }
    checkHeadBody() {

        if (this.bodies.length < 5)
            return;
        else {
            // 遍历所右身体，检查是否和蛇头的坐标发生重叠
            for (let i = 1; i < this.bodies.length; i++) {
                if (this.X === this.bodies[i].offsetLeft && this.Y === this.bodies[i].offsetTop)
                    // 蛇头与身体重叠，游戏结束
                    throw new Error("撞到自己了");
            }

        }
    }

}

export default Snake;