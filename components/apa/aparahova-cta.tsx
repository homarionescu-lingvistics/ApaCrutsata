import { APARAHVA_URL } from "@/lib/apa/config";

export function AparahovaCta() {
  const ready = Boolean(APARAHVA_URL);

  if (!ready) {
    return (
      <div className="rounded-2xl border border-sky-500/30 bg-sky-950/50 p-4 text-center">
        <p className="text-sm font-semibold text-sky-100">
          ApaRahova — pentru fermieri cu acces la irigații
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Senzori, debit, program de udare. Website-ul nu e deschis încă.
        </p>
        <button
          type="button"
          disabled
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-sky-800/60 px-4 text-sm font-semibold text-sky-200/70"
        >
          ApaRahova — în curând
        </button>
      </div>
    );
  }

  return (
    <a
      href={APARAHVA_URL}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-4 text-center text-sm font-bold text-white"
    >
      Deschide ApaRahova
    </a>
  );
}
