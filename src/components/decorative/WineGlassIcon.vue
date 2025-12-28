<template>
  <div class="wine-glass-icon">
    <svg 
      :width="size" 
      :height="size" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      class="wine-glass-svg"
    >
      <!-- Wine glass outline -->
      <path 
        d="M 8 2 L 16 2 L 14 10 C 14 12.5, 13 13.5, 12 14 L 12 20 L 15 20 L 15 22 L 9 22 L 9 20 L 12 20 L 12 14 C 11 13.5, 10 12.5, 10 10 Z" 
        :fill="fill"
        stroke="currentColor"
        stroke-width="0.5"
        class="glass-body"
      />
      
      <!-- Wine liquid -->
      <path 
        v-if="filled"
        d="M 8.5 2.5 L 15.5 2.5 L 13.8 9 C 13.8 10, 13.2 10.8, 12 11 C 10.8 10.8, 10.2 10, 10.2 9 Z" 
        fill="var(--wine-burgundy)"
        opacity="0.8"
        class="wine-liquid"
      />
      
      <!-- Sparkle effect (optional) -->
      <g v-if="sparkle" class="sparkles" opacity="0.6">
        <circle cx="11" cy="6" r="0.5" fill="white" />
        <circle cx="13.5" cy="4" r="0.4" fill="white" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  filled: {
    type: Boolean,
    default: false
  },
  sparkle: {
    type: Boolean,
    default: false
  },
  customColor: {
    type: String,
    default: null
  }
})

const fill = computed(() => 
  props.filled 
    ? 'none' 
    : props.customColor || 'currentColor'
)
</script>

<style scoped>
.wine-glass-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--wine-burgundy);
}

.wine-glass-svg {
  display: block;
}

.glass-body {
  transition: transform 0.3s ease;
}

.wine-glass-icon:hover .glass-body {
  transform: scale(1.1);
  transform-origin: center bottom;
}

.wine-liquid {
  animation: fillWine 1.5s ease-in-out infinite alternate;
}

@keyframes fillWine {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0.9;
  }
}

.sparkles circle {
  animation: sparkle 2s ease-in-out infinite;
}

.sparkles circle:nth-child(2) {
  animation-delay: 0.5s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
