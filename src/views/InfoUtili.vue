<template>
  <div class="info-utili-page">
    <!-- Header -->
    <header class="page-header">
      <h1>Info Utili</h1>
      <p class="subtitle">Tutto quello che devi sapere per il grande giorno</p>
    </header>
    
    <div class="content-container">
      <!-- Timeline Section -->
      <section class="timeline-section">
        <h2>Programma della Giornata</h2>
        <div class="timeline">
          <div v-for="event in schedule" :key="event.id" class="timeline-item">
            <div class="timeline-marker">
              <FontAwesomeIcon :icon="event.icon" />
            </div>
            <div class="timeline-content">
              <div class="time">{{ event.time }}</div>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Cards Section -->
      <section class="info-cards-section">
        <h2>Informazioni Importanti</h2>
        <div class="info-grid">
          <div v-for="info in infoCards" :key="info.id" class="info-card">
            <div class="card-icon">
              <FontAwesomeIcon :icon="info.icon" />
            </div>
            <h3>{{ info.title }}</h3>
            <p>{{ info.description }}</p>
          </div>
        </div>
      </section>

      <!-- Dress Code Section -->
      <section class="dress-code-section">
        <div class="dress-code-card">
          <FontAwesomeIcon :icon="faTshirt" class="dress-icon" />
          <h2>Dress Code</h2>
          <p class="dress-subtitle">Elegante / Abito da Cerimonia</p>
          <div class="dress-details">
            <p>
              Vi chiediamo di vestire con eleganza per l'occasione. Per le donne suggeriamo 
              abiti lunghi o al ginocchio, per gli uomini giacca e cravatta.
            </p>
            <p class="color-note">
              <strong>Nota:</strong> Evitiamo il bianco, riservato alla sposa! 💍
            </p>
          </div>
        </div>
      </section>

      <!-- Weather & Season Section -->
      <section class="weather-section">
        <h2>Meteo & Stagione</h2>
        <div class="weather-content">
          <div class="weather-card">
            <FontAwesomeIcon :icon="faSun" class="weather-icon" />
            <h3>Luglio in Piemonte</h3>
            <p>Temperature medie: 25-30°C</p>
            <p>Serate più fresche in collina</p>
          </div>
          <div class="weather-tips">
            <h4>Consigli:</h4>
            <ul>
              <li>Portate una giacca leggera per la sera</li>
              <li>Scarpe comode per camminare sul prato</li>
              <li>Occhiali da sole e crema solare</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Contact Emergency Section -->
      <section class="emergency-section">
        <div class="emergency-card">
          <FontAwesomeIcon :icon="faPhoneAlt" class="emergency-icon" />
          <h2>Contatti di Emergenza</h2>
          <p>Per qualsiasi necessità il giorno del matrimonio:</p>
          <div class="emergency-contacts">
            <div class="contact">
              <strong>Carlo:</strong> <a href="tel:+393331720209">+39 333 172 0209</a>
            </div>
            <div class="contact">
              <strong>Francesca:</strong> <a href="tel:+393486596445">+39 348 659 6445</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faChurch,
  faGlassCheers,
  faUtensils,
  faMusic,
  faCar,
  faCamera,
  faGift,
  faChild,
  faTshirt,
  faSun,
  faPhoneAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons'

const schedule = [
  {
    id: 1,
    time: '16:30',
    title: 'Cerimonia',
    description: 'Chiesa di SS. Felice e Agata, Oviglio',
    icon: faChurch
  },
  {
    id: 2,
    time: '17:30',
    title: 'Aperitivo',
    description: 'Ricevimento nel vigneto del castello',
    icon: faGlassCheers
  },
  {
    id: 3,
    time: '19:30',
    title: 'Cena',
    description: 'Banchetto con menù tradizionale piemontese',
    icon: faUtensils
  },
  {
    id: 4,
    time: '22:30',
    title: 'Festa',
    description: 'Musica e balli fino a tarda notte',
    icon: faMusic
  }
]

