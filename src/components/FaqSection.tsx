"use client";

import React, { useState } from "react";
import { ChevronDown, Scale, Thermometer, ShieldAlert, Layers, HelpCircle, Ban } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      icon: Scale,
      question: "Mohu si nechat vytisknout model stažený z internetu?",
      answer:
        "Ano, pokud to licenční podmínky autora umožňují (např. licence Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Nelze tisknout modely šířené pod licencí Non-Commercial (NC), chráněná loga automobilek ani franšízové postavičky bez doložené licence držitele autorských práv.",
    },
    {
      icon: Layers,
      question: "Jak se FDM 3D tisk liší od sériového vstřikolisu?",
      answer:
        "Díly vznikají nanášením plastového vlákna po mikroskopických vrstvách (obvykle 0,16 až 0,28 mm). Na povrchu je vidět jemná vrstvená struktura a díl není zrcadlově hladký jako z formy. Při správném návrhu a orientaci tiskových vláken však nabízí vynikající pevnost a umožňuje výrobu od 1 ks bez statisícových nákladů na vstřikovací formu.",
    },
    {
      icon: Thermometer,
      question: "Vydrží díl v létě v autě nebo na přímém slunci?",
      answer:
        "Záleží na zvoleném materiálu. Běžné PLA začíná měknout už kolem 50–55 °C, proto je v létě na palubní desce či za sklem nevhodné. Pro automobilové a venkovní aplikace tiskneme z houževnatého PETG (do ~75–80 °C) nebo UV-stabilního ASA (do ~95 °C), které odolá i horkému letnímu slunci.",
    },
    {
      icon: ShieldAlert,
      question: "Jsou výtisky vhodné pro styk s potravinami či dětské hračky?",
      answer:
        "Standardní FDM tisk není hygienicky certifikovaný pro přímý styk s jídlem. Mezi jednotlivými mikroskopickými vrstvami se mohou usazovat nečistoty a bakterie, které nelze běžným mytím spolehlivě odstranit. Naše výrobky proto nedodáváme pro potravinářské účely ani jako hračky pro nejmenší děti.",
    },
    {
      icon: HelpCircle,
      question: "Za co ručíte a co je na odpovědnosti zákazníka?",
      answer:
        "Ručíme za bezchybné zhotovení dle dodaných CAD podkladů, dodržení tolerancí (obvykle ±0,2 mm) a použití kvalitních značkových filamentů. Vzhledem k různorodosti namáhání a provozních prostředí nese finální odpovědnost za otestování a bezpečnost nasazení dílu zákazník. K tomuto účelu nabízíme předvýrobní prototypový vzorek.",
    },
    {
      icon: Ban,
      question: "Jaké zakázky z principu nepřijímáte?",
      answer:
        "Z bezpečnostních a právních důvodů netiskneme zbraně, tlumiče, pyrotechnické a funkční prvky střeliva, zdravotnické náhrady či implantáty, ani padělky chráněných ochranných známek bez písemného oprávnění majitele.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="caste-dotazy" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Pravidla &amp; Doporučení
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Často kladené otázky a limity technologie
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Transparentní informace o tom, co od zakázkového 3D tisku čekat, jaké materiály zvolit a kde naopak platí bezpečnostní omezení.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {/* Answer kept in SSR DOM for search engines & AI crawlers */}
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 border-t border-slate-100 bg-slate-50/30"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <p className="pl-11">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
