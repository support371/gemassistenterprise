import Link from 'next/link';
import { Shield, Building2, Eye, Lock, Globe, BarChart2 } from 'lucide-react';

export const metadata = {
  title: 'ATR Property Trust | Real Estate Intelligence & Portfolio Security | GEM Enterprise',
  description: 'Title security, property fraud prevention, deed monitoring, REIT-style portfolio visibility, and secured real estate asset management.',
};

const HERO_IMG = 'https://media.base44.com/images/public/69d42975b7b1794c3dc01661/e50d238c1_generated_image.png';

const capabilities = [
  {
    icon: Shield,
    title: 'Title Security & Verification',
    desc: 'Comprehensive chain-of-title analysis and ongoing integrity monitoring. We detect unauthorized modifications, fraudulent liens, and title manipulation before they cause financial loss.',
    tags: ['Title Chain', 'Lien Monitoring', 'Encumbrance Detection'],
  },
  {
    icon: Building2,
    title: 'Property Fraud Prevention',
    desc: 'Active monitoring for deed fraud, identity theft targeting property owners, and unauthorized transfer attempts. 24/7 surveillance across all covered properties in your portfolio.',
    tags: ['Deed Fraud', 'Owner Verification', 'Transfer Alerts'],
  },
  {
    icon: Eye,
    title: 'Deed Change Monitoring',
    desc: 'Automated monitoring of county recorder databases and public land records. Instant notification on new recordings, reconveyances, and court filings on any covered property.',
    tags: ['County Recorder', '24/7 Alerts', 'Portfolio Coverage'],
  },
  {
    icon: Lock,
    title: 'Escrow & Closing Protection',
    desc: 'Security protocols protecting real estate closing processes from wire fraud, BEC attacks, and identity impersonation. Pre-closing verification of all parties and wire instruction authentication.',
    tags: ['Wire Verification', 'BEC Protection', 'Identity Confirm'],
  },
  {
    icon: BarChart2,
    title: 'REIT-Style Portfolio Intelligence',
    desc: 'Institutional portfolio visibility across all covered properties — ownership records, encumbrances, valuations, and risk ratings in one authenticated dashboard.',
    tags: ['Portfolio Dashboard', 'Risk Rating', 'Valuation Data'],
  },
  {
    icon: Globe,
    title: 'Trust Workflow Management',
    desc: 'Structured workflows for trust-held real estate — trust agreement validation, trustee authority verification, beneficial interest documentation, and compliance record maintenance.',
    tags: ['Trust Agreements', 'Trustee Auth', 'Beneficial Interest'],
  },
];

const fraudStats = [
  { val: '$446M+', label: 'Lost to real estate wire fraud in the US — FBI IC3 2024 Report' },
  { val: '85%', label: 'Of title fraud victims had no active deed monitoring in place' },
  { val: '48 hrs', label: 'Average window for fraudulent deed transfer to be recorded before discovery' },
];

export default function ATRPropertyTrustPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">

      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, opacity: 0.22, filter: 'hue-rotate(30deg)' }}
          aria-hidden="true"
        />
        <span className="sr-only">Hero background: Modern institutional commercial real estate building at dusk with digital security monitoring network overlay and glowing protection shield — representing ATR Property Trust's real estate intelligence and fraud prevention capabilities across the US and UK markets</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">ATR Property Trust</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Real Estate Intelligence,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Trust Workflows & Portfolio Security
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Title security, property fraud prevention, deed monitoring, REIT-style portfolio visibility, and secured real estate asset management — powered by Alliance Trust Realty and GEM Enterprise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact-us" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white">
                Request Access
              </Link>
              <Link href="/services" className="px-8 py-4 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-semibold text-lg transition-all">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">What Is ATR Property Trust?</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              ATR Property Trust is GEM Enterprise's institutional real estate security and intelligence arm — operated in partnership with Alliance Trust Realty, a registered entity across the United States (EIN: 39-3307036) and United Kingdom (Companies House, SC001731, incorporated 31 December 2022).
            </p>
            <p className="text-slate-400 leading-relaxed mb-5">
              The service delivers title chain verification, deed monitoring, property fraud prevention, and REIT-style portfolio intelligence to qualified real estate investors, family offices, and institutional property operators.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              ATR Property Trust clients receive continuous property monitoring, instant deed-change alerts, escrow security protocols, and a dedicated property intelligence analyst who tracks your portfolio around the clock.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-extrabold text-cyan-400">UK + US</div>
                <div className="text-xs text-slate-500 mt-1">Dual-registered entity</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-cyan-400">EIN 39-3307036</div>
                <div className="text-xs text-slate-500 mt-1">IRS-registered, USA</div>
              </div>
            </div>
          </div>
          <div>
            {/* VIDEO PLACEHOLDER */}
            <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl aspect-video flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/15 border-2 border-cyan-500 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-cyan-400 ml-1" />
              </div>
              <div className="text-center px-8">
                <p className="text-white font-semibold mb-1">Video: ATR Property Trust Overview</p>
                <p className="text-slate-500 text-sm">2-minute walkthrough of real estate intelligence, deed monitoring, and portfolio protection. <span className="text-slate-600">[Placeholder: To be recorded by the Alliance Trust Realty operations team at 444 Alaska Ave, Torrance, CA]</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAUD THREAT STATS */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">The Real Estate Fraud Threat Is Growing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Property fraud, deed theft, wire fraud at closing, and title manipulation are among the fastest-growing financial crimes. High-value properties are increasingly targeted by organized criminal networks using fabricated documents and fraudulent transfers.
          </p>
          {/* INFOGRAPHIC PLACEHOLDER */}
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {fraudStats.map((s, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-8">
                <div className="text-3xl font-extrabold text-cyan-400 mb-3">{s.val}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600">
            [Image placeholder: A branded GEM infographic showing these three fraud statistics with large cyan numbers on dark background — to be designed as a shareable social/web asset by the GEM marketing team]
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Core Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div key={i} className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 rounded-xl p-7 transition-all">
                <Icon className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{cap.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map(t => (
                    <span key={t} className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEMO VIDEO */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">See ATR Property Trust in Action</h2>
          <p className="text-slate-400 mb-12">A guided walkthrough of the property intelligence dashboard, deed alert system, and closing protection workflow.</p>
          <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl aspect-video flex flex-col items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/15 border-2 border-cyan-500 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[24px] border-l-cyan-400 ml-1.5" />
            </div>
            <div className="text-center px-8">
              <p className="text-white font-semibold mb-1">Video: ATR Portfolio Intelligence Demo</p>
              <p className="text-slate-500 text-sm">4-minute screen walkthrough — property monitoring dashboard, live deed alert, and closing wire verification workflow. <span className="text-slate-600">[Placeholder: To be recorded and embedded here as mp4 or YouTube embed by the ATR team]</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Secure Your Real Estate Portfolio with ATR</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">Qualified real estate investors, family offices, and institutional operators. Begin your eligibility review today.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact-us" className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all text-white">
            Apply for Access
          </Link>
          <Link href="/contact-us" className="px-10 py-4 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-semibold text-lg transition-all">
            Talk to a Specialist
          </Link>
        </div>
      </section>
    </div>
  );
}
