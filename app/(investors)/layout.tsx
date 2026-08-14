export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-50">
      {children}
    </div>
  );
}
