<template>
  <main>
    <div id="testoHome" class="glass-card">
      <h3>Carlo <span id="e">e</span> Francesca</h3>
      <h4>
        Sabato 11 Luglio 2026 <br />
        Ore 16:30 <br />
        Chiesa di SS. Felice e Agata, <br />
        Via XX Settembre, 59 - Oviglio (AL)
      </h4>
      <h4>
        Vi chiediamo di confermare la presenza di ogni invitato (entro il
        31.05.2026),
        <br />
        utilizzando il form in basso.
      </h4>
    </div>
    <RsvpForm />
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
.glass-card {
  padding: 1.25rem 1.4rem;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.85)
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

@media screen and (min-width: 769px) {
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    z-index: 1;
    margin-top: 1.25rem;
    overflow: hidden;
  }

  #e{
    color: white
  }
  #testoHome {
    /* max-width: 420px; */
    align-self: center;
    text-align: center;
    color: var(--textcolor);
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-family: "Great Vibes", cursive;
    font-size: 55px;
    margin: 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    z-index: 1;
    margin-top: 1rem;
  }
  #e{
    color: white
  }

  h3 {
    font-family: "Great Vibes", cursive;
    font-size: 40px;
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
    margin-bottom: 20px;
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
