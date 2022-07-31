import {Profile} from '@/types/user'
const key = 'rabbit_key'
// 存储用户信息
export const setUserInfo = (userInfo: Profile) => {
  localStorage.setItem(key, JSON.stringify(userInfo))
}
// 获取用户信息
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}
// 移除用户信息
export const removeUserInfo = () => {
  localStorage.removeItem(key)
}