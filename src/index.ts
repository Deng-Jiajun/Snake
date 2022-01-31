import "./style/index.less";

// 定义类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // 「!」说明该对象一定存在，不需要再检查
        // 获取页面中的 food 元素并将其赋值给 element
        this.element = document.getElementById("food")!;
    }

    // 定义获取食物 X 轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    // 定义获取食物 Y 轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }

    change() {
        /**
         * 生成随机的位置 
         * 范围 [0, 290] (舞台范围 [0,300]，food 10px)
         * 以 10 为单位（food 10px，蛇移动一格 10px)
         */

        /**
         * Math.random() 生成 (0,1) 的随机数
         * Math.round() 四舍五入，使生成的随机数为整数：0,1,2,…,29
         * 再将结果 *10，则结果为：0,10,20,…,290
         */
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

// 测试代码
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);