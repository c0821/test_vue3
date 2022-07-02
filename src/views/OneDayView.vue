<template>
  <a-space direction="vertical" :size="12">
    <!-- 选择日期 -->
    <a-date-picker v-model:value="date" :bordered="false" />
  </a-space>
  <a-button type="primary" shape="circle" @click="getOneDay">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <!-- 根据后端返回的数据绘制统计图 -->
  <div class="tongjitu">
    <v-chart :option="option_radar" style="height: 400px"> </v-chart>
    <v-chart :option="option_line" style="height: 200px"> </v-chart>
    <v-chart :option="option_bar" style="height: 200px"> </v-chart>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue"; //搜索图标
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { ECBasicOption } from "echarts/types/dist/shared";
import VChart from "vue-echarts";
import { colSize } from "ant-design-vue/lib/grid/Col";

const date = ref<Dayjs>(dayjs("2019-06-24", "YYYY-MM-DD")); //日期初始化
const dataSource = ref([]); //后端返回的数据
const option_radar = ref<ECBasicOption>();
const option_line = ref<ECBasicOption>();
const option_bar = ref<ECBasicOption>();
let data: number[] = [];

option_radar.value = {
  title: {
    text: "雷达图",
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "00", max: 10 },
      { name: "01", max: 10 },
      { name: "02", max: 10 },
      { name: "03", max: 10 },
      { name: "04", max: 10 },
      { name: "05", max: 10 },
      { name: "06", max: 10 },
      { name: "07", max: 10 },
      { name: "08", max: 10 },
      { name: "09", max: 10 },
      { name: "10", max: 10 },
      { name: "11", max: 10 },
      { name: "12", max: 10 },
      { name: "13", max: 10 },
      { name: "14", max: 10 },
      { name: "15", max: 10 },
      { name: "16", max: 10 },
      { name: "17", max: 10 },
      { name: "18", max: 10 },
      { name: "19", max: 10 },
      { name: "20", max: 10 },
      { name: "21", max: 10 },
      { name: "22", max: 10 },
      { name: "23", max: 10 },
    ],
  },
};

option_line.value = {
  xAxis: {
    type: "category",
    data: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
  },
  yAxis: {
    type: "value",
  },
};

option_bar.value = {
  xAxis: {
    type: "category",
    data: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
  },
  yAxis: {
    type: "value",
  },
};

//点击按钮触发

const getOneDay = () => {
  const day = date.value.format("YYYY-MM-DD");
  const url = "http://127.0.0.1:8800/oneDay";
  axios
    .get(url, { params: { date: day } })
    .then((response) => {
      if (response.data) {
        console.log(response.data); //成功获取数据
        dataSource.value = response.data;
        data = []; //清空
        dataSource.value.forEach((e) => {
          console.log(e.fValueData);
          data.push(e.fValueData);
        });
        console.log(data);
        //雷达图
        option_radar.value.series = [
          {
            type: "radar",
            name: day,
            data: [
              {
                value: data,
              },
            ],
          },
        ];
        //折线图
        option_line.value.series = [
          {
            type: "line",
            data: data,
          },
        ];
        // 柱状图
        option_bar.value.series = [
          {
            data: data,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ];
      }
    })
    .catch((err) => {
      console.log("Error");
    });
};

onMounted(() => {
  getOneDay();
});
</script>

<style scoped>
</style>