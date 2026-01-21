<template>
  <main class="home-hero">
    <!-- Hero Section -->
    <section class="hero-banner">
      <div class="hero-content">
        <h1 class="couple-names">Carlo <span class="ampersand">&</span> Francesca</h1>
        
        <GrapevineDivider />
        
        <div class="wedding-date">
          <span class="date-line"></span>
          <p>11 Luglio 2026</p>
          <span class="date-line"></span>
        </div>

        <!-- Countdown Timer -->
        <div class="countdown-container">
          <div class="countdown-item">
            <span class="countdown-number">{{ countdown.days }}</span>
            <span class="countdown-label">Giorni</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">{{ countdown.hours }}</span>
            <span class="countdown-label">Ore</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">{{ countdown.minutes }}</span>
            <span class="countdown-label">Minuti</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">{{ countdown.seconds }}</span>
            <span class="countdown-label">Secondi</span>
          </div>
        </div>
        
        <div class="venue-info">
          <FontAwesomeIcon :icon="faChurch" class="venue-icon" />
          <p class="venue-name">Chiesa di SS. Felice e Agata</p>
          <p class="venue-address">Via XX Settembre, 59 - Oviglio (AL)</p>
          <p class="ceremony-time">Ore 16:30</p>
        </div>

        <!-- Add to Calendar -->
        <div class="calendar-buttons">
          <a :href="googleCalendarUrl" target="_blank" rel="noopener noreferrer" class="calendar-btn google">
            <FontAwesomeIcon :icon="faCalendarPlus" />
            Google Calendar
          </a>
          <a :href="icsFileUrl" download="carlo-francesca-matrimonio.ics" class="calendar-btn ical">
            <FontAwesomeIcon :icon="faCalendarAlt" />
            iCal / Outlook
          </a>
        </div>
      </div>
    </section>
    
    <!-- RSVP Section -->
    <section class="rsvp-section">
      <WineGlassIcon :size="48" :filled="true" :sparkle="true" />
      <h2>Conferma la tua presenza</h2>
      <p class="deadline">Entro il 11 Giugno 2026</p>
      <button @click="openRsvpModal" class="rsvp-button">
        Rispondi all'invito
      </button>
    </section>
    
    <!-- Quick Links Cards -->
    <section class="quick-links">
      <div 
        v-for="link in quickLinks" 
        :key="link.path" 
        class="link-card"
      >
        <RouterLink :to="link.path">
          <FontAwesomeIcon :icon="link.icon" class="card-icon" />
          <h3>{{ link.title }}</h3>
          <p>{{ link.description }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- RSVP Modal -->
    <Transition name="modal">
      <div v-if="showRsvpModal" class="modal-overlay" @click="closeRsvpModal">
        <div class="modal-container" @click.stop>
          <button @click="closeRsvpModal" class="close-modal-btn">
            ✕
          </button>
          <RsvpForm @success="handleRsvpSuccess" />
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faChurch, 
  faMapMarkerAlt, 
  faHeart, 
  faCamera, 
  faGift, 
  faBed,
  faCalendarPlus,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import RsvpForm from '@/components/RsvpForm.vue'
import GrapevineDivider from '@/components/decorative/GrapevineDivider.vue'
import WineGlassIcon from '@/components/decorative/WineGlassIcon.vue'

const showRsvpModal = ref(false)

// Wedding date: July 11, 2026 at 16:30 Italian time
const weddingDate = new Date('2026-07-11T16:30:00+02:00')

// Calculate initial countdown immediately to prevent layout shift
function calculateCountdown() {
  const now = new Date()
  const diff = weddingDate.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

// Initialize with actual values immediately (not zeros)
const countdown = ref(calculateCountdown())

let countdownInterval = null

onMounted(() => {
  countdownInterval = setInterval(() => {
    countdown.value = calculateCountdown()
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

// Google Calendar URL
const googleCalendarUrl = computed(() => {
  const startDate = '20260711T143000Z' // 16:30 Italian time = 14:30 UTC
  const endDate = '20260712T000000Z'   // End at midnight
  const title = encodeURIComponent('Matrimonio Carlo & Francesca')
  const location = encodeURIComponent('Chiesa di SS. Felice e Agata, Via XX Settembre 59, 15026 Oviglio AL, Italia')
  const details = encodeURIComponent('Cerimonia alle 16:30 presso la Chiesa di SS. Felice e Agata.\nRicevimento al Castello di Oviglio.')
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`
})

// ICS file for iCal/Outlook
const icsFileUrl = computed(() => {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Carlo & Francesca Wedding//IT
BEGIN:VEVENT
DTSTART:20260711T143000Z
DTEND:20260712T000000Z
SUMMARY:Matrimonio Carlo & Francesca
DESCRIPTION:Cerimonia alle 16:30 presso la Chiesa di SS. Felice e Agata.\\nRicevimento al Castello di Oviglio.
LOCATION:Chiesa di SS. Felice e Agata, Via XX Settembre 59, 15026 Oviglio AL, Italia
END:VEVENT
END:VCALENDAR`
  
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent)
})

const quickLinks = [
  {
    path: '/location',
    icon: faMapMarkerAlt,
    title: 'Location',
    description: 'Come arrivare al Castello'
  },
  {
    path: '/nostra-storia',
    icon: faCamera,
    title: 'La Nostra Storia',
    description: 'Il nostro viaggio insieme'
  },
  {
    path: '/lista-nozze',
    icon: faGift,
    title: 'Lista Nozze',
    description: 'Idee regalo per gli sposi'
  },
  {
    path: '/dove-alloggiare',
    icon: faBed,
    title: 'Dove Alloggiare',
    description: 'Hotel e B&B consigliati'
  }
]

function openRsvpModal() {
  showRsvpModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeRsvpModal() {
  showRsvpModal.value = false
  document.body.style.overflow = ''
}

function handleRsvpSuccess() {
  setTimeout(() => {
    closeRsvpModal()
  }, 3000)
}
</script>

<style scoped>
/* Main Container */
.home-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 40px;
  overflow-y: auto;
}

/* Hero Banner Section */
.hero-banner {
  flex: 0 0 auto;
  padding: 4rem 2rem 3rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.couple-names {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(3rem, 10vw, 7rem);
  margin: 0 0 1.5rem 0;
  color: var(--wine-burgundy);
  font-weight: 400;
  line-height: 1.2;
}

.ampersand {
  font-size: 1.2em;
  display: inline-block;
  margin: 0 0.3em;
  color: var(--terracotta);
}

.wedding-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.date-line {
  flex: 1;
  max-width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--wine-burgundy), transparent);
}

.wedding-date p {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--wine-burgundy);
  margin: 0;
  white-space: nowrap;
}

.venue-info {
  margin-top: 2.5rem;
  color: var(--text-dark);
}

.venue-icon {
  font-size: 2rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
}

.venue-name {
  font-family: 'Lato', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  margin: 0.5rem 0;
}

.venue-address {
  font-family: 'Lato', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  margin: 0.3rem 0;
  opacity: 0.8;
}

.ceremony-time {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  font-weight: 600;
  color: var(--terracotta);
  margin-top: 1rem;
}

/* Countdown Timer */
.countdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(107, 28, 35, 0.05);
  border-radius: 16px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}

.countdown-number {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--wine-burgundy);
  line-height: 1;
}

.countdown-label {
  font-family: 'Lato', sans-serif;
  font-size: clamp(0.7rem, 1.5vw, 0.85rem);
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.25rem;
}

.countdown-separator {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--terracotta);
  font-weight: 300;
  padding-bottom: 1rem;
}

