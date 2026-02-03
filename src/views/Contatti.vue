<template>
  <main class="container">
    <section class="hero">
      <p class="eyebrow">Per ogni evenienza</p>
  
      <p class="lede">Chiama direttamente chi segue l’organizzazione del matrimonio.</p>
    </section>

    <section class="family-tree">
      <div v-for="ramo in rami" :key="ramo.id" class="branch">
        <article class="card main-card">
          <div class="photo-container">
            <img v-if="ramo.foto" :src="ramo.foto" :alt="ramo.ruolo" class="photo">
            <div v-else class="photo-placeholder">
              <span>{{ ramo.ruolo }}</span>
            </div>
          </div>

          <div class="card-content">
            <h3>{{ ramo.ruolo }}</h3>
            
            <div class="numero-section">
              <p v-if="ramo.numero">{{ ramo.numero }}</p>
              <p v-else class="no-numero">—</p>
            </div>

            <div class="buttons">
              <a 
                v-if="ramo.numero" 
                :href="`tel:${ramo.numero.replace(/\s/g, '')}`"
                class="btn-call"
              >
                📞 Chiama
              </a>
            </div>
          </div>
        </article>

        <div class="branch-connector" aria-hidden="true"></div>

        <div class="witness-row">
          <article 
            v-for="testimone in ramo.testimoni" 
            :key="testimone.id" 
            class="card witness-card"
          >
            <div class="photo-container">
              <img v-if="testimone.foto" :src="testimone.foto" :alt="testimone.ruolo" class="photo">
              <div v-else class="photo-placeholder">
                <span>{{ testimone.ruolo }}</span>
              </div>
            </div>

            <div class="card-content">
              <h3>{{ testimone.ruolo }}</h3>
              
              <div class="numero-section">
                <p v-if="testimone.numero">{{ testimone.numero }}</p>
                <p v-else class="no-numero">—</p>
              </div>

              <div class="buttons">
                <a 
                  v-if="testimone.numero" 
                  :href="`tel:${testimone.numero.replace(/\s/g, '')}`"
                  class="btn-call"
                >
                  📞 Chiama
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SposoImg from "@/components/icons/people/Carlo.jpeg";
import SposaImg from "@/components/icons/people/Francini.jpeg";
import AnnaImg from "@/components/icons/people/Anna.jpeg";
import IsabelImg from "@/components/icons/people/Isabel.jpeg";
import FilippoImg from "@/components/icons/people/Filippo.jpeg";
import JoseImg from "@/components/icons/people/Jose.jpeg";

export default {
  name: "Contatti",
  data() {
    return {
      rami: [
        { 
          id: 'sposo', 
          ruolo: 'Sposo', 
          numero: '+39 333 172 0209', 
          foto: SposoImg, 
          testimoni: [
            { id: 'filippo', ruolo: 'Filippo - Testimone', numero: '+39 347 275 2852', foto: FilippoImg },
            { id: 'jose', ruolo: ' Josè - Testimone', numero: '+39 333 956 8853', foto: JoseImg },
          ],
        },
        { 
          id: 'sposa', 
          ruolo: 'Sposa', 
          numero: '+39 348 659 6445', 
          foto: SposaImg, 
          testimoni: [
            { id: 'anna', ruolo: 'Anna - Testimone', numero: '+39 331 948 3693', foto: AnnaImg },
            { id: 'isabel', ruolo: 'Isabel - Testimone', numero: '+39 345 724 4224', foto: IsabelImg },
          ],
        },
      ],
      faqs: [
        {
          id: 'parcheggio',
          domanda: 'Dove posso parcheggiare?',
          risposta: 'Parcheggi gratuiti lungo Via XX Settembre e vie adiacenti. In alternativa, il parcheggio a pagamento più vicino è in Via Cavour, a 5 minuti a piedi dalla chiesa.',
          open: false,
        },
        {
          id: 'dresscode',
          domanda: 'C’è un dress code?',
          risposta: 'Elegante, lungo o corto. Si consiglia di evitare il bianco e colori troppo simili.',
          open: false,
        },
        {
          id: 'allergie',
          domanda: 'Come segnalo allergie o intolleranze?',
          risposta: 'Usa il form RSVP nella Home e indica tutte le allergie alimentari: saranno comunicate al catering.',
          open: false,
        },
        {
          id: 'bimbi',
          domanda: 'Ci sono servizi per i bambini?',
          risposta: 'No, non portate i bambini che sono il male.',
          open: false,
        },
      ],
    }
  },
  methods: {
    toggleFaq(idx) {
      this.faqs[idx].open = !this.faqs[idx].open;
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 2vw, 2.5rem) 3rem;
  color: var(--textcolor);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero {
  text-align: center;
  display: grid;
  gap: 0.35rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  opacity: 0.85;
}

.lede {
  max-width: 640px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.4;
}

.family-tree {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
  align-items: start;
}

.branch {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 0 0.4rem 0.8rem;
}

.main-card {
  max-width: 420px;
  margin: 0 auto;
}

.branch-connector {
  width: 2px;
  height: 28px;
  background: var(--textcolor);
  margin: 0.1rem auto 0.4rem;
  border-radius: 999px;
}

.witness-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.witness-row::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--textcolor);
  border-radius: 999px;
}

