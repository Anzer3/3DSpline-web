"use client";

import React from "react";
import { FileCode2, DraftingCompass, ArrowRight, Check } from "lucide-react";

export default function CustomerPaths() {
  const handleSelectTab = (tab: "model" | "drawing") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("select-inquiry-tab", { detail: { tab } }));
      const formEl = document.querySelector("#poptavka");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Jaké máte k dispozici podklady?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Option 1: Máte hotový 3D model */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Máte hotový 3D model (.STEP, .STL, .3MF)
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Rychlá zakázková výroba od 1 kusu po opakované série
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Maximální pevnost dílu:</strong> na základě způsobu namáhání zvolíme správnou orientaci vrstev, hustotu výplně a počet perimetrů, aby byl díl co nejpevnější.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Možnost zkušebního vzorku:</strong> před spuštěním celé série vám rádi nejprve zašleme 1 zkušební kus k fyzickému odzkoušení ve vašem provozu.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Optimalizace pro nízkou cenu:</strong> tisková nastavení ladíme přesně na míru vašim požadavkům – u větších sérií tak dosahujeme výrazně nižší ceny za kus.
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectTab("model")}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors"
            >
              <span>Mám model – chci nacenit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Option 2: Máte jen výkres, náčrt nebo poškozený díl */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Máte jen výkres, náčrt nebo rozbitý díl
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Reverzní inženýrství a zakázkový CAD vývoj
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Vymodelování od nuly:</strong> připravíme přesný CAD model podle vašeho náčrtu, výkresu nebo poškozeného kusu.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Zesílení kritických míst:</strong> namáhané části zpevníme a navrhneme geometrii tak, aby byla odolnější než původní díl.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    <strong>Doladění prototypu před sérií:</strong> vždy nejprve vyrobíme zkušební vzorek k ověření rozměrů a lícování přímo ve vašem zařízení.
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectTab("drawing")}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-colors"
            >
              <span>Nemám model – chci navrhnout díl</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
