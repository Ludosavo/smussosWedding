<template>
  <main class="info-page">
    <section class="hero">
      <h1><i>Dove dormire</i></h1>
      <p class="lede">
        Tre indirizzi consigliati, tutti a breve distanza dalla location. Chiama direttamente oppure
        apri il navigatore con le indicazioni già pronte.
      </p>
    </section>

    <section class="cards">
      <article v-for="place in places" :key="place.name" class="card">
        <div class="card-image" :style="{ backgroundImage: 'url(' + place.image + ')' }"></div>
        <div class="card-header">
          <div>
            <h3>{{ place.name }}</h3>
            <p class="desc">{{ place.description }}</p>
          </div>
          <span class="pill">{{ place.type }}</span>
        </div>

        <div class="meta">
          <a class="phone" :href="place.phoneHref">📞 {{ place.phoneLabel }}</a>
          <a class="cta" :href="place.maps" target="_blank" rel="noopener">
            Indicazioni Google Maps
          </a>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
const places = [
  {
    name: "Relais Rocca Civalieri",
    description: "Country hotel con spa e piscina immerso nel verde, a 15 minuti dal Castello.",
    type: "Resort",
    phoneLabel: "+39 0131 776142",
    phoneHref: "tel:+390131776142",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Relais+Rocca+Civalieri,+Quattordio+AL",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/a8/0c/1f/castello-di-lajone.jpg?w=1800&h=1000&s=1",
  },
  {
    name: "Hotel Alli Due Buoi Rossi",
    description: "Storico 4 stelle nel centro di Alessandria, comodo per chi arriva in treno.",
    type: "Hotel",
    phoneLabel: "+39 0131 316151",
    phoneHref: "tel:+390131316151",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Hotel+Alli+Due+Buoi+Rossi,+Alessandria",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/09/e0/1d/hotel-alli-due-buoi-rossi.jpg?w=1100&h=600&s=1",
  },
  {
    name: "B&B La Corte dei Bertoli",
    description: "Dimora di charme nel cuore di Oviglio, perfetta per un soggiorno intimo.",
    type: "B&B",
    phoneLabel: "+39 335 1234567",
    phoneHref: "tel:+393351234567",
    maps: "https://www.google.com/maps/dir/?api=1&destination=La+Corte+dei+Bertoli,+Oviglio",
    image: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1200&q=80",
  },
];
</script>

<style scoped>
.info-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem clamp(1rem, 2vw, 2rem) 3rem;
  color: var(--textcolor);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero {
  text-align: center;
  display: grid;
  gap: 0.35rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  opacity: 0.85;
}

.lede {
  max-width: 720px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.4;
}

.cards {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85));
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  padding: 0 0 1.2rem;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  display: grid;
  gap: 0.9rem;
  overflow: hidden;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.45) 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  justify-self: center;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0 1.2rem;
  margin-top: -2.8rem;
  position: relative;
  z-index: 2;
}

.card h3 {
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: 0.04em;
}

.desc {
  margin: 0.25rem 0 0;
  opacity: 0.9;
  line-height: 1.3;
}

.pill {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.35);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0 1.2rem;
}

.phone {
  color: var(--textcolor);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.phone:hover {
  border-radius: 10px;
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(238, 229, 229, 0.35);
}

.cta {
  padding: 0.55rem 0.9rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--textcolor);
  text-decoration: none;
  letter-spacing: 0.04em;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.35);
}

@media screen and (max-width: 769px) {
  .info-page {
    padding: 1.25rem 1rem 2rem;
    gap: 1.25rem;
  }

  .card {
    padding: 0 0 1rem;
  }
}
</style>
