<template>
  <div class="scene milan-scene">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" class="scene-svg">
      <!-- Sky gradient -->
      <defs>
        <linearGradient id="milan-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1a1a2e" />
          <stop offset="40%" stop-color="#16213e" />
          <stop offset="70%" stop-color="#e94560" />
          <stop offset="100%" stop-color="#f8b500" />
        </linearGradient>
        <linearGradient id="building-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2C2416" />
          <stop offset="100%" stop-color="#1a1510" />
        </linearGradient>
        <linearGradient id="duomo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6B1C23" />
          <stop offset="100%" stop-color="#4a1318" />
        </linearGradient>
      </defs>
      
      <!-- Sky background -->
      <rect x="0" y="0" width="400" height="200" fill="url(#milan-sky)" />
      
      <!-- Stars -->
      <g class="stars">
        <circle cx="50" cy="25" r="1" fill="#fff" class="star star-1" />
        <circle cx="120" cy="40" r="0.8" fill="#fff" class="star star-2" />
        <circle cx="200" cy="20" r="1.2" fill="#fff" class="star star-3" />
        <circle cx="280" cy="35" r="0.7" fill="#fff" class="star star-4" />
        <circle cx="350" cy="28" r="1" fill="#fff" class="star star-5" />
        <circle cx="80" cy="50" r="0.6" fill="#fff" class="star star-6" />
        <circle cx="320" cy="15" r="0.9" fill="#fff" class="star star-1" />
      </g>
      
      <!-- Background buildings (skyline) -->
      <g class="skyline">
        <!-- Left buildings -->
        <rect x="10" y="130" width="25" height="70" fill="url(#building-gradient)" />
        <rect x="20" y="120" width="20" height="80" fill="url(#building-gradient)" />
        <rect x="45" y="140" width="18" height="60" fill="url(#building-gradient)" />
        <rect x="68" y="125" width="22" height="75" fill="url(#building-gradient)" />
        
        <!-- Right buildings -->
        <rect x="300" y="135" width="20" height="65" fill="url(#building-gradient)" />
        <rect x="325" y="125" width="25" height="75" fill="url(#building-gradient)" />
        <rect x="355" y="140" width="22" height="60" fill="url(#building-gradient)" />
        <rect x="380" y="130" width="20" height="70" fill="url(#building-gradient)" />
      </g>
      
      <!-- Building windows (lights) -->
      <g class="windows">
        <rect x="15" y="140" width="3" height="3" fill="#f8b500" class="window window-1" />
        <rect x="25" y="130" width="3" height="3" fill="#f8b500" class="window window-2" />
        <rect x="25" y="145" width="3" height="3" fill="#f8b500" class="window window-3" />
        <rect x="72" y="135" width="3" height="3" fill="#f8b500" class="window window-4" />
        <rect x="72" y="150" width="3" height="3" fill="#f8b500" class="window window-1" />
        <rect x="330" y="135" width="3" height="3" fill="#f8b500" class="window window-2" />
        <rect x="330" y="150" width="3" height="3" fill="#f8b500" class="window window-3" />
        <rect x="360" y="150" width="3" height="3" fill="#f8b500" class="window window-4" />
      </g>
      
      <!-- Duomo Cathedral (center) -->
      <g class="duomo">
        <!-- Main body -->
        <path d="M140 200 L140 130 L200 80 L260 130 L260 200 Z" fill="url(#duomo-gradient)" />
        
        <!-- Central spire with Madonnina -->
        <path d="M195 80 L200 40 L205 80 Z" fill="#6B1C23" />
        <circle cx="200" cy="38" r="3" fill="#D4AF37" class="madonnina" />
        
        <!-- Side spires -->
        <path d="M155 130 L160 95 L165 130 Z" fill="#6B1C23" />
        <path d="M175 120 L180 90 L185 120 Z" fill="#6B1C23" />
        <path d="M215 120 L220 90 L225 120 Z" fill="#6B1C23" />
        <path d="M235 130 L240 95 L245 130 Z" fill="#6B1C23" />
        
        <!-- Facade details -->
        <rect x="180" y="160" width="40" height="40" fill="#4a1318" />
        <path d="M175 160 L200 140 L225 160 Z" fill="#5a1820" />
        
        <!-- Rose window -->
        <circle cx="200" cy="150" r="12" fill="none" stroke="#D4AF37" stroke-width="2" />
        <circle cx="200" cy="150" r="8" fill="rgba(212, 175, 55, 0.3)" />
        
        <!-- Door -->
        <rect x="190" y="175" width="20" height="25" fill="#1a1510" rx="10" ry="10" />
      </g>
      
      <!-- Ground -->
      <rect x="0" y="195" width="400" height="10" fill="#2C2416" />
    </svg>
  </div>
</template>

<script setup>
// Milan scene - Duomo and skyline at sunset
</script>

<style scoped>
.milan-scene {
  width: 100%;
  height: 100%;
}

.scene-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Star twinkling animation */
.star {
  animation: twinkle 2s ease-in-out infinite;
}

.star-1 { animation-delay: 0s; }
.star-2 { animation-delay: 0.3s; }
.star-3 { animation-delay: 0.6s; }
.star-4 { animation-delay: 0.9s; }
.star-5 { animation-delay: 1.2s; }
.star-6 { animation-delay: 1.5s; }

@keyframes twinkle {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Window flickering */
.window {
  animation: flicker 3s ease-in-out infinite;
}

.window-1 { animation-delay: 0s; }
.window-2 { animation-delay: 0.5s; }
.window-3 { animation-delay: 1s; }
.window-4 { animation-delay: 1.5s; }

@keyframes flicker {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
  75% { opacity: 0.5; }
}

/* Madonnina glow */
.madonnina {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { 
    filter: drop-shadow(0 0 2px #D4AF37);
  }
  50% { 
    filter: drop-shadow(0 0 6px #D4AF37) drop-shadow(0 0 10px #D4AF37);
  }
}
</style>
