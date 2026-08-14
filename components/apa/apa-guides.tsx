"use client";

import { APA_GUIDES } from "@/lib/apa/guides";

export function ApaGuides() {
  return (
    <div className="space-y-4">
      {APA_GUIDES.map((g) => (
        <article
          key={g.id}
          id={g.id}
          className="rounded-2xl border border-sky-500/20 bg-slate-900/80 p-4"
        >
          <p className="text-3xl" aria-hidden>
            {g.emoji}
          </p>
          <h3 className="mt-2 text-lg font-bold text-sky-100">{g.title}</h3>
          <p className="text-sm text-sky-300/90">{g.punch}</p>
          <ol className="mt-3 space-y-1.5 text-sm text-slate-300">
            {g.steps.map((s, i) => (
              <li key={s} className="flex gap-2">
                <span className="font-mono text-sky-400">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
