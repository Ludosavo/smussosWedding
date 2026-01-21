<template>
  <div class="scene nz-scene">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" class="scene-svg">
      <defs>
        <!-- Sky gradient -->
        <linearGradient id="nz-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#87CEEB" />
          <stop offset="60%" stop-color="#E0F4FF" />
          <stop offset="100%" stop-color="#FFFEF2" />
        </linearGradient>
        
        <!-- Mountain gradients -->
        <linearGradient id="mountain-far" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8A9A7B" />
          <stop offset="100%" stop-color="#5C6B3D" />
        </linearGradient>
        <linearGradient id="mountain-near" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5C6B3D" />
          <stop offset="100%" stop-color="#3d4a28" />
        </linearGradient>
        <linearGradient id="snow-cap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E8E8E8" />
        </linearGradient>
        
        <!-- Hill gradient (Hobbiton-style) -->
        <linearGradient id="hobbit-hill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#7CB342" />
          <stop offset="100%" stop-color="#558B2F" />
        </linearGradient>
      </defs>
      
      <!-- Sky -->
      <rect x="0" y="0" width="400" height="200" fill="url(#nz-sky)" />
      
      <!-- Sun -->
      <circle cx="320" cy="50" r="25" fill="#FFF9C4" class="sun" />
      
      <!-- Clouds -->
      <g class="clouds">
        <g class="cloud cloud-1">
          <ellipse cx="80" cy="40" rx="25" ry="12" fill="white" opacity="0.9" />
          <ellipse cx="100" cy="35" rx="20" ry="10" fill="white" opacity="0.9" />
          <ellipse cx="65" cy="38" rx="18" ry="9" fill="white" opacity="0.9" />
        </g>
        <g class="cloud cloud-2">
          <ellipse cx="250" cy="55" rx="22" ry="10" fill="white" opacity="0.8" />
          <ellipse cx="270" cy="50" rx="18" ry="9" fill="white" opacity="0.8" />
          <ellipse cx="235" cy="52" rx="15" ry="8" fill="white" opacity="0.8" />
        </g>
      </g>
      
      <!-- Far mountains with snow caps -->
      <g class="mountains-far">
        <path d="M-20 200 L60 90 L140 200 Z" fill="url(#mountain-far)" />
        <path d="M60 90 L50 105 L70 105 Z" fill="url(#snow-cap)" />
        
        <path d="M100 200 L180 70 L260 200 Z" fill="url(#mountain-far)" />
        <path d="M180 70 L165 95 L195 95 Z" fill="url(#snow-cap)" />
        
        <path d="M220 200 L300 85 L380 200 Z" fill="url(#mountain-far)" />
        <path d="M300 85 L288 105 L312 105 Z" fill="url(#snow-cap)" />
        
        <path d="M320 200 L400 100 L420 200 Z" fill="url(#mountain-far)" />
      </g>
      
      <!-- Near mountains -->
      <g class="mountains-near">
        <path d="M-30 200 L40 130 L110 200 Z" fill="url(#mountain-near)" />
        <path d="M280 200 L360 120 L440 200 Z" fill="url(#mountain-near)" />
      </g>
      
      <!-- Rolling Hobbit hills -->
      <g class="hobbit-hills">
        <ellipse cx="200" cy="220" rx="250" ry="60" fill="url(#hobbit-hill)" />
        <ellipse cx="80" cy="210" rx="120" ry="45" fill="#6BAF3D" />
        <ellipse cx="320" cy="215" rx="130" ry="50" fill="#6BAF3D" />
      </g>
      
      <!-- Hobbit hole -->
      <g class="hobbit-hole">
        <!-- Hill mound -->
        <ellipse cx="200" cy="185" rx="45" ry="30" fill="#558B2F" />
        
        <!-- Door frame -->
        <circle cx="200" cy="175" r="18" fill="#5D4037" />
        <circle cx="200" cy="175" r="15" fill="#6B1C23" />
        
        <!-- Door details -->
        <line x1="200" y1="160" x2="200" y2="190" stroke="#4a1318" stroke-width="2" />
        <circle cx="208" cy="175" r="2" fill="#D4AF37" />
        
        <!-- Windows -->
        <circle cx="170" cy="168" r="6" fill="#FFF9C4" opacity="0.8" class="window-glow" />
        <circle cx="230" cy="168" r="6" fill="#FFF9C4" opacity="0.8" class="window-glow" />
        
        <!-- Chimney -->
        <rect x="215" y="148" width="8" height="15" fill="#5D4037" />
        <ellipse cx="219" cy="145" rx="6" ry="4" fill="#9E9E9E" class="smoke" />
      </g>
      
      <!-- Sheep -->
      <g class="sheep sheep-1">
        <ellipse cx="100" cy="178" rx="8" ry="6" fill="#FAFAFA" />
        <circle cx="93" cy="175" r="4" fill="#FAFAFA" />
        <circle cx="93" cy="175" r="2" fill="#2C2416" />
        <line x1="96" y1="182" x2="96" y2="188" stroke="#2C2416" stroke-width="1.5" />
        <line x1="104" y1="182" x2="104" y2="188" stroke="#2C2416" stroke-width="1.5" />
      </g>
      
      <g class="sheep sheep-2">
        <ellipse cx="140" cy="182" rx="7" ry="5" fill="#FAFAFA" />
        <circle cx="134" cy="180" r="3.5" fill="#FAFAFA" />
        <circle cx="134" cy="180" r="1.8" fill="#2C2416" />
        <line x1="137" y1="186" x2="137" y2="191" stroke="#2C2416" stroke-width="1.5" />
        <line x1="143" y1="186" x2="143" y2="191" stroke="#2C2416" stroke-width="1.5" />
      </g>
      
      <g class="sheep sheep-3">
        <ellipse cx="280" cy="180" rx="7" ry="5" fill="#FAFAFA" />
        <circle cx="286" cy="178" r="3.5" fill="#FAFAFA" />
        <circle cx="286" cy="178" r="1.8" fill="#2C2416" />
        <line x1="277" y1="184" x2="277" y2="189" stroke="#2C2416" stroke-width="1.5" />
        <line x1="283" y1="184" x2="283" y2="189" stroke="#2C2416" stroke-width="1.5" />
      </g>
      
      <!-- Birds -->
      <g class="birds">
        <path d="M50 70 Q55 65 60 70 Q55 68 50 70" fill="none" stroke="#2C2416" stroke-width="1" class="bird bird-1" />
        <path d="M70 60 Q75 55 80 60 Q75 58 70 60" fill="none" stroke="#2C2416" stroke-width="1" class="bird bird-2" />
      </g>
    </svg>
  </div>
