import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ServicePage from "@/components/ServicePage";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";
import { getService, services, siteUrl } from "@/lib/services";

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.slug);
  if (!service) return {};

  const url = `/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteUrl}${url}`,
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
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["/images/og-banner.png"],
    },
  };
}

export default function ServiceRoute({ params }: PageProps) {
  const service = getService(params.slug);
  if (!service) notFound();

  const pageUrl = `${siteUrl}/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.h1,
        description: service.metaDescription,
        url: pageUrl,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: { "@type": "Country", name: "Česká republika" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "3D Spline", item: siteUrl },
          { "@type": "ListItem", position: 2, name: service.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
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
        <ServicePage service={service} />
        <InquiryForm />
      </main>
      <MobileFloatingCta />
      <Footer />
    </div>
  );
}
