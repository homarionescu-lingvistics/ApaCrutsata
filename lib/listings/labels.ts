import type { Listing, ListingStatus, ListingType } from "@/lib/listings/types";

export const LISTING_TYPES: { value: ListingType; label: string; emoji: string }[] = [
  { value: "product", label: "Produs", emoji: "🧺" },
  { value: "service", label: "Serviciu", emoji: "🛠️" },
  { value: "asset", label: "Utilaj", emoji: "🚜" },
  { value: "request", label: "Caut", emoji: "🔍" },
];

export const STATUS_LABELS: Record<ListingStatus, string> = {
  active: "Activ",
  closed: "Finalizat",
  pending: "În derulare",
};

export function typeMeta(type: ListingType) {
  return LISTING_TYPES.find((t) => t.value === type) ?? LISTING_TYPES[0];
}

export function formatPrice(price: number | null, barterOk: boolean) {
  if (price != null && price > 0) return `${price} RON`;
  if (barterOk) return "Schimb / Troc";
  return "Preț la telefon";
}

export function formatLocation(listing: Pick<Listing, "city" | "neighborhood">) {
  return [listing.neighborhood, listing.city].filter(Boolean).join(", ") || "România";
}
