"use client";

import { useEffect, useMemo, useState } from "react";

const SEED_FIRMS = [
  { name: "Agricola Vale Verde", city: "Cluj", sector: "Agriculture", cui: "RO12345678", status: "Verified" },
  { name: "Moldova Timber Craft", city: "Iași", sector: "Wood & furniture", cui: "RO87654321", status: "Verified" },
  { name: "EcoLogistics Nord", city: "Brașov", sector: "Logistics", cui: "RO34567891", status: "Verified" },
  { name: "Fructe de la Poartă", city: "Timișoara", sector: "Distribution", cui: "RO45678912", status: "Verified" },
  { name: "GreenPack RO", city: "București", sector: "Packaging", cui: "RO56789123", status: "Verified" },
  { name: "Drumuri și Vale", city: "Sibiu", sector: "Construction", cui: "RO67891234", status: "Verified" },
];

const STORAGE_KEY = "crutsanimia-investment-firms";

type LocaleKey = "ro" | "en" | "de" | "fr";
type TabKey = "overview" | "markets" | "search" | "verify";

type Firm = {
  name: string;
  city: string;
  sector: string;
  cui: string;
  status: string;
};

const LANGUAGE_LABELS: Record<LocaleKey, string> = {
  ro: "RO",
  en: "EN",
  de: "DE",
  fr: "FR",
};

function detectLocale(): LocaleKey {
  if (typeof navigator === "undefined") return "ro";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("fr")) return "fr";
  return "ro";
}

