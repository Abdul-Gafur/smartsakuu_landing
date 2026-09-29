import { notFound } from "next/navigation";

/**
 * Sends every path no other route matches to `[locale]/not-found.tsx`, so
 * unknown URLs get the localized 404 page instead of the framework default.
 */
export default function CatchAllPage() {
  notFound();
}
