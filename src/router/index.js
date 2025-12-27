import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Contatti from '@/views/Contatti.vue'
import ListaNozze from "@/views/ListaNozze.vue";
import DoveAlloggiare from "@/views/DoveAlloggiare.vue";
import InfoUtili from '@/views/InfoUtili.vue';
import Storia from '@/views/NostraStoria.vue'
import Location from '@/views/Location.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/storia', component: Storia},
  { path: '/contatti', component: Contatti },
  { path: '/location', component: Location },
  { path: '/listanozze', component: ListaNozze },
  { path: '/alloggio', component: DoveAlloggiare },
  { path: '/infoUtili', component: InfoUtili},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})