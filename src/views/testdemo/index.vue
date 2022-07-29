<script lang="ts" setup>
// 在vue3上使用v-model，有一些变化
// 1. 子组件接受的数据是 modelValue, 在组件上v-model="数据" 【完整写法是：v-model:modelValue="属性"】
// 2. 子组件发布的自定义事件update: modelValue
// 3. 父组件才可以写 v-model
import { ref } from "vue";
import Son from "./Son.vue";
const money = ref(0)

</script>
<template>
  <div style="border: 2px solid #ccc; padding: 20px; margin: 20px;">
    <Son v-model="money"></Son>
  </div>
</template>
<style lang="less" scoped>
</style>
