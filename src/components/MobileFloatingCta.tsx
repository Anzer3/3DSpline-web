"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, MessageSquareText, Phone } from "lucide-react";

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 350; // show after leaving initial hero
      const formEl = document.querySelector("#poptavka");

      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        // Hide when form is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false);
          return;
        }
      }

      setVisible(scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToInquiry = () => {
    const formEl = document.querySelector("#poptavka");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden pointer-events-none transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center gap-2 p-1.5 bg-[#0F1E2E]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-xl pointer-events-auto">
        <a
          href="mailto:info@3dspline.cz"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
        >
          <MessageSquareText className="w-3.5 h-3.5 text-blue-400" />
          <span>info@3dspline.cz</span>
        </a>

        <button
          type="button"
          onClick={scrollToInquiry}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm"
        >
          <span>Poptat výrobu</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
