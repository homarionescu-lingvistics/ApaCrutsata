import { followUpSurvey } from "@/lib/ai/survey";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { wish?: string; city?: string };
    const wish = String(body.wish ?? "").trim();
    if (wish.length < 3) {
      return Response.json({ ok: false, message: "Scrie ce vrei în cartier." }, { status: 400 });
    }
    const survey = await followUpSurvey(wish, String(body.city ?? ""));
    return Response.json({ ok: true, survey });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Eroare Gemini";
    return Response.json({ ok: false, message }, { status: 500 });
  }
}
