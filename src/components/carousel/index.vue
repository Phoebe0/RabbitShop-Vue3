<script lang="ts" setup name="XtxCarousel">

import { onUnmounted, ref } from 'vue'
import { BannerItem } from  '@/types/data'
// 方式一： vue3即使不用ts，也可以做类型，需要使用propType方法
// defineProps({
//   slidesList: {
//     type: Array as PropType<BannerItem[]>
//   }
// })
// 方式二：ts方式
const {slidesList, autoPlay, duration = 3000, isShowDots = false} = defineProps<{
  slidesList: BannerItem[]
  autoPlay?: boolean
  duration: number
  isShowDots?: boolean
  }>()
// 默认激活第一张图片 第一个小圆点
const active = ref(0)
// 为左右箭头绑定事件
  // 上一张  active -- 
const prev = () => {
  active.value --
  // 当<=0时，说明已经到了第一张，手动调到最后一张
  if(active.value < 0) {
    active.value = slidesList.length - 1
  }
}
const next = () => {
  active.value ++
  if (active.value > slidesList.length - 1) {
    active.value = 0
  }
}

// 自动轮播 
let timerId = -1
// 鼠标进入关闭自动轮播
const stop = () => {
  clearInterval(timerId)
}
// 鼠标移开开启自动轮播
const start = () => {
  // 如果没传递autoplay,就不开启自动轮播
  if(autoPlay){
    stop()
    // 在ts中，使用定d时器，window.setInterval
    timerId = window.setInterval(() => {
      next()
    }, duration)
  }
}
start ()
// 组件销毁 ，清除定时器
onUnmounted(() => {
  stop ()
})

</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <!-- 轮播图片 -->
    <ul class="carousel-body">
      <li 
      class="carousel-item"
      :class="{ fade: active === index }"
      v-for="(item, index) in slidesList"
      :key="item.id"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl"/>
        </RouterLink>
      </li>
    </ul>
    <!-- 左右箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 小圆点 -->
    <div class="carousel-indicator" v-if="isShowDots">
      <span
      v-for="(item, index) in slidesList"
      :key="item.id"
      :class="{ active: active === index }"
      @mouseenter="active = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>