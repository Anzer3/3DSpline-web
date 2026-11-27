import FaqList from "@/components/FaqList";
import { homeFaqs } from "@/lib/faqJsonLd";

export default function FaqSection() {
  return (
    <section id="caste-dotazy" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="section-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Časté dotazy</h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Co od 3D tisku čekat, z čeho tisknu a co naopak netisknu.
          </p>
        </div>
        <div className="lg:col-span-8">
          <FaqList faqs={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
