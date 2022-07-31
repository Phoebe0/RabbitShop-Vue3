<script lang="ts" setup>
import { useCountDown } from '@/utils/hooks'

const { time, start } = useCountDown(5)
const countdown = () => {
  start()
}
</script>
<template>
  <button @click="countdown">{{ time > 0 ? `${time}秒后重新发送` : '获取验证码' }}</button>

</template>
<style lang="less" scoped>
</style>