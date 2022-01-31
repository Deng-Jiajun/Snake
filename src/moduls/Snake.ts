class Snake {

    // 表示蛇的容器
    element: HTMLElement;

    // 表示蛇头的元素
    head: HTMLElement;

    // 表示蛇的身体（包括蛇头）
    bodies: HTMLCollection;

    constructor() {
        this.element=document.getElementById("snake")!;
        this.head = document.querySelector("#snack > div")!;
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
        this.head.style.left = value + "px";

    }
    set Y(value: number) {
        this.head.style.top = value + "px";

    }

    // 蛇变长的方法
    addBody(){
        // 向 element 添加 div（在结束的标签之前）
        this.element.insertAdjacentHTML("beforeend","<div></div>");


    }
}

export default Snake;