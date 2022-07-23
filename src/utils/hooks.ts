// 自定义一些通用的compositions api
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
import { threadId } from 'worker_threads'

// 封装通用的数据懒加载api
export function useLazyData(apiFn: () => void) {
  // 通过 ref 获得组件实例
  const target = ref(null)
  /* 
    1. target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
    2. isIntersecting 是否进入可视区域，true是进入 false是移出
    3. observerElement 被观察的dom
  */
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 在此处可根据isIntersecting来判断，然后做业务
      if (isIntersecting) {
        stop()
        apiFn()
      }
    },
    {
      // threshold 这个属性是配置 何时去触发加载， 值是0-1之间的一个值，默认是0.3
      threshold: 0 // 只要是目标元素进入可视区就发送请求，值越大，发送请求越晚/
    }
  )
  return target // 就是空的ref对象，要和组件中的dom进行绑定
} 