</template>

<script setup>
// New Zealand scene - Mountains, Hobbit hills, and sheep
</script>

<style scoped>
.nz-scene {
  width: 100%;
  height: 100%;
}

.scene-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Sun pulse */
.sun {
  animation: sunPulse 4s ease-in-out infinite;
}

@keyframes sunPulse {
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(255, 249, 196, 0.5));
    r: 25;
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(255, 249, 196, 0.8));
  }
}

/* Cloud floating */
.cloud-1 {
  animation: floatCloud 20s ease-in-out infinite;
}

.cloud-2 {
  animation: floatCloud 25s ease-in-out infinite reverse;
}

@keyframes floatCloud {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}

/* Sheep grazing animation */
.sheep-1 {
  animation: graze 3s ease-in-out infinite;
}

.sheep-2 {
  animation: graze 3.5s ease-in-out infinite;
  animation-delay: 0.5s;
}

.sheep-3 {
  animation: graze 2.8s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes graze {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* Window glow */
.window-glow {
  animation: windowGlow 2s ease-in-out infinite;
}

@keyframes windowGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Smoke from chimney */
.smoke {
  animation: smoke 3s ease-in-out infinite;
}

@keyframes smoke {
  0% { 
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  100% { 
    transform: translateY(-15px) scale(1.5);
    opacity: 0;
  }
}

/* Birds flying */
.bird-1 {
  animation: flyBird 8s linear infinite;
}

.bird-2 {
  animation: flyBird 10s linear infinite;
  animation-delay: 2s;
}

@keyframes flyBird {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
</style>
