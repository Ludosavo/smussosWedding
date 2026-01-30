<template>
  <main>
    <div id="testoHome" class="glass-card">
      <h3>Carlo <span id="e">e</span> Francesca</h3>
      <GrapevineDivider />
      <h4>
        Sabato 11 Luglio 2026 <br />
        Ore 16:30 <br />
        Chiesa di SS. Felice e Agata, <br />
        Via XX Settembre, 59 - Oviglio (AL)
      </h4>
      <h4>
        Vi chiediamo di confermare la presenza di ogni invitato (entro il
        31.05.2026),
        <br />
        utilizzando il seguente form.
      </h4>
      <section class="rsvp-section">
      <button @click="openRsvpModal" class="rsvp-button">
        Rispondi all'invito
      </button>
    </section>
    
    <!-- RSVP Modal -->
    <Transition name="modal">
      <div v-if="showRsvpModal" class="modal-overlay" @click="closeRsvpModal">
        <div class="modal-container" @click.stop>
          <button @click="closeRsvpModal" class="close-modal-btn">✕</button>
          <RsvpForm @success="handleRsvpSuccess" />
        </div>
      </div>
    </Transition>
    </div>
    
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

    <!-- Add to Calendar -->
    <div class="calendar-buttons">
      <h3 class="calendario">Aggiungi l'evento al tuo calendario:</h3>
      <a
        :href="googleCalendarUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="calendar-btn google"
      >
        <FontAwesomeIcon :icon="faCalendarPlus" />
        Google Calendar
      </a>
      <a
        :href="icsFileUrl"
        download="carlo-francesca-matrimonio.ics"
        class="calendar-btn ical"
      >
        <FontAwesomeIcon :icon="faCalendarAlt" />
        iCal / Outlook
      </a>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import RsvpForm from "@/components/RsvpForm.vue";
import GrapevineDivider from "@/components/GrapevineDivider.vue";

const showRsvpModal = ref(false);

// Wedding date: July 11, 2026 at 16:30 Italian time
const weddingDate = new Date("2026-07-11T16:30:00+02:00");

function calculateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const countdown = ref(calculateCountdown());
let countdownInterval = null;

onMounted(() => {
  document.documentElement.classList.add("home-bg");
  countdownInterval = setInterval(() => {
    countdown.value = calculateCountdown();
  }, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  document.documentElement.classList.remove("home-bg");
});

const googleCalendarUrl = computed(() => {
  const startDate = "20260711T143000Z";
  const endDate = "20260712T000000Z";
  const title = encodeURIComponent("Matrimonio Carlo & Francesca");
  const location = encodeURIComponent(
    "Chiesa di SS. Felice e Agata, Via XX Settembre 59, 15026 Oviglio AL, Italia"
  );
  const details = encodeURIComponent(
    "Cerimonia alle 16:30 presso la Chiesa di SS. Felice e Agata.\nRicevimento al Castello di Oviglio."
  );

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
});

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
END:VCALENDAR`;

  return "data:text/calendar;charset=utf-8," + encodeURIComponent(icsContent);
});

function openRsvpModal() {
  showRsvpModal.value = true;
  document.body.style.overflow = "hidden";
}

function closeRsvpModal() {
  showRsvpModal.value = false;
  document.body.style.overflow = "";
}

function handleRsvpSuccess() {
  setTimeout(() => {
    closeRsvpModal();
  }, 3000);
}
</script>

<style scoped>

.glass-card {
  padding: 1.25rem 1.4rem;
  background: rgba(255, 255, 255, 0.836);
  border-radius: 16px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
}

#e {
  color: #B2C0C0;
}

.countdown-container {
  display: flex;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.836);
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

.calendar-buttons {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  background-color: rgba(255, 255, 255, 0.836);
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.calendar-btn {
  background-color: rgba(255, 255, 255, 0.836);
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

.calendar-btn.google:hover, .calendar-btn.ical:hover{
  background: var(--textcolor);
  color: white;
}

.rsvp-section {
  flex: 0 0 auto;
  text-align: center;
  /* padding: 3rem 2rem; */
  /* background: linear-gradient(135deg, rgba(255, 255, 254, 0.836), rgba(255, 255, 255, 0.836)); */
  /* border-radius: 20px; */
  /* margin: 2rem auto; */
  /* max-width: 600px; */
  /* width: 100%; */
}

.rsvp-button {
  padding: 1rem 3rem;
  background: white;
  color: var(--textcolor);
  border: none;
  border-radius: 50px;
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(47, 103, 59, 0.152);
}

.rsvp-button:hover {
  background: var(--textcolor);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

.rsvp-button:active {
  transform: translateY(0);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1.5rem;
}

.modal-container {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  padding: 2rem 1.5rem;
}

.close-modal-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--textcolor);
}

  @media screen and (min-width: 769px) {
  main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  z-index: 1;
  margin-top: 1.25rem;
  overflow: hidden;
  margin-bottom: 3rem;
}
#testoHome {
  position: relative;
}

  #testoHome {
    align-self: center;
    text-align: center;
    z-index: 1;
    color: var(--textcolor);
  }

  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-family: "Great Vibes", cursive;
    font-size: 55px;
    margin: 0;
  }
  .calendario{
    color:var(--textcolor);
  }

  body {
    align-content: center;
    place-items: center;
    z-index: 1;
  }

  a {
    align-self: center;
    padding: 20px;
    color: var(--textcolor);
    border-bottom: 1px solid var(--textcolor);
    text-decoration: none;
    z-index: 1;
  }

  .deadline {
    font-family: 'Lato', sans-serif;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: var(--stone-gray);
    margin-bottom: 1.5rem;
    font-style: italic;
  }

}
@media screen and (max-width: 768px) {
  #hero-circle {
    position: static;
    width: 200px;
    height: 266px; /* ~3:4 */
    margin: 0.75rem auto;
    transform: none;
  }

  #testoHome {
    padding-top: 0;
  }

  main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    z-index: 1;
    margin-top: 1rem;
  }
  h3 {
    font-family: "Great Vibes", cursive;
    font-size: 40px;
    margin: 0;
  }

  #testoHome {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-self: center;
    position: relative;
    width: 80%;
    text-align: center;
    color: var(--textcolor);
    z-index: 1;
  }

  #form {
    margin-bottom: 20px;
  }

  nav a {
    align-self: center;
    padding: 20px;
    color: var(--textcolor);
    border-bottom: 1px solid var(--textcolor);
    text-decoration: none;
    z-index: 1;
  }


  .countdown-container {
    width: 80%;
    gap: 0.25rem;
    padding: 1rem;
  }

  .countdown-item {
    min-width: 55px;
  }

  .countdown-separator {
    padding-bottom: 0.75rem;
  }

  .calendar-buttons{
    text-align: center;
    width: 80%;
    padding: 20px;
  }

  .calendar-buttons {
    flex-direction: column;
    align-items: center;
  }

  .calendar-btn {
    color: var(--textcolor);
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .rsvp-section {
    width: 80%;
    padding: 2rem 1.5rem;
    margin: 1.5rem auto;
  }
}
</style>
