<template>
  <!-- 表单 -->
  <a-form
    layout="inline"
    :model="formState"
    name="time_related_controls"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    style="margin: 10px 0px"
  >
    <!-- 日期选择 -->
    <a-form-item name="range-picker" label="RangePicker" v-bind="rangeConfig">
      <a-range-picker
        v-model:value="formState['range']"
        value-format="YYYY-MM-DD"
      />
    </a-form-item>
    <!-- 节点输入框 -->
    <a-form-item name="nodeid" label="NodeID">
      <a-input v-model:value="formState.NodeID" style="width: 120px" />
    </a-form-item>

    <a-form-item name="days" label="Days">
      <a-input v-model:value="formState.Days" style="width: 60px" />
    </a-form-item>

    <a-form-item
      :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
    >
      <a-button type="primary" html-type="submit">Predict</a-button>
    </a-form-item>
  </a-form>

  <a-table
    :columns="columns"
    :data-source="data_h"
    :rowKey="
      (record, index) => {
        return index;
      }
    "
    bordered
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'DataTime'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title> 预测 </template>
    <template #footer> MSE: {{ MSE }} </template>
  </a-table>

  <v-chart
    :option="option_predict"
    autoresize
    theme="dark"
    style="height: 350px"
  >
  </v-chart>

  <a-table
    :columns="columns2"
    :data-source="data_d"
    :rowKey="
      (record, index) => {
        return index;
      }
    "
    bordered
  >
    <template #bodyCell="{ column2, text }">
      <template v-if="column2.dataIndex === 'DataTime'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title> 预测 </template>
    <template #footer> MSE: {{ MSE2 }} </template>
  </a-table>

  <v-chart
    :option="option_predict2"
    autoresize
    theme="dark"
    style="height: 350px"
  >
  </v-chart>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue"; //搜索图标
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { ECBasicOption } from "echarts/types/dist/shared";
import VChart, { THEME_KEY } from "vue-echarts";
import { colSize } from "ant-design-vue/lib/grid/Col";
import { FormStatePredict } from "../interface/myinterface";

// const dataSource = ref([]); //后端返回的数据
const data_h = ref([]); //表数据
const MSE = ref<string>();
const data_d = ref([]);
const MSE2 = ref<string>();

const formState = ref<FormStatePredict>({
  range: ["2018-01-01", "2018-02-28"],
  NodeID: "1163938587",
  Days: 1,
}); //表单数据初始化

let practical = []; //实际值
let predict = []; //预测值

let practical2 = []; //实际值
let predict2 = []; //预测值

const option_predict = ref<ECBasicOption>();
const option_predict2 = ref<ECBasicOption>();

let xData = []; //x轴坐标
let xData2 = []; //x轴坐标

// 表格列设置
const columns = [
  {
    title: "NodeID",
    dataIndex: "NodeID",
  },
  {
    title: "DataTime",
    dataIndex: "DataTime",
  },
  {
    title: "Practical",
    dataIndex: "Practical",
  },
  {
    title: "Predict",
    dataIndex: "Predict",
  },
  {
    title: "|Practical-Predict|",
    dataIndex: "Diff",
  },
];

const columns2 = [
  {
    title: "Date",
    dataIndex: "Date",
  },
  {
    title: "Practical",
    dataIndex: "Practical",
  },
  {
    title: "Predict",
    dataIndex: "Predict",
  },
  {
    title: "|Practical-Predict|",
    dataIndex: "Diff",
  },
];

option_predict.value = {
  title: {
    text: "小时---真实值与预测值",
  },
  tooltip: {
    trigger: "axis", //坐标轴触发
  },
  legend: {
    data: ["Practical", "Predict"],
  },
  color: ["#64CDF0", "#F5686F"],
  xAxis: {
    type: "category",
    boundaryGap: false,
    name: "DataTime",
    data: [],
    // axisLabel: {
    //   rotate: -45,
    // },
  },
  yAxis: {
    type: "value",
  },
};

option_predict2.value = {
  title: {
    text: "天---真实值与预测值",
  },
  tooltip: {
    trigger: "axis", //坐标轴触发
  },
  legend: {
    data: ["Practical", "Predict"],
  },
  color: ["#64CDF0", "#F5686F"],
  xAxis: {
    type: "category",
    boundaryGap: false,
    name: "DataTime",
    data: [],
    // axisLabel: {
    //   rotate: -45,
    // },
  },
  yAxis: {
    type: "value",
  },
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

//点击按钮触发
const onFinish = (values: any) => {
  console.log(formState.value);
  const url = "http://127.0.0.1:8800/predict";
  axios
    .get(url, {
      params: {
        NodeID: formState.value.NodeID,
        StartTime: formState.value.range[0],
        EndTime: formState.value.range[1],
        Days: formState.value.Days,
      },
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data); //成功获取数据
        MSE.value = response.data.MSE;
        data_h.value = response.data.data_h; //小时预测表数据
        MSE2.value = response.data.MSE2;
        data_d.value = response.data.data_d;

        xData = [];
        predict = [];
        practical = [];

        data_h.value.forEach((e) => {
          e.Diff =
            Math.round(
              (e.Practical - e.Predict >= 0
                ? e.Practical - e.Predict
                : e.Predict - e.Practical) * 100
            ) / 100; //添加差值绝对值 保留两位小数
          xData.push(e.DataTime);
          practical.push(e.Practical);
          predict.push(e.Predict);
        });
        option_predict.value.xAxis.data = xData;
        option_predict.value.series = [
          {
            name: "Practical",
            type: "line",
            data: practical,
          },
          {
            name: "Predict",
            type: "line",
            data: predict,
          },
        ];

        xData2 = [];
        predict2 = [];
        practical2 = [];

        data_d.value.forEach((e) => {
          e.Diff =
            Math.round(
              (e.Practical - e.Predict >= 0
                ? e.Practical - e.Predict
                : e.Predict - e.Practical) * 100
            ) / 100; //添加差值绝对值 保留两位小数
          xData2.push(e.Date);
          practical2.push(e.Practical);
          predict2.push(e.Predict);
        });

        option_predict2.value.xAxis.data = xData2;
        option_predict2.value.series = [
          {
            name: "Practical",
            type: "line",
            data: practical2,
          },
          {
            name: "Predict",
            type: "line",
            data: predict2,
          },
        ];

      }
    })
    .catch((err) => {
      console.log("Error");
    });
};
</script>

<style scoped>
</style>