<script lang="ts" setup name="HomeBrand">
import HomePanel from './HomePanel.vue'
import useStore from '@/store' 
import { useLazyData } from '@/utils/hooks'
import { ref } from 'vue';

const { home }  = useStore()
const target = useLazyData(home.getBrandList)
const index = ref(0)
// 右箭头
const next = () => {
  if (index.value === Math.ceil(home.brandList.length / 5) - 1) return 
  index.value ++
} 
// 左箭头
const prev = () => {
  if (index.value === 0) return
  index.value --
}
</script>

<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" :class="{ disabled: index === 0 }" class="iconfont icon-angle-left prev" @click="prev"></a>
      <a href="javascript:;" :class="{ disabled: index === Math.ceil( home.brandList.length / 5 ) - 1 }" class="iconfont icon-angle-right next" @click="next"></a>
    </template>
    <div class="box" ref="box">
      <transition name="fade">
        <ul 
        class="list" v-if="home.brandList.length" 
        :style="{ transform: `translateX(${-1240 * index }px)`,
                  width: `${Math.ceil(home.brandList.length / 5) * 100}%`}">
          <li v-for="item in home.brandList" :key="item.id">
            <RouterLink to="/">
              <img
                :src="item.picture"
                alt=""
              />
            </RouterLink>
          </li>
        </ul>
        <div v-else>
          <XtxSkeleton v-for="i in 5" :key="i" :width="240" :height="305" animated></XtxSkeleton>
        </div>
      </transition>
    </div>
  </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>