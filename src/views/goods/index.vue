<script lang="ts" setup name="Goods">
import useStore from '@/store'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import GoodsImage from './components/GoodsImage.vue'
import GoodsSales from './components/GoodsSales.vue'
import GoodsName from './components/GoodsName.vue'
const { goods } = useStore()
const route = useRoute()
watchEffect(() => {
  if (route.params.id && route.path === `/goods/${route.params.id}`) {
    goods.getGoodsInfo(route.params.id as string)
  }
})

</script>


<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 渲染 -->
      <div v-if="goods.goodsInfo.id">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${goods.goodsInfo.categories[1].id}`">
            {{ goods.goodsInfo.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem :to="`/category/sub/${goods.goodsInfo.categories[0].id}`">
            {{ goods.goodsInfo.categories[0].name }}
          </XtxBreadItem>
          <XtxBreadItem>{{ goods.goodsInfo.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <div class="media">
            <!-- 左侧放大镜🔍区域 -->
            <GoodsImage :images="goods.goodsInfo.mainPictures"></GoodsImage>
            <!-- 左侧底部商品销量 -->
            <GoodsSales></GoodsSales>
          </div>
          <!-- 右侧商品描述 -->
          <div class="spec">
            <!-- 商品名称 -->
            <GoodsName :goods="goods.goodsInfo" />
          </div>

        </div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside"></div>
        </div>
      </div>

      <!-- 占位的 -->
      <div v-else>
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info"></div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>