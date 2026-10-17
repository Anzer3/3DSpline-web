"use client";

import React from "react";
import { Cpu, Maximize2, Boxes, Layers, FileText, CheckCircle2 } from "lucide-react";

export default function TechSpecs() {
  const specs = [
    {
      icon: CheckCircle2,
      label: "Zkušební vzorek",
      value: "Fyzický vzorek před sérií",
      sub: "Garance funkčnosti a lícování",
    },
    {
      icon: Maximize2,
      label: "Max. tiskový rozměr",
      value: "250 × 250 × 250 mm",
      sub: "Větší díly spojujeme pomocí konektorů",
    },
    {
      icon: Boxes,
      label: "Materiály skladem",
      value: "PETG, PLA, ASA, TPU",
      sub: "Odolné i flexibilní polymery",
    },
    {
      icon: Cpu,
      label: "Technologie výroby",
      value: "FDM / FFF tisk",
      sub: "Průmyslová přesnost a pevnost",
    },
    {
      icon: Layers,
      label: "Kapacita a série",
      value: "1 ks až stovkové série",
      sub: "Od prototypu po sériovou výrobu",
    },
  ];

  return (
    <section className="bg-slate-900 border-b border-slate-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {specs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">
                    {item.value}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
