import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InquiryCta from "@/components/InquiryCta";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesData, type CaseStudyData } from "@/lib/caseStudies";

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  const currentIndex = caseStudiesData.findIndex((s) => s.slug === study.slug);
  const nextStudy =
    caseStudiesData[(currentIndex + 1) % caseStudiesData.length] || caseStudiesData[0];
  const otherStudies = caseStudiesData.filter((s) => s.slug !== study.slug);

  const storySteps = [
    { number: "01", data: study.story.intro },
    { number: "02", data: study.story.challenge },
    { number: "03", data: study.story.craft },
    { number: "04", data: study.story.result },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <nav aria-label="Drobečková navigace" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              3D Spline
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/pribehy-z-dilny" className="hover:text-slate-900 transition-colors">
              Příběhy z dílny
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 font-medium">{study.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-sm font-semibold text-blue-600">{study.tag}</div>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] text-balance">
                {study.h1}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {study.lead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <InquiryCta
                  asLink
                  tab={study.inquiryTab}
                  storyTitle={study.title}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  <span>Poptat podobnou výrobu</span>
                  <ArrowRight className="w-4 h-4" />
                </InquiryCta>
                <Link
                  href={`/pribehy-z-dilny/${nextStudy.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>Další příběh</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <dl className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5">
                {study.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs text-slate-500">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={study.heroImage}
                  alt={study.heroImageAlt}
                  fill
                  preload
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Příběh krok za krokem */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-10 sm:mb-12">
            Jak probíhala zakázka
          </h2>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {storySteps.map((step, idx) => {
              const image = step.data.image;
              const imageFirst = idx % 2 === 1;

              return (
                <div
                  key={step.number}
                  className={`py-10 sm:py-12 grid grid-cols-1 gap-8 lg:gap-14 ${
                    image ? "lg:grid-cols-12 items-center" : ""
                  }`}
                >
                  <div className={image ? `lg:col-span-7 ${imageFirst ? "lg:order-2" : ""}` : "max-w-3xl"}>
                    <div className="text-2xl font-bold font-mono text-blue-600 mb-2">{step.number}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {step.data.title}
                    </h3>
                    {step.data.subtitle && (
                      <p className="mt-1 text-sm sm:text-base text-slate-500">{step.data.subtitle}</p>
                    )}
                    <div className="mt-5 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                      {step.data.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {image && (
                    <figure className={`lg:col-span-5 ${imageFirst ? "lg:order-1" : ""}`}>
                      <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1023px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                      {image.caption && (
                        <figcaption className="mt-2 text-xs text-slate-500">{image.caption}</figcaption>
                      )}
                    </figure>
                  )}
                </div>
              );
            })}
          </div>

          {/* Citace zákazníka */}
          <figure className="mt-12 max-w-3xl border-l-4 border-blue-600 pl-6">
            <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
              „{study.story.quote.text}“
            </blockquote>
            <figcaption className="mt-3 text-sm text-slate-500">{study.story.quote.author}</figcaption>
          </figure>
        </div>
      </section>

      {/* Závěrečná výzva */}
      <section className="py-14 sm:py-16 bg-[#0F1E2E] border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Potřebujete vyřešit podobnou součástku nebo model?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Pošlete mi fotku poškozeného dílu, nákres s rozměry nebo 3D model. Obvykle odpovídám do 24 hodin.
            </p>
          </div>
          <div className="shrink-0">
            <InquiryCta
              asLink
              tab={study.inquiryTab}
              storyTitle={study.title}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>Poptat nezávazně výrobu</span>
              <ArrowRight className="w-4 h-4" />
            </InquiryCta>
          </div>
        </div>
      </section>

      {/* Další příběhy */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-10">
            Další příběhy z dílny
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {otherStudies.map((s) => (
              <CaseStudyCard
                key={s.slug}
                href={`/pribehy-z-dilny/${s.slug}`}
                title={s.title}
                tag={s.tag}
                image={s.heroImage}
                imageAlt={s.heroImageAlt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
