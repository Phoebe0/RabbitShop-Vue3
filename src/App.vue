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
app
<p>123</p>
<ul>
  <li>
    111
  </li>
</ul>
<a href="#">链接🔗</a>
</template>
<style lang="less" scoped>

.box {
  width: 300px;
  height: 300px;
   background-color: @warnColor;
  .hoverShadow();
}
</style>