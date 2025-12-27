<template>
  <div id="iban">Il dono più grande sarà condividere con voi questo giorno speciale. <br>
    Qualora desideraste farci un regalo, un contributo al nostro viaggio di nozze ci aiuterà ad iniziare la nostra avventura insieme.<br>
    IBAN intestato a Carlo Musso & Francesca Savoia: <br> 
    IT71 J036 6901 6000 6944 7104 684 
  </div> 
  <section class="lista-nozze">
    <HoneymoonMap :waypoints="WAYPOINTS" height="500px":follow="true" />
  </section>
</template>

<script setup>
import HoneymoonMap from '@/components/HoneymoonMap.vue'

const WAYPOINTS = [
  [9.09, 45.27], // Milano
  [174, -42], // New Zeland  [lng, lat]
  [177, 19], // Fiji
]
</script>

<style scoped>
#iban {
  color: var(--textcolor);
  text-align: center;
}
.relative{
  justify-self: center;
  width: 800px;
}

</style>
