"use client";

import React from "react";

export default function Materials() {
  return (
    <section id="materialy" className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-xl">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-1">
              Používané materiály
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Převážně tiskneme z <strong>PETG</strong> a <strong>PLA</strong>. Podle vašich požadavků zajistíme i další materiály, například <strong>ASA</strong> atd.
            </p>
          </div>

          {/* Right: 2 Compact Spool Badges with Upright 3D Spools */}
          <div className="flex items-center gap-6 shrink-0">
            {/* PETG */}
            <div className="flex items-center gap-3 text-left">
              {/* Hand-drawn 3D Spool Standing Upright (Graphite) */}
              <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-10 h-10" fill="none">
                  {/* Back circular flange edge */}
                  <ellipse cx="22" cy="18" rx="6.5" ry="14" stroke="#0F1E2E" strokeWidth="1.8" />
                  
                  {/* Wound Filament Drum (Standing upright) */}
                  <path d="M14 6h6c3.5 0 6.5 5.4 6.5 12s-3 12-6.5 12h-6c-3.5 0-6.5-5.4-6.5-12S10.5 6 14 6z" fill="#334155" />
                  {/* Filament coils lines */}
                  <path d="M16 6.5c3 0 5 5 5 11.5s-2 11.5-5 11.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M19 7c3 0 5 5 5 11s-2 11-5 11" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                  
                  {/* Front circular flange */}
                  <ellipse cx="14" cy="18" rx="6.5" ry="14" stroke="#0F1E2E" strokeWidth="2" fill="#F8FAFC" />
                  {/* Center core hole of spool */}
                  <ellipse cx="14" cy="18" rx="2.5" ry="5.5" stroke="#0F1E2E" strokeWidth="1.8" fill="#0F1E2E" />
                  {/* Spool window cutout for viewing filament amount */}
                  <path d="M13 8.5c1.8 0 3 1.5 3 3.5s-1.2 3.5-3 3.5" stroke="#0F1E2E" strokeWidth="1.4" strokeLinecap="round" />
                  
                  {/* Loose filament thread peeling off the spool */}
                  <path d="M24 8c2-2 5-2 7 0" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 leading-none">
                  PETG
                </div>
              </div>
            </div>

            {/* PLA */}
            <div className="flex items-center gap-3 text-left">
              {/* Hand-drawn 3D Spool Standing Upright (Blue) */}
              <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-10 h-10" fill="none">
                  {/* Back circular flange edge */}
                  <ellipse cx="22" cy="18" rx="6.5" ry="14" stroke="#0F1E2E" strokeWidth="1.8" />
                  
                  {/* Wound Filament Drum (Standing upright) */}
                  <path d="M14 6h6c3.5 0 6.5 5.4 6.5 12s-3 12-6.5 12h-6c-3.5 0-6.5-5.4-6.5-12S10.5 6 14 6z" fill="#2563EB" />
                  {/* Filament coils lines */}
                  <path d="M16 6.5c3 0 5 5 5 11.5s-2 11.5-5 11.5" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M19 7c3 0 5 5 5 11s-2 11-5 11" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
                  
                  {/* Front circular flange */}
                  <ellipse cx="14" cy="18" rx="6.5" ry="14" stroke="#0F1E2E" strokeWidth="2" fill="#F8FAFC" />
                  {/* Center core hole of spool */}
                  <ellipse cx="14" cy="18" rx="2.5" ry="5.5" stroke="#0F1E2E" strokeWidth="1.8" fill="#0F1E2E" />
                  {/* Spool window cutout for viewing filament amount */}
                  <path d="M13 8.5c1.8 0 3 1.5 3 3.5s-1.2 3.5-3 3.5" stroke="#0F1E2E" strokeWidth="1.4" strokeLinecap="round" />
                  
                  {/* Loose filament thread peeling off the spool */}
                  <path d="M24 8c2-2 5-2 7 0" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 leading-none">
                  PLA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
