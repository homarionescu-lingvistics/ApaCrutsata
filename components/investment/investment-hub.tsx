"use client";

import { useEffect, useMemo, useState } from "react";

const SEED_FIRMS = [
  { name: "Agricola Vale Verde", city: "Cluj", sector: "Agricultură", cui: "RO12345678", status: "Verificat" },
  { name: "Moldova Timber Craft", city: "Iași", sector: "Lemn & mobile", cui: "RO87654321", status: "Verificat" },
  { name: "EcoLogistics Nord", city: "Brașov", sector: "Logistică", cui: "RO34567891", status: "Verificat" },
  { name: "Fructe de la Poartă", city: "Timișoara", sector: "Distribuție locală", cui: "RO45678912", status: "Verificat" },
  { name: "GreenPack RO", city: "București", sector: "Ambalaj și reciclare", cui: "RO56789123", status: "Verificat" },
  { name: "Drumuri și Vale", city: "Sibiu", sector: "Construcții", cui: "RO67891234", status: "Verificat" },
];

const STORAGE_KEY = "crutsanimia-investment-firms";

type Firm = {
  name: string;
  city: string;
  sector: string;
  cui: string;
  status: string;
};

export function InvestmentHub() {
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
      setResultMessage("Introdu un CUI pentru verificare.");
      return;
    }

    setIsLoading(true);
    setResultMessage(null);

    try {
      const res = await fetch("/api/verify-ro-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cui, company_name: form.name || "" }),
      });
      const data = (await res.json()) as { ok?: boolean; company?: { name?: string; cui?: string; address?: string | null }; message?: string };

      if (!res.ok || !data.ok) {
        setResultMessage(data.message ?? "Verificarea nu a reușit.");
        return;
      }

      const company = data.company ?? {};
      const result = {
        name: company.name || form.name || "Firmă nouă",
        city: form.city || "România",
        sector: form.sector || "General",
        cui: company.cui || cui,
        status: "Verified via ANAF",
      };

      setFirmList((prev) => {
        const existing = prev.find((p) => p.cui === result.cui);
        if (existing) return prev;
        return [result, ...prev];
      });
      setSearch(result.name);
      setResultMessage(`Firma ${result.name} a fost validată și adăugată în lista de investitori.`);
    } catch {
      setResultMessage("Nu s-a putut contacta serviciul de verificare ANAF.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFirm = () => {
    const { name, city, sector, cui } = form;
    if (!name || !city || !sector || !cui) {
      setResultMessage("Completează numele, orașul, sectorul și CUI-ul firmei.");
      return;
    }

    const newFirm: Firm = { name, city, sector, cui, status: "Adăugată de utilizator" };
    const next = [newFirm, ...firmList.filter((item) => item.cui !== newFirm.cui)];
    setFirmList(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSearch(name);
    setResultMessage(`Firma ${name} a fost adăugată în lista de companii disponibile.`);
    setForm({ name: "", city: "", sector: "", cui: "" });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400">Investment Hub</p>
        <h1 className="mt-3 text-3xl font-black text-white">Caută firme românești și investește inteligent</h1>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută firmă, oraș, sector sau CUI"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
          />
          <button
            type="button"
            onClick={() => setSearch(search)}
            className="rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950"
          >
            Caută
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-bold text-white">Firme disponibile</h2>
          <div className="mt-4 space-y-3">
            {filtered.length > 0 ? filtered.map((firm) => (
              <article key={`${firm.cui}-${firm.name}`} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-100">{firm.name}</h3>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    {firm.status}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-slate-700 px-2 py-1">{firm.city}</span>
                  <span className="rounded-full border border-slate-700 px-2 py-1">{firm.sector}</span>
                  <span className="rounded-full border border-slate-700 px-2 py-1">CUI: {firm.cui}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => setForm((prev) => ({ ...prev, name: firm.name, city: firm.city, sector: firm.sector, cui: firm.cui }))} className="rounded-xl border border-slate-600 px-3 py-2 text-xs font-medium text-slate-100">Selectează</button>
                  <button type="button" onClick={() => window.open("https://www.anaf.ro", "_blank", "noopener,noreferrer")} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200">Verifică ANAF</button>
                </div>
              </article>
            )) : <p className="text-sm text-slate-400">Nicio firmă nu corespunde căutării.</p>}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-lg font-bold text-white">Verifică / adaugă firma ta</h2>
          <div className="space-y-3">
            <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Numele firmei" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
            <input value={form.city} onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))} placeholder="Oraș" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
            <input value={form.sector} onChange={(e) => setForm((prev) => ({ ...prev, sector: e.target.value }))} placeholder="Sector / activitate" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
            <input value={form.cui} onChange={(e) => setForm((prev) => ({ ...prev, cui: e.target.value }))} placeholder="CUI" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2" />
            <div className="flex gap-2">
              <button type="button" onClick={handleVerify} disabled={isLoading} className="flex-1 rounded-xl bg-emerald-500 px-3 py-2.5 font-semibold text-slate-950 disabled:opacity-60">
                {isLoading ? "Se verifică…" : "Verifică"}
              </button>
              <button type="button" onClick={handleAddFirm} className="flex-1 rounded-xl border border-slate-600 px-3 py-2.5 font-medium text-slate-100">Adaugă</button>
            </div>
          </div>
          {resultMessage ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{resultMessage}</p> : null}
        </div>
      </section>
    </div>
  );
}
