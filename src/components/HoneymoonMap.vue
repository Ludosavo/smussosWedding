<template>
  <div class="map-shell">
    <div class="map-header">
      <h2>Il nostro viaggio di nozze</h2>
      <p class="subtitle">Milano → Nuova Zelanda → Fiji → Milano</p>
    </div>

    <div class="map-frame">
      <div
        ref="mapEl"
        class="map-canvas"
        :style="{ height }"
        @mouseenter="pause()"
        @mouseleave="resume()"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icone Leaflet con Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Props
let prevPos = null
const props = defineProps({
  // Waypoints: array di [lng, lat]
  waypoints: { type: Array, required: true },
  speedKmh: { type: Number, default: 1400 },
  loopPauseMs: { type: Number, default: 1200 },
  height: { type: String, default: '480px' },
  follow: { type: Boolean, default: true },
})

// State
const mapEl = ref(null)
let map = null
let baseLayer = null
let routeLine = null
let progressLine = null
let marker = null
let stopMarkers = []
let customMarkerIcon = L.divIcon({
  className: 'honeymoon-marker',
  html: "<div class='plane' aria-hidden='true'>✈️</div>",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

let latlngs = [] // [L.LatLng]
let segLengths = [] // per-segment meters
let cumLengths = [] // cumulative meters
let totalLen = 0
let currentD = 0 // meters progressed along route
let lastTs = 0
let frame = null
let paused = false

const height = computed(() => props.height)
function pause() {
  paused = true
}
function resume() {
  paused = false
  lastTs = 0
  tick()
}
function resetAnimation() {
  currentD = 0
  lastTs = 0
  const start = latlngs[0]
  if (progressLine && start) progressLine.setLatLngs([start])
  if (marker && start) marker.setLatLng(start)
  if (latlngs.length > 1) setPlaneHeading(bearingDeg(latlngs[0], latlngs[1]))
  prevPos = start || null
}

function toLeafletLatLngs(lngLatArray) {
  return (lngLatArray || []).map(([lng, lat]) => L.latLng(lat, lng))
}

function buildGeometry() {
  if (!props.waypoints || props.waypoints.length < 2) return
  const wp = props.waypoints.length > 2 ? [...props.waypoints, props.waypoints[0]] : props.waypoints
  latlngs = toLeafletLatLngs(wp)
  segLengths = []
  cumLengths = [0]
  totalLen = 0
  for (let i = 0; i < latlngs.length - 1; i++) {
    const d = latlngs[i].distanceTo(latlngs[i + 1])
    segLengths.push(d)
    totalLen += d
    cumLengths.push(totalLen)
  }
}

function getPointAt(distanceMeters) {
  if (distanceMeters <= 0) return latlngs[0]
  if (distanceMeters >= totalLen) return latlngs[latlngs.length - 1]
  let i = 0
  while (i < segLengths.length && cumLengths[i + 1] < distanceMeters) i++
  const a = latlngs[i]
  const b = latlngs[i + 1]
  const t = (distanceMeters - cumLengths[i]) / segLengths[i]
  return L.latLng(a.lat + (b.lat - a.lat) * t, a.lng + (b.lng - a.lng) * t)
}
// Bearing geodetico in gradi (0 = Nord)
function bearingDeg(a, b) {
  if (!a || !b) return 0
  const toRad = (v) => (v * Math.PI) / 180
  const toDeg = (v) => (v * 180) / Math.PI
  const φ1 = toRad(a.lat),
    φ2 = toRad(b.lat)
  const Δλ = toRad(b.lng - a.lng)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

function setPlaneHeading(deg) {
  if (!marker || !marker._icon) return
  const el = marker._icon.querySelector('.plane')
  if (el) el.style.transform = `rotate(${deg}deg)`
}

function ensureMap() {
  if (map) return
  map = L.map(mapEl.value, { zoomControl: false, attributionControl: false })
  baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | © Carto',
  }).addTo(map)
}

function ensureLayers() {
  if (!map) return
  if (!routeLine)
    routeLine = L.polyline(latlngs, { weight: 5, opacity: 0.85, color: '#8b2337' }).addTo(map)
  else routeLine.setLatLngs(latlngs)
  if (!progressLine)
    progressLine = L.polyline([latlngs[0]], {
      weight: 7,
      opacity: 0.95,
      color: '#d4637b',
      lineJoin: 'round',
      lineCap: 'round',
    }).addTo(map)
  else progressLine.setLatLngs([latlngs[0]])
  if (!marker)
    marker = L.marker(latlngs[0], { icon: customMarkerIcon, zIndexOffset: 1000 }).addTo(map)
  else marker.setLatLng(latlngs[0])

  const pos = getPointAt(currentD)
  const head = prevPos
    ? bearingDeg(prevPos, pos) // direzione corrente
      : latlngs && latlngs.length > 1
      ? bearingDeg(latlngs[0], latlngs[1])
      : 0 // direzione iniziale

  setPlaneHeading(head)
  prevPos = pos

  stopMarkers.forEach((m) => m.remove())
  stopMarkers = []
  const labels = ['Milano', 'Nuova Zelanda', 'Fiji']
  latlngs.slice(0, 3).forEach((ll, idx) => {
    const dot = L.circleMarker(ll, {
      radius: 7,
      color: '#8b2337',
      weight: 2,
      fillColor: '#f5e9d5',
      fillOpacity: 0.9,
    }).addTo(map)
    dot.bindTooltip(labels[idx] || `Tappa ${idx + 1}`, { direction: 'top', offset: [0, -8] })
    stopMarkers.push(dot)
  })
}

function fitBounds() {
  if (!map || !latlngs || latlngs.length < 2) return
  const bounds = L.latLngBounds(latlngs)
  map.fitBounds(bounds, { padding: [40, 40] })
}

function tick(ts) {
  if (paused) {
    frame = requestAnimationFrame(tick)
    return
  }
  if (!map || !latlngs || latlngs.length < 2) return

  if (!lastTs) lastTs = ts || performance.now()
  const now = ts || performance.now()
  const dt = Math.min(60, now - lastTs)
  lastTs = now

  const metersPerSec = (props.speedKmh * 1000) / 3600
  currentD += metersPerSec * (dt / 1000)

  if (currentD >= totalLen) {
    currentD = totalLen
    const end = getPointAt(currentD)
    marker.setLatLng(end)
    if (marker._icon) marker._icon.classList.add('is-visible')
    progressLine.setLatLngs(latlngs)
    setPlaneHeading(bearingDeg(prevPos || latlngs[0], end))
    prevPos = end
    paused = true
    setTimeout(() => {
      resetAnimation()
      paused = false
      frame = requestAnimationFrame(tick)
    }, props.loopPauseMs)
    return
  } else {
    const pos = getPointAt(currentD)
    marker.setLatLng(pos)
    if (marker._icon) marker._icon.classList.add('is-visible')
    setPlaneHeading(bearingDeg(prevPos || latlngs[0], pos))
    prevPos = pos

    // progress polyline fino al punto corrente
    let i = 0
    while (i < segLengths.length && cumLengths[i + 1] < currentD) i++
    const done = latlngs.slice(0, i + 1)
    done.push(pos)
    progressLine.setLatLngs(done)

    // camera follow
    if (props.follow) map.panTo(pos, { animate: true, duration: 0.5 })
  }

  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!mapEl.value) return
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) paused = true

  buildGeometry()
  ensureMap()
  ensureLayers()
  fitBounds()
  resetAnimation()
  frame = requestAnimationFrame(tick)

  const ro = new ResizeObserver(() => map && map.invalidateSize())
  ro.observe(mapEl.value)

  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    stopMarkers.forEach((m) => m.remove())
    if (map) {
      map.remove()
      map = null
    }
    ro.disconnect()
  })
})

watch(
  () => props.waypoints,
  (w) => {
    if (!w || w.length < 2) return
    buildGeometry()
    ensureLayers()
    fitBounds()
    resetAnimation()
  },
  { deep: true },
)
</script>

<style scoped>
.map-shell {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--textcolor);
}

.map-header h2 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.subtitle {
  text-align: center;
  margin: 0.15rem 0 0;
  opacity: 0.85;
  font-size: 0.95rem;
  letter-spacing: 0.03em;
}

.map-frame {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, rgba(245, 233, 213, 0.9), rgba(235, 221, 195, 0.85));
  padding: 10px;
  width: 100%;
}

.map-canvas {
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
}

.legend-pill {
  position: absolute;
  bottom: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #7b1e2c;
  border: 1px solid rgba(123, 30, 44, 0.25);
  backdrop-filter: blur(6px);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.plane-icon {
  font-size: 2rem;
}

:deep(.leaflet-container) {
  outline: none;
  width: 100%;
  height: 100%;
  filter: saturate(1.1) contrast(1.05);
}

.honeymoon-marker .plane {
  font-size: 22px;
  transition: transform 0.3s ease;
}
</style>
