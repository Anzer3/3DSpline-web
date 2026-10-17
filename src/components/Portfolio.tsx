"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Instagram } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  tag: string;
  problem: string;
  solution: string;
  delivery: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Výrobní přípravek a držák senzoru",
    tag: "30 ks • Konstrukční PETG",
    problem:
      "Potřeba rychlého osazení linky atypickými držáky bez dlouhého čekání na kovovýrobu a frézování duralu.",
    solution:
      "Návrh geometrie pro tisk zcela bez podpěr a integrace přesných kapes pro šestihranné matice M4 pro montáž na hliníkový profil.",
    delivery: "Vzorek do 24 h, série do 3 dnů.",
    image: "/images/project-1.jpg",
  },
  {
    id: 2,
    title: "Náhrada prasklého dílu (Reverzní inženýrství)",
    tag: "5 ks • Zesílené PETG",
    problem:
      "Ulomený plastový díl z odstaveného stroje, originální náhradní díl nedostupný nebo s dodací lhůtou několika týdnů.",
    solution:
      "Odměření rozbitého kusu posuvným měřidlem, vymodelování v CADu, zesílení namáhané stěny a ověření rozměrů na zkušebním výtisku.",
    delivery: "Odeslání kurýrem do 48 hodin.",
    image: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "Zakázkové krabičky na elektroniku",
    tag: "50+ ks • Technické PLA / PETG",
    problem:
      "Univerzální krabičky z e-shopu neseděly přesným rozměrům desky plošných spojů (PCB) a konektorům USB-C a Ethernetu.",
    solution:
      "Návrh přesného dílu podle 3D modelu PCB, zacvakávací mechanismus (snap-fit) a montážní otvory pro bleskovou kompletaci bez lepení.",
    delivery: "1 ks zkušební prototyp + 50 ks série do 5 dnů.",
    image: "/images/project-3.jpg",
  },
];

export default function Portfolio() {
  return (
    <section id="realizace" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ukázky realizací
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Příklady toho, jak firmám šetříme čas při údržbě, vývoji a výrobě. Další aktuální fotky najdete na našem Instagramu{" "}
            <a
              href="https://www.instagram.com/3dspline.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline inline-flex items-center gap-0.5"
            >
              @3dspline.cz <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            .
          </p>
        </div>

        {/* 3 Clean Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div className="relative aspect-[4/3] bg-slate-100 border-b border-slate-200">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-blue-600 mb-1">
                    {study.tag}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                    {study.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 mb-4 leading-relaxed">
                    <p>
                      <strong className="text-slate-800">Problém: </strong>
                      {study.problem}
                    </p>
                    <p>
                      <strong className="text-slate-800">Řešení: </strong>
                      {study.solution}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Dodací lhůta:</span>
                  <span className="font-medium text-slate-800">{study.delivery}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Instagram Workshop Row */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider mb-0.5">
                <Instagram className="w-4 h-4 text-rose-600" />
                Fotky z dílny: @3dspline.cz
              </div>
              <p className="text-xs text-slate-500">
                Pravidelně sdílíme reálné výtisky přímo z podložky a průběh zakázek.
              </p>
            </div>

            <a
              href="https://www.instagram.com/3dspline.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shrink-0"
            >
              <span>Zobrazit Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://www.instagram.com/3dspline.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-200"
            >
              <Image
                src="/images/insta-1.jpg"
                alt="Sériový tisk na PEI podložce"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950/80 to-transparent text-white text-xs">
                Sériový tisk držáků
              </div>
            </a>

            <a
              href="https://www.instagram.com/3dspline.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-200"
            >
              <Image
                src="/images/insta-2.jpg"
                alt="Materiály skladem"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950/80 to-transparent text-white text-xs">
                Materiály PETG a PLA
              </div>
            </a>

            <a
              href="https://www.instagram.com/3dspline.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-200"
            >
              <Image
                src="/images/project-1.jpg"
                alt="Montáž na profil"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950/80 to-transparent text-white text-xs">
                Osazení dílu na stroji
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
