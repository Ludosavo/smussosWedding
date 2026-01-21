<template>
  <header class="page-hero">
    <div class="page-hero__content">
      <div v-if="$slots.media" class="page-hero__media">
        <slot name="media" />
      </div>
      <p v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' }
})
</script>

<style scoped>
.page-hero {
  padding: 2.5rem 1.5rem 1.25rem;
  text-align: center;
  color: var(--text-dark);
  position: relative;
}

.page-hero::after {
  content: '';
  display: block;
  width: 120px;
  height: 2px;
  background: var(--terracotta);
  margin: 1.25rem auto 0;
  border-radius: 999px;
  opacity: 0.7;
}

.page-hero__content {
  max-width: 900px;
  margin: 0 auto;
}

.page-hero__media {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.page-hero__media :slotted(img),
.page-hero__media :slotted(svg) {
  width: 140px;
  height: auto;
  opacity: 0.95;
}

.page-hero__eyebrow {
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--stone-gray);
  margin: 0 0 0.25rem 0;
}

.page-hero__title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--wine-burgundy);
  margin: 0.25rem 0 0.5rem 0;
}

.page-hero__subtitle {
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-style: italic;
  color: var(--stone-gray);
  margin: 0;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 2rem 1.25rem 1rem;
  }

  .page-hero::after {
    width: 90px;
  }

  .page-hero__media :slotted(img),
  .page-hero__media :slotted(svg) {
    width: 110px;
  }
}

@media (max-width: 480px) {
  .page-hero {
    padding: 1.75rem 1rem 0.75rem;
  }

  .page-hero__title {
    font-size: 1.9rem;
  }
}
</style>
