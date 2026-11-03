"use client";

import { useEffect } from "react";

// Entrances for the notes: headings, cards, list rows and article sections rise and fade in once, staggered.
// Content stays visible if this never runs, and with reduced motion nothing moves.
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".section-heading, .featured-card, .catalog-row, .post-header, .post-body > h2, .post-body > h3, .study-steps > *"));
    if (!els.length || !("IntersectionObserver" in window)) return;
    els.forEach((el) => {
      el.setAttribute("data-rv", "");
      const group = Array.from(el.parentElement?.children ?? []).filter((c) => c.hasAttribute("data-rv"));
      el.style.setProperty("--d", String(Math.min(group.indexOf(el), 6)));
    });
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