.witness-card {
  position: relative;
}

.witness-card::before {
  content: "";
  position: absolute;
  top: -14px;
  left: 50%;
  width: 2px;
  height: 14px;
  transform: translateX(-50%);
  background: var(--textcolor);
  border-radius: 999px;
}

.card {
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.35);
}

.photo-container {
  width: 100%;
  height: 180px;
  background: rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  color: var(--textcolor);
  font-size: 0.95rem;
  text-align: center;
  padding: 10px;
  letter-spacing: 0.04em;
}

.card-content {
  padding: 1rem 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.65rem;
}

.card-content h3 {
  margin: 0;
  color: var(--textcolor);
  font-size: 22px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.numero-section {
  padding: 0.6rem 0.75rem;
  background: rgba(0, 0, 0, 0.094);
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.numero-section p {
  margin: 0;
  color: var(--textcolor);
  font-weight: 700;
  font-size: 0.95rem;
  word-break: break-word;
}

.no-numero {
  color: rgba(255, 255, 255, 0.6) !important;
  font-weight: normal !important;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid var(--textcolor);
  border-radius: 8px;
  margin-top: auto;
}

.btn-call, .btn-delete {
  padding: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  font-size: 0.95rem;
}

.btn-call {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.12));
  color: var(--textcolor);
}

.btn-call:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
}

.glass-card {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.faq-section {
  padding: 1.2rem 1.4rem;
  color: var(--textcolor);
  display: grid;
  gap: 0.8rem;
}

.faq-section h2 {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.faq-list {
  display: grid;
  gap: 0.65rem;
}

.faq-item {
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.faq-item.open {
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.3);
}

.faq-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: transparent;
  border: none;
  color: var(--textcolor);
  cursor: pointer;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.faq-question {
  text-align: left;
  font-weight: 400;
}

.faq-icon {
  font-size: 1.1rem;
}

.faq-body {
  padding: 0 1rem 1rem;
  color: var(--textcolor);
  line-height: 1.5;
  font-weight: 400;
}

@media (max-width: 768px) {
  .family-tree {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }

  .branch {
    gap: 0.8rem;
  }

  .main-card {
    width: 100%;
  }

  .branch-connector {
    height: 16px;
  }

  .witness-row {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .witness-row::before,
  .witness-card::before {
    display: none;
  }

  .photo-container {
    width: 90%;
    margin: 0 auto;
    height: 200px;
    border-radius: 12px;
  }

  .faq-section {
    padding: 1rem 1.05rem;
  }
}

@media (min-width: 769px) {
  .family-tree {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 2rem;
  }

  .faq-section {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
