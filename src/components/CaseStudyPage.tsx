"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudiesData, type CaseStudyData } from "@/lib/caseStudies";

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  const currentIndex = caseStudiesData.findIndex((s) => s.slug === study.slug);
  const nextStudy =
    caseStudiesData[(currentIndex + 1) % caseStudiesData.length] ||
    caseStudiesData[0];
  const otherStudies = caseStudiesData.filter((s) => s.slug !== study.slug);

  const handleInquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-inquiry-tab", {
          detail: { tab: study.inquiryTab, storyTitle: study.title },
        })
      );
      const el = document.querySelector("#poptavka");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = "#poptavka";
      }
    }
  };

  const storySteps = [
    { number: "01", data: study.story.intro, tag: "Začátek" },
    { number: "02", data: study.story.challenge, tag: "Háček a výzva" },
    { number: "03", data: study.story.craft, tag: "Práce v dílně" },
    { number: "04", data: study.story.result, tag: "Výsledek" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Drobečková navigace" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              3D Spline
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/#pribehy-z-dilny" className="hover:text-slate-900 transition-colors">
              Příběhy z dílny
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 font-medium">{study.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left: Heading and Lead */}
            <div className="md:col-span-7 space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                {study.h1}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {study.lead}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#poptavka"
                  onClick={handleInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <span>Poptat podobnou výrobu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href={`/pribehy-z-dilny/${nextStudy.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
                >
                  <span>Další příběh</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              </div>
            </div>

            {/* Right: Main Hero Photo */}
            <div className="md:col-span-5 w-full max-w-sm sm:max-w-md mx-auto md:max-w-none">
              <div className="relative aspect-[4/3] rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
                <Image
                  src={study.heroImage}
                  alt={study.heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 384px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <section className="bg-slate-900 border-b border-slate-800 text-white py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {study.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-blue-500/70 pl-3.5">
                <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-bold text-white leading-snug">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Storytime Section */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story Header */}
          <div className="max-w-2xl mb-14 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Jak probíhala zakázka
            </h2>
          </div>

          {/* Story Steps */}
          <div className="space-y-12 sm:space-y-16">
            {storySteps.map((step, idx) => {
              const hasImage = !!step.data.image;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
                >
                  <div className={`grid grid-cols-1 ${hasImage ? "md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center" : "max-w-3xl"}`}>
                    {/* Text content column */}
                    <div className={hasImage ? `md:col-span-7 ${isEven ? "md:order-2" : ""}` : ""}>
                      <div className="text-xs font-mono font-bold text-blue-600 mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {step.data.title}
                      </h3>
                      {step.data.subtitle && (
                        <p className="text-sm font-medium text-slate-500 mt-1 mb-4 sm:mb-5">
                          {step.data.subtitle}
                        </p>
                      )}
                      <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                        {step.data.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </div>

                    {/* Image column */}
                    {hasImage && step.data.image && (
                      <div className={`md:col-span-5 w-full max-w-xs sm:max-w-sm mx-auto md:max-w-none ${isEven ? "md:order-1" : ""}`}>
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={step.data.image.src}
                              alt={step.data.image.alt}
                              fill
                              sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 40vw"
                              className="object-cover lg:hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          {step.data.image.caption && (
                            <p className="p-3 text-xs text-slate-600 bg-white border-t border-slate-100 font-medium">
                              {step.data.image.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quote Card */}
          <div className="mt-14 max-w-4xl p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-l-blue-600 border border-slate-200 shadow-sm">
            <blockquote className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
              „{study.story.quote.text}“
            </blockquote>
            <div className="mt-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
              — {study.story.quote.author}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F1E2E] border border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Potřebujete vyřešit podobnou součástku nebo model?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                Pošlete nám fotku poškozeného dílu, nákres s rozměry nebo 3D model. Obvykle odpovídáme do 24 hodin.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#poptavka"
                onClick={handleInquiry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md cursor-pointer"
              >
                <span>Poptat nezávazně výrobu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other case studies */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Další příběhy z dílny</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {otherStudies.map((s) => (
              <Link
                key={s.slug}
                href={`/pribehy-z-dilny/${s.slug}`}
                className="group relative rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Image
                  src={s.heroImage}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="relative z-10 flex justify-end p-4">
                  <span className="p-1.5 rounded-full bg-slate-900/50 backdrop-blur-md text-white border border-white/20 group-hover:bg-blue-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <div className="relative z-10 p-4 bg-gradient-to-t from-slate-950/85 via-slate-950/60 to-transparent pt-10">
                  <h3 className="text-base font-bold text-white leading-snug">{s.title}</h3>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-1">
                    Celý příběh
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
