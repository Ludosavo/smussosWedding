<template>
  <div class="scene fiji-scene">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" class="scene-svg">
      <defs>
        <!-- Sky gradient (tropical sunset) -->
        <linearGradient id="fiji-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FF6B6B" />
          <stop offset="30%" stop-color="#FFE66D" />
          <stop offset="60%" stop-color="#4ECDC4" />
          <stop offset="100%" stop-color="#45B7D1" />
        </linearGradient>
        
        <!-- Ocean gradient -->
        <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#45B7D1" />
          <stop offset="50%" stop-color="#2C98A0" />
          <stop offset="100%" stop-color="#1A6B7C" />
        </linearGradient>
        
        <!-- Sand gradient -->
        <linearGradient id="sand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F5DEB3" />
          <stop offset="100%" stop-color="#DEB887" />
        </linearGradient>
        
        <!-- Palm trunk -->
        <linearGradient id="palm-trunk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5D4037" />
          <stop offset="50%" stop-color="#795548" />
          <stop offset="100%" stop-color="#5D4037" />
        </linearGradient>
        
        <!-- Palm leaf -->
        <linearGradient id="palm-leaf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2E7D32" />
          <stop offset="100%" stop-color="#1B5E20" />
        </linearGradient>
      </defs>
      
      <!-- Sky -->
      <rect x="0" y="0" width="400" height="200" fill="url(#fiji-sky)" />
      
      <!-- Sun (setting) -->
      <circle cx="320" cy="80" r="35" fill="#FFE66D" class="sun" />
      <circle cx="320" cy="80" r="30" fill="#FFEB3B" />
      
      <!-- Clouds -->
      <g class="clouds">
        <g class="cloud cloud-1">
          <ellipse cx="60" cy="50" rx="30" ry="12" fill="white" opacity="0.7" />
          <ellipse cx="85" cy="45" rx="22" ry="10" fill="white" opacity="0.7" />
        </g>
        <g class="cloud cloud-2">
          <ellipse cx="180" cy="40" rx="25" ry="10" fill="white" opacity="0.6" />
          <ellipse cx="200" cy="35" rx="20" ry="8" fill="white" opacity="0.6" />
        </g>
      </g>
      
      <!-- Ocean -->
      <rect x="0" y="120" width="400" height="50" fill="url(#ocean)" />
      
      <!-- Waves -->
      <g class="waves">
        <path d="M0 130 Q20 125 40 130 T80 130 T120 130 T160 130 T200 130 T240 130 T280 130 T320 130 T360 130 T400 130" 
              fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" class="wave wave-1" />
        <path d="M0 140 Q20 135 40 140 T80 140 T120 140 T160 140 T200 140 T240 140 T280 140 T320 140 T360 140 T400 140" 
              fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" class="wave wave-2" />
        <path d="M0 150 Q20 145 40 150 T80 150 T120 150 T160 150 T200 150 T240 150 T280 150 T320 150 T360 150 T400 150" 
              fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" class="wave wave-3" />
      </g>
      
      <!-- Beach/Sand -->
      <ellipse cx="200" cy="220" rx="250" ry="60" fill="url(#sand)" />
      
      <!-- Left Palm Tree -->
      <g class="palm-tree palm-left">
        <!-- Trunk -->
        <path d="M70 200 Q65 160 75 100" stroke="url(#palm-trunk)" stroke-width="8" fill="none" stroke-linecap="round" />
        <!-- Coconuts -->
        <circle cx="75" cy="98" r="4" fill="#5D4037" />
        <circle cx="70" cy="102" r="4" fill="#5D4037" />
        <circle cx="80" cy="102" r="4" fill="#5D4037" />
        <!-- Leaves -->
        <g class="palm-leaves-left">
          <path d="M75 95 Q40 70 10 80" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-1" />
          <path d="M75 95 Q50 60 25 55" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-2" />
          <path d="M75 95 Q75 50 75 30" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-3" />
          <path d="M75 95 Q100 60 120 55" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-4" />
          <path d="M75 95 Q105 75 130 85" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-5" />
        </g>
      </g>
      
      <!-- Right Palm Tree -->
      <g class="palm-tree palm-right">
        <!-- Trunk -->
        <path d="M350 200 Q360 150 345 90" stroke="url(#palm-trunk)" stroke-width="8" fill="none" stroke-linecap="round" />
        <!-- Coconuts -->
        <circle cx="345" cy="88" r="4" fill="#5D4037" />
        <circle cx="340" cy="92" r="4" fill="#5D4037" />
        <circle cx="350" cy="92" r="4" fill="#5D4037" />
        <!-- Leaves -->
        <g class="palm-leaves-right">
          <path d="M345 85 Q310 60 280 70" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-1" />
          <path d="M345 85 Q320 50 295 45" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-2" />
          <path d="M345 85 Q345 40 345 20" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-3" />
          <path d="M345 85 Q370 50 390 45" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-4" />
          <path d="M345 85 Q375 65 395 75" stroke="url(#palm-leaf)" stroke-width="4" fill="none" class="leaf leaf-5" />
        </g>
      </g>
      
      <!-- Beach umbrella -->
      <g class="umbrella">
        <line x1="200" y1="195" x2="200" y2="155" stroke="#5D4037" stroke-width="3" />
        <path d="M165 155 Q200 135 235 155 Z" fill="#C45D3F" />
        <path d="M165 155 Q183 140 200 155" fill="#6B1C23" />
        <path d="M200 155 Q217 140 235 155" fill="#6B1C23" />
      </g>
      
      <!-- Beach chair -->
      <g class="beach-chair">
        <path d="M175 195 L185 175 L215 175 L225 195" stroke="#5D4037" stroke-width="2" fill="none" />
        <rect x="182" y="175" width="36" height="8" fill="#45B7D1" rx="2" />
      </g>
      
      <!-- Birds -->
      <g class="birds">
        <path d="M100 60 Q105 55 110 60" fill="none" stroke="#2C2416" stroke-width="1" class="bird bird-1" />
        <path d="M115 55 Q120 50 125 55" fill="none" stroke="#2C2416" stroke-width="1" class="bird bird-2" />
        <path d="M130 62 Q135 57 140 62" fill="none" stroke="#2C2416" stroke-width="1" class="bird bird-3" />
      </g>
      
      <!-- Sparkles on water -->
      <g class="water-sparkles">
        <circle cx="150" cy="135" r="1.5" fill="white" class="sparkle sparkle-1" />
        <circle cx="220" cy="128" r="1" fill="white" class="sparkle sparkle-2" />
        <circle cx="280" cy="138" r="1.5" fill="white" class="sparkle sparkle-3" />
        <circle cx="100" cy="142" r="1" fill="white" class="sparkle sparkle-4" />
        <circle cx="350" cy="132" r="1.2" fill="white" class="sparkle sparkle-5" />
      </g>
    </svg>
  </div>
