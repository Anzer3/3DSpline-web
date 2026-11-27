import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesData } from "@/lib/caseStudies";

export default function Portfolio() {
  return (
    <section id="pribehy-z-dilny" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="section-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Příběhy z dílny
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Skutečné zakázky od zadání po hotové kusy.
            </p>
          </div>
          <Link
            href="/pribehy-z-dilny"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors shrink-0"
          >
            <span className="link-underline">Všechny příběhy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
      </div>
    </section>
  );
}
