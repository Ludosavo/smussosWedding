<template>
  <div class="slider-container">
    <div
      class="slider"
      :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }"
    >
      <div class="slide" v-for="(img, idx) in images" :key="idx">
        <img :src="img" :alt="'Slide ' + (idx + 1)" />
      </div>
    </div>

    <button class="prev" @click="prevSlide">&#10094;</button>
    <button class="next" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script>
import foto1 from "@/components/icons/whitecross.png";
import foto2 from "@/components/icons/barca.JPG";
import foto3 from "@/components/icons/paddle.jpg";
import foto4 from "@/components/icons/splash.jpg";
import foto5 from "@/components/icons/mare.png";
import foto6 from "@/components/icons/vela.png";
import foto7 from "@/components/icons/zanzi.png";
import foto8 from "@/components/icons/couple1.png";
import foto9 from "@/components/icons/sci.png";
export default {
  name: "ImageSlider",
  data() {
    return {
      images: [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9],
      currentIndex: 0,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex =
        this.currentIndex === 0
          ? this.images.length - 1
          : this.currentIndex - 1;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
};
</script>

<style>
@media screen and (min-width: 769px) {
  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .slider {
    transition: transform 0.6s ease;
    display: flex;
    margin-left: 20em;
  }
  .slide {
    min-width: 100%;
    overflow: hidden;
    align-self: center;
  }
  .slide img {
    justify-self: center;
    object-fit: cover;
    width: 50%;
    height: 50%;
    border-radius: 10px;
  }

  button.prev,
  button.next {
    position: absolute;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    color: #000000;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    font-size: 20px;
    border-radius: 10px;
    transition: background 0.3s;
  }
  button.prev:hover,
  button.next:hover {
    background: rgba(255, 255, 255, 1);
  }
  button.prev {
    left: 5px;
  }
  button.next {
    right: 5px;
  }
}

@media screen and (max-width: 769px ) {
  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .slider {
    transition: transform 0.6s ease;
    display: flex;
    margin-left: 20em;
  }
  .slide {
    min-width: 100%;
    overflow: hidden;
    align-self: center;
  }
  .slide img {
    justify-self: center;
    object-fit: cover;
    width: 20%;
    height: 20%;
    border-radius: 10px;
  }

  button.prev,
  button.next {
    position: absolute;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    color: #000000;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    font-size: 20px;
    border-radius: 10px;
    transition: background 0.3s;
  }
  button.prev:hover,
  button.next:hover {
    background: rgba(255, 255, 255, 1);
  }
  button.prev {
    left: 5px;
  }
  button.next {
    right: 5px;
  }
  
}
</style>