const infoCards = [
  {
    id: 1,
    icon: faCar,
    title: 'Parcheggio',
    description: 'Ampio parcheggio gratuito disponibile presso il castello. Seguire le indicazioni all\'arrivo.'
  },
  {
    id: 2,
    icon: faCamera,
    title: 'Fotografie',
    description: 'Avremo un fotografo professionista. Sentitevi liberi di scattare foto, ma evitiamo durante la cerimonia.'
  },
  {
    id: 3,
    icon: faGift,
    title: 'Regali',
    description: 'Preferibilmente contributo al viaggio di nozze (vedi sezione Lista Nozze). Tavolo regali disponibile all\'ingresso.'
  },
  {
    id: 4,
    icon: faChild,
    title: 'Bambini',
    description: 'I bambini sono benvenuti! Menù dedicato disponibile. Vi preghiamo di comunicarcelo nell\'RSVP.'
  }
]
</script>

<style scoped>
.info-utili-page {
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

.timeline-section,
.info-cards-section,
.dress-code-section,
.weather-section,
.emergency-section {
  margin-bottom: 4rem;
}

.timeline-section h2,
.info-cards-section h2,
.weather-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 700;
}

.timeline {
  background: var(--ivory);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  width: 60px;
  height: 60px;
  background: var(--wine-burgundy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(107, 28, 35, 0.3);
}

.timeline-content {
  flex: 1;
}

.time {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--text-dark);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.timeline-content p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--stone-gray);
  margin: 0;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.info-card {
  background: var(--ivory);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(107, 28, 35, 0.15);
  border-color: var(--wine-burgundy);
}

.card-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background: var(--wine-burgundy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 1.8rem;
}

.info-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.info-card p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 0;
}

.dress-code-card {
  background: var(--ivory);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--wine-burgundy);
}

.dress-icon {
  font-size: 3rem;
  color: var(--wine-burgundy);
  margin-bottom: 1.5rem;
}

.dress-code-card h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.dress-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  color: var(--terracotta);
  margin: 0 0 2rem 0;
  font-style: italic;
  font-weight: 600;
}

.dress-details {
  max-width: 700px;
  margin: 0 auto;
}

.dress-details p {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.color-note {
  background: var(--champagne);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border-left: 4px solid var(--wine-burgundy);
}

.weather-section {
  background: var(--ivory);
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.weather-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.weather-card {
  text-align: center;
  padding: 2rem;
  background: var(--champagne);
  border-radius: 16px;
}

.weather-icon {
  font-size: 3rem;
  color: #FDB813;
  margin-bottom: 1rem;
}

.weather-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.weather-card p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--text-dark);
  margin: 0.5rem 0;
}

.weather-tips {
  padding: 2rem;
  background: var(--champagne);
  border-radius: 16px;
}

.weather-tips h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.weather-tips ul {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin: 0;
  padding-left: 1.5rem;
}

.weather-tips li {
  margin-bottom: 0.5rem;
}

.emergency-card {
  background: var(--ivory);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--terracotta);
}

.emergency-icon {
  font-size: 3rem;
  color: var(--terracotta);
  margin-bottom: 1.5rem;
}

.emergency-card h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.emergency-card > p {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: var(--text-dark);
  margin: 0 0 1.5rem 0;
}

.emergency-contacts {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  background: var(--champagne);
  padding: 1rem 2rem;
  border-radius: 12px;
}

.contact strong {
  color: var(--wine-burgundy);
  font-weight: 600;
}

.contact a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact a:hover {
  color: var(--wine-burgundy);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 3rem 1.5rem 1.5rem;
  }

  .content-container {
    padding: 2rem 1rem;
  }

  .timeline {
    padding: 1.5rem;
  }

  .timeline-item {
    gap: 1rem;
  }

  .timeline-marker {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .dress-code-card,
  .weather-section,
  .emergency-card {
    padding: 2.5rem 1.5rem;
  }

  .weather-content {
    grid-template-columns: 1fr;
  }

  .emergency-contacts {
    flex-direction: column;
    gap: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 2.5rem 1rem 1rem;
  }

  .timeline-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .dress-icon,
  .weather-icon,
  .emergency-icon {
    font-size: 2.5rem;
  }
}
</style>