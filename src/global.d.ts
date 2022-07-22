// vue3 + vite + ts 抽离注册为全局组件后，组件没有了类型的校验提示
// 目前使用这种方式解决

import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
// 参考：https://stackoverflow.com/questions/69010567
declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
  }
}
export {}