import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroFacts from "@/components/HeroFacts";

const facts = [
  { label: "Série", value: "od pár kusů po stovky" },
  { label: "Materiály", value: "PETG a PLA" },
  { label: "Tiskový prostor", value: "25 × 25 × 25 cm" },
  { label: "Doručení z Olomouce", value: "po celé ČR" },
];

export default function Hero() {
  return (
    <section className="bg-blueprint text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] text-balance">
              Modeluju a 3D&nbsp;tisknu série <span className="accent-underline">na&nbsp;míru</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Držáky a přípravky z PETG, barevné medaile, poháry i dárky. Díl navrhnu podle
              vašeho náčrtu, vzorku nebo hotového modelu a vyrobím ho v počtu, jaký potřebujete.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#poptavka"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-900/40"
              >
                <span>Poptat výrobu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pribehy-z-dilny"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-blue-300 transition-colors"
              >
                <span className="link-underline">Ukázky zakázek</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <HeroFacts facts={facts} />
          </div>

          <figure className="lg:col-span-5 max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative">
              {/* Posunutý modrý rámeček za fotkou */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute inset-0 translate-x-3 translate-y-3 border border-blue-500/50"
              />
              <Image
                src="/images/pohar_real_vs_cad.jpg"
                alt="Vytištěný pohár pro futsalový turnaj držený v ruce před monitorem s jeho 3D modelem"
                width={1759}
                height={2000}
                sizes="(max-width: 1023px) min(28rem, calc(100vw - 2rem)), 480px"
                className="relative w-full h-auto"
                preload
              />
            </div>          </figure>
        </div>
      </div>
    </section>
  );
}
