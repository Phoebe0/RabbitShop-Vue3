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
    },

    // ------------------------ 第三方登录的方法 --------------------------------
    // 情况一：直接去首页
    async qqLogin(unionId: string, source: number = 6) {
      const res = await request.post<ApiRes<Profile>>('/login/social', {unionId, source})
      console.log(res)
      // 将个人信息存储到本地和pinia
      this.userInfo = res.data.result
      setUserInfo(res.data.result)
    },
    // 情况二： qq和手机号绑定
    async bindQQLogin(unionId: string, mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>('/login/social/bind', {
        unionId,
        mobile,
        code
      })
      // 将个人信息存储到本地和pinia中
      this.userInfo = res.data.result
      setUserInfo(res.data.result)
    },
    // QQ绑定已存在手机号发送验证码
    async sendQQbindMsg(mobile: string) {
      await request.get('/login/social/code', {
        params: {
          mobile
        }
      })
    },
    // QQ绑定没有存在过的手机号发送验证码
    async sendQQPathMsg(mobile: string) {
      await request.get('/register/code', {
        params: {
          mobile
        }
      })
    },
    
    // 情况三： 无绑定 无账号
    async qqPatchLogin(data: any) {
      const res = await request.post<ApiRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      )
      //  将个人信息存储到本地和pinia中
      this.userInfo = res.data.result
      setUserInfo(res.data.result)
    }

  },
  getters: {

  }
})

export default useUserStore