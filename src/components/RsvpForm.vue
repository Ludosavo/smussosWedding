<template>
  <div class="rsvp-form-container">
    <h2 class="form-title">Rispondi all'Invito</h2>
    <p class="form-subtitle">Facci sapere se potrai essere con noi</p>
    
    <form @submit.prevent="handleSubmit" class="rsvp-form">
      <div class="form-group">
        <label for="nome">Nome *</label>
        <input 
          id="nome" 
          v-model="formData.nome" 
          type="text"
          required 
          :disabled="isSubmitting"
          placeholder="Il tuo nome"
        />
      </div>
      
      <div class="form-group">
        <label for="cognome">Cognome *</label>
        <input 
          id="cognome" 
          v-model="formData.cognome" 
          type="text"
          required 
          :disabled="isSubmitting"
          placeholder="Il tuo cognome"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email *</label>
        <input 
          id="email" 
          v-model="formData.email" 
          type="email"
          required 
          :disabled="isSubmitting"
          placeholder="tuaemail@esempio.com"
        />
      </div>
      
      <div class="form-group">
        <label for="telefono">Telefono</label>
        <input 
          id="telefono" 
          v-model="formData.telefono" 
          type="tel"
          :disabled="isSubmitting"
          placeholder="+39 123 456 7890"
        />
      </div>
      
      <div class="form-group">
        <label for="allergie">Allergie/Intolleranze alimentari</label>
        <small class="form-hint">Indica eventuali esigenze alimentari</small>
        <textarea 
          id="allergie" 
          v-model="formData.allergie" 
          rows="3"
          placeholder="Es: celiaco, vegetariano, intollerante al lattosio..."
          :disabled="isSubmitting"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        class="submit-btn"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">
          <FontAwesomeIcon :icon="faHeart" />
          Conferma
        </span>
        <span v-else>
          <FontAwesomeIcon :icon="faSpinner" spin />
          Invio in corso...
        </span>
      </button>
    </form>
    
    <!-- Success Message -->
    <Transition name="fade">
      <div v-if="showSuccess" class="success-message">
        <FontAwesomeIcon :icon="faCheckCircle" class="success-icon" />
        <h3>Grazie, {{ formData.nome }}!</h3>
        <p>
          La tua risposta è stata ricevuta. Ti abbiamo inviato una email di conferma a <strong>{{ formData.email }}</strong>
        </p>
        <p class="success-note">Non vediamo l'ora di festeggiare con te! 🎉</p>
      </div>
    </Transition>
    
    <!-- Error Message -->
    <Transition name="fade">
      <div v-if="errorMessage" class="error-message">
        <FontAwesomeIcon :icon="faExclamationCircle" class="error-icon" />
        <h4>Ops, qualcosa è andato storto</h4>
        <p>{{ errorMessage }}</p>
        <button @click="errorMessage = ''" class="error-close-btn">
          Chiudi
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faSpinner, 
  faCheckCircle, 
  faExclamationCircle, 
  faHeart
} from '@fortawesome/free-solid-svg-icons'

const emit = defineEmits(['success'])

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT || '/api/rsvp'

const formData = reactive({
  nome: '',
  cognome: '',
  email: '',
  telefono: '',
  allergie: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const response = await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Errore durante l\'invio')
    }
    
    // Success
    showSuccess.value = true
    emit('success')
    
    // Reset form after 5 seconds
    setTimeout(() => {
      Object.assign(formData, {
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        allergie: ''
      })
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('RSVP submission error:', error)
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.rsvp-form-container {
  width: 100%;
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  color: var(--wine-burgundy);
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.form-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--stone-gray);
  text-align: center;
  margin: 0 0 2rem 0;
}

.rsvp-form {
  width: 100%;
}

/* Form Row */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--wine-burgundy);
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  text-align: left;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #DDD;
  border-radius: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--wine-burgundy);
  box-shadow: 0 0 0 3px rgba(107, 28, 35, 0.1);
}

.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-hint {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--stone-gray);
  font-style: italic;
  text-align: left;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(28, 107, 53, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.submit-btn:hover:not(:disabled) {
  background: var(--terracotta);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(28, 107, 50, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Success Message */
.success-message {
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border: 2px solid #8A9A7B;
  border-radius: 12px;
  text-align: center;
  animation: slideIn 0.4s ease;
}

.success-message.decline-success {
  background: linear-gradient(135deg, #f5e6d3, #ece0d1);
  border-color: var(--terracotta);
}

.success-icon {
  font-size: 3rem;
  color: #155724;
  margin-bottom: 1rem;
}

.decline-success .success-icon {
  color: var(--terracotta);
}

.success-message h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #155724;
  margin: 0 0 0.5rem 0;
}

.decline-success h3 {
  color: var(--wine-burgundy);
}

.success-message p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #155724;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.decline-success p {
  color: var(--text-dark);
}

.success-note {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Error Message */
.error-message {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  border-radius: 12px;
  text-align: center;
  animation: slideIn 0.4s ease;
}

.error-icon {
  font-size: 2.5rem;
  color: #721c24;
  margin-bottom: 0.75rem;
}

.error-message h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: #721c24;
  margin: 0 0 0.5rem 0;
}

.error-message p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: #721c24;
  margin: 0.5rem 0 1rem 0;
}

.error-close-btn {
  padding: 0.6rem 1.5rem;
  background: #721c24;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.error-close-btn:hover {
  background: #501419;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive */
@media screen and (max-width: 480px) {
  .form-title {
    font-size: 1.6rem;
  }
  
  .attendance-options {
    flex-direction: column;
  }
  
  .option-content {
    flex-direction: row;
    padding: 1rem;
  }
  
  .option-icon {
    font-size: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    font-size: 0.95rem;
  }
  
  .submit-btn {
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
  }
  
  .success-message,
  .error-message {
    padding: 1.5rem 1rem;
  }
}
</style>
