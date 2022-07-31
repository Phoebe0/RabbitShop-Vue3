// 封装用户数据
import request from '@/utils/request'
import {defineStore} from 'pinia'
import {Profile} from '@/types/user'
import { ApiRes } from '@/types/data'
import {getUserInfo, setUserInfo, removeUserInfo} from '@/utils/storage'



const useUserStore = defineStore('user', {
  state() {
      return {
       userInfo: getUserInfo() as Profile
      }
  },

  actions: {
    // 账号或密码登陆的请求
    async login (data: {account: string, password: string}) {
      const res = await request.post<ApiRes<Profile>>('/login', data)
      this.userInfo = res.data.result
      // 存储到本地
      setUserInfo(res.data.result)
    },
    // 获取手机验证码
    async getCode (mobile: string) {
      await request.get<ApiRes<Profile>>('/login/code', {
        params: {
          mobile
        }
      })
    },
    // 手机号+验证码登录的请求
    async mobileLogin(data: { mobile: string, code: string}) {
      const res = await request.post<ApiRes<Profile>>('/login/code', data)
      this.userInfo = res.data.result
     // 存储到本地
     setUserInfo(res.data.result)
    },
    // 退出登录
    logout() {
      // 清除本地和pinia中的数据
      removeUserInfo()
      this.userInfo = {} as Profile
    }

  },
  getters: {

  }
})

export default useUserStore