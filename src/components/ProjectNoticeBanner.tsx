import React from "react";
import { AlertCircle } from "lucide-react";

export default function ProjectNoticeBanner() {
  return (
    <div className="relative z-50 bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white py-2.5 px-4 shadow-md border-b border-red-500/40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 sm:gap-3 text-center text-xs sm:text-sm font-medium">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white text-rose-700 shadow-sm shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          Projekt v přípravě
        </span>
        <span className="text-white font-medium">
          Web má zatím pouze informativní charakter. Výroba a příjem poptávek budou spuštěny již brzy.
        </span>
      </div>
    </div>
  );
}
