"use client";

import { createContext, use, useMemo, useRef, type ReactNode } from "react";

import type { RoleId } from "../../constants";

/**
 * Shows a role in the roles section. Returns `true` when it scrolled the page
 * itself, so the caller should cancel its own navigation.
 */
type RoleNavigator = (role: RoleId) => boolean;

type RoleNavigation = {
  register: (navigator: RoleNavigator | null) => void;
  navigate: RoleNavigator;
};

const RoleNavigationContext = createContext<RoleNavigation | null>(null);

/** Lets links elsewhere on the page open a tab in the roles section. */
export function RoleNavigationProvider({ children }: { children: ReactNode }) {
  const navigatorRef = useRef<RoleNavigator | null>(null);

  const value = useMemo<RoleNavigation>(
    () => ({
      register(navigator) {
        navigatorRef.current = navigator;
      },
      navigate(role) {
        return navigatorRef.current?.(role) ?? false;
      },
    }),
    [],
  );

  return (
    <RoleNavigationContext value={value}>{children}</RoleNavigationContext>
  );
}

export function useRoleNavigation() {
  const context = use(RoleNavigationContext);

  if (!context) {
    throw new Error(
      "useRoleNavigation must be used within <RoleNavigationProvider>.",
    );
  }

  return context;
}

/** The role whose panel is currently shown in the roles section. */
export const ActiveRoleContext = createContext<RoleId | null>(null);

export function useActiveRole() {
  return use(ActiveRoleContext);
}
