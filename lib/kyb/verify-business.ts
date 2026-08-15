import { lookupAnaf } from "@/lib/kyb/anaf";

export type BusinessVerificationResult = {
  ok: boolean;
  verified: boolean;
  source: "ANAF";
  company: {
    cui: string;
    name: string;
    address: string | null;
    vatPayer: boolean;
  };
  registry: {
    onrc: { status: "manual_review_required"; note: string };
    ubo: { status: "manual_review_required"; note: string };
  };
  checks: string[];
  message?: string;
};

export async function verifyRomanianBusiness(cui: string, companyName?: string): Promise<BusinessVerificationResult | { ok: false; message: string }> {
  const cleaned = String(cui ?? "").trim();
  const result = await lookupAnaf(cleaned);

  if ("error" in result) {
    return { ok: false, message: result.error };
  }

  return {
    ok: true,
    verified: true,
    source: "ANAF",
    company: {
      cui: result.cui,
      name: companyName?.trim() || result.name,
      address: result.address,
      vatPayer: result.vatPayer,
    },
    registry: {
      onrc: {
        status: "manual_review_required",
        note: "ONRC connectivity requires a dedicated registry provider or signed legal document set.",
      },
      ubo: {
        status: "manual_review_required",
        note: "UBO verification requires a registry-backed source or user-submitted ownership documents.",
      },
    },
    checks: ["anaf_cui_lookup", "company_name_normalized", "vat_status_checked"],
  };
}
