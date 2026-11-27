import Image from "next/image";
import { ArrowRight } from "lucide-react";

const facts = [
  { label: "Série", value: "od pár kusů po stovky" },
  { label: "Materiály", value: "PETG a PLA" },
  { label: "Tiskový prostor", value: "25 × 25 × 25 cm" },
  { label: "Doručení z Olomouce", value: "po celé ČR" },
];

export default function Hero() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.08] text-balance">
              Modeluju a 3D&nbsp;tisknu série na&nbsp;míru
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Držáky a přípravky z PETG, barevné medaile, poháry i dárky. Díl navrhnu podle
              vašeho náčrtu, vzorku nebo hotového modelu a vyrobím ho v počtu, jaký potřebujete.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#poptavka"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
              >
                <span>Poptat výrobu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pribehy-z-dilny"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Ukázky zakázek</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <dl className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs text-slate-500">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="lg:col-span-5 max-w-md mx-auto lg:max-w-none w-full">
            <Image
              src="/images/pohar_real_vs_cad.jpg"
              alt="Vytištěný pohár pro futsalový turnaj držený v ruce před monitorem s jeho 3D modelem"
              width={1759}
              height={2000}
              sizes="(max-width: 1023px) min(28rem, calc(100vw - 2rem)), 480px"
              className="w-full h-auto"
              preload
            />
            <figcaption className="mt-3 text-xs text-slate-500">
              Pohár pro futsalový turnaj: hotový výtisk před modelem, ze kterého vznikl.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
