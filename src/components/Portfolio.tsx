import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesData } from "@/lib/caseStudies";

export default function Portfolio() {
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

        {/* Karty příběhů (stejný vizuální styl jako dlaždice služeb) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {caseStudiesData.map((study) => (
            <CaseStudyCard
              key={study.slug}
              href={`/pribehy-z-dilny/${study.slug}`}
              title={study.title}
              tag={study.tag}
              image={study.heroImage}
              imageAlt={study.heroImageAlt}
            />
          ))}
        </div>

        <Link
          href="/pribehy-z-dilny"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Všechny příběhy z dílny
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
