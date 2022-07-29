import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { GoodsInfo } from '@/types/goods'


export default defineStore('goods', {
  state () {
    return {
      // 商品详情
      goodsInfo: {} as GoodsInfo
    }
  },
  actions: {
    // 获取商品信息详情
    async getGoodsInfo(id: string) {
      const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
        params: {
          id
        }
      })
      this.goodsInfo = res.data.result
    },
    // 定义一个重置goodsInfo的方法
    resetGoodsInfo () {
      this.goodsInfo = {} as GoodsInfo
    }
  },
  getters: {}
})