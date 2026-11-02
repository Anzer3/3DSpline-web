export type InquiryTabKey = "model" | "drawing";

/**
 * Obsahové bloky podstránky. Každá služba si je skládá po svém,
 * takže stránky nejsou kopie jedné šablony.
 */
export type Block =
  /** Nadpis + odstavce, volitelně boční karta (např. „Co poslat“) */
  | {
      type: "prose";
      title: string;
      paragraphs: string[];
      aside?: { title: string; items: string[] };
    }
  /** Text vedle fotky */
  | {
      type: "split";
      title: string;
      paragraphs: string[];
      image: string;
      imageAlt: string;
      reverse?: boolean;
    }
  /** Seznam: "rows" = řádky štítek + text, "steps" = očíslované kroky */
  | {
      type: "list";
      variant: "rows" | "steps";
      title: string;
      intro?: string;
      items: { title: string; text: string }[];
    }
  /** Srovnávací tabulka */
  | {
      type: "table";
      title: string;
      intro?: string;
      columns: string[];
      rows: string[][];
      note?: string;
    }
  /** Galerie náhledů modelů */
  | {
      type: "gallery";
      title: string;
      intro?: string;
      items: { src: string; title: string; caption: string }[];
    }
  /** Upřímné limity - tmavá sekce */
  | {
      type: "limits";
      title: string;
      intro?: string;
      items: { title: string; text: string }[];
    };

export interface Service {
  /** URL slug, stránka je dostupná na /{slug} */
  slug: string;
  /** Krátký název do menu, karet a odkazů */
  name: string;
  /** Titulek stránky (H1) */
  h1: string;
  /** Krátká věta nad H1 - situace, ve které se zákazník nachází */
  kicker: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Krátký popis (odkazy na jiné služby) */
  cardText: string;
  /** Úvodní odstavec pod H1 */
  lead: string;
  /** Obrázek na dlaždici na hlavní stránce */
  image: string;
  imageAlt: string;
  /** Jiný obrázek v úvodu podstránky (jinak se použije `image`) */
  heroImage?: string;
  heroImageAlt?: string;
  /** Předvybraná záložka v poptávkovém formuláři */
  tab: InquiryTabKey;
  prototypePackage?: boolean;
  ctaLabel: string;
  /** Pruh s klíčovými údaji pod úvodem */
  facts: { label: string; value: string }[];
  blocks: Block[];
  faqs: { question: string; answer: string }[];
  /** Závěrečná výzva před formulářem */
  closing: { title: string; text: string };
}

