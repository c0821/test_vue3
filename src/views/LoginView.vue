<template>
  <!-- 登录页头部 start -->
  <div class="login-top">
    <img alt="Vue logo" src="../assets/logo.png" class="icon-head" />
    <div class="login-top-centent">欢迎登录</div>
    <div class="title-name">Vue3数据可视化系统</div>
  </div>
  <!-- 登录页头部 end -->
  <!-- 登录页面主体 start -->
  <div class="login-body">
    <!-- 用户名 -->
    <div class="field">
      <!-- <svg-icon icon-name="wo" class-name="icon"/> -->
      <user-outlined />
      <input type="text" placeholder="请输入用户名" v-model="username" />
    </div>
    <!-- 密码 -->
    <div class="field">
      <!-- <svg-icon  icon-name="mima" class-name="icon"/> -->
      <lock-outlined />
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <!-- 记住密码 -->
    <div class="field-check">
      <input
        type="checkbox"
        class="checkbox"
        id="remberpwd"
        value="记住密码"
        v-model="remberpwd"
      />
      <label class="checkbox-lable" for="remberpwd">记住密码</label>
    </div>
    <!-- 登录按钮 -->
    <button class="login" @click="login">登录</button>
  </div>
  <!-- 登录页面主体 end -->
</template>
 
<script>
import { onMounted, reactive, toRefs, watch } from "vue";
//引入路由
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
export default {
  name: "app",
  setup() {
    const state = reactive({
      username: null, //用户名
      password: null, //密码
      remberpwd: false, //记住密码
    });
    const router = useRouter();
    // 页面初始化时，赋值用户名密码
    onMounted(() => {
      console.log(localStorage);
      if (localStorage.getItem("username")) {
        state.username = localStorage.getItem("username");
        state.password = localStorage.getItem("password");
        state.remberpwd = true;
      }
    });
    // 记住密码
    watch(
      () => state.remberpwd,
      (val) => {
        remberPassword(val);
      }
    );
    //记住密码
    const remberPassword = (val) => {
      if (val === true) {
        localStorage.setItem("username", state.username);
        localStorage.setItem("password", state.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    };
    // 验证用户名密码
    const login = () => {
      // //记住密码
      // remberPassword(state.username)
      if (state.username === "admin" && state.password === "admin") {
        //跳转首页
        router.push("/");
      } else {
        alert("用户名或者密码错误");
      }
    };

    return {
      ...toRefs(state),
      login,
    };
  },
};
</script>
 
<style scoped>
/**头部内容 */
.login-top {
  height: 200px;
  /* background: linear-gradient(
    to right,
    rgba(0, 0, 240, 0.5),
    rgba(94, 94, 233, 0.5),
    rgb(0, 21, 41),
    rgba(254, 172, 94, 0.5),
    rgba(199, 121, 208, 0.5)
  ); */
  background-color: rgb(3, 36, 67);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50% / 0 0 20% 20%;
}

/**文本头部内容 */
/* .icon-head {
  width: 40px;
  float: clear;
} */
.login-top-centent {
  padding-top: 10px;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
}
.title-name {
  text-align: center;
  color: #ffffff;
  font-size: 18px;
}
/**主体内容 */
.login-body {
  margin: 0 auto;
  margin-top: -20px;
  width: 30%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 10px;
  padding: 60px 0;
  height: calc(100% - 200px);
  text-align:center
}
.field {
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  border-bottom: 1px solid rgb(204, 203, 203);
  /* 图标输入框对齐 */
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.icon {
  font-size: 22px;
  color: rgba(0, 0, 240, 0.5);
}
input {
  border: 0;
  font-size: 16px;
}
input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
}
input:focus {
  /* 边框不用border，用outline */
  outline: 0px;
}
/* 多选框 */
.field-check {
  margin: 0 auto;
  margin-top: 10px;
  width: 70%;
  text-align: right;
}
.checkbox-lable {
  padding-left: 5px;
  cursor: pointer;
  margin: 0;
  vertical-align: middle;
  font-size: 13px;
}
.checkbox {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* css 复选框 */
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  background-color: #fff;
  color: #fff;
  width: 14px;
  height: 14px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}

input[type="checkbox"]:checked::after {
  content: "";
  background-color: rgba(94, 94, 233, 0.5);
  /* border-color: rgba(94, 94, 233, 0.5); */
}

input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 5px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  z-index: 1;
}

/* 登录按钮 */
.login {
  width: 50%;
  margin: 30px auto;
  border: 0px;
  height: 40px;
  border-radius: 10px;
  /* background: rgba(0, 0, 240, 0.5); */
  background: rgb(0, 21, 41);
  color: #ffffff;
}
button:focus {
  /* 边框不用border，用outline */
  outline: 0px;
}
</style>