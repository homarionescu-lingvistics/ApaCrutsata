"use client";

import Image from "next/image";
import { useState } from "react";
import type { Listing } from "@/lib/listings/types";
import { formatLocation, formatPrice, typeMeta } from "@/lib/listings/labels";
import { Button } from "@/components/ui/button";

type Props = {
  listing: Listing;
  compact?: boolean;
  detailBase?: string;
};

export function ListingCard({ listing, compact = false, detailBase = "/piata" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  void detailBase;
  const meta = typeMeta(listing.type);
  const location = formatLocation(listing);
  const price = formatPrice(listing.price_ron, listing.barter_ok);
  const tel = listing.contact_phone?.replace(/\s/g, "");

  return (
    <>
      <article
        className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg ${
          compact ? "" : "mb-4"
        }`}
      >
        <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-900/40 to-slate-900">
          {listing.photo_url ? (
            <Image
              src={listing.photo_url}
              alt={listing.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <span className="text-5xl" aria-hidden>
                {meta.emoji}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-400/80">
                {meta.label}
              </span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            {price}
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="text-lg font-bold leading-tight text-slate-50">
              {listing.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500">{location}</p>
          </div>

          {listing.description ? (
            <p className="line-clamp-2 text-sm text-slate-400">{listing.description}</p>
          ) : null}

          <div className="flex gap-2">
            {tel ? (
              <a href={`tel:${tel}`} className="flex-1">
                <Button type="button" className="w-full">
                  Sună
                </Button>
              </a>
            ) : (
              <Button type="button" className="flex-1" disabled>
                Sună (fără tel.)
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => setIsOpen(true)}
            >
              Detalii
            </Button>
          </div>
        </div>
      </article>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-3 sm:items-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                  {meta.label}
                </p>
                <h4 className="mt-1 text-xl font-bold text-slate-50">{listing.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300"
                aria-label="Închide detalii"
              >
                Închide
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Locație</p>
                <p className="mt-1 font-medium text-slate-100">{location}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Preț</p>
                <p className="mt-1 font-medium text-emerald-300">{price}</p>
              </div>

              {listing.description ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Detalii</p>
                  <p className="mt-2 whitespace-pre-wrap text-slate-200">{listing.description}</p>
                </div>
              ) : null}

              {tel ? (
                <a href={`tel:${tel}`} className="block">
                  <Button type="button" className="w-full">
                    Sună la {tel}
                  </Button>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
