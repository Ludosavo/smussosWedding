<template>
  <div id="form">
    <iframe name="hidden_iframe" style="display: none"></iframe>
    <form
      action="https://script.google.com/macros/s/AKfycbwVt1Z_XskCbPMt8WIj8nTPOjr2eM2pWkR_gsoGbYGsyZvjLYUK1Hrj3f16BRHDVjQi0g/exec"
      method="post"
      enctype="application/x-www-form-urlencoded"
      target="hidden_iframe"
      @submit="onSubmit"
    >
      <div class="field">
        <label for="nome">Nome</label>
        <input id="nome" name="nome" v-model="nome" required />
      </div>

      <div class="field">
        <label for="cognome">Cognome</label>
        <input id="cognome" name="cognome" v-model="cognome" required />
      </div>

      <div class="field">
        <label for="email">Email per ricevere la conferma</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          inputmode="email"
          v-model="email"
          required
          placeholder="nome@email.com"
        />
      </div>

      <div class="field">
        <label for="allergie">Allergie e Intolleranze</label>
        <textarea
          id="allergie"
          name="allergie"
          v-model="allergie"
          rows="3"
          placeholder="Es: Glutine, Crostacei, Lattosio"
        ></textarea>
      </div>

      <button type="submit"><b>Invia</b></button>
    </form>

    <div v-if="submitted" class="successo">
      <p>Grazie per la conferma, {{ nome }}! Riceverai una mail di riepilogo con il link per aggiungere l'evento al calendario.</p>
      <div class="calendar-actions">
        <a
          class="calendar-link primary"
          :href="googleCalendarUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aggiungi a Google Calendar
        </a>
        <a
          class="calendar-link"
          :href="icsUrl"
          download="matrimonio-carlo-francesca.ics"
        >
          Scarica file .ics (Apple / Outlook)
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nome = ref("");
const cognome = ref("");
const email = ref("");
const allergie = ref("");
const submitted = ref(false);
const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio%20di%20Carlo%20e%20Francesca&dates=20260711T143000Z%2F20260711T203000Z&details=Cerimonia%20alle%2016%3A30%20-%20Chiesa%20di%20SS.%20Felice%20e%20Agata.%20Conferma%20la%20presenza%20e%20le%20allergie%20dal%20link%20RSVP.&location=Chiesa%20di%20SS.%20Felice%20e%20Agata%2C%20Via%20XX%20Settembre%2C%2059%20-%20Oviglio%20(AL)";
const icsUrl = "/matrimonio-carlo-francesca.ics";

function onSubmit() {
  submitted.value = true;
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 15em;
  margin: 30px auto;
  padding: 1.25rem 1.1rem 1.4rem;
  color: var(--textcolor);
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.85));
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

label {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
}

input,
textarea {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  color: var(--textcolor);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}


input:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  color: var(--textcolor);
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.02em;
}

button {
  display: inline-flex;
  align-self: center;
  justify-content: center;
  width: 50%;
  text-align: center;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.12));
  color: var(--textcolor);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  cursor: pointer;
  padding: 0.75rem 1rem;
  letter-spacing: 0.04em;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
  backdrop-filter: blur(8px);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
}

.successo {
  margin-top: 1rem;
  color: var(--textcolor);
  font-weight: bold;
  text-align: center;
}

.calendar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.calendar-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--textcolor);
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.calendar-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
}

.calendar-link.primary {
  border-color: rgba(255, 255, 255, 0.45);
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.12));
}

@media screen and (min-width: 769px) {
  form {
    width: 16em;
    margin: 40px;
  }

  button {
    width: 45%;
  }

}
</style>
