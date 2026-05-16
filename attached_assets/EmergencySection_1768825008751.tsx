"use client";

import React from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";

/**
 * Emergency Section
 *
 * Highlights the availability of round‑the‑clock incident response for urgent
 * security issues. It uses a dark background with a red accent to
 * communicate urgency. Two buttons allow users to immediately call or email
 * the emergency team, and feature points summarise the benefits of the
 * service.
 */

interface EmergencySectionProps {}

export default function EmergencySection(_: EmergencySectionProps) {
  return (
    <section className="bg-[#0A2342] border-t-4 border-[#EF4444] px-6 py-16 sm:py-20" aria-label="Emergency Section">
      <div className="max-w-screen-lg mx-auto text-center">
        <p className="text-xs font-bold uppercase text-[#EF4444] tracking-widest mb-4">
          NEED IMMEDIATE HELP?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          24/7 Emergency Incident Response
        </h2>
        <p className="text-base sm:text-lg text-[#D1D5DB] max-w-2xl mx-auto leading-relaxed mb-8">
          Security incident in progress? Our emergency response team is standing by 24/7/365 to
          contain and remediate active threats.
        </p>
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="tel:+14017022460"
            className="inline-flex items-center justify-center h-14 px-10 rounded-md bg-[#EF4444] text-white text-lg font-semibold hover:bg-[#DC2626] transition-all duration-200"
          >
            🚨 Call Emergency Hotline
          </a>
          <a
            href="mailto:emergency@gemcybersecurityassist.com"
            className="inline-flex items-center justify-center h-14 px-10 rounded-md border-2 border-white text-white text-lg font-semibold hover:bg-white hover:text-[#0A2342] transition-all duration-200"
          >
            Email Emergency Team
          </a>
        </div>
        {/* Features */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3 text-left max-w-screen-md mx-auto">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <span className="text-sm text-[#D1D5DB]">2‑Minute Response Time</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <span className="text-sm text-[#D1D5DB]">Expert Security Analysts</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <span className="text-sm text-[#D1D5DB]">Complete Incident Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}