"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HasModelSection() {
  const seriesItems = [
    {
      src: "/portfolio/vice_barev.jpg",
      title: "Vícebarevné modely",
      caption: "Barevný FDM tisk v sérii",
    },
    {
      src: "/portfolio/vanocni_banky.png",
      title: "Personalizované dárky",
      caption: "Zakázkové série s vlastním textem",
    },
    {
      src: "/portfolio/karlov-liska.png",
      title: "Upomínkové předměty",
      caption: "Na míru pro vaše akce",
    },
    {
      src: "/portfolio/poklicky.jpg",
      title: "Technické a náhradní díly",
      caption: "Kopírování a replikace opotřebovaných nebo chybějících dílů",
    },
  ];

  const handleInquiry = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-inquiry-tab", { detail: { tab: "model" } })
      );
      const formEl = document.querySelector("#poptavka");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-16 bg-[#0F1E2E] border-b border-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            <span className="block text-blue-400 font-semibold">Máte 3D model?</span>
            <span className="block text-white mt-1">Vytiskneme sérii přesně podle vašich potřeb</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Máte hotový soubor ve formátu STEP, STL nebo 3MF? Postaráme se o spolehlivou kusovou i sériovou výrobu. Zkontrolujeme geometrii, nastavíme optimální parametry tisku a dodáme díly v požadované kvalitě i množství.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs font-semibold text-slate-300">Podporované formáty:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold">.STEP</span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold">.STL</span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold">.3MF</span>
          </div>
        </div>

        {/* Gallery Grid: 2 columns on mobile for compact viewing, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {seriesItems.map((item, idx) => {
            return (
              <div
                key={idx}
                className="group flex flex-col transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center mb-2.5 bg-[#152536]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">
                    {item.caption}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 bg-[#152536] rounded-xl border border-slate-700/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-white text-sm sm:text-base">
              Máte připravený 3D soubor (.STEP, .STL nebo .3MF)?
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Nahrajte ho do formuláře. Ozveme se vám zpět s posouzením modelu a možnostmi výroby.
            </div>
          </div>

          <button
            type="button"
            onClick={handleInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-md"
          >
            <span>Nahrát model a poptat tisk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
