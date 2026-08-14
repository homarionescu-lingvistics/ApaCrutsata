# CrutsanimiaRON MVP

PWA de economie locală rezilientă pentru România — stack **100% free**. Motor P2P care funcționează indiferent de context politic.

## Stack

| Layer | Service |
|---|---|
| Hosting | Vercel Free |
| DB / Auth | Supabase Free |
| AI | Google Gemini 1.5 Flash |
| App | Next.js 14 + TypeScript + Tailwind |
| Mobile | PWA → APK (PWABuilder) |

## Quick start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Rulează `supabase/schema.sql` în Supabase SQL Editor.

## Navigare principală (5 tab-uri)

| Tab | Rută | Descriere |
|---|---|---|
| La Cătun | `/` | Feed anunțuri locale |
| Mânzare & Prăvălii | `/piata` | Produse + firme |
| Strungă-Transport | `/logistica` | Transport & inter-ajutor |
| Scofalută | `/scofaluta` | Prețuri & puncte RON |
| Cont | `/cont` | Profil & anunțurile mele |

Pagini auxiliare: `/apa` (ApaRahova), `/investors` (pitch investitori, separat).

## Docs

- **`PRD.md`** — viziune completă, UX TikTok-simple, economie P2P, trust system, plan sprint
- **`FREE_STACK_CONFIG.md`** — infra free + PWA

## Status sprint

| Zi | Task | Status |
|---|---|---|
| 1 | Auth, DB, layout | ✅ |
| 2 | Feed + Mânzare + voice Gemini | ✅ |
| 3 | Strungă-Transport + handshake | 🔜 |
