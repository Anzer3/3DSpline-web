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
  facts: { label: string; value: string }[];
  story: {
    intro: StorySection;
    challenge: StorySection;
    craft: StorySection;
    result: StorySection;
    quote: { text: string; author: string };
  };
  inquiryTab: "model" | "drawing";
  /** Datum publikace a poslední úpravy obsahu (ISO, YYYY-MM-DD). */
  datePublished?: string;
  dateModified?: string;
}

export const caseStudiesData: CaseStudyData[] = [
  {
    slug: "madla-na-poklicky",
    title: "Madla na pokličky",
    h1: "Náhradní madla na starší smaltované pokličky",
    kicker: "Příběhy z dílny • Náhradní díly",
    tag: "Náhradní díly",
    metaTitle: "Výroba náhradních madel na pokličky | Příběhy z dílny 3D Spline",
    metaDescription:
      "Náhradní madla na smaltované pokličky. Zákazník poslal poškozené díly, my jsme je odměřili, vyrobili prototyp a po odsouhlasení vytiskli 6 sad z tepelně odolného materiálu.",
    keywords: [
      "madla na pokličky",
      "náhradní díly na hrnce",
      "úchyt na pokličku",
      "3D tisk náhradních dílů",
      "držadlo pokličky",
    ],
    lead:
      "Zákazník měl starší sadu smaltovaných hrnců, kterým po letech popraskaly plastové úchyty na pokličkách. Hrnce byly v pořádku, jen originální díly už nešly koupit. Poslal nám poškozená madla a my jsme z nich vyrobili nová.",
    heroImage: "/images/pribehy-z-dilny/poklicky/uvodni_fotka_clanku.jpg",
    heroImageAlt: "Madla na smaltované pokličky",
    facts: [
      { label: "Materiál", value: "Tepelně odolný plast (bílý)" },
      { label: "Odolnost", value: "Snese cca 100 °C i mytí" },
      { label: "Objem zakázky", value: "6 sad (12 dílů)" },
      { label: "Postup", value: "Odměření, prototyp, série" },
    ],
    story: {
      intro: {
        title: "Zadání a výchozí stav",
        subtitle: "Popraskané plastové úchyty na funkčním nádobí",
        paragraphs: [
          "Zákazník se ozval s fotkami starší sady modrých smaltovaných hrnců a pokliček. Smalt byl pořád v dobrém stavu, ale bílé plastové úchyty stářím zkřehly a popraskaly.",
          "Hrnce pro něj měly citovou hodnotu a nechtěl je vyhazovat, a tak se zeptal, jestli by se daly úchyty vyrobit znovu. Poškozené díly nám poslal, abychom se na ně mohli podívat naživo.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/poklicky/madlo_original.jpg",
          alt: "Původní madlo pokličky",
          caption: "Původní madlo pokličky",
        },
      },
      challenge: {
        title: "Co dávalo smysl vyrábět",
        subtitle: "Madla na pokličky ano, ucha na hrnce ne",
        paragraphs: [
          "Původně zákazník myslel na ucha hrnců i madla pokliček. U bočních uch jsme mu ale po prohlédnutí na rovinu řekli, že to nedoporučujeme. Měla složité tvary kopírující stěnu hrnce a ladění modelu by zabralo příliš mnoho času.",
          "U madel na pokličky to naopak dávalo smysl.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/poklicky/madlo_hrnce.jpg",
          alt: "Původní boční ucho hrnce s prasklinami",
          caption: "Boční ucho hrnce s prasklinami – složitý tvar, který jsme nedoporučili vyrábět",
        },
      },
      craft: {
        title: "Odměření a prototyp",
        subtitle: "Dvoudílné madlo a zkouška na pokličce",
        paragraphs: [
          "Madlo je dvoudílné. Spodní kruhová podložka má výřez, který zapadne na kovové očko pokličky. Původně pod očkem držel rezavý plíšek, který jsme nahradili běžnou kovovou maticí. Místo na ni jsme přesně odměřili.",
          "Tvar jsme mírně zjednodušili, aby se dobře tiskl. Ještě než jsme poslali prototyp, vyzkoušeli jsme asi tři varianty uchycení šroubu. Nejspolehlivější byla ta, kdy je sice vidět hlavička nerezového šroubu, ale je zapuštěná v madle. Zákazníkovi jsme poslali zkušební prototyp, aby si doma ověřil, jak na pokličce sedí.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/poklicky/original_vs_prototyp.jpg",
          alt: "Porovnání původního madla a nového prototypu",
          caption: "Původní madlo a nový prototyp",
        },
      },
      result: {
        title: "Výsledek",
        subtitle: "6 hotových sad",
        paragraphs: [
          "Prototyp sedl. Po otestování jsme ho jen lehce upravili: hlavičku šroubu jsme zapustili ještě o kousek hlouběji, aby o ni nešlo zavadit prsty. Zákazník se rozhodl vyrobit madla pro všechny pokličky, celkem 6 sad.",
          "Všech 6 sad jsme vytiskli z tepelně odolného bílého materiálu. Zákazník je doma přišrouboval a nádobí může zase sloužit dál.",
          "Když vám praskl plastový díl, který už nejde koupit, pošlete nám ho nebo aspoň fotku. Společně vyhodnotíme, co se dá vyrobit.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/poklicky/poklicky_final.jpg",
          alt: "Finální madla na pokličky",
          caption: "Finální nově namontovaná madla na pokličkách",
        },
      },
      quote: {
        text:
          "Včera jsem konečně přijel domů a namontoval je. Vypadají úplně perfektně a určitě ještě službu udělají.",
        author: "Jakub, zákazník",
      },
    },
    inquiryTab: "drawing",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
  },
  {
    slug: "model-formule",
    title: "Série 50 formulí",
    h1: "Sériová výroba 50 formulí podle modelu zákazníka",
    kicker: "Příběhy z dílny • Sériový tisk z hotového modelu",
    tag: "Sériový tisk",
    metaTitle: "Sériová výroba formulí podle modelu zákazníka | Příběhy z dílny 3D Spline",
    metaDescription:
      "Sériový 3D tisk 50 formulí podle hotového modelu zákazníka. Jeden zkušební prototyp, doladění tiskových nastavení a rychlá a přímočará výroba celé série.",
    keywords: [
      "sériová výroba 3D tisk",
      "3D tisk podle modelu zákazníka",
      "model formule 3D tisk",
      "vícebarevný 3D tisk",
      "malosériová výroba",
    ],
    lead:
      "Zákazník měl hotový 3D model formule a potřeboval jich vyrobit 50 kusů. Když model už existuje, je cesta k hotové sérii opravdu přímočará: jeden zkušební prototyp pro ověření kvality a pak rovnou sériová výroba.",
    heroImage: "/images/pribehy-z-dilny/formule/formule.jpg",
    heroImageAlt: "Hotová série vytištěných formulí",
    facts: [
      { label: "Počet kusů", value: "50 ks" },
      { label: "Podklady", value: "Hotový 3D model od zákazníka" },
      { label: "Materiál", value: "PLA" },
      { label: "Postup", value: "Zkušební prototyp, pak série" },
    ],
    story: {
      intro: {
        title: "Zadání",
        subtitle: "Hotový model a série 50 kusů",
        paragraphs: [
          "Zákazník se na nás obrátil s vlastním 3D modelem formule a poptávkou na sérii 50 kusů.",
          "Model byl připravený, takže se nemuselo nic měřit ani kreslit. Stačilo ho správně vytisknout.",
        ],
      },
      challenge: {
        title: "Zkušební prototyp",
        subtitle: "Ověření kvality před spuštěním série",
        paragraphs: [
          "Před sériovou výrobou jsme vytiskli jeden zkušební prototyp, na kterém jsme si ověřili kvalitu tisku a detaily.",
          "Po jeho vyhodnocení jsme mohli rovnou přejít k sérii. Víc kroků nebylo potřeba.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/formule/prototyp%20a%20dve%20finalni%20formule.jpg",
          alt: "Zkušební prototyp a dvě finální formule",
          caption: "Zkušební prototyp (vlevo) a dvě finální formule",
        },
      },
      craft: {
        title: "Nastavení tisku a série",
        subtitle: "Pohráli jsme si s nastavením pro vyšší kvalitu",
        paragraphs: [
          "Podle geometrie modelu jsme doladili tisková nastavení pro co nejlepší kvalitu povrchu a drobných detailů.",
          "Po schválení prototypu už jsme rovnou spustili sériovou výrobu celé padesátikusové série.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/formule/series-formule.jpg",
          alt: "Sériový tisk formulí na tiskové podložce",
          caption: "Sériový tisk formulí na celé tiskové podložce",
        },
      },
      result: {
        title: "Výsledek",
        subtitle: "50 hotových formulí",
        paragraphs: [
          "Celá série 50 formulí byla hotová rychle a bez zbytečných komplikací.",
          "Pokud máte vlastní 3D model, může být cesta k hotovým kusům opravdu přímočará. Pošlete nám data a domluvíme materiál, barvy a počet kusů.",
        ],
      },
      quote: {
        text:
          "Když máte hotový model, může být výroba rychlá a přímočará. Prototyp ověří kvalitu a pak už se jen tiskne.",
        author: "Tomáš, 3D Spline",
      },
    },
    inquiryTab: "model",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
  },
  {
    slug: "knofliky-pro-stare-radio",
    title: "Knoflíky pro staré rádio",
    h1: "Replika poškozených knoflíků pro rádio z roku 1965",
    kicker: "Příběhy z dílny • Reverzní inženýrství a renovace",
    tag: "Reverzní inženýrství",
    metaTitle: "Výroba knoflíků pro staré rádio | Příběhy z dílny 3D Spline",
    metaDescription:
      "Replika knoflíků pro rádio z roku 1965. Zákazník poslal původní knoflíky jako vzor, my jsme je odměřili, vymodelovali a vytiskli. Hotové díly si zákazník nastříkal do původního odstínu.",
    keywords: [
      "knoflíky pro staré rádio",
      "reverzní inženýrství",
      "replika knoflíku rádia",
      "3D tisk historických dílů",
      "renovace rádia",
    ],
    lead:
      "Zákazník renovoval rádio z roku 1965. Náhradní díly se prakticky nedají sehnat, proto nám poslal původní knoflíky jako vzor a my jsme z nich vytvořili co nejvěrnější repliky.",
    heroImage: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nabarvene.jpg",
    heroImageAlt: "Nové repliky knoflíků nastříkané do původního odstínu",
    facts: [
      { label: "Rádio", value: "Z roku 1965" },
      { label: "Podklad", value: "Původní knoflíky zapůjčené jako vzor" },
      { label: "Materiál", value: "Bílý plast vhodný k lakování" },
      { label: "Úprava", value: "Zákazník nastříkal do původního odstínu" },
    ],
    story: {
      intro: {
        title: "Zadání a výchozí stav",
        subtitle: "Rádio z roku 1965 s chybějícím a rozpraskanými knoflíky",
        paragraphs: [
          "Zákazník renovoval rádio z roku 1965, které je už dnes poměrně vzácné. Jeden knoflík chyběl úplně a dva zbylé byly rozpraskané, takže byla jen otázka času, kdy se rozpadnou i ony.",
          "Náhradní knoflíky se prakticky nedají sehnat, a tak se zákazník zeptal, jestli by se daly na 3D tiskárně vytisknout co nejpodobnější repliky.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/radio_before.jpg",
          alt: "Rádio z roku 1965 před doplněním knoflíků",
          caption: "Výchozí stav rádia",
        },
      },
      challenge: {
        title: "Na co jsme si dávali pozor",
        subtitle: "Tvar, rozměry a správná barva",
        paragraphs: [
          "Knoflík musí sednout na hřídelku a také vypadat jako originál. Nejlepší cesta k přesné replice je mít vzor v ruce, protože se z něj dají všechny rozměry změřit přímo.",
          "Další otázkou byla barva. Původní knoflíky jsou popelavě šedé, zatímco terčík uprostřed je krémově bílý. Tisk z bílého materiálu je vhodný základ, který se dá dobarvit podle potřeby.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/original.jpg",
          alt: "Původní knoflík rádia",
          caption: "Původní knoflík, podle kterého jsme repliku vyráběli",
        },
      },
      craft: {
        title: "Odměření a modelování",
        subtitle: "Replika podle zapůjčeného vzoru",
        paragraphs: [
          "Zákazník nám původní knoflíky poslal jako vzor, takže jsme mohli všechno přesně odměřit přímo na nich a podle toho knoflík vymodelovat.",
          "Každý knoflík jsme rozdělili na dva kusy, které se po vytištění jen slepí k sobě. Díky tomu se dá vyrobit i vnitřní část a tisk je spolehlivější. Vytiskli jsme je z čistě bílého materiálu, který si zákazník mohl sám dobarvit.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_nenabarvene.jpg",
          alt: "Nově vytištěné repliky knoflíků před povrchovou úpravou",
          caption: "Nově vytištěné knoflíky před lakováním",
        },
      },
      result: {
        title: "Výsledek",
        subtitle: "Knoflíky, které sedí a po nastříkání vypadají skoro jako originál",
        paragraphs: [
          "Zákazník knoflíky zběžně nasadil a sedly skvěle. Po nastříkání do správného odstínu budou podle něj skoro jako originál. Rozhodně lepší než stav, ve kterém rádio původně bylo.",
          "Když potřebujete nahradit díl, který už nejde koupit, a máte po ruce původní kus nebo jeho zbytky, můžeme z něj vytvořit repliku.",
        ],
        image: {
          src: "/images/pribehy-z-dilny/radio%20knofliky/knofliky_nove_vs_stare.jpg",
          alt: "Nové repliky knoflíků vedle původních",
          caption: "Nové bílé repliky (nahoře) vedle původních knoflíků",
        },
      },
      quote: {
        text:
          "Zkoušel jsem je zběžně nasadit a naprostá pecka! Až je hodím do barvy, bude to skoro jako originál.",
        author: "Jakub, zákazník",
      },
    },
    inquiryTab: "drawing",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
  },
];

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}
