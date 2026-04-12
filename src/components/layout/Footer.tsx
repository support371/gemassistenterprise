import Link from "next/link";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold text-white">Company</h3>
            <div className="space-y-2">
              <Link href="/about-us" className="block text-sm text-slate-400 transition-colors hover:text-white">About Us</Link>
              <Link href="/teams" className="block text-sm text-slate-400 transition-colors hover:text-white">Our Team</Link>
              <Link href="/case-studies" className="block text-sm text-slate-400 transition-colors hover:text-white">Case Studies</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Services</h3>
            <div className="space-y-2">
              <Link href="/services/threat-monitoring" className="block text-sm text-slate-400 transition-colors hover:text-white">Threat Monitoring</Link>
              <Link href="/services/compliance-management" className="block text-sm text-slate-400 transition-colors hover:text-white">Compliance Management</Link>
              <Link href="/services/asset-recovery" className="block text-sm text-slate-400 transition-colors hover:text-white">Asset Recovery</Link>
              <Link href="/services/federal-compliance" className="block text-sm text-slate-400 transition-colors hover:text-white">Federal Compliance</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Resources</h3>
            <div className="space-y-2">
              <Link href="/atr-framework" className="block text-sm text-slate-400 transition-colors hover:text-white">ATR Framework</Link>
              <Link href="/news" className="block text-sm text-slate-400 transition-colors hover:text-white">Intelligence Hub</Link>
              <Link href="/resources" className="block text-sm text-slate-400 transition-colors hover:text-white">Resource Hub</Link>
              <Link href="/case-studies" className="block text-sm text-slate-400 transition-colors hover:text-white">Case Studies</Link>
              <Link href="/portfolio" className="block text-sm text-slate-400 transition-colors hover:text-white">Portfolio</Link>
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <div className="uppercase tracking-[0.2em] text-slate-400">ATR PDFs</div>
              <a href="/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf" className="block hover:text-cyan-300" target="_blank" rel="noreferrer">01 Foundation</a>
              <a href="/docs/atr/02_GEM_ATR_Execution_Architecture.pdf" className="block hover:text-cyan-300" target="_blank" rel="noreferrer">02 Execution</a>
              <a href="/docs/atr/03_GEM_ATR_Delivery_Deployment_Framework.pdf" className="block hover:text-cyan-300" target="_blank" rel="noreferrer">03 Delivery</a>
              <a href="/docs/atr/04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf" className="block hover:text-cyan-300" target="_blank" rel="noreferrer">04 Governance</a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Legal</h3>
            <div className="space-y-2">
              <Link href="/legal/privacy-policy" className="block text-sm text-slate-400 transition-colors hover:text-white">Privacy</Link>
              <Link href="/legal/terms-of-service" className="block text-sm text-slate-400 transition-colors hover:text-white">Terms</Link>
              <Link href="/legal/cookie-policy" className="block text-sm text-slate-400 transition-colors hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <div className="text-sm text-slate-400">&copy; 2026 GEM Enterprise. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+18603054376" className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400">
              <Phone className="h-4 w-4" />
              (860) 305-4376
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
