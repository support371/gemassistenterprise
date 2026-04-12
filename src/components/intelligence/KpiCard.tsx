type KpiCardProps = {
  label: string;
  value: string;
  trend: string;
};

export default function KpiCard({ label, value, trend }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-emerald-300">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{trend}</p>
    </article>
  );
}
