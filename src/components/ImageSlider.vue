<template>
  <div class="map-wrapper">
    <div ref="mapEl" class="map" @mouseleave="clearPhoto"></div>

    <transition name="fade">
      <div class="preview" v-if="hovered">
        <img :src="hovered.src" :alt="hovered.label" />
        <div class="preview-label">{{ hovered.label }}</div>
      </div>
    </transition>
  </div>

  <section class="slider-section glass-card">
    <header class="slider-header">
      <h2>I nostri momenti</h2>
    </header>
    <div class="slider" ref="sliderEl">
      <article
        v-for="spot in photoSpots"
        :key="spot.label"
        class="slide"
      >
        <div class="slide-img">
          <img :src="spot.src" :alt="spot.label" loading="lazy" />
        </div>
        <div class="slide-caption">{{ spot.label }}</div>
      </article>
    </div>
  </section>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import foto1 from "@/components/icons/whitecross.jpeg";
import foto2 from "@/components/icons/barca.JPG";
import foto3 from "@/components/icons/paddle.jpg";
import foto4 from "@/components/icons/splash.jpg";
import foto5 from "@/components/icons/mare.png";
import foto6 from "@/components/icons/vela.png";
import foto7 from "@/components/icons/zanzi.png";
import foto8 from "@/components/icons/couple1.png";
import foto9 from "@/components/icons/sci.png";
import foto10 from "@/components/icons/Croazia.jpeg";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default {
  name: "ImageMap",
  setup() {
    const mapEl = ref(null);
    const mapRef = ref(null);
    const hovered = ref(null);

    const photoSpots = [
      { src: foto1, lat: 45.859, lng: 10.87 },
      { src: foto2, lat: 44.405, lng: 8.933 },
      { src: foto3, lat: 38.995, lng: 1.432 },
      { src: foto4, lat: -8.3405, lng: 115.092 },
      { src: foto5, lat: 40.633, lng: 14.602 },
      { src: foto6, lat: 43.769, lng: 11.255 },
      { src: foto7, lat: -6.1659, lng: 39.2026 },
      { src: foto8, lat: 46.003, lng: 7.755 },
      { src: foto9, lat: 45.98, lng: 6.909 },
      { src: foto10,lat: 45.44, lng: 12.315 },
    ];

    const clearPhoto = () => {
      hovered.value = null;
    };

    const makeMarkerIcon = (src, label) =>
      L.divIcon({
        className: "photo-pin leaflet-div-icon",
        html: `
          <div class="pin-wave"></div>
          <div class="pin-bg"></div>
          <div class="pin-thumb" role="img" aria-label="${label}" style="background-image:url(${src})"></div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

    onMounted(() => {
      const map = L.map(mapEl.value, {
        worldCopyJump: true,
        zoomControl: true,
        minZoom: 2,
      });
      mapRef.value = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds(photoSpots.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds.pad(0.4));

      photoSpots.forEach((spot) => {
        const marker = L.marker([spot.lat, spot.lng], {
          icon: makeMarkerIcon(spot.src, spot.label),
          title: spot.label,
          keyboard: true,
        }).addTo(map);

        marker.bindTooltip(spot.label, { direction: "top", offset: [0, -12], opacity: 0.95 });

        marker.on("mouseover", () => {
          hovered.value = spot;
        });
        marker.on("mouseout", clearPhoto);
        marker.on("focus", () => {
          hovered.value = spot;
        });
        marker.on("blur", clearPhoto);
      });
    });

    onBeforeUnmount(() => {
      if (mapRef.value) {
        mapRef.value.remove();
      }
    });

    return {
      mapEl,
      hovered,
      clearPhoto,
      photoSpots,
    };
  },
};
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1.5rem 1rem 0;
}

.map {
  width: min(1100px, 96vw);
  height: min(60vh, 540px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
  isolation: isolate;
}

.map::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.07), transparent 30%),
    radial-gradient(circle at 82% 78%, rgba(255, 255, 255, 0.06), transparent 35%);
  pointer-events: none;
  z-index: 2;
}

.map::after {
  content: "";
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  pointer-events: none;
  z-index: 2;
}

.preview {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: min(420px, 72vw);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  z-index: 500;
  border-image: linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05)) 1;
}

.preview img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
}

.preview-label {
  padding: 0.6rem 0.85rem;
  color: var(--textcolor);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}

:global(.photo-marker) {
  filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.35));
}

:global(.photo-pin) {
  position: relative;
  width: 38px !important;
  height: 38px !important;
  display: grid;
  place-items: center;
  filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.35));
}

.pin-wave {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  opacity: 0.7;
  animation: pulse 2s infinite;
}

.pin-bg {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.pin-thumb {
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
}

:global(.leaflet-marker-icon.photo-pin.leaflet-zoom-animated.leaflet-interactive:hover) .pin-wave {
  animation-duration: 1.2s;
  opacity: 1;
}

:global(.leaflet-top.leaflet-left) {
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
}

:global(.leaflet-control-zoom) {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
}

/* Slider */
.slider-section {
  width: min(1100px, 96vw);
  margin: 1.2rem auto 0;
  padding: 1.2rem 1.1rem 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.slider-header {
  display: grid;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
}

.slider-header h2 {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.slider-header p {
  margin: 0;
  opacity: 0.9;
}

.slider {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 1fr);
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  scroll-snap-type: x mandatory;
}

.slider::-webkit-scrollbar {
  height: 8px;
}

.slider::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 99px;
}

.slide {
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  scroll-snap-align: start;
  display: grid;
  gap: 0.55rem;
}

.slide-img {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.slide-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-caption {
  padding: 0 0.75rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 700;
  color: var(--textcolor);
}

@media screen and (max-width: 769px) {
  .map-wrapper {
    padding: 1rem 0.5rem 0;
  }

  .map {
    height: 58vh;
  }

  .preview img {
    height: 180px;
  }

  .slider-section {
    margin-top: 1rem;
  }

  .slider {
    grid-auto-columns: minmax(180px, 1fr);
  }
}
</style>
