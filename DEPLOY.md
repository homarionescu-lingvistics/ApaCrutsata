# Deploy CrutsanimiaRON (Vercel Free)

## 1. Push code (once)
Code must be on GitHub: `homarionescu-lingvistics/crutsanimia-ron`

## 2. Vercel — conectare proiect
1. [vercel.com/new](https://vercel.com/new) → Import Git Repository
2. Selectează `crutsanimia-ron`
3. Framework: **Next.js** (auto-detect)
4. **Environment Variables** (obligatoriu):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | din Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key |
| `GEMINI_API_KEY` | cheia Google AI Studio |
| `NEXT_PUBLIC_APP_URL` | URL-ul Vercel după deploy (ex. `https://crutsanimia-ron.vercel.app`) |

5. Deploy

## 3. URL public
După deploy: **https://crutsanimia-ron.vercel.app** (sau numele proiectului tău Vercel).

Test:
- `/` — feed
- `/piata` — publică anunț
- `/auth/signup` — cont

## 4. Google
- Site nou ≠ instant în Google (1–4 săptămâni)
- [Google Search Console](https://search.google.com/search-console) → Add property → URL Vercel → Submit sitemap: `/sitemap.xml`
- `public/robots.txt` deja configurat

## 5. Local dev
```bash
npm run dev
```
→ **http://localhost:3000** (doar pe PC-ul unde rulează `npm run dev`)
