import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <Link href={href} className="group flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
        />
      </div>

      <div className="mt-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-600">{tag}</div>
        <h3 className="mt-1 text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          <span className="link-underline">Celý příběh</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
