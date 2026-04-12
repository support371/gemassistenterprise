import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { atrControlMatrixHighlights, atrDocuments } from "@/data/atr/framework";

export const metadata: Metadata = {
  title: "ATR Framework",
  description:
    "GEM and ATR enterprise architecture framework covering foundational controls, execution architecture, delivery governance, and scaling strategy.",
};

export default function AtrFrameworkPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-900 p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Architecture and Governance</p>
        <h1 className="mt-3 text-4xl font-bold text-white">GEM and ATR Framework</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Executive clarity and implementation precision across foundational architecture, execution,
          delivery controls, and enterprise scaling governance.
        </p>
      </section>

      <section className="grid gap-6">
        {atrDocuments.map((doc) => (
          <article key={doc.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-2 border-b border-slate-800 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">{doc.subtitle}</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{doc.title}</h2>
              </div>
              <a
                href={doc.pdfPath}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 px-3 py-2 text-sm text-cyan-300 transition-colors hover:border-cyan-400 hover:text-cyan-200"
                target="_blank"
                rel="noreferrer"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
            <p className="mt-4 text-slate-300">{doc.summary}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Principles</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-400">
                  {doc.principles.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Security and Controls</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-400">
                  {doc.controls.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Deployment Patterns</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-400">
                  {doc.deploymentPatterns.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Scaling and AI Governance</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-400">
                  {doc.scalingAndAiGovernance.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold text-white">Control Matrix Highlights</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {atrControlMatrixHighlights.map((highlight) => (
            <article key={highlight.title} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="text-lg font-medium text-cyan-300">{highlight.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{highlight.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 to-blue-950/20 p-6">
        <h2 className="text-2xl font-semibold text-white">Advance with a Controlled Architecture Roadmap</h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          Align security operations, governance, and deployment strategy with a single enterprise architecture
          model designed for execution and scale.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-400"
          >
            Talk to GEM
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}
