type Props = {
  label: string;
  children: React.ReactNode;
};

export function AiPanel({ label, children }: Props) {
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-400">
        {label}
      </p>
      {children}
    </div>
  );
}
