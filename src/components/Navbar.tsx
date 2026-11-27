"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { company } from "@/lib/company";

const links = [
  { href: "/#sluzby", label: "Služby" },
  { href: "/#jak-to-funguje", label: "Jak to funguje" },
  { href: "/#pribehy-z-dilny", label: "Příběhy z dílny" },
  { href: "/#caste-dotazy", label: "Časté dotazy" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F1E2E] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/images/logo.png"
              alt="3D Spline"
              width={32}
              height={32}
              sizes="32px"
              className="w-8 h-8 object-contain"
              loading="eager"
            />
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
              3D Spline
            </span>
          </Link>

          {/* Navigace (od lg) */}
          <nav className="hidden lg:flex items-center gap-8 ml-12 mr-auto text-sm font-medium text-slate-300 whitespace-nowrap">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Pravá strana: tlačítko a hamburger */}
          <div className="flex items-center gap-3 ml-auto shrink-0">
            <Link
              href="/#poptavka"
              onClick={closeMenu}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <span>Poptat výrobu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rozbalovací menu (pod lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0F1E2E]">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 divide-y divide-slate-800">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-3.5 text-base font-medium text-slate-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6 border-t border-slate-800">
            <Link
              href="/#poptavka"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
            >
              <span>Poptat výrobu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                {company.email}
              </a>
              <span>Ve všední dny odpověď do 24 h</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
