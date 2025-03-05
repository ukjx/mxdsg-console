import { createApp } from 'vue'
import './assets/index.css'
import './assets/global.css';
import app from './app.vue'
import router from './router.ts'

createApp(app).use(router).mount('#app')
