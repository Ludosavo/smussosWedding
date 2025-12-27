<template>
  <main>
    <div id="testoHome">
      <h1><i>Carlo e Francesca</i></h1>
      <!-- <h3>Siamo lieti di invitarvi al nostro matrimonio</h3> -->
      <h2>
        Sabato 11 Luglio 2026 <br />
        Ore 16:30 <br />
        Chiesa di SS. Felice e Agata, <br> Via XX Settembre, 59 - Oviglio (AL)
      </h2>
      <h4>
        Vi chiediamo di confermare la presenza di ogni invitato (entro il 11.06.2026),
         <br> utilizzando il form a sinistra.
      </h4>
    </div>
    <div id="form">
      <RsvpForm />
    </div>
  </main>
</template>

<script>
import RsvpForm from "@/components/RsvpForm.vue";

export default {
  name: "Home",
  components: { RsvpForm },
};
</script>

<style>
@media screen and (min-width: 769px) {
  main {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    z-index: 1;
  }

  #testoHome {
    align-self: center;
    left: 10%;
    text-align: center;
    color: var(--textcolor);
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
  }

  body {
    align-content: center;
    place-items: center;
    z-index: 1;
  }

  a {
    align-self: center;
    padding: 20px;
    color: var(--textcolor);
    border-bottom: 1px solid var(--textcolor);
    text-decoration: none;
    z-index: 1;
  }
}
@media screen and (max-width: 768px) {
  main {
    position: relative;
    z-index: 1;

  }

  h2, h3, h4 {
    margin: 0;
  }

  #testoHome {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-self: center;
    position: relative;
    width: 80%;
    text-align: center;
    color: var(--textcolor);
    z-index: 1;
  }

  #form {
    width: 100%;
  }

  nav a {
    align-self: center;
    padding: 20px;
    color: var(--textcolor);
    border-bottom: 1px solid var(--textcolor);
    /* background-color: var(--textcolor); */
    /* border-radius: 10px; */
    text-decoration: none;
    z-index: 1;
  }
}
</style>
