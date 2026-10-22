"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="kontakt" className="bg-[#0F1E2E] text-slate-400 border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="3D Spline"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                3D Spline
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Zakázkový 3D tisk a CAD konstrukce funkčních plastových dílů pro strojírenství, servisní údržbu a kusový i malosériový vývoj produktů.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.instagram.com/3dspline.cz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram 3dspline.cz"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@3dspline.cz"
                className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech">
              Navigace
            </h4>
            <ul className="space-y-1.5 text-xs font-tech text-slate-400">
              <li>
                <a href="#jak-to-funguje" className="hover:text-white transition-colors">
                  Průběh spolupráce
                </a>
              </li>
              <li>
                <a href="#prototyp-balicek" className="hover:text-white transition-colors">
                  Zkušební prototyp
                </a>
              </li>
              <li>
                <a href="#materialy" className="hover:text-white transition-colors">
                  Materiály (PETG, PLA, ASA)
                </a>
              </li>
              <li>
                <a href="#caste-dotazy" className="hover:text-white transition-colors">
                  Časté dotazy &amp; Limity
                </a>
              </li>
              <li>
                <a href="#poptavka" className="hover:text-white transition-colors">
                  Poptávka výroby
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Operator Details */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech">
              Provozovatel &amp; Fakturace
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300 font-tech">
              <div className="text-white font-semibold">
                3D Spline
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Sídlo: Olomouc • Doručení po celé ČR</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:info@3dspline.cz" className="hover:text-white transition-colors">
                  info@3dspline.cz
                </a>
              </div>
              <div className="pt-1 text-slate-400 text-[11px]">
                <span>IČO: v procesu zápisu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} 3D Spline • Všechna práva vyhrazena
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="/ochrana-osobnich-udaju"
              className="text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Ochrana osobních údajů (GDPR)
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="/obchodni-podminky"
              className="text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Obchodní podmínky
            </a>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Nahoru</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
