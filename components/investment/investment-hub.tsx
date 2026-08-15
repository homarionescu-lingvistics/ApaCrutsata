"use client";

import { useEffect, useMemo, useState } from "react";

const SEED_FIRMS = [
  {
    name: "Agricola Vale Verde",
    city: "Cluj",
    sector: "Agriculture",
    cui: "RO12345678",
    status: "Verified",
    riskScore: 72,
    founder: "Ion Popescu",
    coInvestors: 3,
    fxHedge: "EUR",
    minInvestment: 5000,
    equity: 2.5,
    timeline: 24,
    description: "Sustainable organic farming with export to EU markets.",
    contactEmail: "ion@agricola-verde.ro",
    contactWhatsApp: "+40721234567",
    ibanRecipient: "RO89ABRORD123XXXX",
    cryptoWallet: "0x1234...abc (USDC/Polygon)",
  },
  {
    name: "Moldova Timber Craft",
    city: "Iași",
    sector: "Wood & furniture",
    cui: "RO87654321",
    status: "Verified",
    riskScore: 68,
    founder: "Maria Ionescu",
    coInvestors: 2,
    fxHedge: "EUR",
    minInvestment: 3000,
    equity: 1.5,
    timeline: 18,
    description: "Handcrafted furniture for German and Austrian markets.",
    contactEmail: "maria@timbercrafts.ro",
    contactWhatsApp: "+40722345678",
    ibanRecipient: "RO89ABRORD456XXXX",
    cryptoWallet: "0x5678...def (USDC/Polygon)",
  },
  {
    name: "EcoLogistics Nord",
    city: "Brașov",
    sector: "Logistics",
    cui: "RO34567891",
    status: "Verified",
    riskScore: 81,
    founder: "Andrei Georgescu",
    coInvestors: 5,
    fxHedge: "EUR",
    minInvestment: 10000,
    equity: 3.0,
    timeline: 36,
    description: "Cold chain logistics for fresh produce distribution across Eastern Europe.",
    contactEmail: "andrei@ecologistics.ro",
    contactWhatsApp: "+40723456789",
    ibanRecipient: "RO89ABRORD789XXXX",
    cryptoWallet: "0x9abc...ghi (USDC/Polygon)",
  },
  {
    name: "Fructe de la Poartă",
    city: "Timișoara",
    sector: "Distribution",
    cui: "RO45678912",
    status: "Verified",
    riskScore: 65,
    founder: "Cristina Vasile",
    coInvestors: 1,
    fxHedge: "EUR",
    minInvestment: 2500,
    equity: 1.0,
    timeline: 12,
    description: "Direct-to-consumer fruit and vegetable box delivery service.",
    contactEmail: "cristina@fructe-poarta.ro",
    contactWhatsApp: "+40724567890",
    ibanRecipient: "RO89ABRORD012XXXX",
    cryptoWallet: "0xdef0...jkl (USDC/Polygon)",
  },
  {
    name: "GreenPack RO",
    city: "București",
    sector: "Packaging",
    cui: "RO56789123",
    status: "Verified",
    riskScore: 76,
    founder: "Bogdan Mihai",
    coInvestors: 4,
    fxHedge: "EUR",
    minInvestment: 7500,
    equity: 2.0,
    timeline: 20,
    description: "Eco-friendly packaging solutions for food and beverage companies.",
    contactEmail: "bogdan@greenpack.ro",
    contactWhatsApp: "+40725678901",
    ibanRecipient: "RO89ABRORD345XXXX",
    cryptoWallet: "0xjkl1...mno (USDC/Polygon)",
  },
  {
    name: "Drumuri și Vale",
    city: "Sibiu",
    sector: "Construction",
    cui: "RO67891234",
    status: "Verified",
    riskScore: 58,
    founder: "Vladimir Nistor",
    coInvestors: 2,
    fxHedge: "EUR",
    minInvestment: 15000,
    equity: 4.0,
    timeline: 48,
    description: "Rural infrastructure development and renovation projects.",
    contactEmail: "vladimir@drumurivale.ro",
    contactWhatsApp: "+40726789012",
    ibanRecipient: "RO89ABRORD678XXXX",
    cryptoWallet: "0xmno2...pqr (USDC/Polygon)",
  },
];

