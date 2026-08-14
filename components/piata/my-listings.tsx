"use client";

import { useTransition } from "react";
import { closeListing } from "@/lib/listings/actions";
import type { Listing } from "@/lib/listings/types";
import { STATUS_LABELS } from "@/lib/listings/labels";
import { Button } from "@/components/ui/button";

export function MyListings({ listings }: { listings: Listing[] }) {
  const [pending, startTransition] = useTransition();

  if (listings.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Nu ai anunțuri. Mergi la Mânzare sau folosește microfonul.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {listings.map((l) => (
        <li
          key={l.id}
          className="flex items-center justify-between gap-2 rounded-xl bg-slate-900/80 px-3 py-3 text-sm"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-100">{l.title}</p>
            <p className="text-xs text-slate-500">{STATUS_LABELS[l.status]}</p>
          </div>
          {l.status === "active" ? (
            <form
              action={(fd) => {
                startTransition(async () => {
                  await closeListing(fd);
                });
              }}
            >
              <input type="hidden" name="id" value={l.id} />
              <Button type="submit" variant="ghost" disabled={pending}>
                Închide
              </Button>
            </form>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
