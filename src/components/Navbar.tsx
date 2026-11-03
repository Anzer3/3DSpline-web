"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Mail, Clock } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionHash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(sectionHash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/${sectionHash}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F1E2E] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group shrink-0">
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

          {/* Střední navigace: prioritizované odkazy podle šířky obrazovky */}
          <nav className="flex items-center text-xs font-tech text-slate-300">
            {/* Vždy viditelné i na menších obrazovkách (od sm / 640px) */}
            <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-7">
              <a
                href="/#sluzby"
                onClick={(e) => scrollToSection(e, "#sluzby")}
                className="hover:text-white transition-colors"
              >
                Služby
              </a>
              <a
                href="/#jak-to-funguje"
                onClick={(e) => scrollToSection(e, "#jak-to-funguje")}
                className="hover:text-white transition-colors"
              >
                Jak to funguje
              </a>
              <a
                href="/#pribehy-z-dilny"
                onClick={(e) => scrollToSection(e, "#pribehy-z-dilny")}
                className="hover:text-white transition-colors"
              >
                Příběhy z dílny
              </a>
            </div>

            {/* Zobrazí se od tabletů (md / 768px+) */}
            <div className="hidden md:flex items-center ml-6 lg:ml-7 space-x-6 lg:space-x-7">
              <a
                href="/#materialy"
                onClick={(e) => scrollToSection(e, "#materialy")}
                className="hover:text-white transition-colors"
              >
                Materiály
              </a>
            </div>

            {/* Zobrazí se až na plném desktopu (lg / 1024px+) */}
            <div className="hidden lg:flex items-center ml-6 xl:ml-7 space-x-6 xl:space-x-7">
              <a
                href="/#caste-dotazy"
                onClick={(e) => scrollToSection(e, "#caste-dotazy")}
                className="hover:text-white transition-colors"
              >
                Časté dotazy
              </a>
              <a
                href="/#kontakt"
                onClick={(e) => scrollToSection(e, "#kontakt")}
                className="hover:text-white transition-colors"
              >
                Kontakt
              </a>
            </div>
          </nav>

          {/* Pravá strana: CTA tlačítko a Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Tlačítko Poptat tisk - viditelné od sm (640px) */}
            <a
              href="/#poptavka"
              onClick={(e) => scrollToSection(e, "#poptavka")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Poptat tisk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Hamburger tlačítko: viditelné pro mobil i tablet (skryté až na lg, kdy se vejde kompletní menu) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rozbalovací menu (Drawer) - obsahuje zbývající i hlavní položky přehledně seřazené */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0F1E2E] px-4 pt-3 pb-5 space-y-4 font-tech text-xs shadow-2xl">
          <nav className="space-y-1">
            <a
              href="/#sluzby"
              onClick={(e) => scrollToSection(e, "#sluzby")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Služby
            </a>
            <a
              href="/#jak-to-funguje"
              onClick={(e) => scrollToSection(e, "#jak-to-funguje")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Jak to funguje
            </a>
            <a
              href="/#pribehy-z-dilny"
              onClick={(e) => scrollToSection(e, "#pribehy-z-dilny")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Příběhy z dílny
            </a>
            <a
              href="/#materialy"
              onClick={(e) => scrollToSection(e, "#materialy")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Materiály
            </a>
            <a
              href="/#caste-dotazy"
              onClick={(e) => scrollToSection(e, "#caste-dotazy")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Časté dotazy &amp; Limity
            </a>
            <a
              href="/#kontakt"
              onClick={(e) => scrollToSection(e, "#kontakt")}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Kontakt
            </a>
          </nav>

          {/* Rychlý kontakt uvnitř menu */}
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
              <span>Rychlé technické posouzení</span>
            </div>
          </div>

          {/* CTA v mobilním menu (pro nejmenší displeje pod sm) */}
          <div className="pt-1 sm:hidden">
            <a
              href="/#poptavka"
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
