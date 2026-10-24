"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function CadModelingSection() {
  const models = [
    {
      src: "/images/nemate model obrazky/cuplik.png",
      title: "Jednoduchý funkční díl",
      caption: "Čep pro zatavení",
    },
    {
      src: "/images/nemate model obrazky/podstavec.png",
      title: "Rotační pouzdro",
      caption: "Kruhová základna s otvory",
    },
    {
      src: "/images/nemate model obrazky/stojan.png",
      title: "Ergonomický klín",
      caption: "Stojan s vodicí drážkou",
    },
    {
      src: "/images/nemate model obrazky/drzak.png",
      title: "Mechanický úchyt",
      caption: "Profilový držák s vyztužením",
    },
    {
      src: "/images/nemate model obrazky/pohar.png",
      title: "Atypická organická geometrie",
      caption: "Spirálovitý pohár",
    },
  ];

  const handleInquiry = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-inquiry-tab", { detail: { tab: "drawing" } })
      );
      const formEl = document.querySelector("#poptavka");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="sluzby" className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            <span className="block text-slate-500 font-medium">Nemáte 3D model?</span>
            <span className="block text-slate-900 mt-1">Navrhneme ho podle vašich představ</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Nemáte 3D soubor? Nevadí. Stačí nám poslat poškozenou součástku, technický výkres nebo i jednoduchý náčrt tužkou s rozměry. Navrhneme přesnou CAD geometrii s ohledem na mechanickou pevnost i snadnou výrobu.
          </p>
          <div className="mt-3">
            <Link
              href="/cad-modelovani-na-miru"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Více podrobností o službě 3D modelování na míru</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Timeline Progression Showcase - Desktop & Tablet (sm+) */}
        <div className="hidden sm:block relative mb-8">
          {/* Top labels */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 px-1 pb-3">
            <span className="text-blue-700">
              Od nejjednodušších dílů
            </span>
            <span className="text-slate-900">
              až po atypické tvary
            </span>
          </div>

          {/* Clean gradient timeline bar without dots */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600 rounded-full mb-4" />

          {/* 5 Models arranged directly under the timeline bar */}
          <div className="grid grid-cols-5 gap-4">
            {models.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={220}
                    height={220}
                    sizes="200px"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Progression Showcase - Mobile (vertical) */}
        <div className="sm:hidden relative pl-6 py-2">
          {/* Continuous vertical gradient line connecting without dots */}
          <div className="absolute left-[7px] top-3 bottom-3 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-600 via-sky-400 to-indigo-600 rounded-full" />

          {/* Top start label */}
          <div className="relative mb-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              Od nejjednodušších dílů
            </div>
          </div>

          {/* Vertical models along the line */}
          <div className="space-y-3">
            {models.map((item, idx) => (
              <div key={idx} className="relative flex items-center py-0.5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom end label */}
          <div className="relative mt-3">
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
              až po atypické tvary
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900 text-sm sm:text-base">
              Nemáte 3D model? Žádný problém.
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Pošlete nám fotku reálného kusu nebo náčrtek s rozměry. Navrhneme řešení na míru i optimální postup výroby.
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
            <Link
              href="/cad-modelovani-na-miru"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Více o modelování</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </Link>

            <button
              type="button"
              onClick={handleInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-sm"
            >
              <span>Poptat vymodelování dílu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
