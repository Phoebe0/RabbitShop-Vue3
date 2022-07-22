<script lang="ts" setup>
import useStore from '@/store'
const { home } = useStore()
home.getSlideList()

</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <!-- 父传子的方式将数据传给通用轮播图组件 -->
    <XtxCarousel :slidesList="home.slideList" autoPlay :duration="3000" isShowDots></XtxCarousel>
  </div>
  
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
}

// 将首页样式深度作用到组件内部，替换组件中的样式
:deep(.carousel-btn.prev) {
  left: 270px!important;
}
:deep(.carousel-indicator) {
  padding-left: 250px;
}
</style>