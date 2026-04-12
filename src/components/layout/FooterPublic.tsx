import Link from "next/link";

export default function FooterPublic() {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>&copy; {new Date().getFullYear()} GEM Cyber. Public Site Preview.</div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/atr-framework" className="text-slate-300 transition-colors hover:text-white">
            ATR Framework
          </Link>
          <a
            href="/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf"
            className="text-cyan-300 transition-colors hover:text-cyan-200"
            target="_blank"
            rel="noreferrer"
          >
            ATR Documents
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <a href="/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf" className="hover:text-cyan-300" target="_blank" rel="noreferrer">
            01 Foundation
          </a>
          <a href="/docs/atr/02_GEM_ATR_Execution_Architecture.pdf" className="hover:text-cyan-300" target="_blank" rel="noreferrer">
            02 Execution
          </a>
          <a href="/docs/atr/03_GEM_ATR_Delivery_Deployment_Framework.pdf" className="hover:text-cyan-300" target="_blank" rel="noreferrer">
            03 Delivery
          </a>
          <a href="/docs/atr/04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf" className="hover:text-cyan-300" target="_blank" rel="noreferrer">
            04 Governance
          </a>
        </div>
      </div>
    </footer>
  );
}
