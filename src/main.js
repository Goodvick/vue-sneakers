import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import HomeView from "./pages/HomeView.vue"
import FavoritesView from "./pages/FavoritesView.vue"

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
]

const router = createRouter({
  history: createWebHistory(`https://goodvick.github.io/Vue-Sneakers/`),
  routes,
})


const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
