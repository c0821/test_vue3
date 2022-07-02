<template>
  <!-- 表单 -->
  <a-form
    layout="inline"
    :model="formState"
    name="time_related_controls"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <!-- 日期选择 -->
    <a-form-item name="date-picker" label="DatePicker">
      <a-date-picker v-model:value="formState.Date" value-format="YYYY-MM-DD" />
    </a-form-item>
    <!-- 节点输入框 -->
    <a-form-item name="nodeid" label="NodeID">
      <a-input v-model:value="formState.NodeID" />
    </a-form-item>

    <a-form-item
      :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
    >
      <a-button type="primary" html-type="submit">Analyze</a-button>
    </a-form-item>
  </a-form>

  <a-table
    :columns="columns"
    :data-source="data"
    :rowKey="
      (record, index) => {
        return index;
      }
    "
    bordered
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'corr'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title> 相关性最大的5个小时对 </template>
    <!-- <template #footer>表尾测试 </template> -->
  </a-table>
  <!-- 均值 方程 绘图 -->
  <div class="warpper">
    <div class="graph">
      <v-chart
        :option="option_mean"
        autoresize
        theme="dark"
        style="height: 200px"
      >
      </v-chart>
      <v-chart
        :option="option_var"
        autoresize
        theme="dark"
        style="height: 200px"
      >
      </v-chart>
    </div>
    <div class="corrImg">
      <!-- 根据后端返回的数据绘制相关图 -->
      <img :src="imgurl" style="height: 300px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue"; //搜索图标
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { ECBasicOption } from "echarts/types/dist/shared";
import VChart, { THEME_KEY } from "vue-echarts";
import { colSize } from "ant-design-vue/lib/grid/Col";
import { FormState } from "../interface/myinterface";

// const dataSource = ref([]); //后端返回的数据
const data = ref([]); //相关性top5小时对
const imgurl = ref<String>(""); //图片路由
const formState = ref<FormState>({ Date: "", NodeID: "1163938587" }); //表单数据初始化
const option_mean = ref<ECBasicOption>();
const option_var = ref<ECBasicOption>();

// 表格列设置
const columns = [
  {
    title: "hour1",
    dataIndex: "hour1",
  },
  {
    title: "hour2",
    dataIndex: "hour2",
  },
  {
    title: "corr",
    dataIndex: "corr",
    sorter: {
      compare: (a, b) => a.corr - b.corr,
    },
  },
];

option_mean.value = {
  title: {
    text: "各小时均值",
  },
  tooltip: {
    trigger: "axis", //坐标轴触发
  },
  color: ["#64CDF0"],
  xAxis: {
    type: "category",
    boundaryGap: false,
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

option_var.value = {
  title: {
    text: "各小时方差",
  },
  color: ["#F5686F"],
  tooltip: {
    trigger: "axis", //坐标轴触发
  },
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

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

//点击按钮触发
const onFinish = (values: any) => {
  console.log('日期',formState.value.Date);
  const url = "http://127.0.0.1:8800/analyze";
  axios
    .get(url, {
      params: {
        NodeID: formState.value.NodeID,
        startDate: formState.value.Date,
      },
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data); //成功获取数据
        imgurl.value = response.data.ImageSRC;
        data.value = []; // 先清空
        data.value.push(
          response.data.Relation1,
          response.data.Relation2,
          response.data.Relation3,
          response.data.Relation4,
          response.data.Relation5
        );
        option_mean.value.series = [
          {
            type: "line",
            data: response.data.Uvalue,
            areaStyle: {},
            markPoint: {
              //标注最大值 最小值
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
          },
        ];
        option_var.value.series = [
          {
            data: response.data.Vvalue,
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
</script>

<style scoped>
.warpper {
  display: flex;
}
.graph {
  width: 600px;
}
.corrImg {
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color:#111;
}
</style>