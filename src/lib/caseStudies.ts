export interface StorySection {
  title: string;
  subtitle?: string;
  paragraphs: string[];
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
    h1: "Jak jsme zachránili oblíbené hrnce před vyhozením",
    kicker: "Příběh zakázky • Náhradní díly do kuchyně",
    tag: "Náhradní díly",
    metaTitle: "Výroba náhradních madel na pokličky | Příběh zakázky 3D Spline",
    metaDescription:
      "Příběh o záchraně skleněných pokliček k hrncům, kterým popraskala madla. Odměření, CAD modelování a 3D tisk z teplotně odolného PETG.",
    keywords: [
      "madla na pokličky",
      "náhradní díly na hrnce",
      "úchyt na pokličku",
      "3D tisk náhradních dílů",
      "držadlo pokličky",
    ],
    lead:
      "Zákazník měl kvalitní skleněné pokličky, kterým po letech mytí a vaření zkřehla a popraskala původní plastová madla. V obchodech náhradní díly nesehnal. Přečtěte si, jak jsme v dílně navrhli nová madla přesně na míru.",
    heroImage: "/portfolio/poklicky.jpg",
    heroImageAlt: "Sada nově vyrobených bílých madel na pokličky s nerezovými šrouby",
    facts: [
      { label: "Materiál", value: "Odolné PETG" },
      { label: "Odolnost", value: "do 80 °C, snese mytí" },
      { label: "Množství", value: "Sada 4 kusů na míru" },
      { label: "Doba dodání", value: "3 pracovní dny" },
    ],
    story: {
      intro: {
        title: "Jak to celé začalo",
        subtitle: "Oblíbené hrnce a zbytečný odpad",
        paragraphs: [
          "Napsal nám zákazník s běžným, ale nepříjemným problémem: u sady skleněných pokliček k hrncům, které doma používali léta, postupně zkřehla a popraskala původní plastová madla.",
          "Samotné hrnce i tlustostěnné sklo pokliček byly v bezvadném stavu. Jenže zvedat horkou skleněnou pokličku kleštěmi nebo utěrkou bylo o popálení prstů a koupit celou novou sadu nádobí za několik tisíc korun jen kvůli rozbitým plastovým kouskům nedávalo žádný smysl.",
        ],
      },
      challenge: {
        title: "Kde byl háček",
        subtitle: "Univerzální madla z hobbymarketu neseděla",
        paragraphs: [
          "První logický krok zákazníka byl podívat se po univerzálních úchytech v hobbymarketech a na e-shopech. Jenže univerzální madla mají rovnou dosedací plochu, zatímco tyto pokličky měly kolem montážního otvoru specifický kruhový prolis a mírné zaoblení.",
          "Pokud na takové sklo dotáhnete ploché madlo šroubem na krev, vznikne obrovské bodové pnutí a sklo při prvním zahřátí v hrnci může nekontrolovaně prasknout. Bylo jasné, že tvar nového dílu musí přesně kopírovat geometrii původního skla.",
        ],
      },
      craft: {
        title: "Výroba a konstrukce v dílně",
        subtitle: "Ergonomie, nerezový spoj a odolné PETG",
        paragraphs: [
          "Vzali jsme posuvné měřítko a přeměřili průměr montážního otvoru i přesný poloměr dosedacího prolisu. V CAD programu jsme navrhli nový tvar madla. Chtěli jsme, aby se drželo ještě lépe než původní originál – proto má širší horní klobouček a zúžený krček, za který se poklička bezpečně chytne i v tlusté kuchyňské chňapce.",
          "Zespodu jsme zapustili osazení pro podložku a nerezový šroub, aby kov netlačil přímo na sklo a plast nepřišel do přímého kontaktu s horkou párou z hrnce.",
          "Zvolili jsme technický plast PETG – na rozdíl od běžného PLA bez problémů odolává teplotám do cca 80 °C, vlhku, mastnotě i horké vodě při mytí. Díky vyššímu počtu plných obvodových vrstev je madlo mimořádně houževnaté.",
        ],
      },
      result: {
        title: "Moment, kdy to zacvaklo",
        subtitle: "Druhá šance pro celou sadu nádobí",
        paragraphs: [
          "Nejprve jsme vytiskli jeden testovací vzorek. Zákazník ho nasadil na pokličku, otestoval v reálném provozu při vaření a potvrdil, že madlo sedí jako ulité, nikde se neviklá a skvěle se drží.",
          "Následně jsme vytiskli celou sadu 4 kusů v jednotném stylu. Zákazník ušetřil za nákup nového nádobí a oblíbené pokličky budou spolehlivě sloužit další roky.",
        ],
      },
      quote: {
        text:
          "Přesně pro tohle mám 3D tisk rád. Věc za několik tisíc, kterou by člověk jinak musel vyhodit kvůli ulomenému kousku plastu, získá za pár stovek plnou funkčnost a slouží dál.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "drawing",
  },
  {
    slug: "model-formule",
    title: "Model závodní formule (vícebarevný tisk)",
    h1: "Jak vznikal detailní monopost formule bez štětce a lepení",
    kicker: "Příběh zakázky • Vícebarevný zakázkový tisk",
    tag: "Barevný 3D tisk",
    metaTitle: "Vícebarevný 3D tisk závodní formule | Příběh zakázky 3D Spline",
    metaDescription:
      "Příběh o přípravě a 3D tisku detailního vícebarevného modelu závodní formule. Jak jsme dosáhli ostrých barevných přechodů přímo z tiskové podložky.",
    keywords: [
      "vícebarevný 3D tisk",
      "model formule 3D tisk",
      "zakázkový tisk modelů",
      "barevný FDM tisk",
      "prototypování modelů",
    ],
    lead:
      "Požadavek na věrný a detailní model závodní formule v kontrastních barvách jako dárkový předmět. Zvládli jsme ho vyrobit jako jeden celek přímo z tiskárny – bez jediného tahu štětcem a bez viditelných spojů lepidla.",
    heroImage: "/portfolio/vice_barev.jpg",
    heroImageAlt: "Detailní vícebarevný 3D výtisk závodní formule na stole",
    facts: [
      { label: "Materiál", value: "Prémiové PLA (3 barvy)" },
      { label: "Technologie", value: "Vícebarevný FDM tisk" },
      { label: "Výška vrstvy", value: "0,16 mm pro hladké křivky" },
      { label: "Doba tisku", value: "cca 18 hodin čistého času" },
    ],
    story: {
      intro: {
        title: "Jak to celé začalo",
        subtitle: "Dárek pro fanouška motorsportu",
        paragraphs: [
          "Zákazník hledal jedinečný dárek pro kamaráda – celoživotního fanouška závodů formulí. Chtěl mít na stole věrný model monopostu v přesných barvách: sytě černá karoserie a pneumatiky, sněhově bílé plochy a kontrastní červené aerodynamické doplňky.",
          "Běžné kovové sběratelské modely stály tisíce korun a často nebyly v dané specifikaci k sehnání, zatímco laciné plastové hračky z hračkářství postrádaly detail a kvalitu.",
        ],
      },
      challenge: {
        title: "Kde byl háček",
        subtitle: "Proč se model nemohl barvit ručně",
        paragraphs: [
          "Běžný postup u 3D tisku je vytisknout model jednobarevně (šedě) a následně ho ručně nabarvit. Jenže u modelu formule s drobnými křidélky, difuzory a zavěšením kol je ruční barvení štětcem extrémně náročné. Hrany se snadno přetáhnou, barva zateče do spár a vrstvy nátěru zakryjí jemné detaily.",
          "Druhá možnost – lepit model z padesáti samostatných dílků – zase hrozila viditelnými spárami a skvrnami od lepidla. Cílem bylo vytisknout celý model v jednom kuse rovnou v koncových barvách.",
        ],
      },
      craft: {
        title: "Výroba a alchymie v dílně",
        subtitle: "Kalibrace proplachů a jemná vrstva 0,16 mm",
        paragraphs: [
          "Ve sliceru jsme 3D model rozsegmentovali do jednotlivých barevných vrstev a naprogramovali automatickou výměnu struny. Největší výzvou byl čistý přechod materiálů: černý pigment je mimořádně agresivní, a pokud v trysce zůstane jen mikroskopická stopa, bílé plochy křídel okamžitě zešednou.",
          "Přesně jsme zkalibrovali čistící věž (purge tower) a objem proplachu pro každou barevnou kombinaci. Aby měly aerodynamické plochy a zaoblený nos hladký přechod bez schodovitého efektu, zvolili jsme jemnou výšku vrstvy 0,16 mm.",
          "Tisk trval téměř 18 hodin nepřetržité práce s desítkami automatických výměn filamentu v průběhu stovek tiskových vrstev.",
        ],
      },
      result: {
        title: "Moment, kdy to zacvaklo",
        subtitle: "Perfektní model přímo z podložky",
        paragraphs: [
          "Když tiskárna dojela poslední vrstvu a tisková PEI podložka vychladla, model formule se z ní jen lehce odloupnul. Všechny barvy byly dokonale syté, hrany mezi černou, bílou a červenou ostré jako břitva a povrch čistý.",
          "Žádné tmelení, žádný zápach barev ani lepení. Z tiskárny sjel hotový výstavní kus připravený přímo na dárkový stůl.",
        ],
      },
      quote: {
        text:
          "Vícebarevný 3D tisk je v tomhle úžasný. Když z podložky sundáte hotový, čistý model v několika barvách bez nutnosti vzít do ruky štětec, je to obrovská radost.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "model",
  },
  {
    slug: "knofliky-pro-stare-radio",
    title: "Knoflíky pro staré rádio",
    h1: "Jak jsme historickému rádiu vrátili jeho ztracenou tvář",
    kicker: "Příběh zakázky • Reverzní inženýrství & renovace",
    tag: "Reverzní inženýrství",
    metaTitle: "Výroba knoflíků pro staré rádio | Příběh zakázky 3D Spline",
    metaDescription:
      "Příběh o znovuvytvoření chybějících ovládacích knoflíků pro historické rádio. Změření hřídelky, CAD model s jemným vroubkováním a tisk přesné repliky.",
    keywords: [
      "knoflíky pro staré rádio",
      "reverzní inženýrství",
      "replika knoflíku rádia",
      "3D tisk historických dílů",
      "renovace rádia",
    ],
    lead:
      "Zákazník restauroval krásné historické rádio. Přístroj fungoval, ale na čelním panelu chyběly původní otočné knoflíky ladění. Podle zbytků původního dílu a přesného rozměru hřídelky jsme vymodelovali věrnou repliku.",
    heroImage: "/images/pripadove%20studie/radio%20knofliky/knofliky_nove_vs_stare.jpg",
    heroImageAlt: "Srovnání původního poškozeného knoflíku rádia a nové 3D tištěné repliky",
    gallery: [
      {
        src: "/images/pripadove%20studie/radio%20knofliky/radio_before.jpg",
        caption: "1. Historické rádio před doplněním ovládacích prvků",
      },
      {
        src: "/images/pripadove%20studie/radio%20knofliky/knofliky_nove_nenabarvene.jpg",
        caption: "2. Čerstvě vytištěné nové knoflíky přímo z 3D tiskárny",
      },
      {
        src: "/images/pripadove%20studie/radio%20knofliky/knofliky_nove_vs_stare.jpg",
        caption: "3. Porovnání tvaru a rozměrů nového knoflíku vůči originálu",
      },
      {
        src: "/images/pripadove%20studie/radio%20knofliky/knofliky_nove_nabarvene.jpg",
        caption: "4. Finální nalakované knoflíky s dobovou patinou připravené k montáži",
      },
    ],
    facts: [
      { label: "Materiál", value: "Technické PETG s možností laku" },
      { label: "Metoda", value: "Reverzní inženýrství + CAD" },
      { label: "Tolerance", value: "Přesnost vnitřní drážky ±0,15 mm" },
      { label: "Doba výroby", value: "Zkušební vzorek do 24 h" },
    ],
    story: {
      intro: {
        title: "Jak to celé začalo",
        subtitle: "Krásný veterán bez ovládacích prvků",
        paragraphs: [
          "Do dílny nám dorazil zákazník s historickým radiopřijímačem. Nádherný kus s poctivou dřevěnou skříní, mosazným lemováním a elektronkovým zesilovačem, který poctivě zrenovoval a uvedl do chodu.",
          "Jenže čelní panel byl nekompletní: původní bakelitové otočné knoflíky pro ladění stanic a hlasitost byly po desetiletích pryč. Z jednoho zbyly jen polámané úlomky a druhý chyběl úplně. Bez nich nebylo možné rádio pohodlně ovládat a přístroj působil opuštěně.",
        ],
      },
      challenge: {
        title: "Kde byl háček",
        subtitle: "D-profil hřídele a zachování dobové patiny",
        paragraphs: [
          "Koupit takové originální knoflíky je dnes prakticky nemožné – leda náhodou narazit na stejný vrak na burze veteránů. A univerzální hliníkové či plastové knoflíky ze současných elektrosoučástek by na rádiu z padesátých let působily jako pěst na oko.",
          "Navíc kovová hřídelka ladění měla specifický průměr s malou ploškou (takzvaný D-profil), která zabraňuje protáčení. Vnitřní kapsu knoflíku bylo nutné trefit s přesností na desetinu milimetru – příliš těsný otvor by při nasazení praskl, příliš volný by se na hřídeli protáčel.",
        ],
      },
      craft: {
        title: "Výroba a konstrukce v dílně",
        subtitle: "Digitální měřítko, CAD a obvodové vroubkování",
        paragraphs: [
          "Sedli jsme k tomu s digitálním posuvným měřidlem a podrobně změřili hřídel i zachované úlomky původního knoflíku. V parametrickém CAD programu jsme vymodelovali tělo knoflíku v původních proporcích.",
          "Na obvodu jsme vytvořili jemné drážkování pro jistý úchop prsty při ladění a na čele drobný ukazatel polohy. Zvláštní péči jsme věnovali vnitřní kapse pro hřídelku, kterou jsme odladili na toleranci ±0,15 mm.",
          "Nejprve jsme vytiskli jeden zkušební kus na vyzkoušení nasazení. Zákazník potvrdil, že knoflík zajel na hřídelku s příjemným tuhým odporem přesně tak, jak to u starých poctivých přístrojů má být. Následně jsme vytiskli finální pár.",
        ],
      },
      result: {
        title: "Moment, kdy to zacvaklo",
        subtitle: "Rádio získalo zpět svou duši",
        paragraphs: [
          "Zákazník si čerstvé výtisky převzal a doma je lehce přelakoval odstínem s jemnou patinou, aby knoflíky dokonale splynuly se zbytkem rádia.",
          "Když nám poslal fotky hotového rádia (můžete si je prohlédnout ve fotogalerii níže), byl to skvělý pohled. Rádio rázem ožilo a má zpět svou původní historickou tvář.",
        ],
      },
      quote: {
        text:
          "V takových chvílích funguje 3D tisk trochu jako stroj času. Z prázdného otvoru a pár úlomků dokážete vrátit historickému kousku jeho původní vzhled.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "drawing",
  },
];

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}
