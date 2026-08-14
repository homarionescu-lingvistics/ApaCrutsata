export type ListingType = "product" | "service" | "asset" | "request";
export type ListingStatus = "active" | "closed" | "pending";

export type Listing = {
  id: string;
  user_id: string;
  type: ListingType;
  title: string;
  description: string | null;
  photo_url: string | null;
  city: string | null;
  neighborhood: string | null;
  price_ron: number | null;
  barter_ok: boolean;
  contact_phone: string | null;
  status: ListingStatus;
  created_at: string;
};

export type ListingDraft = {
  type?: ListingType;
  title?: string;
  description?: string;
  city?: string;
  neighborhood?: string;
  price_ron?: number | null;
  barter_ok?: boolean;
  contact_phone?: string;
};

export type ListingWithSeller = Listing & {
  seller_name: string | null;
};
