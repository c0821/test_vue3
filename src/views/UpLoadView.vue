<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action=" http://127.0.0.1:8800/uploadfile/"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
  <a-table
    :columns="columns"
    :data-source="dataSource"
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
    <template #title>
      <a-space direction="vertical" :size="12">
        <a-range-picker v-model:value="dateValue" @ok="onOk" show-time />
      </a-space>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { message, UploadChangeParam } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted } from "vue";
import type { Dayjs } from "dayjs";
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, RadarChart, RadarSeriesOption } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import RangeValue from "../interface/myinterface.ts";

// echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);
const fileList = ref([]); //已经上传的文件列表
const header = {
  //设置上传的请求头部，IE10 以上有效
  authorization: "authorization-text",
};
// type RangeValue = [Dayjs, Dayjs];
const dateValue = ref<RangeValue>();

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    console.log(info);
    message.success(
      `${info.file.response.filename} ${info.file.response.message} ${info.file.response.time}`
    );
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const onOk = (dates: [Dayjs, Dayjs]) => {
  const startDate = dates[0].format("YYYY-MM-DD HH:mm:ss");
  const endDate = dates[1].format("YYYY-MM-DD HH:mm:ss");
  console.log(startDate); //开始时间
  console.log(endDate); //结束时间

  const url = "http://127.0.0.1:8800/datas";
  axios
    .get(url, { params: { startDate: startDate, endDate: endDate } })
    .then((response) => {
      if (response.data) {
        console.log(response.data);
        dataSource.value = response.data;
      }
    })
    .catch((err) => {
      console.log("Error");
    });
};

const dataSource = ref([]);
const columns = [
  {
    title: "fValueData",
    dataIndex: "fValueData",
  },
  {
    title: "DataTime",
    dataIndex: "DataTime",
  },
];
</script>

