import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <p className="text-sm uppercase tracking-wider text-cyan-400">GEM Cyber Platform</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">
        Cyber + Physical Intelligence in one command center
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Monitor threats, coordinate response teams, and maintain compliance from a unified interface.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/atr-framework"
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 px-4 py-2 text-cyan-300 transition-colors hover:border-cyan-400 hover:text-cyan-200"
        >
          View ATR Framework
        </Link>
        <span className="text-slate-400">Built on enterprise architecture for governance and scale.</span>
      </div>
    </section>
  );
}
