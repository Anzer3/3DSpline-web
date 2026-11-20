"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-white border-b border-slate-200 py-6 sm:py-10 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_40%] sm:grid-cols-[1fr_240px] md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] items-stretch gap-x-3 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
          {/* Levá část (Řádek 1): Nadpis, podnadpis a 3 klíčové body až po 'Doručení po celé ČR' */}
          <div className="col-start-1 row-start-1 min-w-0 flex flex-col justify-between py-0.5 relative z-10">
            <div className="space-y-2 sm:space-y-3.5 lg:space-y-5">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.18]">
                3D tisk a modelování na míru
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                Zakázková výroba pro firmy i jednotlivce. Od náhrady poškozeného kusu po stovkové série podle vašich potřeb.
              </p>
            </div>

            {/* 3 klíčové body sahající přesně po spodní úroveň obrázku */}
            <div className="space-y-2 sm:space-y-2.5 pt-3 sm:pt-5 lg:pt-6">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>CAD konstrukce:</strong> optimalizace tvaru pro maximální pevnost dílu
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Zkušební vzorek:</strong> otestování funkčnosti před spuštěním série
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Doručení po celé ČR</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Pravá část: Velký obrázek striktně oříznutý do svého sloupce (overflow-hidden), takže nikdy nepřekryje text */}
          <div className="col-start-2 row-start-1 lg:row-span-2 relative self-stretch overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src="/portfolio/pohar.png"
                alt="CAD modelování komplexních dílů - 3D Spline"
                width={638}
                height={619}
                className="w-[180%] sm:w-[155%] lg:w-[130%] max-w-none h-full object-contain mix-blend-multiply scale-[1.06]"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Spodní blok (Řádek 2): CTA tlačítko */}
          <div className="col-span-2 lg:col-span-1 col-start-1 row-start-2 pt-5 sm:pt-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#poptavka"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#poptavka");
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm active:scale-[0.99] w-full sm:w-auto text-center"
              >
                <span>Nezávazně poptat výrobu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
