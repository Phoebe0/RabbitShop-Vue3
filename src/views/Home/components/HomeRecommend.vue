<script lang="ts" setup>
import HomePanel from './HomePanel.vue'
import useStore from '@/store'
import { useLazyData } from '@/utils/hooks'
import HomeSkeleton from './HomeSkeleton.vue'
const { home } = useStore()
const target = useLazyData(home.getRecommendGoodsList)
</script>
<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list" v-if="home.recommendGoodsList.length">
      <li v-for="item in home.recommendGoodsList" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton v-else></HomeSkeleton>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>