export const services: Service[] = [
  {
    slug: "3d-tisk-na-zakazku",
    name: "3D tisk na zakázku",
    h1: "Zakázkový 3D tisk z vašich modelů",
    kicker: "Máte hotový 3D model a hledáte spolehlivou výrobu",
    metaTitle: "Zakázkový 3D tisk z vašich modelů | 3D Spline",
    metaDescription:
      "Zakázkový 3D tisk ze souborů STEP, STL a 3MF. Kusová i malosériová výroba z PETG, PLA, ASA a TPU. Zkušební vzorek před sérií a doručení po celé ČR.",
    keywords: [
      "zakázkový 3D tisk",
      "3D tisk na zakázku",
      "3D tisk z STL",
      "sériový 3D tisk",
      "FDM tisk",
      "3D tisk PETG",
    ],
    cardText:
      "Máte hotový model? Vytiskneme ho kusově i v sérii z technických materiálů.",
    lead: "Pošlete nám STEP, STL nebo 3MF a my se postaráme o přesnou výrobu. Tiskneme od jediného prototypu až po série stovek kusů. Před spuštěním tiskárny model vždy zkontrolujeme, doporučíme vhodný filament a u větších zakázek pošleme zkušební kus k fyzickému ověření.",
    image: "/portfolio/seriovka.jpg",
    imageAlt: "Sériový 3D tisk funkčních dílů na tiskové podložce",
    tab: "model",
    ctaLabel: "Poptat 3D tisk",
    facts: [
      { label: "Formáty", value: "STEP, STL, 3MF" },
      { label: "Materiály", value: "PETG, PLA, ASA, TPU" },
      { label: "Tiskový prostor", value: "250 × 250 × 250 mm" },
      { label: "Tolerance", value: "obvykle ±0,2 mm" },
    ],
    blocks: [
      {
        type: "split",
        title: "Kusová výroba i malosérie bez drahých forem",
        paragraphs: [
          "Tiskneme prověřenou technologií FDM (nanášení roztaveného termoplastu po vrstvách, typicky 0,16 až 0,28 mm). Protože odpadá nutnost vyrábět nákladné formy nebo speciální nástroje, dává 3D tisk ekonomický smysl už od jednoho jediného kusu.",
          "Pokud potřebujete desítky nebo stovky kusů, naskládáme díly na tiskovou podložku tak, aby byl proces co nejefektivnější. Výsledné díly mají jemnou vrstvenou strukturu, ale při správné orientaci vláken nabízejí skvělou mechanickou pevnost a odolnost.",
        ],
        image: "/images/print-plate.jpg",
        imageAlt: "Tiskárna a podložka plná právě vytištěných technických dílů",
      },
      {
        type: "table",
        title: "Přehled používaných materiálů",
        intro:
          "Materiál vždy vybíráme podle prostředí, ve kterém bude díl pracovat. Uvedené teploty představují orientační limity tvarové stálosti.",
        columns: ["Materiál", "Ideální použití", "Teplotní limit", "Vlastnosti a poznámka"],
        rows: [
          [
            "PLA",
            "Vizuální modely, prototypy tvaru, interiérové doplňky",
            "do cca 50–55 °C",
            "Skvělá detailnost a čistý povrch. Není vhodný na přímé slunce ani za sklo auta.",
          ],
          [
            "PETG",
            "Technické součásti, funkční držáky, mechanické přípravky",
            "do cca 75–80 °C",
            "Houževnatý, odolný proti rázům a chemikáliím. Náš nejpoužívanější technický plast.",
          ],
          [
            "ASA",
            "Venkovní aplikace, díly do auta, na motocykly a stroje",
            "do cca 95 °C",
            "Vysoká UV stabilita, snáší přímé sluneční záření, déšť i vyšší letní teploty.",
          ],
          [
            "TPU",
            "Pružné díly, tlumicí dorazy, ochranné návleky a těsnění",
            "–",
            "Flexibilní pryžový termoplast, který snese deformaci a vrací se do původního tvaru.",
          ],
        ],
        note: "Nejste si jistí volbou? V poptávce popište, k čemu díl slouží, a vhodný materiál vám doporučíme.",
      },
      {
        type: "list",
        variant: "rows",
        title: "Co nám poslat k poptávce",
        intro: "Čím přesnější informace v úvodu máme, tím rychleji vám pošleme nezávaznou kalkulaci a termín.",
        items: [
          {
            title: "3D model",
            text: "Soubor ve formátu STEP (nejlepší pro přesnost), případně STL nebo 3MF. Pokud potřebujete model ještě upravit, je STEP ideální.",
          },
          {
            title: "Počet kusů",
            text: "Stačí orientačně – ať víme, jestli připravujeme kalkulaci na 1 prototyp, desítky nebo stovky kusů.",
          },
          {
            title: "Pracovní prostředí",
            text: "Kde bude díl sloužit? Bude v interiéru, venku na slunci, v horku, v kontaktu s olejem, nebo mechanicky namáhaný?",
          },
          {
            title: "Barva a vzhled",
            text: "Pokud máte požadavek na konkrétní barvu (černá, šedá, bílá nebo jiná), uveďte ji v poznámce.",
          },
          {
            title: "Původ modelu (licence)",
            text: "Pokud jde o model stažený z internetu, uveďte zdroj. Zkontrolujeme, zda licenční podmínky autora umožňují zakázkovou výrobu.",
          },
        ],
      },
      {
        type: "list",
        variant: "steps",
        title: "Jak probíhá zakázka krok za krokem",
        items: [
          {
            title: "Nahrajete 3D model",
            text: "Přes náš poptávkový formulář nahrajete soubor a napíšete, jaké máte požadavky na materiál a množství.",
          },
          {
            title: "Kalkulace do 24 hodin",
            text: "Zkontrolujeme geometrii a vyrobitelnost, navrhneme optimální tiskové parametry a pošleme pevnou cenu a termín.",
          },
          {
            title: "Zkušební vzorek",
            text: "U sériových zakázek nejdříve vytiskneme zkušební kus a zašleme vám ho k otestování. Poštovné jde za námi.",
          },
          {
            title: "Výroba a odeslání",
            text: "Jakmile vzorek potvrdíte, spustíme finální tisk, díly pečlivě zabalíme a odešleme k vám kamkoliv po ČR.",
          },
        ],
      },
      {
        type: "limits",
        title: "Férově předem: co 3D tisk neumí",
        intro: "Otevřené jednání je pro nás základ. Raději vám předem popíšeme technologické limity, než abyste byli překvapeni po rozbalení balíčku.",
        items: [
          {
            title: "Viditelná vrstvená struktura",
            text: "Díly vznikají nanášením plastové struny po vrstvách. Nejsou zrcadlově hladké jako díly ze vstřikolisu z velkovýroby.",
          },
          {
            title: "Maximální rozměr z jednoho kusu",
            text: "Náš tiskový prostor je 250 × 250 × 250 mm. Větší objekty rozdělíme na více dílů a spojíme pevnými konstrukčními zámky či šrouby.",
          },
          {
            title: "Potravinářství a hračky pro nejmenší",
            text: "Běžný FDM tisk není hygienicky certifikovaný pro přímý dlouhodobý styk s potravinami ani jako kousátka či hračky pro batolata.",
          },
          {
            title: "Zbraně, implantáty a padělky",
            text: "Zásadně netiskneme zbraně, tlumiče, součásti střeliva, zdravotnické implantáty ani kopie značkového zboží porušující ochranné známky.",
          },
          {
            title: "Cizí modely s licencí Non-Commercial",
            text: "Respektujeme autorská práva. Modely stažené z webu s licencí zakazující komerční využití pro zakázky netiskneme.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Mohu si nechat vytisknout model stažený z internetu?",
        answer:
          "Ano, pokud to licenční podmínky autora umožňují (např. Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Modely s licencí Non-Commercial (NC), chráněná loga ani franšízové postavičky bez licence tisknout nemůžeme.",
      },
      {
        question: "Jaká je přesnost FDM 3D tisku?",
        answer:
          "Běžně dodržujeme výrobní tolerance v rozmezí ±0,2 mm. Skutečná přesnost závisí na tvaru dílu, orientaci tisku a smrštění konkrétního materiálu. S vůlemi pro montáž a šrouby počítáme už při přípravě tiskových dat.",
      },
      {
        question: "Od kolika kusů se zakázka vyplatí?",
        answer:
          "Výroba se vyplatí už od jediného kusu. Nepotřebujete žádnou drahou formu ani speciální nástroje, takže 3D tisk je skvělý jak na prototypy, tak na série v řádu desítek až stovek kusů.",
      },
      {
        question: "Jak rychle zakázku vyrobíte?",
        answer:
          "Běžné kusové zakázky a prototypy odesíláme zpravidla do 2 až 4 pracovních dnů. U větších sérií záleží na celkové době tisku, přesný termín vám vždy závazně potvrdíme v kalkulaci.",
      },
    ],
    closing: {
      title: "Máte hotový 3D model? Pošlete nám ho",
      text: "Napište, kolik kusů potřebujete a k čemu budou sloužit. Cenovou nabídku a termín vám připravíme nezávazně do 24 hodin.",
    },
  },
  {
    slug: "cad-modelovani-na-miru",
    name: "3D modelování na míru",
    h1: "3D CAD modelování a návrh dílů na míru",
    kicker: "Máte nápad, náčrtek nebo vzorek, ale chybí vám 3D model",
    metaTitle: "3D CAD modelování a návrh dílů na míru | 3D Spline",
    metaDescription:
      "Nemáte 3D model? Podle vzorku, výkresu nebo náčrtu navrhneme funkční CAD model dílu s ohledem na mechanickou pevnost a technologii 3D tisku.",
    keywords: [
      "CAD modelování",
      "modelování na míru",
      "návrh dílů pro 3D tisk",
      "3D model podle výkresu",
      "reverzní inženýrství",
    ],
    cardText:
      "Nemáte 3D model? Navrhneme ho podle vzorku, výkresu nebo náčrtu.",
    lead: "Nemáte hotová 3D data? Vůbec nevadí. Vytvoříme pro vás přesný CAD model podle opotřebovaného dílu, technického výkresu nebo obyčejného náčrtu s rozměry na papíře. Navrhujeme součástky tak, aby perfektně pasovaly a spolehlivě vydržely zamýšlené zatížení.",
    image: "/images/3D_modelovani_na_miru.jpg",
    imageAlt: "Konstrukce a 3D CAD modelování dílů na míru v počítači",
    heroImage: "/images/3D_modelovani_na_miru.jpg",
    heroImageAlt: "Práce na 3D CAD modelu v konstrukčním programu s posuvným měřidlem na stole",
    tab: "drawing",
    ctaLabel: "Poptat modelování",
    facts: [
      { label: "Podklady", value: "stačí náčrt s kótami či vzorek" },
      { label: "Modelování", value: "parametrický CAD systém" },
      { label: "Ověření", value: "zkušební výtisk před sérií" },
      { label: "Reakce", value: "kalkulace do 24 hodin" },
    ],
    blocks: [
      {
        type: "split",
        title: "Díl navržený přesně pro vaše použití",
        paragraphs: [
          "Často za námi zákazníci přicházejí ve chvíli, kdy potřebují specifický držák na nářadí, montážní konzoli na stůl či hliníkový profil, adaptér mezi dvě různé součástky nebo atypický stojánek, který se v obchodech vůbec neprodává.",
          "Model navrhujeme přímo pro technologii 3D tisku. To znamená, že rovnou promýšlíme orientaci vláken vůči působícím silám, navrhujeme správné vůle a kapsy pro zapuštěné šrouby či matice a volíme tvary, které se vytisknou čistě bez zbytečných podpěr.",
          "Než se pustíme do finální výroby, připravíme zkušební výtisk. Vyzkoušíte si ho přímo na místě a máte jistotu, že vše sedí na milimetr přesně.",
        ],
        image: "/portfolio/drzak.png",
        imageAlt: "CAD návrh mechanického profilového držáku s konstrukčním vyztužením",
      },
      {
        type: "gallery",
        title: "Co v CADu reálně navrhujeme",
        intro:
          "Ukázky modelů z naší dílny – od drobných funkčních čepů po mechanické úchyty a tvarově složité geometrie.",
        items: [
          {
            src: "/portfolio/drzak.png",
            title: "Profilový držák",
            caption: "Mechanický úchyt se zpevňujícími žebry pro vyšší tuhost",
          },
          {
            src: "/portfolio/stojan.png",
            title: "Ergonomický stojánek",
            caption: "Klínový stojan s vodicí drážkou pro příslušenství",
          },
          {
            src: "/portfolio/podstavec.png",
            title: "Kruhová příruba",
            caption: "Rotační pouzdro se zapuštěnými montážními otvory",
          },
          {
            src: "/portfolio/cuplik.png",
            title: "Funkční čep",
            caption: "Drobný konstrukční prvek určený pro zatavení do plastu",
          },
          {
            src: "/portfolio/pohar.png",
            title: "Atypická geometrie",
            caption: "Designový spirálovitý pohár s organickým tvarem",
          },
        ],
      },
      {
        type: "list",
        variant: "rows",
        title: "Co nám stačí poslat jako podklad",
        intro: "Nemusíte být konstruktér ani mít profesionální výkres. Stačí nám základní informace:",
        items: [
          {
            title: "Náčrt na papíře s rozměry",
            text: "Klidně načrtnutý od ruky tužkou. Nejdůležitější jsou hlavní kóty: celkové rozměry, průměry otvorů a rozteče mezi šrouby.",
          },
          {
            title: "Fotografie s měřítkem",
            text: "Vyfoťte prostor, kam má díl přijít, případně starý díl z několika úhlů. Když vedle něj položíte pravítko nebo metr, pomůže nám to s měřítkem.",
          },
          {
            title: "Fyzický vzorek poštou",
            text: "Pokud máte poškozený či starý díl a nechcete ho měřit sami, můžete nám ho zaslat poštou. Rozměry si přesně odměříme posuvným měřidlem.",
          },
          {
            title: "Popis zatížení a funkce",
            text: "Napište nám, co bude díl dělat, jaká síla na něj bude působit a v jakém prostředí bude pracovat (interiér, teplo, vlhko, slunce).",
          },
        ],
      },
      {
        type: "list",
        variant: "rows",
        title: "Pravidla konstrukce pro 3D tisk",
        intro:
          "Kvalitní model pro 3D tisk není jen hezký 3D tvar. Každý díl navrhujeme podle osvědčených konstrukčních zásad:",
        items: [
          {
            title: "Pevnost orientovaná podle zátěže",
            text: "Vrstvy 3D tisku se chovají podobně jako léta ve dřevě. Modelujeme tak, aby tahové a ohybové síly nepůsobily kolmo na rozhraní vrstev.",
          },
          {
            title: "Zapuštění matic a spojovacího materiálu",
            text: "Do modelů rovnou zapouštíme šestihranné kapsy na matice, osazení pro hlavy šroubů nebo přípravu na mosazné závitové vložky.",
          },
          {
            title: "Geometrie bez zbytečných podpěr",
            text: "Zkosení hran (fasetky) a přechody navrhujeme pod úhly, které tiskárna zvládne vytisknout čistě do vzduchu bez nevzhledných tiskových podpěr.",
          },
          {
            title: "Správné výrobní vůle",
            text: "Známe přesné chování a smrštění jednotlivých plastů. Otvory pro hřídele a lícování navrhujeme tak, aby díly pasovaly bez nutnosti pilování.",
          },
        ],
      },
      {
        type: "list",
        variant: "steps",
        title: "Jak probíhá zakázka modelování",
        items: [
          {
            title: "Zadání a konzultace",
            text: "Nahrajete náčrt, fotky nebo pošlete vzorek. Ujasníme si rozměry, funkci a montážní požadavky.",
          },
          {
            title: "Tvorba 3D CAD modelu",
            text: "Vytvoříme parametrický 3D model. Pošleme vám náhledy nebo 3D vizualizaci ke kontrole.",
          },
          {
            title: "Zkušební prototyp",
            text: "Model vytiskneme a zašleme vám vzorek k fyzickému vyzkoušení ve vašem zařízení. Poštovné hradíme my.",
          },
          {
            title: "Výroba a předání dat",
            text: "Po vašem odsouhlasení vyrobíme potřebný počet kusů a na přání vám předáme i zdrojové soubory STEP pro budoucí použití.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Co všechno potřebuji dodat k modelování?",
        answer:
          "Stačí nám náčrt na papíře s kótami, fotka s přiloženým pravítkem nebo fyzický vzorek. Čím víc informací o funkci dílu a jeho montáži máme, tím rychleji a přesněji model připravíme.",
      },
      {
        question: "Co když nemám přesné rozměry?",
        answer:
          "Pokud máte původní součástku, můžete nám ji poslat poštou – změříme si ji sami posuvným měřidlem a úhloměrem. Pokud díl nemáte, stačí změřit prostor a protikusy, kam má nová součástka pasovat.",
      },
      {
        question: "Získám k modelu i výrobní 3D data?",
        answer:
          "Ano. Po dokončení a uhrazení zakázky vám na přání předáme kompletní data ve formátu STEP (univerzální CAD standard) i výrobní soubory STL nebo 3MF pro 3D tisk.",
      },
      {
        question: "Jak ověříte, že bude díl pasovat?",
        answer:
          "Před finální výrobou vytiskneme zkušební vzorek, který vám pošleme k otestování. Přímo ve svém zařízení si vyzkoušíte montáž i funkčnost a případné drobné úpravy doladíme předem.",
      },
    ],
    closing: {
      title: "Máte nápad nebo potřebujete vyřešit díl?",
      text: "Stačí fotka a pár vět o tom, co potřebujete. Ozveme se do 24 hodin a společně probereme nejjednodušší cestu k hotovému dílu.",
    },
  },
  {
    slug: "3d-tisk-nahradnich-dilu",
    name: "Náhradní díly",
    h1: "3D tisk náhradních dílů na míru",
    kicker: "Plastový díl praskl a originál se už nevyrábí ani neprodává",
    metaTitle: "3D tisk náhradních dílů na zakázku | 3D Spline",
    metaDescription:
      "Prasklý nebo chybějící plastový díl? Změříme ho, vymodelujeme v CADu, zesílíme namáhaná místa a vytiskneme z odolného PETG nebo ASA. Doručení po celé ČR.",
    keywords: [
      "náhradní díly 3D tisk",
      "3D tisk náhradních dílů",
      "replika plastového dílu",
      "reverzní inženýrství",
      "oprava plastového dílu",
    ],
    cardText:
      "Ulomený nebo nedostupný plastový díl vymodelujeme a vytiskneme znovu.",
    lead: "Ulomená páčka, prasklé ozubené kolečko, chybějící krytka, nožka nebo úchyt. Pošlete nám původní kus (klidně v úlomcích) nebo fotku s rozměry. Původní geometrii zrekonstruujeme, namáhaná místa konstrukčně zesílíme a nový díl vytiskneme z odolného technického plastu.",
    image: "/portfolio/poklicky.jpg",
    imageAlt: "Vytištěné náhradní plastové díly a krytky na míru",
    heroImage: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_vs_stare.jpg",
    heroImageAlt:
      "Původní starý díl vedle nově vymodelovaného a vytištěného knoflíku",
    tab: "drawing",
    ctaLabel: "Poptat náhradní díl",
    facts: [
      { label: "Výchozí stav", value: "stačí ulomený kus či fotka s kótami" },
      { label: "Vylepšení", value: "zesílení kritických míst" },
      { label: "Materiály", value: "odolné PETG, ASA nebo TPU" },
      { label: "Doručení", value: "zásilkovna i kurýr po celé ČR" },
    ],
    blocks: [
      {
        type: "prose",
        title: "Jak probíhá rekonstrukce náhradního dílu",
        paragraphs: [
          "Většina poptávek začíná fotkou a zprávou: „Tento díl už výrobce nedodává a celé zařízení kvůli tomu stojí.“ Podíváme se na tvar, zjistíme, co součástka drží a jakému namáhání čelí.",
          "Při modelování se neomezujeme jen na slepou kopii. Původní plastové díly ze vstřikolisu často selžou v místě ostrého vnitřního rohu nebo příliš tenké stěny. Při tvorbě 3D modelu přidáme zaoblení, výztužná žebra a větší tloušťku materiálu, aby nový díl vydržel podstatně déle.",
          "Než vyrobíme finální díl nebo sérii, pošleme vám zkušební vzorek k montáži. Poštovné jde za námi.",
        ],
        aside: {
          title: "Co k poptávce poslat",
          items: [
            "Fotky prasklého dílu ze všech stran (ideálně s přiloženým měřidlem)",
            "Všechny úlomky, pokud máte možnost díl zaslat poštou k přesnému zaměření",
            "Základní rozměry a rozteče montážních otvorů",
            "Informaci, kde díl pracuje – interiér, auto, dílna, vystavení teplu či chemikáliím",
          ],
        },
      },
      {
        type: "split",
        title: "Když potřebujete víc kusů do zásoby",
        paragraphs: [
          "Opotřebované součástky málokdy odcházejí jednotlivě – typicky krytky, záslepky, dorazy, knoflíky nebo pojezdy. Když praskne jeden, brzy dojde i na ty ostatní.",
          "Jakmile máme hotový a odzkoušený 3D model, výroba dalších kusů je už jen otázkou tisku. Vyplatí se proto nechat vyrobit rovnou celou sadu nebo pár kusů do rezervy.",
        ],
        image: "/portfolio/poklicky.jpg",
        imageAlt: "Sada nově vyrobených plastových krytek na míru",
        reverse: true,
      },
      {
        type: "table",
        title: "Výběr materiálu podle prostředí",
        intro: "Stejný díl se v dílně, v obýváku a na rozpálené palubní desce auta chová úplně jinak.",
        columns: ["Kde bude díl sloužit", "Doporučený materiál", "Důvod volby"],
        rows: [
          [
            "Interiér, běžná mechanická zátěž",
            "PETG nebo PLA",
            "Vysoká tvarová přesnost a dostatečná pevnost pro běžné použití.",
          ],
          [
            "Dílna, stroje, rázy a vibrace",
            "PETG",
            "Houževnatý plast odolný proti nárazům, mechanickému otěru a chemikáliím.",
          ],
          [
            "Auto, motocykl, přímé slunce a horko",
            "ASA",
            "UV stabilní plast, který se nedeformuje ani při letních teplotách v autě (do 95 °C).",
          ],
          [
            "Pružné dorazy, těsnění, návleky",
            "TPU",
            "Flexibilní pryžový materiál odolný proti únavě a trvalé deformaci.",
          ],
        ],
        note: "Upozornění: Do interiérů aut v létě nikdy nepoužíváme PLA – za oknem může teplota přesáhnout 55 °C, kdy PLA měkne a ztrácí tvar.",
      },
      {
        type: "list",
        variant: "steps",
        title: "Jak probíhá zakázka od poptávky k hotovému dílu",
        items: [
          {
            title: "Pošlete fotky a rozměry",
            text: "Nahrajte fotky prasklého dílu nebo nám poškozený kus zašlete poštou. Popište, kde se součástka nachází a co dělá.",
          },
          {
            title: "Posouzení a kalkulace do 24 h",
            text: "Zhodnotíme vyrobitelnost, navrhneme vhodný materiál a pošleme vám pevnou cenovou nabídku.",
          },
          {
            title: "Vymodelování a zkušební vzorek",
            text: "Díl vymodelujeme v CADu se zesílením namáhaných míst a pošleme vám zkušební kus na otestování.",
          },
          {
            title: "Doručení hotového kusu",
            text: "Po ověření rozměrů a funkčnosti vyrobíme domluvený počet kusů a odešleme k vám kamkoliv po ČR.",
          },
        ],
      },
      {
        type: "limits",
        title: "Kdy 3D tisk náhradního dílu nedoporučujeme",
        intro: "Chceme, aby vám díly spolehlivě sloužily. Jsou ale situace, kdy plast z 3D tisku není vhodné řešení a férově vám to řekneme předem:",
        items: [
          {
            title: "Kritické bezpečnostní prvky",
            text: "Netiskneme bezpečnostní prvky automobilů, brzdové komponenty ani nosné závěsy, kde by prasknutí mohlo přímo ohrozit zdraví.",
          },
          {
            title: "Teploty trvale nad 95 °C",
            text: "Díly přímo v motorovém prostoru u výfuku nebo u topných těles se běžnými technickými plasty deformují.",
          },
          {
            title: "Přímý styk s potravinami a pitnou vodou",
            text: "FDM tisk obsahuje mikroskopické póry mezi vrstvami, které nejsou hygienicky omyvatelné a certifikované pro styk s potravinami.",
          },
          {
            title: "Mikroskopická a vysoce namáhaná ozubení",
            text: "Drobné převody s modulem zubu pod cca 0,6 mm vyžadují přesné vstřikování nebo kovové provedení, FDM tisk zde nemá dostatečnou geometrickou jemnost.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Zvládnete vyrobit díl, i když je rozlomený na několik kusů?",
        answer:
          "Ano. Pokud jsou zachované hlavní úlomky a styčné plochy, poskládáme je a přesné rozměry z nich odměříme. Chybějící části domodelujeme podle protikusů nebo logiky funkce.",
      },
      {
        question: "Vydrží vytištěný náhradní díl stejně jako originál?",
        answer:
          "Často vydrží ještě déle. Původní vstřikované díly často selhávají na poddimenzovaných místech s ostrými přechody. V CADu namáhaná místa zesílíme, přidáme zaoblení a vytiskneme z houževnatého materiálu jako PETG nebo ASA.",
      },
      {
        question: "Vydrží díl v létě v autě nebo na přímém slunci?",
        answer:
          "Záleží na materiálu. Běžné PLA do auta nepatří (za sklem na slunci změkne). Pro automobilové díly a venkovní použití používáme výhradně technické plasty ASA nebo PETG, které zvládnou vysoké letní teploty i UV záření.",
      },
      {
        question: "Můžu si objednat jen jeden kus na zkoušku?",
        answer:
          "Určitě. Vždy doporučujeme nejdříve jeden zkušební kus, na kterém si ověříte montáž a funkčnost. Teprve pak dává smysl tisknout případné další kusy do rezervy.",
      },
    ],
    closing: {
      title: "Praskl vám díl? Pošlete nám fotku",
      text: "I fotka s jedním naměřeným rozměrem nám pomůže posoudit vyrobitelnost a doporučit nejlepší materiál. Kalkulaci vám pošleme do 24 hodin.",
    },
  },
];

export const siteUrl = "https://3dspline.cz";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
