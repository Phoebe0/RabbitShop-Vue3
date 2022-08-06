import { defineStore } from "pinia"

const useCarStore = defineStore('car', {
  // 状态
  state() {
    return {
      list: [] // 购物车数组
    }
  },
  // 计算
  getters: {},
  // 方法
  actions: {},
});

export default useCarStore