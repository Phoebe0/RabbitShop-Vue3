<script lang="ts" setup>
// h函数和render函数 可以将一个虚拟DOM对象挂载到真实DOM结构中
// h函数能创建一个VNode虚拟DOM，也叫createVNode, 别名 h函数
import { h, onMounted, render } from 'vue'
import XtxMessage from '@/components/message/index.vue'
const VNode = h(XtxMessage, { type: 'warning', message: '警告⚠' })
console.log(VNode)

onMounted(() => {
  render(VNode, document.querySelector('#box')!)
})

</script>
<template>
  <div id="box"></div>
</template>
<style lang="less" scoped>
</style>