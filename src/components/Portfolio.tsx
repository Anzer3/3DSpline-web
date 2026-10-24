"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export interface CaseStudy {
  id: number;
  title: string;
  tag: string;
  image: string;
  href: string;
}

// Data případových studií z reálné praxe
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Madla na pokličky",
    tag: "Náhradní díly",
    image: "/portfolio/poklicky.jpg",
    href: "/pripadove-studie/madla-na-poklicky",
  },
  {
    id: 2,
    title: "Model formule (vícebarevný tisk)",
    tag: "Barevný 3D tisk",
    image: "/portfolio/vice_barev.jpg",
    href: "/pripadove-studie/model-formule",
  },
  {
    id: 3,
    title: "Knoflíky pro staré rádio",
    tag: "Reverzní inženýrství",
    image: "/images/pripadove%20studie/radio%20knofliky/knofliky_nove_vs_stare.jpg",
    href: "/pripadove-studie/knofliky-pro-stare-radio",
  },
];

export default function Portfolio() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pripadove-studie" className="py-16 bg-white border-b border-slate-200 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Z naší dílny
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Ukázky reálných zakázek
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Příklady toho, co v praxi vyrábíme – od náhrady nedostupných součástek přes vícebarevné modely až po reverzní inženýrství.
          </p>
        </div>

        {/* 3 Full-bleed Cards (stejný čistý vizuální styl jako dlaždice služeb) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={study.href}
              className="group relative rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Celoplošný obrázek */}
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Horní ikona se šipkou */}
              <div className="relative z-10 flex justify-end p-4 sm:p-5">
                <span className="p-1.5 rounded-full bg-slate-900/50 backdrop-blur-md text-white border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Spodní jemné tmavé podbarvení pouze pro název a odkaz */}
              <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-slate-950/85 via-slate-950/60 to-transparent pt-12">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {study.title}
                </h3>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-1.5">
                  Celý příběh
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Spodní výzva k poptávce */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
            Máte podobný díl k výrobě nebo potřebujete posoudit technickou vyrobitelnost?
          </p>
          <a
            href="#poptavka"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#poptavka");
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm shrink-0"
          >
            <span>Nezávazně poptat výrobu</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
