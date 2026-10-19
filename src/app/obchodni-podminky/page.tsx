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
            Platné a účinné od 17. října 2026
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
                <div><strong>Zhotovitel:</strong> [Tvé Jméno a Příjmení] (podnikající pod značkou 3D Spline)</div>
                <div><strong>Sídlo:</strong> [Ulice a č.p.], [PSČ] Olomouc, Česká republika</div>
                <div><strong>IČO:</strong> [Doplň 8místné číslo po přidělení]</div>
                <div><strong>Zápis v evidenci:</strong> Fyzická osoba zapsaná v živnostenském rejstříku vedeném Magistrátem města Olomouce. Zhotovitel není plátcem DPH.</div>
                <div><strong>Kontaktní e-mail:</strong> <a href="mailto:info@3dspline.cz" className="text-blue-600 hover:underline">info@3dspline.cz</a></div>
                <div><strong>Web:</strong> https://3dspline.cz</div>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Objednatelem</strong> je fyzická osoba – spotřebitel (osoba jednající mimo rámec své podnikatelské činnosti) nebo podnikatel (fyzická či právnická osoba jednající v rámci své podnikatelské činnosti), která si u zhotovitele objednává zhotovení 3D dílů nebo konstrukční práce v CAD.
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
                  Zhotovitel na základě posouzení zaslaných podkladů kontaktuje objednatele zpět obvykle do 24 hodin. Poté na základě posouzení a domluvy stran bude zhotovitelem vypracována cenová nabídka a termín předběžného dodání.
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
                  Díly jsou vyráběny aditivní technologií FDM (nanášení roztaveného termoplastického vlákna po vrstvách, standardně z materiálů PLA a PETG).
                </li>
                <li>
                  <strong>Přirozené vlastnosti:</strong> Viditelnost tiskových vrstev, drobná povrchová mikrostruktura či stopy po tiskových podpěrách jsou běžnou technologickou vlastností FDM technologie a nepředstavují vadu dílu.
                </li>
                <li>
                  <strong>Výrobní tolerance:</strong> Běžná rozměrová přesnost FDM tisku se pohybuje v toleranci přibližně ±0,2 mm nebo ±0,5 % jmenovitého rozměru (v závislosti na geometrii, orientaci a smrštění materiálu). Požadavky na přesnější lícování je nutné konzultovat předem.
                </li>
                <li>
                  <strong>Teplotní odolnost:</strong> Objednatel je povinen respektovat mezní provozní teploty zvolených plastů (např. u běžného PLA dochází k měknutí již okolo 50–55 °C, u PETG okolo 75–80 °C).
                </li>
                <li>
                  <strong>Styk s potravinami a hygienické limity:</strong> Běžný FDM 3D tisk není technologií certifikovanou pro přímý styk s potravinami (food-safe). Mikrospáry mezi jednotlivými tiskovými vrstvami mohou zadržovat nečistoty a bakterie. Výrobky nejsou určeny pro přímý stravovací kontakt ani jako hračky pro děti do 3 let.
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
                  <strong>Nekomerční licence a ochranné známky:</strong> Zhotovitel neprovádí zakázkový tisk modelů šířených pod nekomerční licencí (např. Creative Commons Non-Commercial – CC-NC) ani tisk předmětů s chráněnými logy či ochrannými známkami třetích stran bez doloženého oprávnění držitele práv.
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
                7. Poučení o nemožnosti odstoupení od smlouvy (pro spotřebitele)
              </h2>
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 leading-relaxed space-y-2">
                <p>
                  <strong>Upozornění pro spotřebitele:</strong> Podle ustanovení § 1837 písm. d) zákona č. 89/2012 Sb., občanský zákoník, nemá spotřebitel právo odstoupit od smlouvy bez udání důvodu ve lhůtě 14 dnů u dodávky zboží, které bylo vyrobeno podle požadavků spotřebitele nebo přizpůsobeno jeho osobním potřebám (zakázkový 3D tisk na míru).
                </p>
                <p>
                  V případě zakázkového CAD modelování bez fyzického tisku spotřebitel akceptací cenové nabídky výslovně žádá, aby zhotovitel započal s plněním před uplynutím lhůty pro odstoupení od smlouvy, a bere na vědomí, že úplným poskytnutím služby nebo dodáním digitálního obsahu jeho právo na odstoupení od smlouvy zaniká (§ 1837 písm. a) a l) občanského zákoníku).
                </p>
              </div>
            </section>

            {/* 8. Warranty & Complaints */}
            <section className="border-b border-slate-100 pb-6">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                8. Odpovědnost za vady a reklamace (rozděleno na B2B a B2C)
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>
                  Objednatel je povinen zkontrolovat dodané díly a obal zásilky bezprostředně při převzetí od přepravce.
                </li>
                <li>
                  <strong>Reklamace u podnikatelů (B2B):</strong> Je-li objednatelem podnikatel, je povinen zjevné vady (poškození při přepravě, chybějící kusy, rozměrová neshoda mimo toleranci) vytknout písemně na e-mail info@3dspline.cz nejpozději do 5 pracovních dnů od převzetí dílů, včetně fotodokumentace, jinak právo z odpovědnosti za tyto vady zaniká.
                </li>
                <li>
                  <strong>Reklamace u spotřebitelů (B2C):</strong> Je-li objednatelem spotřebitel, může vytknout vadu, která se na věci projeví v době 24 měsíců od převzetí. Zhotovitel vydá spotřebiteli písemné potvrzení o tom, kdy právo uplatnil, co je obsahem reklamace a jaký způsob vyřízení požaduje. Reklamace včetně odstranění vady bude vyřízena a spotřebitel o tom bude informován nejpozději do 30 dnů ode dne uplatnění reklamace, pokud se strany nedohodnou na delší lhůtě.
                </li>
                <li>
                  Zhotovitel neodpovídá za vady vzniklé běžným opotřebením, nesprávným užíváním dílu, mechanickým přetížením nad rámec vlastností materiálu nebo vystavením vyšším teplotám, než pro jaké je daný polymer určen.
                </li>
                <li>
                  <strong>Odpovědnost za vhodné použití a otestování:</strong> Objednatel bere na vědomí, že díly jsou dodávány pro prototypové a technické účely. Finální ověření funkčnosti, nosnosti a bezpečnosti v reálném zařízení před ostrým nasazením do provozu je plně v odpovědnosti objednatele.
                </li>
                <li>
                  <strong>Vyloučené a kritické aplikace:</strong> Zhotovitel nenese odpovědnost za škody způsobené použitím dílů v kritických aplikacích (zdravotnictví, implantáty, letectví, kritické bezpečnostní systémy motorových vozidel apod.). Zhotovitel z bezpečnostních a zákonných důvodů v žádném případě nepřijímá zakázky na zbraně, tlumiče či hlavní části střelných zbraní.
                </li>
                <li>
                  V případě oprávněné reklamace zhotovitel přednostně zajistí bezplatnou opravu nebo zhotovení náhradního kusu v nejkratším možném termínu.
                </li>
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
          &copy; {new Date().getFullYear()} 3D Spline • Olomouc
        </div>
      </footer>
    </div>
  );
}
