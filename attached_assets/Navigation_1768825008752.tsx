"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Navigation Header
 *
 * A responsive, sticky header that displays navigation links and a call‑to‑action
 * button. On smaller viewports a hamburger menu reveals a slide‑in panel
 * containing the same navigation items. A shadow appears when the user
 * scrolls down the page to enhance contrast against the content.
 */

interface NavigationProps {}

export default function Navigation(_: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  // Add a drop shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`${hasShadow ? "shadow-sm" : ""} sticky top-0 z-50 bg-white border-b border-[#E5E7EB] transition-shadow`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-[#0A2463] tracking-tight" aria-label="GEM Home">
          GEM
        </a>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-base text-[#0A2463] font-medium hover:text-[#00B2FF] transition-colors">
            Services
          </a>
          <a href="#about" className="text-base text-[#0A2463] font-medium hover:text-[#00B2FF] transition-colors">
            About
          </a>
          <a href="#case-studies" className="text-base text-[#0A2463] font-medium hover:text-[#00B2FF] transition-colors">
            Case Studies
          </a>
          <a href="#contact" className="text-base text-[#0A2463] font-medium hover:text-[#00B2FF] transition-colors">
            Contact
          </a>
          <a
            href="#assessment"
            className="ml-6 inline-flex items-center justify-center h-10 px-6 rounded-md bg-[#00B2FF] text-white text-sm font-semibold hover:bg-[#0099DD] transition-all shadow focus:outline-none focus:ring-4 focus:ring-[#00B2FF]/50"
          >
            Schedule Assessment
          </a>
        </nav>
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle Navigation Menu"
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#0A2463] hover:text-[#00B2FF] focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-[#E5E7EB]">
            <a href="#" className="text-2xl font-bold text-[#0A2463]" aria-label="GEM Home">
              GEM
            </a>
            <button
              type="button"
              aria-label="Close Navigation Menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0A2463] hover:text-[#00B2FF] focus:outline-none"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center mt-8 space-y-6 text-center">
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-xl font-semibold text-[#0A2463] hover:text-[#00B2FF] border-b border-[#E5E7EB]"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-xl font-semibold text-[#0A2463] hover:text-[#00B2FF] border-b border-[#E5E7EB]"
            >
              About
            </a>
            <a
              href="#case-studies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-xl font-semibold text-[#0A2463] hover:text-[#00B2FF] border-b border-[#E5E7EB]"
            >
              Case Studies
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-xl font-semibold text-[#0A2463] hover:text-[#00B2FF] border-b border-[#E5E7EB]"
            >
              Contact
            </a>
            <a
              href="#assessment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center w-11/12 h-12 rounded-md bg-[#00B2FF] text-white text-base font-semibold hover:bg-[#0099DD] transition-all"
            >
              Schedule Assessment
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}