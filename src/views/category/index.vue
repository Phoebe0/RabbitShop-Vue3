<!-- 一级路由组件 -->
<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import { watch, watchEffect } from 'vue'
import {useRoute} from 'vue-router'
import GoodsItem from './components/GoodsItem.vue'
const { category, home } = useStore()
const route = useRoute()
// console.log(route.params.id)

// 立即执行函数, 而且追踪函数体中数据的变化,只要变了,重新执行
watchEffect(() => {
  if (route.params.id && route.path === `/category/${route.params.id}`) {
    // 获取一级分类的信息
    category.getTopCategory(route.params.id as string)
    // 获取当前分类的轮播图数据 因为项目中没这个接口, 使用首页的轮播图数据
    // 一定要获取, 从/进入到分类页面是有数据的但是刷新会丢失
    home.getSlideList()
  }
})
</script>
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 面包屑显示方案:
    1. 改路由规则并且点击的时候多携带一个name字段(如果公司对路由规则没有明确的要求)
    2. 拿着id获取分类的详细信息
    -->
      <XtxBread separator="/">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :slidesList="home.slideList" autoPlay :duration="3000" isShowDots></XtxCarousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in category.topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in category.topCategory.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <!-- 描述字段没有, 跟后端沟通 -->
          <p class="tag">{{ item.name }}</p>
          <XtxMore />
        </div>
        <div class="body" v-if="item.goods?.length">
          <GoodsItem :goods="subItem" v-for="subItem in item.goods" :key="subItem.id" />
        </div>
        <div class="body" v-else>
          <h2 style="width: 100%; text-align: center;">暂无商品...等待更新上传</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
:deep(.xtx-carousel .carousel-body) {
  height: 500px;
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>