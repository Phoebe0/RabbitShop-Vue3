<script lang="ts" setup name="HomePanel">
const {title = '默认主标题', subTitle = '默认副标题'} = defineProps<{
  title?: string
  subTitle?: string
}>()
</script>
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 右上角插槽，自定义结构，用插槽占位 -->
        <slot name="right"></slot>
      </div>
      <!-- 面板的内容, 自定义结构，用插槽占位 -->
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>