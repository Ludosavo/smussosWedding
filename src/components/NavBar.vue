<template>
  <nav>
    <RouterLink to="/"><FontAwesomeIcon :icon="faHouse" /> Home</RouterLink>
    <RouterLink to="/storia"><FontAwesomeIcon :icon="faBook" /> La Nostra Storia</RouterLink>
    <RouterLink to="/cerimonia"><FontAwesomeIcon :icon="faChurch" /> Cerimonia</RouterLink>
    <RouterLink to="/location"><FontAwesomeIcon :icon="faChessRook" /> Location</RouterLink>
    <RouterLink to="/alloggio"><FontAwesomeIcon :icon="faHotel" /> Dove Alloggiare</RouterLink>
    <RouterLink to="/contatti"><FontAwesomeIcon :icon="faAddressBook" /> Contatti & FAQ</RouterLink>
    <RouterLink to="/listaNozze"><FontAwesomeIcon :icon="faList" /> Lista Nozze</RouterLink>
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
@media screen and (max-width: 769px) {
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--textcolor);
    gap: 1rem;
    margin: 1rem 0;
    text-align: center;
    border: 1px solid var(--background);
    border-radius: 8px;
    background-color: var(--textcolor);
  }
  nav a {
    text-decoration: none;
  }

  #casa {
    width: 30px;
    height: 30px;
    position: inherit;
    margin-bottom: -5px;
    margin-right: 5px;
    color: var(--textcolor);
  }
}
@media screen and (min-width: 769px) {
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--textcolor);
    gap: 1rem;
    margin: 1rem 0;
    text-align: center;
    border: 1px solid var(--background);
    border-radius: 8px;
    background-color: var(--textcolor);
  }
  nav a {
    text-decoration: none;
  }
}
</style>
