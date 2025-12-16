<template>
  <div class="slider-container">
    <div class="slider" :style="{ transform: 'translateX(-' + currentIndex * 100 + '%)' }">
      <div class="slide" v-for="(img, idx) in images" :key="idx">
        <img :src="img" :alt="'Slide ' + (idx + 1)" />
      </div>
    </div>

    <button class="prev" @click="prevSlide">&#10094;</button>
    <button class="next" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script>
import foto1 from '@/assets/whitecross.png'
import foto2 from '@/assets/barca.JPG'
import foto3 from '@/assets/paddle.jpg'
import foto4 from '@/assets/splash.jpg'
import foto5 from '@/assets/mare.png'
import foto6 from '@/assets/vela.png'
import foto7 from '@/assets/zanzi.png'
import foto8 from '@/assets/couple1.png'
import foto9 from '@/assets/sci.png'
export default {
  name: 'ImageSlider',
  data() {
    return {
      images: [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9],
      currentIndex: 0,
    }
  },
  methods: {
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
  },
}
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 900px;
  height: 800px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.slider {
  display: flex;
  transition: transform 0.6s ease;
}
.slide {
  min-width: 100%;
  overflow: hidden;
}
.slide img {
  width: 1200px;
  height: 800px;
  object-fit: cover;
  display: block;
}
button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  transition: background 0.3s;
}
button.prev:hover,
button.next:hover {
  background: rgba(255, 255, 255, 1);
}
button.prev {
  left: 10px;
}
button.next {
  right: 10px;
}
</style>
