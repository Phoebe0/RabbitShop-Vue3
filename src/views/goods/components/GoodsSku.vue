<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, Value } from '@/types/goods'
import bwPowerSet from '@/utils/power-set'
// 接收商品信息
const props = defineProps<{
  goods: GoodsInfo,
  skuId?: string
}>()

const emit = defineEmits<{
  (e: 'selectdGoods', skuId: string): void
}>()


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
const pathMap = getMap()
console.log(getMap())

// 4. 保证点击规格的数组顺序
const orderArr = () => {
  // 循环specs,拿到每一个被选中的按钮，并且有序地放在数组中
  const arr = ['', '', '']
  props.goods.specs.forEach((spec, index) => {
    const btn = spec.values.find(btn => btn.selected)
    if (btn) {
      arr[index] = btn.name
    } else {
      arr[index] = ''
    }
  })
  return arr
}

// 3. 默认按钮规格的禁用
// 取到所有的规格按钮 去路径字典中查找，看是否有某个按钮不存在路径对象字典中。如果不存在就禁用
const defaultDisabledSpec = () => {
  // 只要点击，就会得到一个有序数组
  const arr = orderArr() // ['', '', '10cm']
  props.goods.specs.forEach((spec, index) => { // 每一行
    spec.values.forEach(btn => { // 每一个按钮对象
      const newArr = [...arr]
      newArr[index] = btn.name
      const key = newArr.filter(item => item).join('♥')
      console.log(key)
      if (pathMap[key]) {
        btn.disabled = false
      } else {
        btn.disabled = true
      }
    })
  })
}
// 页面一加载调用一次，禁用无货的
defaultDisabledSpec()

// 1. 点击选中功能
const changeSeleted = (item: Spec, subItem: Value) => {
  if(subItem.disabled) return  // 已经被禁用了，禁止点击 
  if (subItem.selected) {
    // 表示已经选中了
    subItem.selected = false
  } else {
    // 排他
    // 把同级选中的的取消选中，只选中当前点击的subItem
    item.values.forEach(v => v.selected = false)
    subItem.selected = true
  }
  // 点击的时候也要禁用
  defaultDisabledSpec() 
  // 选择完一个完整的规格后，记录skuId,传递给父组件
  const selectArr = orderArr()
  // 1. 过滤数组，看是否有空元素
  const res = selectArr.filter(value => value)
  console.log(res)
  // 2. 如果过滤出来的数组长度等于props.goods.specs.length  把skuId记录下来
  if (res.length === props.goods.specs.length) {
    // 3. 将res处理成字符串去路径字典中查找
    const key = res.join('♥')
    const skuId = pathMap[key][0] // 找到了完整规格的skuId
    emit('selectdGoods', skuId)
  }

  
}

// 5. 默认选中规格
const defaultCheckdBtn = () => {
  // 5.1 没传skuId, 不选中哦
  if (!props.skuId) return 
  // 5.2 基于传过来的skuId, 默认规格勾选
  // 5.2.1 从goods.skus数组中查找那一项sku
  const sku = props.goods.skus.find(sku => sku.id === props.skuId)
  console.log(sku)
  // 5.3 找到了这个sku, 这个sku中有specs(数组）记录了各个规格
  if (sku) {
    props.goods.specs.forEach((spec, index) => {
      console.log(spec)
      spec.values.forEach(btn => {
        if(btn.name === sku.specs[index].valueName) {
          btn.selected = true
        }
      })
    })
  } 
}
defaultCheckdBtn()

</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <!-- selected 表示选中 ；disabled 表示禁用  -->
        <template v-for="subItem in item.values" :key="subItem.name">
          <img v-if="subItem.picture" :src="subItem.picture" :title="subItem.name" @click="changeSeleted(item, subItem)"
            :class="{ selected: subItem.selected, disabled: subItem.disabled }" />
          <span v-else @click="changeSeleted(item, subItem)" :class="{ selected: subItem.selected, disabled: subItem.disabled }">
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