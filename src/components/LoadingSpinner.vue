<template>
  <div class="loading-spinner-overlay" v-if="show">
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.loading-spinner-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner-ring {
  width: 80px;
  height: 80px;
  border: 8px solid var(--champagne);
  border-top-color: var(--wine-burgundy);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  position: absolute;
}

.spinner-ring:nth-child(1) {
  animation-delay: -0.45s;
  border-top-color: var(--wine-burgundy);
}

.spinner-ring:nth-child(2) {
  animation-delay: -0.3s;
  border-top-color: var(--terracotta);
}

.spinner-ring:nth-child(3) {
  animation-delay: -0.15s;
  border-top-color: var(--sage-green);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-message {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: var(--wine-burgundy);
  margin-top: 120px;
  font-weight: 600;
  text-align: center;
}
</style>
