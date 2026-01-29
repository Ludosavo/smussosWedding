import { imagesMap } from '@/components/icons/optimized-images.js'

function parseYear(str) {
  const match = str.match(/(20\d{2})/)
  return match ? match[1] : ''
}

function humanize(key) {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\b(\d{4})\b/, '($1)')
}

// key = filename without extension, lowercased; hyphens/underscores preserved
const customLocations = {
  'croce-bianca-2021': 'Croce Bianca, Milano',
  'laurea-francesca-2024': 'Università Statale, Milano',
}
export const photoLocations = Object.entries(imagesMap)
  .filter(([key]) => /20\d{2}/.test(key)) // only keep files that include a year
  .filter(([key]) => {
    const lower = key.toLowerCase()
    return !lower.includes('chiesa') && !lower.includes('parcheggio')
  })
  .map(([key, image], idx) => {
    const title = humanize(key)
    const year = parseYear(title)
    const cleanLocation = title.replace(/\(\d{4}\)/, '').trim()
    const lookupKey = key.toLowerCase()
    const altKey = lookupKey.replace(/_/g, '-')
    return {
      id: idx + 1,
      title,
      location: cleanLocation,
      customLocation: customLocations[lookupKey] || customLocations[altKey] || null,
      lat: null,
      lng: null,
      date: year,
      photo: image.medium,
      thumb: image.medium,
    }
  })
  .sort((a, b) => {
    const yearA = parseInt(a.date, 10) || 0
    const yearB = parseInt(b.date, 10) || 0
    return yearA - yearB
  })

export const timeline = photoLocations.map((photo) => ({
  ...photo,
  photoId: photo.id,
})).sort((a, b) => {
  const yearA = parseInt(a.date, 10) || 0
  const yearB = parseInt(b.date, 10) || 0
  return yearA - yearB
})
