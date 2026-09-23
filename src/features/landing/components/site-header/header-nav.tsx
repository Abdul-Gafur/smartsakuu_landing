"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";

import styles from "./site-header.module.css";

type HeaderNavProps = {
  label: string;
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  /** Rendered between the links and the menu button. */
  children: ReactNode;
};

/** Section links that collapse into a toggleable menu on narrow screens. */
export function HeaderNav({
  label,
  links,
  openLabel,
  closeLabel,
  children,
}: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <nav
        className={cn(styles.navLinks, open && styles.open)}
        id="navigation"
        aria-label={label}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
      {children}
      <button
        ref={buttonRef}
        className={styles.menuButton}
        type="button"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M2 5h16M2 10h16M2 15h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </>
  );
}
