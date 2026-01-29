<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button @click="closeModal" class="close-btn" aria-label="Chiudi">
            <FontAwesomeIcon :icon="faTimes" />
          </button>
          
          <div class="modal-content">
            <!-- Photo Section -->
            <div class="photo-section">
              <div class="photo-wrapper">
                <img :src="photo.photo" :alt="photo.title" class="main-photo" />
              </div>
              
              <!-- Navigation arrows on photo -->
              <button 
                v-if="hasPrev" 
                @click="$emit('prev')" 
                class="nav-btn prev"
                aria-label="Foto precedente"
              >
                <FontAwesomeIcon :icon="faChevronLeft" />
              </button>
              <button 
                v-if="hasNext" 
                @click="$emit('next')" 
                class="nav-btn next"
                aria-label="Foto successiva"
              >
                <FontAwesomeIcon :icon="faChevronRight" />
              </button>
            </div>
            
            <!-- Info Section -->
            <div class="info-section">
              <div class="info-content">
                <h2>{{ photo.title }}</h2>
                <div class="meta-row">
                  <p class="location">
                    <FontAwesomeIcon :icon="faMapMarkerAlt" />
                    {{ photo.location }}
                  </p>
                  <p class="date">
                    <FontAwesomeIcon :icon="faCalendar" />
                    {{ photo.date }}
                  </p>
                </div>
              </div>
              
              <!-- Photo counter -->
              <div class="photo-counter" v-if="hasPrev || hasNext">
                <button 
                  class="counter-nav" 
                  :disabled="!hasPrev"
                  @click="$emit('prev')"
                >
                  <FontAwesomeIcon :icon="faChevronLeft" />
                </button>
                <span>Scorri le foto</span>
                <button 
                  class="counter-nav" 
                  :disabled="!hasNext"
                  @click="$emit('next')"
                >
                  <FontAwesomeIcon :icon="faChevronRight" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTimes, 
  faChevronLeft, 
  faChevronRight, 
  faMapMarkerAlt,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  photo: {
    type: Object,
    required: true
  },
  hasPrev: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'prev', 'next'])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Handle keyboard navigation
const handleKeydown = (e) => {
  if (!props.modelValue) return
  
  if (e.key === 'Escape') {
    closeModal()
  } else if (e.key === 'ArrowLeft' && props.hasPrev) {
    emit('prev')
  } else if (e.key === 'ArrowRight' && props.hasNext) {
    emit('next')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modalZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalZoom {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
}

/* Desktop: side-by-side layout */
@media screen and (min-width: 769px) {
  .modal-content {
    grid-template-columns: 1.4fr 1fr;
    max-height: 80vh;
  }
}

/* Photo Section */
.photo-section {
  position: relative;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

.photo-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-photo {
  width: 100%;
  height: 100%;
  max-height: 55vh;
  object-fit: contain;
  display: block;
}

@media screen and (min-width: 769px) {
  .main-photo {
    max-height: 80vh;
  }
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  background: var(--ivory);
  overflow-y: auto;
}

.info-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 769px) {
  .info-content {
    padding: 2rem;
    justify-content: center;
  }
}

.info-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
  line-height: 1.2;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}

.location,
.date {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--stone-gray);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.location svg,
.date svg {
  color: var(--wine-burgundy);
  font-size: 0.85rem;
}

.description {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-dark);
  margin: 0;
}

@media screen and (min-width: 769px) {
  .description {
    font-size: 1.05rem;
    margin-top: 0.5rem;
  }
}

/* Photo Counter / Navigation */
.photo-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--champagne);
  border-top: 1px solid rgba(107, 28, 35, 0.1);
}

.photo-counter span {
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: var(--stone-gray);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.counter-nav {
  width: 36px;
  height: 36px;
  background: var(--wine-burgundy);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.counter-nav:hover:not(:disabled) {
  background: var(--terracotta);
  transform: scale(1.1);
}

.counter-nav:disabled {
  background: rgba(107, 28, 35, 0.3);
  cursor: not-allowed;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 44px;
  height: 44px;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: 3px solid var(--ivory);
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.close-btn:hover {
  background: var(--terracotta);
  transform: rotate(90deg) scale(1.1);
}

/* Navigation Arrows on Photo */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev {
  left: 0.75rem;
}

.nav-btn.next {
  right: 0.75rem;
}

/* Hide photo nav arrows on mobile, use bottom bar instead */
@media screen and (max-width: 768px) {
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 0.95rem;
  }
  
  .nav-btn.prev {
    left: 0.5rem;
  }
  
  .nav-btn.next {
    right: 0.5rem;
  }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Small Mobile */
@media screen and (max-width: 480px) {
  .modal-overlay {
    padding: 0.75rem;
  }
  
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-content {
    border-radius: 12px;
  }
  
  .main-photo {
    max-height: 45vh;
  }
  
  .info-content {
    padding: 1.25rem;
  }
  
  .info-content h2 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
  
  .meta-row {
    gap: 0.4rem 1rem;
    margin-bottom: 0.75rem;
  }
  
  .location,
  .date {
    font-size: 0.85rem;
  }
  
  .description {
    font-size: 0.9rem;
    line-height: 1.55;
  }
  
  .photo-counter {
    padding: 0.75rem 1rem;
  }
  
  .close-btn {
    width: 38px;
    height: 38px;
    font-size: 1rem;
    top: -0.4rem;
    right: -0.4rem;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>
