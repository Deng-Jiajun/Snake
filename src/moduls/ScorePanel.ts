// 定义 ScorePanel 类
class ScorePanel {
    score = 0;
    level = 1;

    // 最高等级
    maxLevel: number;

    // 升级门槛
    upScore: number;

    // 分数和等级对应的元素
    scoreElement: HTMLElement;
    levelElement: HTMLElement;

    // 构造函数，参数后跟默认值
    constructor(maxLevel: number = 10,upScore:number =1) {
        this.scoreElement = document.getElementById("score")!;
        this.levelElement = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分方法
    addScore() {
        this.score++;
        this.scoreElement.innerHTML = this.score + '';

        if (this.score % this.upScore === 0)
            this.levelUp();
    }

    // 设置一个升级方法
    levelUp() {
        if (this.level < this.maxLevel)
            this.levelElement.innerHTML = ++this.level + '';
    }
}

export default ScorePanel;