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
      "Zakázkový 3D tisk ze souborů STEP, STL a 3MF. Kusová i sériová výroba z PETG a PLA, na vyžádání z ASA. Zkušební kus před sérií a doručení po celé ČR.",
    keywords: [
      "zakázkový 3D tisk",
      "3D tisk na zakázku",
      "3D tisk z STL",
      "sériový 3D tisk",
      "FDM tisk",
      "3D tisk PETG",
    ],
    cardText:
      "Máte hotový model? Vytisknu ho kusově i v sérii z PETG nebo PLA.",
    lead: "Pošlete mi STEP, STL nebo 3MF a já se postarám o výrobu. Tisknu od jednoho prototypu až po série stovek kusů. Před tiskem model vždy zkontroluji, doporučím vhodný materiál a u sérií pošlu nejdřív zkušební kus na vyzkoušení.",
    image: "/portfolio/seriovka.jpg",
    imageAlt: "Sériový 3D tisk funkčních dílů na tiskové podložce",
    tab: "model",
    ctaLabel: "Poptat 3D tisk",
    facts: [
      { label: "Formáty", value: "STEP, STL, 3MF" },
      { label: "Materiály", value: "PETG, PLA (ASA na vyžádání)" },
      { label: "Tiskový prostor", value: "250 × 250 × 250 mm" },
      { label: "Tolerance", value: "obvykle ±0,2 mm" },
    ],
    blocks: [
      {
        type: "split",
        title: "Kusová výroba i série bez drahých forem",
        paragraphs: [
          "Tisknu technologií FDM: roztavený plast se nanáší po vrstvách, typicky 0,16 až 0,28 mm. Protože odpadá výroba drahých forem a nástrojů, dává 3D tisk smysl už od jednoho kusu.",
          "Když potřebujete desítky nebo stovky kusů, naskládám díly na tiskovou podložku tak, aby výroba byla co nejefektivnější. Díly mají jemnou vrstvenou strukturu, ale při správné orientaci jsou pevné a odolné.",
        ],
        image: "/images/print-plate.jpg",
        imageAlt: "Tiskárna a podložka plná právě vytištěných dílů",
      },
      {
        type: "table",
        title: "Materiály",
        intro:
          "Materiál vybírám podle prostředí, ve kterém bude díl sloužit. Teploty jsou orientační limity, do kterých díl drží tvar.",
        columns: ["Materiál", "K čemu se hodí", "Teplotní limit", "Vlastnosti"],
        rows: [
          [
            "PETG",
            "Funkční držáky, přípravky a technické díly",
            "do cca 75–80 °C",
            "Houževnatý a odolný proti nárazům i chemii. Tisknu z něj nejčastěji.",
          ],
          [
            "PLA",
            "Medaile, poháry, dárky, modely a interiérové doplňky",
            "do cca 50–55 °C",
            "Ostré detaily a spousta barev. Nehodí se na přímé slunce ani za sklo auta.",
          ],
          [
            "ASA (na vyžádání)",
            "Venkovní díly a díly na slunci",
            "do cca 95 °C",
            "Odolá UV záření, dešti i letnímu horku.",
          ],
        ],
        note: "Nejste si jistí? V poptávce popište, k čemu díl slouží, a materiál doporučím.",
      },
      {
        type: "list",
        variant: "rows",
        title: "Co mi poslat k poptávce",
        intro: "Čím víc toho vím hned na začátku, tím rychleji vám pošlu nezávaznou cenu a termín.",
        items: [
          {
            title: "3D model",
            text: "Soubor ve formátu STEP (nejlepší pro přesnost), případně STL nebo 3MF. Pokud je potřeba model ještě upravit, je STEP ideální.",
          },
          {
            title: "Počet kusů",
            text: "Stačí orientačně, ať vím, jestli počítám s jedním prototypem, desítkami nebo stovkami kusů.",
          },
          {
            title: "Prostředí",
            text: "Kde bude díl sloužit? V interiéru, venku na slunci, v horku, v kontaktu s olejem, nebo bude mechanicky namáhaný?",
          },
          {
            title: "Barva a vzhled",
            text: "Pokud chcete konkrétní barvu (černá, šedá, bílá nebo jiná), napište ji do poznámky.",
          },
          {
            title: "Původ modelu (licence)",
            text: "Pokud jde o model stažený z internetu, uveďte zdroj. Zkontroluji, jestli licence autora zakázkovou výrobu dovoluje.",
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
            text: "Přes poptávkový formulář nahrajete soubor a napíšete, jaký materiál a kolik kusů potřebujete.",
          },
          {
            title: "Kalkulace do 24 hodin",
            text: "Zkontroluji geometrii a vyrobitelnost, nastavím tisk a pošlu vám pevnou cenu a termín.",
          },
          {
            title: "Zkušební kus",
            text: "U sérií nejdřív vytisknu zkušební kus a pošlu vám ho na vyzkoušení. Poštovné platím já.",
          },
          {
            title: "Výroba a odeslání",
            text: "Jakmile zkušební kus schválíte, vytisknu celou sérii, pečlivě ji zabalím a pošlu kamkoli v ČR.",
          },
        ],
      },
      {
        type: "limits",
        title: "Férově předem: co 3D tisk neumí",
        intro: "Raději vám limity technologie popíšu předem, než abyste byli překvapení po rozbalení balíčku.",
        items: [
          {
            title: "Viditelná vrstvená struktura",
            text: "Díly vznikají nanášením plastu po vrstvách. Nejsou zrcadlově hladké jako díly ze vstřikolisu.",
          },
          {
            title: "Maximální rozměr z jednoho kusu",
            text: "Tiskový prostor je 250 × 250 × 250 mm. Větší díly rozdělím na části a spojím je zámky nebo šrouby.",
          },
          {
            title: "Potraviny a hračky pro nejmenší",
            text: "Běžný FDM tisk není certifikovaný pro styk s potravinami a nehodí se ani na kousátka a hračky pro batolata.",
          },
          {
            title: "Zbraně, implantáty a padělky",
            text: "Netisknu zbraně, tlumiče, součásti střeliva, zdravotnické implantáty ani kopie značkového zboží.",
          },
          {
            title: "Cizí modely s licencí Non-Commercial",
            text: "Modely z internetu s licencí, která zakazuje komerční využití, na zakázku netisknu.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Mohu si nechat vytisknout model stažený z internetu?",
        answer:
          "Ano, pokud to licence autora dovoluje (např. Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Netisknu modely s licencí Non-Commercial (NC), chráněná loga ani postavičky z filmů a her bez doložené licence.",
      },
      {
        question: "Jaká je přesnost FDM 3D tisku?",
        answer:
          "Obvykle držím toleranci ±0,2 mm. Skutečná přesnost závisí na tvaru dílu, orientaci tisku a smrštění materiálu. S vůlemi pro montáž a šrouby počítám už při přípravě tisku.",
      },
      {
        question: "Od kolika kusů se zakázka vyplatí?",
        answer:
          "Už od jednoho kusu. Nepotřebujete drahou formu ani speciální nástroje, takže 3D tisk se hodí na prototypy i na série v řádu desítek až stovek kusů.",
      },
      {
        question: "Jak rychle zakázku vyrobíte?",
        answer:
          "Kusové zakázky a prototypy obvykle odesílám do 2 až 4 pracovních dnů. U větších sérií záleží na době tisku, přesný termín vám potvrdím v kalkulaci.",
      },
    ],
    closing: {
      title: "Máte hotový 3D model? Pošlete mi ho",
      text: "Napište, kolik kusů potřebujete a k čemu budou sloužit. Cenu a termín vám nezávazně pošlu do 24 hodin.",
    },
  },
  {
    slug: "cad-modelovani-na-miru",
    name: "3D modelování na míru",
    h1: "3D CAD modelování a návrh dílů na míru",
    kicker: "Máte nápad, náčrtek nebo vzorek, ale chybí vám 3D model",
    metaTitle: "3D CAD modelování a návrh dílů na míru | 3D Spline",
    metaDescription:
      "Nemáte 3D model? Podle vzorku, výkresu nebo náčrtu navrhnu funkční CAD model dílu tak, aby vydržel, k čemu je určený, a dal se dobře tisknout.",
    keywords: [
      "CAD modelování",
      "modelování na míru",
      "návrh dílů pro 3D tisk",
      "3D model podle výkresu",
      "reverzní inženýrství",
    ],
    cardText:
      "Nemáte 3D model? Navrhnu ho podle vzorku, výkresu nebo náčrtu.",
    lead: "Nemáte 3D data? Nevadí. Vytvořím CAD model podle opotřebovaného dílu, výkresu nebo obyčejného náčrtu s rozměry. Díly navrhuji tak, aby seděly na své místo a vydržely, k čemu jsou určené.",
    image: "/images/pohar_real_vs_cad.jpg",
    imageAlt: "Konstrukce a 3D CAD modelování dílů na míru v počítači",
    heroImage: "/images/pohar_real_vs_cad.jpg",
    heroImageAlt: "Porovnání 3D CAD modelu na monitoru a skutečného vytištěného poháru",
    tab: "drawing",
    ctaLabel: "Poptat modelování",
    facts: [
      { label: "Podklady", value: "stačí náčrt s kótami či vzorek" },
      { label: "Modelování", value: "parametrický CAD" },
      { label: "Ověření", value: "zkušební výtisk před sérií" },
      { label: "Reakce", value: "kalkulace do 24 hodin" },
    ],
    blocks: [
      {
        type: "split",
        title: "Díl navržený přesně pro vaše použití",
        paragraphs: [
          "Často se na mě lidé obracejí, když potřebují držák na nářadí, konzoli na stůl nebo profil, adaptér mezi dvě různé součástky nebo stojánek, který se nikde neprodává.",
          "Model navrhuji rovnou pro 3D tisk. Myslím na orientaci vrstev vůči silám, které na díl budou působit, na vůle a kapsy pro šrouby a matice a na tvary, které se vytisknou čistě bez zbytečných podpěr.",
          "Před výrobou série připravím zkušební výtisk. Vyzkoušíte si ho přímo na místě a uvidíte, že všechno sedí.",
        ],
        image: "/portfolio/drzak.png",
        imageAlt: "CAD návrh profilového držáku s vyztužením",
      },
      {
        type: "gallery",
        title: "Co v CADu navrhuji",
        intro:
          "Ukázky mých modelů, od drobných funkčních čepů po úchyty a tvarově složité geometrie.",
        items: [
          {
            src: "/portfolio/drzak.png",
            title: "Profilový držák",
            caption: "Úchyt se zpevňujícími žebry pro vyšší tuhost",
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
            caption: "Spirálovitý pohár s organickým tvarem",
          },
        ],
      },
      {
        type: "list",
        variant: "rows",
        title: "Co mi stačí poslat",
        intro: "Nemusíte být konstruktér ani mít profesionální výkres. Stačí základní informace:",
        items: [
          {
            title: "Náčrt na papíře s rozměry",
            text: "Klidně od ruky tužkou. Nejdůležitější jsou hlavní kóty: celkové rozměry, průměry otvorů a rozteče mezi šrouby.",
          },
          {
            title: "Fotografie s měřítkem",
            text: "Vyfoťte místo, kam má díl přijít, případně starý díl z několika stran. Když vedle něj položíte pravítko nebo metr, pomůže mi to s měřítkem.",
          },
          {
            title: "Fyzický vzorek poštou",
            text: "Pokud máte poškozený nebo starý díl a nechcete ho měřit sami, pošlete mi ho. Rozměry odměřím posuvným měřidlem.",
          },
          {
            title: "Popis zatížení a funkce",
            text: "Napište, co bude díl dělat, jaká síla na něj bude působit a v jakém prostředí bude (interiér, teplo, vlhko, slunce).",
          },
        ],
      },
      {
        type: "list",
        variant: "rows",
        title: "Pravidla konstrukce pro 3D tisk",
        intro:
          "Dobrý model pro 3D tisk není jen hezký tvar. Každý díl navrhuji podle osvědčených zásad:",
        items: [
          {
            title: "Pevnost podle zatížení",
            text: "Vrstvy 3D tisku se chovají podobně jako léta ve dřevě. Modeluji tak, aby tahové a ohybové síly nepůsobily kolmo na rozhraní vrstev.",
          },
          {
            title: "Zapuštěné matice a šrouby",
            text: "Do modelů rovnou kreslím kapsy na matice, osazení pro hlavy šroubů nebo místo pro mosazné závitové vložky.",
          },
          {
            title: "Geometrie bez zbytečných podpěr",
            text: "Zkosení a přechody navrhuji pod úhly, které tiskárna vytiskne čistě bez podpěr.",
          },
          {
            title: "Správné výrobní vůle",
            text: "Počítám se smrštěním jednotlivých plastů. Otvory pro hřídele a lícování navrhuji tak, aby díly pasovaly bez pilování.",
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
            text: "Pošlete náčrt, fotky nebo vzorek. Ujasníme si rozměry, funkci a způsob montáže.",
          },
          {
            title: "Tvorba 3D CAD modelu",
            text: "Vytvořím parametrický 3D model a pošlu vám náhledy ke kontrole.",
          },
          {
            title: "Zkušební prototyp",
            text: "Model vytisknu a pošlu vám ho na vyzkoušení. Poštovné platím já.",
          },
          {
            title: "Výroba a předání dat",
            text: "Po vašem schválení vyrobím potřebný počet kusů a na přání vám předám i zdrojová data STEP.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Co všechno potřebuji dodat k modelování?",
        answer:
          "Stačí náčrt na papíře s kótami, fotka s pravítkem nebo fyzický vzorek. Čím víc toho vím o funkci dílu a jeho montáži, tím rychleji a přesněji model připravím.",
      },
      {
        question: "Co když nemám přesné rozměry?",
        answer:
          "Pokud máte původní součástku, pošlete mi ji poštou a změřím si ji sám. Pokud díl nemáte, stačí změřit místo a protikusy, kam má nová součástka pasovat.",
      },
      {
        question: "Získám k modelu i výrobní 3D data?",
        answer:
          "Ano. Po dokončení a zaplacení zakázky vám na přání předám data ve formátu STEP i soubory STL nebo 3MF pro 3D tisk.",
      },
      {
        question: "Jak ověříte, že bude díl pasovat?",
        answer:
          "Před výrobou vytisknu zkušební kus a pošlu vám ho. Ve svém zařízení si vyzkoušíte montáž i funkci a případné drobnosti doladím ještě před sérií.",
      },
    ],
    closing: {
      title: "Máte nápad nebo potřebujete vyřešit díl?",
      text: "Stačí fotka a pár vět o tom, co potřebujete. Do 24 hodin se ozvu a probereme nejjednodušší cestu k hotovému dílu.",
    },
  },
];

export const siteUrl = "https://3dspline.cz";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
