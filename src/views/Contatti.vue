<template>
  <div class="contatti-page">
    <PageHero
      title="Contatti"
      subtitle="Per qualsiasi domanda, siamo qui per aiutarti"
    />
    
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

      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>Domande Frequenti</h2>
        <div class="faq-grid">
          <div 
            v-for="faq in faqs" 
            :key="faq.id" 
            class="faq-card"
            :class="{ open: openFaq === faq.id }"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-header">
              <FontAwesomeIcon :icon="faq.icon" class="faq-icon" />
              <h3>{{ faq.question }}</h3>
              <FontAwesomeIcon 
                :icon="faChevronDown" 
                class="chevron-icon"
                :class="{ rotated: openFaq === faq.id }"
              />
            </div>
            <Transition name="accordion">
              <div v-if="openFaq === faq.id" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </Transition>
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
  faPhone, 
  faPhoneAlt,
  faEnvelope,
  faHeart,
  faUserTie,
  faUsers,
  faChevronDown,
  faUserPlus,
  faChild,
  faClock,
  faParking,
  faLeaf
} from '@fortawesome/free-solid-svg-icons'

import PageHero from '@/components/PageHero.vue'

const openFaq = ref(null)

function toggleFaq(id) {
  openFaq.value = openFaq.value === id ? null : id
}

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

const faqs = [
  {
    id: 1,
    icon: faUserPlus,
    question: 'Posso portare un accompagnatore?',
    answer: 'Sì! Se sei stato invitato con il tuo partner o famiglia, includi tutti nella conferma di partecipazione. Se il tuo invito è nominativo, ti preghiamo di rispettare il numero indicato per motivi organizzativi.'
  },
  {
    id: 2,
    icon: faChild,
    question: 'I bambini sono benvenuti?',
    answer: 'Assolutamente sì! I bambini sono i benvenuti al nostro matrimonio. Avremo un menù dedicato per i più piccoli. Ti chiediamo solo di indicare il numero di bambini presenti nel modulo RSVP.'
  },
  {
    id: 3,
    icon: faClock,
    question: 'A che ora finisce la festa?',
    answer: 'La festa proseguirà fino alle ore 02:00 circa. Vi consigliamo di organizzarvi con un alloggio nelle vicinanze se prevedete di restare fino a tardi!'
  },
  {
    id: 4,
    icon: faParking,
    question: 'C\'è parcheggio in entrambe le location?',
    answer: 'Sì, sia presso la Chiesa di SS. Felice e Agata che al Castello di Oviglio è disponibile parcheggio gratuito con ampio spazio per tutti gli ospiti.'
  },
  {
    id: 5,
    icon: faLeaf,
    question: 'Ci saranno opzioni vegetariane/vegane?',
    answer: 'Certamente! Il nostro menu includerà opzioni vegetariane e vegane. Ti preghiamo di indicare eventuali esigenze alimentari specifiche nel modulo RSVP, così potremo garantire piatti deliziosi per tutti.'
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
  background: linear-gradient(135deg, rgba(244, 235, 217, 0.95), rgba(255, 254, 242, 0.95));
  padding: 2rem;
  text-align: center;
  color: var(--wine-burgundy);
  border-bottom: 1px solid rgba(107, 28, 35, 0.15);
}

.icon-circle {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: rgba(107, 28, 35, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--wine-burgundy);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(107, 28, 35, 0.15);
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

/* FAQ Section */
.faq-section {
  margin-top: 4rem;
}

.faq-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 700;
}

.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-card {
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.faq-card:hover {
  border-color: var(--wine-burgundy);
}

.faq-card.open {
  border-color: var(--wine-burgundy);
  box-shadow: 0 8px 24px rgba(107, 28, 35, 0.15);
}

.faq-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}

.faq-icon {
  font-size: 1.3rem;
  color: var(--wine-burgundy);
  flex-shrink: 0;
}

.faq-header h3 {
  flex: 1;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
}

.chevron-icon {
  font-size: 1rem;
  color: var(--wine-burgundy);
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  padding-left: calc(1.5rem + 1.3rem + 1rem);
}

.faq-answer p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-dark);
  margin: 0;
}

/* Accordion Animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* Responsive */
@media screen and (max-width: 768px) {
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