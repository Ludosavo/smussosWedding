<template>
  <div class="container">
    <!-- Schede contatti -->
    <div class="cards-grid">
      <div v-for="contatto in contatti" :key="contatto.id" class="card">
        <!-- Foto -->
        <div class="photo-container">
          <img v-if="contatto.foto" :src="contatto.foto" :alt="contatto.ruolo" class="photo">
          <div v-else class="photo-placeholder">
            <span>Senza foto</span>
          </div>
        </div>

        <!-- Info contatto -->
        <div class="card-content">
          <h3>{{ contatto.ruolo }}</h3>
          
          <div class="numero-section">
            <p v-if="contatto.numero">{{ contatto.numero }}</p>
            <p v-else class="no-numero">—</p>
          </div>

          <!-- Pulsanti -->
          <div class="buttons">
            <a 
              v-if="contatto.numero" 
              :href="`tel:${contatto.numero.replace(/\s/g, '')}`"
              class="btn-call"
            >
              📞 Chiama
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contatti",
  data() {
    return {
      contatti: [
        { id: 1, ruolo: 'Sposa', numero: '+39 3486596445', foto: '' },
        { id: 2, ruolo: 'Sposo', numero: '+39 333 1720209', foto: '' },
        { id: 3, ruolo: 'Testimone (Anna)', numero: '+39 3319483693', foto: '' },
        { id: 4, ruolo: 'Testimone (Isabel)', numero: '+39 3457244224', foto: '' },
        { id: 5, ruolo: 'Testimone (Filippo)', numero: '+39 3472752852', foto: '' },
        { id: 6, ruolo: 'Testimone (José)', numero: '+39 3339568853', foto: '' },
      ],
      form: {
        ruolo: '',
        numero: '',
        foto: ''
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  font-size: 2.5rem;
}


form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 150px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button[type="submit"] {
  padding: 12px 30px;
  background: var(--textcolor);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
}

/* Grid di schede */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* Card */
.card {
  grid: 1;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Foto */
.photo-container {
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  overflow: hidden;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #0580b4 100%);
  color: white;
  font-size: 14px;
  text-align: center;
  padding: 10px;
}

/* Contenuto card */
.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-content h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.numero-section {
  margin-bottom: 15px;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  text-align: center;
}

.numero-section p {
  margin: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 14px;
  word-break: break-word;
}

.no-numero {
  color: #999 !important;
  font-weight: normal !important;
}

/* Pulsanti */
.buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.btn-call, .btn-delete {
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 14px;
}

.btn-call {
  background: #4caf50;
  color: white;
  display: block;
}

.btn-call:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #da190b;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  form {
    flex-direction: column;
  }

  input {
    min-width: 100%;
  }
}
</style>