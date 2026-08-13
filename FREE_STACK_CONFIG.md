# FREE TIER & PWA/APK CONFIGURATION OVERRIDE

## 1. Zero-Cost Infrastructure Rules
- **Hosting**: Target deployment is Vercel Free Tier (domain: `https://rombusiness.vercel.app`).
- **Database & Auth**: Supabase Free Tier.
- **AI Engine**: Replace OpenAI API with Google Gemini API (`gemini-1.5-flash` via `@google/generative-ai`).
  - Use `process.env.GEMINI_API_KEY`.
  - Gemini Flash is 100% free up to 1,500 requests/day.
- **ANAF API**: Public free endpoint for Romanian CUI checks (`https://api.anaf.ro/`).

## 2. PWA & APK Generation Readiness
- Configure Next.js as a Progressive Web App (PWA) using `@ducanh2912/next-pwa` or a custom `manifest.json` + `sw.js`.
- Provide a `public/manifest.json` with:
  - `name`: "Rombusiness - Patriotism Economic"
  - `short_name`: "Rombusiness"
  - `display`: "standalone" (looks and acts like a native mobile app)
  - `theme_color`: "#0f172a"
  - Standard app icons placeholders in `public/icons/`.
- Ensure mobile-first touch UI (bottom navigation bar, responsive viewports, no horizontal scroll).
- App must be ready to be passed through PWABuilder (pwabuilder.com) to output a native Android `.apk`.

## 3. Environment Variables Template (`.env.local.example`)
```env
NEXT_PUBLIC_SUPABASE_URL=[https://your-supabase-project.supabase.co](https://your-supabase-project.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-free-google-ai-studio-key
