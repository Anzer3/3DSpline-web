// Jediné místo s údaji o provozovateli webu.
// Provozovatel zatím nemá IČO – prázdná pole se na webu nezobrazují.
// Po přidělení IČO stačí doplnit pole níže (operatorName, ico, dic, vatPayer, address.street, address.zip).

export type CompanyInfo = {
  brand: string;
  /** Jméno člověka, který za značkou stojí (zobrazuje se v sekci „Kdo za tím stojí“). */
  founderName: string;
  /** Jméno a příjmení podnikatele nebo název firmy (doplnit po přidělení IČO). */
  operatorName: string;
  /** IČO (doplnit po přidělení). */
  ico: string;
  /** DIČ (doplnit, pokud bude přiděleno). */
  dic: string;
  /** Plátce DPH – po registraci nastavit na true. */
  vatPayer: boolean;
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  email: string;
  web: string;
  instagram: string;
};

export const company: CompanyInfo = {
  brand: "3D Spline",
  founderName: "Tomáš Řezníček",
  operatorName: "",
  ico: "",
  dic: "",
  vatPayer: false,
  address: {
    street: "",
    zip: "",
    city: "Olomouc",
    country: "Česká republika",
  },
  email: "info@3dspline.cz",
  web: "https://3dspline.cz",
  instagram: "https://www.instagram.com/3dspline.cz/",
};

/** True, jakmile je vyplněné IČO. */
export const hasIco = company.ico.trim() !== "";

/** True, pokud je vyplněná ulice nebo PSČ (tedy úplnější adresa než jen město). */
export const hasStreetAddress =
  company.address.street.trim() !== "" || company.address.zip.trim() !== "";

/** Adresa složená jen z vyplněných částí, např. „Ulice 1, 779 00 Olomouc“. */
export function formatAddress(): string {
  const { street, zip, city, country } = company.address;
  const cityLine = [zip, city].filter((p) => p.trim() !== "").join(" ");
  return [street, cityLine, country].filter((p) => p.trim() !== "").join(", ");
}

/** Řádky „Provozovatel“ pro právní stránky – jen vyplněné údaje. */
export function operatorRows(operatorLabel = "Provozovatel"): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    {
      label: operatorLabel,
      value: company.operatorName.trim() !== "" ? `${company.operatorName} (${company.brand})` : company.brand,
    },
  ];
  if (company.ico.trim() !== "") rows.push({ label: "IČO", value: company.ico });
  if (company.dic.trim() !== "") rows.push({ label: "DIČ", value: company.dic });
  if (company.ico.trim() !== "" && !company.vatPayer && company.dic.trim() === "") {
    rows.push({ label: "DPH", value: "Neplátce DPH" });
  }
  if (hasStreetAddress) rows.push({ label: "Sídlo", value: formatAddress() });
  return rows;
}
