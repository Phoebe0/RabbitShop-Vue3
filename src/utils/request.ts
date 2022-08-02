// axios请求工具库封装的模块
import Message from '@/components/message/index'
import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  // 备用接口地址
  // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',   
  // baseURL: 'https://apipc-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<{code: string, message: string}>) {
    // 对响应错误做点什么
    console.dir(error)
    
    if(error.response) {
      if (error.response.data.code === '501' && error.response.data.message === '三方登录失败') {
        Message.warning('第三方登录成功，请绑定个人信息')
      } else {
        Message.error(error.response.data.message)
      }
    } else {
      Message.error('服务器异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default instance