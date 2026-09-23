"use client";

import type { ReactNode } from "react";

import { useDemoDialog } from "./demo-dialog-context";

type DemoTriggerProps = {
  className?: string;
  /** Destination used when JavaScript is unavailable. */
  href?: string;
  children: ReactNode;
};

/** A link that opens the demo request dialog. */
export function DemoTrigger({
  className,
  href = "#demo",
  children,
}: DemoTriggerProps) {
  const { open } = useDemoDialog();

  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        open(event.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
