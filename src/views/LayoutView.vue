<template>
  <a-layout class="wrapper">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">{{ collapsed ? "vue3" : "vue3可视化" }}</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/">
          <router-link to="/" tag="div">
            <user-outlined />
            <span>Home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/tictactoe">
          <router-link to="/tictactoe" tag="div">
            <upload-outlined />
            <span>TicTacToe</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/echarts">
          <router-link to="/echarts" tag="div">
            <insert-row-above-outlined />
            <span>EchartsDemo</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/upload">
          <router-link to="/upload" tag="div">
            <upload-outlined />
            <span>upload</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/oneday">
          <router-link to="/oneday" tag="div">
            <bar-chart-outlined />
            <span>一天数据统计图</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <line-chart-outlined />
              <span>数据分析和预测</span>
            </span>
          </template>

          <a-menu-item key="/analyze">
            <router-link to="/analyze" tag="div">
              <span>相关性分析</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/predict">
            <router-link to="/predict" tag="div">
              <span>ARIMA预测</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0;
          display: flex;
          justify-content: space-between;
        "
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Admin
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="onLoginOut">注销登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '700px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  InsertRowAboveOutlined,
  ProjectOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const selectedKeys = ref<string[]>(["/"]); //默认选择key=1
const collapsed = ref<boolean>(false);

const route = useRoute(); // 相当于vue2里面的this.$route
const router = useRouter(); // 相当于vue2里面的this.$router

selectedKeys.value = [router.currentRoute.value.path];

watch(router.currentRoute, (val) => {
  console.log(val.meta.title);
  document.title = val.meta.title
});
const onLoginOut = () => {
  //退出登录
  router.push("login");
};

console.log(router.currentRoute.value.path); //获取当前路由
</script>

<style>
.wrapper {
  /* height: 100vh; */
}
.wrapper .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.wrapper .trigger:hover {
  color: #1890ff;
}

.wrapper .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  color: aliceblue;
  text-align: center;
  line-height: 32px;
}

/* .site-layout .site-layout-background {
  background: #fff;
} */
</style>
