<template>
  <div class="message-card">
    <div class="message-header">
      <h2 class="message-title">
        Grazie di cuore per il tuo dono.<br />
        Lasciaci un messaggio: lo porteremo con noi nel nostro viaggio.
      </h2>
    </div>

    <div class="message-body">
      <form @submit.prevent="handleSubmit" class="message-form">
        <div class="names-row">
          <div class="form-group">
            <input
              v-model="formData.nome"
              type="text"
              required
              :disabled="isSubmitting"
              placeholder="Nome"
            />
          </div>
          <div class="form-group">
            <input
              v-model="formData.cognome"
              type="text"
              required
              :disabled="isSubmitting"
              placeholder="Cognome"
            />
          </div>
        </div>

        <div class="form-group message-group">
          <textarea
            v-model="formData.messaggio"
            rows="5"
            required
            :disabled="isSubmitting"
            placeholder="Scrivi qui il tuo messaggio…"
          ></textarea>
        </div>

        <div class="submit-row">
          <button type="submit" class="invia-btn" :disabled="isSubmitting">
            <FontAwesomeIcon v-if="isSubmitting" :icon="faSpinner" spin />
            <span>{{ isSubmitting ? 'Invio in corso…' : 'Invia' }}</span>
          </button>
        </div>
      </form>

      <Transition name="fade">
        <div v-if="showSuccess" class="success-message">
          <FontAwesomeIcon :icon="faCheckCircle" class="success-icon" />
          <p>Grazie, {{ formData.nome }}! Il tuo messaggio è stato inviato.</p>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="errorMessage" class="error-message">
          <FontAwesomeIcon :icon="faExclamationCircle" class="error-icon" />
          <p>{{ errorMessage }}</p>
          <button @click="errorMessage = ''" class="error-close-btn">Chiudi</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const MESSAGE_ENDPOINT = import.meta.env.VITE_MESSAGE_ENDPOINT || '/api/message'

const formData = reactive({ nome: '', cognome: '', messaggio: '' })
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(MESSAGE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const contentType = response.headers.get('content-type') || ''
    let data = {}
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => ({}))
    } else {
      const t = await response.text().catch(() => '')
      if (t) data = { message: t }
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Errore durante l\'invio')
    }
    if (data.success !== true) {
      throw new Error(data.message || 'Errore durante l\'invio')
    }

    showSuccess.value = true
    setTimeout(() => {
      Object.assign(formData, { nome: '', cognome: '', messaggio: '' })
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.message-card {
  background: var(--ivory);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.message-header {
  background: linear-gradient(135deg, rgb(220, 238, 245, 0.95), rgb(220, 238, 245, 0.95));
  padding: 2rem 2.5rem;
  text-align: center;
  border-bottom: 1px solid rgb(220, 238, 245);
}

.message-title {
  font-family: 'Playwrite NZ Basic', cursive;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--wine-burgundy);
  margin: 0;
  font-weight: 400;
  line-height: 1.7;
}

.message-body {
  padding: 2rem 2.5rem 2.5rem;
}

.message-form {
  width: 100%;
}

.names-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  background: white;
  color: var(--text-dark);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--wine-burgundy);
  box-shadow: 0 0 0 3px rgba(114, 47, 55, 0.1);
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.message-group {
  margin-bottom: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-row {
  display: flex;
  justify-content: flex-end;
}

.invia-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: var(--wine-burgundy);
  color: var(--text-light);
  border: none;
  border-radius: 50px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.invia-btn:hover:not(:disabled) {
  background: rgb(220, 238, 245);
  color: var(--wine-burgundy);
  transform: translateY(-2px);
}

.invia-btn:active:not(:disabled) {
  transform: translateY(0);
}

.invia-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border: 2px solid #8a9a7b;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.success-icon {
  font-size: 1.5rem;
  color: #155724;
  flex-shrink: 0;
}

.success-message p {
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #155724;
}

.error-message {
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.error-icon {
  font-size: 1.5rem;
  color: #721c24;
  flex-shrink: 0;
}

.error-message p {
  margin: 0;
  flex: 1;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #721c24;
}

.error-close-btn {
  padding: 0.4rem 1rem;
  background: #721c24;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.error-close-btn:hover {
  background: #501419;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media screen and (max-width: 600px) {
  .message-header {
    padding: 1.5rem;
  }

  .message-body {
    padding: 1.5rem;
  }

  .names-row {
    grid-template-columns: 1fr;
  }
}
</style>
