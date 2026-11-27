import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqJsonLd";

/**
 * Seznam častých dotazů jako rozbalovací <details>. Funguje bez JavaScriptu
 * a odpovědi zůstávají v HTML i pro vyhledávače.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-600 before:origin-top before:scale-y-0 before:transition-transform open:before:scale-y-100 open:pl-4 transition-[padding] duration-200"
        >
          <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-5 text-base font-semibold text-slate-900 hover:text-blue-600 group-open:text-blue-600 transition-colors [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <ChevronDown className="w-5 h-5 mt-0.5 text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-blue-600" />
          </summary>
          <p className="pb-6 pr-0 sm:pr-11 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
