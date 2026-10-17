"use client";

import React from "react";
import Image from "next/image";
import { Layers, ShieldCheck, Handshake } from "lucide-react";

export default function WhyUs() {
  const strengths = [
    {
      icon: ShieldCheck,
      title: "Jistota díky fyzickému prototypu",
      description:
        "U nových dílů nejprve vytiskneme 1–2 zkušební vzorky. Vy si je otestujete přímo ve vašem zařízení a teprve po schválení spouštíme sérii.",
    },
    {
      icon: Layers,
      title: "Návrh pro efektivní sériový tisk (DFAM)",
      description:
        "Díly modelujeme tak, aby se tiskly bez zbytečných podpěr a ručního opracování. Díky tomu držíme příznivou cenu za kus i u desítek či stovek kusů.",
    },
    {
      icon: Handshake,
      title: "Je to o domluvě",
      description:
        "Řešení na míru vyžaduje individuální přístup. Společně probereme namáhání dílu, rozpočet i termín tak, abychom zaručili co nejlepší funkční výsledek.",
    },
  ];

  return (
    <section className="py-14 bg-[#0F1E2E] border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center sm:items-start gap-4 sm:gap-5">
            <Image
              src="/images/logo.png"
              alt="3D Spline Logo"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
            />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Proč si firmy vybírají <span className="underline decoration-blue-500 decoration-2 underline-offset-4">3D Spline</span>
              </h2>
              <p className="mt-1.5 text-slate-300 text-sm sm:text-base">
                Konstruujeme a tiskneme díly, které vydrží i v průmyslovém nasazení.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col">
                <div className="text-blue-400 mb-3">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
