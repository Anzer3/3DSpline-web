import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, ArrowUp } from "lucide-react";
import { company, formatAddress, hasStreetAddress } from "@/lib/company";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-[#0F1E2E] text-slate-400 border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="3D Spline"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                3D Spline
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Zakázkový 3D tisk a CAD konstrukce funkčních plastových dílů pro strojírenství, servisní údržbu a kusový i malosériový vývoj produktů.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram 3dspline.cz"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech">
              Navigace
            </h4>
            <ul className="space-y-1.5 text-xs font-tech text-slate-400">
              <li>
                <Link href="/#jak-to-funguje" className="hover:text-white transition-colors">
                  Průběh spolupráce
                </Link>
              </li>
              <li>
                <Link href="/3d-tisk-na-zakazku" className="hover:text-white transition-colors">
                  3D tisk na zakázku
                </Link>
              </li>
              <li>
                <Link href="/cad-modelovani-na-miru" className="hover:text-white transition-colors">
                  3D modelování na míru
                </Link>
              </li>
              <li>
                <Link href="/pribehy-z-dilny" className="hover:text-white transition-colors">
                  Příběhy z dílny
                </Link>
              </li>
              <li>
                <Link href="/#prototyp-balicek" className="hover:text-white transition-colors">
                  Zkušební prototyp
                </Link>
              </li>
              <li>
                <Link href="/#materialy" className="hover:text-white transition-colors">
                  Materiály (PETG, PLA, ASA)
                </Link>
              </li>
              <li>
                <Link href="/#caste-dotazy" className="hover:text-white transition-colors">
                  Časté dotazy &amp; Limity
                </Link>
              </li>
              <li>
                <Link href="/#poptavka" className="hover:text-white transition-colors">
                  Poptávka výroby
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech">
              Kontakt
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300 font-tech">
              <div className="text-white font-semibold">
                {company.operatorName.trim() !== "" ? `${company.operatorName} (${company.brand})` : company.brand}
              </div>
              {company.ico.trim() !== "" && <div>IČO: {company.ico}</div>}
              {company.dic.trim() !== "" && <div>DIČ: {company.dic}</div>}
              {hasStreetAddress && <div>{formatAddress()}</div>}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} 3D Spline • Všechna práva vyhrazena
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link
              href="/obchodni-podminky"
              className="text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Obchodní podmínky
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/ochrana-osobnich-udaju"
              className="text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Ochrana osobních údajů
            </Link>
            <span className="text-slate-700">•</span>
            <a
              href="#"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Nahoru</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
