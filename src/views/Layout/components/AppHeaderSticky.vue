<!-- 吸顶组件 -->
<script lang="ts" setup name="AppHeaderSticky">
import { onMounted, onUnmounted, ref } from 'vue';
import AppHeaderNav from './AppHeaderNav.vue'

/* 
  1. 滚动距离 >= 78像素时，组建会在顶部固定定位
  2. 滚动距离 <= 78像素时，组建会隐藏消失
  3. 绑定滚动事件，如果滚出的距离 > 78 显示吸顶
*/

// const scrollTop = ref(0)
// // 滚动事件
// const scroll = () => {
//   scrollTop.value = pageYOffset || document.documentElement.scrollTop
// }
// // 挂载组件后，绑定好滚动事件
// onMounted(() => {
//   window.addEventListener('scroll', scroll)
// })
// // 组件销毁 移除滚动事件
// onUnmounted(() => {
//   window.removeEventListener('scroll', scroll)
// })

import {useWindowScroll} from '@vueuse/core'
const {y: scrollTop} = useWindowScroll()
</script>

<template>
  <!-- 吸顶组件位移出去只是看不到这个组件，但是导航数据AppHeaderNav还是能显示
        所以要使用v-show，等这个组件显示后，再显示AppHeaderNav
  -->
  <div class="app-header-sticky" :class="{ show: scrollTop >= 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav v-show="scrollTop >= 78" />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);  // 将吸顶导航组件沿着y轴负方向位移自身高度
  &.show{
    transition: all .3s;
    transform: translateY(0);
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>