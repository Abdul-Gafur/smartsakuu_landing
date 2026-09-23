/** Reads the user's reduced-motion preference at call time (browser only). */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Resolves after `ms` milliseconds. */
export function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
