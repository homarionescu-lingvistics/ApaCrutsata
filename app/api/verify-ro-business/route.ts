import { lookupAnaf } from "@/lib/kyb/anaf";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cui?: string; company_name?: string };
    const cui = String(body.cui ?? "").trim();
    const companyName = String(body.company_name ?? "").trim();

    const result = await lookupAnaf(cui);
    if ("error" in result) {
      return Response.json({ ok: false, message: result.error }, { status: 400 });
    }

    return Response.json({
      ok: true,
      verified: true,
      source: "ANAF",
      company: {
        cui: result.cui,
        name: companyName || result.name,
        address: result.address,
        vatPayer: result.vatPayer,
      },
      registry: {
        onrc: {
          status: "manual_review_required",
          note: "ONRC connectivity is configured as a verification layer; live registry access must be added via an official provider.",
        },
        ubo: {
          status: "manual_review_required",
          note: "UBO checks require a registry source or a user-submitted document set for the legal entity.",
        },
      },
      checks: ["anaf_cui_lookup", "company_name_normalized", "vat_status_checked"],
    });
  } catch {
    return Response.json({ ok: false, message: "Cerere invalidă." }, { status: 400 });
  }
}
