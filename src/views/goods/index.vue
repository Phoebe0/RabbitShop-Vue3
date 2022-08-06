<script lang="ts" setup name="Goods">
import useStore from '@/store'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import GoodsImage from './components/GoodsImage.vue'
import GoodsSales from './components/GoodsSales.vue'
import GoodsName from './components/GoodsName.vue'
import GoodsSku from './components/GoodsSku.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import GoodsHot from './components/GoodsHot.vue'
import Message from '@/components/message'
const { goods } = useStore()
const route = useRoute()
watchEffect(() => {
  if (route.params.id && route.path === `/goods/${route.params.id}`) {
    // 在获取下一次商品信息之前，将商品信息先清空
    goods.resetGoodsInfo()
    // 再获取商品信息
    goods.getGoodsInfo(route.params.id as string)
  }
})

let selectdId = ''
const selectdGoods = (skuId: string) => {
  selectdId = skuId
  // 父组件接受到skuId, 要根据这个Id更新商品信息
  const sku = goods.goodsInfo.skus.find(sku => sku.id === skuId)
  if (sku) {
    // 这里直接修改仓库，不严谨，按理说应该提交一个仓库的action
    goods.goodsInfo.inventory = sku.inventory
    goods.goodsInfo.oldPrice = sku.oldPrice
    goods.goodsInfo.price = sku.price
  }
}

const addCar = () => {
  if (!selectdId) return Message.warning('请选择完整规格')
  // 选择了完整规格，才能加入购物车
  console.log('加入购物车🍄', selectdId)

}

// 输入计数框的值
const num = ref(1)
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
            <!-- 商品名称 + 商品描述 + 地区选择 -->
            <GoodsName :goods="goods.goodsInfo" />
            <!-- 商品sku 规格 -->
            <GoodsSku :goods="goods.goodsInfo" skuId="1369155864430120962" @selectdGoods="selectdGoods"></GoodsSku>
            <!-- 计数器组件 -->
            <XtxNumbox v-model="num" :min="1" :max="10" label="数量"> </XtxNumbox>
            <!-- 加入购物车按钮 -->
            <XtxButton type="primary" size="middle" style="margin-top: 20px" @click="addCar">加入购物车</XtxButton>

          </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <div class="goods-tabs">
                <GoodsDetail :goods="goods.goodsInfo"></GoodsDetail>
              </div>
            </div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
            <GoodsHot :type="1"></GoodsHot>
            <GoodsHot :type="2"></GoodsHot>
            <GoodsHot :type="3"></GoodsHot>
          </div>
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

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>