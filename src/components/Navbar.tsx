"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight, Mail, Clock } from "lucide-react";

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
                sizes="32px"
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
              href="#caste-dotazy"
              onClick={(e) => scrollToSection(e, "#caste-dotazy")}
              className="hover:text-white transition-colors"
            >
              Časté dotazy
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
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0F1E2E] px-4 pt-3 pb-5 space-y-4 font-tech text-xs shadow-2xl">
          <nav className="space-y-1">
            <a
              href="#jak-to-funguje"
              onClick={(e) => scrollToSection(e, "#jak-to-funguje")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Jak to funguje
            </a>
            <a
              href="#materialy"
              onClick={(e) => scrollToSection(e, "#materialy")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Materiály
            </a>
            <a
              href="#caste-dotazy"
              onClick={(e) => scrollToSection(e, "#caste-dotazy")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Časté dotazy &amp; Limity
            </a>
            <a
              href="#kontakt"
              onClick={(e) => scrollToSection(e, "#kontakt")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Kontakt
            </a>
          </nav>

          {/* Direct Contact Bar inside Drawer */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2 text-slate-400 text-xs">
            <a
              href="mailto:info@3dspline.cz"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-sans">info@3dspline.cz</span>
            </a>
            <div className="flex items-center gap-2 px-2 text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Odpovídáme obvykle do 24 hodin</span>
            </div>
          </div>

          <div className="pt-1">
            <a
              href="#poptavka"
              onClick={(e) => scrollToSection(e, "#poptavka")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider shadow-md active:scale-[0.99]"
            >
              <span>Nezávazně poptat výrobu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
