"use client";

import { ReelExport } from "@/components/share/reel-export";
import type { Listing } from "@/lib/listings/types";
import { formatLocation, formatPrice, typeMeta } from "@/lib/listings/labels";

export function ShareListing({ listing }: { listing: Listing }) {
  const meta = typeMeta(listing.type);
  return (
    <ReelExport
      payload={{
        title: listing.title,
        price: formatPrice(listing.price_ron, listing.barter_ok),
        location: formatLocation(listing),
        emoji: meta.emoji,
      }}
    />
  );
}
