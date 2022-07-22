// 封装轮播图数据， 涉及到多个页面使用，所以用pinia进行维护
import request from '@/utils/request'
import {defineStore} from 'pinia'
import {BannerItem, ApiRes} from '@/types/data'

const useHomeStore = defineStore('home', {
  state() {
      return {
        slideList: [] as BannerItem[]
      }
  },
  actions: {
    // 发送请求获取轮播图
    async getSlideList() {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      console.log(res)
      this.slideList = res.data.result
    }
  },
  getters: {

  }
})

export default useHomeStore