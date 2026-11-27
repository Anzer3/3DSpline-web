// Časté dotazy na hlavní stránce. Jediný zdroj textů: používá je sekce
// FaqSection i strukturovaná data FAQPage pro vyhledávače.

export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: "Mohu si nechat vytisknout model stažený z internetu?",
    answer:
      "Ano, pokud to licence autora dovoluje (např. Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Netisknu modely s licencí Non-Commercial (NC), chráněná loga automobilek ani postavičky z filmů a her bez doložené licence držitele autorských práv.",
  },
  {
    question: "Jak se FDM 3D tisk liší od sériového vstřikolisu?",
    answer:
      "Díly vznikají nanášením plastového vlákna po tenkých vrstvách (obvykle 0,16 až 0,28 mm). Na povrchu je vidět jemná vrstvená struktura a díl není zrcadlově hladký jako z formy. Při správném návrhu je ale pevný a dá se vyrobit už od jednoho kusu, bez statisícových nákladů na vstřikovací formu.",
  },
  {
    question: "Z jakého materiálu díl bude a vydrží v létě v autě?",
    answer:
      "Většinu dílů tisknu z PETG a PLA. PETG je houževnaté a vydrží zhruba do 75–80 °C, proto se hodí na držáky, přípravky a díly, které musí něco vydržet. PLA má ostré detaily a spoustu barev, takže je ideální na medaile, poháry a dárky, ale měkne už kolem 50–55 °C a do rozpáleného auta se nehodí. Na díly, které budou venku nebo na přímém slunci, můžu na vyžádání použít ASA (do 95 °C). Když si nejste jistí, napište, k čemu díl bude, a materiál vyberu já.",
  },
  {
    question: "Jsou výtisky vhodné pro styk s potravinami či dětské hračky?",
    answer:
      "Běžný FDM tisk není certifikovaný pro styk s potravinami. Mezi vrstvami se mohou usazovat nečistoty a bakterie, které mytím spolehlivě neodstraníte. Proto netisknu nic, co má přijít do přímého styku s jídlem, ani hračky pro nejmenší děti.",
  },
  {
    question: "Za co ručíte a co je na odpovědnosti zákazníka?",
    answer:
      "Ručím za to, že díl vyrobím podle dodaných podkladů, v obvyklé toleranci ±0,2 mm a z kvalitních značkových filamentů. Jak díl obstojí ve vašem provozu, ale dopředu vědět nemůžu, takže otestovat ho a rozhodnout o jeho nasazení musíte vy. Právě proto nabízím zkušební kus.",
  },
  {
    question: "Jaké zakázky z principu nepřijímáte?",
    answer:
      "Z bezpečnostních a právních důvodů netisknu zbraně, tlumiče, součásti střeliva a pyrotechniky, zdravotnické pomůcky a implantáty ani padělky chráněných ochranných známek bez písemného souhlasu majitele.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://3dspline.cz/#faq",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
