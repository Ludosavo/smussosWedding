<template>
  <div class="mobile-menu-wrapper">
    <!-- Hamburger Button -->
    <button 
      @click="toggleMenu" 
      class="hamburger" 
      :class="{ active: isOpen }"
      aria-label="Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <!-- Slide-in Menu -->
    <Transition name="slide">
      <nav v-if="isOpen" class="mobile-nav">
        <RouterLink @click="closeMenu" to="/">
          <FontAwesomeIcon :icon="faHouse" />
          Home
        </RouterLink>
        <RouterLink @click="closeMenu" to="/storia">
          <FontAwesomeIcon :icon="faBook" />
          La Nostra Storia
        </RouterLink>
        <RouterLink @click="closeMenu" to="/infoUtili">
          <FontAwesomeIcon :icon="faChurch" />
          Info Utili
        </RouterLink>
        <RouterLink @click="closeMenu" to="/location">
          <FontAwesomeIcon :icon="faChessRook" />
          Location
        </RouterLink>
        <RouterLink @click="closeMenu" to="/alloggio">
          <FontAwesomeIcon :icon="faHotel" />
          Dove Alloggiare
        </RouterLink>
        <RouterLink @click="closeMenu" to="/contatti">
          <FontAwesomeIcon :icon="faAddressBook" />
          Contatti & FAQ
        </RouterLink>
        <RouterLink @click="closeMenu" to="/listaNozze">
          <FontAwesomeIcon :icon="faList" />
          Lista Nozze
        </RouterLink>
      </nav>
    </Transition>
    
    <!-- Overlay -->
    <Transition name="fade">
      <div v-if="isOpen" @click="closeMenu" class="overlay"></div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faBook, faChurch, faChessRook, faHotel, faAddressBook, faList } from '@fortawesome/free-solid-svg-icons'

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
  // Prevent body scroll when menu is open
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMenu() {
  isOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* Hamburger Button */
.hamburger {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
  width: 50px;
  height: 50px;
  background: var(--wine-burgundy);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.05);
}

.hamburger:active {
  transform: scale(0.95);
}

.hamburger span {
  display: block;
  width: 28px;
  height: 3px;
  background: var(--text-light);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Animated X when active */
.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: var(--ivory);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.mobile-nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: var(--text-dark);
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 44px; /* Touch-friendly */
}

.mobile-nav a:hover {
  background: var(--champagne);
  color: var(--wine-burgundy);
}

.mobile-nav a.router-link-active {
  background: var(--wine-burgundy);
  color: var(--text-light);
}

.mobile-nav a svg {
  font-size: 1.2rem;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  cursor: pointer;
}

/* Slide Animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

/* Fade Animation for Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide on desktop */
@media (min-width: 769px) {
  .mobile-menu-wrapper {
    display: none;
  }
}
</style>
