<template>
  <div class="photo-map-container">
    <!-- Mobile photo list toggle -->
    <button 
      class="mobile-list-toggle" 
      @click="showMobileList = !showMobileList"
      :class="{ active: showMobileList }"
    >
      <FontAwesomeIcon :icon="showMobileList ? faMap : faImages" />
      {{ showMobileList ? 'Mappa' : 'Lista Foto' }}
    </button>

    <!-- Map -->
    <div 
      ref="mapEl" 
      class="photo-map"
      :class="{ 'map-hidden': showMobileList }"
    ></div>

    <!-- Mobile Photo List -->
    <div class="mobile-photo-list" :class="{ visible: showMobileList }">
      <div class="photo-list-grid">
        <button
          v-for="photo in photos"
          :key="photo.id"
          class="photo-list-item"
          @click="selectPhoto(photo)"
        >
          <img :src="photo.thumb || photo.photo" :alt="photo.title" loading="lazy" />
          <div class="photo-list-info">
            <h4>{{ photo.title }}</h4>
            <p>{{ photo.location }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Desktop sidebar with photo thumbnails -->
    <div class="photo-sidebar">
      <h3>
        <FontAwesomeIcon :icon="faCamera" />
        I Nostri Ricordi
      </h3>
      <div class="sidebar-photos">
        <button
          v-for="photo in photos"
          :key="photo.id"
          class="sidebar-photo-item"
          :class="{ active: selectedPhotoId === photo.id }"
          @click="focusOnPhoto(photo)"
        >
          <img :src="photo.thumb || photo.photo" :alt="photo.title" loading="lazy" />
          <span class="photo-title">{{ photo.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMap, faImages, faCamera } from '@fortawesome/free-solid-svg-icons'

// Fix Leaflet icon paths for Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['photo-selected'])

const mapEl = ref(null)
const showMobileList = ref(false)
const selectedPhotoId = ref(null)
let map = null
let markers = {}

// Create custom marker with photo thumbnail
const createPhotoIcon = (photo, isActive = false) => {
  const size = isActive ? 56 : 44
  const thumbSrc = photo.thumb || photo.photo
  return L.divIcon({
    className: `photo-marker ${isActive ? 'active' : ''}`,
    html: `
      <div class="marker-wrapper" style="width: ${size}px; height: ${size}px;">
        <img src="${thumbSrc}" alt="${photo.title}" />
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -size - 8]
  })
}

// Focus map on a specific photo
const focusOnPhoto = (photo) => {
  if (!map) return
  
  selectedPhotoId.value = photo.id
  
  // Update all marker icons
  Object.entries(markers).forEach(([id, marker]) => {
    const p = props.photos.find(ph => ph.id === parseInt(id))
    if (p) {
      marker.setIcon(createPhotoIcon(p, p.id === photo.id))
    }
  })
  
  // Pan to the photo location and open popup
  map.flyTo([photo.lat, photo.lng], 10, { duration: 0.8 })
  
  setTimeout(() => {
    markers[photo.id]?.openPopup()
  }, 400)
}

// Select photo and emit event
const selectPhoto = (photo) => {
  showMobileList.value = false
  focusOnPhoto(photo)
  emit('photo-selected', photo.id)
}

onMounted(() => {
  if (!mapEl.value) return
  
  // Initialize map centered on Italy
  map = L.map(mapEl.value, {
    center: [45.0, 9.0],
    zoom: 6,
    minZoom: 3,
    maxZoom: 18,
    scrollWheelZoom: true,
    tap: true,
    touchZoom: true,
    dragging: true
  })
  
  // Add beautiful tile layer (Carto Voyager - cleaner look)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map)
  
  // Add markers for each photo location
  const bounds = []
  
  props.photos.forEach(photo => {
    const marker = L.marker([photo.lat, photo.lng], { 
      icon: createPhotoIcon(photo)
    })
    
    // Create popup content
    const popupContent = `
      <div class="photo-popup">
        <img src="${photo.photo}" alt="${photo.title}" />
        <div class="popup-content">
          <h4>${photo.title}</h4>
          <p class="popup-location">${photo.location}</p>
          <p class="popup-date">${photo.date}</p>
          <p class="popup-desc">${photo.description}</p>
        </div>
      </div>
    `
    
    marker.bindPopup(popupContent, {
      maxWidth: 280,
      minWidth: 220,
      className: 'custom-popup',
      closeButton: true,
      autoPan: true,
      autoPanPadding: [50, 50]
    })
    
    // Handle marker click
    marker.on('click', () => {
      selectedPhotoId.value = photo.id
      
      // Update all marker icons to show active state
      Object.entries(markers).forEach(([id, m]) => {
        const p = props.photos.find(ph => ph.id === parseInt(id))
        if (p) {
          m.setIcon(createPhotoIcon(p, p.id === photo.id))
        }
      })
    })
    
    // Double click to open full photo
    marker.on('dblclick', () => {
      emit('photo-selected', photo.id)
    })
    
    // Handle popup open
    marker.on('popupopen', () => {
      // Add click handler to popup image for opening modal
      setTimeout(() => {
        const popupImg = document.querySelector('.photo-popup img')
        if (popupImg) {
          popupImg.style.cursor = 'pointer'
          popupImg.onclick = () => emit('photo-selected', photo.id)
        }
      }, 100)
    })
    
    marker.addTo(map)
    markers[photo.id] = marker
    bounds.push([photo.lat, photo.lng])
  })
  
  // Fit map to show all markers with good padding
  if (bounds.length > 0) {
    map.fitBounds(bounds, { 
      padding: [60, 60],
      maxZoom: 8
    })
  }
  
  // Handle window resize
  const handleResize = () => {
    map.invalidateSize()
  }
  window.addEventListener('resize', handleResize)
})

// Watch for mobile list toggle to invalidate map size
watch(showMobileList, () => {
  setTimeout(() => {
    map?.invalidateSize()
  }, 300)
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.photo-map-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 1rem;
  height: 520px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--champagne);
}

.photo-map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid rgba(107, 28, 35, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.map-hidden {
  opacity: 0;
  pointer-events: none;
}

/* Desktop Sidebar */
.photo-sidebar {
  display: flex;
  flex-direction: column;
  background: var(--ivory);
  border-radius: 12px;
  padding: 1rem;
  border: 2px solid rgba(107, 28, 35, 0.15);
  overflow: hidden;
}

.photo-sidebar h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(107, 28, 35, 0.15);
}

.sidebar-photos {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.25rem;
}

.sidebar-photos::-webkit-scrollbar {
  width: 4px;
}

.sidebar-photos::-webkit-scrollbar-thumb {
  background: rgba(107, 28, 35, 0.3);
  border-radius: 4px;
}

.sidebar-photo-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
}

.sidebar-photo-item:hover {
  background: rgba(107, 28, 35, 0.08);
  border-color: rgba(107, 28, 35, 0.2);
}

.sidebar-photo-item.active {
  background: rgba(107, 28, 35, 0.12);
  border-color: var(--wine-burgundy);
}

.sidebar-photo-item img {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.sidebar-photo-item .photo-title {
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  color: var(--text-dark);
  line-height: 1.3;
}

/* Mobile list toggle button */
.mobile-list-toggle {
  display: none;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1000;
  background: var(--wine-burgundy);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(107, 28, 35, 0.3);
  transition: all 0.25s ease;
  gap: 0.5rem;
  align-items: center;
}

.mobile-list-toggle:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.mobile-list-toggle.active {
  background: var(--terracotta);
}

/* Mobile Photo List */
.mobile-photo-list {
  display: none;
  position: absolute;
  inset: 0;
  background: var(--champagne);
  z-index: 500;
  overflow-y: auto;
  padding: 4rem 1rem 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-photo-list.visible {
  opacity: 1;
  pointer-events: auto;
}

.photo-list-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.photo-list-item {
  background: var(--ivory);
  border: none;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.photo-list-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.photo-list-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.photo-list-info {
  padding: 0.6rem;
}

.photo-list-info h4 {
  font-family: 'Playfair Display', serif;
  font-size: 0.9rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.2rem;
}

.photo-list-info p {
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  color: var(--stone-gray);
  margin: 0;
}

/* Custom marker styling */
:deep(.photo-marker) {
  background: none !important;
  border: none !important;
}

:deep(.marker-wrapper) {
  background: white;
  border: 3px solid var(--wine-burgundy);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

:deep(.marker-wrapper img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.photo-marker:hover .marker-wrapper) {
  transform: scale(1.15);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

:deep(.photo-marker.active .marker-wrapper) {
  border-color: var(--terracotta);
  border-width: 4px;
  box-shadow: 0 6px 20px rgba(196, 93, 63, 0.4);
}

/* Custom popup styling */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: var(--ivory);
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 0;
  width: 260px !important;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: var(--ivory);
}

:deep(.custom-popup .leaflet-popup-close-button) {
  color: var(--wine-burgundy) !important;
  font-size: 20px !important;
  padding: 8px !important;
}

:deep(.photo-popup) {
  padding: 0;
}

:deep(.photo-popup img) {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s ease;
}

:deep(.photo-popup img:hover) {
  opacity: 0.9;
}

:deep(.popup-content) {
  padding: 0.9rem;
}

:deep(.photo-popup h4) {
  font-family: 'Playfair Display', serif;
  color: var(--wine-burgundy);
  font-size: 1.15rem;
  margin: 0 0 0.4rem;
  font-weight: 600;
}

:deep(.photo-popup .popup-location) {
  font-family: 'Lato', sans-serif;
  color: var(--stone-gray);
  font-size: 0.85rem;
  margin: 0 0 0.25rem;
}

:deep(.photo-popup .popup-date) {
  font-family: 'Lato', sans-serif;
  color: var(--terracotta);
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

:deep(.photo-popup .popup-desc) {
  font-family: 'Lato', sans-serif;
  color: var(--text-dark);
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
}

/* Responsive - Tablet */
@media screen and (max-width: 900px) {
  .photo-map-container {
    grid-template-columns: 1fr 180px;
    height: 480px;
  }
  
  .sidebar-photo-item img {
    width: 38px;
    height: 38px;
  }
  
  .sidebar-photo-item .photo-title {
    font-size: 0.75rem;
  }
}

/* Responsive - Mobile */
@media screen and (max-width: 768px) {
  .photo-map-container {
    display: block;
    height: 450px;
    border-radius: 12px;
  }
  
  .photo-sidebar {
    display: none;
  }
  
  .mobile-list-toggle {
    display: flex;
  }
  
  .mobile-photo-list {
    display: block;
  }
  
  .photo-map {
    height: 100%;
    border-radius: 12px;
  }
  
  :deep(.custom-popup .leaflet-popup-content) {
    width: 240px !important;
  }
  
  :deep(.photo-popup img) {
    height: 130px;
  }
}

@media screen and (max-width: 480px) {
  .photo-map-container {
    height: 400px;
    border-radius: 0;
    margin: 0 -1rem;
  }
  
  .photo-map {
    border-radius: 0;
    border-width: 0;
  }
  
  .photo-list-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
  
  .photo-list-item img {
    height: 85px;
  }
  
  .photo-list-info {
    padding: 0.5rem;
  }
  
  .photo-list-info h4 {
    font-size: 0.8rem;
  }
  
  :deep(.marker-wrapper) {
    width: 36px !important;
    height: 36px !important;
  }
  
  :deep(.custom-popup .leaflet-popup-content) {
    width: 220px !important;
  }
  
  :deep(.photo-popup img) {
    height: 110px;
  }
  
  :deep(.popup-content) {
    padding: 0.75rem;
  }
  
  :deep(.photo-popup h4) {
    font-size: 1rem;
  }
  
  :deep(.photo-popup .popup-desc) {
    font-size: 0.8rem;
  }
}
</style>
