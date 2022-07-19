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
      const res = await request.get<ApiRes>('/home/category/head')
      console.log(res)
      this.cateList = res.data.result
    } 
  }

})
export default useCateStore