# PRODUCT REQUIREMENTS DOCUMENT (PRD) — CrutsanimiaRON

## 1. Viziune & Scop

**CrutsanimiaRON** este o PWA de economie locală rezilientă (circuit P2P autonom) pentru România: oameni obișnuiți, producători, meseriași, mici firme. Nu depinde de politică, granturi sau birocrație ca să funcționeze.

**Obiectiv software:** motor economic 24/7 — rece, măsurabil, imun la zvonuri — care crește economia de jos în sus și reconstruiește încrederea prin fapte, nu prin promisiuni.

**Stack MVP:** Next.js 14+ (App Router), TypeScript, Tailwind, Supabase (Auth, Postgres, Realtime), Google Gemini 1.5 Flash, Lucide-React, PWA → APK (PWABuilder).

**Fereastra lansare MVP:** 7 zile (sprint inițial), apoi extinderi pe faze.

---

## 2. Public Țintă & Analfabetism Funcțional

- Analfabetismul clasic e scăzut; **analfabetismul funcțional** (~45–50% național, mai mare la sat) e real.
- Utilizatorul tipic **nu citește paragrafe** — consumă TikTok: voce, imagine, emoție, acțiune simplă.
- Design obligatoriu: **zero dependență de text lung**, iconițe mari, carduri vizuale, microfon Gemini, autentificare fără parolă (SMS / Google / WhatsApp — fără email complicat).

---

## 3. Arhitectura Paginilor (IA)

### 3.1 Pagini publice principale (5 tab-uri + 2 auxiliare)

| Rută | Denumire autentică | Subtext UI (simplu) | Rol |
|---|---|---|---|
| `/` | **Acasă** 🏠 | „Ce e nou la tine în zonă” | Feed vertical (TikTok-style): anunțuri, cereri, oportunități locale |
| `/piata` | **Mânzare & Prăvălii** 🧺 | „Produse & Firme” | Piață: recoltă/produse + firme partenere |
| `/logistica` | **Logistică & Ajutor** 🚚 | „Transport & Inter-ajutor” | Utilaje, transport, schimburi, muncă |
| `/scofaluta` | **Scofalută** 🪙 | „Prețuri & Valută RON” | Statistici, puncte RON-Local, clearing P2P |
| `/apa` | **Apa** 💧 | „Apă & Irigații” | Link/integrare ApaRahova (senzori, debit) |
| `/cont` | **Contul Meu** 👤 | „Anunțurile tale” | Profil, anunțuri postate, status (În derulare / Finalizat) |
| `/investors` | **Investment** (EN/RO business) | Separat de app public | Pitch investitori — fără jargon local |

### 3.2 Reguli IA

- Max **5 tab-uri** în bottom bar; **Cont** poate fi acces din header sau al 5-lea tab (înlocuiește Apa în bară dacă e prea mult — Apa rămâne în meniu secundar / Acasă).
- **Investment** (`/investors`): rută separată, fără termeni getici; traduceri business:
  - Scofalută + Logistică → *P2P Resource Sharing & Agricultural Supply Chain Engine*
  - Mânzare & Prăvălii → *Direct-to-Consumer Local Agri-Marketplace (B2B2C)*
  - Apa → *Data-Driven Precision Irrigation (ApaRahova Platform)*
- Module vechi MVP (cereri business, post-mortem, KYB ANAF, crowdfunding) rămân sub hood sau în sub-secțiuni — nu în meniul principal pentru user simplu.

---

## 4. UX — Reguli de Aur (TikTok-Simple)

### A. Dublare termeni autentici
Fiecare tab: **icon mare + nume autentic + subtext românesc simplu** (ex: „Mânzare 🧺 — Produse & Recoltă”).

### B. Căutare vocală Gemini 🎙️
- Buton mare de microfon în header.
- Exemple voce: „Am 50 saci cartofi de vânzare” / „Caut tractor să mă ajute”.
- Gemini → text structurat → categorie corectă (Mânzare / Logistică).

### C. Autentificare fără parolă
- Prioritate: **telefon + SMS OTP**, Google, WhatsApp.
- Email/parolă: doar fallback tehnic (dev).

### D. Carduri mari vizuale
- Fără tabele. Fiecare anunț = carte: **Poză mare → Titlu scurt → Buton verde „Sună” / „Mesaj”**.

