<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

const time = ref(0)
const { pause, resume, isActive } = useIntervalFn(() => {
  // pause 可以暂停这个定时器
  // resume 启动这个定时器
  // isActive 是一个布尔值，定时器运行中 true  定时器未运行 false
  time.value--
  if (time.value <= 0) pause()

}, 1000, { immediate: false })
const start = () => {
  time.value = 5
  resume()
}
const stop = () => {
  pause()
}
</script>
<template>
  <button @click="start">{{ time > 0 ? `${time}秒后重新发送` : '获取验证码' }}</button>
  <button @click="stop">暂停</button>
</template>
<style lang="less" scoped>
</style>