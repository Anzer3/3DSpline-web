import Link from "next/link";
import { ArrowLeft, ArrowRight, FileSearch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-lg w-full text-center bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <FileSearch className="w-6 h-6" />
          </div>

          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2">
            Chyba 404
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Tato stránka nebyla nalezena
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
            Odkaz pravděpodobně již neplatí nebo došlo k překlepu v adrese. Můžete přejít na hlavní stránku nebo rovnou odeslat nezávaznou poptávku.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zpět na úvod</span>
            </Link>

            <Link
              href="/#poptavka"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <span>Nezávazně poptat výrobu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
