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
    <section className="relative bg-white border-b border-slate-200 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 sm:gap-y-6 lg:gap-x-12 items-center">
          {/* Left Top: Heading & Intro */}
          <div className="lg:col-span-7 lg:col-start-1 space-y-5 sm:space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
              3D tisk a modelování na míru
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
              Zakázková výroba pro firmy i jednotlivce. Od náhrady poškozeného kusu po stovkové série podle vašich potřeb.
            </p>
          </div>

          {/* Single Hero Image: placed right after intro on mobile, and in right column on desktop */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 w-full flex justify-center py-2 lg:py-0">
            <div className="relative w-full max-w-[260px] lg:max-w-none aspect-square lg:max-h-[440px] mx-auto flex items-center justify-center lg:p-2">
              <Image
                src="/portfolio/pohar.png"
                alt="CAD modelování komplexních dílů - 3D Spline"
                width={600}
                height={600}
                sizes="(max-width: 1023px) 260px, 440px"
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Left Bottom: 3 Core Points & CTA */}
          <div className="lg:col-span-7 lg:col-start-1 space-y-5 sm:space-y-6">
            {/* 3 Core Points - concise */}
            <div className="space-y-2 sm:space-y-2.5 pt-0.5 sm:pt-1">
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>CAD konstrukce:</strong> optimalizace tvaru pro maximální pevnost dílu
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Zkušební vzorek:</strong> otestování funkčnosti před spuštěním série
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-slate-700 text-xs sm:text-sm">
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
                <span>
                  <strong>Doručení po celé ČR</strong>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#poptavka"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#poptavka");
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
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
