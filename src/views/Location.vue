<template>
  <div class="location-page">
    <PageHero
      title="Il Castello"
      subtitle="Castello di Oviglio - Una storia d'amore in un luogo storico"
    >
      <template #media>
        <img
          src="@/components/logos/logo_castello.png"
          alt="Logo Castello di Oviglio"
          class="page-hero__logo"
        />
      </template>
    </PageHero>
    
    <!-- Map + Info Section -->
    <div class="location-content">
      <!-- Map Container -->
      <div class="map-wrapper">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6227387696003!2d8.484674076289313!3d44.86045777351844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0xcf63cf8766901e09!2sCastello%20di%20Oviglio!5e1!3m2!1sit!2sit!4v1753208199142!5m2!1sit!2sit"
            class="styled-map"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="map-overlay">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Castello+di+Oviglio,Via+XXIV+Maggio,1,15026+Oviglio+AL" 
              target="_blank" 
              rel="noopener noreferrer"
              class="directions-btn"
            >
              <FontAwesomeIcon :icon="faRoute" />
              Ottieni Indicazioni
            </a>
          </div>
        </div>
      </div>
      
      <!-- Venue Details Cards -->
      <div class="venue-details">
        <div class="detail-card">
          <div class="card-icon">
            <FontAwesomeIcon :icon="faMapMarkerAlt" />
          </div>
          <h3>Indirizzo</h3>
          <p>Via XXIV Maggio, 1</p>
          <p>15026 Oviglio (AL)</p>
          <p class="region">Piemonte, Italia</p>
        </div>
        
        <div class="detail-card">
          <div class="card-icon">
            <FontAwesomeIcon :icon="faParking" />
          </div>
          <h3>Parcheggio</h3>
          <p>Parcheggio disponibile presso il castello</p>
          <p class="note">Ampio spazio per tutti gli ospiti</p>
        </div>
        
        <div class="detail-card">
          <div class="card-icon">
            <FontAwesomeIcon :icon="faGlassCheers" />
          </div>
          <h3>Ricevimento</h3>
          <p>Nel vigneto del castello</p>
          <p class="note">Vista panoramica sulle colline del Monferrato</p>
        </div>
        
        <div class="detail-card">
          <div class="card-icon">
            <FontAwesomeIcon :icon="faClock" />
          </div>
          <h3>Orario Cerimonia</h3>
          <p>Venerdì 11 Luglio 2026</p>
          <p class="time">Ore 16:30</p>
        </div>
      </div>
    </div>
    
    <!-- Castle History Section -->
    <section class="castle-history">
      <h2>Il Nostro Castello</h2>
      <div class="history-content">
        <div class="history-text">
          <p>
            Il <strong>Castello di Oviglio</strong>, situato nel cuore del Monferrato piemontese, 
            è una location storica di straordinaria bellezza immersa tra dolci colline e vigneti centenari.
          </p>
          <p>
            Questo antico maniero, risalente al medioevo, rappresenta un esempio perfetto 
            dell'architettura castellana piemontese, con le sue torri eleganti e i suoi giardini curati.
          </p>
          <p>
            Il castello è circondato da vigneti che producono alcuni dei migliori vini della regione, 
            offrendo uno scenario romantico e suggestivo per celebrare il nostro giorno speciale.
          </p>
          <p>
            Le sale interne conservano l'atmosfera originale con soffitti affrescati e arredi d'epoca, 
            mentre gli spazi esterni offrono una vista mozzafiato sulle colline del Monferrato, 
            patrimonio UNESCO.
          </p>
        </div>
        <div class="history-features">
          <div class="feature">
            <FontAwesomeIcon :icon="faWineBottle" class="feature-icon" />
            <h4>Vigneti Storici</h4>
            <p>Circondato da vigneti di Barbera e Grignolino</p>
          </div>
          <div class="feature">
            <FontAwesomeIcon :icon="faLandmarkDome" class="feature-icon" />
            <h4>Architettura Medievale</h4>
            <p>Torri e mura del XII secolo</p>
          </div>
          <div class="feature">
            <FontAwesomeIcon :icon="faTree" class="feature-icon" />
            <h4>Giardini Romantici</h4>
            <p>Parco secolare con alberi monumentali</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PageHero from '@/components/PageHero.vue'
import {
  faMapMarkerAlt, 
  faRoute, 
  faParking, 
  faGlassCheers,
  faClock,
  faWineBottle,
  faLandmarkDome,
  faTree
} from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>
.location-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--champagne) 0%, var(--ivory) 100%);
}


.location-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.map-wrapper {
  margin-bottom: 3rem;
}

.map-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(107, 28, 35, 0.15);
  border: 3px solid var(--wine-burgundy);
}

.styled-map {
  width: 100%;
  height: 500px;
  border: none;
  display: block;
}

.map-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.directions-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba(107, 28, 35, 0.4);
  transition: all 0.3s ease;
}

.directions-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(107, 28, 35, 0.5);
}

.venue-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.detail-card {
  background: var(--ivory);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(107, 28, 35, 0.15);
  border-color: var(--wine-burgundy);
}

.card-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: var(--wine-burgundy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 1.8rem;
}

.detail-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.detail-card p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--text-dark);
  margin: 0.5rem 0;
  line-height: 1.6;
}

.detail-card .region,
.detail-card .note {
  font-size: 0.9rem;
  color: var(--stone-gray);
  font-style: italic;
}

.detail-card .time {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--wine-burgundy);
}

.castle-history {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: var(--ivory);
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.castle-history h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 700;
}

.history-content {
  display: grid;
  gap: 3rem;
}

.history-text {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
}

.history-text p {
  margin-bottom: 1.5rem;
  text-align: justify;
}

.history-text strong {
  color: var(--wine-burgundy);
  font-weight: 600;
}

.history-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 1.5rem;
  background: var(--champagne);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
}

.feature h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.feature p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--stone-gray);
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .location-content {
    padding: 2rem 1rem;
  }

  .styled-map {
    height: 350px;
  }

  .directions-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .venue-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .castle-history {
    padding: 3rem 1.5rem;
  }

  .history-features {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .styled-map {
    height: 300px;
  }

  .map-overlay {
    bottom: 15px;
  }

  .directions-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }

  .card-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .detail-card {
    padding: 1.5rem;
  }

  .castle-history {
    padding: 2.5rem 1rem;
  }

  .history-text {
    font-size: 1rem;
  }

  .feature-icon {
    font-size: 2rem;
  }
}
</style>
