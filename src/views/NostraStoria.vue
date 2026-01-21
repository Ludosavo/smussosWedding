<template>
  <div class="nostra-storia">
    <PageHero
      title="La Nostra Storia"
      subtitle="Un viaggio d'amore attraverso i ricordi più belli"
    />

    <!-- View Toggle -->
    <div class="view-toggle">
      <button 
        :class="{ active: activeView === 'map' }" 
        @click="activeView = 'map'"
        class="toggle-button"
      >
        <FontAwesomeIcon :icon="faMap" />
        Mappa dei Ricordi
      </button>
      <button 
        :class="{ active: activeView === 'timeline' }" 
        @click="activeView = 'timeline'"
        class="toggle-button"
      >
        <FontAwesomeIcon :icon="faClock" />
        Timeline
      </button>
    </div>

    <!-- Map View -->
    <div v-show="activeView === 'map'" class="map-view">
      <div class="map-legend">
        <p>
          <FontAwesomeIcon :icon="faCamera" class="legend-icon" />
          Clicca sui marcatori per vedere le foto
        </p>
      </div>
      <PhotoMap 
        :photos="photoLocations" 
        @photo-selected="openPhoto"
      />
    </div>

    <!-- Timeline View -->
    <div v-show="activeView === 'timeline'" class="timeline-view">
      <TimelineView 
        :events="timeline" 
        @photo-selected="openPhoto"
      />
    </div>

    <!-- Photo Modal -->
    <PhotoModal
      v-model="showModal"
      :photo="currentPhoto"
      :has-prev="hasPrev"
      :has-next="hasNext"
      @prev="navigatePrev"
      @next="navigateNext"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMap, faClock, faCamera } from '@fortawesome/free-solid-svg-icons'
import PhotoMap from '@/components/PhotoMap.vue'
import PhotoModal from '@/components/PhotoModal.vue'
import TimelineView from '@/components/TimelineView.vue'
import PageHero from '@/components/PageHero.vue'
import { photoLocations, timeline } from '@/data/photoGallery.js'

// View state
const activeView = ref('map')
const showModal = ref(false)
const currentPhotoIndex = ref(0)

// Current photo data
const currentPhoto = computed(() => {
  return timeline[currentPhotoIndex.value]
})

// Navigation helpers
const hasPrev = computed(() => currentPhotoIndex.value > 0)
const hasNext = computed(() => currentPhotoIndex.value < timeline.length - 1)

// Functions
function openPhoto(photoId) {
  const index = timeline.findIndex(p => p.id === photoId)
  if (index !== -1) {
    currentPhotoIndex.value = index
    showModal.value = true
  }
}

function closeModal() {
  showModal.value = false
}

function navigatePrev() {
  if (hasPrev.value) {
    currentPhotoIndex.value--
  }
}

function navigateNext() {
  if (hasNext.value) {
    currentPhotoIndex.value++
  }
}
</script>

<style scoped>
.nostra-storia {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--champagne) 0%, var(--ivory) 100%);
}


.view-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.toggle-button {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: 2px solid var(--wine-burgundy);
  background: white;
  color: var(--wine-burgundy);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button:hover {
  background: var(--champagne);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 28, 35, 0.2);
}

.toggle-button.active {
  background: var(--wine-burgundy);
  color: white;
}

.toggle-button svg {
  font-size: 1.1rem;
}

.map-view,
.timeline-view {
  min-height: 60vh;
  padding-bottom: 2rem;
}

.map-legend {
  text-align: center;
  padding: 1.5rem;
  background: rgba(107, 28, 35, 0.05);
  margin: 0 auto;
  max-width: 1200px;
}

.map-legend p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--wine-burgundy);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
}

.legend-icon {
  font-size: 1.2rem;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .view-toggle {
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 0.75rem;
  }

  .toggle-button {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }

  .map-legend {
    padding: 1rem;
  }

  .map-legend p {
    font-size: 0.9rem;
  }

  .map-view,
  .timeline-view {
    padding-bottom: 2.5rem;
  }
}

@media screen and (max-width: 480px) {
  .toggle-button {
    font-size: 0.95rem;
    padding: 0.875rem;
  }

  .map-view,
  .timeline-view {
    padding-bottom: 3rem;
  }
}
</style>
