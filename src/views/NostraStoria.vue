<template>
  <div class="nostra-storia">
    <!-- Header Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="page-title">La Nostra Storia</h1>
        <p class="page-subtitle">
          Un viaggio d'amore attraverso i ricordi più belli
        </p>
      </div>
    </section>

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

.hero-section {
  padding: 4rem 2rem 2rem;
  text-align: center;
  background: linear-gradient(to bottom, var(--wine-burgundy), var(--terracotta));
  color: var(--text-light);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.page-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-style: italic;
  margin: 0;
  opacity: 0.95;
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
  .hero-section {
    padding: 3rem 1.5rem 1.5rem;
  }

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
}

@media screen and (max-width: 480px) {
  .hero-section {
    padding: 2.5rem 1rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .toggle-button {
    font-size: 0.95rem;
    padding: 0.875rem;
  }
}
</style>