const STORAGE_KEY = "crutsanimia-investment-firms";

type LocaleKey = "ro" | "en" | "de" | "fr" | "tr";
type RegionKey = "eu" | "us" | "uk" | "china" | "israel" | "uae";
type TabKey = "overview" | "markets" | "search" | "verify";

type Firm = {
  name: string;
  city: string;
  sector: string;
  cui: string;
  status: string;
  riskScore: number;
  founder: string;
  coInvestors: number;
  fxHedge: string;
  minInvestment: number;
  equity: number;
  timeline: number;
  description: string;
  contactEmail: string;
  contactWhatsApp: string;
  ibanRecipient: string;
  cryptoWallet: string;
};

const LANGUAGE_LABELS: Record<LocaleKey, string> = {
  ro: "RO",
  en: "EN",
  de: "DE",
  fr: "FR",
  tr: "TR",
};

function detectLocale(): LocaleKey {
  if (typeof navigator === "undefined") return "ro";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("tr")) return "tr";
  return "ro";
}

async function detectRegion(): Promise<RegionKey> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const data = (await res.json()) as { country_code?: string };
    const cc = data.country_code?.toUpperCase();
    if (cc === "CN" || cc === "HK") return "china";
    if (cc === "US") return "us";
    if (cc === "GB") return "uk";
    if (cc === "IL") return "israel";
    if (cc === "AE" || cc === "SA" || cc === "QA" || cc === "KW" || cc === "BH" || cc === "OM") return "uae";
    return "eu";
  } catch {
    return "eu";
  }
}

