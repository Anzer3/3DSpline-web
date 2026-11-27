import { ArrowRight } from "lucide-react";
import InquiryCta from "@/components/InquiryCta";
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
  const styles =
    variant === "dark"
      ? "bg-white text-slate-900 hover:bg-slate-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <InquiryCta
      tab={tab}
      prototypePackage={prototypePackage}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-sm active:scale-[0.99] ${styles}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </InquiryCta>
  );
}
