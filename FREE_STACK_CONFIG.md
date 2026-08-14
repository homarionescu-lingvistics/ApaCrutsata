# FREE TIER & PWA/APK CONFIGURATION — CrutsanimiaRON

## 1. Zero-Cost Infrastructure
- **Hosting**: Vercel Free Tier → `https://crutsanimiaron.vercel.app` (sau domeniu custom)
- **Database & Auth**: Supabase Free Tier (Auth: email dev → **SMS OTP prod**)
- **AI**: Google Gemini 1.5 Flash (`@google/generative-ai`) — `GEMINI_API_KEY`, ~1.500 req/zi free
- **ANAF KYB**: `https://api.anaf.ro/` (public, free)
- **Apa**: link/embed către ApaRahova (proiect separat)

## 2. PWA & APK
- `@ducanh2912/next-pwa` + `public/manifest.json`
- `name`: **CrutsanimiaRON — Patriotism Economic**
- `short_name`: **CrutsanimiaRON**
- `display`: `standalone`
- `theme_color`: `#0f172a`
- Iconițe: `public/icons/` (192, 512)
- Mobile-first: bottom nav max 5 tab-uri, touch targets ≥44px, `pb-safe`
- APK: PWABuilder.com

## 3. UX Constraints (free stack compatible)
- Voice input: Web Speech API + Gemini post-processing (fără SDK plătit)
- Poze: Supabase Storage free tier
- Geo: browser Geolocation API (free)
- SMS auth: Supabase Phone Auth (free tier limits) sau Twilio trial later

## 4. Environment Variables (`.env.local.example`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-google-ai-studio-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Când website-ul ApaRahova e live:
# NEXT_PUBLIC_APARAHVA_URL=https://aparahova.example
```

## 5. Pagini & Rute (referință deploy)
| Rută | Modul |
|---|---|
| `/` | La Cătun (feed) |
| `/piata` | Mânzare & Prăvălii |
| `/logistica` | Strungă-Transport |
| `/scofaluta` | Scofalută |
| `/apa` | Apa / ApaRahova |
| `/cont` | Contul meu |
| `/investors` | Investment (EN/RO business) |
