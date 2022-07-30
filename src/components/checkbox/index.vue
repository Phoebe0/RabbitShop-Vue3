<script lang="ts" setup name="XtxCheckbox">

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()
const changeState = () => {
  // 将最新的状态通知给父组件
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="xtx-checkbox" @click=changeState>
    <i class="iconfont icon-checked" v-if="modelValue"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>