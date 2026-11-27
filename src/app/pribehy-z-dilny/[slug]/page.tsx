import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyPage from "@/components/CaseStudyPage";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";
import { caseStudiesData, getCaseStudy } from "@/lib/caseStudies";
import { siteUrl } from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `${siteUrl}/pribehy-z-dilny/${study.slug}`;
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    keywords: study.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      url,
      siteName: "3D Spline",
      locale: "cs_CZ",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const pageUrl = `${siteUrl}/pribehy-z-dilny/${study.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: study.h1,
        description: study.metaDescription,
        image: `${siteUrl}${study.heroImage}`,
        inLanguage: "cs",
        ...(study.datePublished && { datePublished: study.datePublished }),
        ...((study.dateModified ?? study.datePublished) && {
          dateModified: study.dateModified ?? study.datePublished,
        }),
        author: { "@id": `${siteUrl}/#business` },
        publisher: { "@id": `${siteUrl}/#business` },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "3D Spline", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Příběhy z dílny",
            item: `${siteUrl}/pribehy-z-dilny`,
          },
          { "@type": "ListItem", position: 3, name: study.title, item: pageUrl },
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
        <CaseStudyPage study={study} />
        <InquiryForm defaultTab={study.inquiryTab} />
      </main>
      <MobileFloatingCta />
      <Footer />
    </div>
  );
}
