import { type SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function Select({ label, id, options, className = "", ...props }: Props) {
  const selectId = id ?? props.name;
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <select
        id={selectId}
        className={`w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none ring-emerald-500/40 focus:ring-2 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
