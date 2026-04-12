import Link from "next/link";

const features = [
  {
    label: "Unified cyber + physical incident visibility",
  },
  {
    label: "Analyst-ready intelligence stream",
  },
  {
    label: "Operational KPI cards for response planning",
  },
  {
    label: "ATR framework for architecture, delivery, and governance",
    href: "/atr-framework",
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <article key={feature.label} className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-200">
          {feature.href ? (
            <Link href={feature.href} className="text-cyan-300 hover:text-cyan-200">
              {feature.label}
            </Link>
          ) : (
            feature.label
          )}
        </article>
      ))}
    </section>
  );
}
