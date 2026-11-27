import Image from "next/image";
import Link from "next/link";
import {
  acceptingInquiries,
  company,
  formatAddress,
  hasStreetAddress,
  informativeNotice,
} from "@/lib/company";

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
    <footer id="kontakt" className="bg-[#0F1E2E] text-slate-400 border-t-2 border-blue-600 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 sm:pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-6 border-b border-slate-800">
          {/* Značka */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="3D Spline"
                width={28}
                height={28}
                sizes="28px"
                className="w-7 h-7 object-contain"
              />
              <span className="text-base font-bold tracking-tight text-white">3D Spline</span>
            </div>
            <p className="mt-2.5 text-[13px] text-slate-400 leading-relaxed max-w-sm">
              Modeluju a 3D tisknu série na míru. Funkční díly z PETG i barevné medaile, poháry a
              dárky, od pár kusů po stovky.
            </p>
          </div>

          {/* Navigace */}
          <div className="lg:col-span-5">
            <h2 className="text-sm font-semibold text-white">Navigace</h2>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Kontakt</h2>
            <div className="mt-2.5 space-y-1 text-[13px]">
              <div className="text-white">{company.founderName}</div>
              {company.operatorName.trim() !== "" && <div>{company.operatorName}</div>}
              {company.ico.trim() !== "" && <div>IČO: {company.ico}</div>}
              {company.dic.trim() !== "" && <div>DIČ: {company.dic}</div>}
              <div>{hasStreetAddress ? formatAddress() : company.address.city}</div>
              <div>
                <a
                  href={`mailto:${company.email}`}
                  className="link-underline text-blue-400 hover:text-blue-300 transition-colors"
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

        {!acceptingInquiries && <p className="pt-4 text-xs text-slate-300">{informativeNotice}</p>}

        {/* Spodní lišta */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
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
