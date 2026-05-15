"use client";

import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

/**
 * Footer
 *
 * Provides company information, navigation links, resources and social media
 * icons. The footer uses a dark navy background to ground the page and
 * contrast with the lighter sections above. On mobile the columns stack
 * vertically for readability. The bottom bar presents legal links and
 * copyright information.
 */

interface FooterProps {}

export default function Footer(_: FooterProps) {
  return (
    <footer className="bg-[#0A2463] text-white pt-20 pb-10" aria-label="Footer">
      <div className="max-w-screen-xl mx-auto px-6 grid gap-12 lg:grid-cols-4">
        {/* Company info */}
        <div>
          <h3 className="text-xl font-bold mb-4">GEM Cybersecurity</h3>
          <p className="text-sm text-[#D1D5DB] mb-4">
            Enterprise Threat Detection & 24/7 SOC Monitoring
          </p>
          <address className="not-italic text-sm text-[#D1D5DB] mb-4 leading-relaxed">
            123 Security Boulevard<br />
            Hartford, CT 06103
          </address>
          <p className="text-sm mb-2">
            <a href="tel:+18603054376" className="text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
              (860) 305‑4376
            </a>
          </p>
          <p className="text-sm">
            <a
              href="mailto:info@gemcybersecurityassist.com"
              className="text-[#D1D5DB] hover:text-[#00B2FF] transition-colors"
            >
              info@gemcybersecurityassist.com
            </a>
          </p>
        </div>
        {/* Services links */}
        <div>
          <h4 className="text-base font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                24/7 Threat Monitoring
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Incident Response
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Compliance Management
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Security Assessment
              </a>
            </li>
          </ul>
        </div>
        {/* Company links */}
        <div>
          <h4 className="text-base font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>
        {/* Resources links */}
        <div>
          <h4 className="text-base font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Threat Reports
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Whitepapers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                Security Tools
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Social icons */}
      <div className="max-w-screen-xl mx-auto px-6 mt-12 pt-8 border-t border-white/10">
        <div className="flex justify-between items-center flex-col md:flex-row gap-6">
          <div className="flex space-x-6">
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="text-[#D1D5DB] hover:text-[#00B2FF] transition-colors">
              <Github className="h-6 w-6" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6 text-sm text-[#D1D5DB] gap-2 md:gap-0">
            <span>© 2026 GEM Cybersecurity & Monitoring Assist. All rights reserved.</span>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-[#00B2FF] transition-colors">
                Privacy Policy
              </a>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-[#00B2FF] transition-colors">
                Terms of Service
              </a>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-[#00B2FF] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}