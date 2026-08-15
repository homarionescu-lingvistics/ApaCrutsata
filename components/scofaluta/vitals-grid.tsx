import type { Vital } from "@/lib/scofaluta/vitals";

export function VitalsGrid({ vitals }: { vitals: Vital[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {vitals.map((v) => (
        <article key={v.key} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">{v.label}</p>
          <p className="mt-1 text-xl font-bold text-emerald-300">{v.value}</p>
          <p className="text-[11px] text-slate-500">{v.hint}</p>
        </article>
      ))}
    </div>
  );
}
