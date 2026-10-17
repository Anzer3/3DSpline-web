import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky zakázkové výroby | 3D Spline",
  description:
    "Všeobecné obchodní podmínky pro zakázkový 3D tisk a CAD konstrukci dílů na webu 3dspline.cz.",
};

export default function TermsAndConditionsPage() {
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
            <FileText className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              Všeobecné obchodní podmínky (VOP)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Obchodní podmínky zakázkové výroby
          </h1>
          <p className="text-xs text-slate-500 mb-8">
            Platné a účinné od 17. října 2026 • Web 3dspline.cz
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-slate-700">
            {/* 1. Identification */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                1. Úvodní ustanovení a zhotovitel
              </h2>
              <p className="mb-3">
                Tyto Všeobecné obchodní podmínky (dále jen <strong>„VOP“</strong>) upravují práva a povinnosti smluvních stran vznikající v souvislosti se zakázkovým 3D tiskem a CAD konstrukcí dílů poskytovanými zhotovitelem:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-1.5 text-slate-800 mb-3">
                <div><strong>Zhotovitel:</strong> Tomáš Řezníček (3D Spline)</div>
                <div><strong>Sídlo:</strong> Olomouc, Česká republika</div>
                <div><strong>IČO:</strong> V procesu zápisu (bude doplněno po přidělení)</div>
                <div><strong>Kontaktní e-mail:</strong> <a href="mailto:info@3dspline.cz" className="text-blue-600 hover:underline">info@3dspline.cz</a></div>
                <div><strong>Web:</strong> https://3dspline.cz</div>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Objednatelem</strong> je fyzická nebo právnická osoba, která si u zhotovitele objednává výrobu 3D dílů nebo konstrukční práce v CAD.
              </p>
            </section>

            {/* 2. Order Process */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                2. Poptávka, cenová nabídka a uzavření smlouvy
              </h2>
              <ul className="list-decimal pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>
                  Odeslání poptávky prostřednictvím webového formuláře na 3dspline.cz nebo e-mailem je nezávazné.
                </li>
                <li>
                  Zhotovitel na základě posouzení zaslaných podkladů (3D model, výkres, nákres či popis) vypracuje individuální cenovou a termínovou nabídku, kterou zašle objednateli e-mailem (obvykle do 24 hodin).
                </li>
                <li>
                  Cenová nabídka má platnost 14 kalendářních dnů od jejího odeslání, pokud není uvedeno jinak.
                </li>
                <li>
                  Smlouva o dílo je uzavřena okamžikem, kdy objednatel zašle zhotoviteli písemné (e-mailové) potvrzení akceptace cenové nabídky.
                </li>
              </ul>
            </section>

            {/* 3. Prototyping Package */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                3. Prototypovací balíček a schválení před sériovou výrobou
              </h2>
              <p className="mb-2">
                V zájmu předcházení neshodám nabízí zhotovitel možnost zhotovení <strong>Prototypovacího balíčku (zkušebního vzorku)</strong> před spuštěním sériové výroby:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Objednatel v takovém případě nejprve uhradí zhotovení a zaslání 1 ks funkčního prototypu.</li>
                <li>Objednatel je povinen vzorek fyzicky přezkoušet (rozměry, lícování, mechanickou funkci v reálném zařízení).</li>
                <li>Písemným odsouhlasením prototypu objednatel potvrzuje správnost návrhu a dává pokyn ke zhotovení dohodnuté série.</li>
                <li>Zhotovitel nenese odpovědnost za rozměrové či konstrukční vady sériových kusů, pokud tyto vady existovaly již na schváleném prototypu a objednatel je neoznámil.</li>
              </ul>
            </section>

            {/* 4. Technological Specifics */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                4. Technologická specifika 3D tisku FDM a tolerance
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>
                  Díly jsou vyráběny aditivní technologií FDM (nanášení roztaveného termoplastického vlákna po vrstvách, např. PETG, PLA, ASA).
                </li>
                <li>
                  <strong>Přirozené vlastnosti:</strong> Viditelnost tiskových vrstev, drobná povrchová mikrostruktura či stopy po tiskových podpěrách jsou běžnou technologickou vlastností FDM technologie a nepředstavují vadu dílu.
                </li>
                <li>
                  <strong>Výrobní tolerance:</strong> Běžná rozměrová přesnost FDM tisku se pohybuje v toleranci přibližně ±0,2 mm nebo ±0,5 % jmenovitého rozměru (v závislosti na geometrii, orientaci a smrštění materiálu). Požadavky na přesnější lícování je nutné konzultovat předem.
                </li>
                <li>
                  <strong>Teplotní odolnost:</strong> Objednatel je povinen respektovat mezní provozní teploty zvolených plastů (např. běžné PLA do cca 55 °C, PETG do cca 75–80 °C).
                </li>
              </ul>
            </section>

            {/* 5. Copyright & Data */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                5. Práva k podkladům a autorská práva
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>
                  Objednatel odesláním podkladů (3D model, výkres) prohlašuje, že je oprávněn s těmito daty nakládat a že jejich výrobou nedochází k porušení autorských práv, patentů, průmyslových vzorů ani práv třetích stran.
                </li>
                <li>
                  V případě, že zhotovitel pro objednatele provádí CAD modelování či konstrukční návrh, přechází nevýhradní licence k užití vytvořeného 3D modelu na objednatele okamžikem úplného zaplacení ceny díla.
                </li>
                <li>
                  Zhotovitel se zavazuje zachovávat mlčenlivost o všech technických a výrobních informacích objednatele. Na žádost objednatele je možné předem uzavřít samostatnou Dohodu o mlčenlivosti (NDA).
                </li>
              </ul>
            </section>

            {/* 6. Price & Payment */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                6. Cena díla, platba a dodání
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Konečná cena je stanovena v odsouhlasené cenové nabídce.</li>
                <li>Platba probíhá bankovním převodem na základě vystavené faktury. U větších zakázek nebo nových zákazníků je zhotovitel oprávněn požadovat zálohovou platbu před zahájením tisku.</li>
                <li>Hotové díly jsou doručovány prostřednictvím spolehlivých kurýrních služeb po celé ČR (Zásilkovna, DPD, PPL) nebo po dohodě osobním předáním v Olomouci.</li>
              </ul>
            </section>

            {/* 7. Right of Withdrawal for Consumers */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                7. Poučení o nemožnosti odstoupení od smlouvy u zakázkového zboží
              </h2>
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 leading-relaxed">
                <strong>Upozornění pro spotřebitele:</strong> Podle ustanovení § 1837 písm. d) zákona č. 89/2012 Sb., občanský zákoník, <strong>nemá spotřebitel právo odstoupit od smlouvy bez udání důvodu ve lhůtě 14 dnů</strong>, jelikož se jedná o dodávku zboží, které bylo vyrobeno podle požadavků spotřebitele nebo přizpůsobeno jeho osobním potřebám (zakázkový 3D tisk a CAD modelování na míru).
              </div>
            </section>

            {/* 8. Warranty & Complaints */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                8. Odpovědnost za vady a reklamace
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Objednatel je povinen zkontrolovat dodané díly bez zbytečného odkladu po jejich doručení.</li>
                <li>Zjevné vady (poškození při přepravě, chybějící kusy či zásadní geometrická neshoda s odsouhlaseným modelem) je objednatel povinen vytknout písemně na e-mail info@3dspline.cz do 5 pracovních dnů od převzetí dílů, včetně fotodokumentace.</li>
                <li>Zhotovitel neodpovídá za vady vzniklé nesprávným užíváním dílu, přetížením nad rámec vlastností materiálu nebo vystavením vyšším teplotám, než pro jaké je materiál určen.</li>
                <li>V případě oprávněné reklamace zhotovitel přednostně zajistí bezplatnou opravu nebo zhotovení náhradního kusu v nejkratším možném termínu.</li>
              </ul>
            </section>

            {/* 9. Final Provisions */}
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">
                9. Závěrečná ustanovení
              </h2>
              <p className="mb-2 text-xs sm:text-sm text-slate-600">
                Veškeré právní vztahy se řídí právním řádem České republiky, zejména zákonem č. 89/2012 Sb., občanský zákoník. Případné spory mezi zhotovitelem a spotřebitelem lze řešit také mimosoudně prostřednictvím České obchodní inspekce (www.coi.cz).
              </p>
              <p className="text-xs text-slate-500">
                Tyto obchodní podmínky nabývají platnosti a účinnosti dnem 17. října 2026.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4">
          &copy; {new Date().getFullYear()} 3D Spline • Tomáš Řezníček • Olomouc
        </div>
      </footer>
    </div>
  );
}
