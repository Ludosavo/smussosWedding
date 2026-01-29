<template>
  <div class="grapevine-divider">
    <svg viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg" class="divider-svg">
      <!-- Left vine -->
      <path 
        d="M 10 30 Q 50 20, 90 30 T 170 30" 
        stroke="currentColor" 
        stroke-width="2" 
        fill="none"
        class="vine-path"
      />
      
      <!-- Right vine -->
      <path 
        d="M 390 30 Q 350 20, 310 30 T 230 30" 
        stroke="currentColor" 
        stroke-width="2" 
        fill="none"
        class="vine-path"
      />
      
      <!-- Center ornament -->
      <g class="center-ornament">
        <!-- Grapes cluster -->
        <circle cx="200" cy="25" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="196" cy="30" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="204" cy="30" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="200" cy="35" r="4" fill="currentColor" opacity="0.8" />
        
        <!-- Leaves -->
        <path 
          d="M 185 25 Q 180 20, 185 15 Q 190 20, 185 25" 
          fill="currentColor" 
          opacity="0.6"
        />
        <path 
          d="M 215 25 Q 220 20, 215 15 Q 210 20, 215 25" 
          fill="currentColor" 
          opacity="0.6"
        />
      </g>
      
      <!-- Decorative leaves along vines -->
      <g class="leaves" opacity="0.5">
        <path d="M 60 25 Q 55 20, 60 15 Q 65 20, 60 25" fill="currentColor" />
        <path d="M 120 35 Q 115 30, 120 25 Q 125 30, 120 35" fill="currentColor" />
        <path d="M 340 25 Q 335 20, 340 15 Q 345 20, 340 25" fill="currentColor" />
        <path d="M 280 35 Q 275 30, 280 25 Q 285 30, 280 35" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>

<script setup>
// No props needed, purely decorative
</script>

<style scoped>
.grapevine-divider {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  color: var(--wine-burgundy);
}

.divider-svg {
  width: 100%;
  height: auto;
  display: block;
}

.vine-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawVine 2s ease-in-out forwards;
}

@keyframes drawVine {
  to {
    stroke-dashoffset: 0;
  }
}

.center-ornament,
.leaves {
  animation: fadeIn 1s ease-in 1s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive sizing */
@media screen and (max-width: 768px) {
  .grapevine-divider {
    max-width: 300px;
  }
}

@media screen and (max-width: 480px) {
  .grapevine-divider {
    max-width: 250px;
  }
}
</style>
