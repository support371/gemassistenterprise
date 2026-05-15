"use client";

import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";

/**
 * Testimonials Section
 *
 * Showcases client success stories to build social proof. Each card displays
 * a testimonial quote along with the client's name, title, company and a
 * quantitative metric. A statistics bar at the bottom reinforces the scale
 * of the company’s impact. Numbers in the stats bar count up from zero
 * when the component is mounted.
 */

interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  metric: string;
  photoUrl?: string;
}

interface Stat {
  label: string;
  target: number;
  suffix?: string;
}

interface TestimonialsProps {}

const testimonials: Testimonial[] = [
  {
    quote:
      "GEM Enterprise reduced our security incidents by 87% in the first quarter. Their SOC team's response time is exceptional – we've never experienced faster threat mitigation.",
    authorName: "Sarah Johnson",
    authorTitle: "CISO",
    company: "Fortune 500 Financial Services",
    metric: "87% Reduction in Incidents",
  },
  {
    quote:
      "After evaluating 10+ vendors, GEM's combination of AI detection and human expertise stood out. We achieved SOC 2 Type II certification in 90 days with their guidance.",
    authorName: "Michael Chen",
    authorTitle: "CTO",
    company: "Leading Healthcare SaaS Provider",
    metric: "SOC 2 in 90 Days",
  },
];

const stats: Stat[] = [
  { label: "Enterprises Protected", target: 500, suffix: "+" },
  { label: "Average Response Time", target: 2, suffix: " Min" },
  { label: "Threat Detection Accuracy", target: 99.97, suffix: "%" },
];

export default function Testimonials(_: TestimonialsProps) {
  // Local state for the animated stat numbers
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    // Simple count up animation over 1 second
    const duration = 1000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(stats.map(({ target }) => target * progress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <section
      className="bg-white px-6 py-16 sm:py-20 lg:py-24"
      aria-label="Testimonials Section"
    >
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section header */}
        <p className="text-sm font-semibold uppercase text-[#00B2FF] tracking-wider mb-4">
          CLIENT SUCCESS STORIES
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2463] mb-12">
          Trusted by Enterprise Security Leaders
        </h2>
        {/* Testimonials grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F8F9FA] rounded-xl p-10 flex flex-col justify-between min-h-full"
            >
              {/* Quote */}
              <div>
                <Quote className="h-12 w-12 text-[#00B2FF]/20 mb-4" />
                <p className="text-lg italic text-[#0A2463] leading-relaxed mb-8">
                  {t.quote}
                </p>
              </div>
              {/* Author info */}
              <div className="flex items-center">
                {/* Placeholder photo circle */}
                <div className="h-16 w-16 rounded-full bg-[#D1D5DB] border-2 border-white mr-4" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-[#0A2463]">
                    {t.authorName}, {t.authorTitle}
                  </span>
                  <span className="text-sm text-[#6B7280] mb-2">{t.company}</span>
                  <span className="inline-block bg-[#10B981]/10 text-[#065F46] py-1 px-3 rounded-full text-xs font-bold">
                    {t.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Stats bar */}
        <div className="mt-16 bg-[#0A2463]/5 p-12 rounded-xl">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-[#0A2463] mb-2">
                  {counts[idx].toFixed(stat.target % 1 === 0 ? 0 : 2)}
                  {stat.suffix}
                </div>
                <div className="text-sm text-[#6B7280] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}