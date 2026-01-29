<template>
  <div class="lista-nozze-page">
    <PageHero
      title="Lista Nozze"
      subtitle="Il vostro regalo più bello"
    />
    <div class="content-container">
      <!-- Message Section -->
      <section class="message-section">
        <div class="message-card">
          <FontAwesomeIcon :icon="faHeart" class="heart-icon" />
          <p class="main-message">
            Il dono più grande sarà condividere con voi questo giorno speciale.
          </p>
          <p class="sub-message">
            Qualora desideraste farci un regalo, un contributo al nostro viaggio di nozze 
            ci aiuterà ad iniziare la nostra avventura insieme.
          </p>
        </div>
      </section>

      <!-- IBAN Section -->
      <section class="iban-section">
        <div class="iban-card">
          <div class="iban-header">
            <FontAwesomeIcon :icon="faUniversity" class="iban-icon" />
            <h2>Bonifico Bancario</h2>
          </div>
          <div class="iban-body">
            <p class="iban-label">IBAN intestato a:</p>
            <p class="iban-name">Carlo Musso & Francesca Savoia</p>
            <div class="iban-code">
              <code>IT71 J036 6901 6000 6944 7104 684</code>
              <button @click="copyIBAN" class="copy-btn" :class="{ copied: isCopied }">
                <FontAwesomeIcon :icon="isCopied ? faCheck : faCopy" />
                {{ isCopied ? 'Copiato!' : 'Copia' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Honeymoon Journey Section -->
      <section class="map-section">
        <h2>Il Nostro Viaggio di Nozze</h2>
        <p class="map-intro">
          Seguici nella nostra avventura attraverso Nuova Zelanda e Fiji! Il nostro viaggio parte da Milano e ritorna a casa dopo aver esplorato l'emisfero australe.
        </p>
        <div class="map-container">
          <HoneymoonSequence :stops="STOPS" />
        </div>
        
        <div class="destinations-grid">
          <div class="destination-card">
            <FontAwesomeIcon :icon="faMountain" class="dest-icon" />
            <h3>Nuova Zelanda</h3>
            <p>Paesaggi mozzafiato, montagne e avventure</p>
          </div>
          <div class="destination-card">
            <FontAwesomeIcon :icon="faUmbrellaBeach" class="dest-icon" />
            <h3>Fiji</h3>
            <p>Paradiso tropicale e relax sulle spiagge</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faHeart,
  faUniversity,
  faCopy,
  faCheck,
  faMountain,
  faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons'
import HoneymoonSequence from '@/components/HoneymoonSequence.vue'
import PageHero from '@/components/PageHero.vue'

const STOPS = [
  {
    id: 1,
    title: 'Partenza da Milano',
    location: 'Milano, Italia',
    description: 'Il nostro viaggio inizia tra le vie di casa, con il cuore pieno di emozione.'
  },
  {
    id: 2,
    title: 'Nuova Zelanda',
    location: 'Wellington',
    description: 'Paesaggi mozzafiato, natura incontaminata e nuove avventure insieme.'
  },
  {
    id: 3,
    title: 'Fiji',
    location: 'Suva',
    description: 'Relax tropicale, mare cristallino e tramonti indimenticabili.'
  },
  {
    id: 4,
    title: 'Ritorno a Milano',
    location: 'Milano, Italia',
    description: 'Torniamo a casa con ricordi preziosi e un nuovo capitolo da scrivere.'
  }
]

const isCopied = ref(false)

function copyIBAN() {
  const iban = 'IT71J036690160006944710468'
  navigator.clipboard.writeText(iban).then(() => {
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  })
}
</script>

<style scoped>
.lista-nozze-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--champagne) 0%, var(--ivory) 100%);
}


.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.message-section {
  margin-bottom: 3rem;
}

.message-card {
  background: var(--ivory);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--wine-burgundy);
}

.heart-icon {
  font-size: 3rem;
  color: var(--wine-burgundy);
  margin-bottom: 1.5rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.main-message {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--wine-burgundy);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
  line-height: 1.5;
}

.sub-message {
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
  color: var(--text-dark);
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
}

.iban-section {
  margin-bottom: 4rem;
}

.iban-card {
  background: var(--ivory);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.iban-header {
  background: linear-gradient(135deg, rgba(236, 249, 239, 0.95), rgba(248, 255, 242, 0.95));
  color: var(--wine-burgundy);
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(28, 107, 56, 0.15);
}

.iban-icon {
  font-size: 2.5rem;
  color: var(--wine-burgundy);
}

.iban-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin: 0;
  font-weight: 700;
}

.iban-body {
  padding: 2.5rem 2rem;
  text-align: center;
}

.iban-label {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--stone-gray);
  margin: 0 0 0.5rem 0;
}

.iban-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  margin: 0 0 2rem 0;
  font-weight: 600;
}

.iban-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.iban-code code {
  font-family: 'Courier New', monospace;
  font-size: clamp(1rem, 2vw, 1.3rem);
  background: var(--champagne);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: var(--textcolor);
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  font-weight: 600;
}

.copy-btn {
  padding: 0.75rem 1.5rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 12px;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.copy-btn.copied {
  background: #4caf50;
}

.map-section {
  background: var(--ivory);
  padding: 3rem 2rem;
  padding-top: 4rem; /* Extra space for scene that pops out */
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: visible; /* Allow scene to pop out */
}

.map-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.map-intro {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  text-align: center;
  color: var(--text-dark);
  margin: 0 0 2rem 0;
  font-style: italic;
}

.map-container {
  margin-bottom: 2rem;
  margin-top: 1rem;
  border-radius: 16px;
  overflow: visible; /* Allow scene to pop out */
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.destination-card {
  text-align: center;
  padding: 2rem;
  background: var(--champagne);
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-5px);
}

.dest-icon {
  font-size: 2.5rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
}

.destination-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--wine-burgundy);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.destination-card p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.6;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .content-container {
    padding: 2rem 1rem;
  }

  .message-card {
    padding: 2.5rem 1.5rem;
  }

  .iban-code {
    flex-direction: column;
  }

  .iban-code code {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  .map-section {
    padding: 2.5rem 1.5rem;
  }

  .destinations-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .message-card {
    padding: 2rem 1rem;
  }

  .heart-icon {
    font-size: 2.5rem;
  }

  .iban-body {
    padding: 2rem 1rem;
  }

  .map-section {
    padding: 2rem 1rem;
  }
}
</style>