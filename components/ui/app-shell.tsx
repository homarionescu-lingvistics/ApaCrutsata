import { VoiceBar } from "@/components/ai/voice-bar";
import { BottomNav } from "@/components/ui/bottom-nav";
import { InstallBanner } from "@/components/pwa/install-banner";

export function AppShell({
  children,
  hideNav = false,
}: {
  children: React.ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-lg bg-[radial-gradient(ellipse_at_top,_#14532d33,_transparent_55%),linear-gradient(#0f172a,#020617)]">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
              CrutsanimiaRON
            </p>
            <p className="text-sm font-medium text-slate-200">
              Patriotism economic
            </p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
            Beta
          </span>
        </div>
        <VoiceBar />
        <InstallBanner />
      </header>
      <main className={`px-4 pt-6 ${hideNav ? "pb-10" : "pb-28"}`}>
        {children}
      </main>
      {hideNav ? null : <BottomNav />}
    </div>
  );
}
