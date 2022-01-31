import "./style/index.less";
import Food from "./moduls/Food";
import ScorePanel from "./moduls/ScorePanel";
import Snake from "./moduls/Snake";

// Food 类测试代码
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);

// ScorePanel 类测试代码
const scorePanel = new ScorePanel(100,3);
// console.log(scorePanel.score);
// scorePanel.addScore();
// console.log(scorePanel.score);

for(let i = 0; i <70;i++) {
    scorePanel.addScore();
}