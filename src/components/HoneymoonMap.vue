<template>
  <div class="honeymoon-map-wrapper">
    <!-- Map container -->
    <div class="map-wrapper">
      <div
        ref="mapEl"
        class="map-element"
        :style="{ height }"
        @mouseenter="pause()"
        @mouseleave="resume()"
      />

      <!-- Controls overlay -->
      <div v-if="showControls" class="controls-overlay">
        <button @click="togglePlay" class="control-btn">
          {{ paused ? '▶︎ Play' : '⏸ Pausa' }}
        </button>
        <div class="speed-display">
          Velocità: {{ speedLabel }}
        </div>
      </div>

      <!-- Timeline (optional) -->
      <div v-if="showTimeline && stopsLatLngs.length" class="timeline-overlay">
        <div class="timeline-header">Tappe</div>
        <ul class="timeline-list">
          <li
            v-for="(s, i) in stops"
            :key="i"
            :class="['timeline-item', { active: i === activeStopIndex }]"
            @click="jumpToStop(i)"
          >
            <div class="timeline-title">{{ s.title || 'Tappa ' + (i + 1) }}</div>
            <div v-if="s.subtitle" class="timeline-subtitle">{{ s.subtitle }}</div>
          </li>
        </ul>
      </div>
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

delete L.Icon.Default.prototype._getIconUrl
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
  // Tappe opzionali: { lng, lat, title?, subtitle?, img?, html? }
  stops: { type: Array, default: () => [] },
  speedKmh: { type: Number, default: 600 },
  loopPauseMs: { type: Number, default: 1200 },
  height: { type: String, default: '420px' },
  follow: { type: Boolean, default: true },
  showControls: { type: Boolean, default: true },
  showTimeline: { type: Boolean, default: true },
  autoOpenStopPopup: { type: Boolean, default: true },
})

// State
const mapEl = ref(null)
let map = null
let baseLayer = null
let routeLine = null
let progressLine = null
let marker = null
let customMarkerIcon = L.divIcon({
  className: 'honeymoon-marker',
  html: "<div class='plane' aria-hidden='true'>✈️</div>",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})
let stopMarkers = []

let latlngs = [] // [L.LatLng]
let segLengths = [] // per-segment meters
let cumLengths = [] // cumulative meters
let totalLen = 0
let currentD = 0 // meters progressed along route
let lastTs = 0
let frame = null
let paused = false
const activeStopIndexRef = ref(-1)

const height = computed(() => props.height)
const speedLabel = computed(() => `${Math.round(props.speedKmh)} km/h`)
const activeStopIndex = computed(() => activeStopIndexRef.value)

function togglePlay() {
  paused = !paused
}
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
  if (progressLine && latlngs[0]) progressLine.setLatLngs([latlngs[0]])
}

function toLeafletLatLngs(lngLatArray) {
  return (lngLatArray || []).map(([lng, lat]) => L.latLng(lat, lng))
}

// Converte stops in LatLng e salva una copia
const stopsLatLngs = computed(() =>
  (props.stops || []).map((s) => L.latLng(s.lat ?? s[1], s.lng ?? s[0])),
)

function buildGeometry() {
  if (!props.waypoints || props.waypoints.length < 2) return
  latlngs = toLeafletLatLngs(props.waypoints)
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
  map = L.map(mapEl.value, { zoomControl: props.showControls, attributionControl: true })
  baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)
}

function ensureLayers() {
  if (!map) return
  if (!routeLine)
    routeLine = L.polyline(latlngs, { weight: 5, opacity: 0.9, color: '#1e3a8a' }).addTo(map)
  else routeLine.setLatLngs(latlngs)
  if (!progressLine)
    progressLine = L.polyline([latlngs[0]], {
      weight: 6,
      opacity: 0.95,
      color: '#93c5fd',
      lineJoin: 'round',
      lineCap: 'round',
    }).addTo(map)
  else progressLine.setLatLngs([latlngs[0]])
  if (!marker) {
    marker = L.marker(latlngs[0], { icon: customMarkerIcon, zIndexOffset: 1000 }).addTo(map)
    // Make marker visible immediately
    setTimeout(() => {
      if (marker && marker._icon) marker._icon.classList.add('is-visible')
    }, 100)
  } else {
    marker.setLatLng(latlngs[0])
  }

  // Calculate heading for plane direction
  const pos = getPointAt(currentD)
  const head = prevPos
    ? bearingDeg(prevPos, pos)
    : latlngs && latlngs.length > 1
      ? bearingDeg(latlngs[0], latlngs[1])
      : 0

  setPlaneHeading(head)
  prevPos = pos

  // Stop markers + popups
  stopMarkers.forEach((m) => m.remove())
  stopMarkers = []
  if (props.stops && props.stops.length) {
    props.stops.forEach((s, i) => {
      const ll = L.latLng(s.lat ?? s[1], s.lng ?? s[0])
      const html =
        s.html ||
        `<div style='min-width:180px'>
        <div style='font-weight:600'>${s.title || 'Tappa ' + (i + 1)}</div>
        ${s.subtitle ? `<div style='font-size:12px;color:#555'>${s.subtitle}</div>` : ''}
        ${s.img ? `<div style='margin-top:8px'><img src='${s.img}' alt='' style='width:100%;border-radius:8px;object-fit:cover'/></div>` : ''}
      </div>`
      const m = L.marker(ll).addTo(map).bindPopup(html)
      stopMarkers.push(m)
    })
  }
}

