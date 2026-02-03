<template>
  <div class="honeymoon-sequence">
    <div class="sequence-visual">
      <!-- Scene container that pops out above -->
      <div class="scene-container">
        <Transition name="scene-fade" mode="out-in">
          <component :is="currentScene" :key="currentStop.id" />
        </Transition>
      </div>
      
      <div class="map-silhouette" aria-hidden="true"></div>
      <div class="route-line" aria-hidden="true"></div>
      <div class="route-dots" aria-hidden="true">
        <span
          v-for="(stop, index) in stops"
          :key="stop.id"
          :class="['route-dot', { active: index === currentIndex, done: index < currentIndex }]"
          :style="{ left: `${(index / (stops.length - 1)) * 100}%` }"
        ></span>
      </div>
      <div class="plane" :style="{ left: planePosition }">
        <FontAwesomeIcon :icon="faPlane" />
      </div>
    </div>

    <Transition name="fade-slide" mode="out-in">
      <div :key="currentStop.id" class="sequence-card">
        <p class="sequence-eyebrow">Tappa {{ currentIndex + 1 }} di {{ stops.length }}</p>
        <h3 class="sequence-title">{{ currentStop.title }}</h3>
        <p class="sequence-location">
          <FontAwesomeIcon :icon="faLocationDot" />
          {{ currentStop.location }}
        </p>
        <p class="sequence-description">{{ currentStop.description }}</p>
      </div>
    </Transition>

    <div class="sequence-controls">
      <button class="control-btn" @click="prev" aria-label="Tappa precedente">
        <FontAwesomeIcon :icon="faChevronLeft" />
      </button>
      <button class="control-btn" @click="toggle" aria-label="Pausa o riprendi">
        <FontAwesomeIcon :icon="isPlaying ? faPause : faPlay" />
      </button>
      <button class="control-btn" @click="next" aria-label="Tappa successiva">
        <FontAwesomeIcon :icon="faChevronRight" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, markRaw } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlane,
  faLocationDot,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { MilanScene, NewZealandScene, FijiScene } from '@/components/scenes'

const props = defineProps({
  stops: {
    type: Array,
    required: true
  },
  intervalMs: {
    type: Number,
    default: 3200
  }
})

// Map stop IDs to scene components
const sceneMap = {
  1: markRaw(MilanScene),      // Partenza da Milano
  2: markRaw(NewZealandScene), // Nuova Zelanda
  3: markRaw(FijiScene),       // Fiji
  4: markRaw(MilanScene)       // Ritorno a Milano
}

const currentIndex = ref(0)
const isPlaying = ref(true)
let timer = null

const currentStop = computed(() => props.stops[currentIndex.value] || props.stops[0])
const currentScene = computed(() => sceneMap[currentStop.value.id] || MilanScene)

// Calculate plane position to align with route dots (accounting for 10% padding on each side)
const planePosition = computed(() => {
  const progress = currentIndex.value / (props.stops.length - 1)
  // Route dots span from 10% to 90% of the container width
  const leftOffset = 10 + progress * 80
  return `${leftOffset}%`
})

const start = () => {
  if (timer) return
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.stops.length
  }, props.intervalMs)
}

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const toggle = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    start()
  } else {
    stop()
  }
}

const next = () => {
  stop()
  isPlaying.value = false
  currentIndex.value = (currentIndex.value + 1) % props.stops.length
}

const prev = () => {
  stop()
  isPlaying.value = false
  currentIndex.value = (currentIndex.value - 1 + props.stops.length) % props.stops.length
}

onMounted(() => {
  if (props.stops.length > 1) {
    start()
  }
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.honeymoon-sequence {
  display: grid;
  gap: 1.5rem;
}

.sequence-visual {
  position: relative;
  background: linear-gradient(135deg, rgba(244, 235, 217, 0.9), rgba(255, 254, 242, 0.9));
  border-radius: 16px;
  padding: 2.5rem 2rem;
  padding-top: 180px; /* Make room for scene */
  overflow: visible;
  min-height: 280px;
}

/* Scene container - pops out above the box */
.scene-container {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  max-width: 380px;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    0 10px 40px rgb(220, 238, 245, 0.95),
    0 4px 12px rgb(220, 238, 245, 0.95);
  border: 3px solid var(--textcolor);
}

.scene-container > * {
  width: 100%;
  height: 100%;
}

/* Scene fade transition */
.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.scene-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scene-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.map-silhouette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(92, 147, 169, 0.25), transparent 45%),
  radial-gradient(circle at 70% 60%, rgb(220, 238, 245, 0.25), transparent 50%);
  opacity: 0.6;
}

.route-line {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 2.5rem;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(23, 133, 176, 0.95) 0%, 
    rgba(119, 187, 214, 0.95) 50%, 
    rgb(220, 238, 245, 0.95) 100%);
  border-radius: 2px;
}

.route-dots {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: calc(2.5rem + 1.5px); /* Center on the 3px line */
  height: 0;
}

.route-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgb(220, 238, 245, 0.95);
  border: 2px solid rgba(13, 86, 115, 0.95);
  transform: translate(-50%, 50%); /* Center horizontally and vertically on the line */
  transition: all 0.4s ease;
}

.route-dot.done {
  background: var(--textcolor);
  border-color: white;
}

.route-dot.active {
  width: 18px;
  height: 18px;
  background: var(--textcolor);
  border-color: white;
  box-shadow: 0 0 0 6px rgb(220, 238, 245, 0.15);
}

.plane {
  position: absolute;
  bottom: calc(2.5rem + 8px);
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--textcolor);
  font-size: 1.1rem;
  box-shadow: 
    0 6px 20px rgb(220, 238, 245, 0.15),
    0 3px 6px rgb(220, 238, 245, 0.15);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.sequence-card {
  background: var(--ivory);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.sequence-eyebrow {
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  color: var(--stone-gray);
  margin: 0 0 0.5rem;
}

.sequence-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--wine-burgundy);
  margin: 0 0 0.5rem;
}

.sequence-location {
  font-family: 'Lato', sans-serif;
  color: var(--stone-gray);
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.sequence-description {
  font-family: 'Lato', sans-serif;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.6;
}

.sequence-controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.control-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--wine-burgundy);
  color: var(--text-light);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.control-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 768px) {
  .sequence-visual {
    padding: 2rem 1.5rem;
    padding-top: 160px;
    min-height: 260px;
  }

  .scene-container {
    top: -15px;
    width: 90%;
    height: 140px;
  }

  .sequence-card {
    padding: 1.5rem;
  }
  
  .route-line {
    bottom: 2rem;
  }
  
  .route-dots {
    bottom: calc(2rem + 1.5px);
  }
  
  .plane {
    bottom: calc(2rem + 8px);
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .sequence-visual {
    padding: 1.5rem 1rem;
    padding-top: 140px;
    min-height: 240px;
  }

  .scene-container {
    top: -10px;
    width: 92%;
    height: 120px;
    border-width: 2px;
  }

  .plane {
    width: 36px;
    height: 36px;
    bottom: calc(1.5rem + 6px);
    font-size: 0.9rem;
  }
  
  .route-line {
    bottom: 1.5rem;
  }
  
  .route-dots {
    bottom: calc(1.5rem + 1.5px);
  }

  .control-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
