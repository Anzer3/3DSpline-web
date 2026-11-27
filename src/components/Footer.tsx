import Image from "next/image";
import Link from "next/link";
import { company, formatAddress, hasStreetAddress } from "@/lib/company";

const navLinks = [
  { href: "/3d-tisk-na-zakazku", label: "3D tisk na zakázku" },
  { href: "/cad-modelovani-na-miru", label: "3D modelování na míru" },
  { href: "/pribehy-z-dilny", label: "Příběhy z dílny" },
  { href: "/#jak-to-funguje", label: "Jak probíhá spolupráce" },
  { href: "/#prototyp-balicek", label: "Zkušební kus" },
  { href: "/#caste-dotazy", label: "Časté dotazy" },
  { href: "/#poptavka", label: "Poptávka" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-[#0F1E2E] text-slate-400 border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-28 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          {/* Značka */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="3D Spline"
                width={32}
                height={32}
                sizes="32px"
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white">3D Spline</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              Modeluju a 3D tisknu série na míru. Funkční díly z PETG i barevné medaile, poháry a
              dárky, od pár kusů po stovky.
            </p>
          </div>

          {/* Navigace */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Navigace</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-white">Kontakt</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="text-white">{company.founderName}</div>
              {company.operatorName.trim() !== "" && <div>{company.operatorName}</div>}
              {company.ico.trim() !== "" && <div>IČO: {company.ico}</div>}
              {company.dic.trim() !== "" && <div>DIČ: {company.dic}</div>}
              <div>{hasStreetAddress ? formatAddress() : company.address.city}</div>
              <div>
                <a
                  href={`mailto:${company.email}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Spodní lišta */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {company.brand}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/obchodni-podminky" className="hover:text-white transition-colors">
              Obchodní podmínky
            </Link>
            <Link href="/ochrana-osobnich-udaju" className="hover:text-white transition-colors">
              Ochrana osobních údajů
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Nahoru ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
