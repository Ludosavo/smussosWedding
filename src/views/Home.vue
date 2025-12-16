<template>
  <main>
    <div id="testo">
      <h3>Siamo lieti di invitarvi al nostro matrimonio</h3>
      <h2>
        Sabato 11 Luglio 2026 <br />
        Ore 17:00 <br />
        Chiesa di bla bla bla
      </h2>
      <h4>Per confermare la tua presenza, puoi utilizzare il form sottostante</h4>
    </div>
    <div id="form">
      <RsvpForm />
    </div>
    <img src="../assets/home_pic.png" />
  </main>
</template>

<script>
import RsvpForm from '@/components/RsvpForm.vue'

export default {
  name: 'Home',
  components: { RsvpForm },
}
</script>

<style>
@media screen and (min-width: 769px) {
  main {
    position: relative; /* contesto per absolute */
    background-image: url('../assets/home_pic.png');
  }
  main::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 1;
  }

  #testo {
    position: absolute;
    left: 10%;
    width: 80%;
    text-align: center;
    color: var(--textcolor);
    z-index: 2;
  }

  img {
    width: 100%;
    height: 100%;
  }

  #form {
    position: absolute;
    align-self: flex-end;
    left: 40%;
    z-index: 2;
  }
  body {
    align-content: center;
    place-items: center;
  }

  a {
    align-self: center;
    text-align: center;
    padding: 20px;
    color: var(--background);
    text-decoration: none;
  }
}
@media screen and (max-width: 768px) {
  main {
    position: relative;
    background-image: url('../assets/home_pic.png');
    image-rendering: auto;
  }
  main::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.6);
    /* z-index: 2; */
  }

  #testo {
    position: relative;
    left: 10%;
    width: 80%;
    text-align: center;
    color: var(--textcolor);
    /* z-index: 2; */
  }

  img {
    width: 100%;
    height: 100%;
  }

  #form {
    position: absolute;
    align-self: flex-end;
    width: 100%;
  }
  body {
    align-content: center;
    place-items: center;
  }

  a {
    align-self: center;
    text-align: center;
    padding: 20px;
    color: var(--background);
    text-decoration: none;
  }
}
</style>
