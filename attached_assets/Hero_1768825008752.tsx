"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

/**
 * Hero Section
 *
 * This component represents the top of the homepage. It introduces the
 * platform, encourages the user to take action, and visually reinforces the
 * technical sophistication of the service with a simple dashboard mockup.
 *
 * The left column contains headlines, descriptive copy, call‑to‑action
 * buttons and credibility indicators. The right column displays a mock
 * security operations dashboard. Both parts are responsive and rearrange
 * vertically on smaller screens. A fade‑in effect runs on mount to
 * progressively reveal the content.
 *
 * State management:
 *  - `mounted` toggles the fade‑in animation once the component is
 *    mounted in the browser.
 *  - `primaryLoading` controls the loading spinner on the primary CTA.
 *  - `secondaryLoading` controls the loading spinner on the secondary CTA.
 */

interface HeroProps {}

export default function Hero(_: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  // Trigger fade‑in after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Handles clicks on the primary button. Sets a temporary loading state
   * to demonstrate asynchronous behaviour. In production this would
   * initiate navigation or form submission.
   */
  const handlePrimaryClick = () => {
    setPrimaryLoading(true);
    setTimeout(() => {
      setPrimaryLoading(false);
      // Place navigation or other action here
    }, 1000);
  };

  /**
   * Handles clicks on the secondary button. Sets a brief loading state
   * before opening the telephone link. On a phone this would immediately
   * dial the number.
   */
  const handleSecondaryClick = () => {
    setSecondaryLoading(true);
    setTimeout(() => {
      setSecondaryLoading(false);
      window.location.href = "tel:+18603054376";
    }, 100);
  };

  // Credibility indicators displayed below the call to action buttons
  const trustItems = [
    { text: "SOC 2 Type II Certified" },
    { text: "500+ Enterprises Protected" },
    { text: "2‑Min Response Time" },
  ];

  return (
    <section className="bg-white" aria-label="Hero Section">
      <div
        className={
          "container mx-auto max-w-screen-xl px-6 py-20 lg:flex lg:items-center lg:justify-between transition-opacity duration-700" +
          (mounted ? " opacity-100" : " opacity-0")
        }
      >
        {/* Left column: introductory content */}
        <div className="lg:w-7/12 w-full">
          <p className="text-sm font-semibold uppercase text-[#00B2FF] tracking-wider mb-4">
            ENTERPRISE SECURITY PLATFORM
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A2463] max-w-2xl mb-6 leading-tight tracking-tight">
            Stop Breaches Before They Happen
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] max-w-xl mb-8 leading-relaxed">
            AI‑powered threat detection and 24/7 SOC monitoring for enterprises that can’t afford
            downtime. Real‑time incident response with 2‑minute average response time.
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={handlePrimaryClick}
              disabled={primaryLoading}
              className="inline-flex items-center justify-center h-14 px-8 rounded-md text-white text-lg font-semibold bg-[#00B2FF] hover:bg-[#0099DD] active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-[#00B2FF]/50"
            >
              {primaryLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Scheduling...
                </>
              ) : (
                "Schedule Security Assessment"
              )}
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
              disabled={secondaryLoading}
              className="inline-flex items-center justify-center h-14 px-8 rounded-md text-[#0A2463] text-lg font-semibold border-2 border-[#0A2463] hover:bg-[#0A2463] hover:text-white active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#0A2463]/50"
            >
              {secondaryLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Calling...
                </>
              ) : (
                "24/7 Emergency: (860) 305-4376"
              )}
            </button>
          </div>
          {/* Trust indicators */}
          <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-6">
            {trustItems.map((item, idx) => (
              <li key={idx} className="flex items-center text-sm text-[#6B7280]">
                <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" aria-hidden="true" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        {/* Right column: dashboard mockup */}
        <div className="mt-12 lg:mt-0 lg:w-5/12 w-full flex justify-center">
          <div className="relative w-full pb-[56.25%] bg-[#0A2342] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 p-6 flex flex-col">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white text-base font-medium">
                  Security Operations Center
                </span>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" aria-hidden="true"></span>
                  <span className="text-xs text-[#10B981]">Live</span>
                </div>
              </div>
              {/* Dashboard cards */}
              <div className="grid grid-cols-2 gap-4 text-white flex-1">
                {/* Card 1 */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between">
                  <div className="text-sm text-gray-300">Threats Detected Today</div>
                  <div className="text-2xl font-bold">2,437</div>
                  <div className="text-xs text-gray-400">+12% vs yesterday</div>
                </div>
                {/* Card 2 */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between">
                  <div className="text-sm text-gray-300">Response Time</div>
                  <div className="text-2xl font-bold">2.1 min avg</div>
                  <div className="text-xs text-[#10B981]">Optimal</div>
                </div>
                {/* Card 3 */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between">
                  <div className="text-sm text-gray-300">Systems Monitored</div>
                  <div className="text-2xl font-bold">847 endpoints</div>
                  <div className="text-xs text-gray-400">99.9% uptime</div>
                </div>
                {/* Card 4 */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between">
                  <div className="text-sm text-gray-300">Active Analysts</div>
                  <div className="text-2xl font-bold">12 online</div>
                  <div className="text-xs text-gray-400">24/7 coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}