import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { company, hasIco } from "@/lib/company";
import OverlayScrollbar from "@/components/OverlayScrollbar";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Monospace jen na drobné technické štítky – nepřednačítá se, aby neubíral
// šířku pásma hlavnímu písmu a úvodnímu obrázku.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "3D tisk a modelování na míru | 3D Spline",
  description:
    "Zakázkový 3D tisk a modelování na míru. Navrhnu a vytisknu série funkčních dílů z PETG i barevné medaile, poháry a dárky, od pár kusů po stovky. Doručení po celé ČR.",
  keywords: [
    "3D Spline",
    "zakázkový 3D tisk",
    "3D tisk na míru",
    "modelování na míru",
    "CAD modelování",
    "výrobní přípravky 3D tisk",
    "náhradní díly 3D tisk",
    "reverzní inženýrství",
    "konstrukční PETG",
    "technické PLA",
    "3dspline.cz",
  ],
  authors: [{ name: "3D Spline", url: "https://3dspline.cz" }],
  creator: "3D Spline",
  metadataBase: new URL("https://3dspline.cz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "3D tisk a modelování na míru | 3D Spline",
    description:
      "Modeluju a 3D tisknu série na míru: funkční díly z PETG i barevné medaile, poháry a dárky.",
    url: "https://3dspline.cz",
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
    title: "3D tisk a modelování na míru | 3D Spline",
    description: "Zakázkový 3D tisk a modelování na míru pro firmy i jednotlivce.",
    images: ["/images/og-banner.png"],
  },
  icons: {
    icon: "/images/logo_search_results.png",
    apple: "/images/logo_search_results.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2942",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://3dspline.cz/#business",
        name: company.brand,
        ...(company.operatorName.trim() !== "" && { legalName: company.operatorName }),
        founder: { "@type": "Person", name: company.founderName },
        ...(hasIco && {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "IČO",
            value: company.ico,
          },
        }),
        image: "https://3dspline.cz/images/og-banner.png",
        logo: "https://3dspline.cz/images/logo_search_results.png",
        description:
          "Zakázkový 3D tisk a CAD modelování na míru pro firmy i jednotlivce. Od náhrady poškozeného kusu po stovkové série.",
        url: company.web,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          ...(company.address.street.trim() !== "" && { streetAddress: company.address.street }),
          addressLocality: company.address.city,
          ...(company.address.zip.trim() !== "" && { postalCode: company.address.zip }),
          addressCountry: "CZ",
        },
        areaServed: {
          "@type": "Country",
          name: "Česká republika",
        },
        priceRange: "$$",
        sameAs: [company.instagram],
        knowsAbout: [
          "Zakázkový 3D tisk",
          "CAD modelování",
          "Konstrukce dílů",
          "Výrobní přípravky",
          "Náhradní díly",
          "Reverzní inženýrství",
          "DFAM",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Služby zakázkového 3D tisku a CAD modelování",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Zakázkový 3D tisk (FDM / FFF)",
                description:
                  "Kusová i sériová výroba plastových dílů z PETG a PLA (na vyžádání z ASA) ze souborů STEP, STL a 3MF.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Zakázkové CAD modelování a reverzní inženýrství",
                description:
                  "Tvorba 3D CAD modelů podle poškozeného vzorku, technického výkresu nebo náčrtu s optimalizací pevnosti.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Prototypovací balíček před sériovou výrobou",
                description:
                  "Výroba a doručení zkušebního fyzického vzorku k otestování rozměrů a funkčnosti před spuštěním hlavní série.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="cs"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {children}
        <OverlayScrollbar />
      </body>
    </html>
  );
}
