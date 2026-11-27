"use client";

import { useEffect, useRef } from "react";

const MIN_THUMB = 40;

// Posuvník ležící nad stránkou. Nativní posuvník si vždy ukrojí pruh vedle obsahu,
// takže by barvy sekcí nesahaly až k okraji. Samotné posouvání zůstává nativní.
export default function OverlayScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    // Dotyková zařízení už posuvník přes obsah mají
    if (!track || !thumb || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-overlay-scrollbar");

    let thumbHeight = 0;
    const scrollRange = () => root.scrollHeight - root.clientHeight;
    const trackRange = () => root.clientHeight - thumbHeight;

    const update = () => {
      const scrollable = scrollRange() > 0;
      track.style.display = scrollable ? "block" : "none";
      if (!scrollable) return;
      thumbHeight = Math.max(MIN_THUMB, (root.clientHeight * root.clientHeight) / root.scrollHeight);
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${(window.scrollY / scrollRange()) * trackRange()}px)`;
    };

    let dragStart: { y: number; scroll: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      if (e.target !== thumb) {
        // Klik mimo jezdce posune o stránku
        const direction = e.clientY < thumb.getBoundingClientRect().top ? -1 : 1;
        window.scrollBy({ top: direction * root.clientHeight * 0.9 });
        return;
      }
      dragStart = { y: e.clientY, scroll: window.scrollY };
      thumb.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragStart || trackRange() <= 0) return;
      const delta = ((e.clientY - dragStart.y) / trackRange()) * scrollRange();
      // "instant" přebije plynulé posouvání, jinak by jezdec za myší zaostával
      window.scrollTo({ top: dragStart.scroll + delta, behavior: "instant" });
    };
    const onPointerEnd = () => {
      dragStart = null;
    };

    track.addEventListener("pointerdown", onPointerDown);
    thumb.addEventListener("pointermove", onPointerMove);
    thumb.addEventListener("lostpointercapture", onPointerEnd);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Výška stránky se mění i bez změny okna (FAQ, formulář, jiná podstránka)
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    update();

    return () => {
      root.classList.remove("has-overlay-scrollbar");
      track.removeEventListener("pointerdown", onPointerDown);
      thumb.removeEventListener("pointermove", onPointerMove);
      thumb.removeEventListener("lostpointercapture", onPointerEnd);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={trackRef} aria-hidden="true" className="fixed inset-y-0 right-0 z-[2147483647] hidden w-[7px]">
      <div ref={thumbRef} className="w-full bg-blue-600 hover:bg-blue-700 touch-none" />
    </div>
  );
}
