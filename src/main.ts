import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from './http'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from 'mitt'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

// 全局挂载axios
app.config.globalProperties.$axios = axios
app.config.globalProperties.$bus = mitt();