const TRANSLATIONS: Record<LocaleKey, Record<RegionKey, Record<string, string>>> = {
  ro: {
    eu: {
      title: "Investiții Global Capital Bridge",
      subtitle: "Platformă de micro-capital, verificare juridică și acces la companii din România și alte piețe relevante.",
      compliance: "RLS Supabase; transparență radicală; audit complet",
    },
    china: {
      title: "Global Capital Bridge - Securizare Capital UE",
      subtitle: "Securizare capital în Piața Unică Europeană. Bypass juridic privat pentru afaceri românești.",
      compliance: "Escrow UE; post-audit release; capital securizat în zone euro stabile",
    },
    us: {
      title: "Investment Hub - SEC Compliant",
      subtitle: "Conform SEC Reg D/Reg S. Acces la firme verificate prin SPV internațional. Formular W-8BEN inclus.",
      compliance: "SEC D/S; W-8BEN; acces acreditate; structură SPV",
    },
    uk: {
      title: "Global Capital Bridge - Post-Brexit",
      subtitle: "Post-Brexit clarity: conversia GBP→EUR, SEPA instant, audit complet, protecție FX.",
      compliance: "Post-Brexit; SEPA; GBP/EUR hedging; tax clear; instant transfer",
    },
    israel: {
      title: "Investment Hub - IP Protection",
      subtitle: "IP Protection & Source Code Audit. Matrice scalabilitate globală. Dovezi performanță tech.",
      compliance: "IP audit; scalabilitate globală; dovezi performanță; tech infrastructure assessment",
    },
    uae: {
      title: "Investment Hub - Shariah Compliant",
      subtitle: "Structură compatibilă finanțe islamice. Suport WhatsApp Premium. Fără taxe ascunse.",
      compliance: "Shariah-compatible; WhatsApp Premium support; no riba; structured equity sharing",
    },
  },
  en: {
    eu: {
      title: "Global Capital Bridge Investment Hub",
      subtitle: "Micro-capital, legal due diligence, and access to verified companies across Romania and adjacent markets.",
      compliance: "Supabase RLS; radical transparency; full audit trail",
    },
    china: {
      title: "Global Capital Bridge - Secure EU Capital",
      subtitle: "Secure capital in the EU Single Market. Private legal bypass for Romanian businesses.",
      compliance: "EU Escrow; post-audit release; capital in stable euro zones",
    },
    us: {
      title: "Investment Hub - SEC Compliant",
      subtitle: "SEC Reg D/Reg S compliant. Access via international SPV. W-8BEN form included.",
      compliance: "SEC D/S; W-8BEN; accredited access; SPV structure",
    },
    uk: {
      title: "Global Capital Bridge - Post-Brexit",
      subtitle: "Post-Brexit clarity: instant SEPA, GBP/EUR FX protection, full audit trail.",
      compliance: "Post-Brexit; instant SEPA; GBP/EUR hedging; tax clarity; regulatory compliance",
    },
    israel: {
      title: "Investment Hub - IP Protection",
      subtitle: "IP Protection & Source Code Audit. Global scalability matrix. Tech performance proof.",
      compliance: "IP audit; global scalability; performance evidence; tech infrastructure",
    },
    uae: {
      title: "Investment Hub - Shariah Compliant",
      subtitle: "Islamic finance compatible structure. WhatsApp Premium support. No hidden fees.",
      compliance: "Shariah-compliant; WhatsApp Premium support; no riba; equity structure",
    },
  },
  de: {
    eu: {
      title: "Global Capital Bridge Investment-Hub",
      subtitle: "Mikrokapital, rechtliche Due Diligence und Zugang zu verifizierten Unternehmen in Rumänien.",
      compliance: "Supabase RLS; radikale Transparenz; vollständiger Audit-Trail",
    },
    china: {
      title: "Global Capital Bridge - Sichere EU-Kapitalanlage",
      subtitle: "Kapital sicher im EU-Binnenmarkt. Privater rechtlicher Bypass für rumänische Unternehmen.",
      compliance: "EU Escrow; Post-Audit Freigabe; Kapital in stabilen Eurozonen",
    },
    us: {
      title: "Investment-Hub - SEC Konform",
      subtitle: "SEC Reg D/Reg S konform. Zugang via internationales SPV. W-8BEN-Formular.",
      compliance: "SEC D/S; W-8BEN; akkreditiert; SPV-Struktur",
    },
    uk: {
      title: "Global Capital Bridge - Post-Brexit",
      subtitle: "Post-Brexit Klarheit: sofortige SEPA, GBP/EUR FX-Schutz, vollständiger Audit-Trail.",
      compliance: "Post-Brexit; sofortige SEPA; GBP/EUR Hedging; Steuerklar",
    },
    israel: {
      title: "Investment-Hub - IP Protection",
      subtitle: "IP Protection & Source Code Audit. Globale Skalierungsmatrix. Tech-Performance-Nachweis.",
      compliance: "IP-Audit; globale Skalierung; Performance-Nachweis; Tech-Infrastruktur",
    },
    uae: {
      title: "Investment-Hub - Shariah-konform",
      subtitle: "Islamische Finanzstruktur. WhatsApp Premium Support. Keine versteckten Gebühren.",
      compliance: "Shariah-konform; WhatsApp Premium Support; keine Riba; Equity-Struktur",
    },
  },
  fr: {
    eu: {
      title: "Global Capital Bridge - Plateforme d'Investissement",
      subtitle: "Micro-capital, due diligence juridique et accès aux entreprises vérifiées en Roumanie.",
      compliance: "Supabase RLS; transparence radicale; traçabilité complète",
    },
    china: {
      title: "Global Capital Bridge - Capital Sécurisé UE",
      subtitle: "Sécurisez le capital dans le marché unique UE. Contournement juridique privé pour les entreprises roumaines.",
      compliance: "Escrow UE; libération post-audit; capital dans zones euro stables",
    },
    us: {
      title: "Hub d'Investissement - SEC Conforme",
      subtitle: "Conforme SEC Reg D/Reg S. Accès via SPV international. Formulaire W-8BEN.",
      compliance: "SEC D/S; W-8BEN; accrédité; structure SPV",
    },
    uk: {
      title: "Global Capital Bridge - Post-Brexit",
      subtitle: "Clarté post-Brexit: SEPA instantané, protection FX GBP/EUR, traçabilité complète.",
      compliance: "Post-Brexit; SEPA instantané; couverture GBP/EUR; clarté fiscale",
    },
    israel: {
      title: "Hub d'Investissement - Protection IP",
      subtitle: "Protection IP & audit de code. Matrice de scalabilité mondiale. Preuve de performance tech.",
      compliance: "Audit IP; scalabilité mondiale; preuve performance; infrastructure tech",
    },
    uae: {
      title: "Hub d'Investissement - Conforme Shariah",
      subtitle: "Structure compatible finance islamique. Support WhatsApp Premium. Pas de frais cachés.",
      compliance: "Conforme Shariah; support WhatsApp Premium; pas de riba; structure équité",
    },
  },
  tr: {
    eu: {
      title: "Küresel Sermaye Köprüsü Yatırım Hub'ı",
      subtitle: "Mikro-sermaye, yasal durum tespiti ve doğrulanmış şirketlere erişim.",
      compliance: "Supabase RLS; radikal şeffaflık; tam denetim izi",
    },
    china: {
      title: "Küresel Sermaye Köprüsü - Güvenli AB Sermayesi",
      subtitle: "Sermayeyi AB Tek Pazarında güvenli tutun. Rumen işletmeleri için özel yasal bypass.",
      compliance: "AB Escrow; denetim sonrası serbest bırakılma; stabil euro bölgeleri",
    },
    us: {
      title: "Yatırım Hub'ı - SEC Uyumlu",
      subtitle: "SEC Reg D/Reg S uyumlu. Uluslararası SPV aracılığıyla erişim. W-8BEN formu.",
      compliance: "SEC D/S; W-8BEN; akredite; SPV yapısı",
    },
    uk: {
      title: "Küresel Sermaye Köprüsü - Brexit Sonrası",
      subtitle: "Brexit sonrası açıklık: anında SEPA, GBP/EUR FX koruması, tam audit izi.",
      compliance: "Brexit sonrası; anında SEPA; GBP/EUR hedge; vergi net",
    },
    israel: {
      title: "Yatırım Hub'ı - IP Koruması",
      subtitle: "IP Koruması & Kaynak Kodu Denetimi. Küresel ölçeklenebilirlik matrisi. Tech performans kanıtı.",
      compliance: "IP denetimi; küresel ölçeklenebilirlik; performans kanıtı; tech altyapı",
    },
    uae: {
      title: "Yatırım Hub'ı - Şeriata Uyumlu",
      subtitle: "İslami finans uyumlu yapı. WhatsApp Premium destek. Gizli ücret yok.",
      compliance: "Şeriata uyumlu; WhatsApp Premium destek; riba yok; hisse yapısı",
    },
  },
};

