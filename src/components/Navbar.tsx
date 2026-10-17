"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F1E2E] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <Image
                src="/images/logo.png"
                alt="3D Spline"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              3D Spline
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-tech text-slate-300">
            <a
              href="#jak-to-funguje"
              onClick={(e) => scrollToSection(e, "#jak-to-funguje")}
              className="hover:text-white transition-colors"
            >
              Jak to funguje
            </a>
            <a
              href="#materialy"
              onClick={(e) => scrollToSection(e, "#materialy")}
              className="hover:text-white transition-colors"
            >
              Materiály
            </a>
            <a
              href="#kontakt"
              onClick={(e) => scrollToSection(e, "#kontakt")}
              className="hover:text-white transition-colors"
            >
              Kontakt
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="#poptavka"
              onClick={(e) => scrollToSection(e, "#poptavka")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Poptat tisk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0F1E2E] px-4 py-4 space-y-3 font-tech text-xs">
          <a
            href="#jak-to-funguje"
            onClick={(e) => scrollToSection(e, "#jak-to-funguje")}
            className="block py-1.5 text-slate-300 hover:text-white"
          >
            Jak to funguje
          </a>
          <a
            href="#materialy"
            onClick={(e) => scrollToSection(e, "#materialy")}
            className="block py-1.5 text-slate-300 hover:text-white"
          >
            Materiály
          </a>
          <a
            href="#kontakt"
            onClick={(e) => scrollToSection(e, "#kontakt")}
            className="block py-1.5 text-slate-300 hover:text-white"
          >
            Kontakt
          </a>
          <div className="pt-2">
            <a
              href="#poptavka"
              onClick={(e) => scrollToSection(e, "#poptavka")}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider"
            >
              <span>Poptat tisk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
