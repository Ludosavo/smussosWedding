<template>
  <main class="info-page">
    <section class="parking-section glass-card">
      <div class="section-header">
        <h1>Info utili</h1>
        <p>Dove parcheggiare vicino alla chiesa e al castello.</p>
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
export default {
  name: "InfoUtili",
  data() {
    return {
      parcheggi: [
        {
          id: "chiesa-principale",
          nome: "Parcheggio Chiesa SS. Felice e Agata",
          indirizzo: "Via XX Settembre 59, Oviglio (AL)",
          distanza: "2 min a piedi",
          nota: "Stalli lungo la via e piazzale adiacente la chiesa. Arrivate con qualche minuto di anticipo.",
          img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "via-xx-settembre",
          nome: "Parcheggio su Via XX Settembre",
          indirizzo: "Via XX Settembre, Oviglio (AL)",
          distanza: "3-4 min a piedi dalla chiesa",
          nota: "Sosta libera lungo la via principale; seguite la segnaletica fino alla chiesa.",
          img: "https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "castello-adiacente",
          nome: "Parcheggio vicino al Castello di Oviglio",
          indirizzo: "Via Ventiquattro Maggio 1, Oviglio (AL)",
          distanza: "1-2 min a piedi",
          nota: "Stalli fronte ingresso e lungo la via laterale. Seguite le indicazioni dello staff.",
          img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "castello-centrale",
          nome: "Parcheggio area centrale Oviglio",
          indirizzo: "Piazza Umberto I, Oviglio (AL)",
          distanza: "5 min a piedi dal Castello",
          nota: "Ampio parcheggio pubblico; ideale per chi arriva con anticipo e vuole una passeggiata breve.",
          img: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    };
  },
};
</script>

<style scoped>
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

.section-header h1 {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  object-fit: cover;
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
  font-size: 1rem;
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
