<template>
  <main class="info-page">
    <h3> Chiesa di SS. Felice e Agata </h3>
    <img class="chiesa-image" :src="chiesaImg" alt="Chiesa SS. Felice e Agata" loading="lazy"/>
    <section class="parking-section glass-card">
      <div class="section-header">
        <h3>Info utili</h3>
        <p>Dove parcheggiare vicino alla chiesa.</p>
      </div>

      <div class="parking-grid">
        <article class="parking-card" v-for="p in parcheggi" :key="p.id">
          <div class="parking-image">
            <img :src="p.img" :alt="p.nome" loading="lazy" />
          </div>
          <div class="parking-content">
            <div class="parking-top">
              <h3>{{ p.nome }}</h3>
              <span class="distance">{{ p.distanza }}</span>
            </div>
            <p class="address">{{ p.indirizzo }}</p>
            <p class="note">{{ p.nota }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script>

import chiesaImg from "@/components/icons/chiesa.jpeg";
import ParcheggiImg from "@/components/icons/ParcheggioPiccolo.png";
import ParcheggioGrande from "@/components/icons/ParcheggioGrande.png";

export default {
  name: "InfoUtili",
  data() {
    return {
      chiesaImg,
      parcheggi: [
        {
          id: "chiesa-principale",
          nome: "Parcheggio Chiesa SS. Felice e Agata",
          indirizzo: "Via XXIV Maggio, Oviglio (AL)",
          distanza: "4-5 min a piedi dalla chiesa",
          nota: "Stalli lungo la via e piazzale adiacente la chiesa. Arrivate con qualche minuto di anticipo.",
          img: ParcheggiImg,
        },
        {
          id: "via-xx-settembre",
          nome: "Parcheggio su Piazza Madre Teresa di Calcutta 6",
          indirizzo: "Piazza Madre Teresa di Calcutta 6, Oviglio (AL)",
          distanza: "6 min a piedi dalla chiesa",
          nota: "Sosta libera lungo la via principale; seguite la segnaletica fino alla chiesa.",
          img: ParcheggioGrande,
        },
    
      ],
    };
  },
};
</script>

<style scoped>

.chiesa-image{
  width: 60%;
  object-fit:scale-down;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
}
.info-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 3vw, 2.6rem) 3rem;
  display: flex;
  justify-content: center;
  color: var(--textcolor);
}

.glass-card {
  width: 100%;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  padding: 1.3rem 1.5rem;
}

.section-header h3, .section-header p {
  margin: 0;
  text-align: center;
}

.section-header p {
  margin: 0.3rem 0 1rem;
  opacity: 0.9;
}

.parking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.parking-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
}

.parking-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.parking-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.parking-content {
  padding: 0.85rem 1rem 1rem;
  display: grid;
  gap: 0.35rem;
}

.parking-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.parking-top h3 {
  margin: 0;
  letter-spacing: 0.03em;
  font-size: 30px;
}

.distance {
  font-size: 0.9rem;
  opacity: 0.9;
}

.address {
  margin: 0;
  opacity: 0.95;
  font-weight: 600;
}

.note {
  margin: 0;
  opacity: 0.9;
  line-height: 1.45;
}

@media (max-width: 768px) {
  .info-page {
    padding: 1.5rem 1rem 2.4rem;
  }

  .parking-grid {
    grid-template-columns: 1fr;
  }
}
</style>
