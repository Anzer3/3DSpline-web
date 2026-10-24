"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import type { InquiryTabKey } from "@/lib/services";

interface ServiceCtaButtonProps {
  label: string;
  tab: InquiryTabKey;
  prototypePackage?: boolean;
  variant?: "primary" | "dark";
}

export default function ServiceCtaButton({
  label,
  tab,
  prototypePackage,
  variant = "primary",
}: ServiceCtaButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("select-inquiry-tab", {
        detail: prototypePackage ? { tab, prototypePackage: true } : { tab },
      })
    );
    const formEl = document.querySelector("#poptavka");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const styles =
    variant === "dark"
      ? "bg-white text-slate-900 hover:bg-slate-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-sm active:scale-[0.99] ${styles}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
