type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function Section({ title, description, children }: Props) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
