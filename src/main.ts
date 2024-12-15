import { createApp } from 'vue'
// import './style.css'
import './assets/index.css'
import App from './app.vue'
import router from './router.ts'

createApp(App).use(router).mount('#app')
