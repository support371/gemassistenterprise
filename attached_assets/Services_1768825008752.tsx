"use client";

import React from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Check,
} from "lucide-react";

/**
 * Services Section
 *
 * Presents the core offerings of GEM Cybersecurity. Each card highlights a
 * distinct service with an icon, descriptive copy, a feature list and a link
 * inviting users to learn more. On hover the cards lift slightly with an
 * increased shadow, while the icons pulse subtly to draw attention.
 */

// Type representing a single service card
interface Service {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

interface ServicesProps {}

// Define the data for each service
const services: Service[] = [
  {
    icon: Shield,
    iconColor: "#00B2FF",
    title: "24/7 Threat Monitoring & Detection",
    description:
      "AI‑powered threat detection monitors your entire infrastructure 24/7/365. Our SOC analysts investigate alerts within 2 minutes, stopping breaches before they impact your business.",
    features: [
      "Real‑time threat detection",
      "AI‑powered anomaly detection",
      "24/7 SOC analyst monitoring",
      "2‑minute average response time",
      "Unlimited threat investigations",
    ],
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    icon: AlertTriangle,
    iconColor: "#EF4444",
    title: "Incident Response & Digital Forensics",
    description:
      "When seconds count, our emergency response team investigates, contains and remediates security incidents. Complete digital forensics and recovery support included.",
    features: [
      "Emergency response team on standby",
      "Complete incident investigation",
      "Threat containment and eradication",
      "Digital forensics analysis",
      "Recovery and remediation support",
    ],
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    icon: CheckCircle2,
    iconColor: "#10B981",
    title: "Compliance & Risk Management",
    description:
      "Achieve and maintain SOC 2, ISO 27001, HIPAA and PCI DSS compliance with our automated monitoring and expert guidance. Continuous compliance verification included.",
    features: [
      "SOC 2 Type II preparation",
      "ISO 27001 certification support",
      "HIPAA and PCI DSS compliance",
      "Automated compliance monitoring",
      "Audit preparation and support",
    ],
    ctaText: "Learn More",
    ctaLink: "#",
  },
];

export default function Services(_: ServicesProps) {
  return (
    <section
      className="bg-[#F8F9FA] px-6 py-16 sm:py-20 lg:py-24"
      aria-label="Services Section"
    >
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section header */}
        <p className="text-sm font-semibold uppercase text-[#00B2FF] tracking-wider mb-4">
          OUR SERVICES
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2463] mb-4">
          Enterprise‑Grade Cybersecurity
        </h2>
        <p className="text-lg text-[#6B7280] mb-12">
          Three core services protecting 500+ enterprises worldwide
        </p>
        {/* Services grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col h-full bg-white rounded-xl p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <Icon
                  className="h-12 w-12 mb-6 transition-transform duration-300 group-hover:scale-110"
                  color={service.iconColor}
                />
                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0A2463] mb-4">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                  {service.description}
                </p>
                {/* Features list */}
                <ul className="flex flex-col gap-3 mb-6 text-sm text-[#6B7280]">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <Check className="h-4 w-4 text-[#10B981] mr-2 mt-0.5" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* CTA link */}
                <a
                  href={service.ctaLink}
                  className="mt-auto inline-flex items-center text-[#00B2FF] font-semibold text-base hover:underline transition-all duration-200"
                >
                  {service.ctaText}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
        {/* Bottom call‑to‑action button */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center h-14 px-12 rounded-md bg-[#00B2FF] text-white text-lg font-semibold hover:bg-[#0099DD] active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-[#00B2FF]/50"
          >
            Schedule Free Security Assessment
          </a>
        </div>
      </div>
    </section>
  );
}