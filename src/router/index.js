import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/view/index/index.vue')
const getMsg = () => import('@/view/getMessage/index.vue')
const login = () => import('@/view/login/index.vue')

Vue.use(Router)
export const constantRouterMap = [
    {
      path: '/index',
      name: '首页',
      menuShow: false,
      component: index
    },
    {
      path: '/getMsg',
      name: '我的消息',
      menuShow: false,
      component: getMsg
    },
    {
      path: '/login',
      name: '登录',
      menuShow: false,
      component: login
    }]
export default new Router({
  routes: constantRouterMap
})
