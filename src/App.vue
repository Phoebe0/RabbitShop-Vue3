<script lang="ts" setup>
// 测试请求
import request from '@/utils/request.ts'
const test = async () => {
  const res = await request.get('/home/index')
  console.log(res)
}
test ()
</script>
<template>
<RouterView></RouterView>
</template>
<style lang="less" scoped>

.box {
  width: 300px;
  height: 300px;
   background-color: @warnColor;
  .hoverShadow();
}
</style>