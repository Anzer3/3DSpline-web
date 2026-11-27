"use client";

import type { ReactNode } from "react";
import type { InquiryTabKey } from "@/lib/services";

interface InquiryCtaProps {
  /** Záložka poptávkového formuláře, která se má otevřít */
  tab: InquiryTabKey;
  /** Zaškrtne v formuláři prototypovací balíček */
  prototypePackage?: boolean;
  /** Název příběhu z dílny, který se předvyplní do poznámky */
  storyTitle?: string;
  className: string;
  children: ReactNode;
  /** Vykreslí odkaz na #poptavka (funguje i bez JavaScriptu) místo tlačítka */
  asLink?: boolean;
}

/**
 * Jediná interaktivní část jinak serverových sekcí: přepne záložku
 * poptávkového formuláře (událost `select-inquiry-tab`) a plynule k němu odroluje.
 */
export default function InquiryCta({
  tab,
  prototypePackage,
  storyTitle,
  className,
  children,
  asLink = false,
}: InquiryCtaProps) {
  const openInquiry = () => {
    window.dispatchEvent(
      new CustomEvent("select-inquiry-tab", {
        detail: {
          tab,
          ...(prototypePackage && { prototypePackage: true }),
          ...(storyTitle && { storyTitle }),
        },
      })
    );
    const formEl = document.querySelector("#poptavka");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  if (asLink) {
    return (
      <a
        href="#poptavka"
        onClick={(e) => {
          if (openInquiry()) e.preventDefault();
        }}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={openInquiry} className={className}>
      {children}
    </button>
  );
}
