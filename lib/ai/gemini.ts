import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

function normalizeModelName(modelName: string) {
  return modelName.replace(/^models\//, "").trim();
}

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local.");
  }

  const modelName = normalizeModelName(DEFAULT_MODEL);
  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: modelName });
}

export async function generateText(prompt: string) {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/404|Not Found/i.test(message)) {
      throw new Error(
        "Modelul Gemini nu este disponibil momentan. Verifică cheia API și modelul folosit (gemini-2.0-flash / gemini-1.5-flash-latest)."
      );
    }
    throw new Error(`Eroare Gemini: ${message}`);
  }
}

export async function generateJson<T>(prompt: string): Promise<T> {
  const text = await generateText(
    `${prompt}\n\nRespond with valid JSON only. No markdown fences.`
  );
  const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
  return JSON.parse(cleaned) as T;
}
