import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { company, operatorRows } from "@/lib/company";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů (GDPR) | 3D Spline",
  description:
    "Informace o zpracování a ochraně osobních údajů v souladu s nařízením GDPR pro web 3dspline.cz.",
  alternates: {
    canonical: "/ochrana-osobnich-udaju",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#0F1E2E] border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
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
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              3D Spline
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zpět na hlavní stranu</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 text-blue-600 mb-3">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              Ochrana soukromí a GDPR
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Zásady zpracování osobních údajů
          </h1>
          <p className="text-xs text-slate-500 mb-8">
            Platné a účinné od 17. října 2026 • Web 3dspline.cz
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-slate-700">
            {/* Section 1: Controller */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                1. Správce osobních údajů
              </h2>
              <p className="mb-3">
                Správcem osobních údajů podle čl. 4 bod 7 Nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen <strong>„GDPR“</strong>) je:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-1.5 text-slate-800">
                {operatorRows().map((row) => (
                  <div key={row.label}><strong>{row.label}:</strong> {row.value}</div>
                ))}
                <div><strong>Kontaktní e-mail:</strong> <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></div>
                <div><strong>Web:</strong> {company.web}</div>
              </div>
            </section>

            {/* Section 2: Scope of Data */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                2. Jaké osobní údaje zpracováváme
              </h2>
              <p className="mb-2">
                Zpracováváme pouze údaje, které nám sami dobrovolně poskytnete při odeslání nezávazné poptávky prostřednictvím webového formuláře nebo e-mailové komunikace:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li><strong>Kontaktní údaje:</strong> jméno (pokud ho vyplníte) a e-mailová adresa pro zaslání odpovědi a technického posouzení poptávky.</li>
                <li><strong>Poptávková a zakázková data:</strong> technický popis poptávaného dílu, požadovaný materiál, počet kusů, případně nahrávané přílohy (3D modely ve formátech STEP, STL, výkresy, fotografie či náčrty).</li>
                <li><strong>Technické údaje:</strong> IP adresa odesílatele a čas odeslání formuláře (ochrana proti spamu a zneužití).</li>
              </ul>
              <p className="mt-2 text-xs text-slate-600">
                Poskytnutí e-mailu je dobrovolné, bez něj však poptávku nelze vyřídit a zaslat odpověď. Neprobíhá automatizované rozhodování ani profilování.
              </p>
            </section>

            {/* Section 3: Legal Basis & Purpose */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                3. Účel a právní základ zpracování
              </h2>
              <p className="mb-2">
                Vaše osobní údaje zpracováváme na základě následujících právních titulů:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong>Jednání o smlouvě a plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR):</strong> Zpracování je nezbytné pro posouzení vyrobitelnosti, vypracování cenové kalkulace, technickou konzultaci a následnou výrobu 3D dílů a jejich doručení.
                </li>
                <li>
                  <strong>Plnění právních povinností (čl. 6 odst. 1 písm. c) GDPR):</strong> V případě realizace zakázky zpracováváme fakturační údaje pro účely vedení účetnictví a plnění daňových povinností podle českých zákonů.
                </li>
                <li>
                  <strong>Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR):</strong> Ochrana našich právních nároků (např. řešení případných reklamací či sporů) a ochrana bezpečnosti webové aplikace (např. rate limiting proti zneužití a útokům).
                </li>
              </ul>
            </section>

            {/* Section 4: Retention */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                4. Doba uchovávání údajů
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>Údaje z nezávazných poptávek, které nevedly k uzavření zakázky, uchováváme po dobu maximálně 12 měsíců pro případné navázání na předchozí komunikaci, poté jsou smazány.</li>
                <li>Údaje související s realizovanou zakázkou uchováváme po dobu stanovenou příslušnými právními předpisy (např. zákon o účetnictví – 5 až 10 let).</li>
                <li>Zaslané 3D modely a konstrukční podklady považujeme za důvěrné a nesdílíme je s třetími stranami. Přílohy z poptávek, které nevedly k zakázce, mažeme nejpozději po 12 měsících.</li>
                <li>IP adresy a technické záznamy uchováváme jen po dobu nezbytnou pro zabezpečení webu a ochranu proti zneužití, nejdéle však 12 měsíců.</li>
              </ul>
            </section>

            {/* Section 5: Recipients */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                5. Kdo má k údajům přístup (Příjemci údajů)
              </h2>
              <p className="mb-2">
                Vaše osobní údaje nikomu neprodáváme ani nepředáváme k marketingovým účelům. Přístup k nim mají pouze prověření poskytovatelé nezbytných technických a provozních služeb:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>Poskytovatel webhostingu a serverové infrastruktury (Cloudflare, Inc.).</li>
                <li>Poskytovatel e-mailových služeb pro doručování zpráv (Seznam.cz, a.s.).</li>
                <li>Služba Resend (Plus Five Five, Inc., USA) pro odeslání poptávky z webového formuláře a potvrzení o jejím přijetí, včetně přiložených souborů.</li>
                <li>Doručovací a spediční služby (např. Zásilkovna, DPD, PPL, Česká pošta) výhradně v rozsahu jména, adresy a telefonu pro doručení fyzického balíčku se zakázkou.</li>
              </ul>
              <p className="mt-2 text-xs text-slate-500">
                Data zpracováváme přednostně na území Evropské unie (EU / EHP). Někteří poskytovatelé technických služeb (např. webhosting) mohou být součástí mezinárodních společností; případný přenos údajů mimo EU se v takovém případě řídí zákonnými mechanismy ochrany (zejména standardními smluvními doložkami nebo rozhodnutím o odpovídající ochraně).
              </p>
            </section>

            {/* Section 6: Cookies */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                6. Soubory Cookies a sledovací nástroje
              </h2>
              <p className="mb-2">
                Web <strong>3dspline.cz nepoužívá žádné analytické, reklamní ani marketingové cookies třetích stran</strong> (např. Google Analytics, Meta Pixel).
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                K sledování návštěvníků nepoužíváme žádné cookies. Ochrana formuláře proti zneužití (omezení počtu odeslání) pracuje s krátkodobým zpracováním IP adresy, nikoli s cookies. Pokud by byly použity technicky nezbytné cookies, není pro ně podle zákona vyžadován souhlas návštěvníka.
              </p>
            </section>

            {/* Section 7: User Rights */}
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">
                7. Vaše práva podle GDPR
              </h2>
              <p className="mb-2">Jako subjekt údajů máte podle GDPR právo:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm mb-4">
                <li>Požadovat přístup k vašim osobním údajům a kopii těchto údajů.</li>
                <li>Požadovat opravu nepřesných nebo neúplných údajů.</li>
                <li>Požadovat výmaz osobních údajů (právo „být zapomenut“), pokud již nejsou potřebné pro stanovený účel nebo pokud odpadl právní důvod.</li>
                <li>Požadovat omezení zpracování.</li>
                <li>Získat své údaje ve strukturovaném a strojově čitelném formátu (právo na přenositelnost údajů), pokud je zpracováváme na základě smlouvy.</li>
                <li>Vznést námitku proti zpracování na základě oprávněného zájmu.</li>
                <li>Podat stížnost u dozorového úřadu, kterým je v ČR <strong>Úřad pro ochranu osobních údajů</strong> (Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz).</li>
              </ul>

              <p className="text-xs text-slate-600">
                V případě jakýchkoliv dotazů nebo uplatnění svých práv nás můžete kdykoliv kontaktovat na e-mailu{" "}
                <a href="mailto:info@3dspline.cz" className="text-blue-600 font-semibold hover:underline">
                  info@3dspline.cz
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4">
          &copy; {new Date().getFullYear()} 3D Spline • Olomouc •{" "}
          <Link href="/obchodni-podminky" className="hover:text-slate-900 underline-offset-2 hover:underline">
            Obchodní podmínky
          </Link>{" "}
          •{" "}
          <Link href="/ochrana-osobnich-udaju" className="hover:text-slate-900 underline-offset-2 hover:underline">
            Ochrana osobních údajů
          </Link>
        </div>
      </footer>
    </div>
  );
}
