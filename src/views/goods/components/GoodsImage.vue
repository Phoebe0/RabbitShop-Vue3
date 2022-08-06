<script lang="ts" setup name="GoodsImage">
import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'


defineProps<{
  images: string[]
}>()
// 鼠标经过右侧小图片时的下标
const activeIndex = ref(0)
// 控制显示与隐藏
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const position = computed(() => {
  let x = elementX.value - 100
  let y = elementY.value - 100

  // 限制滑动的上下左右区域
  if (x <= 0) x = 0
  if (y <= 0) y = 0
  if (x >= 200) x = 200
  if (y >= 200) y = 200
  return { x, y }
})
</script>
<template>
  {{ position.x }} {{ elementY }}
  <div class="goods-image">
    <!-- 右侧放大镜效果的那个 大图片容器 -->
    <div class="large" v-show="!isOutside" :style="[{
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundPosition: `${-position.x * 2}px ${-position.y * 2}px`,
    }]"></div>
    <div class="middle">
      <!-- 左侧展示的大图 -->
      <img :src="images[activeIndex]" alt="" ref="target" />
      <!-- 跟随思路：鼠标移动事件，实时获取鼠标的位置，然后修改遮罩层的left和top值 -->
      <!-- 小遮罩 -->
      <div class="layer" v-show="!isOutside" :style="{ left: position.x + 'px', top: position.y + 'px' }"></div>
    </div>
    <!-- 商品小图 -->
    <ul class="small">
      <li @mouseenter="activeIndex = index" v-for="(item, index) in images" :key="item"
        :class="{ active: index === activeIndex }">
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, .2);
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>