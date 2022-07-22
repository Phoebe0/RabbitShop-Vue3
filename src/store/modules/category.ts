import {defineStore} from 'pinia'
import {CategoryItem, ApiRes} from '@/types/data'
import request from '@/utils/request'
import {topCategory} from '@/store/constants'
// 将默认的分类数据处理成数据包对象
const handleCategory = topCategory.map(item => {
  return {name: item}
})
const useCateStore = defineStore('category',{
  state() {
    return {
      cateList: handleCategory as CategoryItem[] // 导航链接的数据
    }
  },
  actions: {
    // 获取导航链接数据的方法
    async getCateList() {
      const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
      console.log(res)
      this.cateList = res.data.result
    },
    // 鼠标进入设置对应项的show值为true
    show(id: string) {
      // 拿着id找到对应项
      const obj = this.cateList.find(item => item.id === id)
      obj!.show = true
    },
    // 鼠标离开设置对应项的show为false
    hide(id: string) {
      const obj = this.cateList.find(item => item.id === id)
      obj!.show = false
    }
  }

})
export default useCateStore