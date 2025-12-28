<template>
  <div class="accommodation-page">
    <!-- Header -->
    <header class="page-header">
      <h1>Dove Alloggiare</h1>
      <p class="subtitle">Consigli per il tuo soggiorno nel Monferrato</p>
    </header>
    
    <!-- Intro Section -->
    <div class="content-container">
      <section class="intro-section">
        <FontAwesomeIcon :icon="faBed" class="intro-icon" />
        <p class="intro-text">
          Oviglio è una piccola località nel cuore del Monferrato. Vi consigliamo di soggiornare 
          nelle città vicine come Alessandria, Asti o Acqui Terme, tutte raggiungibili in circa 20-30 minuti.
        </p>
      </section>

      <!-- Accommodation Cards -->
      <div class="hotels-grid">
        <div v-for="hotel in hotels" :key="hotel.id" class="hotel-card">
          <div class="hotel-header">
            <div class="hotel-icon">
              <FontAwesomeIcon :icon="hotel.icon" />
            </div>
            <div>
              <h3>{{ hotel.name }}</h3>
              <p class="hotel-location">
                <FontAwesomeIcon :icon="faMapMarkerAlt" />
                {{ hotel.location }}
              </p>
            </div>
          </div>
          
          <div class="hotel-body">
            <p class="hotel-description">{{ hotel.description }}</p>
            
            <div class="hotel-info">
              <div class="info-item">
                <FontAwesomeIcon :icon="faRoute" />
                <span>{{ hotel.distance }}</span>
              </div>
              <div class="info-item">
                <FontAwesomeIcon :icon="faStar" />
                <span>{{ hotel.rating }}</span>
              </div>
            </div>
            
            <a 
              v-if="hotel.link" 
              :href="hotel.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hotel-link"
            >
              <FontAwesomeIcon :icon="faExternalLinkAlt" />
              Visualizza su Google Maps
            </a>
          </div>
        </div>
      </div>

      <!-- Tips Section -->
      <section class="tips-section">
        <h2>Consigli Utili</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <FontAwesomeIcon :icon="faCar" class="tip-icon" />
            <h3>Auto</h3>
            <p>Consigliamo vivamente di avere un'auto per raggiungere comodamente il castello e spostarsi nella zona.</p>
          </div>
          
          <div class="tip-card">
            <FontAwesomeIcon :icon="faCalendarCheck" class="tip-icon" />
            <h3>Prenotazione</h3>
            <p>Vi suggeriamo di prenotare con anticipo, soprattutto se pianificate di soggiornare il weekend del matrimonio.</p>
          </div>
          
          <div class="tip-card">
            <FontAwesomeIcon :icon="faWineGlass" class="tip-icon" />
            <h3>Esperienza</h3>
            <p>Approfittate del soggiorno per visitare le cantine e degustare i vini del Monferrato!</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBed,
  faMapMarkerAlt,
  faRoute,
  faStar,
  faExternalLinkAlt,
  faCar,
  faCalendarCheck,
  faWineGlass,
  faHotel,
  faHome,
  faBuilding
} from '@fortawesome/free-solid-svg-icons'

const hotels = [
  {
    id: 1,
    name: 'Alessandria',
    location: 'Alessandria, AL',
    description: 'La città più vicina con ampia scelta di hotel e B&B. Centro storico caratteristico e tutti i servizi.',
    distance: '15 km dal castello',
    rating: 'Varie opzioni disponibili',
    icon: faBuilding,
    link: 'https://www.google.com/maps/search/hotel+alessandria+italia'
  },
  {
    id: 2,
    name: 'Asti',
    location: 'Asti, AT',
    description: 'Bellissima città nel cuore del Monferrato, famosa per i vini e la gastronomia. Molto romantica.',
    distance: '30 km dal castello',
    rating: 'Consigliata',
    icon: faHotel,
    link: 'https://www.google.com/maps/search/hotel+asti+italia'
  },
  {
    id: 3,
    name: 'Acqui Terme',
    location: 'Acqui Terme, AL',
    description: 'Città termale con hotel spa. Perfetta per un weekend di relax prima o dopo il matrimonio.',
    distance: '25 km dal castello',
    rating: 'Spa & Wellness',
    icon: faHome,
    link: 'https://www.google.com/maps/search/hotel+acqui+terme+italia'
  }
]
</script>

<style scoped>
.accommodation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--champagne) 0%, var(--ivory) 100%);
}

.page-header {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(to bottom, var(--wine-burgundy), var(--terracotta));
  color: var(--text-light);
}

.page-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-style: italic;
  margin: 0;
  opacity: 0.95;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.intro-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--ivory);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.intro-icon {
  font-size: 3rem;
  color: var(--wine-burgundy);
  margin-bottom: 1.5rem;
}

.intro-text {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
}

.hotels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.hotel-card {
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hotel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(107, 28, 35, 0.15);
  border-color: var(--wine-burgundy);
}

.hotel-header {
  background: linear-gradient(135deg, var(--wine-burgundy), var(--terracotta));
  color: var(--text-light);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hotel-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.hotel-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.hotel-location {
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hotel-body {
  padding: 1.5rem;
}

.hotel-description {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 0 0 1.5rem 0;
}

.hotel-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--champagne);
  border-radius: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-dark);
}

.info-item svg {
  color: var(--wine-burgundy);
}

.hotel-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.hotel-link:hover {
  background: var(--terracotta);
  transform: translateX(5px);
}

.tips-section {
  background: var(--ivory);
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.tips-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 700;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tip-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--champagne);
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-5px);
}

.tip-icon {
  font-size: 2.5rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
}

.tip-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.tip-card p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 0;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 3rem 1.5rem 1.5rem;
  }

  .content-container {
    padding: 2rem 1rem;
  }

  .hotels-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .tips-section {
    padding: 2.5rem 1.5rem;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 2.5rem 1rem 1rem;
  }

  .intro-section {
    padding: 1.5rem;
  }

  .intro-icon {
    font-size: 2.5rem;
  }

  .hotel-header {
    flex-direction: column;
    text-align: center;
  }

  .hotel-info {
    flex-direction: column;
    gap: 0.75rem;
  }

  .tips-section {
    padding: 2rem 1rem;
  }
}
</style>