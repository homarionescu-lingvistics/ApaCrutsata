"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Report = { level: string; summary: string; tips: string[] };

export function RiskBox() {
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/simulate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Eroare");
      setReport(data.report as Report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        rows={3}
        placeholder="Vreau petshop în Sibiu, buget 5000€, hrană vrac…"
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
      />
      <Button type="button" className="w-full" disabled={busy || idea.length < 8} onClick={() => void run()}>
        {busy ? "Gemini calculează…" : "Verifică riscul"}
      </Button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {report ? (
        <div className="rounded-xl bg-slate-900 p-3 text-sm">
          <p className="font-semibold uppercase text-emerald-300">{report.level}</p>
          <p className="mt-1 text-slate-200">{report.summary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-400">
            {report.tips?.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
