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
    title: "Ve všední dny se ozvu do 24 hodin",
    desc: "Doladíme pak detaily.",
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
    <section id="jak-to-funguje" className="bg-white scroll-mt-16">
      <div className="bg-[#0F1E2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-10">
            <h2 className="section-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Jak probíhá spolupráce
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              Od první zprávy po hotovou sérii.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <li key={step.num} className="relative flex flex-col border-t border-slate-700 pt-5">
                {/* Modrý úsek linky ukazuje postup: s každým krokem je vybarvená větší část */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-0.5 bg-blue-500"
                  style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
                />
                <div className="text-2xl font-bold font-mono text-blue-400 mb-2">{step.num}</div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div id="prototyp-balicek" className="border-b border-slate-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold text-slate-900">Proč nejdřív <span className="accent-underline">zkušební kus</span></h3>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Na fotce ani v modelu nepoznáte, jestli díl sedne a jak bude vypadat v ruce. Proto
              u zakázek od 3 kusů vyrábím nejdřív jeden na vyzkoušení. Pošlu ho zdarma a platíte
              jen za něj, sérii až po schválení.
            </p>
            <InquiryCta
              tab="model"
              prototypePackage
              asLink
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="link-underline">Poptat se zkušebním kusem</span>
              <ArrowRight className="w-4 h-4" />
            </InquiryCta>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <figure>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src="/portfolio/prottyp.jpg"
                  alt="Zkušební kus miniatury 3D tiskárny v jedné barvě"
                  fill
                  sizes="(max-width: 1023px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">Zkušební kus</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src="/portfolio/seriovka.jpg"
                  alt="Hotová série barevných miniatur 3D tiskáren"
                  fill
                  sizes="(max-width: 1023px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">Hotová série</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
