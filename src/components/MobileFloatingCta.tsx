"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0F1E2E] border-t border-slate-800 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex items-center justify-between gap-3">
        <a
          href="mailto:info@3dspline.cz"
          className="text-sm text-slate-300 hover:text-white transition-colors truncate"
        >
          info@3dspline.cz
        </a>

        <button
          type="button"
          onClick={scrollToInquiry}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shrink-0"
        >
          <span>Poptat výrobu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
