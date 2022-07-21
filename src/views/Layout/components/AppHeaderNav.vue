<script lang="ts" setup>
import useStore from '@/store'
const { category } = useStore()

</script>
<template>
<ul class="app-header-nav">
        <li class="home"><RouterLink to="/">首页</RouterLink></li>
        <li 
        v-for="item in category.cateList" 
        :key="item.name" 
        @mouseenter="category.show(item.id)" 
        @mouseleave="category.hide(item.id)"
        @click="category.hide(item.id)"
        >
        <!-- 进入一级路由 -->
          <RouterLink :to="item.id? `/category/${item.id}` : '/'">{{item.name}}</RouterLink>
          <div class="layer" :class="{ show: item.show }" v-if="item.id">
            <ul>
              <li v-for="subItem in item.children" :key="subItem.id">
              <!-- 进入二级路由 -->
                <RouterLink :to="`/category/sub/${subItem.id}`">
                  <img :src="subItem.picture"/>
                  <p>{{subItem.name}}</p>
               </RouterLink>
              </li>
            </ul>
          </div>
          <div class="layer" v-else>商品拼命加载中</div>
      </li>
      </ul>
</template>
<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
      &:hover {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
    // 新增样式
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   // height: 132px;
      //   // opacity: 1;
      // }
    }
  }
}
// 新增样式
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  /* 
    1. 准备一个类名，默认所有的layer是全部隐藏的
    2. 给li绑定鼠标进入事件，动态给鼠标经过的li的layer 添加show类名
    3. 给li绑定鼠标离开事件，动态的给鼠标离开的li的layer 移除show类名
  */
  &.show {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>