<!-- 一级路由组件 -->
<script lang="ts" setup name="TopCategory">
import {useRoute} from 'vue-router'
const route = useRoute()
console.log(route.params.id)

</script>
<template>
  <div class="category">
    一级路由---{{$route.params.id}}
  </div>
</template>
<style lang="less" scoped>

</style>