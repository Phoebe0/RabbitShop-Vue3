<!-- 二级路由组件 -->
<script lang="ts" setup name="SubCategory">
import { useRoute } from 'vue-router'
const route = useRoute() 
</script>
<template>
  <div class="subcategory">
    二级路由 --- {{$route.params.id}}
  </div>
</template>
<style lang="less" scoped>

</style>