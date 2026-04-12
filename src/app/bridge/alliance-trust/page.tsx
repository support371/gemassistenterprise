import { Building2, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AllianceTrustPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <Building2 className="w-20 h-20 text-cyan-500 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-6 text-white">Alliance Trust Realty</h1>
        <p className="text-xl text-slate-400 mb-12">
          Protecting physical assets with the same precision and technology used for digital security.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-left space-y-6 text-slate-300">
           <h2 className="text-2xl font-bold text-white mb-4">Integrated Asset Protection</h2>
           <p>Alliance Trust Realty, a GEM Enterprise company, provides specialized real estate asset management and recovery services.</p>
           <ul className="space-y-4">
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>High-value property protection</span>
              </li>
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>Asset recovery and liquidation</span>
              </li>
              <li className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" />
                 <span>Portfolio security audits</span>
              </li>
           </ul>
        </div>
        <div className="mt-10 bg-slate-900 border border-cyan-500/20 p-8 rounded-2xl text-left text-slate-300">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Compliance and Audit Integrity</div>
          <h2 className="mt-2 text-2xl font-bold text-white">ATR Governance Controls</h2>
          <p className="mt-3">
            Physical asset protection is governed by the ATR enterprise framework with data classification,
            immutable audit logging, and regional compliance modules for global holdings.
          </p>
          <Link
            href="/atr-framework"
            className="mt-5 inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300"
          >
            Explore the ATR Framework
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-12">
           <Link href="/contact-us" className="inline-flex items-center gap-2 text-cyan-500 font-bold hover:text-cyan-400">
              Learn more about our dual-platform model
              <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </div>
    </div>
  );
}
