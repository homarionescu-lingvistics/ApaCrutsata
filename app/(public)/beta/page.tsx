import { TIKTOK_SCRIPTS } from "@/lib/share/tiktok-scripts";
import { Section } from "@/components/ui/section";

export default function BetaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Beta TikTok — 15 secunde</h1>
        <p className="text-sm text-slate-400">
          Gura satului, nu conferință. Citește. Filmează. Pune linkul.
        </p>
      </header>

      {TIKTOK_SCRIPTS.map((s) => (
        <Section key={s.title} title={s.title} description="~15 sec">
          <ol className="space-y-2 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200">
            {s.lines.map((line, i) => (
              <li key={line}>
                <span className="mr-2 font-mono text-emerald-400">{i + 1}.</span>
                {line}
              </li>
            ))}
          </ol>
        </Section>
      ))}

      <p className="text-center text-xs text-slate-500">
        Descarcă story 9:16 din Cont → anunțul tău. Fundal verde = Reels.
      </p>
    </div>
  );
}
