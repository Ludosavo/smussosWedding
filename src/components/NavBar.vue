<template>
  <div class="wrapper"> 
    <nav>
      <div
        v-for="item in menuItems"
        :key="item.path"
        class="navbar"
      >
        <RouterLink :to="item.path">
          <FontAwesomeIcon :icon="item.icon" /> {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <!-- Mobile Hamburger Menu -->
    <div class="mobile-menu-wrapper">
      <button
        type="button"
        class="hamburger"
        @click="toggleMenu"
        :class="{ open: isOpen }"
        :aria-expanded="isOpen"
        aria-label="Apri il menu di navigazione"
      >
        <div class="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="hamburger-label">
          <FontAwesomeIcon :icon="activeMenuItem.icon" />
          <span>{{ activeMenuItem.label }}</span>
        </div>

        <FontAwesomeIcon :icon="faArrowDown" class="arrow" :class="{ rotated: isOpen }" />
      </button>
      
      <transition name="dropdown">
        <div class="mobile-dropdown" v-if="isOpen">
          <RouterLink 
            v-for="item in sortedMenuItems" 
            :key="item.path"
            :to="item.path"
            class="dropdown-item"
            @click="isOpen = false"
          >
            <FontAwesomeIcon :icon="item.icon" /> {{ item.label }}
          </RouterLink>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { RouterLink, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChurch } from "@fortawesome/free-solid-svg-icons";
import { faChessRook } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

const route = useRoute();
const isOpen = ref(false);

const menuItems = [
  { path: '/', label: 'Home', icon: faHouse },
  { path: '/storia', label: 'La Nostra Storia', icon: faBook },
  { path: '/cerimonia', label: 'Cerimonia', icon: faChurch },
  { path: '/ricevimento', label: 'Ricevimento', icon: faChessRook },
  { path: '/alloggio', label: 'Dove Alloggiare', icon: faHotel },
  { path: '/contatti', label: 'Contatti', icon: faAddressBook },
  { path: '/listanozze', label: 'Lista Nozze', icon: faList },
];

const sortedMenuItems = computed(() => {
  const normalizePath = (path) => {
    if (path === '/') return '/';
    return path.replace(/\/$/, '');
  };

  const currentPath = normalizePath(route.path);
  const current = menuItems.find(item => item.path === currentPath);
  const rest = menuItems.filter(item => item.path !== currentPath);
  
  return current ? [current, ...rest] : menuItems;
});

const activeMenuItem = computed(() => sortedMenuItems.value[0] ?? menuItems[0]);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  }
);
</script>

<style scoped>
.wrapper{
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  transition: color 0.1s, opacity 0.1s;
  --nav-bg: #ffffff;
  --nav-bg-strong: #ebddc3;
  --nav-text: #25744b;
  --nav-border: rgba(255, 255, 255, 0.2);
}

nav {
  display: none;
}

.mobile-menu-wrapper {
  position: relative;
  width: 100%;
}

.hamburger {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.9rem 1.1rem;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.85));
  border: 1px solid var(--nav-border);
  border-radius: 14px;
  color: var(--nav-text);
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.hamburger.open {
  transform: translateY(2px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
  border-color: rgba(255, 255, 255, 0.4);
}

.burger {
  position: relative;
  width: 26px;
  height: 18px;
}

.burger span {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100%;
  height: 2px;
  background-color: var(--nav-text);
  border-radius: 10px;
  transition: transform 0.35s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.25s ease, width 0.25s ease;
}

.burger span:nth-child(1) {
  top: 0;
}

.burger span:nth-child(2) {
  top: 8px;
  width: 80%;
}

.burger span:nth-child(3) {
  bottom: 0;
}

.hamburger.open .burger span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  width: 100%;
}

.hamburger.open .burger span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger.open .burger span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  width: 100%;
}

.hamburger-label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.hamburger-label svg {
  width: 1em;
  height: 1em;
}

.hamburger .arrow {
  font-size: 1rem;
  transition: transform 0.35s ease;
  transform: rotate(180deg);
}

.hamburger .arrow.rotated {
  transform: rotate(0deg);
}

.mobile-dropdown {
  width: 100%;
  margin: 0.6rem auto 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.85));
  border: 1px solid var(--nav-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.22);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1em;
  color: var(--nav-text);
  text-decoration: none;
  border-bottom: 1px solid rgba(123, 30, 44, 0.15);
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.dropdown-item svg {
  width: 1.2em;
  height: 1.2em;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

@media screen and (min-width: 769px) {
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  nav {
    display: flex;
    align-items: center;
    font-size: medium;
    gap: 0.85rem;
    padding: 1rem 1.4rem;
    margin: 1.2rem auto;
    border: 1px solid var(--nav-border);
    border-radius: 16px;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.85));
    flex-wrap: wrap;
    justify-content: center;
  }

  .navbar {
    color: var(--nav-text);
  }

  nav a {
    text-decoration: none;
    color: var(--nav-text);
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    border-bottom: none;
    padding: 0.65rem 0.95rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  }

  nav a:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 20px rgba(153, 169, 156, 0.16);
    transform: translateY(-1px);
    border-radius: 10px;
  }

  nav a.router-link-active {
    background-color: rgba(161, 177, 166, 0.429);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border-bottom: 1px solid rgba(0, 108, 14, 0.751);
  }

  nav svg {
    width: 1em;
    height: 1em;
  }

  .mobile-menu-wrapper {
    display: none;
  }
}

@media screen and (max-width: 769px) {
  .mobile-menu-wrapper {
    width: 100%;
    padding: 0 1rem;
  }

  .mobile-dropdown {
    width: calc(100% - 2rem);
    margin: 0.5rem auto 0;
  }

  .dropdown-item {
    padding: 1em;
  }
}
</style>
