<template>
  <main class="info-page">
    <section class="hero">
      <h3>Dove dormire</h3>
      <p class="lede">
        I seguenti indirizzi sono tutti a breve distanza in auto dalla location. <br>
        Chiama o prenota direttamente dai link oppure apri il navigatore con le indicazioni già pronte.
      </p>
    </section>

    <section class="cards">
      <article v-for="place in places" :key="place.name" class="card">
        <div
          class="card-image"
          :style="{ backgroundImage: 'url(' + place.image + ')' }"
        ></div>
        <div class="card-header">
          <h3 class="placename">{{ place.name }}</h3>
          <p class="desc">{{ place.description }}</p>
          <span class="pill">{{ place.type }}</span>
        </div>

        <div class="actions">
          <a 
            v-if="place.phone" 
            class="action-link" 
            :href="`tel:${place.phone.replace(/\\s+/g, '')}`"
          >
            📞 {{ place.phone }}
          </a>
          <span v-else class="action-missing">📞 Telefono non indicato</span>

          <a class="action-link" :href="place.maps" target="_blank" rel="noopener">
            🗺️ Indicazioni Google Maps
          </a>

          <a class="action-link" :href="place.website" target="_blank" rel="noopener">
            🔗 Sito / Prenotazione
          </a>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import CascinaAmarant from "@/components/icons/hotels/Agriturismo-Cascina-Amarant.webp";
import HM from "@/components/icons/hotels/HM-Motel-Hotel.webp";
import IlMuron from "@/components/icons/hotels/Il-Murôn-Guest-House.webp";
import Olivazzi from "@/components/icons/hotels/Agriturismo-Olivazzi.webp";
import LVG from "@/components/icons/hotels/LVG-Hotel-al-Mulino.webp";
import Centauri from "@/components/icons/hotels/Centauri-Hotel-Cantalupo.jpg";
import AlliDueBuoiRossi from "@/components/icons/hotels/Hotel-Alli-Due-Buoi-Rossi.webp";

const places = [
  {
    name: "Agriturismo Cascina Amarant",
    description: "Camere in cascina rinnovata, atmosfera rurale a 7 minuti dalla location.",
    type: "Agriturismo",
    phone: "+39 337 334 510",
    maps: "https://www.google.com/maps/search/?api=1&query=Agriturismo+Cascina+Amarant",
    website: "https://www.agriturismoamarant.it/",
    image:
      CascinaAmarant,
  },
  {
    name: "HM Motel Hotel",
    description: "Hotel moderno a Castellazzo Bormida, 7 minuti dalla location.",
    type: "Hotel",
    phone: "+39 0131 278858",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Via+Pietro+Caselli,+15073+Castellazzo+Bormida",
    website:
      "https://www.motelhotel.it/",
    image:
      HM,
  },
  {
    name: "Il Murôn Guest House",
    description: "Guest house accogliente, 10 minuti dalla location",
    type: "Guest House",
    phone: "+39 366 458 4296",
    maps: "https://www.google.com/maps/search/?api=1&query=Il+Muron+Guest+House",
    website: "https://www.monferratoguesthouse.it/il-muron-guest-house/",
    image:
      IlMuron,
  },
  {
    name: "Agriturismo Olivazzi",
    description: "Agriturismo con camere e ristorante a Quattordio, 13 minuti dalla location",
    type: "Agriturismo",
    phone: "+39 339 502 5920",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Piazza+Olivazzi+2,+15028+Quattordio",
    website:
      "https://www.olivazzi.it/",
    image:
      Olivazzi,
  },
  {
    name: "LVG Hotel al Mulino",
    description: "Hotel con ristorante ad Alessandria, 19 minuti dalla location.",
    type: "Hotel",
    phone: "+39 0131 362250",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Via+Casale+44,+15122+Alessandria",
    website:
      "https://almulino-hotel.it/",
    image:
      LVG,
  },
  {
    name: "Centauri (Hotel Cantalupo)",
    description: "Camere a Cantalupo, 17 minuti dalla location",
    type: "Hotel",
    phone: "",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Viale+Madonnina+dei+Centauri+137,+15073+Cantalupo",
    website: "https://www.booking.com/hotel/it/centauri-castellazzo-bormida.html",
    image:
      Centauri,
  },
  {
    name: "Hotel Alli Due Buoi Rossi",
    description:
      "Storico 4 stelle in centro ad Alessandria, 20 minuti dalla location",
    type: "Hotel",
    phone: "+39 0131 517171",
    maps: "https://www.google.com/maps/dir/?api=1&destination=Hotel+Alli+Due+Buoi+Rossi,+Alessandria",
    website:
      "https://www.hotelalliduebuoirossi.com/",
    image:
      AlliDueBuoiRossi,
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
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.85)
  );
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  padding: 0 0 1.2rem;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  overflow: hidden;
  min-height: 100%;
  align-items: stretch;
}

.placename {
  color: #25744b;
}
.card-image {
  width: 100%;
  aspect-ratio: 3 / 2;
  min-height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    185deg,
    rgba(0, 0, 0, 0.05) 35%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card-header {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "pill"
    "title"
    "desc";
  gap: 0.40rem;
  align-items: stretch;
  padding: 0 1.2rem;
  margin-top: 0;
  position: relative;
  z-index: 3;
  text-shadow: none;
}

.card h3 {
  grid-area: title;
  margin: 0;
  text-align: center;
  font-size: 26px;
  letter-spacing: 0.04em;
  color: #25744b;
}

.desc {
  grid-area: desc;
  margin: 0;
  line-height: 1.3;
  color: #25744b;
  align-items: stretch;
  font-size: 20px;
}

.pill {
  grid-area: pill;
  align-self: start;
  text-align: center;
  color: #25744b;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.15);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.actions {
  display: grid;
  gap: 0.45rem;
  padding: 0 1.2rem 0.6rem;
  margin-top: auto;
}

.action-link {
  display: block;
  width: 100%;
  text-align: left;
  font-size: 0.98rem;
  color: var(--textcolor);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 10px;
  padding: 0.65rem 0.8rem;
  background: rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.action-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
}

.action-missing {
  display: block;
  width: 100%;
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.7);
  padding: 0.6rem 0.8rem;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
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
