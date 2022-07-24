import {defineStore} from 'pinia'
import {CategoryItem, ApiRes, TopCategory, SubCategory} from '@/types/data'
import request from '@/utils/request'
import {topCategory} from '@/store/constants'
// 将默认的分类数据处理成数据包对象
const handleCategory = topCategory.map(item => {
  return {name: item}
})
const useCateStore = defineStore('category',{
  state() {
    return {
      cateList: handleCategory as CategoryItem[], // 导航链接的数据
      topCategory: {} as TopCategory, // 一级商品分类的详细信息
      subCategory: {} as SubCategory, // 二级商品分类的详细信息
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
    },
    // 获取一级分类商品信息
    async getTopCategory (id: string) {
      const res = await request.get<ApiRes<TopCategory>>('/category', {
        params: {
          id
        }
      })
      this.topCategory = res.data.result
    },
     // 获取二级商品分类的信息 get请求query查询参数传参
     async getSubCategory(id: string) {
      // await request.get<ApiRes<SubCategory>>(`/category/sub/filter`, { params: { id } })
      const res = await request.get<ApiRes<SubCategory>>(`/category/sub/filter?id=${id}`)
      this.subCategory = res.data.result
    }
  }

})
export default useCateStore