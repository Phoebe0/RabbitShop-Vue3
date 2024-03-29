import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router/index'
import { createPinia } from 'pinia'
import XtxUI from '@/components/index'


createApp(App)
.use(router)
.use(createPinia())
.use(XtxUI)
.mount('#app')