const TAB_LABELS: Record<LocaleKey, Record<string, string>> = {
  ro: { overview: "Prezentare", markets: "Piețe", search: "Caută", verify: "Verificare" },
  en: { overview: "Overview", markets: "Markets", search: "Search", verify: "Verify" },
  de: { overview: "Übersicht", markets: "Märkte", search: "Suchen", verify: "Prüfen" },
  fr: { overview: "Vue d'ensemble", markets: "Marchés", search: "Recherche", verify: "Vérifier" },
  tr: { overview: "Genel Bakış", markets: "Pazarlar", search: "Ara", verify: "Doğrula" },
};

const QUICK_STATS: Record<LocaleKey, Array<{ label: string; value: string }>> = {
  ro: [
    { label: "Firme verificate", value: "620+" },
    { label: "Piețe active", value: "12" },
    { label: "Capital", value: "€4.2M" },
    { label: "Succes", value: "74%" },
  ],
  en: [
    { label: "Verified companies", value: "620+" },
    { label: "Active markets", value: "12" },
    { label: "Capital", value: "€4.2M" },
    { label: "Success", value: "74%" },
  ],
  de: [
    { label: "Verifizierte Firmen", value: "620+" },
    { label: "Aktive Märkte", value: "12" },
    { label: "Kapital", value: "€4.2M" },
    { label: "Erfolg", value: "74%" },
  ],
  fr: [
    { label: "Entreprises vérifiées", value: "620+" },
    { label: "Marchés actifs", value: "12" },
    { label: "Capital", value: "€4.2M" },
    { label: "Succès", value: "74%" },
  ],
  tr: [
    { label: "Doğrulanmış şirketler", value: "620+" },
    { label: "Aktif pazarlar", value: "12" },
    { label: "Sermaye", value: "€4.2M" },
    { label: "Başarı", value: "74%" },
  ],
};