### E. Feed Acasă
- Scroll vertical infinit (ca TikTok/FB): ultimele din zonă, filtrat geo.

---

## 5. Motor Economic — Economie Nomadă / P2P

Aplicația funcționează indiferent de guvernare prin 4 piloni:

### A. Clearing P2P (Scofalută)
- Schimb circular tripartit: Ion→Vasile→Gheorghe→Ion fără cash lichid.
- Algoritm identifică bucle; UI: „Ai salvat 300 lei și 4 ore printr-o mișcare inteligentă”.

### B. Monetizare active inactive (Logistică & Prăvălii)
- Remorcă, șopron, teren — fracționare/închiriere pe ore în schimb produse/muncă.

### C. Micro-investiții pe proiecte reale (/investors)
- Investitorii finanțează puțuri, solar, depozite — randament din producție reală tranzacționată în app, nu din stat.

### D. Bancă de timp
- Muncă fizică (transport, încărcat, reparat) = credit spendabil în Mânzare.

### Evoluție în 3 faze
1. **Supraviețuire** — P2P, schimburi
2. **Autonomie** — producție, clearing, active monetizate
3. **Reformă civică** — încredere câștigată prin fapte (nu obiectiv MVP, ci consecință)

---

## 6. Sistem de Încredere — „Stația Totală” (Anti-Zvon)

Metafora topometristului (2 cm raportat din gură vs 1 mm real): platforma **nu acceptă păreri**, doar dovezi.

| Mecanism | Implementare |
|---|---|
| **Proof-of-Fact** | QR la predare + foto geolocalizată + timestamp |
| **Taxă alarmă falsă** | Contestare = garanție Scofalută; fals = pierdere garanție + scor ↓ |
| **Dual Handshake** | Ambele telefoane GPS/Bluetooth aproape → validare tranzacție |
| **Senzori (Apa)** | Date din ApaRahova/senzori, nu completări manuale |
| **Trust Score** | Reputație post-tranzacție; acces la resurse mai mari = scor mare |

---

## 7. Jujutsu Economic — Obstacole Românești → Features

| Obstacol | Transformare în produs |
|---|---|
| „Combinația” | Gamification: „Combinator cinstit” — economii calculate vizibil |
| Frica de cooperativă (trauma CAP) | Discurs **individualist**: „Tractorul tău. Banii tăi. Tu decizi.” |
| Scepticism / conspirație | Transparență, open-source, minim date (fără CNP la start), rezultate fizice rapide |
| Invidia (capra vecinului) | Trust Score obiectiv + dovezi, nu like-uri sociale |
| Competitorii nu colaborează (borne topograf) | **Waze model**: vezi 100 borne doar dacă contribui cu 2; altfel date întârziate |
| Tragedia bunurilor comune | Freemium pe contribuție, nu altruism |

### Go-to-Market — NU politicieni la început
- Lansare **bottom-up**: TikTok 15 sec, gura satului, oameni reali rezolvând probleme reale.
- Ambalaj dual ideologic (același produs):
  - **Suveraniști:** autonomie, român cu român, fără corporații
  - **Progresiviști:** economie circulară, AI democratizat, descentralizare
- La 100k utilizatori activi → politicienii vin la tine, nu invers.

---

## 8. Module Tehnice MVP (mapare pe pagini)

### Acasă — Feed & Cereri
- Feed geo, cereri rapide, upvote cereri business (modul vechi A)

### Mânzare & Prăvălii — `/piata`
- Anunțuri produse (carduri mari)
- Director firme/parteneri locali
- Group buying (ascuns sub „Oferte la comun”)

### Logistică — `/logistica`
- Ridesharing marfă, utilaje la schimb
- Hawala/barter match
- Bancă de timp

### Scofalută — `/scofaluta`
- Statistici prețuri RON, evoluție locală
- Sold RON-Local (puncte cu expirare 30 zile)
- Clearing circular (algoritm v2)

### Apa — `/apa`
- Link/embed ApaRahova
- Date senzori (debite, nivel rezervoare)

### Cont — `/cont` (dashboard)
- Profil, anunțuri, status tranzacții
- KYB ANAF (CUI) — acces rapoarte premium IMM

### Investors — `/investors`
- EN/RO business, TAM/SAM/SOM, stack, impact
- Separat vizual de app public

