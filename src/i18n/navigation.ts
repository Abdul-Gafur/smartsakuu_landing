import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Use these wrappers for locale-aware links, redirects and future locale changes.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