export function InvestmentHub() {
  const [locale, setLocale] = useState<LocaleKey>("ro");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");
  const [firmList, setFirmList] = useState<Firm[]>(SEED_FIRMS);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    sector: "",
    cui: "",
  });

  useEffect(() => {
    setLocale(detectLocale());
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

  const translation = {
    ro: {
      title: "Investiții pentru economia locală și internațională",
      subtitle: "Platformă de micro-capital, verificare juridică și acces la companii din România și alte piețe relevante.",
      tabs: {
        overview: "Prezentare",
        markets: "Piețe",
        search: "Caută companii",
        verify: "Verificare",
      },
      quickStats: [
        { label: "Companii verificate", value: "620+" },
        { label: "Piețe active", value: "12" },
        { label: "Capital estimat", value: "€4.2M" },
        { label: "Rata de succes", value: "74%" },
      ],
      marketCards: [
        { country: "Romania", focus: "Agri, logistics, manufacturing" },
        { country: "Poland", focus: "SME export, industrials" },
        { country: "Germany", focus: "Supply chain, energy" },
        { country: "France", focus: "Food, retail, local SaaS" },
      ],
      add: "Adaugă firma ta",
      verify: "Verifică / adaugă",
      searchPlaceholder: "Caută firmă, oraș, sector sau CUI",
      noMatches: "Nicio firmă nu corespunde căutării.",
      request: "Solicită brief de investiție",
      success: "Căutarea și verificarea au fost actualizate.",
    },
    en: {
      title: "Investment platform for local and international growth",
      subtitle: "Micro-capital, legal due diligence, and access to verified companies across Romania and adjacent markets.",
      tabs: {
        overview: "Overview",
        markets: "Markets",
        search: "Search",
        verify: "Verify",
      },
      quickStats: [
        { label: "Verified companies", value: "620+" },
        { label: "Active markets", value: "12" },
        { label: "Estimated capital", value: "€4.2M" },
        { label: "Success rate", value: "74%" },
      ],
      marketCards: [
        { country: "Romania", focus: "Agri, logistics, manufacturing" },
        { country: "Poland", focus: "SME export, industrials" },
        { country: "Germany", focus: "Supply chain, energy" },
        { country: "France", focus: "Food, retail, local SaaS" },
      ],
      add: "Add your company",
      verify: "Verify / add",
      searchPlaceholder: "Search company, city, sector or CUI",
      noMatches: "No company matches the search.",
      request: "Request investment brief",
      success: "The search and verification results were updated.",
    },
    de: {
      title: "Investmentplattform für lokales und internationales Wachstum",
      subtitle: "Mikrokapital, rechtliche Due Diligence und Zugang zu verifizierten Unternehmen in Rumänien und angrenzenden Märkten.",
      tabs: {
        overview: "Übersicht",
        markets: "Märkte",
        search: "Suchen",
        verify: "Prüfen",
      },
      quickStats: [
        { label: "Verifizierte Firmen", value: "620+" },
        { label: "Aktive Märkte", value: "12" },
        { label: "Geschätztes Kapital", value: "€4.2M" },
        { label: "Erfolgsquote", value: "74%" },
      ],
      marketCards: [
        { country: "Rumänien", focus: "Landwirtschaft, Logistik, Industrie" },
        { country: "Polen", focus: "KMU-Export, Industrie" },
        { country: "Deutschland", focus: "Lieferketten, Energie" },
        { country: "Frankreich", focus: "Lebensmittel, Einzelhandel, SaaS" },
      ],
      add: "Unternehmen hinzufügen",
      verify: "Prüfen / hinzufügen",
      searchPlaceholder: "Unternehmen, Stadt, Branche oder CUI suchen",
      noMatches: "Keine Firma entspricht der Suche.",
      request: "Investitionsbrief anfragen",
      success: "Suche und Prüfergebnisse wurden aktualisiert.",
    },
    fr: {
      title: "Plateforme d’investissement pour la croissance locale et internationale",
      subtitle: "Micro-capital, due diligence juridique et accès aux entreprises vérifiées en Roumanie et sur les marchés voisins.",
      tabs: {
        overview: "Vue d’ensemble",
        markets: "Marchés",
        search: "Recherche",
        verify: "Vérifier",
      },
      quickStats: [
        { label: "Entreprises vérifiées", value: "620+" },
        { label: "Marchés actifs", value: "12" },
        { label: "Capital estimé", value: "€4.2M" },
        { label: "Taux de réussite", value: "74%" },
      ],
      marketCards: [
        { country: "Roumanie", focus: "Agri, logistique, industrie" },
        { country: "Pologne", focus: "Export PME, industriels" },
        { country: "Allemagne", focus: "Chaîne d’approvisionnement, énergie" },
        { country: "France", focus: "Alimentation, retail, SaaS local" },
      ],
      add: "Ajouter votre entreprise",
      verify: "Vérifier / ajouter",
      searchPlaceholder: "Rechercher une société, ville, secteur ou CUI",
      noMatches: "Aucune entreprise ne correspond à la recherche.",
      request: "Demander un brief d’investissement",
      success: "Les résultats de recherche et de vérification ont été mis à jour.",
    },
  } as const;
  const t = translation[locale];

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
      setResultMessage(locale === "ro" ? "Introdu un CUI pentru verificare." : locale === "en" ? "Enter a CUI to verify." : locale === "de" ? "Gib eine CUI zur Prüfung ein." : "Saisis un CUI pour vérification.");
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
      const nextFirm = {
        name: company.name || form.name || "New company",
        city: form.city || "Romania",
        sector: form.sector || "General",
        cui: company.cui || cui,
        status: "Verified via ANAF",
      };

      setFirmList((prev) => {
        const exists = prev.some((item) => item.cui === nextFirm.cui);
        if (exists) return prev;
        return [nextFirm, ...prev];
      });
      setSearch(nextFirm.name);
      setResultMessage(`${nextFirm.name} ${locale === "ro" ? "a fost validată și adăugată." : locale === "en" ? "was validated and added." : locale === "de" ? "wurde validiert und hinzugefügt." : "a été validée et ajoutée."}`);
    } catch {
      setResultMessage(locale === "ro" ? "Nu s-a putut contacta ANAF." : locale === "en" ? "ANAF could not be reached." : locale === "de" ? "ANAF konnte nicht erreicht werden." : "L’ANAF n’a pas pu être contacté.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFirm = () => {
    const { name, city, sector, cui } = form;
    if (!name || !city || !sector || !cui) {
      setResultMessage(locale === "ro" ? "Completează toate câmpurile." : locale === "en" ? "Complete all fields." : locale === "de" ? "Bitte alle Felder ausfüllen." : "Complète tous les champs.");
      return;
    }

    const nextFirm: Firm = { name, city, sector, cui, status: locale === "ro" ? "Adăugată de utilizator" : locale === "en" ? "Added by user" : locale === "de" ? "Vom Nutzer hinzugefügt" : "Ajoutée par l’utilisateur" };
    const next = [nextFirm, ...firmList.filter((item) => item.cui !== nextFirm.cui)];
    setFirmList(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    setSearch(name);
    setResultMessage(`${name} ${locale === "ro" ? "a fost adăugată." : locale === "en" ? "has been added." : locale === "de" ? "wurde hinzugefügt." : "a été ajoutée."}`);
    setForm({ name: "", city: "", sector: "", cui: "" });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400">Investment Hub</p>
            <h1 className="mt-3 text-3xl font-black text-white">{t.title}</h1>
          </div>
          <div className="flex gap-2">
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

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {t.quickStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              <p className="mt-2 text-xl font-bold text-emerald-300">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-2 md:grid-cols-4">
        {(Object.entries(t.tabs) as [TabKey, string][]).map(([key, label]) => (
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
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.marketCards.map((card) => (
            <article key={card.country} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{card.country}</p>
              <h3 className="mt-3 text-lg font-bold text-white">{card.focus}</h3>
              <p className="mt-3 text-sm text-slate-300">{locale === "ro" ? "Pilotare de investiții și acces la piețe locale de producție." : locale === "en" ? "Investment pilot and access to local production markets." : locale === "de" ? "Investitionspilotierung und Zugang zu lokalen Produktionsmärkten." : "Pilotage d’investissement et accès aux marchés de production locaux."}</p>
            </article>
          ))}
        </section>
      ) : null}

      {activeTab === "markets" ? (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-bold text-white">{locale === "ro" ? "Piețe și oportunități" : locale === "en" ? "Markets and opportunities" : locale === "de" ? "Märkte und Chancen" : "Marchés et opportunités"}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3"><p className="text-slate-500">Agriculture</p><p className="mt-2 font-bold text-white">+18.6%</p></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3"><p className="text-slate-500">Logistics</p><p className="mt-2 font-bold text-white">+14.9%</p></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3"><p className="text-slate-500">Green industry</p><p className="mt-2 font-bold text-white">+21.2%</p></div>
          </div>
        </section>
      ) : null}

      {activeTab === "search" || activeTab === "verify" ? (
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h2 className="text-lg font-bold text-white">{locale === "ro" ? "Firme disponibile" : locale === "en" ? "Available companies" : locale === "de" ? "Verfügbare Firmen" : "Entreprises disponibles"}</h2>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
              />
              <button type="button" onClick={() => setSearch(search)} className="rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950">{locale === "ro" ? "Caută" : locale === "en" ? "Search" : locale === "de" ? "Suchen" : "Rechercher"}</button>
            </div>
            <div className="mt-4 space-y-3">
              {filtered.length > 0 ? filtered.map((firm) => (
                <article key={`${firm.cui}-${firm.name}`} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-100">{firm.name}</h3>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">{firm.status}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-slate-700 px-2 py-1">{firm.city}</span>
                    <span className="rounded-full border border-slate-700 px-2 py-1">{firm.sector}</span>
                    <span className="rounded-full border border-slate-700 px-2 py-1">CUI: {firm.cui}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => setForm((prev) => ({ ...prev, name: firm.name, city: firm.city, sector: firm.sector, cui: firm.cui }))} className="rounded-xl border border-slate-600 px-3 py-2 text-xs font-medium text-slate-100">{locale === "ro" ? "Selectează" : locale === "en" ? "Select" : locale === "de" ? "Auswählen" : "Sélectionner"}</button>
                    <button type="button" onClick={() => window.open("https://www.anaf.ro", "_blank", "noopener,noreferrer")} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200">ANAF</button>
                  </div>
                </article>
              )) : <p className="text-sm text-slate-400">{t.noMatches}</p>}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h2 className="text-lg font-bold text-white">{t.verify}</h2>
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={locale === "ro" ? "Numele firmei" : locale === "en" ? "Company name" : locale === "de" ? "Firmenname" : "Nom de l’entreprise"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
              <input value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} placeholder={locale === "ro" ? "Oraș" : locale === "en" ? "City" : locale === "de" ? "Stadt" : "Ville"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
              <input value={form.sector} onChange={(e) => setForm((prev) => ({ ...prev, sector: e.target.value }))} placeholder={locale === "ro" ? "Sector / activitate" : locale === "en" ? "Sector / activity" : locale === "de" ? "Branche / Tätigkeit" : "Secteur / activité"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
              <input value={form.cui} onChange={(e) => setForm((prev) => ({ ...prev, cui: e.target.value }))} placeholder="CUI" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
              <div className="flex gap-2">
                <button type="button" onClick={handleVerify} disabled={isLoading} className="flex-1 rounded-xl bg-emerald-500 px-3 py-2.5 font-semibold text-slate-950 disabled:opacity-60">{isLoading ? (locale === "ro" ? "Se verifică…" : locale === "en" ? "Verifying…" : locale === "de" ? "Prüft…" : "Vérification…") : t.request}</button>
                <button type="button" onClick={handleAddFirm} className="flex-1 rounded-xl border border-slate-600 px-3 py-2.5 font-medium text-slate-100">{t.add}</button>
              </div>
            </div>
            {resultMessage ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{resultMessage}</p> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
