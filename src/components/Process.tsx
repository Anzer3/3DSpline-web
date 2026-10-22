import React from "react";
import { ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Kontaktování",
      desc: "Kontaktujete nás přes poptávkový formulář nebo přímo na e-mail.",
      link: null,
    },
    {
      num: "02",
      title: "Odpověď do 24 hodin",
      desc: "Začneme s vámi komunikovat nejpozději do 24 hodin a poté společně dáme dohromady všechny podrobnosti.",
      link: null,
    },
    {
      num: "03",
      badge: "Doporučeno",
      title: "Testovací prototyp",
      desc: "Jako „prototypovací balíček“ vyrobíme zkušební kus. Poštovné hradíme za vás.",
      link: {
        text: "Podrobnosti o balíčku níže",
        href: "#prototyp-balicek",
      },
    },
    {
      num: "04",
      title: "Odsouhlasení a série",
      desc: "Po vašem odsouhlasení prototypu zahájíme samotnou sériovou výrobu.",
      link: null,
    },
  ];

  return (
    <section id="jak-to-funguje" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Jak probíhá spolupráce
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Transparentní proces od prvního kontaktu až po dodání hotové série.
          </p>
        </div>

        {/* Ultra-clean 4-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <div className="text-2xl font-bold font-mono text-blue-600 mb-2">
                  {step.num}
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  {step.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {step.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>

                {step.link && (
                  <div className="mt-2.5">
                    <a
                      href={step.link.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>{step.link.text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