export function InvestmentHub() {
  const [locale, setLocale] = useState<LocaleKey>("ro");
  const [region, setRegion] = useState<RegionKey>("eu");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");
  const [firmList, setFirmList] = useState<Firm[]>(SEED_FIRMS);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    sector: "",
    cui: "",
  });

  useEffect(() => {
    setLocale(detectLocale());
    detectRegion().then(setRegion);
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Firm[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setFirmList((prev) => [...parsed, ...prev.filter((item) => !parsed.some((p) => p.cui === item.cui))]);
      }
    } catch {
      // ignore malformed local data
    }
  }, []);

  const t = TRANSLATIONS[locale][region];
  const tabs = TAB_LABELS[locale];
  const stats = QUICK_STATS[locale];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return firmList;
    return firmList.filter((firm) =>
      [firm.name, firm.city, firm.sector, firm.cui].some((value) => value.toLowerCase().includes(q))
    );
  }, [firmList, search]);

  const handleVerify = async () => {
    const cui = form.cui.trim();
    if (!cui) {
      setResultMessage("Please enter a CUI to verify.");
      return;
    }

    setIsLoading(true);
    setResultMessage(null);

    try {
      const response = await fetch("/api/verify-ro-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cui, company_name: form.name || "" }),
      });
      const data = (await response.json()) as { ok?: boolean; company?: { name?: string; cui?: string }; message?: string };

      if (!response.ok || !data.ok) {
        setResultMessage(data.message ?? "Verification failed.");
        return;
      }

      const company = data.company ?? {};
      const nextFirm: Firm = {
        name: company.name || form.name || "New company",
        city: form.city || "Romania",
        sector: form.sector || "General",
        cui: company.cui || cui,
        status: "Verified via ANAF",
        riskScore: 70,
        founder: "TBD",
        coInvestors: 0,
        fxHedge: "EUR",
        minInvestment: 5000,
        equity: 2.0,
        timeline: 24,
        description: "Company under review. Contact founder for details.",
        contactEmail: "contact@company.ro",
        contactWhatsApp: "+40700000000",
        ibanRecipient: "ROXX XXXX XXXX XXXX XXXX XXXX",
        cryptoWallet: "0x0000000000000000000000000000000000000000",
      };

      setFirmList((prev) => {
        const exists = prev.some((item) => item.cui === nextFirm.cui);
        if (exists) return prev;
        return [nextFirm, ...prev];
      });
      setSearch(nextFirm.name);
      setResultMessage(`${nextFirm.name} verified and added.`);
    } catch {
      setResultMessage("Could not reach ANAF.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFirm = () => {
    const { name, city, sector, cui } = form;
    if (!name || !city || !sector || !cui) {
      setResultMessage("Complete all fields.");
      return;
    }

    const nextFirm: Firm = {
      name,
      city,
      sector,
      cui,
      status: "Added by user",
      riskScore: 50,
      founder: "TBD",
      coInvestors: 0,
      fxHedge: "EUR",
      minInvestment: 5000,
      equity: 2.0,
      timeline: 24,
      description: "New company - contact founder for investment details.",
      contactEmail: "contact@company.ro",
      contactWhatsApp: "+40700000000",
      ibanRecipient: "ROXX XXXX XXXX XXXX XXXX XXXX",
      cryptoWallet: "0x0000000000000000000000000000000000000000",
    };
    const next = [nextFirm, ...firmList.filter((item) => item.cui !== nextFirm.cui)];
    setFirmList(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    setSearch(name);
    setResultMessage(`${name} added.`);
    setForm({ name: "", city: "", sector: "", cui: "" });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400">
              {region === "china" ? "中文 (Simplified)" : region === "us" ? "SEC COMPLIANT" : region === "uk" ? "POST-BREXIT" : region === "israel" ? "IP AUDIT" : region === "uae" ? "SHARIAH" : "INVESTMENT HUB"}
            </p>
            <h1 className="mt-3 text-3xl font-black text-white">{t.title}</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(LANGUAGE_LABELS) as LocaleKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setLocale(key)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${locale === key ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-slate-700 bg-slate-950 text-slate-300"}`}
              >
                {LANGUAGE_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-300">{t.subtitle}</p>
        <p className="mt-2 text-xs text-emerald-300">{t.compliance}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              <p className="mt-2 text-xl font-bold text-emerald-300">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-2 md:grid-cols-4">
        {(Object.entries(tabs) as [TabKey, string][]).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`rounded-xl border px-3 py-2 text-sm font-medium ${activeTab === key ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-slate-700 bg-slate-900/80 text-slate-300"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? (
        <section className="grid gap-3 md:grid-cols-2">
          {[
            { country: "Romania", focus: "Agri, logistics, manufacturing", color: "emerald" },
            { country: "Poland", focus: "SME export, industrials", color: "blue" },
            { country: "Germany", focus: "Supply chain, energy", color: "amber" },
            { country: "France", focus: "Food, retail, SaaS", color: "purple" },
          ].map((card) => (
            <article key={card.country} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{card.country}</p>
              <h3 className="mt-3 text-lg font-bold text-white">{card.focus}</h3>
              <p className="mt-3 text-sm text-slate-300">Investment pilot and access to local production markets.</p>
            </article>
          ))}
        </section>
      ) : null}

      {activeTab === "markets" ? (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-bold text-white">Markets & Opportunities</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-500">Agriculture</p>
              <p className="mt-2 font-bold text-white">+18.6%</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-500">Logistics</p>
              <p className="mt-2 font-bold text-white">+14.9%</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
              <p className="text-slate-500">Green industry</p>
              <p className="mt-2 font-bold text-white">+21.2%</p>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "search" || activeTab === "verify" ? (
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h2 className="text-lg font-bold text-white">Available Companies</h2>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company, city, sector"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <button type="button" onClick={() => setSearch(search)} className="rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950">
                Search
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {filtered.length > 0 ? (
                filtered.map((firm) => (
                  <article key={`${firm.cui}-${firm.name}`} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-100">{firm.name}</h3>
                        <p className="mt-1 text-xs text-slate-400">{firm.description}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] whitespace-nowrap ${firm.riskScore >= 70 ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border border-amber-500/30 bg-amber-500/10 text-amber-300"}`}>
                        Risk: {firm.riskScore}%
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-2">
                        <p className="text-slate-400">Min. Investment</p>
                        <p className="font-semibold text-emerald-300">€{firm.minInvestment.toLocaleString()}</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-2">
                        <p className="text-slate-400">Equity</p>
                        <p className="font-semibold text-emerald-300">{firm.equity}%</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-2">
                        <p className="text-slate-400">Timeline</p>
                        <p className="font-semibold text-emerald-300">{firm.timeline} months</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-2">
                        <p className="text-slate-400">Co-investors</p>
                        <p className="font-semibold text-emerald-300">👥 {firm.coInvestors}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedFirm(firm)}
                        className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open(`mailto:${firm.contactEmail}`)}
                        className="rounded-xl border border-slate-600 px-2 py-2 text-xs font-medium text-slate-100"
                      >
                        ✉️
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open(`https://wa.me/${firm.contactWhatsApp.replace(/\D/g, '')}`)}
                        className="rounded-xl border border-slate-600 px-2 py-2 text-xs font-medium text-slate-100"
                      >
                        💬
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm text-slate-400">No company matches the search.</p>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h2 className="text-lg font-bold text-white">Add / Verify</h2>
            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Company name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                value={form.city}
                onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="City"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                value={form.sector}
                onChange={(e) => setForm((prev) => ({ ...prev, sector: e.target.value }))}
                placeholder="Sector"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                value={form.cui}
                onChange={(e) => setForm((prev) => ({ ...prev, cui: e.target.value }))}
                placeholder="CUI"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-emerald-500 px-3 py-2.5 font-semibold text-slate-950 disabled:opacity-60"
                >
                  {isLoading ? "Verifying…" : "Verify"}
                </button>
                <button type="button" onClick={handleAddFirm} className="flex-1 rounded-xl border border-slate-600 px-3 py-2.5 font-medium text-slate-100">
                  Add
                </button>
              </div>
            </div>
            {resultMessage ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{resultMessage}</p> : null}
          </div>
        </section>
      ) : null}

      {selectedFirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedFirm.name}</h2>
                <p className="mt-1 text-sm text-slate-300">Founded by {selectedFirm.founder} | {selectedFirm.city}, {selectedFirm.sector}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFirm(null)}
                className="rounded-full border border-slate-700 bg-slate-950 p-2 text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">About the Company</h3>
                <p className="text-sm text-slate-300">{selectedFirm.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Investment Terms</p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs text-slate-400">Min. Investment</p>
                      <p className="font-bold text-emerald-300">€{selectedFirm.minInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Equity Offered</p>
                      <p className="font-bold text-emerald-300">{selectedFirm.equity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Timeline</p>
                      <p className="font-bold text-emerald-300">{selectedFirm.timeline} months</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Risk & Credibility</p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs text-slate-400">Risk Score</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className={`h-full rounded-full ${selectedFirm.riskScore >= 70 ? "bg-emerald-500" : "bg-amber-500"}`}
                            style={{ width: `${selectedFirm.riskScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-sm">{selectedFirm.riskScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Co-investors</p>
                      <p className="font-bold text-emerald-300">👥 {selectedFirm.coInvestors} confirmed</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">FX Hedging</p>
                      <p className="font-bold text-slate-200">💱 {selectedFirm.fxHedge}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Payment & Contact Methods</h3>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4 space-y-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">IBAN (Bank Transfer)</p>
                    <p className="font-mono text-sm text-slate-200 break-all">{selectedFirm.ibanRecipient}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Crypto Wallet (USDC/Polygon)</p>
                    <p className="font-mono text-sm text-slate-200 break-all">{selectedFirm.cryptoWallet}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">How to Invest</h3>
                <ol className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 rounded-full bg-emerald-500 text-slate-950 w-6 h-6 flex items-center justify-center font-bold">1</span>
                    <span>Contact the founder via email or WhatsApp to discuss terms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 rounded-full bg-emerald-500 text-slate-950 w-6 h-6 flex items-center justify-center font-bold">2</span>
                    <span>Decide investment amount and method (bank transfer, crypto, or other)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 rounded-full bg-emerald-500 text-slate-950 w-6 h-6 flex items-center justify-center font-bold">3</span>
                    <span>Sign investment agreement and transfer funds to provided account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 rounded-full bg-emerald-500 text-slate-950 w-6 h-6 flex items-center justify-center font-bold">4</span>
                    <span>Receive equity certificate & regular updates on company performance</span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.open(`mailto:${selectedFirm.contactEmail}`)}
                  className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-600"
                >
                  ✉️ Email: {selectedFirm.contactEmail}
                </button>
                <button
                  type="button"
                  onClick={() => window.open(`https://wa.me/${selectedFirm.contactWhatsApp.replace(/\D/g, '')}`)}
                  className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 font-semibold text-emerald-200 hover:bg-emerald-500/20"
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
