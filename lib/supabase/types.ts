import type { Listing, ListingStatus, ListingType } from "@/lib/listings/types";

export type UserRole = "citizen" | "entrepreneur" | "producer" | "transporter";

export type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole | null;
  cui_number: string | null;
  is_verified_sme: boolean;
  ron_local_balance: number;
  created_at: string;
};

export type BusinessRequest = {
  id: string;
  category: string;
  city: string;
  neighborhood: string;
  upvotes_count: number;
  ai_insights_summary: Record<string, unknown>;
  created_by: string | null;
  created_at: string;
};

export type BusinessPostMortem = {
  id: string;
  category: string;
  city: string;
  failure_reasons: string;
  pricing_strategy_notes: string | null;
  min_capital_required: number | null;
  created_by: string | null;
  created_at: string;
};

export type GroupDeal = {
  id: string;
  title: string;
  category: string;
  target_units: number;
  current_units: number;
  unit_price: number;
  status: string;
  created_by: string | null;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name?: string | null;
          role?: UserRole | null;
          cui_number?: string | null;
          is_verified_sme?: boolean;
          ron_local_balance?: number;
          created_at?: string;
        };
        Update: {
          full_name?: string | null;
          role?: UserRole | null;
          cui_number?: string | null;
          is_verified_sme?: boolean;
          ron_local_balance?: number;
        };
        Relationships: [];
      };
      business_requests: {
        Row: BusinessRequest;
        Insert: {
          id?: string;
          category: string;
          city: string;
          neighborhood: string;
          upvotes_count?: number;
          ai_insights_summary?: Record<string, unknown>;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<BusinessRequest, "id">>;
        Relationships: [];
      };
      business_post_mortems: {
        Row: BusinessPostMortem;
        Insert: {
          id?: string;
          category: string;
          city: string;
          failure_reasons: string;
          pricing_strategy_notes?: string | null;
          min_capital_required?: number | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<BusinessPostMortem, "id">>;
        Relationships: [];
      };
      group_deals: {
        Row: GroupDeal;
        Insert: {
          id?: string;
          title: string;
          category: string;
          target_units: number;
          current_units?: number;
          unit_price: number;
          status?: string;
          created_by?: string | null;
        };
        Update: Partial<Omit<GroupDeal, "id">>;
        Relationships: [];
      };
      listings: {
        Row: Listing;
        Insert: {
          id?: string;
          user_id: string;
          type?: ListingType;
          title: string;
          description?: string | null;
          photo_url?: string | null;
          city?: string | null;
          neighborhood?: string | null;
          price_ron?: number | null;
          barter_ok?: boolean;
          contact_phone?: string | null;
          status?: ListingStatus;
          created_at?: string;
        };
        Update: Partial<Omit<Listing, "id" | "user_id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
