<script lang="ts" setup name="XtxNumbox">
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const props = defineProps({
  // 输入框默认显示的值
  modelValue: {
    type: Number,
    default: 1
  },
  // 最小值
  min: {
    type: Number,
    default: 1
  },
  // 最大值
  max: {
    type: Number,
    required: true
  },
  // 左侧展示的文本
  label: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()
// 减一
const sub = () => {
  // 如果到了最小值了，就不再继续减下去了
  if (props.modelValue <= props.min) return
  emit('update:modelValue', props.modelValue - 1)
}
// 加一
const add = () => {
  // 如果到了最大值了，就不再继续加下去了
  if (props.modelValue >= props.max) return
  emit('update:modelValue', props.modelValue + 1)
}
// 输入框输入值，不能是非数字，不能大于最大值 ，小于最小值
const changeVal = (e: Event) => {
  const el = e.target as HTMLInputElement // 输入框类型处理
  let targetVal = +el.value // 输入框的值
  // 1. 输入框的值不能大于最大值
  if (targetVal > props.max) {
    targetVal = props.max
  }
  // 2. 输入框的值不能小于最小值
  if (targetVal < props.min) {
    targetVal = props.min
  }
  // 3. 输入框的内容不能是非数字
  // isNaN  只要检测的数据是数字，结果都是false, 其余情况都是true
  if (isNaN(targetVal)) {
    targetVal = props.min
  }
  emit('update:modelValue', targetVal)
  // 强制更新
  proxy!.$forceUpdate()
}
</script>
<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a :class="{ disabled: modelValue <= min }" href="javascript:;" @click="sub">-</a>
      <input type="text" :value="modelValue" @change="changeVal" />
      <a :class="{ disabled: modelValue >= max }" href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    >a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    >input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>