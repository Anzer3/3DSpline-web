import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ArrowUpRight } from "lucide-react";
import ServiceCtaButton from "@/components/ServiceCtaButton";
import { services, type Block, type Service } from "@/lib/services";

const h2Class =
  "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight";
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
    <section className={`py-14 sm:py-16 border-b ${styles}`}>
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
              <aside className="lg:col-span-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {block.aside.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {block.aside.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                      >
                        <span className="mt-0.5 p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
              <div className="relative aspect-[4/3] rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {block.items.map((item, idx) => (
                <div key={item.title} className="flex flex-col">
                  <div className="text-2xl font-bold font-mono text-blue-600 mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
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

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  {block.columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-semibold">
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
                        className={`px-4 py-3.5 align-top leading-relaxed ${
                          idx === 0 ? "font-bold text-slate-900" : "text-slate-600"
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {block.items.map((item) => (
              <div
                key={item.src}
                className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col"
              >
                <div className="relative w-full aspect-square p-2 mb-3">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={280}
                    height={280}
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.caption}</div>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    case "limits":
      return (
        <SectionShell tone="dark">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
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
      <section className="relative bg-white border-b border-slate-200 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Drobečková navigace" className="mb-5 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              3D Spline
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <p className="text-sm sm:text-base font-semibold text-blue-600">
                {service.kicker}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                {service.h1}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.lead}
              </p>
              <div className="pt-2">
                <ServiceCtaButton
                  label={service.ctaLabel}
                  tab={service.tab}
                  prototypePackage={service.prototypePackage}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
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
      </section>

      {/* Klíčové údaje */}
      <section className="bg-slate-900 border-b border-slate-800 text-white py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {service.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-blue-500/70 pl-3.5">
                <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-bold text-white leading-snug">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Obsah podle služby */}
      {blocks.map(({ block, tone }, idx) => (
        <BlockView key={`${block.type}-${idx}`} block={block} tone={tone} />
      ))}

      {/* FAQ */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${h2Class} mb-8 text-center`}>Časté dotazy</h2>
          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 sm:p-5 text-sm sm:text-base font-semibold text-slate-900">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Závěrečná výzva */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#0F1E2E] border border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
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
        </div>
      </section>

      {/* Další služby */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Další služby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-start justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">{s.name}</div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.cardText}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
