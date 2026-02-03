<template>
  <div class="nostra-storia">
    <PageHero
      title="La Nostra Storia"
    />

    <div class="timeline-view">
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
import PhotoModal from '@/components/PhotoModal.vue'
import TimelineView from '@/components/TimelineView.vue'
import PageHero from '@/components/PageHero.vue'
import { photoLocations, timeline } from '@/data/photoGallery.js'

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
  font-family: "Playwrite NZ Basic", sans-serif;
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
