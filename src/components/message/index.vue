<script lang="ts" setup name="XtxMessage">

import { onMounted, PropType, ref } from 'vue'

defineProps({
  type: {
    type: String as PropType<'success' | 'error' | 'warning'>,
    default: 'success',
  },
  message: {
    type: String,
    default: '默认提示消息'
  }
})

// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style = {
  warning: {
    icon: 'icon-warning',
    color: '#E6A23C',
    backgroundColor: 'rgb(253, 246, 236)',
    borderColor: 'rgb(250, 236, 216)',
  },
  error: {
    icon: 'icon-shanchu',
    color: '#F56C6C',
    backgroundColor: 'rgb(254, 240, 240)',
    borderColor: 'rgb(253, 226, 226)',
  },
  success: {
    icon: 'icon-queren2',
    color: '#67C23A',
    backgroundColor: 'rgb(240, 249, 235)',
    borderColor: 'rgb(225, 243, 216)',
  },
}
const flag = ref(false)
// DOM结构挂在后，flag变成true
onMounted(() => {
  flag.value = true
})
setTimeout(() => {
  flag.value = false
}, 2000)
</script>

<template>
  <!-- 在vue中使用过渡
      1. 使用transition标签包裹
      2. 容器一定是  v-if  false/true  切换的
-->
  <Transition name="down">
    <div v-if="flag" class="xtx-message" :style="style[type]">
      <i class="iconfont" :class="style[type].icon"></i>
      <span class="text">
        {{ message }}
      </span>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.down-enter-from {
  transform: translate3d(0, -75px, 0);
  opacity: 0;
}

.down-enter-active {
  transition: all 0.5s;
}

.down-enter-to {
  transform: none;
  opacity: 1;
}

// 走
.down-leave-from {
  transform: none;
  opacity: 1;

}

.down-leave-active {
  transition: all 0.5s;
}

.down-leave-to {
  transform: translate3d(0, -75px, 0);
  opacity: 0;
}


.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;

  i {
    margin-right: 4px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}
</style>