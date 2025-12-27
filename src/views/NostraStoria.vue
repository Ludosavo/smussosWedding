<template>
  <div class="containerHistory">
    
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
    color: var(--background);
    text-align: center;
    padding: 10px;
  }
  #testo {
    justify-self: center;
    width: 80%;
    color: var(--background);
    background-color: rgb(79, 167, 197);
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
    color: var(--background);
    background-color: var(--textcolor);
    border: 1px solid var(--textcolor);
    width: 85%;
    border-radius: 10px;
    margin-left: 25px;
  }
}
</style>
