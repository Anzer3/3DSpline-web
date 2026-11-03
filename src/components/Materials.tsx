"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Materials() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="materialy" className="py-8 bg-[#0F1E2E] border-b border-slate-800 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-xl">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
              Používané materiály
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Převážně tiskneme z <strong className="text-white">PETG</strong> a <strong className="text-white">PLA</strong>. Podle vašich požadavků zajistíme i <strong className="text-white">ASA</strong> (automotive / exteriér) či flexibilní <strong className="text-white">TPU</strong>.
            </p>

            <button
              type="button"
              aria-expanded={showDetails}
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            >
              <span>{showDetails ? "Skrýt technické parametry" : "Technické parametry a teplotní limity"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showDetails ? "rotate-180 text-blue-400" : ""
                }`}
              />
            </button>
          </div>

          {/* Right: 3 Compact Spool Badges */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-7 shrink-0">
            {/* PETG */}
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                  <ellipse cx="22" cy="18" rx="6.5" ry="14" stroke="#334155" strokeWidth="1.8" />
                  <path d="M14 6h6c3.5 0 6.5 5.4 6.5 12s-3 12-6.5 12h-6c-3.5 0-6.5-5.4-6.5-12S10.5 6 14 6z" fill="#475569" />
                  <path d="M16 6.5c3 0 5 5 5 11.5s-2 11.5-5 11.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M19 7c3 0 5 5 5 11s-2 11-5 11" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
                  <ellipse cx="14" cy="18" rx="6.5" ry="14" stroke="#334155" strokeWidth="2" fill="#1E293B" />
                  <ellipse cx="14" cy="18" rx="2.5" ry="5.5" stroke="#334155" strokeWidth="1.8" fill="#0F172A" />
                </svg>
              </div>
              <div className="text-sm font-bold text-white leading-none">
                PETG
              </div>
            </div>

            {/* PLA */}
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                  <ellipse cx="22" cy="18" rx="6.5" ry="14" stroke="#1D4ED8" strokeWidth="1.8" />
                  <path d="M14 6h6c3.5 0 6.5 5.4 6.5 12s-3 12-6.5 12h-6c-3.5 0-6.5-5.4-6.5-12S10.5 6 14 6z" fill="#2563EB" />
                  <path d="M16 6.5c3 0 5 5 5 11.5s-2 11.5-5 11.5" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M19 7c3 0 5 5 5 11s-2 11-5 11" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
                  <ellipse cx="14" cy="18" rx="6.5" ry="14" stroke="#1D4ED8" strokeWidth="2" fill="#1E293B" />
                  <ellipse cx="14" cy="18" rx="2.5" ry="5.5" stroke="#1D4ED8" strokeWidth="1.8" fill="#0F172A" />
                </svg>
              </div>
              <div className="text-sm font-bold text-white leading-none">
                PLA
              </div>
            </div>

            {/* ASA */}
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                  <ellipse cx="22" cy="18" rx="6.5" ry="14" stroke="#B45309" strokeWidth="1.8" />
                  <path d="M14 6h6c3.5 0 6.5 5.4 6.5 12s-3 12-6.5 12h-6c-3.5 0-6.5-5.4-6.5-12S10.5 6 14 6z" fill="#D97706" />
                  <path d="M16 6.5c3 0 5 5 5 11.5s-2 11.5-5 11.5" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M19 7c3 0 5 5 5 11s-2 11-5 11" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
                  <ellipse cx="14" cy="18" rx="6.5" ry="14" stroke="#B45309" strokeWidth="2" fill="#1E293B" />
                  <ellipse cx="14" cy="18" rx="2.5" ry="5.5" stroke="#B45309" strokeWidth="1.8" fill="#0F172A" />
                </svg>
              </div>
              <div className="text-sm font-bold text-white leading-none">
                ASA
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible details panel (kept in SSR DOM for SEO & crawlers) */}
        <div
          className={`grid transition-all duration-200 ease-in-out ${
            showDetails
              ? "grid-rows-[1fr] opacity-100 mt-6 pt-5 border-t border-slate-800"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center justify-between mb-1.5">
                  <strong className="text-white font-semibold">PETG</strong>
                  <span className="text-[11px] text-blue-400 font-mono">do 75–80 °C</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Houževnatý materiál s chemickou a rázovou odolností. Vhodný pro funkční držáky, adaptéry a krytky.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center justify-between mb-1.5">
                  <strong className="text-white font-semibold">PLA</strong>
                  <span className="text-[11px] text-blue-400 font-mono">do 50–55 °C</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Tuhý materiál s vysokým detailem pro prototypy a interiérové krabičky. Není vhodný do rozpáleného auta.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center justify-between mb-1.5">
                  <strong className="text-white font-semibold">ASA</strong>
                  <span className="text-[11px] text-amber-400 font-mono">do 95 °C</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Vysoká odolnost vůči UV záření a teplotám. Určeno pro venkovní použití a díly do automobilů.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