function fitBounds() {
  if (!map || !latlngs || latlngs.length < 2) return
  const bounds = L.latLngBounds(latlngs)
  map.fitBounds(bounds, { padding: [40, 40] })
}

function nearestStopIndex(pos) {
  if (!stopsLatLngs.value.length) return -1
  let best = -1
  let bestD = Infinity
  for (let i = 0; i < stopsLatLngs.value.length; i++) {
    const d = pos.distanceTo(stopsLatLngs.value[i])
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

function maybeOpenPopup(idx) {
  if (!props.autoOpenStopPopup || idx < 0 || idx >= stopMarkers.length) return
  const m = stopMarkers[idx]
  if (!m) return
  // Apri popup dolcemente
  m.openPopup()
}

function jumpToStop(i) {
  if (!latlngs.length || i < 0 || i >= stopsLatLngs.value.length) return
  // trova il punto della route più vicino alla tappa
  const target = stopsLatLngs.value[i]
  // ricerca semplice lungo i segmenti
  let best = 0
  let bestDist = Infinity
  for (let s = 0; s < latlngs.length - 1; s++) {
    const cand = latlngs[s]
    const d = cand.distanceTo(target)
    if (d < bestDist) {
      bestDist = d
      best = s
    }
  }
  currentD = cumLengths[Math.min(best, cumLengths.length - 1)]
  lastTs = 0
  // posiziona subito marker/progress
  const pos = getPointAt(currentD)
  marker.setLatLng(pos)
  if (marker._icon) marker._icon.classList.add('is-visible')
  progressLine.setLatLngs(latlngs.slice(0, best + 1).concat([pos]))
  map.panTo(pos)
  activeStopIndexRef.value = i
  maybeOpenPopup(i)
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
    // attiva l'ultima tappa più vicina
    const idx = nearestStopIndex(end)
    activeStopIndexRef.value = idx
    maybeOpenPopup(idx)
    // Reset immediately after a short pause
    setTimeout(() => {
      resetAnimation()
      lastTs = 0
      frame = requestAnimationFrame(tick)
    }, props.loopPauseMs)
    return
  } else {
    const pos = getPointAt(currentD)
    marker.setLatLng(pos)
    if (marker._icon) marker._icon.classList.add('is-visible')

    // Update plane heading to point in direction of travel
    if (prevPos) {
      const heading = bearingDeg(prevPos, pos)
      setPlaneHeading(heading)
    }
    prevPos = pos

    // progress polyline fino al punto corrente
    let i = 0
    while (i < segLengths.length && cumLengths[i + 1] < currentD) i++
    const done = latlngs.slice(0, i + 1)
    done.push(pos)
    progressLine.setLatLngs(done)

    // camera follow
    if (props.follow) map.panTo(pos, { animate: true, duration: 0.5 })

    // aggiorna evidenziazione timeline e popups
    const idx = nearestStopIndex(pos)
    if (idx !== activeStopIndexRef.value) {
      activeStopIndexRef.value = idx
      maybeOpenPopup(idx)
    }
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

// watch stops to rebuild popups
watch(
  () => props.stops,
  () => {
    ensureLayers()
  },
  { deep: true },
)
</script>

<style scoped>
.honeymoon-map-wrapper {
  position: relative;
  width: 100%;
}

.map-wrapper {
  position: relative;
}

.map-element {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.controls-overlay {
  pointer-events: auto;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 400;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  border-radius: 9999px;
  padding: 6px 12px;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover {
  background: white;
}

.speed-display {
  border-radius: 9999px;
  padding: 6px 12px;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-overlay {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 400;
  width: 224px;
  max-width: 45vw;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.timeline-header {
  padding: 8px 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.timeline-list {
  max-height: 300px;
  overflow: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline-item {
  padding: 8px 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-item:hover {
  background: white;
}

.timeline-item.active {
  background: white;
}

.timeline-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.timeline-subtitle {
  font-size: 0.75rem;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.leaflet-container) {
  outline: none;
}

:deep(.honeymoon-marker) {
  opacity: 0;
  transition: opacity 0.3s;
}

:deep(.honeymoon-marker) .plane {
  font-size: 24px;
  transition: transform 0.3s ease;
  display: inline-block;
}

:deep(.honeymoon-marker.is-visible) {
  opacity: 1;
}
</style>