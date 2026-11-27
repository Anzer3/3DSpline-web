import Image from "next/image";
import { ArrowRight } from "lucide-react";
import InquiryCta from "@/components/InquiryCta";

const steps = [
  {
    num: "01",
    title: "Napíšete mi",
    desc: "Přes formulář nebo e-mailem. Stačí popis, rozměry a fotka, případně hotový model.",
  },
  {
    num: "02",
    title: "Do 24 hodin se ozvu",
    desc: "Doptám se na detaily a domluvíme materiál, barvu, cenu i termín.",
  },
  {
    num: "03",
    title: "Zkušební kus",
    desc: "Vyrobím jeden kus a pošlu vám ho na vyzkoušení.",
  },
  {
    num: "04",
    title: "Série",
    desc: "Až zkušební kus schválíte, vyrobím celou sérii a pošlu ji kamkoli v ČR.",
  },
];

export default function Process() {
  return (
    <section id="jak-to-funguje" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Jak probíhá spolupráce
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Od první zprávy po hotovou sérii.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <li key={step.num} className="flex flex-col">
              <div className="text-2xl font-bold font-mono text-blue-600 mb-2">{step.num}</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>

        <div
          id="prototyp-balicek"
          className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 scroll-mt-20"
        >
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold text-slate-900">Proč nejdřív zkušební kus</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Na fotce ani v modelu nepoznáte, jestli díl sedne a jak bude vypadat v ruce. Proto
              u zakázek od 3 kusů vyrábím nejdřív jeden na vyzkoušení. Pošlu ho zdarma a platíte
              jen za něj, sérii až po schválení.
            </p>
            <InquiryCta
              tab="model"
              prototypePackage
              asLink
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Poptat se zkušebním kusem</span>
              <ArrowRight className="w-4 h-4" />
            </InquiryCta>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <figure>
              <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                <Image
                  src="/portfolio/prottyp.jpg"
                  alt="Zkušební kus miniatury 3D tiskárny v jedné barvě"
                  fill
                  sizes="(max-width: 1023px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-500">Zkušební kus</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                <Image
                  src="/portfolio/seriovka.jpg"
                  alt="Hotová série barevných miniatur 3D tiskáren"
                  fill
                  sizes="(max-width: 1023px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-500">Hotová série</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