### AI (Gemini Flash)
- `/api/ai/dynamic-survey` — sondaj vocal/text
- `/api/ai/simulate-risk` — simulator antreprenor
- Voice-to-listing (header mic)

### Viralitate
- Export Instagram Reels (green screen infografic) — Ziua 6

---

## 9. Database Schema (Supabase) — extins

```sql
-- profiles (existent + trust)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trust_score INT DEFAULT 50;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- listings (Mânzare / Logistică unified)
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT CHECK (type IN ('product', 'service', 'asset', 'request')),
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  city TEXT,
  neighborhood TEXT,
  price_ron NUMERIC,
  barter_ok BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- transactions + proof
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings,
  provider_id UUID REFERENCES auth.users,
  receiver_id UUID REFERENCES auth.users,
  qr_code TEXT,
  proof_photo_url TEXT,
  lat NUMERIC, lng NUMERIC,
  handshake_confirmed BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- clearing loops (Scofalută)
CREATE TABLE clearing_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  gives TEXT NOT NULL,
  wants TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- disputes + false alarm stakes
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions,
  reporter_id UUID REFERENCES auth.users,
  stake_points INT DEFAULT 10,
  resolved BOOLEAN DEFAULT FALSE,
  reporter_won BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Tabele existente (`business_requests`, `business_post_mortems`, `group_deals`, `profiles`) rămân pentru module avansate.

---

## 10. Structură Cod

```
app/(public)       acasă, piata, logistica, scofaluta, apa, auth
app/(dashboard)    cont, anunturi
app/(investors)    landing investitori (layout separat)
components/ui      atomic UI, bottom-nav, voice-button
components/feed    carduri TikTok-style
components/ai      Gemini voice + chat
lib/supabase       clients
lib/ai             Gemini prompts
lib/trust          scor, dispute, handshake
lib/clearing       algoritm bucle P2P
```

**Reguli Cursor:**
- Max **180 linii** per fișier
- Server Actions pentru mutații DB
- Fără UI frameworks grele; Tailwind + lucide-react
- Fără comentarii inline pe cod trivial

---

## 11. Plan Execuție — Sprint & Faze

### Sprint 1 (7 zile) — MVP funcțional

| Ziua | Livrabil | Status |
|---|---|---|
| **1** | Structură proiect, Supabase Auth, DB, layout Tailwind, bottom nav | ✅ Done |
| **2** | **Acasă Feed** + carduri mari + **Mânzare** (listings CRUD) + voice stub Gemini | |
| **3** | **Logistică** (anunțuri utilaje/transport) + **Dual Handshake** v1 | |
| **4** | **Scofalută** (sold puncte, statistici simple) + **Cont/Anunțurile mele** | |
| **5** | **Apa** (link ApaRahova) + KYB ANAF stub + clearing offer form | |
| **6** | Export Instagram + Trust Score v1 + testare PWA | |
| **7** | Push GitHub, Vercel, lansare TikTok beta | |

### Sprint 2 — Motor economic

| Modul | Prioritate |
|---|---|
| Algoritm clearing circular | P0 |
| Proof-of-Fact (QR + foto geo) | P0 |
| Auth SMS (telefon) | P0 |
| Voice-to-listing Gemini | P1 |
| `/investors` pagină EN | P1 |
| Waze-model contribuție date (borne/GIS) | P2 |

### Primul test live (recomandat)
**Logistică & Ajutor** — valoare instantanee vizibilă („am tractor / caut tractor”), viral pe TikTok. Alternativ: **Mânzare** dacă ai deja rețea de producători.

---

## 12. Metrici Succes (indiferent de politică)

- Tranzacții validate cu handshake / săptămână
- Valoare RON economisită prin clearing (calculată, afișată)
- Timp mediu de la anunț la contact (< 10 min în zonă pilot)
- Retention 7 zile utilizatori cu ≥1 anunț
- Trust Score mediu comunitate pilot

---

## 13. Ce NU facem în MVP

- Integrare politicieni / partide
- CNP / KYC greu la onboarding
- Texte lungi, formulare complexe
- Cooperativă / limbaj collectivist forțat
- Plăți card in-app (cash/P2P la start)

---

*Ultima actualizare: rebrand CrutsanimiaRON + integrare viziune economie P2P, UX TikTok-simple, trust „stația totală”, strategie bottom-up.*
