# Wedding Website - Carlo & Francesca

Italian wedding website built with Vue 3 (Composition API), Vite, and Vue Router. Features interactive components, RSVP system with Vercel + Resend, and elegant Italian castle/vineyard theme.

**Wedding Date**: July 11, 2026  
**Location**: Castello di Oviglio, Piedmont, Italy

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```sh
# Install dependencies
npm install

# Copy environment variables template
cp .env.local.example .env.local
# Edit .env.local with your Resend API key and notification email
```

### Development

```sh
# Run with Vite dev server (frontend only)
npm run dev

# Run with Vercel dev server (includes API routes)
vercel dev
```

Visit [http://localhost:5173](http://localhost:5173) (Vite) or [http://localhost:3000](http://localhost:3000) (Vercel)

### Build for Production

```sh
npm run build
npm run preview
```

---

## 📁 Project Structure

```
smussosWedding/
├── api/                      # Vercel serverless functions
│   └── rsvp.js              # RSVP submission endpoint
├── src/
│   ├── assets/              # Global styles and images
│   │   ├── base.css         # Color scheme and design system
│   │   └── main.css         # Responsive utilities
│   ├── components/
│   │   ├── decorative/      # SVG decorations
│   │   │   ├── GrapevineDivider.vue
│   │   │   └── WineGlassIcon.vue
│   │   ├── HoneymoonMap.vue
│   │   ├── ImageSlider.vue
│   │   ├── MobileMenu.vue   # Hamburger mobile navigation
│   │   ├── NavBar.vue       # Desktop navigation
│   │   └── RsvpForm.vue     # RSVP form with Resend integration
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   └── views/               # Page components
│       ├── Home.vue         # Landing page with hero + quick links
│       ├── Location.vue     # Venue information
│       ├── NostraStoria.vue # Photo gallery
│       ├── Contatti.vue
│       ├── ListaNozze.vue
│       ├── DoveAlloggiare.vue
│       └── InfoUtili.vue
├── .env.local.example       # Environment variables template
├── vercel.json              # Vercel deployment config
├── REDESIGN_PLAN.md         # Complete redesign blueprint
├── PHASE2_IMPLEMENTATION.md # Phase 2 setup guide
└── PHOTO_MAPPING.md         # Photo location data template
```

---

## 🎨 Design System

### Color Palette
- **Wine Burgundy** (#6B1C23) - Primary brand color
- **Terracotta** (#C45D3F) - Accent color
- **Champagne** (#F4EBD9) - Background
- **Sage Green** (#8A9A7B) - Secondary accent
- **Ivory** (#FFFEF2) - Light backgrounds

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Lato (sans-serif)
- **Script**: Great Vibes (for couple names)

### Responsive Breakpoints
- Mobile: 480px
- Tablet: 768px
- Desktop: 1024px
- Large: 1440px

---

## 📧 RSVP System Setup

Phase 2 implements a modern RSVP system using Vercel serverless functions and Resend email API.

### Setup Instructions

1. **Get Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain or use sandbox
   - Create API key

2. **Configure Environment Variables**
   ```sh
   # Local development
   cp .env.local.example .env.local
   # Edit .env.local with your keys
   
   # Vercel deployment
   vercel env add RESEND_API_KEY
   vercel env add NOTIFICATION_EMAIL
   ```

3. **Update Email Configuration**
   - Edit `api/rsvp.js`
   - Replace email addresses (lines 41-42, 106-107)
   - Customize HTML templates if desired

4. **Deploy**
   ```sh
   vercel --prod
   ```

**Detailed guide**: See [PHASE2_IMPLEMENTATION.md](PHASE2_IMPLEMENTATION.md)

---

## 🧪 Testing

### Local Testing
```sh
# Use Vercel dev for full API support
vercel dev

# Or use Vite (API won't work)
npm run dev
```

### Test RSVP Form
1. Fill out all required fields
2. Submit form
3. Check for success message
4. Verify emails are received

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```sh
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables on Vercel
Set these in your Vercel project dashboard:
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`

---

## 📋 Implementation Status

### ✅ Phase 1: Foundation (Complete)
- Color scheme and typography
- Responsive breakpoints
- Mobile menu component
- NavBar refactored

### ✅ Phase 2: RSVP System (Complete)
- Decorative SVG components
- Home.vue redesigned
- RsvpForm.vue refactored
- Vercel API endpoint
- Resend email integration

### 🔄 Phase 3: Photo Gallery (Pending)
- Interactive Leaflet map
- Photo modal viewer
- Timeline view

### 🔄 Phase 4: Location Enhancement (Pending)
- Info cards
- Castle history section

### 🔄 Phase 5: Polish (Pending)
- Scroll animations
- Page transitions
- Performance optimization

**Full plan**: See [REDESIGN_PLAN.md](REDESIGN_PLAN.md)

---

## 🛠️ Development Notes

### Tech Stack
- **Vue 3** with Composition API (`<script setup>`)
- **Vite** (rolldown-vite variant)
- **Vue Router** (simple routes, no lazy loading)
- **Leaflet** for maps (NOT Mapbox)
- **FontAwesome** for icons
- **Resend** for transactional emails

### Key Patterns
- All components use Composition API
- Path alias: `@/` → `src/`
- Scoped styles with responsive breakpoints
- Italian language throughout

### Common Gotchas
- Leaflet icons need manual path fixing with Vite
- Import decorative components from `@/components/decorative/`
- API routes must be in `/api` folder for Vercel
- Use `vercel dev` to test serverless functions locally

---

## 📝 Customization

### Change Wedding Details
Edit [src/views/Home.vue](src/views/Home.vue):
- Couple names (line 10)
- Wedding date (line 14)
- Venue information (lines 20-23)

### Modify Form Fields
Edit [src/components/RsvpForm.vue](src/components/RsvpForm.vue):
- Add/remove fields
- Update validation
- Change success message

### Update Email Templates
Edit [api/rsvp.js](api/rsvp.js):
- Guest confirmation email (lines 41-100)
- Couple notification email (lines 106-180)

---

## 🆘 Troubleshooting

### RSVP form not submitting
- Check environment variables are set
- Verify Resend API key is valid
- Use `vercel dev` instead of `npm run dev`
- Check Vercel function logs: `vercel logs`

### Styles not loading
- Clear browser cache
- Check `src/assets/base.css` is imported
- Verify CSS variable names match

### Import errors
- Check path alias is correct (`@/` = `src/`)
- Ensure files exist in specified paths
- Check for typos in component names

---

## 📚 Additional Documentation

- [REDESIGN_PLAN.md](REDESIGN_PLAN.md) - Complete redesign blueprint (500+ lines)
- [PHASE2_IMPLEMENTATION.md](PHASE2_IMPLEMENTATION.md) - RSVP system setup guide
- [PHOTO_MAPPING.md](PHOTO_MAPPING.md) - Template for photo gallery data
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - AI assistant guidance

---

## 📄 License

Private project for Carlo & Francesca's wedding.

---

## 👥 Credits

**Couple**: Carlo & Francesca  
**Wedding Date**: July 11, 2026  
**Venue**: Castello di Oviglio, Piedmont, Italy

Built with ❤️ using Vue 3, Vite, and modern web technologies.
