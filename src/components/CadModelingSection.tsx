"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CadModelingSection() {
  const models = [
    {
      src: "/portfolio/cuplik.png",
      title: "Jednoduchý funkční díl",
      caption: "Čep pro zatavení",
    },
    {
      src: "/portfolio/podstavec.png",
      title: "Rotační pouzdro",
      caption: "Kruhová základna s otvory",
    },
    {
      src: "/portfolio/stojan.png",
      title: "Ergonomický klín",
      caption: "Stojan s vodicí drážkou",
    },
    {
      src: "/portfolio/drzak.png",
      title: "Mechanický úchyt",
      caption: "Profilový držák s vyztužením",
    },
    {
      src: "/portfolio/pohar.png",
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
    <section className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
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
        </div>

        {/* Progression Indicator Bar - Desktop/Tablet Horizontal View */}
        <div className="hidden sm:block relative mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 px-1 pb-3">
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              Od nejjednodušších dílů
            </span>
            <span className="flex items-center gap-1.5 text-slate-900">
              až po různě vypadající tvary
            </span>
          </div>
          {/* Subtle horizontal gradient line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600 rounded-full" />
        </div>

        {/* Gallery - Mobile with continuous vertical progression line on the left, standard grid on sm+ */}
        <div className="sm:hidden relative pl-7">
          {/* Continuous vertical gradient line spanning precisely between top dot center and bottom dot center */}
          <div className="absolute left-[7px] top-2.5 bottom-2 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-600 via-sky-400 to-indigo-600 rounded-full" />

          {/* Top start label above cards */}
          <div className="relative flex items-center mb-4">
            <span className="absolute left-[-21px] -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-xs z-10 shrink-0" />
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              Od nejjednodušších dílů
            </div>
          </div>

          {/* Vertical list of model cards on mobile */}
          <div className="space-y-3.5">
            {models.map((item, idx) => {
              return (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-2.5 flex items-center gap-3.5">
                    {/* Image - completely clean without gray background or extra border */}
                    <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center shrink-0">
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={120}
                        height={120}
                        sizes="64px"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Content - exactly matching desktop styling */}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.caption}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom end label below the 5th card */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-[-21px] -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-xs z-10 shrink-0" />
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
              až po různě vypadající tvary
            </div>
          </div>
        </div>

        {/* Gallery Grid - Desktop & Tablet (sm+) */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {models.map((item, idx) => {
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={280}
                    height={280}
                    sizes="(max-width: 1023px) 30vw, 220px"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.caption}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900 text-sm sm:text-base">
              Máte v ruce díl, který potřebujete vyrobit nebo překreslit?
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Pošlete nám fotku nebo nákres s kótami. ZDARMA posoudíme vyrobitelnost a navrhneme postup.
            </div>
          </div>

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
    </section>
  );
}
