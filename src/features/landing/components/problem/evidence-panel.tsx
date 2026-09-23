"use client";

import { useState, type ReactNode } from "react";

import styles from "./problem-section.module.css";

type EvidenceView = "score" | "record";

type EvidencePanelProps = {
  label: string;
  viewLabels: Record<EvidenceView, string>;
  /** Evidence markup; `.value`/`.empty` parts are shown per view via CSS. */
  children: ReactNode;
};

const views: EvidenceView[] = ["score", "record"];

/** Toggles between a bare score and the connected record behind it. */
export function EvidencePanel({
  label,
  viewLabels,
  children,
}: EvidencePanelProps) {
  const [view, setView] = useState<EvidenceView>("record");

  return (
    <div className={styles.panel} data-evidence={view}>
      <div className={styles.controls} role="group" aria-label={label}>
        {views.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
          >
            {viewLabels[option]}
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </div>
  );
}
