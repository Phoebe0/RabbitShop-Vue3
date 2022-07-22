// 封装轮播图数据， 涉及到多个页面使用，所以用pinia进行维护
import request from '@/utils/request'
import {defineStore} from 'pinia'
import {BannerItem, ApiRes, GoodItem, HotGoodItem} from '@/types/data'

const useHomeStore = defineStore('home', {
  state() {
      return {
        slideList: [] as BannerItem[], // 轮播图的数据
        freshGoodsList: [] as GoodItem[], // 新鲜好物的数据
        recommendGoodsList: [] as HotGoodItem[] // 人气推荐数据
      }
  },
  actions: {
    // 发送请求获取轮播图
    async getSlideList () {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      console.log(res)
      this.slideList = res.data.result
    },
    // 发送请求获取新鲜好物的数据
    async getFreshGoodsList () {
      const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
      console.log('新鲜好物', res.data.result)
      this.freshGoodsList = res.data.result
      
    },
    // 发送请求获取人气推荐数据
    async getRecommendGoodsList () {
      const res = await request.get<ApiRes<HotGoodItem[]>>('/home/hot')
      console.log('人气推荐', res)
      this.recommendGoodsList = res.data.result
    }
  },
  getters: {

  }
})

export default useHomeStore