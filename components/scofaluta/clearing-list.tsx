"use client";

import { useTransition } from "react";
import { closeClearingOffer } from "@/lib/clearing/actions";
import type { ClearingOffer } from "@/lib/clearing/types";
import { Button } from "@/components/ui/button";

type Props = {
  offers: ClearingOffer[];
  userId: string | null;
  matchIds: Set<string>;
};

export function ClearingList({ offers, userId, matchIds }: Props) {
  const [pending, startTransition] = useTransition();

  if (offers.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Niciun schimb deschis. Pune ce dai și ce cauți.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {offers.map((o) => {
        const mine = o.user_id === userId;
        const match = matchIds.has(o.id);
        return (
          <li
            key={o.id}
            className={`rounded-2xl border px-4 py-3 ${
              match
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-slate-800 bg-slate-900/70"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                {match ? (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                    Potrivire
                  </p>
                ) : null}
                <p className="text-sm text-slate-100">
                  Dă: <span className="font-semibold">{o.gives}</span>
                </p>
                <p className="text-sm text-slate-300">
                  Caută: <span className="font-semibold">{o.wants}</span>
                </p>
              </div>
              {mine ? (
                <form
                  action={(fd) => {
                    startTransition(async () => {
                      await closeClearingOffer(fd);
                    });
                  }}
                >
                  <input type="hidden" name="id" value={o.id} />
                  <Button type="submit" variant="ghost" disabled={pending}>
                    Retrage
                  </Button>
                </form>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
