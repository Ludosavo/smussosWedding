<template>
  <footer class="app-footer">
    <div class="footer-content">
      <!-- Wedding Logo/Names -->
      <div class="footer-brand">
        <p class="couple-initials">C <span class="heart">♥</span> F</p>
        <p class="wedding-date">11 Luglio 2026</p>
      </div>
      
      <!-- Quick Links -->
      <div class="footer-links">
        <button @click="openRsvpModal" class="footer-rsvp-btn">
          <FontAwesomeIcon :icon="faEnvelopeOpenText" />
          Conferma Presenza
        </button>
        <RouterLink to="/contatti" class="footer-link">
          <FontAwesomeIcon :icon="faPhone" />
          Contatti
        </RouterLink>
      </div>
      
      <!-- Copyright -->
      <div class="footer-copyright">
        <p>Made with <FontAwesomeIcon :icon="faHeart" class="heart-icon" /> in Italia</p>
        <p>·</p>
        <p>© 2026 Carlo & Francesca</p>
      </div>
    </div>

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
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faEnvelopeOpenText, faPhone } from '@fortawesome/free-solid-svg-icons'
import RsvpForm from '@/components/RsvpForm.vue'

const showRsvpModal = ref(false)

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
.app-footer {
  background: linear-gradient(135deg, var(--wine-burgundy) 0%, #4a1218 100%);
  color: var(--ivory);
  padding: 1rem 2rem;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  text-align: center;
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.couple-initials {
  font-family: 'Great Vibes', cursive;
  font-size: 1.8rem;
  margin: 0;
  color: var(--champagne);
}

.couple-initials .heart {
  color: var(--terracotta);
}

.wedding-date {
  font-family: 'Playfair Display', serif;
  font-size: 0.9rem;
  margin: 0;
  color: var(--champagne);
  letter-spacing: 1px;
}

/* Links Section */
.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-rsvp-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--terracotta);
  color: white;
  border: none;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.footer-rsvp-btn:hover {
  background: var(--champagne);
  color: var(--wine-burgundy);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  color: var(--champagne);
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--champagne);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.footer-link:hover {
  background: var(--champagne);
  color: var(--wine-burgundy);
}

/* Copyright Section */
.footer-copyright {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-copyright p {
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  margin: 0;
  color: rgba(244, 235, 217, 0.7);
}

.heart-icon {
  color: var(--terracotta);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-container {
  background: var(--ivory);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--champagne);
  color: var(--wine-burgundy);
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal-btn:hover {
  background: var(--wine-burgundy);
  color: white;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .app-footer {
    padding: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-brand {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .couple-initials {
    font-size: 1.5rem;
  }
  
  .footer-links {
    gap: 0.75rem;
  }
  
  .footer-copyright {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
