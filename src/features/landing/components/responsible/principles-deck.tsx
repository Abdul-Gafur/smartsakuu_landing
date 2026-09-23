"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { prefersReducedMotion } from "@/utils/motion";

import styles from "./responsible-section.module.css";

/**
 * The overlapping principle cards resolve into a grid while their section
 * scrolls past, driven by the `--align` custom property.
 */
export function PrinciplesDeck({ children }: { children: ReactNode }) {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    const section = deck?.closest("section");
    if (!deck || !section || prefersReducedMotion()) return;

    let frame = 0;
    const align = () => {
      frame = 0;
      if (window.innerWidth <= 800) return;
      const { top } = section.getBoundingClientRect();
      const range = Math.max(320, window.innerHeight * 0.72);
      const progress = Math.min(1, Math.max(0, (100 - top) / range));
      // Written directly to avoid re-rendering on every scroll frame.
      deck.style.setProperty("--align", progress.toFixed(3));
    };
    const scheduleAlignment = () => {
      if (!frame) frame = requestAnimationFrame(align);
    };

    window.addEventListener("scroll", scheduleAlignment, { passive: true });
    window.addEventListener("resize", scheduleAlignment);
    align();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleAlignment);
      window.removeEventListener("resize", scheduleAlignment);
    };
  }, []);

  return (
    <div ref={deckRef} className={styles.principles}>
      {children}
    </div>
  );
}
