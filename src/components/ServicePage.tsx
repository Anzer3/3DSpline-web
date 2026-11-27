import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import ServiceCtaButton from "@/components/ServiceCtaButton";
import FaqList from "@/components/FaqList";
import HeroFacts from "@/components/HeroFacts";
import { services, type Block, type Service } from "@/lib/services";

const h2Class =
  "section-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight";
const introClass = "mt-3 text-sm sm:text-base text-slate-600 leading-relaxed";

function SectionShell({
  tone,
  children,
}: {
  tone: "white" | "slate" | "dark";
  children: React.ReactNode;
}) {
  const styles = {
    white: "bg-white border-slate-200",
    slate: "bg-slate-50 border-slate-200",
    dark: "bg-[#0F1E2E] border-slate-800 text-white",
  }[tone];

  return (
    <section className={`py-16 sm:py-20 border-b ${styles}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function BlockView({ block, tone }: { block: Block; tone: "white" | "slate" | "dark" }) {
  switch (block.type) {
    case "prose":
      return (
        <SectionShell tone={tone}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            <div className={block.aside ? "lg:col-span-7" : "lg:col-span-8"}>
              <h2 className={h2Class}>{block.title}</h2>
              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {block.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            {block.aside && (
              <aside className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
                <h3 className="text-base font-bold text-slate-900">{block.aside.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.aside.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </SectionShell>
      );

    case "split":
      return (
        <SectionShell tone={tone}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div
              className={`lg:col-span-6 ${block.reverse ? "lg:order-2" : "lg:order-1"}`}
            >
              <h2 className={h2Class}>{block.title}</h2>
              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {block.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div
              className={`lg:col-span-6 ${block.reverse ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </SectionShell>
      );

    case "list":
      return (
        <SectionShell tone={tone}>
          <div className="max-w-3xl mb-8 sm:mb-10">
            <h2 className={h2Class}>{block.title}</h2>
            {block.intro && <p className={introClass}>{block.intro}</p>}
          </div>

          {block.variant === "steps" ? (
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {block.items.map((item, idx) => (
                <li key={item.title} className="relative flex flex-col border-t border-slate-200 pt-5">
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-0.5 bg-blue-600"
                    style={{ width: `${((idx + 1) / block.items.length) * 100}%` }}
                  />
                  <div className="text-2xl font-bold font-mono text-blue-600 mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <dl className="max-w-4xl border-t border-slate-200">
              {block.items.map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-4 border-b border-slate-200"
                >
                  <dt className="sm:col-span-4 text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </dt>
                  <dd className="sm:col-span-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </SectionShell>
      );

    case "table":
      return (
        <SectionShell tone={tone}>
          <div className="max-w-3xl mb-8">
            <h2 className={h2Class}>{block.title}</h2>
            {block.intro && <p className={introClass}>{block.intro}</p>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm border-y border-slate-200">
              <thead className="text-xs text-slate-500">
                <tr className="border-b border-slate-200">
                  {block.columns.map((col) => (
                    <th key={col} className="py-3 pr-6 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, idx) => (
                      <td
                        key={idx}
                        className={`py-4 pr-6 align-top leading-relaxed ${
                          idx === 0 ? "font-bold text-slate-900 whitespace-nowrap" : "text-slate-600"
                        } ${
                          // Krátké hodnoty (např. teplotní limit) nezalamovat
                          idx > 0 && cell.length <= 18 ? "whitespace-nowrap" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {block.note && (
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{block.note}</p>
          )}
        </SectionShell>
      );

    case "gallery":
      return (
        <SectionShell tone={tone}>
          <div className="max-w-3xl mb-8">
            <h2 className={h2Class}>{block.title}</h2>
            {block.intro && <p className={introClass}>{block.intro}</p>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8">
            {block.items.map((item) => (
              <figure key={item.src}>
                <div className="relative aspect-square bg-white p-3">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={280}
                    height={280}
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="mt-3">
                  <div className="text-sm font-semibold text-slate-900 leading-snug">{item.title}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{item.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </SectionShell>
      );

    case "limits":
      return (
        <SectionShell tone="dark">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <h2 className="section-title text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {block.title}
            </h2>
            {block.intro && (
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {block.intro}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-5xl">
            {block.items.map((item) => (
              <div key={item.title} className="border-l-2 border-blue-500/60 pl-4">
                <h3 className="text-sm sm:text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );
  }
}

export default function ServicePage({ service }: { service: Service }) {
  const otherServices = services.filter((s) => s.slug !== service.slug);

  // Střídání pozadí sekcí (bílá / světle šedá), tmavé limity zůstávají tmavé
  let slateNext = true;
  const blocks = service.blocks.map((block) => {
    if (block.type === "limits") {
      return { block, tone: "dark" as const };
    }
    const tone = slateNext ? ("slate" as const) : ("white" as const);
    slateNext = !slateNext;
    return { block, tone };
  });

  const heroImage = service.heroImage ?? service.image;
  const heroImageAlt = service.heroImageAlt ?? service.imageAlt;

  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <nav aria-label="Drobečková navigace" className="mb-8 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              3D Spline
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-200">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400">{service.kicker}</p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] text-balance">
                {service.h1}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {service.lead}
              </p>
              <div className="mt-8">
                <ServiceCtaButton
                  label={service.ctaLabel}
                  tab={service.tab}
                  prototypePackage={service.prototypePackage}
                />
              </div>

              <HeroFacts facts={service.facts} />
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute inset-0 translate-x-3 translate-y-3 border border-blue-500/50"
                />
                <div className="relative aspect-[4/3] lg:aspect-[5/4] bg-slate-800 overflow-hidden">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  preload
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Obsah podle služby */}
      {blocks.map(({ block, tone }, idx) => (
        <BlockView key={`${block.type}-${idx}`} block={block} tone={tone} />
      ))}

      {/* Časté dotazy */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className={h2Class}>Časté dotazy</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* Závěrečná výzva */}
      <section className="py-14 sm:py-16 bg-[#0F1E2E] border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {service.closing.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.closing.text}
            </p>
          </div>
          <div className="shrink-0">
            <ServiceCtaButton
              label={service.ctaLabel}
              tab={service.tab}
              prototypePackage={service.prototypePackage}
              variant="dark"
            />
          </div>
        </div>
      </section>

      {/* Další služby */}
      <section className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold text-slate-900 mb-4">Další služby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-slate-200">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-start justify-between gap-4 py-5 border-b border-slate-200"
              >
                <div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <span className="link-underline">{s.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.cardText}</p>
                </div>
                <ArrowRight className="w-4 h-4 mt-1 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
