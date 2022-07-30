// h函数和render函数 可以将一个虚拟DOM对象挂载到真实DOM结构中
// h函数能创建一个VNode虚拟DOM，也叫createVNode, 别名 h函数
import { h, onMounted, render } from 'vue'
import XtxMessage from '@/components/message/index.vue'
type ParamType = {
  type: 'success' | 'error' | 'warning'
  message: string
}
// 自己创建一个盛放消息提示的父容器，并追加到body中
const messageContainer = document.createElement('div')
messageContainer.className = 'messageContainer'
document.body.appendChild(messageContainer)
function Message ({ type, message }: ParamType) {
  const VNode = h(XtxMessage, { type, message })
  // console.log(VNode)
  // 创建消息提示组件，并追加到body中
  render(VNode, messageContainer)

  // 等待一段时间，移除消息提示
  setTimeout(() => {
    // render(null, messageContainer)
  }, 2000)

}
Message.success = (message: string) => {
  Message({type: 'success', message})
}
Message.error = (message: string) => {
  Message({type: 'error', message})
}
Message.warning = (message: string) => {
  Message({type: 'warning', message})
}

export default Message