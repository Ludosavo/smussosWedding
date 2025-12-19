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
        <label for="plusOne">Eventuale +1</label>
        <input id="plusOne" name="plusOne" v-model="plusOne" />
      </div>

      <div class="field">
        <label for="allergie">Allergie alimentari</label>
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

    <p v-if="submitted" class="successo">Grazie per la conferma, {{ nome }}!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')
const cognome = ref('')
const plusOne = ref('')
const allergie = ref('')
const submitted = ref(false)
function onSubmit() {
  submitted.value = true
  setTimeout(() => (submitted.value = false), 3000)
}
</script>

<style >
@media screen and (min-width: 769px) {
  form {
    display: flex;
    flex-direction: column;
    justify-self: center;
    background-color: var(--textcolor);
    color: var(--background);
    width: 15em;
    border-radius: 10px;
    padding-bottom: 1em;
  }
  .field {
    margin: 15px;
  }
  input,
  textarea {
    width: 90%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  button {
    display: flex;
    width: 40%;
    text-align: center;
    flex-direction: column;
    align-self: center;
    background-color: var(--background);
    color: var(--textcolor);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px;
  }
  button:hover {
    background-color: #c8e0f5;
  }

  .successo {
    margin-top: 1rem;
    color: var(--textcolor);
    font-weight: bold;
  }
}
@media screen and (max-width: 768px) {
  form {
    display: flex;
    flex-direction: column;
    background-color: var(--textcolor);
    color: var(--background);
    justify-self: center;
    width: 15em;
    border-radius: 10px;
    padding-bottom: 1em;
  }
  .field {
    margin: 15px;
  }
  input,
  textarea {
    width: 90%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  button {
    display: flex;
    width: 20%;
    text-align: center;
    flex-direction: column;
    align-self: center;
    background-color: var(--background);
    color: var(--textcolor);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px;
  }
  button:hover {
    background-color: #c8e0f5;
  }

  .successo {
    margin-top: 1rem;
    color: var(--textcolor);
    font-weight: bold;
  }
}

</style>
