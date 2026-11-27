import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3D tisk a modelování na míru | 3D Spline",
  description:
    "Zakázkový 3D tisk a modelování na míru pro firmy i jednotlivce. Od rychlé náhrady prasklého dílu a výrobních přípravků po sériovou výrobu z technických materiálů.",
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
      "Díly nejen tiskneme, ale také navrhujeme a upravujeme tak, aby vydržely reálný provoz a dávaly ekonomický smysl.",
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
        name: "3D Spline",
        image: "https://3dspline.cz/images/og-banner.png",
        logo: "https://3dspline.cz/images/logo_search_results.png",
        description:
          "Zakázkový 3D tisk a CAD modelování na míru pro firmy i jednotlivce. Od náhrady poškozeného kusu po stovkové série.",
        url: "https://3dspline.cz",
        email: "info@3dspline.cz",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Olomouc",
          addressCountry: "CZ",
        },
        areaServed: {
          "@type": "Country",
          name: "Česká republika",
        },
        priceRange: "$$",
        sameAs: ["https://www.instagram.com/3dspline.cz/"],
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
                  "Kusová i sériová výroba funkčních plastových dílů z materiálů PETG, PLA, ASA a TPU ze souborů STEP, STL a 3MF.",
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
      </body>
    </html>
  );
}
