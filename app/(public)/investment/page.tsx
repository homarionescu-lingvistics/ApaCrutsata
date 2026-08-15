import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investiții în Afaceri Românești | Transparență & Micro-Capital Crutsanimia",
  description:
    "Platformă de micro-capital și investiții locale în România, cu transparență, verificare fiscală și oportunități de finanțare pentru afaceri autohtone.",
  openGraph: {
    title: "Investiții în Afaceri Românești | Transparență & Micro-Capital Crutsanimia",
    description:
      "Fără tepe, fără anonimat. Verificare fiscală, criterii clare și finanțare pentru afaceri românești.",
    type: "website",
  },
};

export default function InvestmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "Crutsanimia Investment Hub",
        url: "https://crutsanimia-ron.vercel.app/investment",
        description:
          "Platformă de micro-capital și investiții în afaceri românești, cu verificare fiscală și transparență.",
        areaServed: "Romania",
        category: "Investment",
      },
      {
        "@type": "InvestmentFund",
        name: "Crutsanimia Micro-Capital",
        description:
          "Fund de micro-investiții axat pe afaceri locale, preluare la poartă și capital local transparent.",
        investmentType: "Private equity and venture",
        currency: "RON",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="space-y-6 pb-10 text-slate-100">
        <header className="space-y-4 rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400">Investment Hub</p>
            <div className="flex gap-2 text-xs">
              <span className="rounded-full border border-slate-700 px-2 py-1">RO</span>
              <span className="rounded-full border border-slate-700 px-2 py-1">EN</span>
              <span className="rounded-full border border-slate-700 px-2 py-1">DE</span>
              <span className="rounded-full border border-slate-700 px-2 py-1">FR</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white">Investiții în afaceri românești</h1>
          <p className="text-sm text-slate-300">
            Fără comisioane ascunse, fără tranzacții de tip țeapă. Platforma conectează capitalul
            local și internațional cu proiecte verificate din România, cu transparență și documentare.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Verificare</p>
            <h2 className="mt-2 text-xl font-bold text-emerald-300">ANAF + ONRC</h2>
            <p className="mt-2 text-sm text-slate-300">CUI, capital românesc și control real verificat.</p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Transparență</p>
            <h2 className="mt-2 text-xl font-bold text-emerald-300">Scor 100%</h2>
            <p className="mt-2 text-sm text-slate-300">Capital 100% românesc atunci când criteriul este îndeplinit.</p>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Micro-capital</p>
            <h2 className="mt-2 text-xl font-bold text-emerald-300">P2P + bancă</h2>
            <p className="mt-2 text-sm text-slate-300">Plăți directe între părți sau prin bănci românești, fără piedică birocratică.</p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-xl font-bold text-white">Fișă tehnică de startup / afacere</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Ideea</p>
              <p className="mt-2 text-sm text-slate-200">Micro-ferme, logistică locală, reciclare, tehnologie agricolă, colectare de la poartă.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Necesar</p>
              <p className="mt-2 text-sm text-slate-200">Buget clar, active vizibile, cerere locală de pe platformă, plan de recuperare.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-xl font-bold text-white">Bănci și active românești</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="font-semibold text-slate-100">BCR</p>
              <p className="mt-2 text-sm text-slate-300">Finanțare de lucru, credit de dezvoltare și instrumente locale.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="font-semibold text-slate-100">BRD</p>
              <p className="mt-2 text-sm text-slate-300">Instrumente de capital de lucru și active localizat pe piață.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <h2 className="text-xl font-bold text-emerald-200">Scut juridic și transparență</h2>
          <p className="mt-3 text-sm text-slate-200">
            Platforma este construită ca o punte financiară transparentă: verificare fiscală, active reale,
            plan de investiție și documente clare. Nu există promisiuni de randament garantat; există doar
            date verificabile și modele de risc explicate.
          </p>
        </section>
      </main>
    </>
  );
}
