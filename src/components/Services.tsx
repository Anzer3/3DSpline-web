import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InquiryCta from "@/components/InquiryCta";
import type { InquiryTabKey } from "@/lib/services";

const paths: {
  title: string;
  text: string;
  inputsLabel: string;
  inputs: string;
  tab: InquiryTabKey;
  ctaLabel: string;
  moreHref: string;
  moreLabel: string;
}[] = [
  {
    title: "Nemáte 3D model",
    text: "Pošlete mi náčrt s rozměry, výkres, fotku nebo rovnou poškozený kus. Navrhnu model tak, aby díl sedl na své místo, vydržel, k čemu je určený, a dal se rozumně tisknout v sérii.",
    inputsLabel: "Stačí",
    inputs: "náčrt s rozměry, výkres, fotka nebo vzorek",
    tab: "drawing",
    ctaLabel: "Poptat modelování",
    moreHref: "/cad-modelovani-na-miru",
    moreLabel: "Více o modelování",
  },
  {
    title: "Máte 3D model",
    text: "Pošlete soubor a já ho projdu, nastavím tisk a vyrobím díly v počtu, jaký potřebujete. Když v modelu narazím na něco, co by se tisklo špatně, ozvu se dřív, než začnu.",
    inputsLabel: "Formáty",
    inputs: "STEP, STL, 3MF",
    tab: "model",
    ctaLabel: "Nahrát model",
    moreHref: "/3d-tisk-na-zakazku",
    moreLabel: "Více o 3D tisku",
  },
];

const products: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  position?: string;
}[] = [
  {
    src: "/portfolio/poklicky.jpg",
    alt: "Sada vytištěných madel na pokličky",
    title: "Funkční a náhradní díly",
    caption: "Držáky, úchyty, madla, krytky",
  },
  {
    src: "/portfolio/vice_barev.jpg",
    alt: "Série barevných modelů formulí vytištěných na jedné podložce",
    title: "Barevné modely v sérii",
    caption: "Desítky stejných kusů ve více barvách",
    // Barevné kusy jsou ve spodní části fotky
    position: "50% 85%",
  },
  {
    src: "/portfolio/vanocni_banky.png",
    alt: "Vánoční ozdoby se jmény",
    title: "Personalizované dárky",
    caption: "Každý kus s jiným jménem nebo textem",
  },
  {
    src: "/portfolio/medaile.jpg",
    alt: "Tři vytištěné barevné medaile se stromem a liškou a nápisem Karlov 2024",
    title: "Medaile a upomínkové předměty",
    caption: "Pro turnaje, spolky a firemní akce",
    // Medaile leží ve spodní části fotky
    position: "50% 70%",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Máte model, nebo jen <span className="accent-underline">představu</span>?
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Obojí je v pořádku. Liší se jen tím, kde začínám.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x md:divide-slate-200">
          {paths.map((path, idx) => (
            <div key={path.title} className={idx === 0 ? "md:pr-12" : "md:pl-12"}>
              <div className="font-mono text-xs font-semibold text-blue-600">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 text-xl font-bold text-slate-900">{path.title}</h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                {path.text}
              </p>
              <p className="mt-4 text-sm text-slate-600">
                <span className="text-slate-500">{path.inputsLabel}:</span>{" "}
                <span className="font-semibold text-slate-900">{path.inputs}</span>
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <InquiryCta
                  tab={path.tab}
                  asLink
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <span>{path.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </InquiryCta>
                <Link
                  href={path.moreHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="link-underline">{path.moreLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blueprint text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h3 className="text-base font-bold text-white">Co nejčastěji vyrábím</h3>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8">
            {products.map((item) => (
              <figure key={item.title} className="group">
                <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1023px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={item.position ? { objectPosition: item.position } : undefined}
                  />
                </div>
                <figcaption className="mt-3">
                  <div className="text-sm font-semibold text-white leading-snug">{item.title}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{item.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
