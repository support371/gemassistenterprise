import Link from 'next/link';
import { Shield, Eye, Zap, Globe, Lock, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'GEM Cyber Fund | Institutional Cybersecurity Operations | GEM Enterprise',
  description: 'Threat intelligence, dark web monitoring, 24/7 SOC coverage, and rapid incident response — engineered for enterprise clients.',
};

const HERO_IMG = 'https://media.base44.com/images/public/69d42975b7b1794c3dc01661/b0ae0b08a_generated_image.png';
const DASHBOARD_IMG = 'https://media.base44.com/images/public/69d42975b7b1794c3dc01661/378c4a717_generated_image.png';

const capabilities = [
  {
    icon: Shield,
    title: '24/7 Security Operations Center',
    desc: 'Certified analysts on a follow-the-sun model across North America, EMEA, and Asia-Pacific. Sub-6-minute mean time to acknowledge (MTTA). No coverage gaps.',
    tags: ['SIEM Management', 'Log Correlation', 'Real-Time Alerts'],
  },
  {
    icon: Eye,
    title: 'Proactive Threat Hunting',
    desc: 'Intelligence-led threat hunting informed by current adversary TTPs. Hypothesis-driven workflows that find attackers before they cause damage.',
    tags: ['Behavioral Analytics', 'Dark Web', 'TTP Detection'],
  },
  {
    icon: Zap,
    title: 'Incident Response',
    desc: 'Guaranteed 4-hour activation SLA. Rapid containment, eradication, and recovery with full digital forensics and post-incident reporting.',
    tags: ['4hr SLA', 'Digital Forensics', 'Evidence Preservation'],
  },
  {
    icon: Globe,
    title: 'Dark Web Monitoring',
    desc: 'Continuous surveillance of dark web forums, paste sites, credential markets, and breach databases for your organization\'s exposed data.',
    tags: ['Credential Leaks', 'IP Monitoring', 'Breach Alerts'],
  },
  {
    icon: Lock,
    title: 'Red Team Operations',
    desc: 'Full-scope adversarial simulations — network penetration, web application testing, social engineering, and physical security. Board-level debrief included.',
    tags: ['Pentest', 'Social Engineering', 'Kill Chain Simulation'],
  },
  {
    icon: Users,
    title: 'Compliance & Regulatory',
    desc: 'Expert guidance across SOC 2, ISO 27001, NIST CSF, GDPR, HIPAA, CMMC, and sector-specific mandates. Gap analysis, policy development, and audit readiness.',
    tags: ['SOC 2', 'ISO 27001', 'NIST CSF'],
  },
];

const stats = [
  { val: '< 6 min', label: 'Mean Time to Acknowledge' },
  { val: '4 hr', label: 'Incident Response SLA' },
  { val: '24/7', label: 'SOC Coverage' },
  { val: '500+', label: 'Enterprise Clients' },
];

export default function GEMCyberFundPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">

      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            opacity: 0.25,
          }}
          aria-hidden="true"
        />
        {/* Image alt description for accessibility */}
        <span className="sr-only">Hero background: Real-time cyber threat intelligence network visualization — glowing cyan nodes connected by bright lines on a dark background, representing GEM's global SOC monitoring infrastructure</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">GEM Cyber Fund</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Institutional-Grade<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Cybersecurity Operations
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Threat intelligence, dark web monitoring, 24/7 SOC coverage, and rapid incident response — engineered for organizations that cannot afford to be wrong.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all shadow-lg text-white"
              >
                Request Access
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-semibold text-lg transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">What Is the GEM Cyber Fund?</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              The GEM Cyber Fund delivers the same threat detection, intelligence, and response capabilities previously available only to the world's largest enterprises — packaged for qualified mid-market firms, family offices, and regulated entities.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5">
              Unlike traditional managed security providers who react to alerts, GEM operates proactively — hunting adversaries before they reach your perimeter, monitoring the dark web for your organization's exposed credentials, and maintaining continuous intelligence feeds tailored to your specific threat profile.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Every Cyber Fund engagement is supported by a named account team. Your dedicated security analyst knows your environment, your risk tolerance, and your compliance obligations from day one.
            </p>
          </div>
          <div>
            {/* VIDEO PLACEHOLDER */}
            <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl aspect-video flex flex-col items-center justify-center gap-4 shadow-xl shadow-cyan-500/5">
              <div className="w-16 h-16 rounded-full bg-cyan-500/15 border-2 border-cyan-500 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-cyan-400 ml-1" />
              </div>
              <div className="text-center px-8">
                <p className="text-white font-semibold mb-1">Video: GEM Cyber Fund Overview</p>
                <p className="text-slate-500 text-sm">2-minute explainer — how GEM's threat intelligence and SOC operations protect your enterprise 24/7. <span className="text-slate-600">[Placeholder: To be recorded by the GEM operations team and embedded here as an mp4 or YouTube embed]</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The GEM Threat Command Dashboard</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Your authenticated command surface — incident management, threat ratings, detection rules, and live SOC visibility.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <img
              src={DASHBOARD_IMG}
              alt="GEM Enterprise Threat Command dashboard UI — dark-themed interface showing real-time threat alert list on the left, a global threat map with red and cyan incident markers in the center panel, and compliance scorecard gauge readings on the right panel. This is the authenticated client view showing live SOC operations data."
              className="w-full block"
            />
          </div>
          <p className="text-xs text-slate-600 text-center mt-4">
            [Image: GEM Threat Command dashboard — representative UI mockup of the live SOC view showing active incident alerts, global threat map, and compliance posture scoring. Authenticated client access required for the live version.]
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

      {/* STATS */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-8">
                <div className="text-3xl font-extrabold text-cyan-400 mb-2">{s.val}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Activate Cyber Fund Coverage?</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">Qualified clients only. Begin your eligibility review and access request today.</p>
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
