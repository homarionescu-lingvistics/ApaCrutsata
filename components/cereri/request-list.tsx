"use client";

import { useTransition } from "react";
import { upvoteRequest } from "@/lib/cereri/actions";
import type { BusinessRequest } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";

export function RequestList({
  requests,
  loggedIn,
}: {
  requests: BusinessRequest[];
  loggedIn: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (requests.length === 0) {
    return <p className="text-sm text-slate-400">Nicio cerere. Fii primul din cartier.</p>;
  }

  return (
    <ul className="space-y-2">
      {requests.map((r) => (
        <li
          key={r.id}
          className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
        >
          <div className="min-w-0">
            <p className="font-semibold text-slate-100">{r.category}</p>
            <p className="text-xs text-slate-500">
              {r.neighborhood}, {r.city}
            </p>
          </div>
          <form
            action={(fd) => {
              startTransition(async () => {
                await upvoteRequest(fd);
              });
            }}
          >
            <input type="hidden" name="id" value={r.id} />
            <Button type="submit" variant="ghost" disabled={pending || !loggedIn}>
              ▲ {r.upvotes_count}
            </Button>
          </form>
        </li>
      ))}
    </ul>
  );
}
