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
import {
  whitecross,
  barca,
  paddle,
  splash,
  mare,
  vela,
  zanzi,
  couple1,
  sci
} from "@/components/pictures/optimized-images.js";

export default {
  name: "ImageSlider",
  data() {
    return {
      images: [
        whitecross.large,
        barca.large,
        paddle.large,
        splash.large,
        mare.large,
        vela.large,
        zanzi.large,
        couple1.large,
        sci.large
      ],
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
