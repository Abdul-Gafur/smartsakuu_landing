"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import type { HeadteacherStoryId } from "../../constants";
import styles from "./headteachers-section.module.css";

export type Testimonial = {
  id: HeadteacherStoryId;
  poster: string;
  video: string;
  videoLabel: string;
  quote: string;
  role: string;
  place: string;
  dotLabel: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  initialIndex: number;
  labels: Record<"previous" | "next" | "dots" | "play", string>;
};

/** Minimum horizontal travel, in pixels, for a touch swipe to change story. */
const SWIPE_THRESHOLD = 45;

/** Headteacher video stories; dots, arrows and swipes move the slider. */
export function TestimonialCarousel({
  testimonials,
  initialIndex,
  labels,
}: TestimonialCarouselProps) {
  const [active, setActive] = useState(initialIndex);
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStartRef = useRef<number | undefined>(undefined);

  const count = testimonials.length;

  const showStory = (index: number, focus = false) => {
    const next = (index + count) % count;
    setActive(next);
    // Stop any other story's video and return it to its poster.
    videoRefs.current.forEach((video, i) => {
      if (i !== next) video?.pause();
    });
    setPlaying((current) => (current === next ? current : null));
    if (focus) dotRefs.current[next]?.focus();
  };

  const play = (index: number) => {
    setPlaying(index);
    void videoRefs.current[index]?.play();
  };

  const handleDotKeyDown = (event: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    showStory(index + step, true);
  };

  return (
    <div>
      <div className={styles.controls}>
        <button
          className="arrow-button"
          type="button"
          data-direction="previous"
          aria-label={labels.previous}
          onClick={() => showStory(active - 1)}
        >
          <Icon name="arrow" />
        </button>
        <div className={styles.dots} role="tablist" aria-label={labels.dots}>
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              ref={(element) => {
                dotRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`leader-dot-${index + 1}`}
              aria-controls={`leader-story-${index + 1}`}
              aria-selected={index === active}
              aria-label={testimonial.dotLabel}
              tabIndex={index === active ? 0 : -1}
              onClick={() => showStory(index)}
              onKeyDown={(event) => handleDotKeyDown(event, index)}
            />
          ))}
        </div>
        <button
          className="arrow-button"
          type="button"
          aria-label={labels.next}
          onClick={() => showStory(active + 1)}
        >
          <Icon name="arrow" />
        </button>
      </div>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ "--i": active } as CSSProperties}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") {
              swipeStartRef.current = event.clientX;
            }
          }}
          onPointerUp={(event) => {
            const start = swipeStartRef.current;
            if (start === undefined) return;
            swipeStartRef.current = undefined;
            const distance = event.clientX - start;
            if (Math.abs(distance) > SWIPE_THRESHOLD) {
              showStory(active - Math.sign(distance));
            }
          }}
        >
          {testimonials.map((testimonial, index) => {
            const isActive = index === active;
            return (
              <figure
                key={testimonial.id}
                className={cn(
                  styles.card,
                  isActive && styles.active,
                  playing === index && styles.playing,
                )}
                id={`leader-story-${index + 1}`}
                role="tabpanel"
                aria-labelledby={`leader-dot-${index + 1}`}
                aria-hidden={!isActive}
              >
                <div
                  className={styles.media}
                  onClick={() => {
                    if (!isActive) showStory(index);
                  }}
                >
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element;
                    }}
                    playsInline
                    preload="none"
                    poster={testimonial.poster}
                    controls={playing === index}
                    aria-label={testimonial.videoLabel}
                    onEnded={(event) => {
                      event.currentTarget.pause();
                      setPlaying(null);
                    }}
                  >
                    <source src={testimonial.video} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    className={styles.play}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => play(index)}
                  >
                    {labels.play}
                  </button>
                  <blockquote>{testimonial.quote}</blockquote>
                </div>
                <figcaption>
                  <b>{testimonial.role}</b>
                  <span>{testimonial.place}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
