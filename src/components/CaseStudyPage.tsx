"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Sparkles } from "lucide-react";
import { caseStudiesData, type CaseStudyData } from "@/lib/caseStudies";

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  const otherStudies = caseStudiesData.filter((s) => s.slug !== study.slug);
  const [activeImage, setActiveImage] = useState<string>(study.heroImage);

  const handleInquiry = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-inquiry-tab", {
          detail: { tab: study.inquiryTab },
        })
      );
      const el = document.querySelector("#poptavka");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
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
            <Link href="/#pripadove-studie" className="hover:text-slate-900 transition-colors">
              Příběhy zakázek
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 font-medium">{study.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Heading and Lead */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Storytime z dílny</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                {study.h1}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {study.lead}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <span>Poptat podobnou výrobu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/#pripadove-studie"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
                >
                  <span>Všechny příběhy z dílny</span>
                </Link>
              </div>
            </div>

            {/* Right: Main Hero Photo & Thumbnail bar */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
                <Image
                  src={activeImage}
                  alt={study.heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Gallery Thumbnails if available */}
              {study.gallery && study.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {study.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img.src)}
                      className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                        activeImage === img.src
                          ? "border-blue-600 ring-2 ring-blue-600/30 scale-105"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                      title={img.caption}
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Příběh zakázky
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Jak to probíhalo od prvního kontaktu
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Žádné teoretické tabulky – podívejte se, jak zakázka vypadala krok za krokem v praxi.
            </p>
          </div>

          {/* Story Steps */}
          <div className="space-y-12 sm:space-y-16">
            {storySteps.map((step) => (
              <div
                key={step.number}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200"
              >
                {/* Left Step Column */}
                <div className="md:col-span-4">
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1.5">
                    Kapitola {step.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {step.data.title}
                  </h3>
                  {step.data.subtitle && (
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {step.data.subtitle}
                    </p>
                  )}
                </div>

                {/* Right Text Column */}
                <div className="md:col-span-8 space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {step.data.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quote Card */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/60 relative">
            <Quote className="w-8 h-8 text-blue-400/50 mb-3" />
            <blockquote className="text-base sm:text-lg font-medium text-slate-800 italic leading-relaxed">
              „{study.story.quote.text}“
            </blockquote>
            <div className="mt-4 text-xs font-bold text-slate-900 uppercase tracking-wider">
              — {study.story.quote.author}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid if there's a gallery */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Fotodokumentace realizace
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Prohlédněte si jednotlivé fáze výroby od původního stavu po finální výsledek.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {study.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3.5 text-xs text-slate-700 leading-snug font-medium">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F1E2E] border border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Potřebujete vyřešit podobnou součástku nebo model?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                Pošlete nám fotku poškozeného dílu, nákres s rozměry nebo 3D model. Nezávazně vám navrhneme postup a cenu do 24 hodin.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={handleInquiry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md"
              >
                <span>Poptat nezávazně výrobu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Other case studies */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Další příběhy z naší dílny</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {otherStudies.map((s) => (
              <Link
                key={s.slug}
                href={`/pripadove-studie/${s.slug}`}
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
