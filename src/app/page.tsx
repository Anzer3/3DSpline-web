import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechSpecs from "@/components/TechSpecs";
import CadModelingSection from "@/components/CadModelingSection";
import HasModelSection from "@/components/HasModelSection";
import PrototypeBeforeSeries from "@/components/PrototypeBeforeSeries";
import WhyUs from "@/components/WhyUs";
import Materials from "@/components/Materials";
import Process from "@/components/Process";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileFloatingCta from "@/components/MobileFloatingCta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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

        {/* SECTION F: How Collaboration & Pricing Works (#jak-to-funguje) */}
        <Process />

        {/* SECTION B4: Nejprve prototyp a potom sériovka */}
        <PrototypeBeforeSeries />

        {/* SECTION E: Materials (#materialy) */}
        <Materials />

        {/* SECTION D: Why Choose 3dspline.cz */}
        <WhyUs />

        {/* SECTION G: Interactive Two-Branch Inquiry Form (#poptavka) */}
        <InquiryForm />
      </main>

      {/* Floating CTA bar on mobile */}
      <MobileFloatingCta />

      {/* SECTION H: Footer */}
      <Footer />
    </div>
  );
}
