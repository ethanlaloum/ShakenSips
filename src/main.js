import './assets/style.css'
import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
// import 'bootstrap/dist/css/bootstrap.min.css'


createApp(App).use(router).mount('#app')

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
}
