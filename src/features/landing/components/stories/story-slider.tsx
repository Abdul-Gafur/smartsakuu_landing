"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

import { prefersReducedMotion } from "@/utils/motion";

import type { StoryId } from "../../constants";
import styles from "./stories-section.module.css";

export type StorySlide = {
  id: StoryId;
  tabLabel: string;
  content: ReactNode;
};

type StorySliderProps = {
  heading: ReactNode;
  tablistLabel: string;
  previousLabel: string;
  nextLabel: string;
  slides: StorySlide[];
  /** Rendered below the controls, e.g. credits. */
  footer: ReactNode;
};

/** School stories slide sideways; tabs, arrows and swipes stay in step. */
export function StorySlider({
  heading,
  tablistLabel,
  previousLabel,
  nextLabel,
  slides,
  footer,
}: StorySliderProps) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollFrameRef = useRef(0);

  const last = slides.length - 1;

  const markStory = (index: number) => {
    if (index === currentRef.current) return;
    currentRef.current = index;
    setCurrent(index);
    // Keep only the visible story playing.
    slideRefs.current.forEach((slide, i) => {
      if (i !== index) slide?.querySelector("video")?.pause();
    });
  };

  const goToStory = (index: number, focus = false) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    markStory(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent, index: number) => {
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (target === undefined) return;
    event.preventDefault();
    goToStory(target, true);
  };

  const handleScroll = () => {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      const track = trackRef.current;
      const root = rootRef.current;
      if (!track || !root) return;

      const distance = (i: number) =>
        Math.abs((slideRefs.current[i]?.offsetLeft ?? 0) - track.scrollLeft);
      const nearest = slides.reduce(
        (best, _slide, i) => (distance(i) < distance(best) ? i : best),
        0,
      );
      markStory(nearest);
      root.style.setProperty(
        "--story-fill",
        String((track.scrollLeft + track.clientWidth) / track.scrollWidth),
      );
    });
  };

  return (
    <div ref={rootRef} className="wrap">
      <div className={styles.heading}>
        {heading}
        <div className={styles.tabs} role="tablist" aria-label={tablistLabel}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`story-${slide.id}`}
              aria-controls={`story-panel-${slide.id}`}
              aria-selected={index === current}
              tabIndex={index === current ? 0 : -1}
              onClick={() => goToStory(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {slide.tabLabel}
            </button>
          ))}
        </div>
      </div>
      <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className={styles.panel}
            id={`story-panel-${slide.id}`}
            role="tabpanel"
            aria-labelledby={`story-${slide.id}`}
            tabIndex={0}
            inert={index !== current}
          >
            {slide.content}
          </article>
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
        <div className={styles.arrows}>
          <button
            className="arrow-button"
            type="button"
            data-direction="previous"
            aria-label={previousLabel}
            disabled={current === 0}
            onClick={() => goToStory(current - 1)}
          >
            <Icon name="arrow" />
          </button>
          <button
            className="arrow-button"
            type="button"
            aria-label={nextLabel}
            disabled={current === last}
            onClick={() => goToStory(current + 1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      {footer}
    </div>
  );
}
