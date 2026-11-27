import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyPage from "@/components/CaseStudyPage";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";
import { caseStudiesData, getCaseStudy } from "@/lib/caseStudies";

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

  const url = `https://3dspline.cz/pribehy-z-dilny/${study.slug}`;
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
      images: [
        {
          url: study.heroImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
      images: [study.heroImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
