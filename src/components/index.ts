// 统一的注册所有的全局组件  （使用的是Vue的插件机制）
// 需要导出一个对象或者一个函数，如果是一个函数，则需要提供Install方法
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import Xtxmore from '@/components/more/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
import { App } from 'vue'
export default {
  // 既可以在install函数中注册全局组件，也可以注册全局指令
  install(app: App) {
    // app如果实在不知道是什么类型，直接写any
    // 其实Vue提供app实例类型 ---- App(需要单独导入)
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(Xtxmore.name, Xtxmore)
    app.directive('lazy', {
      mounted(el, binding) {
        // binding.value  图片的地址
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if ( isIntersecting ) {
          el.src = binding.value
          stop()
          // 如果图片失败了，加载默认图片
          el.onerror = () => {
            el.src = defaultImg
          }
        }
        })
    }
  })
  }
}