<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()
const changeMoney = () => {
  emit('update:modelValue', 20)
}

</script>
<template>
  <div style="border: 2px solid #ccc; padding: 20px;">
    子组件----{{ modelValue }} <button @click="changeMoney">改</button>
  </div>
</template>
<style lang="less" scoped>
</style>
