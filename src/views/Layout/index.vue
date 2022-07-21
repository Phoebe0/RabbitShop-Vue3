<script lang="ts" setup name="Layout">
import AppTopnav from './components/AppTopnav.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppHeaderSticky from './components/AppHeaderSticky.vue'
// 处理服务器多次发请求问题
import useStore from '@/store'
const { category } = useStore()
category.getCateList()
</script>
<template>
  <AppHeaderSticky></AppHeaderSticky>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <main class="app-body">
      <!-- 二级路由出口 -->
      <RouterView></RouterView>
  </main>
  <AppFooter></AppFooter>
</template>
<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>