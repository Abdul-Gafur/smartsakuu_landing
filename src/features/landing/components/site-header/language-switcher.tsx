"use client";

import { useLocale } from "next-intl";
import { useEffect, useId, useRef, useState, type FocusEvent } from "react";

import { Icon } from "@/components/ui/icon";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, switcherLocales } from "@/i18n/routing";

import styles from "./site-header.module.css";

/**
 * One link per published language, each pointing at the current page. The
 * locale-aware `Link` also stores the choice in the `NEXT_LOCALE` cookie.
 */
function LanguageLinks() {
  const locale = useLocale();
  const pathname = usePathname();

  return switcherLocales.map((option) => {
    const current = option === locale;

    return (
      <li key={option}>
        <Link
          href={pathname}
          locale={option}
          lang={option}
          hrefLang={option}
          // Switching language loads a new root layout, so prefetching is wasted.
          prefetch={false}
          aria-current={current ? "page" : undefined}
        >
          {localeNames[option]}
          {current && <Icon name="check" />}
        </Link>
      </li>
    );
  });
}

type LanguageMenuProps = {
  /** Accessible name for the button, naming the current language. */
  label: string;
};

/** A compact button that opens the list of languages on wide screens. */
export function LanguageMenu({ label }: LanguageMenuProps) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Close when keyboard focus moves elsewhere. A null target is ignored:
  // Safari does not focus links on click, and closing then would swallow it.
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next && !event.currentTarget.contains(next)) setOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.language} onBlur={handleBlur}>
      <button
        ref={buttonRef}
        className={styles.languageButton}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name="globe" />
        <span className={styles.languageCode}>{locale.toUpperCase()}</span>
      </button>
      <ul id={menuId} className={styles.languageMenu} hidden={!open}>
        <LanguageLinks />
      </ul>
    </div>
  );
}

type LanguageListProps = {
  label: string;
};

/** The languages laid out inline, for the collapsed menu on narrow screens. */
export function LanguageList({ label }: LanguageListProps) {
  const labelId = useId();

  return (
    <div className={styles.languageList}>
      <span id={labelId}>{label}</span>
      <ul aria-labelledby={labelId}>
        <LanguageLinks />
      </ul>
    </div>
  );
}
