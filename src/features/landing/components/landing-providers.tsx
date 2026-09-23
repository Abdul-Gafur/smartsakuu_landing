"use client";

import type { ReactNode } from "react";

import { DemoDialogProvider } from "./demo-dialog/demo-dialog-context";
import { RoleNavigationProvider } from "./roles/role-context";

/** Client-side state shared across landing page sections. */
export function LandingProviders({ children }: { children: ReactNode }) {
  return (
    <DemoDialogProvider>
      <RoleNavigationProvider>{children}</RoleNavigationProvider>
    </DemoDialogProvider>
  );
}
