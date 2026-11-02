export interface StorySection {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface CaseStudyData {
  slug: string;
  title: string;
  h1: string;
  kicker: string;
  tag: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lead: string;
  heroImage: string;
  heroImageAlt: string;
  gallery?: { src: string; caption: string }[];
  facts: { label: string; value: string }[];
  story: {
    intro: StorySection;
    challenge: StorySection;
    craft: StorySection;
    result: StorySection;
    quote: { text: string; author: string };
  };
  inquiryTab: "model" | "drawing";
}

export const caseStudiesData: CaseStudyData[] = [
  {
    slug: "madla-na-poklicky",
    title: "Madla na pokličky",
    h1: "Výroba náhradních madel na starší smaltované poklice",
    kicker: "Příběhy z dílny • Náhradní díly",
    tag: "Náhradní díly",
    metaTitle: "Výroba náhradních madel na pokličky | Příběhy z dílny 3D Spline",
    metaDescription:
      "Zakázková výroba 6 sad dvoudílných madel na smaltované poklice. Odměření originálu, úprava pro 3D tisk, vyzkoušení prototypu a tisk z tepelně odolného materiálu.",
    keywords: [
      "madla na pokličky",
      "náhradní díly na hrnce",
      "úchyt na pokličku",
      "3D tisk náhradních dílů",
      "držadlo pokličky",
    ],
    lead:
      "Zákazníkovi u starší sady smaltovaných poklic po letech popraskaly plastové úchyty. Samotné poklice i hrnce byly v pořádku, ale originální díly už nešlo koupit. Změřili jsme původní úchyt, upravili konstrukci pro 3D tisk, poslali zkušební prototyp a po vyzkoušení vytiskli všech 6 sad z tepelně odolného materiálu.",
    heroImage: "/portfolio/poklicky.jpg",
    heroImageAlt: "Sada 6 nově vyrobených bílých dvoudílných madel na smaltované pokličky",
    gallery: [
      {
        src: "/portfolio/poklicky.jpg",
        caption: "1. Finálně vyrobená sada 6 dvoudílných madel z odolného bílého materiálu",
      },
      {
        src: "/images/pribehy-z-dilny/poklicky/prototyp_na_poklici.jpg",
        caption: "2. Zkušební PLA prototyp nasazený na smaltované poklici před sériovou výrobou",
      },
    ],
    facts: [
      { label: "Materiál", value: "Tepelně odolný plast (bílá)" },
      { label: "Odolnost", value: "Snese cca 100 °C i mytí" },
      { label: "Objem zakázky", value: "6 kompletních sad (12 dílů)" },
      { label: "Postup", value: "Modelování, prototyp, série" },
    ],
    story: {
      intro: {
        title: "Popraskané plasty na funkčním nádobí",
        subtitle: "Poptávka po náhradních dílech, které už nejdou koupit",
        paragraphs: [
          "Zákazník se nám ozval s fotkami starší sady modrých smaltovaných hrnců a poklic. Samotný smalt byl stále v dobrém stavu, ale bílé plastové úchyty stářím zkřehly, popraskaly a jeden už upadl úplně.",
          "Vyhazovat jinak funkční hrnce a kupovat celé nové nádobí nedávalo smysl. Domluvili jsme se proto, že nám poškozené díly pošle do dílny, abychom se na ně podívali naživo.",
        ],
      },
      challenge: {
        title: "Férové zhodnocení: co tisknout a co ne",
        subtitle: "Proč ucha na hrnce nedávala smysl a poklice ano",
        paragraphs: [
          "Původní poptávka byla na ucha hrnců i na madla poklic. U bočních uch jsme ale po prohlédnutí zákazníkovi na rovinu řekli, že to nedoporučujeme. Měla na sobě spoustu složitých rádiusů a zkosení, které přesně kopírovaly stěnu hrnce. Ladění modelu by zabralo hodně hodin a finančně by se to nevyplatilo.",
          "U madel na poklice to naopak dávalo perfektní smysl. Ověřili jsme i bezpečnost: poklice má navařené vnější plechové očko, takže plast je jen zvenku a vůbec nepřichází do kontaktu s párou ani s jídlem uvnitř.",
        ],
      },
      craft: {
        title: "Modelování a zkušební prototyp",
        subtitle: "Dvoudílné řešení a nahrazení zrezlého plíšku",
        paragraphs: [
          "Úchyt je dvoudílný. Spodní kruhová podložka má vespod výřez, který zapadne na plechové očko poklice. Původně pod očkem držel rezavý plíšek – ten jsme nahradili standardní kovovou maticí a prostor jsme přesně změřili, aby se tam vešla.",
          "Design jsme mírně zjednodušili pro spolehlivý tisk a místo lepené záslepky jsme zvolili zapuštěný nerezový šroub. Zákazníkovi jsme nejdřív poslali jeden zkušební prototyp z PLA, aby si přímo doma ověřil, jak sedí na poklici.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/poklicky/prototyp_na_poklici.jpg",
          alt: "Zkušební PLA prototyp nového madla osazený přímo na smaltované poklici",
          caption: "Vyzkoušení zkušebního PLA prototypu přímo na modré poklici před finální výrobou",
        },
      },
      result: {
        title: "Ověření na poklici a výroba 6 sad",
        subtitle: "Zákazník vyzkoušel prototyp a objednal madla pro všechny poklice",
        paragraphs: [
          "Prototyp sedl bez úprav. Zákazník ho nasadil, vyzkoušel a rovnou potvrdil, že chce vyrobit madla na celou sadu nádobí – celkem 6 kompletních sad.",
          "Před finálním tiskem jsme hlavu šroubu zapustili ještě o kousek hlouběji do madla, aby o ni nešlo zavadit prsty. Všech 6 sad jsme vytiskli z tepelně odolného bílého materiálu. Zákazník je pak doma jen namontoval a celá sada může v klidu sloužit dál.",
        ],
        image: {
          src: "/portfolio/poklicky.jpg",
          alt: "Kompletní vyrobená sada 6 dvoudílných madel",
          caption: "Finální sada 6 dvoudílných madel se zapuštěnými nerezovými šrouby",
        },
      },
      quote: {
        text:
          "Včera jsem konečně přijel domů a namontoval je. Vypadají úplně perfektně a určitě ještě službu udělají.",
        author: "Jakub, zákazník",
      },
    },
    inquiryTab: "drawing",
  },
  {
    slug: "model-formule",
    title: "Model závodní formule (vícebarevný tisk)",
    h1: "Detailní model závodní formule vytištěný v jednom kuse bez barvení a lepení",
    kicker: "Příběhy z dílny • Vícebarevný zakázkový tisk",
    tag: "Barevný 3D tisk",
    metaTitle: "Vícebarevný 3D tisk závodní formule | Příběhy z dílny 3D Spline",
    metaDescription:
      "Ukázka přípravy a 3D tisku detailního vícebarevného modelu závodní formule. Ostré barevné přechody přímo z tiskové podložky bez ručního barvení.",
    keywords: [
      "vícebarevný 3D tisk",
      "model formule 3D tisk",
      "zakázkový tisk modelů",
      "barevný FDM tisk",
      "prototypování modelů",
    ],
    lead:
      "Požadavek na věrný a detailní model závodní formule v kontrastních barvách jako dárkový předmět. Model jsme vytiskli jako jeden celek přímo v koncových barvách – bez ručního barvení štětcem a bez lepení drobných dílů.",
    heroImage: "/portfolio/vice_barev.jpg",
    heroImageAlt: "Detailní vícebarevný 3D výtisk závodní formule na stole",
    facts: [
      { label: "Materiál", value: "PLA (3 barvy v jednom tisku)" },
      { label: "Technologie", value: "Vícebarevný FDM tisk" },
      { label: "Výška vrstvy", value: "0,16 mm pro jemné detaily" },
      { label: "Doba tisku", value: "cca 18 hodin čistého času" },
    ],
    story: {
      intro: {
        title: "Zadání a výchozí stav",
        subtitle: "Dárkový model pro fanouška motorsportu",
        paragraphs: [
          "Zákazník hledal dárek pro fanouška formulových závodů. Požadoval model monopostu v konkrétní barevné kombinaci: černá karoserie a pneumatiky, čistě bílé plochy a červené aerodynamické doplňky.",
          "Hotové sběratelské modely v daném provedení nebyly dostupné a běžné plastové modely postrádaly požadovanou úroveň detailů.",
        ],
      },
      challenge: {
        title: "Technické úskalí",
        subtitle: "Čistota detailů bez ručního barvení a lepení",
        paragraphs: [
          "Při jednobarevném tisku a následném ručním barvení štětcem je u členitého modelu s drobnými křidélky, difuzory a zavěšením kol velmi obtížné udržet ostré hrany mezi barvami a nezalít jemné detaily vrstvou laku.",
          "Skládání modelu z desítek samostatně tištěných dílů by zase zanechalo viditelné spáry a stopy po lepidle. Cílem proto bylo vytisknout celý model v jednom kuse rovnou z barevných filamentů.",
        ],
      },
      craft: {
        title: "Příprava tisku a kalibrace",
        subtitle: "Oddělení pigmentů a jemná vrstva 0,16 mm",
        paragraphs: [
          "Model jsme ve sliceru rozdělili do jednotlivých barevných zón a nastavili automatickou výměnu filamentů. Klíčové bylo odladit objem proplachu trysky při přechodu z černého na bílý materiál – černý pigment je velmi výrazný a při nedostatečném vyčištění trysky by bílé plochy získaly šedý nádech.",
          "Pro plynulé zaoblení aerodynamických ploch a nosu monopostu jsme zvolili výšku vrstvy 0,16 mm. Samotný tisk trval přibližně 18 hodin se stovkami automatických výměn materiálu.",
        ],
      },
      result: {
        title: "Výsledek",
        subtitle: "Hotový model přímo z tiskové podložky",
        paragraphs: [
          "Po dokončení tisku a sejmutí z podložky měl model čisté a ostré přechody mezi černou, bílou a červenou barvou bez nutnosti dodatečného tmelení nebo lakování.",
          "Výsledkem je pevný jednodílný model s přesnými detaily připravený rovnou k předání.",
        ],
      },
      quote: {
        text:
          "Vícebarevný tisk umožní vyrobit členitý model v čistých barvách přímo na tiskárně, bez nutnosti lepení drobných částí nebo ručního barvení.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "model",
  },
  {
    slug: "knofliky-pro-stare-radio",
    title: "Knoflíky pro staré rádio",
    h1: "Výroba chybějících ovládacích knoflíků pro historické rádio",
    kicker: "Příběhy z dílny • Reverzní inženýrství a renovace",
    tag: "Reverzní inženýrství",
    metaTitle: "Výroba knoflíků pro staré rádio | Příběhy z dílny 3D Spline",
    metaDescription:
      "Ukázka výroby chybějících ovládacích knoflíků pro historické rádio. Odměření hřídelky a původních úlomků, CAD modelování a 3D tisk věrné repliky.",
    keywords: [
      "knoflíky pro staré rádio",
      "reverzní inženýrství",
      "replika knoflíku rádia",
      "3D tisk historických dílů",
      "renovace rádia",
    ],
    lead:
      "Zákazník renovoval historické rádio, kterému na čelním panelu chyběly původní otočné knoflíky ladění. Podle dochovaných zbytků původního dílu a rozměrů hřídelky jsme vymodelovali a vytiskli přesnou repliku.",
    heroImage: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_vs_stare.jpg",
    heroImageAlt: "Srovnání původního poškozeného knoflíku rádia a nové 3D tištěné repliky",
    gallery: [
      {
        src: "/images/pribehy-z-dilny/radio%20knofliky/radio_before.jpg",
        caption: "1. Historické rádio před doplněním ovládacích prvků",
      },
      {
        src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nenabarvene.jpg",
        caption: "2. Čerstvě vytištěné nové knoflíky přímo z 3D tiskárny",
      },
      {
        src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_vs_stare.jpg",
        caption: "3. Porovnání tvaru a rozměrů nového knoflíku vůči originálu",
      },
      {
        src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nabarvene.jpg",
        caption: "4. Finální nalakované knoflíky připravené k montáži",
      },
    ],
    facts: [
      { label: "Materiál", value: "PETG vhodné k dalšímu lakování" },
      { label: "Metoda", value: "Reverzní inženýrství a CAD" },
      { label: "Tolerance", value: "Přesnost vnitřní drážky ±0,15 mm" },
      { label: "Postup", value: "Odměření, zkušební kus a finální pár" },
    ],
    story: {
      intro: {
        title: "Zadání a výchozí stav",
        subtitle: "Zrenovované rádio s nekompletním čelním panelem",
        paragraphs: [
          "Zákazník dokončoval renovaci historického radiopřijímače s dřevěnou skříní a mosazným lemováním. Elektronika i skříň byly opravené, ale na čelním panelu chyběly původní bakelitové knoflíky pro ladění a hlasitost.",
          "Z jednoho knoflíku se dochovaly pouze poškozené části a druhý chyběl zcela. Bez nich nebylo možné přístroj pohodlně ovládat a renovace nebyla kompletní.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/radio_before.jpg",
          alt: "Historické rádio před doplněním ovládacích knoflíků",
          caption: "Výchozí stav – historické rádio s chybějícími původními otočnými knoflíky",
        },
      },
      challenge: {
        title: "Technické úskalí",
        subtitle: "Tvarová věrnost a přesné lícování na D-profil hřídele",
        paragraphs: [
          "Sehnat původní náhradní díl na tento typ přístroje bylo prakticky nemožné a univerzální novodobé knoflíky by vzhled historického rádia narušily.",
          "Kromě vnějšího tvaru bylo klíčové trefit přesný rozměr vnitřního otvoru pro kovovou hřídelku se seříznutou ploškou (D-profil). Příliš těsný otvor by při nasazení praskl, zatímco volný by se na hřídeli protáčel.",
        ],
      },
      craft: {
        title: "Odměření a CAD modelování",
        subtitle: "Rekonstrukce tvaru a odladění tolerance",
        paragraphs: [
          "Pomocí posuvného měřidla jsme odečetli rozměry hřídele i dochovaného kusu původního knoflíku a v CAD programu vymodelovali kompletní díl včetně jemného obvodového vroubkování.",
          "Vnitřní otvor pro hřídel jsme odladili s tolerancí ±0,15 mm. Nejprve jsme vytiskli zkušební kus, na kterém jsme ověřili, že knoflík jde na hřídel nasadit s přiměřeným odporem a pevně drží. Poté jsme vytiskli finální sadu.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nenabarvene.jpg",
          alt: "Čerstvě vytištěné repliky knoflíků před povrchovou úpravou",
          caption: "Čerstvé výtisky z odolného PETG přímo z tiskové podložky",
        },
      },
      result: {
        title: "Výsledek",
        subtitle: "Povrchová úprava a osazení na přístroj",
        paragraphs: [
          "Zákazník si hotové výtisky následně nalakoval do odstínu odpovídajícího původním dílům, aby splynuly se zbytkem čelního panelu.",
          "Po nasazení na hřídelky je rádio opět kompletní a plně ovladatelné. Postup od výchozího stavu po finální osazení je zachycen ve fotodokumentaci níže.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nabarvene.jpg",
          alt: "Finální nalakované knoflíky s dobovou patinou připravené k montáži",
          caption: "Finální nalakované repliky knoflíků s patinou odpovídající původnímu přístroji",
        },
      },
      quote: {
        text:
          "U nedostupných dílů pro starší techniku stačí k výrobě přesné náhrady i poškozený původní kus a změření protikusu.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "drawing",
  },
];

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}
