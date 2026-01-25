import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Contatti from '@/views/Contatti.vue'
import ListaNozze from "@/views/ListaNozze.vue";
import DoveAlloggiare from "@/views/DoveAlloggiare.vue";
import Cerimonia from '@/views/Cerimonia.vue';
import Storia from '@/views/NostraStoria.vue'
import Ricevimento from '@/views/Ricevimento.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/storia', component: Storia},
  { path: '/contatti', component: Contatti },
  { path: '/ricevimento', component: Ricevimento },
  { path: '/listanozze', component: ListaNozze },
  { path: '/alloggio', component: DoveAlloggiare },
  { path: '/cerimonia', component: Cerimonia},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})