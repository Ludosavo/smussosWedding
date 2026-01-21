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
    
    <!-- Getting There Section -->
    <section class="getting-there">
      <h2>Come Arrivare</h2>
      <p class="getting-intro">
        La giornata inizia con la cerimonia in chiesa e prosegue al Castello per il ricevimento.
      </p>
      
      <div class="venues-journey">
        <!-- Church Card -->
        <div class="venue-card church-card">
          <div class="venue-header">
            <div class="venue-icon">
              <FontAwesomeIcon :icon="faChurch" />
            </div>
            <div class="venue-badge">Cerimonia</div>
          </div>
          <h3>Chiesa di SS. Felice e Agata</h3>
          <p class="venue-address">
            <FontAwesomeIcon :icon="faMapMarkerAlt" />
            Via XX Settembre, 59 - 15026 Oviglio (AL)
          </p>
          <p class="venue-time">
            <FontAwesomeIcon :icon="faClock" />
            Ore 16:30
          </p>
          <div class="venue-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.8847520849473!2d8.484099776291391!3d44.86289997097017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0x8e8c8e8c8e8c8e8c!2sVia%20XX%20Settembre%2C%2059%2C%2015026%20Oviglio%20AL!5e0!3m2!1sit!2sit!4v1705689600000!5m2!1sit!2sit"
              class="mini-map"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Via+XX+Settembre+59+15026+Oviglio+AL" 
            target="_blank" 
            rel="noopener noreferrer"
            class="venue-directions-btn"
          >
            <FontAwesomeIcon :icon="faRoute" />
            Indicazioni Chiesa
          </a>
        </div>

        <!-- Journey Arrow -->
        <div class="journey-connector">
          <div class="journey-line"></div>
          <div class="journey-info">
            <FontAwesomeIcon :icon="faCar" class="car-icon" />
            <span class="journey-distance">~2 km</span>
            <span class="journey-time">5 minuti in auto</span>
          </div>
          <div class="journey-line"></div>
        </div>

        <!-- Castle Card -->
        <div class="venue-card castle-card">
          <div class="venue-header">
            <div class="venue-icon">
              <FontAwesomeIcon :icon="faChessRook" />
            </div>
            <div class="venue-badge">Ricevimento</div>
          </div>
          <h3>Castello di Oviglio</h3>
          <p class="venue-address">
            <FontAwesomeIcon :icon="faMapMarkerAlt" />
            Via XXIV Maggio, 1 - 15026 Oviglio (AL)
          </p>
          <p class="venue-time">
            <FontAwesomeIcon :icon="faClock" />
            Dalle ore 17:30
          </p>
          <div class="venue-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6227387696003!2d8.484674076289313!3d44.86045777351844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0xcf63cf8766901e09!2sCastello%20di%20Oviglio!5e1!3m2!1sit!2sit!4v1753208199142!5m2!1sit!2sit"
              class="mini-map"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Castello+di+Oviglio,Via+XXIV+Maggio,1,15026+Oviglio+AL" 
            target="_blank" 
            rel="noopener noreferrer"
            class="venue-directions-btn"
          >
            <FontAwesomeIcon :icon="faRoute" />
            Indicazioni Castello
          </a>
        </div>
      </div>

      <!-- Transportation Info -->
      <div class="transportation-info">
        <div class="transport-card">
          <FontAwesomeIcon :icon="faCar" class="transport-icon" />
          <h4>In Auto</h4>
          <p>Consigliamo di arrivare in auto propria. Parcheggio gratuito disponibile sia presso la chiesa che al castello.</p>
        </div>
        <div class="transport-card">
          <FontAwesomeIcon :icon="faParking" class="transport-icon" />
          <h4>Parcheggio</h4>
          <p>Ampi spazi parcheggio in entrambe le location. Seguite le indicazioni all'arrivo.</p>
        </div>
        <div class="transport-card">
          <FontAwesomeIcon :icon="faWineGlass" class="transport-icon" />
          <h4>Consiglio</h4>
          <p>Se prevedete di bere, organizzatevi con un guidatore designato o prenotate un taxi in anticipo.</p>
        </div>
      </div>
    </section>

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
  faTree,
  faChurch,
  faChessRook,
  faCar,
  faWineGlass
} from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>
.location-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--champagne) 0%, var(--ivory) 100%);
}

/* Getting There Section */
.getting-there {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.getting-there h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.getting-intro {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  text-align: center;
  color: var(--text-dark);
  margin: 0 0 3rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.venues-journey {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  margin-bottom: 3rem;
}

.venue-card {
  flex: 1;
  background: var(--ivory);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.venue-card:hover {
  border-color: var(--wine-burgundy);
  transform: translateY(-5px);
}

.venue-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.venue-icon {
  width: 60px;
  height: 60px;
  background: var(--wine-burgundy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.venue-badge {
  background: var(--terracotta);
  color: white;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.venue-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.venue-address,
.venue-time {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-dark);
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.venue-address svg,
.venue-time svg {
  color: var(--wine-burgundy);
  width: 16px;
}

.venue-map {
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--champagne);
}

.mini-map {
  width: 100%;
  height: 200px;
  border: none;
  display: block;
}

.venue-directions-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--wine-burgundy);
  color: white;
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  width: 100%;
  justify-content: center;
}

.venue-directions-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

/* Journey Connector */
.journey-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 1rem 0;
}

.journey-line {
  width: 3px;
  flex: 1;
  min-height: 40px;
  background: linear-gradient(to bottom, var(--champagne), var(--wine-burgundy), var(--champagne));
}

.journey-info {
  background: var(--wine-burgundy);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  color: white;
}

.car-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.journey-distance {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
}

.journey-time {
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Transportation Info */
.transportation-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.transport-card {
  background: var(--ivory);
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.transport-icon {
  font-size: 2rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
}

.transport-card h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.75rem 0;
}

.transport-card p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.6;
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

  /* Getting There responsive */
  .getting-there {
    padding: 2rem 1rem;
  }

  .venues-journey {
    flex-direction: column;
    gap: 1rem;
  }

  .journey-connector {
    flex-direction: row;
    min-width: auto;
    width: 100%;
    padding: 0.5rem 0;
  }

  .journey-line {
    height: 3px;
    width: auto;
    flex: 1;
    min-height: auto;
    background: linear-gradient(to right, var(--champagne), var(--wine-burgundy), var(--champagne));
  }

  .journey-info {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .car-icon {
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  .journey-distance,
  .journey-time {
    display: inline;
    font-size: 0.85rem;
  }

  .venue-card {
    padding: 1.5rem;
  }

  .mini-map {
    height: 180px;
  }

  .transportation-info {
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
