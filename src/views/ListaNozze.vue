<template>
  <main class="lista-page">
    <section class="intro glass-card">
      <p>Il dono più grande sarà condividere con voi questo giorno speciale.</p>
      <p>
        Se desiderate farci un regalo, un contributo al viaggio di nozze ci
        aiuterà a iniziare la nostra avventura insieme.
      </p>
    </section>
    <section class="iban-bar glass-card">
      <div class="iban-text">
        <span class="label">IBAN</span>
        <span class="iban">{{ IBAN }}</span>
        <span class="intestazione"
          >Intestato a Carlo Musso &amp; Francesca Savoia</span
        >
      </div>
      <button type="button" class="copy-btn" @click="copyIban">
        {{ copied ? "Copiato!" : "Copia IBAN" }}
      </button>
    </section>
    <section class="lista-nozze">
      <HoneymoonMap :waypoints="WAYPOINTS" height="620px" :follow="true" />
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import HoneymoonMap from "@/components/HoneymoonMap.vue";

const IBAN = "IT71 J036 6901 6000 6944 7104 684";
const copied = ref(false);

const WAYPOINTS = [
  [9.09, 45.27], // Milano
  [174, -42], // Nuova Zelanda [lng, lat]
  [177, 19], // Fiji
];

async function copyIban() {
  try {
    await navigator.clipboard.writeText(IBAN);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch (e) {
    copied.value = false;
    alert("Non riesco a copiare automaticamente. Copia manualmente: " + IBAN);
  }
}
</script>

<style scoped>
.lista-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 2vw, 2.5rem) 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: var(--textcolor);
}

.glass-card {
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.08)
  );
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  padding: 1.2rem 1.4rem;
}

.intro {
  text-align: center;
  line-height: 1.5;
  gap: 0.4rem;
}

.lista-nozze {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
}

.iban-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
}

.iban-text {
  display: grid;
  gap: 0.3rem;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  opacity: 0.85;
}

.iban {
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 1.05rem;
}

.intestazione {
  font-size: 0.95rem;
  opacity: 0.9;
}

.copy-btn {
  padding: 0.75rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0.12)
  );
  color: var(--textcolor);
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.03em;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
  backdrop-filter: blur(8px);
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .lista-page {
    padding: 1.5rem 1rem 2rem;
    gap: 1.2rem;
  }

  .iban-bar {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .copy-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
