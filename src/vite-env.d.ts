/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为qc中时用到的方法添加类型注解
declare namespace QC {
  const Login: {
    signOut: () => void
    check: () => boolean
    getMe(fn: (openId: string, accessToken: string) => void) : void
  }
  const api: (str: string)=> {success: (res: any) => void}
}
