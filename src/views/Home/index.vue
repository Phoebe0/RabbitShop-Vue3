<!-- 首页组件 -->
<script lang="ts" setup name="Home">
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomePanel from './components/HomePanel.vue'
import HomeFresh from './components/HomeFresh.vue'
import HomeRecommend from './components/HomeRecommend.vue'
import HomeSkeleton from './components/HomeSkeleton.vue'

</script>
<template>
<div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeFresh></HomeFresh>
        <!-- 人气推荐 -->
        <HomeRecommend></HomeRecommend>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>

</style>