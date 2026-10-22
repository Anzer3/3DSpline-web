"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PrototypeBeforeSeries() {
  const handleInquiry = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-inquiry-tab", {
          detail: { tab: "model", prototypePackage: true },
        })
      );
      const formEl = document.querySelector("#poptavka");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="prototyp-balicek" className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Explanatory Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Zkušební prototyp bez rizika
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Nemusíte hned platit kompletní sériovou výrobu. Nabízíme vám <strong>prototypovací balíček</strong> – vyrobíme vám funkční vzorek k fyzickému vyzkoušení a teprve po jeho schválení se domluvíme na hlavní výrobě.
              </p>
            </div>

            {/* 2 Clean Variants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Varianta A
                </div>
                <div className="font-bold text-slate-900 text-sm mt-0.5 mb-1">
                  Modelování + tisk prototypu
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vytvoříme 3D model, vytiskneme a pošleme vám vzorek k vyzkoušení.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Varianta B
                </div>
                <div className="font-bold text-slate-900 text-sm mt-0.5 mb-1">
                  Jen tisk prototypu
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Zkontrolujeme váš 3D model, vytiskneme 1 kus na ověření a odešleme.
                </p>
              </div>
            </div>

            {/* 3 Short Bullet Points */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Žádné riziko:</strong> Platíte pouze prototypování. Hlavní výrobu hradíte až po schválení.</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Fyzicky ověříte:</strong> Nejste závislí na fotkách – design, tolerance i funkčnost vyzkoušíte naživo.</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Nulové dopravní náklady:</strong> Vzorek odešleme zdarma.</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleInquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
              >
                <span>Poptat zkušební prototyp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase ("Jak to může vypadat") */}
          <div className="lg:col-span-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Ukázka: Jak to může vypadat
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1: Prototyp */}
              <div className="group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-200">
                  <Image
                    src="/portfolio/prottyp.jpg"
                    alt="Zkušební prototyp"
                    width={400}
                    height={400}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 280px"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                    Testovací prototyp
                  </span>
                </div>
              </div>

              {/* Photo 2: Sériovka */}
              <div className="group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-200">
                  <Image
                    src="/portfolio/seriovka.jpg"
                    alt="Finální sériová výroba"
                    width={400}
                    height={400}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 280px"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                    Výsledná série
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
