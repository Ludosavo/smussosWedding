<template>
  <div>IBAN:</div>

  <section class="lista-nozze">
    <HoneymoonMap :waypoints="WAYPOINTS" :speed-kmh="650" height="500px" :follow="true" />
  </section>
</template>

<script setup>
import HoneymoonMap from '@/components/HoneymoonMap.vue'

const WAYPOINTS = [
  [9.09, 45.27], // Milano
  [174, -42], // New Zeland  [lng, lat]
  [120.45, 15.4], // Philippines
]
</script>

<style scoped></style>
