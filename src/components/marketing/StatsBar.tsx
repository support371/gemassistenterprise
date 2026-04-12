import { marketingStats } from "@/data/marketing/stats";

export default function StatsBar() {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-3">
      {marketingStats.map((stat) => (
        <div key={stat.label}>
          <p className="text-2xl font-semibold text-cyan-300">{stat.value}</p>
          <p className="text-sm text-slate-400">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
