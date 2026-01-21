// Photo Gallery Data
// Import optimized photos
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
} from '@/components/pictures/optimized-images.js'

export const photoLocations = [
  {
    id: 1,
    title: 'Zanzibar',
    location: 'Zanzibar, Tanzania',
    lat: -6.1659,
    lng: 39.2026,
    date: 'Agosto 2024',
    photo: zanzi.large,
    thumb: zanzi.thumb,
    description: 'Le nostre vacanze in paradiso tra spiagge bianche e acque cristalline'
  },
  {
    id: 2,
    title: 'Weekend sulla neve',
    location: 'Macugnaga, Italia',
    lat: 46.0833,
    lng: 7.9633,
    date: 'Gennaio 2025',
    photo: sci.large,
    thumb: sci.thumb,
    description: 'Sciando insieme sulle Alpi italiane con vista sul Monte Rosa'
  },
  {
    id: 3,
    title: 'In barca',
    location: 'Lago Maggiore, Italia',
    lat: 45.8569,
    lng: 8.5511,
    date: 'Estate 2024',
    photo: barca.large,
    thumb: barca.thumb,
    description: 'Una giornata in barca sul Lago Maggiore'
  },
  {
    id: 4,
    title: 'Paddle Surf',
    location: 'Lago di Como, Italia',
    lat: 45.9781,
    lng: 9.2426,
    date: 'Luglio 2024',
    photo: paddle.large,
    thumb: paddle.thumb,
    description: 'Provando il paddle surf insieme sul lago'
  },
  {
    id: 5,
    title: 'Al mare',
    location: 'Liguria, Italia',
    lat: 44.1191,
    lng: 9.1795,
    date: 'Agosto 2024',
    photo: mare.large,
    thumb: mare.thumb,
    description: 'Giorni di sole e mare sulla costa ligure'
  },
  {
    id: 6,
    title: 'In vela',
    location: 'Portofino, Italia',
    lat: 44.3030,
    lng: 9.2099,
    date: 'Settembre 2024',
    photo: vela.large,
    thumb: vela.thumb,
    description: 'Una giornata in barca a vela tra le bellezze di Portofino'
  },
  {
    id: 7,
    title: 'Splash!',
    location: 'Piscina',
    lat: 45.0833,
    lng: 8.6169,
    date: 'Estate 2024',
    photo: splash.large,
    thumb: splash.thumb,
    description: 'Momenti di gioco e divertimento in piscina'
  },
  {
    id: 8,
    title: 'Croce Bianca',
    location: 'Alpi Italiane',
    lat: 46.0000,
    lng: 7.7500,
    date: 'Inverno 2024',
    photo: whitecross.large,
    thumb: whitecross.thumb,
    description: 'Escursione alla Croce Bianca in alta montagna'
  },
  {
    id: 9,
    title: 'Noi due',
    location: 'Oviglio, Italia',
    lat: 44.8538,
    lng: 8.4881,
    date: '2024',
    photo: couple1.large,
    thumb: couple1.thumb,
    description: 'Il nostro amore'
  }
]

// Timeline data for chronological view
export const timeline = photoLocations.map(photo => ({
  ...photo,
  photoId: photo.id
})).sort((a, b) => {
  // Sort by date (newest first)
  const dateA = new Date(a.date.includes('2025') ? '2025' : '2024')
  const dateB = new Date(b.date.includes('2025') ? '2025' : '2024')
  return dateB - dateA
})
