<template>
  <div class="contatti-page">
    <!-- Header -->
    <header class="page-header">
      <h1>Contatti</h1>
      <p class="subtitle">Per qualsiasi domanda, siamo qui per aiutarti</p>
    </header>
    
    <!-- Contacts Grid -->
    <div class="contacts-container">
      <div class="contacts-grid">
        <div v-for="contatto in contatti" :key="contatto.id" class="contact-card">
          <div class="card-header">
            <div class="icon-circle">
              <FontAwesomeIcon :icon="contatto.icon" />
            </div>
            <h3>{{ contatto.ruolo }}</h3>
          </div>
          
          <div class="card-body">
            <div class="contact-info">
              <FontAwesomeIcon :icon="faPhone" class="info-icon" />
              <a :href="`tel:${contatto.numero.replace(/\s/g, '')}`" class="phone-link">
                {{ contatto.numero }}
              </a>
            </div>
            
            <button 
              @click="callContact(contatto.numero)"
              class="call-btn"
            >
              <FontAwesomeIcon :icon="faPhoneAlt" />
              Chiama Ora
            </button>
          </div>
        </div>
      </div>
      
      <!-- Help Section -->
      <section class="help-section">
        <div class="help-content">
          <FontAwesomeIcon :icon="faEnvelope" class="help-icon" />
          <h2>Hai bisogno di aiuto?</h2>
          <p>Non esitare a contattare gli sposi o i testimoni per qualsiasi informazione sul matrimonio, 
             l'alloggio, o la cerimonia. Siamo qui per rendere questo giorno speciale anche per te!</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPhone, 
  faPhoneAlt,
  faEnvelope,
  faHeart,
  faUserTie,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

const contatti = [
  { 
    id: 1, 
    ruolo: 'Francesca (Sposa)', 
    numero: '+39 348 659 6445',
    icon: faHeart
  },
  { 
    id: 2, 
    ruolo: 'Carlo (Sposo)', 
    numero: '+39 333 172 0209',
    icon: faHeart
  },
  { 
    id: 3, 
    ruolo: 'Testimone - Anna', 
    numero: '+39 331 948 3693',
    icon: faUsers
  },
  { 
    id: 4, 
    ruolo: 'Testimone - Isabel', 
    numero: '+39 345 724 4224',
    icon: faUsers
  },
  { 
    id: 5, 
    ruolo: 'Testimone - Filippo', 
    numero: '+39 347 275 2852',
    icon: faUsers
  },
  { 
    id: 6, 
    ruolo: 'Testimone - José', 
    numero: '+39 333 956 8853',
    icon: faUsers
  }
]

function callContact(numero) {
  window.location.href = `tel:${numero.replace(/\s/g, '')}`
}
</script>

<style scoped>
.contatti-page {
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

.contacts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-card {
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(107, 28, 35, 0.15);
  border-color: var(--wine-burgundy);
}

.card-header {
  background: linear-gradient(135deg, var(--wine-burgundy), var(--terracotta));
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
}

.icon-circle {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.card-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin: 0;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--champagne);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.info-icon {
  color: var(--wine-burgundy);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.phone-link {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.phone-link:hover {
  color: var(--wine-burgundy);
}

.call-btn {
  width: 100%;
  padding: 0.875rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 12px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.call-btn:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
}

.help-section {
  background: var(--ivory);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--wine-burgundy);
}

.help-content {
  max-width: 700px;
  margin: 0 auto;
}

.help-icon {
  font-size: 3rem;
  color: var(--wine-burgundy);
  margin-bottom: 1.5rem;
}

.help-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.help-section p {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin: 0;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 3rem 1.5rem 1.5rem;
  }

  .contacts-container {
    padding: 2rem 1rem;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .help-section {
    padding: 2.5rem 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 2.5rem 1rem 1rem;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .icon-circle {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .card-header h3 {
    font-size: 1.2rem;
  }

  .help-section {
    padding: 2rem 1rem;
  }

  .help-icon {
    font-size: 2.5rem;
  }

  .help-section p {
    font-size: 1rem;
  }
}
</style>