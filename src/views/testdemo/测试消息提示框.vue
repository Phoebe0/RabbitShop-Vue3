<script lang="ts" setup>
import Message from '@/components/message/index'
const fn = () => {
  // Message({ type: 'error', message: '登陆失败咯~~' })
  // Message.success('ok~~')
  // Message.error('error')
  Message.warning('warning')
}

</script>
<template>
  <button @click="fn">登录👉</button>
</template>
<style lang="less" scoped>
</style>