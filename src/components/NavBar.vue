<template>
  <nav>
    <div class="navbar"><RouterLink to="/"><FontAwesomeIcon :icon="faHouse" /> Home</RouterLink></div>
    <div class="navbar"><RouterLink to="/storia"><FontAwesomeIcon :icon="faBook" /> La Nostra Storia</RouterLink></div>
    <div class="navbar"><RouterLink to="/infoUtili"><FontAwesomeIcon :icon="faChurch" /> Info Utili</RouterLink></div>
    <div class="navbar"><RouterLink to="/location"><FontAwesomeIcon :icon="faChessRook" /> Location</RouterLink></div>
    <div class="navbar"><RouterLink to="/alloggio"><FontAwesomeIcon :icon="faHotel" /> Dove Alloggiare</RouterLink></div>
    <div class="navbar"><RouterLink to="/contatti"><FontAwesomeIcon :icon="faAddressBook" /> Contatti & FAQ</RouterLink></div>
    <div class="navbar"><RouterLink to="/listaNozze"><FontAwesomeIcon :icon="faList" /> Lista Nozze</RouterLink></div>
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
  @media screen and (min-width: 769px) {

  .navbar {
    color: var(--textcolor);
    border-radius: 10px;
    padding: 1em;
    
  }
  nav {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 1rem 0;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  nav a {
    text-decoration: none;
  }
}
@media screen and (max-width: 769px) {
  nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-self: center;
    gap: 1rem;
    margin: 1rem 0;
    text-align: center;
    border-radius: 8px;
    width: min-content;
  }
  nav div {
    display: flex;
  }
  nav a {
    text-decoration: none;
    width: 100%;
    white-space: nowrap;
  }

  #casa {
    width: 30px;
    height: 30px;
    position: inherit;
    margin-bottom: -5px;
    margin-right: 5px;
  }
}

</style>
