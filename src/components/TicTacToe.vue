<template>
  <div>
    <div id="btn">
      <h1>{{ title }}</h1>
      <button @click="changeTitle">Change Title</button>
    </div>
  </div>
  <div id="btn2">
    <button @click="changeStyle" style="margin: 10px"> Change Style</button>
    <div class="container">
      <!-- 游戏面板（棋盘） -->
      <div
        id="bord"
        class="game-board x"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
      </div>
      <!-- 游戏获胜信息面板 -->
      <div id="message" class="game-message">
        <p id="winner">X 赢了！</p>
        <button id="restart">重新开始</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from "vue";
defineProps({title: String, fontSize: Number})

</script>



<style>


p {
  margin: 0;
}

body {
  background-color: #f9f2e7;
}

#btn {
  text-align: center;
  /* margin: 10px; */
}

#btn2 {
  text-align: center;
  margin: 10px;
}

/* 标题 */
h1 {
  text-align: center;
  font-size: 40px;
  color: #477998;
}

/* 游戏内容容器 */
.container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

/* 游戏面板棋盘 */
.game-board {
  width: 300px;
  height: 300px;
  font-size: 60px;
}

.game-board.x .cell:not(.x):not(.o):hover::before {
  content: "X";
  color: lightgray;
}

.game-board.o .cell:not(.x):not(.o):hover::before {
  content: "O";
  color: lightgray;
}

/* 棋盘 - 行 */
.row {
  display: flex;
}

.row:last-child .cell {
  border-bottom: 0;
}

/* 棋盘 - 单元格 */
.cell {
  flex: 1;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-right: 6px solid #546363;
  border-bottom: 6px solid #546363;
  text-align: center;
  cursor: pointer;
  /* font-size: 60px; */
  font-family: "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
}

.cell:last-child {
  border-right: 0;
}

/* 游戏获胜信息面板 */
.game-message {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(69, 133, 136, 0.4);
  text-align: center;
}

/* winner 获胜者 */
.game-message p {
  margin: 120px 0 40px 0;
  color: #fff;
  font-size: 30px;
}

/* 重新开始游戏按钮 */
.game-message button {
  color: #517304;
  border-color: #517304;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
}

/* x 玩家 */
.cell.x::before {
  content: "X";
  color: #01a8c6;
}

/* o 玩家 */
.cell.o::before {
  content: "O";
  color: #8fbe01;
}
</style>
