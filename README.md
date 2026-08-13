# PRODUCT REQUIREMENTS DOCUMENT (PRD) - Rombusiness Platform (MVP)

## 1. Project Goal & Scope
Build a lightweight, highly-performant web & PWA application for local business intelligence, hyperlocal supply logistics, and SME protection in Romania.
Target launch window: 7 days.
Tech Stack: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Supabase (Auth, Postgres, Realtime), OpenAI API (gpt-4o-mini), Lucide-React.

## 2. Core Modules & Features

### Module A: Hyperlocal Demand & AI Risk Shield (SME Guidance)
- **Interactive Map / Request List**: Citizens upvote/request missing local businesses (e.g., "Petshop in Sibiu - Lazaret").
- **AI Conversational Survey (`/api/ai/dynamic-survey`)**: When a user requests a business, GPT-4o-mini asks 2 targeted follow-up questions (pricing, packaging preferences, buying frequency) to prevent empty votes.
- **"Post-Mortem" Business Registry**: Failed or existing entrepreneurs submit structured lessons (e.g., "Petshop eșuat: Sibiu - Nu se vinde la vrac, trebuie saci mari, stoc inițial minim 10k EUR").
- **AI Viability Simulator (`/api/ai/simulate-risk`)**: New entrepreneurs enter their business idea and budget. AI correlates citizen survey data + post-mortem registry to output a 3-tier Risk Report (Red/Yellow/Green) with concrete fixes.

### Module B: Local Logistics & Micro-Investments
- **Ridesharing de Marfă / Reverse Logistics**: Form for small producers & transporters to list empty truck returns and aggregate routes.
- **Achiziții la Comun (Group Buying)**: AI groups nearby small businesses (e.g., 5 petshops) to bulk-order directly from local suppliers at wholesale prices.
- **Demurrage Points Engine (RON-Local)**: Loyalty/point tracking where points expire after 30 days if not spent within the registered Romanian local merchant network.
- **Digital Hawala Barter Match**: Simple service-exchange board (e.g., carpentry for fresh produce).

### Module C: Protection & Verification (KYB)
- **ANAF CUI Verification (`/api/kyb/check`)**: Automated check via public Romanian ANAF API to ensure access to premium market reports is restricted to SMEs with majoritarian Romanian capital.
- **Crowdfunding de Cartier**: Neighborhood vouchers (pre-sales) allowing locals to buy 50 RON vouchers that unlock 75 RON value upon business opening.

### Module D: Viral Instagram Export
- **Green Screen Infographic Generator**: Client-side HTML-to-Canvas component generating square/story visual cards (Local Score, Foreign Capital Injected, Logistics Savings) for Instagram Reels.

---

## 3. Database Schema (Supabase PostgreSQL)

```sql
-- Profiles & KYB
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('citizen', 'entrepreneur', 'producer', 'transporter')),
  cui_number TEXT,
  is_verified_sme BOOLEAN DEFAULT FALSE,
  ron_local_balance INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Demand & AI Dynamic Chat
CREATE TABLE business_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  upvotes_count INT DEFAULT 1,
  ai_insights_summary JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business Post-Mortems (Lessons Learned)
CREATE TABLE business_post_mortems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  failure_reasons TEXT NOT NULL,
  pricing_strategy_notes TEXT,
  min_capital_required NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group Buying & Pre-Sales Vouchers
CREATE TABLE group_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  target_units INT NOT NULL,
  current_units INT DEFAULT 0,
  unit_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'active'
);
4. Cursor Execution Rules & Token Optimization
Strict File Size: No file shall exceed 180 lines of code. Split components and logic into sub-files.

Server Actions First: Use Next.js Server Actions for database mutations to avoid boilerplates.

No Unnecessary Libraries: Use Tailwind CSS for UI, lucide-react for icons, native fetch for APIs. Do not install heavy UI frameworks.

Clean Code: Do not write inline comments explaining basic code. Keep logic dense and clean.

Component Structure:

app/(dashboard) - Protected routes

app/(public) - Landing page & public request map

components/ui/ - Atomic reusable UI

components/ai/ - AI Chatbot & Simulator widgets

lib/supabase/ - DB Client configurations

lib/ai/ - OpenAI API prompts & functions

## 🗓️ Planul de Execuție pe Zile (Sprint 1 Săptămână)

| Ziua | Ce construiește Cursor Agent | Piesa cheie |
|---|---|---|
| **Ziua 1** | Structura proiect, Supabase Auth, bază de date & layout-ul Tailwind. | Setup & Schelet DB |
| **Ziua 2** | Harta / Lista de Cereri Locale + Chatbotul AI de Sondaj Dinamic (`gpt-4o-mini`). | Colectare Date Calitative |
| **Ziua 3** | Secțiunea "Lecții din Falimente" + Simulatorul de Viabilitate AI pentru Antreprenori. | Prevenire Faliment (Caz Petshop) |
| **Ziua 4** | Verificare CUI/ANAF (KYB) + Sistemul de Vouchere/Pre-comenzi de cartier. | Scut IMM-uri & Crowdfunding |
| **Ziua 5** | Hub-ul Logistic (Ridesharing Marfă + Achiziții la Comun) + Puncte RON-Local (Demurrage 30 zile). | Motorul Economic Local |
| **Ziua 6** | Componenta de export grafic pentru Instagram Reels (Green Screen Generator) + Testare. | Marketing & Viralitate |
| **Ziua 7** | Push pe GitHub, legare domeniul pe Vercel (Cloud Public), Lansare. | Production Release |

---
