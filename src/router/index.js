import { createRouter, createWebHistory } from 'vue-router'

// Eager load Home page for instant display
import Home from '@/views/Home.vue'

// Lazy load other pages for better performance
const Contatti = () => import('@/views/Contatti.vue')
const ListaNozze = () => import('@/views/ListaNozze.vue')
const DoveAlloggiare = () => import('@/views/DoveAlloggiare.vue')
const Cerimonia = () => import('@/views/Cerimonia.vue')
const Storia = () => import('@/views/NostraStoria.vue')
const Ricevimento = () => import('@/views/Ricevimento.vue')

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: {
      title: 'Carlo & Francesca - 11 Luglio 2026',
      description: 'Matrimonio di Carlo Musso e Francesca Savoia al Castello di Oviglio'
    }
  },
  { 
    path: '/storia', 
    component: Storia,
    meta: {
      title: 'La Nostra Storia | Carlo & Francesca',
      description: 'Il viaggio d\'amore di Carlo e Francesca attraverso i ricordi più belli'
    }
  },
  { 
    path: '/contatti', 
    component: Contatti,
    meta: {
      title: 'Contatti | Carlo & Francesca',
      description: 'Contatti degli sposi e dei testimoni per informazioni sul matrimonio'
    }
  },
  { 
    path: '/ricevimento', 
    component: Ricevimento,
    meta: {
      title: 'Ricevimento | Carlo & Francesca',
      description: 'Castello di Oviglio - Una location storica nel cuore del Monferrato'
    }
  },
  { 
    path: '/listanozze', 
    component: ListaNozze,
    meta: {
      title: 'Lista Nozze | Carlo & Francesca',
      description: 'Lista nozze e viaggio di nozze in Nuova Zelanda e Fiji'
    }
  },
  { 
    path: '/alloggio', 
    component: DoveAlloggiare,
    meta: {
      title: 'Dove Alloggiare | Carlo & Francesca',
      description: 'Consigli per l\'alloggio nelle vicinanze del castello'
    }
  },
  { 
    path: '/cerimonia', 
    component: Cerimonia,
    meta: {
      title: 'Cerimonia | Carlo & Francesca',
      description: 'Informazioni utili sul matrimonio: programma, dress code, e dettagli pratici'
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on navigation
    return { top: 0, left: 0 }
  }
})

// Force scroll to top on initial load and every navigation
router.beforeEach(() => {
  window.scrollTo(0, 0)
})

// Update document title and meta description on route change
router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  
  if (to.meta?.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = to.meta.description
  }
})