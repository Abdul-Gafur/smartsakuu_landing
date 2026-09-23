import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. `serverSnapshot` is used during server
 * rendering and hydration, so it should match the markup's default state.
 */
export function useMediaQuery(query: string, serverSnapshot = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}
