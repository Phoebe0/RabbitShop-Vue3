// 表单校验的方法
export function accountRule(value: string) {
  // account 是字段名，参数value是校验的值
  // 当前函数中，如果return true表示校验通过，其他return结果就是错误
  if (!value?.trim().length) return '请输入账号'
  // 账号合法性 字母开头 5~15位
  if (!/^[a-zA-Z]\w{4,14}$/.test(value)) return '账号必须字母开头，包含字母，数字，5-15位'
  return true
}
export function passwordRule(value: string) {
  if (!value?.trim().length) return '请输入密码'
  // 密码 6-20位
  if (!/^\w{6,20}$/.test(value)) return '密码必须6-20位'
  return true
}
export function isAgreeRule(value: boolean) {
  // 父组件接受到子组件发过来的是否同意该协议的状态，然后根据该状态发送登录请求
  if (!value) return '请同意该协议'
  return true
}
export function mobileRule(value: string) {
  if (!value?.trim().length) return '请输入手机号'
  if (!/^1[3-9]\d{9}$/.test(value)) return '请输入11位手机号'
  return true
}
export function codeRule(value: string) {
  if (!value?.trim().length) return '请输入验证码'
  if (!/^\d{6}$/.test(value)) return '验证码格式错误'
  return true
}
export function rePasswordRule(value: string, { form }: any) {
  // form是一个对象，包含了所有的登录信息
  
  if (!value) return '请输入确认密码'
  if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
  // 校验密码是否一致  form表单数据对象
  if (value !== form.password) return '两次输入的密码不一致'
  return true
}