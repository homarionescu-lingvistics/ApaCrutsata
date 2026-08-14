import { lookupAnaf } from "@/lib/kyb/anaf";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cui?: string };
    const result = await lookupAnaf(String(body.cui ?? ""));
    if ("error" in result) {
      return Response.json({ ok: false, message: result.error }, { status: 400 });
    }
    return Response.json({ ok: true, firm: result });
  } catch {
    return Response.json({ ok: false, message: "Cerere invalidă." }, { status: 400 });
  }
}
