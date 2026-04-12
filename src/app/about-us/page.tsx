import { Shield, Target, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const timeline = [
    { year: '2019', title: 'Foundation', desc: 'GEM Enterprise founded with mission to democratize enterprise security' },
    { year: '2020', title: 'SOC Launch', desc: '24/7 Security Operations Center with 99.9% uptime' },
    { year: '2022', title: 'Alliance Trust', desc: 'Merged with Alliance Trust Realty for asset protection' },
    { year: '2024', title: 'SOC 2 Certified', desc: 'Achieved SOC 2 Type II compliance' },
    { year: '2025', title: 'Global Expansion', desc: 'Protecting 500+ enterprises with $50M+ assets' },
    { year: '2026', title: 'Quantum Security', desc: 'Launched QFS Network and Sentinel Trust' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Shield className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">About GEM Enterprise</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Protecting Digital Assets &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Recovering Physical Value
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400">
              Enterprise-grade security accessible to all organizations
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-cyan-500/10 to-slate-900 border border-cyan-500/30 rounded-2xl p-8">
              <Target className="w-12 h-12 text-cyan-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Provide uncompromising cybersecurity that empowers organizations to operate with
                confidence. Every business deserves Fortune 500-level protection.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/10 to-slate-900 border border-blue-600/30 rounded-2xl p-8">
              <Globe className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Be the global standard for integrated security, where threats are neutralized
                before they impact operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Architecture Framework</div>
                <h2 className="mt-2 text-3xl font-bold text-white">GEM and ATR Enterprise Foundation</h2>
                <p className="mt-3 text-slate-300">
                  Our operating model is grounded in a published architecture framework that aligns execution,
                  delivery controls, and governance for enterprise-grade resilience.
                </p>
              </div>
              <Link
                href="/atr-framework"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-400"
              >
                Explore the Framework
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Foundation</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Zero Trust access, encryption, and monitoring at the core.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Execution</h3>
                <p className="mt-2 text-sm text-slate-400">
                  API-first delivery with containerized services and event automation.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Delivery</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Release safety with canary controls and automated validation.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Governance</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Audit integrity, compliance posture, and AI oversight for scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey</h2>
              <p className="text-slate-400 text-lg">Seven years of innovation and growth</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyan-500/30 hidden md:block" />
              {timeline.map((event, idx) => (
                <div key={idx} className="relative pl-0 md:pl-24 pb-12 last:pb-0">
                  <div className="absolute left-0 md:left-4 w-8 h-8 rounded-full bg-cyan-500 border-4 border-slate-950 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="ml-12 md:ml-0 bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
                    <div className="text-cyan-500 text-sm font-bold mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                    <p className="text-slate-400">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Join 500+ Protected Enterprises</h2>
          <Link
            href="/contact-us"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white inline-flex items-center gap-2"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
