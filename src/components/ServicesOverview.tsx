import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";

export default function ServicesOverview() {
  return (
    <section id="sluzby" className="py-16 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Naše služby
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Vyberte si oblast, kterou potřebujete vyřešit. Ať už máte hotový 3D model, jen náčrt na papíře, nebo potřebujete vyrobit náhradní díl.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group relative rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Celoplošný obrázek */}
              <Image
                src={s.image}
                alt={s.imageAlt}
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
                  {s.name}
                </h3>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-1.5">
                  Více info
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
