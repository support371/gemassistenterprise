import Link from "next/link";

export default function NavigationPublic() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-cyan-400">
          GEM Cyber
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/atr-framework">ATR Framework</Link>
          <Link href="/app/intelligence">Command Center</Link>
        </div>
      </nav>
    </header>
  );
}
