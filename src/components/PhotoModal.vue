<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button @click="closeModal" class="close-btn" aria-label="Chiudi">
            <FontAwesomeIcon :icon="faTimes" />
          </button>
          
          <div class="photo-viewer">
            <img :src="photo.photo" :alt="photo.title" class="main-photo" />
            
            <div class="photo-info">
              <h2>{{ photo.title }}</h2>
              <p class="location">
                <FontAwesomeIcon :icon="faMapMarkerAlt" />
                {{ photo.location }}
              </p>
              <p class="date">{{ photo.date }}</p>
              <p class="description">{{ photo.description }}</p>
            </div>
            
            <!-- Navigation arrows -->
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTimes, 
  faChevronLeft, 
  faChevronRight, 
  faMapMarkerAlt 
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
if (typeof window !== 'undefined') {
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
  
  window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  animation: modalZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalZoom {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.photo-viewer {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--text-dark);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
}

.main-photo {
  width: 100%;
  max-width: 1200px;
  max-height: 70vh;
  object-fit: contain;
  display: block;
  background: #000;
}

.photo-info {
  background: var(--champagne);
  padding: 2rem;
  color: var(--text-dark);
}

.photo-info h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.location {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: var(--stone-gray);
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location svg {
  color: var(--wine-burgundy);
}

.date {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-dark);
  font-style: italic;
  margin: 0.5rem 0 1rem;
}

.description {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 0;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 50%;
  font-size: 1.8rem;
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

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: rgba(107, 28, 35, 0.8);
  color: var(--text-light);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-btn:hover {
  background: var(--wine-burgundy);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev {
  left: 1.5rem;
}

.nav-btn.next {
  right: 1.5rem;
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

/* Responsive */
@media screen and (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
  }
  
  .main-photo {
    max-height: 60vh;
  }
  
  .photo-info {
    padding: 1.5rem;
  }
  
  .photo-info h2 {
    font-size: 1.5rem;
  }
  
  .close-btn {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
    top: 0.75rem;
    right: 0.75rem;
  }
  
  .nav-btn {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .nav-btn.prev {
    left: 0.75rem;
  }
  
  .nav-btn.next {
    right: 0.75rem;
  }
}

@media screen and (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .main-photo {
    max-height: 50vh;
  }
  
  .photo-info {
    padding: 1rem;
  }
  
  .description {
    font-size: 0.9rem;
  }
  
  .nav-btn {
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
  
  .nav-btn.prev {
    left: 0.5rem;
  }
  
  .nav-btn.next {
    right: 0.5rem;
  }
}
</style>
