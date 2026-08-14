import type { PriceStat } from "@/lib/clearing/types";

export function PriceStats({ stats }: { stats: PriceStat[] }) {
  if (stats.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Încă nu sunt prețuri în anunțuri. Publică la Mânzare sau Strungă.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <article
          key={s.type}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3"
        >
          <p className="text-xs text-slate-500">
            {s.emoji} {s.label} · {s.count}
          </p>
          <p className="mt-1 text-xl font-bold text-emerald-300">{s.avg} RON</p>
          <p className="text-[11px] text-slate-500">
            {s.min}–{s.max}
          </p>
        </article>
      ))}
    </div>
  );
}
