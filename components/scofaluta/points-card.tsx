import type { LedgerEntry } from "@/lib/clearing/types";

function fmt(d: Date) {
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
}

export function PointsCard({
  balance,
  expiry,
  entries,
}: {
  balance: number;
  expiry: Date | null;
  entries: LedgerEntry[];
}) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-slate-900 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
        RON-Local
      </p>
      <p className="mt-1 text-4xl font-bold text-amber-100">{balance}</p>
      <p className="mt-1 text-xs text-amber-200/80">
        {expiry ? `Expiră din ${fmt(expiry)} (30 zile)` : "Câștigi puncte la handshake"}
      </p>
      {entries.length > 0 ? (
        <ul className="mt-4 space-y-1 border-t border-amber-500/20 pt-3">
          {entries.slice(0, 4).map((e) => (
            <li key={e.id} className="flex justify-between text-xs text-slate-300">
              <span className="truncate pr-2">{e.reason}</span>
              <span className="font-medium text-amber-200">+{e.amount}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
