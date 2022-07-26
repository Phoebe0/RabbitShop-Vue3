<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, Value } from '@/types/goods'
import bwPowerSet from '@/utils/power-set'
// 接收商品信息
const props = defineProps<{
  goods: GoodsInfo
}>()
// 1. 点击选中功能
const changeSeleted = (item: Spec, subItem: Value) => {
  if (subItem.selected) {
    // 表示已经选中了
    subItem.selected = false
  } else {
    // 排他
    // 把同级选中的的取消选中，只选中当前点击的subItem
    item.values.forEach(v => v.selected = false)
    subItem.selected = true
  }
}

// 2. 求路径字典 ————> 按钮默认禁用和组合禁用
const getMap = () => {
  const pathMap: { [key: string]: string[] } = {}
  // 2.1 过滤掉无效的sku (保留库存 >0 的地址)
  const skus = props.goods.skus.filter(item => item.inventory > 0)
  // 2.2 将有效的skus中的specs的每一项的valueName收集到各自的数组中 ——> 求子集
  skus.forEach(sku => {
    const arr = sku.specs.map(spec => spec.valueName)
    console.log(arr)
    // 2.3 基于收集到的数组求一个子集
    const sets = bwPowerSet(arr)
    console.log(sets)
    // 2.4 循环子集，向字典中存储数据
    sets.forEach(set => {
      // 2.5 将每一个set转换成字符串  （json）
      const key = set.join('♥')
      // 2.6 往pathMap对象中追加（如果对象中没有这个key,开辟key。如果有key,追加
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        // 没有 将这个key对应的值设置为[sku.id]
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}
console.log(getMap())

</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <!-- selected 表示选中 ；disabled 表示禁用  -->
        <template v-for="subItem in item.values" :key="subItem.name">
          <img v-if="subItem.picture" :src="subItem.picture" :title="subItem.name" @click="changeSeleted(item, subItem)"
            :class="{ selected: subItem.selected }" />
          <span v-else @click="changeSeleted(item, subItem)" :class="{ selected: subItem.selected }">
            {{ subItem.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>