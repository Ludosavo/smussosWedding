<template>
  <div class="containerHistory">
    <h3 id="titolo">
      Francesca e Carlo: una storia a sirene spiegate (quelle dell’ambulanza,
      eh!)
    </h3>
    <p id="testo">
      Carlo e Francesca si sono conosciuti quasi 8 anni fa… in ambulanza! No,
      non per un incidente amoroso, ma perché entrambi immersi nel fantastico (e
      frenetico) mondo del soccorso. <br />
      Solo che, come in ogni storia ben riuscita, ci abbiamo messo un po’ a
      capirlo: la nostra vera storia d’amore è cominciata molto dopo.<br />
      Lui è farmacista e soccorritore: una combinazione perfetta per stare con
      una come Francesca , che ogni due per tre cade, si fa male o ha qualche
      reazione allergica misteriosa. <br />
      Diciamo che la sua laurea non prende mai polvere, anzi… è praticamente in
      servizio permanente effettivo!<br />
      Siamo anche due grandi sportivi. Forse. Lui sicuramente (forse). Lei ?
      Dai, ci prova… ogni tanto. Ma se c’è una cosa su cui non scherziamo è il
      nostro amore per i viaggi. <br />
      E ancora di più per il mare: in barca ci sentiamo a casa. È il nostro
      rifugio, la nostra avventura, la nostra pausa dal mondo. Insomma, ci siamo
      trovati tra sirene e cerotti, ma oggi navighiamo insieme – tra risate,
      avventure e qualche livido qua e là – verso tutto quello che la vita ha da
      offrirci. <br />
      E finché c’è il mare, la barca e un po’ di amore… possiamo affrontare
      qualsiasi mare mosso!
    </p>
    <ImageSlider />
  </div>
</template>

<script>
import ImageSlider from "@/components/ImageSlider.vue";

export default {
  name: "Storia",
  components: { ImageSlider },
};
</script>

<style>
@media screen and (min-width: 769px) {

  .containerHistory {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  h2 {
    text-align: center;
  }
  #titolo {
    justify-self: center;
    width: 42%;
    margin-left: 16px;
    color: var(--textcolor);
    text-align: center;
    padding: 10px;
  }
  #testo {
    padding: 20px;
    justify-self: center;
    color: var(--textcolor);
    width: 80%;
    border: 1px solid var(--textcolor);
    border-radius: 10px;
    margin-left: 25px;
  }

  /* img {
    justify-content: center;
    width: 42%;
    height: 66%;
  } */
}
@media screen and (max-width: 768px) {
  h2 {
    text-align: center;
  }

  #titolo {
    display: flex;
    justify-self: center;
    justify-content: center;
    width: 83%;
    margin-left: 16px;
    color: var(--textcolor);
    text-align: center;
    padding: 10px;
    border-radius: 10px;
  }

  #testo {
    padding: 20px;
    justify-self: center;
    color: var(--textcolor);
    border: 1px solid var(--textcolor);
    width: 85%;
    border-radius: 10px;
    margin-left: 25px;
  }
}
</style>
