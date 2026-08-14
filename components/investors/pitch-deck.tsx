"use client";

import { useState } from "react";

const COPY = {
  ro: {
    kicker: "Pitch investitori",
    title: "Motor P2P de economie locală",
    lead: "Nu grant. Nu partid. Tranzacții validate între oameni — Mânzare, logistică, apă.",
    pillars: [
      {
        name: "Mânzare & Prăvălii",
        en: "Direct-to-Consumer Local Agri-Marketplace (B2B2C)",
      },
      {
        name: "Scofalută + Strungă",
        en: "P2P Resource Sharing & Agricultural Supply Chain Engine",
      },
      {
        name: "Apa Crutsată / ApaRahova",
        en: "Data-Driven Precision Irrigation",
      },
    ],
    market: [
      { k: "TAM", v: "Agri + comerț local RO", n: "orientativ" },
      { k: "SAM", v: "Sat / periurban P2P", n: "pilot + județe" },
      { k: "SOM", v: "Comună + TikTok beta", n: "primele 90 zile" },
    ],
    stack: "Next.js · Supabase · Gemini Flash · PWA · Vercel Free",
  },
  en: {
    kicker: "Investor pitch",
    title: "Local P2P economic engine",
    lead: "No grants. No politics. Handshake-verified trades — food, logistics, water.",
    pillars: [
      {
        name: "Mânzare & shops",
        en: "Direct-to-Consumer Local Agri-Marketplace (B2B2C)",
      },
      {
        name: "Clearing + logistics",
        en: "P2P Resource Sharing & Agricultural Supply Chain Engine",
      },
      {
        name: "Apa Crutsată / ApaRahova",
        en: "Data-Driven Precision Irrigation",
      },
    ],
    market: [
      { k: "TAM", v: "RO agri + local trade", n: "directional" },
      { k: "SAM", v: "Rural / peri-urban P2P", n: "counties" },
      { k: "SOM", v: "Commune + TikTok beta", n: "first 90 days" },
    ],
    stack: "Next.js · Supabase · Gemini Flash · PWA · Vercel Free",
  },
} as const;

export function PitchDeck() {
  const [lang, setLang] = useState<"ro" | "en">("en");
  const t = COPY[lang];

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div className="flex justify-end gap-2">
        {(["en", "ro"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
              lang === l ? "bg-white text-slate-950" : "bg-slate-800 text-slate-300"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        {t.kicker}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white">{t.title}</h1>
      <p className="text-lg text-slate-300">{t.lead}</p>
      <ul className="space-y-3">
        {t.pillars.map((p) => (
          <li key={p.en} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold text-slate-100">{p.name}</p>
            <p className="text-sm text-slate-400">{p.en}</p>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-2">
        {t.market.map((m) => (
          <div key={m.k} className="rounded-xl bg-slate-900 p-3 text-center">
            <p className="text-xs text-emerald-400">{m.k}</p>
            <p className="mt-1 text-sm font-medium text-white">{m.v}</p>
            <p className="text-[10px] text-slate-500">{m.n}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">{t.stack}</p>
    </div>
  );
}
