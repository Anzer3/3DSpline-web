import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  href: string;
  title: string;
  tag: string;
  image: string;
  imageAlt?: string;
  /** Volitelný krátký úvod zobrazený pod názvem (používá rozcestník). */
  excerpt?: string;
}

export default function CaseStudyCard({
  href,
  title,
  tag,
  image,
  imageAlt,
  excerpt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-xl border border-slate-300 overflow-hidden flex flex-col justify-end min-h-[300px] sm:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Celoplošný obrázek */}
      <Image
        src={image}
        alt={imageAlt ?? title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Štítek */}
      <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
        {tag}
      </span>

      {/* Spodní jemné tmavé podbarvení pro název a odkaz */}
      <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-transparent pt-14">
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{title}</h3>
        {excerpt && (
          <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-1.5">
          Celý příběh
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
