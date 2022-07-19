// 创建路由实例  路由规则 并导出并在main.ts中  app.vue中准备路由出口
// 1. 安装路由 yarn add vue-router
// 2. 创建路由实例 配置路由规则
import {createRouter, createWebHistory} from 'vue-router'
const router  = createRouter({
  history: createWebHistory(), // history模式
  routes: [
    {path: '/', component: () => import('@/views/Layout/index.vue')},
    {path: '/login', component: () => import('@/views/Login/index.vue')}
  ]
})
// 3. 导出
export default router