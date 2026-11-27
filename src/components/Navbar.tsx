"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Mail, Clock } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F1E2E] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <Image
                src="/images/logo.png"
                alt="3D Spline"
                width={32}
                height={32}
                sizes="32px"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
              3D Spline
            </span>
          </Link>

          {/* Navigace ukotvená za logem (mr-auto) se stabilními rozestupy, aby odkazy při změně šířky neskákaly */}
          <nav className="hidden sm:flex items-center gap-6 xl:gap-8 ml-8 lg:ml-12 mr-auto text-sm font-medium text-slate-300 whitespace-nowrap">
            <Link
              href="/#sluzby"
              onClick={closeMenu}
              className="hover:text-white transition-colors py-1"
            >
              Služby
            </Link>
            <Link
              href="/#jak-to-funguje"
              onClick={closeMenu}
              className="hover:text-white transition-colors py-1"
            >
              Jak to funguje
            </Link>
            <Link
              href="/#pribehy-z-dilny"
              onClick={closeMenu}
              className="hidden md:inline-block hover:text-white transition-colors py-1"
            >
              Příběhy z dílny
            </Link>
            <Link
              href="/#materialy"
              onClick={closeMenu}
              className="hidden min-[900px]:inline-block hover:text-white transition-colors py-1"
            >
              Materiály
            </Link>
            <Link
              href="/#caste-dotazy"
              onClick={closeMenu}
              className="hidden lg:inline-block hover:text-white transition-colors py-1"
            >
              Časté dotazy
            </Link>
            <Link
              href="/#kontakt"
              onClick={closeMenu}
              className="hidden min-[1120px]:inline-block hover:text-white transition-colors py-1"
            >
              Kontakt
            </Link>
          </nav>

          {/* Pravá strana: CTA tlačítko a Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 ml-auto sm:ml-4 shrink-0">
            {/* Tlačítko Poptat tisk - viditelné od sm (640px) */}
            <Link
              href="/#poptavka"
              onClick={closeMenu}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Poptat tisk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger tlačítko: viditelné dokud nejsou v liště zobrazené úplně všechny odkazy (do 1120px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[1120px]:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rozbalovací menu (Drawer) */}
      {mobileMenuOpen && (
        <div className="min-[1120px]:hidden border-b border-slate-800 bg-[#0F1E2E] px-4 pt-3 pb-5 space-y-4 font-tech text-xs shadow-2xl">
          <nav className="space-y-1">
            <Link
              href="/#sluzby"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Služby
            </Link>
            <Link
              href="/#jak-to-funguje"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Jak to funguje
            </Link>
            <Link
              href="/#pribehy-z-dilny"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Příběhy z dílny
            </Link>
            <Link
              href="/#materialy"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Materiály
            </Link>
            <Link
              href="/#caste-dotazy"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Časté dotazy
            </Link>
            <Link
              href="/#kontakt"
              onClick={closeMenu}
              className="block py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors text-sm font-medium"
            >
              Kontakt
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <Link
              href="/#poptavka"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Poptat tisk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-400">
              <a
                href="mailto:info@3dspline.cz"
                className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>info@3dspline.cz</span>
              </a>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Odpověď do 24 h</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
