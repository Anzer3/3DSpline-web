import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { faqJsonLd } from "@/lib/faqJsonLd";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import InquiryForm from "@/components/InquiryForm";
import About from "@/components/About";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* Rozcestí: Nemáte model / Máte model + co nejčastěji vyrábím (#sluzby) */}
        <Services />

        {/* Příběhy z dílny (#pribehy-z-dilny) */}
        <Portfolio />

        {/* Jak probíhá spolupráce + zkušební kus (#jak-to-funguje, #prototyp-balicek) */}
        <Process />

        {/* Kdo za tím stojí (#kdo-za-tim-stoji) */}
        <About />

        {/* Poptávkový formulář (#poptavka) */}
        <InquiryForm />

        {/* Časté dotazy (#caste-dotazy) */}
        <FaqSection />
      </main>

      {/* Plovoucí lišta s poptávkou na mobilu */}
      <MobileFloatingCta />

      <Footer />
    </div>
  );
}
