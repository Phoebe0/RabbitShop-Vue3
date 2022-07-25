<script lang="ts" setup name="XtxCity">
import { ref, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { AreaList, AddressType } from '@/components/city/city'
import axios from 'axios'


defineProps<{
  address?: string
}>()

const emit = defineEmits<{
  (e: 'changeAddress', val: AddressType): void
}>()


// 控制下拉选项显示与隐藏的布尔值
const active = ref(false)

// 点击元素之外也能关闭弹框
const target = ref(null)
// 1. 点击城市区域之外的区域触发回调函数
onClickOutside(target, () => {
  // 2. 关闭弹框
  active.value = false
})

const areaList = ref<AreaList[]>([]) // 城市数据
const catchList = ref<AreaList[]>([]) // 备份数据

const AddressInfo = ref<AddressType>({
  // 省份的信息
  provinceName: '',
  provinceCode: '',
  // 市的信息
  cityName: '',
  cityCode: '',
  // 区/县的信息
  countyName: '',
  countyCode: ''
})

// 1. 获取到省份
const getCityList = async () => {
  const res =  await axios.get<AreaList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  areaList.value = res.data
  catchList.value = res.data
}
// 2. 点击省份选择市 / 区 / 一层一层点下去
const handleClick = (item: AreaList) => {
  // 每点击一次都要记录下对应省市的名字  +  code
  if (item.level === 0) {
    AddressInfo.value.provinceName = item.name
    AddressInfo.value.provinceCode = item.code
  }

  if (item.level === 1) {
    AddressInfo.value.provinceName = item.name
    AddressInfo.value.provinceCode = item.code
  }

  if (item.level === 2) {
    AddressInfo.value.provinceName = item.name
    AddressInfo.value.provinceCode = item.code
     // 当点击的数据是最后一项时，关闭弹框
    active.value = false
    // 说明 省市区选择完毕，将完整的地址传递给父组件，发送请求
    emit('changeAddress', AddressInfo.value)
  }
  // 将点击的省 / 城市的areaList再赋值给areaList
  areaList.value = item.areaList
}
// 当侦听active为false, 直接将备份的数据恢复出来
watchEffect(() => {
  if (!active) {
    areaList.value = catchList.value
  }
})
getCityList ()


</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active }" @click="active = !active">
      <span class="placeholder" v-if="!address">请选择配送地址</span>
      <span class="value" v-else>{{ address }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span 
      class="ellipsis" 
      v-for="item in areaList" 
      :key="item.code"
      @click="handleClick(item)"
      >{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>