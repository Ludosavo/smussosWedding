<template>
  <!-- Desktop Navigation -->
  <nav class="desktop-nav">
    <div class="nav-items">
      <RouterLink to="/">
        <FontAwesomeIcon :icon="faHouse" />
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/storia">
        <FontAwesomeIcon :icon="faBook" />
        <span>La Nostra Storia</span>
      </RouterLink>
      <RouterLink to="/infoUtili">
        <FontAwesomeIcon :icon="faChurch" />
        <span>Info Utili</span>
      </RouterLink>
      <RouterLink to="/location">
        <FontAwesomeIcon :icon="faChessRook" />
        <span>Location</span>
      </RouterLink>
      <RouterLink to="/alloggio">
        <FontAwesomeIcon :icon="faHotel" />
        <span>Dove Alloggiare</span>
      </RouterLink>
      <RouterLink to="/contatti">
        <FontAwesomeIcon :icon="faAddressBook" />
        <span>Contatti & FAQ</span>
      </RouterLink>
      <RouterLink to="/listaNozze">
        <FontAwesomeIcon :icon="faList" />
        <span>Lista Nozze</span>
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faChurch } from '@fortawesome/free-solid-svg-icons'
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>
/* Desktop Navigation - Hidden on mobile */
.desktop-nav {
  display: none;
}

@media (min-width: 769px) {
  .desktop-nav {
    display: block;
    background: var(--ivory);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 1.5rem auto;
    max-width: 1200px;
    position: sticky;
    top: 1rem;
    z-index: 100;
  }
  
  .nav-items {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 0.5rem 1rem;
    flex-wrap: wrap;
  }
  
  .desktop-nav a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    color: var(--text-dark);
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    white-space: nowrap;
  }
  
  /* Underline animation on hover */
  .desktop-nav a::after {
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 1.5rem;
    right: 1.5rem;
    height: 2px;
    background: var(--wine-burgundy);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .desktop-nav a:hover {
    color: var(--wine-burgundy);
  }
  
  .desktop-nav a:hover::after {
    transform: scaleX(1);
  }
  
  .desktop-nav a.router-link-active {
    color: var(--wine-burgundy);
    font-weight: 600;
  }
  
  .desktop-nav a.router-link-active::after {
    transform: scaleX(1);
    background: var(--terracotta);
  }
  
  .desktop-nav a svg {
    font-size: 1.1rem;
  }
}
</style>
