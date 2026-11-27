import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CaseStudyCard from "@/components/CaseStudyCard";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";
import { caseStudiesData } from "@/lib/caseStudies";
import { siteUrl } from "@/lib/services";

const title = "Příběhy z dílny – ukázky zakázkového 3D tisku | 3D Spline";
const description =
  "Ukázky reálných zakázek z naší dílny: náhradní díly, sériový 3D tisk podle modelu zákazníka a repliky historických dílů. Podívejte se, jak výroba probíhá krok za krokem.";
const pageUrl = `${siteUrl}/pribehy-z-dilny`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pribehy-z-dilny" },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "3D Spline",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "3D Spline - Zakázkový 3D tisk a CAD modelování na míru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-banner.png"],
  },
};

function shorten(text: string, max = 140): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "")}…`;
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: "Příběhy z dílny",
        description,
        url: pageUrl,
        inLanguage: "cs",
        isPartOf: { "@id": `${siteUrl}/#business` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: caseStudiesData.map((study, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${pageUrl}/${study.slug}`,
            name: study.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "3D Spline", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Příběhy z dílny", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Drobečková navigace" className="mb-6 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                3D Spline
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-slate-700 font-medium">Příběhy z dílny</span>
            </nav>

            <div className="max-w-3xl mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Příběhy z dílny
              </h1>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                Skutečné zakázky od zadání po hotové kusy. Od náhrady dílu, který už nejde koupit,
                přes sériový tisk podle hotového modelu až po repliky historických součástek. U každého
                příběhu popisuju zadání, postup i výsledek.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {caseStudiesData.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  href={`/pribehy-z-dilny/${study.slug}`}
                  title={study.title}
                  tag={study.tag}
                  image={study.heroImage}
                  imageAlt={study.heroImageAlt}
                  excerpt={shorten(study.lead)}
                />
              ))}
            </div>
          </div>
        </section>
        <InquiryForm defaultTab="drawing" />
      </main>
      <MobileFloatingCta />
      <Footer />
    </div>
  );
}