/* Calendar Buttons */
.calendar-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.calendar-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.calendar-btn.google {
  background: white;
  color: var(--wine-burgundy);
  border: 2px solid var(--wine-burgundy);
}

.calendar-btn.google:hover {
  background: var(--wine-burgundy);
  color: white;
}

.calendar-btn.ical {
  background: var(--sage-green);
  color: white;
  border: 2px solid var(--sage-green);
}

.calendar-btn.ical:hover {
  background: #6b7d60;
  border-color: #6b7d60;
}

/* RSVP Section */
.rsvp-section {
  flex: 0 0 auto;
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(244, 235, 217, 0.3), rgba(255, 254, 242, 0.3));
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(107, 28, 35, 0.1);
}

.rsvp-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--wine-burgundy);
  margin: 1rem 0 0.5rem;
}

.deadline {
  font-family: 'Lato', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--stone-gray);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.rsvp-button {
  padding: 1rem 3rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 50px;
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(107, 28, 35, 0.3);
}

.rsvp-button:hover {
  background: var(--terracotta);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(107, 28, 35, 0.4);
}

.rsvp-button:active {
  transform: translateY(0);
}

/* Quick Links Section */
.quick-links {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.link-card {
  background: var(--ivory);
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(107, 28, 35, 0.15);
  border-color: var(--wine-burgundy);
}

.link-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-icon {
  font-size: 2.5rem;
  color: var(--wine-burgundy);
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.link-card:hover .card-icon {
  transform: scale(1.1);
  color: var(--terracotta);
}

.link-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: var(--wine-burgundy);
  margin: 1rem 0 0.5rem;
  font-weight: 600;
}

.link-card p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--stone-gray);
  line-height: 1.5;
  margin: 0;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  overflow-y: auto;
  backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  background: var(--champagne);
  border-radius: 20px;
  padding: 3rem;
  max-width: 550px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  animation: modalSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-modal-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  line-height: 1;
}

.close-modal-btn:hover {
  background: var(--terracotta);
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(107, 28, 35, 0.4);
}

/* Modal Transitions */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive Adjustments */
@media screen and (max-width: 768px) {
  .home-hero {
    padding: 70px 15px 30px;
  }
  
  .hero-banner {
    padding: 2rem 1rem;
  }
  
  .date-line {
    max-width: 60px;
  }

  .countdown-container {
    gap: 0.25rem;
    padding: 1rem;
  }

  .countdown-item {
    min-width: 55px;
  }

  .countdown-separator {
    padding-bottom: 0.75rem;
  }

  .calendar-buttons {
    flex-direction: column;
    align-items: center;
  }

  .calendar-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .rsvp-section {
    padding: 2rem 1.5rem;
    margin: 1.5rem auto;
  }
  
  .quick-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 1rem;
  }
  
  .link-card {
    padding: 2rem 1.5rem;
  }
  
  .modal-container {
    padding: 2rem 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .home-hero {
    padding: 60px 10px 20px;
  }
  
  .wedding-date {
    gap: 1rem;
  }
  
  .date-line {
    max-width: 40px;
  }
  
  .rsvp-section {
    border-radius: 15px;
    padding: 1.5rem 1rem;
  }
  
  .rsvp-button {
    padding: 0.9rem 2rem;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
}
</style>
