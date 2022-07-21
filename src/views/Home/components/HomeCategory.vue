<script lang="ts" setup name="HomeCategory">
import useStore from '@/store'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
  const { category } = useStore()
  // 为左侧的li绑定鼠标进入事件，并记录索引
  const activeId= ref('') // 是激活的id
  const showList = computed(() => {
    return category.cateList.find(item => item.id === activeId.value)?.goods
  })
  const handleEnter = (id: string) => {
    // 解决数据未完成赋值导致所有人都高亮问题
    if(!id) return 
    activeId.value = id
  }
</script>
<template>
  <div class="home-category" @mouseleave="activeId = ''">
    <ul class="menu">
      <li 
      v-for="(item, index) in category.cateList" 
      :key="item.id" 
      @mouseenter="handleEnter(item.id)"
      :class="{ active: item.id === activeId }"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 侧边栏小文本 -->
        <template v-if="item.children">
          <RouterLink to="/" v-for="subItem in item.children?.slice(0,2)" :key="subItem.id">{{ subItem.name }}</RouterLink>
        </template>
        <XtxSkeleton
        v-else
        v-for="i in 2"
        :key="i"
        :width="70"
        :height="20"
        bg="#27bb9a"
        animated
        fade
        style="margin-right: 10px"
        ></XtxSkeleton>
      </li>
    </ul>

    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐🍷</small></h4>
      <ul>
        <li v-for="item in showList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>

  
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
        &:hover,&.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>