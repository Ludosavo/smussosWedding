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
        <!-- <button @click="openRsvpModal" class="footer-rsvp-btn" style="border: 1px solid var(--textcolor);">
          <FontAwesomeIcon :icon="faEnvelopeOpenText" />
          Conferma Presenza
        </button> -->
        <RouterLink to="/contatti" class="footer-link">
          <FontAwesomeIcon :icon="faPhone" />
          Contatti
        </RouterLink>
      </div>
      
      <!-- Copyright -->
      <div class="footer-copyright">
        <p>Made with <FontAwesomeIcon :icon="faHeart" class="heart-icon" /> by Ludovica & Tim</p>
        <p>·</p>
        <p>© 2026 Carlo & Francesca</p>
      </div>
    </div>

    <!-- RSVP Modal -->
    <!-- <Teleport to="body">
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
    </Teleport> -->
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
  width: 90%;
  align-self: center;
  background: white ;
  color: var(--textcolor);
  border-radius: 8px;
  padding: 1rem 2rem;
  margin: 2rem;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.footer-content {
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
  color: var(--textcolor);
}

.couple-initials .heart {
  color: var(--textcolor);
}

.wedding-date {
  font-family: 'Playfair Display', serif;
  font-size: 0.9rem;
  margin: 0;
  color: var(--textcolor);
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
  background-color: white;
  border: 2px solid var(--textcolor);
  color: var(--textcolor);
  border: none;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.footer-rsvp-btn:hover {
  background: var(--textcolor);
  color: white;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  color: var(--textcolor);
  border: 1px solid var(--textcolor);
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.footer-link:hover {
  background: var(--textcolor);
  color: white;
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
  color: var(--textcolor);
}

.heart-icon {
  color: var(--terracotta);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
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
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--textcolor);
  border-radius: 50%;
  font-size: 1.4rem;
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

@media screen and (max-width: 768px) {
  .app-footer{
    width: 80%;
    justify-self: center;
  }
}
</style>
