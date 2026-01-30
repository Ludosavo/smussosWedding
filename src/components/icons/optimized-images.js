// Optimized image mappings.
// Use only the medium optimized files when available; fallback to originals.

const optimizedMedium = import.meta.glob('@/components/icons/optimized/*-medium.webp', {
  eager: true,
  import: 'default',
})

function build(image) {
  // Expose only medium (used as photo and thumb elsewhere)
  return {
    thumb: image,
    small: image,
    medium: image,
    large: image,
    full: image,
  }
}

// Normalize key names: strip extension, strip "-medium", collapse multiple hyphens, replace spaces with "_"
function keyFromPath(path) {
  const base = path.split('/').pop() || ''
  const name = base.replace(/\.[^.]+$/, '')
  // Strip only the trailing -medium marker; keep hyphen counts intact for uniqueness
  const cleaned = name.replace(/-medium$/i, '').replace(/\s+/g, '_')
  return cleaned
}

export const imagesMap = Object.fromEntries(
  Object.entries(optimizedMedium).map(([path, src]) => [keyFromPath(path), build(src)]),
  ['parcheggioPiccolo', build(require('@/components/icons/parcheggioPiccolo.png'))],
)

export function getSrcSet(imageObj) {
  return `${imageObj.medium} 800w`
}

export function getSizes(defaultSize = '100vw') {
  return `(max-width: 768px) 100vw, ${defaultSize}`
}
