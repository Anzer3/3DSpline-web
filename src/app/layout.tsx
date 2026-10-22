import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ProjectNoticeBanner from "@/components/ProjectNoticeBanner";

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
  title: "3D Spline | 3D tisk a modelování na míru",
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
    title: "3D Spline | 3D tisk a modelování na míru",
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
    title: "3D Spline | 3D tisk a modelování na míru",
    description: "Zakázkový 3D tisk a modelování na míru pro firmy i jednotlivce.",
    images: ["/images/og-banner.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
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
        logo: "https://3dspline.cz/images/logo.png",
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
      {
        "@type": "FAQPage",
        "@id": "https://3dspline.cz/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Mohu si nechat vytisknout model stažený z internetu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ano, pokud to licenční podmínky autora umožňují (např. licence Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Nelze tisknout modely šířené pod licencí Non-Commercial (NC), chráněná loga automobilek ani franšízové postavičky bez doložené licence držitele autorských práv.",
            },
          },
          {
            "@type": "Question",
            name: "Jak se FDM 3D tisk liší od sériového vstřikolisu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Díly vznikají nanášením plastového vlákna po mikroskopických vrstvách (obvykle 0,16 až 0,28 mm). Na povrchu je vidět jemná vrstvená struktura a díl není zrcadlově hladký jako z formy. Při správném návrhu a orientaci tiskových vláken však nabízí vynikající pevnost a umožňuje výrobu od 1 ks bez statisícových nákladů na vstřikovací formu.",
            },
          },
          {
            "@type": "Question",
            name: "Vydrží díl v létě v autě nebo na přímém slunci?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Záleží na zvoleném materiálu. Běžné PLA začíná měknout už kolem 50–55 °C, proto je v létě na palubní desce či za sklem nevhodné. Pro automobilové a venkovní aplikace tiskneme z houževnatého PETG (do ~75–80 °C) nebo UV-stabilního ASA (do ~95 °C), které odolá i horkému letnímu slunci.",
            },
          },
          {
            "@type": "Question",
            name: "Jsou výtisky vhodné pro styk s potravinami či dětské hračky?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Standardní FDM tisk není hygienicky certifikovaný pro přímý styk s jídlem. Mezi jednotlivými mikroskopickými vrstvami se mohou usazovat nečistoty a bakterie, které nelze běžným mytím spolehlivě odstranit. Naše výrobky proto nedodáváme pro potravinářské účely ani jako hračky pro nejmenší děti.",
            },
          },
          {
            "@type": "Question",
            name: "Za co ručíte a co je na odpovědnosti zákazníka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ručíme za bezchybné zhotovení dle dodaných CAD podkladů, dodržení tolerancí (obvykle ±0,2 mm) a použití kvalitních značkových filamentů. Vzhledem k různorodosti namáhání a provozních prostředí nese finální odpovědnost za otestování a bezpečnost nasazení dílu zákazník. K tomuto účelu nabízíme předvýrobní prototypový vzorek.",
            },
          },
          {
            "@type": "Question",
            name: "Jaké zakázky z principu nepřijímáte?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Z bezpečnostních a právních důvodů netiskneme zbraně, tlumiče, pyrotechnické a funkční prvky střeliva, zdravotnické náhrady či implantáty, ani padělky chráněných ochranných známek bez písemného oprávnění majitele.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="cs" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <ProjectNoticeBanner />
        {children}
      </body>
    </html>
  );
}
