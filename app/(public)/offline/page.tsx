import { Section } from "@/components/ui/section";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg items-center px-4">
      <Section
        title="Ești offline"
        description="crutsanimia-ron PWA — reconectează-te pentru date live."
      >
        <p className="text-sm text-slate-400">
          Service worker-ul servește această pagină când rețeaua lipsește.
        </p>
      </Section>
    </div>
  );
}
