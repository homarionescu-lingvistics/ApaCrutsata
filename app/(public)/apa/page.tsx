import { Section } from "@/components/ui/section";

export default function ApaPage() {
  return (
    <Section
      title="Apa 💧"
      description="Apă & irigații — integrare ApaRahova — Ziua 5."
    >
      <div className="space-y-3 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">
        <p>Date din senzori, nu din completări manuale — 1 mm rămâne 1 mm.</p>
        <a
          href="https://github.com/homarionescu-lingvistics/ApaCrutsata"
          className="inline-flex min-h-11 items-center rounded-xl bg-sky-600 px-4 font-semibold text-white"
          target="_blank"
          rel="noreferrer"
        >
          Deschide ApaRahova
        </a>
      </div>
    </Section>
  );
}