</template>

<script setup>
// Fiji scene - Tropical beach with palm trees and sunset
</script>

<style scoped>
.fiji-scene {
  width: 100%;
  height: 100%;
}

.scene-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Sun glow */
.sun {
  animation: tropicalSun 4s ease-in-out infinite;
}

@keyframes tropicalSun {
  0%, 100% { 
    filter: drop-shadow(0 0 15px rgba(255, 230, 109, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 25px rgba(255, 230, 109, 0.9));
  }
}

/* Cloud floating */
.cloud-1 {
  animation: floatCloud 18s ease-in-out infinite;
}

.cloud-2 {
  animation: floatCloud 22s ease-in-out infinite reverse;
}

@keyframes floatCloud {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(25px); }
}

/* Wave animation */
.wave-1 {
  animation: waveMove 3s ease-in-out infinite;
}

.wave-2 {
  animation: waveMove 3.5s ease-in-out infinite;
  animation-delay: 0.5s;
}

.wave-3 {
  animation: waveMove 4s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

/* Palm tree sway */
.palm-leaves-left {
  transform-origin: 75px 95px;
  animation: swayLeft 4s ease-in-out infinite;
}

.palm-leaves-right {
  transform-origin: 345px 85px;
  animation: swayRight 4.5s ease-in-out infinite;
}

@keyframes swayLeft {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(3deg); }
}

@keyframes swayRight {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-3deg); }
}

/* Individual leaf animation */
.leaf {
  animation: leafSway 2s ease-in-out infinite;
}

.leaf-1 { animation-delay: 0s; }
.leaf-2 { animation-delay: 0.2s; }
.leaf-3 { animation-delay: 0.4s; }
.leaf-4 { animation-delay: 0.6s; }
.leaf-5 { animation-delay: 0.8s; }

@keyframes leafSway {
  0%, 100% { stroke-width: 4; }
  50% { stroke-width: 4.5; }
}

/* Birds flying */
.bird-1 {
  animation: birdFly 6s linear infinite;
}

.bird-2 {
  animation: birdFly 7s linear infinite;
  animation-delay: 1s;
}

.bird-3 {
  animation: birdFly 8s linear infinite;
  animation-delay: 2s;
}

@keyframes birdFly {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(20px) translateY(-5px); }
  50% { transform: translateX(40px) translateY(0); }
  75% { transform: translateX(60px) translateY(-3px); }
  100% { transform: translateX(80px) translateY(0); opacity: 0; }
}

/* Water sparkles */
.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

.sparkle-1 { animation-delay: 0s; }
.sparkle-2 { animation-delay: 0.3s; }
.sparkle-3 { animation-delay: 0.6s; }
.sparkle-4 { animation-delay: 0.9s; }
.sparkle-5 { animation-delay: 1.2s; }

@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}
</style>
