"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, MessageSquareText } from "lucide-react";

const HERO_THRESHOLD = 350; // zobrazit až po opuštění úvodní sekce

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let formInView = false;
    let frame = 0;

    // Nejvýš jeden přepočet na snímek
    const update = () => {
      frame = 0;
      setVisible(!formInView && window.scrollY > HERO_THRESHOLD);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Viditelnost formuláře hlídá IntersectionObserver, takže scroll handler
    // nemusí při každém posunu měřit layout (getBoundingClientRect).
    const formEl = document.querySelector("#poptavka");
    const observer = formEl
      ? new IntersectionObserver(([entry]) => {
          formInView = entry.isIntersecting;
          scheduleUpdate();
        })
      : null;
    if (formEl) observer?.observe(formEl);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToInquiry = () => {
    const formEl = document.querySelector("#poptavka");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:hidden pointer-events-none transition-all duration-300">
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
