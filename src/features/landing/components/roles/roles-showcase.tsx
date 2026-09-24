"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/utils/cn";

import type { RoleId } from "../../constants";
import { ActiveRoleContext, useRoleNavigation } from "./role-context";
import styles from "./roles-section.module.css";

/** Height of the sticky site header on wide screens. */
const HEADER_HEIGHT = 92;

export type RoleTab = {
  id: RoleId;
  label: string;
  panel: ReactNode;
};

type RolesShowcaseProps = {
  /** Section label, heading and introduction. */
  intro: ReactNode;
  tablistLabel: string;
  tabs: RoleTab[];
};

/**
 * Role tabs for the "AI in context" section. On wide screens where
 * every panel fits, the section pins in place and scrolling steps through the
 * tabs; the page continues once the last tab has had its turn.
 */
export function RolesShowcase({
  intro,
  tablistLabel,
  tabs,
}: RolesShowcaseProps) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const narrow = useMediaQuery("(max-width: 800px)");
  const { register } = useRoleNavigation();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Mirrors `pinned` for scroll handlers, which run outside React renders.
  const pinnedRef = useRef(false);

  const tabCount = tabs.length;

  const scrollRange = useCallback(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    return section && stage ? section.offsetHeight - stage.offsetHeight : 0;
  }, []);

  /** While pinned, selects the tab that matches the scroll position. */
  const syncToScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!pinnedRef.current || !section) return;

    const progress =
      (HEADER_HEIGHT - section.getBoundingClientRect().top) / scrollRange();
    const index = Math.floor(progress * tabCount);
    setActive(Math.min(tabCount - 1, Math.max(0, index)));
  }, [scrollRange, tabCount]);

  /** While pinned, scrolls to the middle of a tab's share of the section. */
  const scrollToTab = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!pinnedRef.current || !section) return false;

      const top =
        window.scrollY +
        section.getBoundingClientRect().top -
        HEADER_HEIGHT +
        ((index + 0.5) / tabCount) * scrollRange();
      window.scrollTo({ top });
      setActive(index);
      return true;
    },
    [scrollRange, tabCount],
  );

  const selectTab = (index: number, focus = false) => {
    if (!scrollToTab(index)) setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent, index: number) => {
    const next = narrow ? "ArrowRight" : "ArrowDown";
    const previous = narrow ? "ArrowLeft" : "ArrowUp";
    const target = {
      [next]: (index + 1) % tabCount,
      [previous]: (index - 1 + tabCount) % tabCount,
      Home: 0,
      End: tabCount - 1,
    }[event.key];

    if (target === undefined) return;
    event.preventDefault();
    selectTab(target, true);
  };

  // Pin only when every panel fits beneath the sticky header. Panels are
  // measured in place, then restored, so the page height never collapses.
  useLayoutEffect(() => {
    const wide = window.matchMedia("(min-width: 801px)");

    const updatePinning = () => {
      const intro = introRef.current;
      const layout = layoutRef.current;
      const panels = panelRefs.current.filter(
        (panel): panel is HTMLDivElement => panel !== null,
      );
      if (!intro || !layout) return;

      const wasHidden = panels.map((panel) => panel.hidden);
      const tallest = Math.max(
        ...panels.map((panel) => {
          panels.forEach((item) => (item.hidden = item !== panel));
          return layout.offsetHeight;
        }),
      );
      panels.forEach((panel, i) => (panel.hidden = wasHidden[i]));

      const needed =
        intro.offsetHeight +
        parseFloat(getComputedStyle(intro).marginBlockEnd) +
        tallest +
        48;
      const shouldPin =
        wide.matches && needed <= window.innerHeight - HEADER_HEIGHT;

      pinnedRef.current = shouldPin;
      setPinned(shouldPin);
    };

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncToScroll();
      });
    };

    updatePinning();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updatePinning);
    wide.addEventListener("change", updatePinning);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePinning);
      wide.removeEventListener("change", updatePinning);
    };
  }, [syncToScroll]);

  // Pinning changes the section's height, so re-read the scroll position once
  // the new layout is in place.
  useLayoutEffect(() => {
    syncToScroll();
  }, [pinned, syncToScroll]);

  // Let links elsewhere on the page (such as the role cards) open a tab.
  useEffect(() => {
    register((role) => {
      const index = tabs.findIndex((tab) => tab.id === role);
      if (index < 0) return false;
      if (scrollToTab(index)) return true;
      setActive(index);
      return false;
    });
    return () => register(null);
  }, [register, scrollToTab, tabs]);

  return (
    <section
      ref={sectionRef}
      className={cn("section", styles.section, pinned && styles.pinned)}
      id="roles"
      aria-labelledby="roles-title"
    >
      <div ref={stageRef} className={cn("wrap", styles.stage)}>
        <div ref={introRef} className={cn("section-intro", styles.intro)}>
          {intro}
        </div>
        <div ref={layoutRef} className={styles.layout}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label={tablistLabel}
            aria-orientation={narrow ? "horizontal" : "vertical"}
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`role-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ActiveRoleContext value={tabs[active].id}>
            <div>
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  ref={(element) => {
                    panelRefs.current[index] = element;
                  }}
                  className={styles.panel}
                  role="tabpanel"
                  id={`panel-${tab.id}`}
                  aria-labelledby={`role-${tab.id}`}
                  tabIndex={0}
                  hidden={index !== active}
                >
                  {tab.panel}
                </div>
              ))}
            </div>
          </ActiveRoleContext>
        </div>
      </div>
    </section>
  );
}
