import { clampScore, trustLabel } from "@/lib/trust/score";

export function TrustMeter({ score }: { score: number }) {
  const value = clampScore(score);
  const meta = trustLabel(value);

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-500">Trust Score</p>
          <p className="text-lg font-bold text-emerald-300">{meta.name}</p>
          <p className="text-xs text-slate-500">{meta.hint}</p>
        </div>
        <p className="text-3xl font-bold text-emerald-200">{value}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
