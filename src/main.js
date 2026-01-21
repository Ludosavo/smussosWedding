import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')

// Ensure page starts at top on initial load
window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
