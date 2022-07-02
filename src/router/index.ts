import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicTacToeView from '../views/TicTacToeView.vue'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/LayoutView.vue'
// import UpLoad from '../views/UpLoad.vue' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: LayoutView,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Home',
        },
      },
      {
        path: 'tictactoe',
        name: 'tictactoe',
        component: TicTacToeView,
        meta: {
          title: 'TicTacToe',
        },
      },
      {
        path: 'echarts',
        name: 'echarts',
        component: () => import('../views/EchartsView.vue'),
        meta: {
          title: 'echarts'
        },
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('../views/UpLoadView.vue'),
        meta: {
          title: '文件上传'
        },
      },
      {
        path: 'oneday',
        name: 'oneday',
        component: () => import('../views/OneDayView.vue'),
        meta: {
          title: 'oneday'
        },
      },
      {
        path: 'analyze',
        name: 'analyze',
        component: () => import('../views/AnalyzeView.vue'),
        meta: {
          title: '数据分析'
        },
      },
      {
        path: 'predict',
        name: 'predoct',
        component: () => import('../views/PredictView.vue'),
        meta: {
          title: '数据预测'
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: '登录'
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = '' + to.meta.title;
  next()
})

export default router
