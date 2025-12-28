<template>
  <div ref="mapEl" class="photo-map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

// Custom marker icon with camera emoji
const createPhotoIcon = () => {
  return L.divIcon({
    className: 'photo-marker',
    html: '<div class="marker-pin">📷</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

onMounted(() => {
  if (!mapEl.value) return
  
  // Initialize map centered on Italy
  const map = L.map(mapEl.value, {
    center: [45.0, 9.0],
    zoom: 6,
    minZoom: 3,
    maxZoom: 18,
    scrollWheelZoom: true
  })
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)
  
  // Add markers for each photo location
  const bounds = []
  
  props.photos.forEach(photo => {
    const marker = L.marker([photo.lat, photo.lng], { 
      icon: createPhotoIcon()
    })
    
    // Create popup content
    const popupContent = `
      <div class="photo-popup">
        <img src="${photo.photo}" alt="${photo.title}" />
        <h4>${photo.title}</h4>
        <p class="popup-location">${photo.location}</p>
        <p class="popup-date">${photo.date}</p>
      </div>
    `
    
    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'custom-popup'
    })
    
    // Emit event when marker is clicked
    marker.on('click', () => {
      emit('photo-selected', photo.id)
    })
    
    marker.addTo(map)
    bounds.push([photo.lat, photo.lng])
  })
  
  // Fit map to show all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] })
  }
})
</script>

<style scoped>
.photo-map {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  border: 3px solid var(--wine-burgundy);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

/* Custom marker styling */
:deep(.photo-marker) {
  background: var(--wine-burgundy);
  border: 3px solid var(--champagne);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

:deep(.photo-marker:hover) {
  transform: rotate(-45deg) scale(1.1);
}

:deep(.marker-pin) {
  transform: rotate(45deg);
  font-size: 20px;
}

/* Custom popup styling */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: var(--ivory);
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 0;
  width: 250px !important;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: var(--ivory);
}

:deep(.photo-popup) {
  padding: 0;
}

:deep(.photo-popup img) {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

:deep(.photo-popup h4) {
  font-family: 'Playfair Display', serif;
  color: var(--wine-burgundy);
  font-size: 1.1rem;
  margin: 0.75rem;
  font-weight: 600;
}

:deep(.photo-popup .popup-location) {
  font-family: 'Lato', sans-serif;
  color: var(--stone-gray);
  font-size: 0.9rem;
  margin: 0 0.75rem 0.5rem;
}

:deep(.photo-popup .popup-date) {
  font-family: 'Lato', sans-serif;
  color: var(--text-dark);
  font-size: 0.85rem;
  font-style: italic;
  margin: 0 0.75rem 0.75rem;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .photo-map {
    height: 400px;
  }
}

@media screen and (max-width: 480px) {
  .photo-map {
    height: 300px;
    border-radius: 8px;
    border-width: 2px;
  }
  
  :deep(.photo-marker) {
    width: 32px;
    height: 32px;
  }
  
  :deep(.marker-pin) {
    font-size: 16px;
  }
}
</style>
