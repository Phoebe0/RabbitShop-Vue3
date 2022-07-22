<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue';
const target = ref<null | HTMLImageElement>(null)

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if ( isIntersecting ) {
    console.log(123)
    // t图片标签到了可视区，再赋值
    target.value!.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2Ftp10%2F211125143ZA1b-0-lp.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661070794&t=795006c1680ec48ddcf2ad9134859ea6'
    stop() // 只要进入过可视区，图片赋值了src之后，就拆除监听滚动
  }
})
</script>
<template>
  <div class="box"></div>
  <img ref="target" src="" alt="">
</template>
<style lang="less" scoped>
  .box{
    height: 3000px;
    background-color: aquamarine;
  }
</style>