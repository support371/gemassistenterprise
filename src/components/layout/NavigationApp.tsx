import Link from "next/link";

export default function NavigationApp() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/app/intelligence" className="text-lg font-semibold text-emerald-400">
          GEM Command Center
        </Link>
        <div className="text-sm text-slate-300">Operational Preview</div>
      </nav>
    </header>
  );
}
