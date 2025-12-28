// Photo Gallery Data
// Import photos from the pictures directory
import whitecross from '@/components/pictures/whitecross.png'
import barca from '@/components/pictures/barca.JPG'
import paddle from '@/components/pictures/paddle.jpg'
import splash from '@/components/pictures/splash.jpg'
import mare from '@/components/pictures/mare.png'
import vela from '@/components/pictures/vela.png'
import zanzi from '@/components/pictures/zanzi.png'
import couple1 from '@/components/pictures/couple1.png'
import sci from '@/components/pictures/sci.png'

export const photoLocations = [
  {
    id: 1,
    title: 'Zanzibar',
    location: 'Zanzibar, Tanzania',
    lat: -6.1659,
    lng: 39.2026,
    date: 'Agosto 2024',
    photo: zanzi,
    description: 'Le nostre vacanze in paradiso tra spiagge bianche e acque cristalline'
  },
  {
    id: 2,
    title: 'Weekend sulla neve',
    location: 'Macugnaga, Italia',
    lat: 46.0833,
    lng: 7.9633,
    date: 'Gennaio 2025',
    photo: sci,
    description: 'Sciando insieme sulle Alpi italiane con vista sul Monte Rosa'
  },
  {
    id: 3,
    title: 'In barca',
    location: 'Lago Maggiore, Italia',
    lat: 45.8569,
    lng: 8.5511,
    date: 'Estate 2024',
    photo: barca,
    description: 'Una giornata in barca sul Lago Maggiore'
  },
  {
    id: 4,
    title: 'Paddle Surf',
    location: 'Lago di Como, Italia',
    lat: 45.9781,
    lng: 9.2426,
    date: 'Luglio 2024',
    photo: paddle,
    description: 'Provando il paddle surf insieme sul lago'
  },
  {
    id: 5,
    title: 'Al mare',
    location: 'Liguria, Italia',
    lat: 44.1191,
    lng: 9.1795,
    date: 'Agosto 2024',
    photo: mare,
    description: 'Giorni di sole e mare sulla costa ligure'
  },
  {
    id: 6,
    title: 'In vela',
    location: 'Portofino, Italia',
    lat: 44.3030,
    lng: 9.2099,
    date: 'Settembre 2024',
    photo: vela,
    description: 'Una giornata in barca a vela tra le bellezze di Portofino'
  },
  {
    id: 7,
    title: 'Splash!',
    location: 'Piscina',
    lat: 45.0833,
    lng: 8.6169,
    date: 'Estate 2024',
    photo: splash,
    description: 'Momenti di gioco e divertimento in piscina'
  },
  {
    id: 8,
    title: 'Croce Bianca',
    location: 'Alpi Italiane',
    lat: 46.0000,
    lng: 7.7500,
    date: 'Inverno 2024',
    photo: whitecross,
    description: 'Escursione alla Croce Bianca in alta montagna'
  },
  {
    id: 9,
    title: 'Noi due',
    location: 'Oviglio, Italia',
    lat: 44.8538,
    lng: 8.4881,
    date: '2024',
    photo: couple1,
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
