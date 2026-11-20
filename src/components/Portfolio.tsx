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

// Data příběhů z dílny z reálné praxe
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Madla na pokličky",
    tag: "Náhradní díly",
    image: "/images/pribehy-z-dilny/poklicky/uvodni_fotka_clanku.jpg",
    href: "/pribehy-z-dilny/madla-na-poklicky",
  },
  {
    id: 2,
    title: "Série 50 formulí",
    tag: "Sériový tisk",
    image: "/images/pribehy-z-dilny/formule/formule.jpg",
    href: "/pribehy-z-dilny/model-formule",
  },
  {
    id: 3,
    title: "Knoflíky pro staré rádio",
    tag: "Reverzní inženýrství",
    image: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nabarvene.jpg",
    href: "/pribehy-z-dilny/knofliky-pro-stare-radio",
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
    <section id="pribehy-z-dilny" className="py-16 bg-white border-b border-slate-200 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Příběhy z dílny
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ukázky reálných zakázek
          </p>
        </div>

        {/* 3 Full-bleed Cards (stejný čistý vizuální styl jako dlaždice služeb) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={study.href}
              className="group relative rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-end min-h-[300px] sm:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Celoplošný obrázek */}
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

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

      </div>
    </section>
  );
}
