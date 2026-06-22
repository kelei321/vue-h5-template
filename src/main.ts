import 'vant/es/toast/style'
import './styles/tailwind.css'
import './styles/index.scss'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import { setupDirectives } from './directives'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
setupDirectives(app)
app.mount('#app')
