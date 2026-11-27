/** Řádek krátkých faktů pod úvodním textem tmavého úvodu stránky. */
export default function HeroFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6">
      {facts.map((fact) => (
        <div key={fact.label} className="border-t border-slate-700 pt-4 relative">
          {/* Modrý úsek na horní lince */}
          <span aria-hidden="true" className="absolute -top-px left-0 h-px w-8 bg-blue-500" />
          <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
            {fact.label}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-white leading-snug">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
