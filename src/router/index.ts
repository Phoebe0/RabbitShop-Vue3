// 创建路由实例  路由规则 并导出并在main.ts中  app.vue中准备路由出口
// 1. 安装路由 yarn add vue-router
// 2. 创建路由实例 配置路由规则
import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
const router  = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      top: 0, // 回到顶部
      behavior: 'smooth' // 平滑滚动 过渡效果
    }
  },
  history: createWebHashHistory(), // hash模式
  routes: [
    {path: '/', component: () => import('@/views/Layout/index.vue'), children: [
      {path: '', component: () => import('@/views/Home/index.vue')}, // 首页
      {path: '/category/:id', component: () => import('@/views/category/index.vue')}, // 一级路由
      {path: '/category/sub/:id', component: () => import('@/views/category/sub.vue')}, // 二级路由
      {path: '/goods/:id', component: () => import ('@/views/goods/index.vue')} // 商品详情页路由
    ]},
    {path: '/login', component: () => import('@/views/Login/index.vue')},
    {path: '/test', component: () => import('@/views/testdemo/index.vue')},
    {path: '/login/callback', component: () => import('@/views/Login/callback.vue')},

  ]
})
// 3. 导出
export default router