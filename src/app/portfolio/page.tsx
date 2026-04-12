"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-20">
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-white">Portfolio Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            {[
              { label: 'Total Assets', value: '$52.4M' },
              { label: 'Digital', value: '245' },
              { label: 'Properties', value: '8' },
              { label: 'Uptime', value: '99.97%' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-cyan-500">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['overview', 'digital', 'properties', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Security Status</h2>
            <div className="space-y-3">
              {['All Systems Operational', '24/7 Monitoring Active', 'Compliance Up to Date'].map((status, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-slate-900 border border-cyan-500/20 rounded-2xl p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Architecture Alignment</div>
                <h2 className="mt-2 text-2xl font-bold text-white">Portfolio Security Under ATR Governance</h2>
                <p className="mt-3 text-slate-300">
                  Portfolio protection is governed by immutable audit trails, data classification, and
                  Zero Trust access controls defined in the GEM and ATR framework.
                </p>
              </div>
              <Link
                href="/atr-framework"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-500/40 px-4 py-2 font-semibold text-cyan-200 transition-colors hover:border-cyan-400 hover:text-white"
              >
                Explore the ATR Framework
              </Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <a
                href="/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf"
                className="flex items-center justify-between rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                01 Foundation Architecture
              </a>
              <a
                href="/docs/atr/04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf"
                className="flex items-center justify-between rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                04 Governance and Scaling
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
