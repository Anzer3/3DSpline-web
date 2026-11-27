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
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold text-blue-600">{tag}</div>
        <h3 className="mt-1 text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          <span>Celý příběh</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
