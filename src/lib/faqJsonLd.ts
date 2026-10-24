export const faqJsonLd = {
  "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://3dspline.cz/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Mohu si nechat vytisknout model stažený z internetu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ano, pokud to licenční podmínky autora umožňují (např. licence Public Domain, CC0 nebo Creative Commons s povoleným komerčním využitím). Nelze tisknout modely šířené pod licencí Non-Commercial (NC), chráněná loga automobilek ani franšízové postavičky bez doložené licence držitele autorských práv.",
        },
      },
      {
        "@type": "Question",
        name: "Jak se FDM 3D tisk liší od sériového vstřikolisu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Díly vznikají nanášením plastového vlákna po mikroskopických vrstvách (obvykle 0,16 až 0,28 mm). Na povrchu je vidět jemná vrstvená struktura a díl není zrcadlově hladký jako z formy. Při správném návrhu a orientaci tiskových vláken však nabízí vynikající pevnost a umožňuje výrobu od 1 ks bez statisícových nákladů na vstřikovací formu.",
        },
      },
      {
        "@type": "Question",
        name: "Vydrží díl v létě v autě nebo na přímém slunci?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Záleží na zvoleném materiálu. Běžné PLA začíná měknout už kolem 50–55 °C, proto je v létě na palubní desce či za sklem nevhodné. Pro automobilové a venkovní aplikace tiskneme z houževnatého PETG (do ~75–80 °C) nebo UV-stabilního ASA (do ~95 °C), které odolá i horkému letnímu slunci.",
        },
      },
      {
        "@type": "Question",
        name: "Jsou výtisky vhodné pro styk s potravinami či dětské hračky?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standardní FDM tisk není hygienicky certifikovaný pro přímý styk s jídlem. Mezi jednotlivými mikroskopickými vrstvami se mohou usazovat nečistoty a bakterie, které nelze běžným mytím spolehlivě odstranit. Naše výrobky proto nedodáváme pro potravinářské účely ani jako hračky pro nejmenší děti.",
        },
      },
      {
        "@type": "Question",
        name: "Za co ručíte a co je na odpovědnosti zákazníka?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ručíme za bezchybné zhotovení dle dodaných CAD podkladů, dodržení tolerancí (obvykle ±0,2 mm) a použití kvalitních značkových filamentů. Vzhledem k různorodosti namáhání a provozních prostředí nese finální odpovědnost za otestování a bezpečnost nasazení dílu zákazník. K tomuto účelu nabízíme předvýrobní prototypový vzorek.",
        },
      },
      {
        "@type": "Question",
        name: "Jaké zakázky z principu nepřijímáte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Z bezpečnostních a právních důvodů netiskneme zbraně, tlumiče, pyrotechnické a funkční prvky střeliva, zdravotnické náhrady či implantáty, ani padělky chráněných ochranných známek bez písemného oprávnění majitele.",
        },
      },
    ],
};

