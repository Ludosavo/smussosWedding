<template>
  <main class="location-page">
    <div class="top-grid">
      <section class="castle-hero glass-card">
        <div class="hero-image">
          <img
            src="@/components/icons/castello.jpg"
            alt="Castello di Oviglio"
            loading="lazy"
          />
        </div>
        <div class="hero-text">
          <h3>Castello di Oviglio</h3>
          <p>
            Residenza storica del XVIII secolo immersa nel Monferrato, con sale affrescate e un parco che ospiterà il ricevimento.
          </p>
          <p class="hero-note">Consulta la mappa per indicazioni e tempi di percorrenza.</p>
        </div>
      </section>

      <section class="map-section glass-card">
        <iframe
          class="map-embed"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6227387696003!2d8.484674076289313!3d44.86045777351844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0xcf63cf8766901e09!2sCastello%20di%20Oviglio!5e1!3m2!1sit!2sit!4v1753208199142!5m2!1sit!2sit"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Castello di Oviglio"
        ></iframe>
        <h4 class="address">
          <i class="fa-solid fa-location-dot"></i>
          Via XXIV Maggio, 1 · 15026 Oviglio (AL)
        </h4>
      </section>
    </div>
    <div class="infoutili">
      <h3>Info Utili</h3>
    </div>

    <section class="parking-card glass-card">
      <div class="parking-image">
        <img src="@/components/icons/Parcheggi.png" alt="Parcheggi consigliati" loading="lazy" />
      </div>
      <div class="parking-text">
        <p>
          Vi consigliamo di sostare al parcheggio <strong>numero 3</strong>, in quanto più comodo sia per raggiungere il castello (1) che la chiesa (4).
        </p>
        <p>
          Tuttavia, essendo un parcheggio limitato (~15 posti auto), vi consigliamo di posteggiare al <strong>parcheggio numero 2</strong>, poiché più ampio.
        </p>
      </div>
    </section>
  </main>
</template>

<script>


export default {
  name: "Location",
  data() {
    return {
      punti: [
        {
          id: "castello",
          nome: "Castello di Oviglio",
          distanza: "2 min a piedi",
          descrizione: "Dimora storica (sede del ricevimento) con giardini e sale affrescate.",
          img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
        },
        {
          id: "borsalino",
          nome: "Museo del Cappello Borsalino (Alessandria)",
          distanza: "18 min in auto",
          descrizione: "Collezioni iconiche del brand Borsalino e storia della manifattura alessandrina.",
          img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
        },
        {
          id: "duomo",
          nome: "Duomo & Piazza della Libertà (Alessandria)",
          distanza: "20 min in auto",
          descrizione: "Centro storico con cattedrale ottocentesca, palazzi nobiliari e caffè sotto i portici.",
          img: "https://images.unsplash.com/photo-1505761682587-4d41b2b63b7f?auto=format&fit=crop&w=1600&q=80",
        },
        {
          id: "acquiterme",
          nome: "Acqui Terme - La Bollente",
          distanza: "35 min in auto",
          descrizione: "Cittadina termale con fontana sulfurea a 74°C e un centro pedonale vivace.",
          img: "https://images.unsplash.com/photo-1505761677228-4205f06bd8d2?auto=format&fit=crop&w=1600&q=80",
        },
      ],
    };
  },
};
</script>

<style scoped>
.location-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 3vw, 2.6rem) 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  color: var(--textcolor);
}

.glass-card {
  width: min(100%, 800px);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.top-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  justify-items: center;
}

.castle-hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.1rem;
  align-items: center;
}

.hero-image {
  justify-self: center;
  width: 80%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-text {
  display: grid;
  gap: 0.5rem;
  line-height: 1.5;
}

.infoutili{
  margin-top: 15px;
}
.hero-text h3 {
  text-align: center;
  margin: 0;
}

.hero-note {
  opacity: 0.9;
  font-size: 0.95rem;
}

.map-section {
  padding: 0.6rem 0.6rem 1rem;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}

.map-embed {
  padding-top: 5px;
  width: 95%;
  height: clamp(360px, 30vw, 540px);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.address {
  margin: 0;
  text-align: center;
  color: var(--textcolor);
  font-size: 22px;
}

.address i {
  color: #f15c5c;
  margin-right: 0.4rem;
}

.poi-section {
  padding: 1.3rem 1.5rem 1.5rem;
  display: grid;
  gap: 1rem;
  width: 100%;
}

.poi-header h2 {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.poi-subtitle {
  margin: 0.3rem 0 0;
  opacity: 0.9;
  line-height: 1.4;
}

.poi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
}

.poi-card {
  padding: 0.9rem 0.9rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
  height: 100%;
  display: grid;
  gap: 0.55rem;
}

.poi-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.poi-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.poi-top {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: baseline;
}

.poi-name {
  font-weight: 700;
  letter-spacing: 0.03em;
}

.poi-distance {
  font-size: 0.9rem;
  opacity: 0.9;
}

.poi-desc {
  margin: 0;
  line-height: 1.45;
  opacity: 0.95;
}

.parking-card {
  width: min(100%, 1200px);
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  margin-top: 0.5rem;
}

.parking-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.parking-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.parking-text {
  display: grid;
  gap: 0.5rem;
  line-height: 1.5;
}

.parking-text p {
  margin: 0;
}

@media (max-width: 768px) {
  .location-page {
    padding: 1.5rem 1rem 2.4rem;
    gap: 1.2rem;
  }

  .glass-card {
    width: 100%;
  }

  .top-grid {
    grid-template-columns: 1fr;
  }

  .castle-hero {
    grid-template-columns: 1fr;
  }

  .poi-section {
    padding: 1.1rem 1.2rem 1.3rem;
  }

  .parking-card {
    padding: 1rem;
  }
}
</style>
