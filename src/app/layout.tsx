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
  title: "3D Spline | Funkční 3D tisk a CAD konstrukce dílů pro firmy",
  description:
    "Zakázkový 3D tisk a CAD modelování funkčních dílů pro firmy i průmysl. Od rychlé náhrady prasklého dílu a výrobních přípravků po sériovou výrobu z konstrukčního PETG a PLA. Rychlé doručení po celé ČR.",
  keywords: [
    "3D Spline",
    "zakázkový 3D tisk",
    "3D tisk firmy",
    "CAD modelování",
    "výrobní přípravky 3D tisk",
    "náhradní díly 3D tisk",
    "reverzní inženýrství",
    "konstrukční PETG",
    "technické PLA",
    "3D tisk celá ČR",
    "3dspline.cz",
  ],
  authors: [{ name: "3D Spline", url: "https://3dspline.cz" }],
  creator: "3D Spline",
  metadataBase: new URL("https://3dspline.cz"),
  openGraph: {
    title: "3D Spline | Funkční 3D tisk a CAD konstrukce dílů pro firmy",
    description:
      "Díly nejen tiskneme, ale v CADu upravujeme tak, aby vydržely reálný provoz a dávaly ekonomický smysl. Rychlé doručení po celé ČR.",
    url: "https://3dspline.cz",
    siteName: "3D Spline",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/images/hero-cad.jpg",
        width: 1200,
        height: 630,
        alt: "3dspline.cz - CAD konstrukce a zakázkový 3D tisk",
      },
    ],
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
  return (
    <html lang="cs" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
