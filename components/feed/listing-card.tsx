import Image from "next/image";
import type { Listing } from "@/lib/listings/types";
import { formatLocation, formatPrice, typeMeta } from "@/lib/listings/labels";
import { Button } from "@/components/ui/button";

type Props = {
  listing: Listing;
  compact?: boolean;
};

export function ListingCard({ listing, compact = false }: Props) {
  const meta = typeMeta(listing.type);
  const location = formatLocation(listing);
  const price = formatPrice(listing.price_ron, listing.barter_ok);
  const tel = listing.contact_phone?.replace(/\s/g, "");

  return (
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
          <a href={`/piata#${listing.id}`} className="flex-1">
            <Button type="button" variant="ghost" className="w-full">
              Detalii
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}
