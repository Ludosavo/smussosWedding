# 💒 Matrimonio Carlo & Francesca

> Italian wedding website for **Carlo & Francesca** — July 11, 2026 at Castello di Oviglio, Piedmont, Italy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tlex-web/smussosWedding)

Built with **Vue 3** + **Vite** (rolldown-vite) | Serverless RSVP via **Vercel** + **Resend**

---

## ✨ Features

- 🏰 Elegant Italian castle/vineyard theme with wine-inspired color palette
- 📧 RSVP system with email confirmations (Vercel serverless + Resend)
- 🗺️ Interactive maps with Leaflet (honeymoon destinations, photo gallery)
- 📱 Fully responsive design (mobile-first)
- 🎨 Custom animations and scroll effects
- 🇮🇹 Italian language throughout

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** or **yarn**
- **Vercel CLI** (for local API testing): `npm i -g vercel`

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/smussosWedding.git
cd smussosWedding

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Resend API key
```

### Development

```bash
# Frontend only (API routes won't work)
npm run dev

# Full stack with API routes (recommended)
vercel dev
```

| Server | URL | API Support |
|--------|-----|-------------|
| Vite | http://localhost:5173 | ❌ |
| Vercel | http://localhost:3000 | ✅ |

### Production Build

```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## 🚢 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tlex-web/smussosWedding&env=RESEND_API_KEY,RSVP_NOTIFICATION_EMAIL)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Required Environment Variables

Set these in your [Vercel Project Dashboard](https://vercel.com/dashboard) → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com/api-keys) | `re_xxxxx...` |
| `RSVP_NOTIFICATION_EMAIL` | Email to receive RSVP notifications | `couple@example.com` |

### Vercel Project Settings

The project auto-detects as a **Vite** project. Recommended settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

---

## 📁 Project Structure

```
smussosWedding/
├── api/                        # Vercel serverless functions
│   └── rsvp.js                 # POST /api/rsvp - RSVP submission
├── src/
│   ├── assets/                 # Styles & static assets
│   │   ├── base.css            # Design system (colors, typography)
│   │   └── main.css            # Global styles
│   ├── components/
│   │   ├── decorative/         # SVG decorations
│   │   ├── HoneymoonMap.vue    # Animated flight path map
│   │   ├── PhotoMap.vue        # Photo location markers
│   │   ├── RsvpForm.vue        # RSVP form component
│   │   ├── NavBar.vue          # Desktop navigation
│   │   └── MobileMenu.vue      # Mobile hamburger menu
│   ├── composables/            # Vue composables
│   │   └── useScrollAnimation.js
│   ├── data/
│   │   └── photoGallery.js     # Photo location data
│   ├── router/
│   │   └── index.js            # Vue Router config
│   └── views/                  # Page components
│       ├── Home.vue            # Landing page
│       ├── Location.vue        # Venue info
│       ├── NostraStoria.vue    # Our story + photos
│       ├── ListaNozze.vue      # Gift registry
│       ├── DoveAlloggiare.vue  # Accommodation
│       ├── InfoUtili.vue       # Useful info
│       └── Contatti.vue        # Contact
├── docs/                       # Documentation
├── vercel.json                 # Vercel configuration
├── vite.config.js              # Vite configuration
└── .env.local.example          # Environment template
```

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Wine Burgundy | `#6B1C23` | Headers, primary brand |
| Terracotta | `#C45D3F` | Buttons, CTAs |
| Champagne | `#F4EBD9` | Background |
| Sage Green | `#8A9A7B` | Secondary accents |
| Ivory | `#FFFEF2` | Light backgrounds |
| Text Dark | `#2C2416` | Body text |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Lato (sans-serif)
- **Script**: Great Vibes (couple names, `.script-font`)

### Responsive Breakpoints

```css
@media (max-width: 768px)  /* Mobile */
@media (min-width: 769px)  /* Desktop */
```

---

## 📧 RSVP System

### How It Works

1. Guest fills out form at `/contatti`
2. Form submits to `POST /api/rsvp`
3. Serverless function sends two emails via Resend:
   - **Guest**: Confirmation email
   - **Couple**: Notification with guest details

### Local Testing

```bash
# Must use vercel dev for API routes
vercel dev

# Test the form at http://localhost:3000/contatti
```

### Email Configuration

Edit [api/rsvp.js](api/rsvp.js) to customize:
- Sender email address
- Email templates (HTML)
- Subject lines

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | Frontend framework (Composition API) |
| Vite | Build tool (rolldown-vite) |
| Vue Router | Client-side routing |
| Leaflet | Interactive maps |
| FontAwesome | Icons |
| Vercel | Hosting & serverless functions |
| Resend | Transactional emails |

---

## 📋 Available Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run format    # Format code with Prettier
vercel dev        # Start Vercel dev server (includes API)
vercel --prod     # Deploy to production
```

---

## 🔧 Troubleshooting

### RSVP form not working

1. Ensure you're using `vercel dev` (not `npm run dev`)
2. Check environment variables are set in `.env.local`
3. Verify Resend API key is valid
4. Check Vercel function logs: `vercel logs`

### Leaflet map icons missing

Maps require manual icon path configuration. This is handled in the map components with:

```js
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
```

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md) | Complete redesign blueprint |
| [docs/PHASE2_IMPLEMENTATION.md](docs/PHASE2_IMPLEMENTATION.md) | RSVP system setup guide |
| [docs/PHASE5_IMPLEMENTATION.md](docs/PHASE5_IMPLEMENTATION.md) | Final polish details |
| [docs/PHOTO_MAPPING.md](docs/PHOTO_MAPPING.md) | Photo gallery data template |

---

## 📄 License

Private project for Carlo & Francesca's wedding.

---

<p align="center">
  <strong>Carlo & Francesca</strong><br>
  11 Luglio 2026 • Castello di Oviglio, Piemonte<br><br>
  Built with ❤️ using Vue 3, Vite & Vercel
</p>
