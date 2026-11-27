import Image from "next/image";
import { Palette, Layers, Handshake } from "lucide-react";
import { company } from "@/lib/company";

const strengths = [
  {
    icon: Layers,
    title: "Navrženo pro sériový tisk",
    description:
      "Díly modeluju tak, aby se tiskly bez zbytečných podpěr a dodělávek. Díky tomu drží rozumnou cenu za kus i u desítek a stovek kusů.",
  },
  {
    icon: Handshake,
    title: "Je to o domluvě",
    description:
      "Každá zakázka je trochu jiná. Probereme, k čemu díl slouží, kolik smí stát a kdy ho potřebujete, a podle toho navrhnu řešení.",
  },
  {
    icon: Palette,
    title: "Více barev v jednom tisku",
    description:
      "Logo, nápis nebo jméno tisknu rovnou v barvě jako součást dílu. Nic se nelepí ani nenatírá, takže barva časem neoprýská.",
  },
];

export default function About() {
  return (
    <section
      id="kdo-za-tim-stoji"
      className="py-16 sm:py-20 bg-blueprint text-white border-b border-slate-800 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-start gap-4 sm:gap-5">
            <Image
              src="/images/logo.png"
              alt="3D Spline Logo"
              width={64}
              height={64}
              sizes="64px"
              className="hidden sm:block w-16 h-16 object-contain shrink-0 mt-5"
            />
            <div>
              <h2 className="section-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Kdo za tím stojí
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                Jmenuju se{" "}
                <strong className="accent-underline text-white font-semibold">{company.founderName}</strong>. Díly pro
                vás navrhuju a tisknu v Olomouci a na e-maily odpovídám osobně.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col border-l border-slate-700 pl-5 hover:border-blue-500 transition-colors">
                <div className="text-blue-400 mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
