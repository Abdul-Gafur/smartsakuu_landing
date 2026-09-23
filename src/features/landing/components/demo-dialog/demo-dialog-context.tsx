"use client";

import {
  createContext,
  use,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type DemoDialogContextValue = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  /** Opens the dialog and remembers where to return focus on close. */
  open: (opener: HTMLElement) => void;
  restoreFocus: () => void;
};

const DemoDialogContext = createContext<DemoDialogContextValue | null>(null);

export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const value = useMemo<DemoDialogContextValue>(
    () => ({
      dialogRef,
      open(opener) {
        openerRef.current = opener;
        dialogRef.current?.showModal();
      },
      restoreFocus() {
        openerRef.current?.focus();
      },
    }),
    [],
  );

  return <DemoDialogContext value={value}>{children}</DemoDialogContext>;
}

export function useDemoDialog() {
  const context = use(DemoDialogContext);

  if (!context) {
    throw new Error("useDemoDialog must be used within <DemoDialogProvider>.");
  }

  return context;
}
