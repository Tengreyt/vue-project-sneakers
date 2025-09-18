import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import router from './router' 

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(autoAnimatePlugin)

app.mount('#app')
