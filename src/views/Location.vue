<template>
  <div class="titolo-con-logo">
    <img src="@/components/icons/logo_castello.png" alt="Logo Castello" />
  </div>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6227387696003!2d8.484674076289313!3d44.86045777351844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0xcf63cf8766901e09!2sCastello%20di%20Oviglio!5e1!3m2!1sit!2sit!4v1753208199142!5m2!1sit!2sit"
    width="600"
    height="450"
    style="
      border: 0;
      display: flex;
      justify-self: center;
      margin: 20px;
      border: 2px solid var(--textcolor);
      border-radius: 10px;
    "
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  >
  </iframe>
  <h2>
    <i class="fa-solid fa-location-dot"></i> Via XXIV Maggio, 1 · 15026 Oviglio
    (AL)
  </h2>

</template>

<script>
export default {
  name: "Location",
};
</script>

<style scoped>
@media screen and (min-width: 769px) {
  .titolo-con-logo {
    width: 90%;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    justify-self: center;
    justify-content: center;
    color: var(--textcolor);
    align-items: center;
    gap: 26px;
  }

  .titolo-con-logo img {
    justify-content: flex-start;
    width: 200px;
    height: auto;
  }

  #testo {
    justify-self: center;
    background-color: var(--textcolor);
    color: var(--background);
    width: 80%;
    border-radius: 10px;
  }

  #titolo {
    margin: 0;
    text-align: center;
    padding: 10px;
    border-bottom: 0;
    border-radius: 10px;
  }

  #storia {
    margin: 0;
    padding: 20px;
    text-align: justify;
    justify-self: center;
  }
  h2 {
    text-align: center;
    color: var(--textcolor);
  }

  h2 > i {
    color: red;
  }
}

@media screen and (max-width: 769px) {
  .titolo-con-logo {
    justify-self: center;
    align-items: center;
  }

  #testo {
    justify-self: center;
    margin: 0;
    background-color: var(--textcolor);
    color: var(--background);
    width: 90%;
    border-radius: 10px;
  }

  iframe{
    width: 90%;
    height: auto;
    justify-self: center;
  }

  #titolo {
    margin: 0;
    text-align: center;
    color: var(--background);
    padding: 10px;
    border-bottom: 0;
    border-radius: 10px;
  }

  #storia {
    margin: 0;
    padding: 20px;
    text-align: justify;
    justify-self: center;
  }
  h2 {
    text-align: center;
    color: var(--textcolor);
  }

  h2 > i {
    color: red;
  }
}
</style>
