<script lang="ts" setup name="Layout">
import AppTopnav from './components/AppTopnav.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <main class="app-body">
      <!-- 路由出口 -->
  </main>
  <AppFooter></AppFooter>
</template>
<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>