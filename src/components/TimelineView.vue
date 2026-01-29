<template>
  <section class="timeline">  
    <div class="timeline-container">
      <div 
        v-for="(event, idx) in events" 
        :key="event.id" 
        class="timeline-item"
        :class="{ 'timeline-left': idx % 2 === 0, 'timeline-right': idx % 2 !== 0 }"
      >
        <div class="timeline-marker">
          <div class="marker-dot"></div>
        </div>
        
        <div class="timeline-content" @click="$emit('photo-selected', event.id)">
          <div class="timeline-image">
            <img :src="event.thumb || event.photo" :alt="event.title" />
            <div class="image-overlay">
              <FontAwesomeIcon :icon="faCamera" class="camera-icon" />
            </div>
          </div>
          
          <div class="timeline-info">
            <h3>{{ event.title.replace(/\s*\(\d{4}\)\s*$/, '').replace(/\b\w/g, c => c.toUpperCase()) }}</h3>
            <p class="event-date">
              <FontAwesomeIcon :icon="faCalendar" />
              {{ event.date }}
            </p>
            <p class="event-location">
              <FontAwesomeIcon :icon="faMapMarkerAlt" />
              {{ event.customLocation || event.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faMapMarkerAlt, 
  faCalendar, 
  faCamera 
} from '@fortawesome/free-solid-svg-icons'

defineProps({
  events: {
    type: Array,
    required: true
  }
})

defineEmits(['photo-selected'])
</script>

<style scoped>
.timeline {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

/* Central vertical line */
.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, 
    transparent 0%,
    var(--textcolor) 10%,
    var(--textcolor) 90%,
    transparent 100%
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.marker-dot {
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid var(--textcolor);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(32, 107, 44, 0.211);
  transition: transform 0.3s ease;
}

.timeline-item:hover .marker-dot {
  transform: scale(1.3);
}

.timeline-content {
  width: calc(50% - 40px);
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(28, 107, 45, 0.15);
  border-color: var(--textcolor);
}

.timeline-left .timeline-content {
  margin-right: auto;
}

.timeline-right .timeline-content {
  margin-left: auto;
}

.timeline-image {
  position: relative;
  aspect-ratio: 4 / 3;
  height: auto;
  overflow: hidden;
}

.timeline-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.timeline-content:hover .timeline-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 107, 36, 0.416);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-content:hover .image-overlay {
  opacity: 1;
}

.camera-icon {
  font-size: 3rem;
  color: var(--text-light);
}

.timeline-info {
  padding: 1.5rem;
}

.timeline-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.event-date,
.event-location {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--stone-gray);
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-date svg,
.event-location svg {
  color: var(--wine-burgundy);
  font-size: 0.9rem;
}

.event-description {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 1rem 0 0;
}

/* Responsive - Stack vertically on mobile */
@media screen and (max-width: 768px) {
  .timeline {
    padding: 3rem 1rem;
  }
  
  .timeline-container::before {
    left: 20px;  
  }
  
  .timeline-item {
    margin-bottom: 3rem;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .timeline-marker {
    left: 20px;
    transform: translateX(0);
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
  }
  
  .timeline-left .timeline-content,
  .timeline-right .timeline-content {
    margin-left: 60px;
    margin-right: 0;
  }
  
  .timeline-image {
    height: 200px;
  }
  
  .timeline-info {
    padding: 1.25rem;
  }
  
  .timeline-info h3 {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 480px) {
  .timeline {
    padding: 2rem 0.75rem;
  }
  
  .timeline-container::before {
    left: 15px;
  }
  
  .timeline-marker {
    left: 15px;
  }
  
  .marker-dot {
    width: 16px;
    color: var(--textcolor);
    height: 16px;
    border-width: 3px;
    box-shadow: 0 0 0 3px var(--wine-burgundy);
  }
  
  .timeline-content {
    width: calc(100% - 50px);
    margin-left: 50px !important;
  }
  
  .timeline-image {
    height: 180px;
  }
  
  .timeline-info {
    padding: 1rem;
  }
  
  .timeline-info h3 {
    font-size: 1.2rem;
  }
  
  .event-description {
    font-size: 0.9rem;
  }
  
  .camera-icon {
    font-size: 2.5rem;
  }
}
</style>
