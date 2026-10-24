import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechSpecs from "@/components/TechSpecs";
import { faqJsonLd } from "@/lib/faqJsonLd";
import CadModelingSection from "@/components/CadModelingSection";
import HasModelSection from "@/components/HasModelSection";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Materials from "@/components/Materials";
import PrototypeBeforeSeries from "@/components/PrototypeBeforeSeries";
import InquiryForm from "@/components/InquiryForm";
import WhyUs from "@/components/WhyUs";
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

      {/* Sticky Top Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* SECTION A: Hero Section */}
        <Hero />

        {/* SECTION A2: Technical Capabilities & Specs */}
        <TechSpecs />

        {/* SECTION B2: Zakázkové CAD modelování od jednoduchých po atypické díly ("Nemám model") */}
        <CadModelingSection />

        {/* SECTION B3: Výroba z dodaných dat ("Mám model. Potřebuji jen tisk") */}
        <HasModelSection />

        {/* SECTION C: Případové studie a ukázky realizací (#pripadove-studie) */}
        <Portfolio />

        {/* SECTION F: How Collaboration & Pricing Works (#jak-to-funguje) */}
        <Process />

        {/* SECTION E: Materials (#materialy) */}
        <Materials />

        {/* SECTION B4: Nejprve prototyp a potom sériovka (#prototyp-balicek) */}
        <PrototypeBeforeSeries />

        {/* SECTION G: Interactive Two-Branch Inquiry Form (#poptavka) */}
        <InquiryForm />

        {/* SECTION D: Why Choose 3dspline.cz */}
        <WhyUs />

        {/* SECTION FAQ: Často kladené otázky a limity FDM tisku (#caste-dotazy) */}
        <FaqSection />
      </main>

      {/* Floating CTA bar on mobile */}
      <MobileFloatingCta />

      {/* SECTION H: Footer */}
      <Footer />
    </div>
  );
}
